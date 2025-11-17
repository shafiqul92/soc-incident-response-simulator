"""
Interactive Network Incident Response Simulator
Flask Backend for SOC-Style Training Tool
"""

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import json
import os
from datetime import datetime
import uuid

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)  # Enable CORS for frontend

# In-memory session storage (in production, use a database)
sessions = {}

# Load scenario definitions
def load_scenarios():
    """Load scenario definitions from JSON files"""
    scenarios = {}
    scenario_dir = 'scenarios'
    
    # Load 3 main scenarios: DDoS, Data Breach, and Ransomware
    for scenario_name in ['ddos', 'data_breach', 'ransomware']:
        scenario_file = os.path.join(scenario_dir, f'{scenario_name}.json')
        if os.path.exists(scenario_file):
            with open(scenario_file, 'r') as f:
                scenarios[scenario_name] = json.load(f)
    
    # Load sub-scenarios for tabs
    # DDoS sub-scenarios: 1, 2, 3
    # Data Breach sub-scenarios: 4, 5, 6
    # Ransomware sub-scenarios: 7, 8, 9, 10
    sub_scenarios = {}
    for i in range(1, 11):
        sub_scenario_file = os.path.join(scenario_dir, f'scenario_{i}.json')
        if os.path.exists(sub_scenario_file):
            with open(sub_scenario_file, 'r') as f:
                sub_scenarios[f'scenario_{i}'] = json.load(f)
    
    # Attach sub-scenarios to main scenarios
    if 'ddos' in scenarios:
        scenarios['ddos']['sub_scenarios'] = [
            sub_scenarios.get('scenario_1'),
            sub_scenarios.get('scenario_2'),
            sub_scenarios.get('scenario_3')
        ]
    if 'data_breach' in scenarios:
        scenarios['data_breach']['sub_scenarios'] = [
            sub_scenarios.get('scenario_4'),
            sub_scenarios.get('scenario_5'),
            sub_scenarios.get('scenario_6')
        ]
    if 'ransomware' in scenarios:
        scenarios['ransomware']['sub_scenarios'] = [
            sub_scenarios.get('scenario_7'),
            sub_scenarios.get('scenario_8'),
            sub_scenarios.get('scenario_9'),
            sub_scenarios.get('scenario_10')
        ]
    
    return scenarios

scenarios = load_scenarios()

@app.route('/')
def index():
    """Serve the main application page"""
    return render_template('index.html')

@app.route('/api/scenarios', methods=['GET'])
def get_scenarios():
    """Get list of available scenarios"""
    scenario_list = [
        {
            'id': key,
            'name': value.get('name', key),
            'description': value.get('description', ''),
            'type': value.get('type', ''),
            'has_sub_scenarios': bool(value.get('sub_scenarios'))
        }
        for key, value in scenarios.items()
    ]
    return jsonify(scenario_list)

@app.route('/api/scenarios/<scenario_id>', methods=['GET'])
def get_scenario(scenario_id):
    """Get full scenario definition"""
    if scenario_id not in scenarios:
        return jsonify({'error': 'Scenario not found'}), 404
    
    scenario = scenarios[scenario_id].copy()
    # Include sub-scenarios info for tabs
    if 'sub_scenarios' in scenario:
        sub_scenarios_info = []
        for sub in scenario['sub_scenarios']:
            if sub:
                sub_scenarios_info.append({
                    'id': sub.get('name', '').lower().replace(' ', '_').replace(':', '').replace('scenario_', ''),
                    'name': sub.get('name', ''),
                    'description': sub.get('description', ''),
                    'type': sub.get('type', '')
                })
        scenario['sub_scenarios_info'] = sub_scenarios_info
    # Remove solution details from client response
    if 'solution' in scenario:
        del scenario['solution']
    
    return jsonify(scenario)

@app.route('/api/sessions', methods=['POST'])
def create_session():
    """Create a new simulation session"""
    data = request.json
    scenario_id = data.get('scenario_id')
    sub_scenario_index = data.get('sub_scenario_index', None)  # Index of sub-scenario tab
    
    if scenario_id not in scenarios:
        return jsonify({'error': 'Invalid scenario'}), 400
    
    # If sub_scenario_index is provided, use that sub-scenario's events
    scenario = scenarios[scenario_id]
    if sub_scenario_index is not None and 'sub_scenarios' in scenario:
        sub_scenarios = scenario['sub_scenarios']
        if 0 <= sub_scenario_index < len(sub_scenarios) and sub_scenarios[sub_scenario_index]:
            # Use sub-scenario events
            scenario = sub_scenarios[sub_scenario_index]
    
    # Get events from the scenario (either main or sub-scenario)
    events = scenario.get('events', [])
    
    session_id = str(uuid.uuid4())
    sessions[session_id] = {
        'scenario_id': scenario_id,
        'sub_scenario_index': sub_scenario_index,
        'start_time': datetime.now().isoformat(),
        'current_step': 0,
        'actions_taken': [],
        'score': 0,
        'max_score': 0,
        'events_viewed': [],
        'events': events,  # Store events in session
        'state': {
            'hosts': {},
            'network': {},
            'containment': False,
            'eradication': False,
            'recovery': False
        }
    }
    
    return jsonify({'session_id': session_id})

@app.route('/api/sessions/<session_id>/events', methods=['GET'])
def get_events(session_id):
    """Get events for current step in session"""
    if session_id not in sessions:
        return jsonify({'error': 'Session not found'}), 404
    
    session = sessions[session_id]
    current_step = session['current_step']
    
    # Use events stored in session (from either main scenario or sub-scenario)
    events = session.get('events', [])
    
    if current_step >= len(events):
        return jsonify({
            'events': [],
            'has_more': False,
            'decision_point': None
        })
    
    # Optional 'since' query param: only return events AFTER this index
    since_param = request.args.get('since', default=None, type=int)
    start_index = (since_param + 1) if since_param is not None else 0
    
    # Return events from start_index up to current step (exclude decision points)
    events_to_return = []
    for i in range(start_index, current_step + 1):
        if 0 <= i < len(events) and events[i].get('type') != 'decision_point':
            events_to_return.append(events[i])
    
    # Check if we're at a decision point
    decision_point = None
    if current_step < len(events):
        event = events[current_step]
        if event.get('type') == 'decision_point':
            decision_point = {
                'id': event.get('id'),
                'description': event.get('description'),
                'options': event.get('options', [])
            }
    
    return jsonify({
        'events': events_to_return,
        'has_more': current_step < len(events) - 1,
        'decision_point': decision_point,
        'current_step': current_step
    })

@app.route('/api/sessions/<session_id>/next', methods=['POST'])
def next_event(session_id):
    """Advance to the next event in the scenario"""
    if session_id not in sessions:
        return jsonify({'error': 'Session not found'}), 404
    
    session = sessions[session_id]
    scenario = scenarios[session['scenario_id']]
    events = scenario.get('events', [])
    
    # Don't advance if we're at a decision point (must make a decision first)
    if session['current_step'] < len(events):
        current_event = events[session['current_step']]
        if current_event.get('type') == 'decision_point':
            return jsonify({'error': 'Must make a decision first'}), 400
    
    # Advance to next step
    session['current_step'] += 1
    
    return jsonify({'success': True, 'current_step': session['current_step']})

@app.route('/api/sessions/<session_id>/action', methods=['POST'])
def submit_action(session_id):
    """Submit an action at a decision point"""
    if session_id not in sessions:
        return jsonify({'error': 'Session not found'}), 404
    
    data = request.json
    action_id = data.get('action_id')
    option_id = data.get('option_id')
    
    session = sessions[session_id]
    scenario = scenarios[session['scenario_id']]
    current_step = session['current_step']
    
    events = scenario.get('events', [])
    if current_step >= len(events):
        return jsonify({'error': 'No active decision point'}), 400
    
    event = events[current_step]
    if event.get('type') != 'decision_point':
        return jsonify({'error': 'Not at a decision point'}), 400
    
    # Find the selected option
    options = event.get('options', [])
    selected_option = None
    for option in options:
        if option.get('id') == option_id:
            selected_option = option
            break
    
    if not selected_option:
        return jsonify({'error': 'Invalid option'}), 400
    
    # Record action
    session['actions_taken'].append({
        'step': current_step,
        'action_id': action_id,
        'option_id': option_id,
        'timestamp': datetime.now().isoformat()
    })
    
    # Calculate score
    score_points = selected_option.get('score', 0)
    session['score'] += score_points
    session['max_score'] += event.get('max_score', 10)
    
    # Update state based on action
    update_session_state(session, selected_option)
    
    # Move to next step
    session['current_step'] += 1
    
    # Get feedback
    feedback = {
        'correct': selected_option.get('correct', False),
        'score': score_points,
        'max_score': event.get('max_score', 10),
        'feedback': selected_option.get('feedback', ''),
        'explanation': selected_option.get('explanation', '')
    }
    
    return jsonify(feedback)

def update_session_state(session, option):
    """Update session state based on selected action"""
    action_type = option.get('action_type')
    state = session['state']
    
    if action_type == 'contain':
        state['containment'] = True
    elif action_type == 'eradicate':
        state['eradication'] = True
    elif action_type == 'recover':
        state['recovery'] = True
    elif action_type == 'block_ip':
        target = option.get('target')
        if 'network' not in state:
            state['network'] = {}
        if 'blocked_ips' not in state['network']:
            state['network']['blocked_ips'] = []
        if target:
            state['network']['blocked_ips'].append(target)
    elif action_type == 'isolate_host':
        target = option.get('target')
        if target:
            if target not in state['hosts']:
                state['hosts'][target] = {}
            state['hosts'][target]['isolated'] = True

@app.route('/api/sessions/<session_id>/status', methods=['GET'])
def get_session_status(session_id):
    """Get current session status and score"""
    if session_id not in sessions:
        return jsonify({'error': 'Session not found'}), 404
    
    session = sessions[session_id]
    
    return jsonify({
        'score': session['score'],
        'max_score': session['max_score'],
        'percentage': (session['score'] / session['max_score'] * 100) if session['max_score'] > 0 else 0,
        'current_step': session['current_step'],
        'state': session['state'],
        'actions_taken': len(session['actions_taken'])
    })

@app.route('/api/sessions/<session_id>/complete', methods=['POST'])
def complete_session(session_id):
    """Complete session and get final report"""
    if session_id not in sessions:
        return jsonify({'error': 'Session not found'}), 404
    
    session = sessions[session_id]
    scenario = scenarios[session['scenario_id']]
    
    # Generate NIST-aligned recommendations
    recommendations = generate_recommendations(session, scenario)
    
    return jsonify({
        'score': session['score'],
        'max_score': session['max_score'],
        'percentage': (session['score'] / session['max_score'] * 100) if session['max_score'] > 0 else 0,
        'recommendations': recommendations,
        'actions_summary': session['actions_taken']
    })

def generate_recommendations(session, scenario):
    """Generate NIST-aligned post-incident recommendations"""
    recommendations = {
        'preparation': [],
        'detection': [],
        'containment': [],
        'eradication': [],
        'recovery': [],
        'post_incident': []
    }
    
    # Analyze session performance and generate recommendations
    state = session['state']
    score_percentage = (session['score'] / session['max_score'] * 100) if session['max_score'] > 0 else 0
    
    # Preparation recommendations
    recommendations['preparation'].append({
        'title': 'Network Segmentation',
        'description': 'Implement network segmentation to limit lateral movement and contain incidents more effectively.',
        'priority': 'high'
    })
    
    recommendations['preparation'].append({
        'title': 'Backup and Recovery Procedures',
        'description': 'Establish and regularly test backup and recovery procedures to ensure quick restoration.',
        'priority': 'high'
    })
    
    # Detection recommendations
    if score_percentage < 70:
        recommendations['detection'].append({
            'title': 'Improve Indicator Recognition',
            'description': 'Focus on recognizing key indicators earlier. Review common patterns for this incident type.',
            'priority': 'medium'
        })
    
    # Containment recommendations
    if not state.get('containment'):
        recommendations['containment'].append({
            'title': 'Faster Containment',
            'description': 'Work on identifying and executing containment actions more quickly to limit damage.',
            'priority': 'high'
        })
    
    # Recovery recommendations
    recommendations['recovery'].append({
        'title': 'Multi-Factor Authentication',
        'description': 'Implement MFA to prevent credential-based attacks and reduce the risk of data breaches.',
        'priority': 'high'
    })
    
    # Post-incident recommendations
    recommendations['post_incident'].append({
        'title': 'Incident Response Plan Review',
        'description': 'Review and update incident response plans based on lessons learned from this simulation.',
        'priority': 'medium'
    })
    
    return recommendations

if __name__ == '__main__':
    # Use a non-reserved port to avoid conflicts with other Windows services
    app.run(debug=True, port=5050)

