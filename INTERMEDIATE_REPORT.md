# Interactive Network Incident Response Simulator
## Intermediate Project Report

**Author:** Md Shafiqul Islam  
**Course:** CPRE-5300  
**Semester:** Fall 2025  
**Date:** November 2025

---

## 1. Project Overview

### 1.1 Introduction

The Interactive Network Incident Response Simulator is a web-based training tool designed to provide hands-on experience for Security Operations Center (SOC) analysts and cybersecurity students. The simulator creates a safe, synthetic environment where learners can practice detecting, analyzing, and responding to real-world cyber incidents without any actual security risks.

### 1.2 Project Objectives

The primary objectives of this project are:

1. **Educational Training**: Provide realistic, hands-on training for incident response professionals
2. **Skill Development**: Help learners develop critical thinking and decision-making skills in high-pressure situations
3. **NIST Alignment**: Teach incident response procedures aligned with NIST SP 800-61 framework
4. **Safe Practice Environment**: Enable practice without risk to real systems or data
5. **Assessment Capability**: Provide scoring and feedback to measure learning progress

### 1.3 Target Audience

- Undergraduate students studying networking or cybersecurity
- Early-career IT and security professionals
- SOC analysts in training
- Instructors and course designers for cybersecurity education

### 1.4 Learning Objectives

Upon completing scenarios in this simulator, learners should be able to:

1. **Objective 1**: Reliably spot and interpret common incident indicators (DDoS patterns, credential misuse, ransomware activity)
2. **Objective 2**: Apply NIST-aligned incident response processes (Preparation → Detection & Analysis → Containment → Eradication → Recovery → Post-Incident)
3. **Objective 3**: Recommend practical mitigations and policy actions (network segmentation, MFA, backup/restore processes)

---

## 2. Scenario Descriptions

The simulator includes three main incident types, each with multiple sub-scenarios:

### 2.1 DDoS Attack Scenario

**Overview**: A volumetric network/transport attack targeting web servers. This comprehensive scenario covers multiple attack types and response strategies.

**Sub-Scenarios**:

1. **Initial Traffic Spike Detection**
   - Focus: Early warning signs of DDoS attacks
   - Indicators: Rising connection rates, increasing CPU usage, degrading server performance
   - Learning Outcome: Quick identification and immediate containment actions

2. **SYN Flood Pattern Recognition**
   - Focus: SYN flood attacks with incomplete TCP connection requests
   - Indicators: Incomplete SYN packets, connection pool exhaustion, increasing timeouts
   - Learning Outcome: Distinguishing SYN floods from normal traffic, implementing SYN cookies or subnet blocking

3. **Mixed Attack Pattern Response**
   - Focus: Evolving attacks that shift between SYN and UDP patterns
   - Indicators: Attack morphing from SYN to mixed SYN/UDP amplification
   - Learning Outcome: Adaptive response strategies and coordination with upstream providers

**Total Events**: 15 events across all sub-scenarios  
**Decision Points**: 3 decision points

### 2.2 Data Breach Scenario

**Overview**: Credential misuse and suspicious data exfiltration. This scenario walks through the complete attack lifecycle from initial attempts to active data theft.

**Sub-Scenarios**:

1. **Failed Login Pattern Detection**
   - Focus: Credential stuffing attacks using automated tools
   - Indicators: Multiple failed login attempts, account lockouts, coordinated attacks on multiple accounts
   - Learning Outcome: Identifying brute force patterns and implementing network-level blocking

2. **Unusual Location Login Detection**
   - Focus: Geolocation-based anomaly detection for compromised credentials
   - Indicators: Successful logins from unusual countries, impossible travel patterns
   - Learning Outcome: Recognizing geolocation red flags and securing compromised accounts

3. **Data Exfiltration Detection**
   - Focus: Active data theft in progress
   - Indicators: Large outbound data transfers, database export commands, DLP alerts detecting sensitive information
   - Learning Outcome: Quickly isolating affected systems to stop data theft

**Total Events**: 15 events across all sub-scenarios  
**Decision Points**: 3 decision points

### 2.3 Ransomware Infection Scenario

**Overview**: Lateral movement and file-access anomalies. This scenario covers the complete incident response lifecycle from initial detection through recovery.

**Sub-Scenarios**:

1. **Initial Ransomware Detection**
   - Focus: Early encryption indicators
   - Indicators: Anomalous SMB write operations, unexpected process execution (encrypt.exe), file renames (.locked), shadow copy deletion
   - Learning Outcome: Recognizing early indicators and taking immediate containment action

2. **Lateral Movement Detection**
   - Focus: Network-wide spread via SMB protocol
   - Indicators: Ransomware connecting to multiple servers, encryption spreading across hosts
   - Learning Outcome: Implementing comprehensive containment to prevent further propagation

3. **Ransom Note and Impact Assessment**
   - Focus: Post-encryption recovery planning
   - Indicators: Ransom notes, encryption completion, ransom demands, backup availability
   - Learning Outcome: Making critical recovery decisions (restore from backups vs. paying ransom)

4. **Post-Containment Eradication**
   - Focus: Complete threat removal
   - Indicators: Persistence mechanisms (scheduled tasks, registry keys), C2 infrastructure
   - Learning Outcome: Identifying and removing all threats to ensure clean recovery

**Total Events**: 20 events across all sub-scenarios  
**Decision Points**: 4 decision points

---

## 3. Implementation Details

### 3.1 Architecture Overview

The simulator follows a client-server architecture with a clear separation between frontend and backend:

```
┌─────────────────┐
│   Web Browser   │  (Frontend: HTML/CSS/JavaScript)
│   (Client)      │
└────────┬────────┘
         │ HTTP/REST API
         │
┌────────▼────────┐
│  Flask Server   │  (Backend: Python/Flask)
│   (Server)      │
└────────┬────────┘
         │
┌────────▼────────┐
│  JSON Files     │  (Scenario Data)
│  (Storage)      │
└─────────────────┘
```

### 3.2 Backend Implementation

**Framework**: Flask (Python web framework)

**Key Components**:

1. **Scenario Loader** (`load_scenarios()`)
   - Loads main scenarios (ddos.json, data_breach.json, ransomware.json)
   - Loads sub-scenarios (scenario_1.json through scenario_10.json)
   - Attaches sub-scenarios to main scenarios for tab navigation

2. **Session Management**
   - In-memory session storage (dictionary-based)
   - Tracks: current step, actions taken, score, events viewed
   - Each session stores events from either main scenario or selected sub-scenario

3. **API Endpoints**:
   - `GET /api/scenarios`: List all available scenarios
   - `GET /api/scenarios/<id>`: Get detailed scenario information including sub-scenarios
   - `POST /api/sessions`: Create new simulation session (supports sub-scenario selection)
   - `GET /api/sessions/<id>/events`: Get events for current step
   - `POST /api/sessions/<id>/next`: Advance to next event
   - `POST /api/sessions/<id>/action`: Submit decision/action
   - `GET /api/sessions/<id>/status`: Get current session status
   - `POST /api/sessions/<id>/complete`: Mark scenario as complete

4. **Scoring System**:
   - Each decision point has a maximum score (typically 10 points)
   - Options are scored based on:
     - Priority (immediate vs. delayed action)
     - Effectiveness (does it solve the problem?)
     - Best practices (NIST-aligned procedures)
   - Cumulative scoring across all decision points

5. **Feedback Generation**:
   - Immediate feedback after each decision
   - Explains why certain actions are better than others
   - NIST-aligned recommendations at scenario completion

### 3.3 Frontend Implementation

**Technologies**: HTML5, CSS3, Vanilla JavaScript

**Key Components**:

1. **Scenario Selection Screen**
   - Displays three main scenario cards
   - Shows scenario name, type, and description
   - Welcome section with project goals and learning objectives

2. **Simulation Screen**
   - **Header**: Scenario title, back button, score display, rubric button
   - **Tabs**: Dynamic tab navigation for sub-scenarios (when available)
   - **Description Box**: Shows scenario/sub-scenario description
   - **Left Panel**: Events & Logs display with severity legend
   - **Right Panel**: System metrics (CPU, Memory, Network) with Chart.js visualizations
   - **Decision Section**: Appears when decision point is reached
   - **Feedback Section**: Shows immediate feedback after decisions

3. **Event Display System**:
   - Events displayed in chronological order
   - Color-coded severity indicators (Critical, High, Medium, Low)
   - Event details include: timestamp, source, title, description, log entries
   - Metrics updated in real-time as events progress

4. **Tab Navigation**:
   - Dynamic tab creation based on sub-scenarios
   - Each tab represents a sub-scenario
   - Clicking a tab starts that sub-scenario independently
   - Description updates when switching tabs

5. **Chart Visualizations**:
   - Chart.js library for metrics display
   - Three charts: CPU Usage, Memory Usage, Network Traffic
   - Real-time updates as events progress
   - Line charts showing trends over time

6. **Completion Screen**:
   - Final score display with percentage
   - NIST-aligned recommendations
   - Option to try another scenario

### 3.4 Data Structure

**Scenario JSON Format**:
```json
{
  "name": "Scenario Name",
  "type": "DDoS|Data Breach|Ransomware",
  "description": "Detailed description",
  "events": [
    {
      "id": "event_1",
      "type": "alert|log|decision_point",
      "timestamp": "ISO 8601 format",
      "source": "Source system",
      "severity": "critical|high|medium|low",
      "title": "Event title",
      "description": "Event description",
      "metrics": { ... }
    }
  ]
}
```

**Decision Point Format**:
```json
{
  "id": "decision_1",
  "type": "decision_point",
  "description": "Decision question",
  "max_score": 10,
  "options": [
    {
      "id": "opt_1",
      "text": "Option text",
      "action_type": "block_ip|isolate_host|...",
      "correct": true|false,
      "score": 0-10,
      "feedback": "Feedback message",
      "explanation": "Why this is correct/incorrect"
    }
  ]
}
```

### 3.5 User Flow

1. **Scenario Selection**: User selects one of three main scenarios
2. **Tab Display**: If sub-scenarios exist, tabs are displayed
3. **Sub-Scenario Selection**: User clicks a tab (or first tab auto-starts)
4. **Event Progression**: Events appear sequentially, user clicks "Next Event"
5. **Decision Point**: When decision point is reached, options are displayed
6. **Decision Submission**: User selects an option
7. **Feedback**: Immediate feedback shown with score
8. **Continuation**: After feedback, next events load (or scenario completes)
9. **Completion**: Final score and recommendations displayed
10. **Next Scenario**: User can select another scenario

---

## 4. Technology Stack

### 4.1 Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.12.6 | Programming language |
| **Flask** | 3.0.0 | Web framework for API and routing |
| **Flask-CORS** | 4.0.0 | Cross-Origin Resource Sharing support |
| **JSON** | Built-in | Scenario data storage and API responses |
| **UUID** | Built-in | Session ID generation |

### 4.2 Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **HTML5** | W3C Standard | Markup and structure |
| **CSS3** | W3C Standard | Styling and animations |
| **JavaScript (ES6+)** | ES2020+ | Frontend logic and interactivity |
| **Chart.js** | 4.4.0+ (CDN) | Metrics visualization (CPU, Memory, Network) |

### 4.3 Development Tools

| Tool | Purpose |
|------|---------|
| **Git** | Version control |
| **VS Code / Any IDE** | Code editing |
| **Web Browser** | Testing and development (Chrome, Firefox, Edge) |

### 4.4 Data Storage

- **Format**: JSON files
- **Location**: `scenarios/` directory
- **Files**:
  - `ddos.json` - Main DDoS scenario
  - `data_breach.json` - Main Data Breach scenario
  - `ransomware.json` - Main Ransomware scenario
  - `scenario_1.json` through `scenario_10.json` - Sub-scenarios

### 4.5 Deployment Architecture

**Current Setup**: Local development server
- Flask development server (port 5050)
- Single-user, in-memory session storage
- File-based scenario storage

**Future Considerations**:
- Database for session persistence (SQLite/PostgreSQL)
- Multi-user support
- Production web server (Gunicorn + Nginx)
- Docker containerization

---

## 5. Key Features Implemented

### 5.1 Scenario Management
- ✅ Three main scenarios (DDoS, Data Breach, Ransomware)
- ✅ Ten sub-scenarios organized by type
- ✅ Tab-based navigation for sub-scenarios
- ✅ Dynamic scenario loading from JSON files

### 5.2 Event System
- ✅ Sequential event progression
- ✅ Color-coded severity indicators
- ✅ Real-time metrics updates
- ✅ Event clearing after decision points
- ✅ Log entry display with formatting

### 5.3 Decision Points
- ✅ Multiple choice decision options
- ✅ Immediate scoring and feedback
- ✅ Explanation of correct/incorrect choices
- ✅ NIST-aligned recommendations

### 5.4 User Interface
- ✅ Modern, responsive design
- ✅ Smooth animations and transitions
- ✅ Severity legend for event understanding
- ✅ Scenario descriptions for context
- ✅ Score display with progress bar
- ✅ Scoring rubric modal

### 5.5 Assessment System
- ✅ Real-time score calculation
- ✅ Maximum score tracking
- ✅ Percentage calculation
- ✅ Completion screen with recommendations

---

## 6. Project Structure

```
CPRE-5300_PROJECT/
│
├── app.py                      # Flask backend application
├── requirements.txt            # Python dependencies
├── README.md                   # Project documentation
├── INTERMEDIATE_REPORT.md     # This report
│
├── templates/
│   └── index.html             # Main HTML template
│
├── static/
│   ├── css/
│   │   └── style.css          # Stylesheet
│   └── js/
│       └── app.js             # Frontend JavaScript
│
└── scenarios/
    ├── ddos.json              # Main DDoS scenario
    ├── data_breach.json       # Main Data Breach scenario
    ├── ransomware.json        # Main Ransomware scenario
    ├── scenario_1.json        # DDoS sub-scenario 1
    ├── scenario_2.json        # DDoS sub-scenario 2
    ├── scenario_3.json        # DDoS sub-scenario 3
    ├── scenario_4.json        # Data Breach sub-scenario 1
    ├── scenario_5.json        # Data Breach sub-scenario 2
    ├── scenario_6.json        # Data Breach sub-scenario 3
    ├── scenario_7.json        # Ransomware sub-scenario 1
    ├── scenario_8.json        # Ransomware sub-scenario 2
    ├── scenario_9.json        # Ransomware sub-scenario 3
    └── scenario_10.json       # Ransomware sub-scenario 4
```

---

## 7. Current Status

### 7.1 Completed Features

- ✅ Complete backend API implementation
- ✅ Frontend UI with all interactive elements
- ✅ Three main scenarios with sub-scenarios
- ✅ Event progression system
- ✅ Decision point system with scoring
- ✅ Feedback and recommendations
- ✅ Tab navigation for sub-scenarios
- ✅ Scenario descriptions
- ✅ Metrics visualization
- ✅ Scoring rubric
- ✅ Completion screen

### 7.2 Future Enhancements

- [ ] Database integration for session persistence
- [ ] Multi-user support
- [ ] Instructor dashboard
- [ ] Export results to CSV/PDF
- [ ] Additional scenario types
- [ ] Advanced visualizations
- [ ] Performance analytics
- [ ] Mobile responsiveness improvements

---

## 8. Testing and Validation

### 8.1 Testing Approach

- Manual testing of all scenarios
- Verification of event progression
- Decision point functionality testing
- Score calculation validation
- UI/UX testing across browsers

### 8.2 Known Limitations

- In-memory session storage (sessions lost on server restart)
- Single-user support
- No persistent data storage
- Development server only (not production-ready)

---

## 9. References and Standards

- **NIST SP 800-61 Rev. 2**: Computer Security Incident Handling Guide
- **CISA**: Incident Response Playbooks
- **ENISA**: Ransomware Good Practice Guide
- **Verizon DBIR 2024**: Data Breach Investigations Report

---

## 10. Conclusion

This intermediate report documents the current state of the Interactive Network Incident Response Simulator. The project successfully implements a functional training tool with three comprehensive scenarios covering DDoS attacks, data breaches, and ransomware infections. The tab-based sub-scenario system provides focused learning experiences, while the scoring and feedback mechanisms ensure educational value.

The implementation follows modern web development practices with a clear separation of concerns between frontend and backend. The use of JSON for scenario storage provides flexibility for instructors to customize or add new scenarios.

The project is ready for intermediate evaluation and demonstrates significant progress toward the final project goals.

---

**Report Generated**: November 2025  
**Project Status**: Intermediate Development Phase  
**Next Milestone**: Final Implementation and Testing

