// Network Incident Response Simulator - Frontend Application

const API_BASE = '/api';
let currentSessionId = null;
let currentScenario = null;
let scenarios = {}; // Store scenarios list
let cpuChart = null;
let memoryChart = null;
let networkChart = null;
let cpuData = [];
let memoryData = [];
let networkData = [];
let lastDecisionStep = -1; // index of last resolved decision
let currentStep = 0;       // server-reported current step
let pendingDecisionStep = null;
let displayedEventIds = new Set();
let currentDecisionPoint = null;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    loadScenarios();
    setupEventListeners();
    initializeCharts();
});

// Setup event listeners
function setupEventListeners() {
    document.getElementById('back-btn')?.addEventListener('click', () => {
        showScreen('scenario-selection');
    });

    document.getElementById('learning-center-btn')?.addEventListener('click', () => {
        showScreen('learning-center');
    });

    document.getElementById('learning-back-btn')?.addEventListener('click', () => {
        showScreen('scenario-selection');
    });

    document.getElementById('restart-btn')?.addEventListener('click', () => {
        showScreen('scenario-selection');
        currentSessionId = null;
        currentScenario = null;
    });

    document.getElementById('next-event-btn')?.addEventListener('click', () => {
        if (currentSessionId) {
            loadNextEvent();
        }
    });

    document.getElementById('view-nist-button')?.addEventListener('click', () => {
        if (currentSessionId) {
            completeScenario();
        }
    });

    document.getElementById('back-to-scenario-btn')?.addEventListener('click', () => {
        showScreen('simulation-screen');
        document.getElementById('feedback-section').style.display = 'block';
        const viewFinal = document.getElementById('view-nist-button');
        if (viewFinal) viewFinal.style.display = 'block';
    });

    // Rubric modal toggles
    const rubricBtn = document.getElementById('rubric-btn');
    const rubricModal = document.getElementById('rubric-modal');
    const rubricClose = document.getElementById('rubric-close');
    rubricBtn?.addEventListener('click', () => {
        rubricModal.style.display = 'flex';
    });
    rubricClose?.addEventListener('click', () => {
        rubricModal.style.display = 'none';
    });
    rubricModal?.addEventListener('click', (e) => {
        if (e.target === rubricModal) rubricModal.style.display = 'none';
    });

    // Scenario background modal
    const scenarioBackgroundBtn = document.getElementById('scenario-background-btn');
    const scenarioBackgroundModal = document.getElementById('scenario-background-modal');
    const scenarioBackgroundClose = document.getElementById('scenario-background-close');
    scenarioBackgroundBtn?.addEventListener('click', () => {
        populateScenarioBackground();
        scenarioBackgroundModal.style.display = 'flex';
    });
    scenarioBackgroundClose?.addEventListener('click', () => {
        scenarioBackgroundModal.style.display = 'none';
    });
    scenarioBackgroundModal?.addEventListener('click', (e) => {
        if (e.target === scenarioBackgroundModal) scenarioBackgroundModal.style.display = 'none';
    });

    // Feedback details close handler
    const feedbackDetailsModal = document.getElementById('feedback-details-modal');
    const feedbackDetailsClose = document.getElementById('feedback-details-close');
    feedbackDetailsClose?.addEventListener('click', () => {
        feedbackDetailsModal.style.display = 'none';
    });
    feedbackDetailsModal?.addEventListener('click', (e) => {
        if (e.target === feedbackDetailsModal) feedbackDetailsModal.style.display = 'none';
    });
}

// Load available scenarios
async function loadScenarios() {
    try {
        const response = await fetch(`${API_BASE}/scenarios`);
        const scenarioList = await response.json();
        // Store scenarios for restart functionality
        scenarioList.forEach(s => {
            scenarios[s.id] = s;
        });
        displayScenarios(scenarioList);
    } catch (error) {
        console.error('Error loading scenarios:', error);
        alert('Failed to load scenarios. Please check if the server is running.');
    }
}

// Display scenarios
function displayScenarios(scenarios) {
    const container = document.getElementById('scenario-list');
    container.innerHTML = '';

    scenarios.forEach(scenario => {
        const card = document.createElement('div');
        card.className = 'scenario-card';
        card.innerHTML = `
            <h3>${scenario.name}</h3>
            <span class="scenario-type">${scenario.type}</span>
            <p>${scenario.description}</p>
        `;
        card.addEventListener('click', () => startScenario(scenario.id));
        container.appendChild(card);
    });
}

function populateScenarioBackground() {
    const body = document.getElementById('scenario-background-body');
    if (!body || !currentScenario) return;

    let html = '';
    const id = currentScenario.id || '';

    if (id === 'ddos') {
        html = `
            <h4>DDoS Scenario Background</h4>
            <p>This scenario focuses on volumetric network/transport layer activity. Watch for inbound spikes, SYN flood ratios, and CPU overload.</p>
            <ul>
                <li><strong>Indicators:</strong> Rising SYN/incomplete handshake ratios, firewall connection limits.</li>
                <li><strong>Responses:</strong> Block abusive IP ranges, enable SYN cookies, coordinate with upstream scrubbing.</li>
            </ul>
        `;
    } else if (id === 'data_breach') {
        html = `
            <h4>Data Breach Scenario Background</h4>
            <p>Application-layer incidents centered around credential misuse and data theft.</p>
            <ul>
                <li><strong>Indicators:</strong> Credential stuffing, impossible travel, large outbound data flows.</li>
                <li><strong>Responses:</strong> Block IP ranges, disable accounts, isolate compromised systems.</li>
            </ul>
        `;
    } else if (id === 'ransomware') {
        html = `
            <h4>Ransomware Scenario Background</h4>
            <p>Host/network behavior including encryption, persistence, and lateral SMB movement.</p>
            <ul>
                <li><strong>Indicators:</strong> encrypt.exe/process creation, shadow copy deletion, .locked files.</li>
                <li><strong>Responses:</strong> Isolate hosts, remove persistence, restore clean backups.</li>
            </ul>
        `;
    } else {
        html = '<p>Background details are not available for this scenario.</p>';
    }

    body.innerHTML = html;
}

// Start a scenario
async function startScenario(scenarioId) {
    try {
        // Create session
        const sessionResponse = await fetch(`${API_BASE}/sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scenario_id: scenarioId })
        });
        const sessionData = await sessionResponse.json();
        currentSessionId = sessionData.session_id;

        // Get scenario details
        const scenarioResponse = await fetch(`${API_BASE}/scenarios/${scenarioId}`);
        currentScenario = await scenarioResponse.json();
        currentScenario.id = scenarioId; // Store the ID for tab switching

        // Update UI
        document.getElementById('scenario-title').textContent = currentScenario.name;
        showScreen('simulation-screen');
        
        // Show tabs if sub-scenarios exist
        if (currentScenario.sub_scenarios_info && currentScenario.sub_scenarios_info.length > 0) {
            showScenarioTabs(currentScenario.sub_scenarios_info);
            // Show main scenario description
            showMainScenarioDescription(currentScenario);
            // Auto-start first tab
            startSubScenario(0);
        } else {
            // Show main scenario description if no sub-scenarios
            showMainScenarioDescription(currentScenario);
            document.getElementById('scenario-tabs').style.display = 'none';
            
            // Reset state
            lastDecisionStep = -1;
            currentStep = 0;
            pendingDecisionStep = null;
            cpuData = [];
            memoryData = [];
            networkData = [];
            
            // Reset charts
            if (cpuChart) cpuChart.destroy();
            if (memoryChart) memoryChart.destroy();
            if (networkChart) networkChart.destroy();
            initializeCharts();
            
            // Clear events container
            document.getElementById('events-container').innerHTML = '';
            document.getElementById('decision-section').style.display = 'none';
            document.getElementById('feedback-section').style.display = 'none';
            
            // Load first event immediately (no click needed)
            const firstEventResponse = await fetch(`${API_BASE}/sessions/${currentSessionId}/events`);
            const firstEventData = await firstEventResponse.json();
            displayEvents(firstEventData.events, true);
            updateMetrics(firstEventData.events);
            updateScore();
            const finalReportBtn = document.getElementById('view-nist-button');
            
            // Show decision point if it's the first event (unlikely but handle it)
            if (firstEventData.decision_point) {
                showDecisionPoint(firstEventData.decision_point);
                document.getElementById('next-event-btn').style.display = 'none';
                if (finalReportBtn) finalReportBtn.style.display = 'none';
            } else {
                document.getElementById('next-event-btn').style.display = firstEventData.has_more ? 'block' : 'none';
                if (finalReportBtn) finalReportBtn.style.display = firstEventData.has_more ? 'none' : 'block';
            }
        }
    } catch (error) {
        console.error('Error starting scenario:', error);
        alert('Failed to start scenario. Please try again.');
    }
}

// Show scenario tabs
function showScenarioTabs(subScenarios) {
    const tabsContainer = document.getElementById('tabs-container');
    const tabsDiv = document.getElementById('scenario-tabs');
    
    tabsContainer.innerHTML = '';
    
    subScenarios.forEach((subScenario, index) => {
        const tabButton = document.createElement('button');
        tabButton.className = 'tab-button';
        tabButton.textContent = subScenario.name.replace('Scenario ', '').replace(/^\d+:\s*/, '');
        tabButton.dataset.index = index;
        tabButton.title = subScenario.description || subScenario.name; // Tooltip with description
        
        if (index === 0) {
            tabButton.classList.add('active');
        }
        
        tabButton.addEventListener('click', () => {
            // Remove active class from all tabs
            tabsContainer.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to clicked tab
            tabButton.classList.add('active');
            // Show description for this sub-scenario
            showSubScenarioDescription(subScenario);
            // Start the sub-scenario
            startSubScenario(index);
        });
        
        tabsContainer.appendChild(tabButton);
    });
    
    tabsDiv.style.display = 'block';
    
    // Show description for first tab
    if (subScenarios.length > 0) {
        showSubScenarioDescription(subScenarios[0]);
    }
}

// Show main scenario description
function showMainScenarioDescription(scenario) {
    const descDiv = document.getElementById('scenario-description');
    const descTitle = document.getElementById('description-title');
    const descText = document.getElementById('description-text');
    
    if (scenario && scenario.description) {
        descTitle.textContent = scenario.name || 'Scenario Overview';
        descText.textContent = scenario.description;
        descDiv.style.display = 'block';
    } else {
        descDiv.style.display = 'none';
    }
}

// Show sub-scenario description
function showSubScenarioDescription(subScenario) {
    const descDiv = document.getElementById('scenario-description');
    const descTitle = document.getElementById('description-title');
    const descText = document.getElementById('description-text');
    
    if (subScenario && subScenario.description) {
        descTitle.textContent = subScenario.name || 'Scenario Overview';
        descText.textContent = subScenario.description;
        descDiv.style.display = 'block';
    } else {
        descDiv.style.display = 'none';
    }
}

// Start a sub-scenario (tab)
async function startSubScenario(subScenarioIndex) {
    if (!currentScenario) return;
    
    try {
        // Get the main scenario ID (use the id from currentScenario)
        const scenarioId = currentScenario.id || currentScenario.name?.toLowerCase().replace(' ', '_');
        
        // Create session with sub-scenario index
        const sessionResponse = await fetch(`${API_BASE}/sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                scenario_id: scenarioId,
                sub_scenario_index: subScenarioIndex
            })
        });
        const sessionData = await sessionResponse.json();
        currentSessionId = sessionData.session_id;
        
        // Reset state
        lastDecisionStep = -1;
        currentStep = 0;
        pendingDecisionStep = null;
        cpuData = [];
        memoryData = [];
        networkData = [];
        
        // Reset charts
        if (cpuChart) cpuChart.destroy();
        if (memoryChart) memoryChart.destroy();
        if (networkChart) networkChart.destroy();
        initializeCharts();
        
        // Clear events container
        document.getElementById('events-container').innerHTML = '';
        document.getElementById('decision-section').style.display = 'none';
        document.getElementById('feedback-section').style.display = 'none';
        
        // Load first event immediately
        const firstEventResponse = await fetch(`${API_BASE}/sessions/${currentSessionId}/events`);
        const firstEventData = await firstEventResponse.json();
        displayEvents(firstEventData.events, true);
        updateMetrics(firstEventData.events);
        updateScore();
        const finalReportBtn = document.getElementById('view-nist-button');
        
        // Show decision point if it's the first event
        if (firstEventData.decision_point) {
            showDecisionPoint(firstEventData.decision_point);
            document.getElementById('next-event-btn').style.display = 'none';
            if (finalReportBtn) finalReportBtn.style.display = 'none';
        } else {
            document.getElementById('next-event-btn').style.display = firstEventData.has_more ? 'block' : 'none';
            if (finalReportBtn) finalReportBtn.style.display = firstEventData.has_more ? 'none' : 'block';
        }
    } catch (error) {
        console.error('Error starting sub-scenario:', error);
        alert('Failed to start sub-scenario. Please try again.');
    }
}

// Restart current scenario
async function restartCurrentScenario() {
    if (!currentScenario) return;
    
    // Find the scenario ID from the stored scenarios
    const scenarioId = Object.keys(scenarios).find(key => {
        const s = scenarios[key];
        return s.name === currentScenario.name || s.id === currentScenario.id;
    });
    
    if (scenarioId) {
        await startScenario(scenarioId);
    } else {
        // Fallback: reload scenarios and find by name
        const response = await fetch(`${API_BASE}/scenarios`);
        const scenarioList = await response.json();
        const found = scenarioList.find(s => s.name === currentScenario.name);
        if (found) {
            await startScenario(found.id);
        } else {
            alert('Could not restart scenario. Please select it again from the main menu.');
        }
    }
}

// Load next event
async function loadNextEvent() {
    if (!currentSessionId) return;

    try {
        // First, advance to next step
        const nextResponse = await fetch(`${API_BASE}/sessions/${currentSessionId}/next`, {
            method: 'POST'
        });
        
        if (!nextResponse.ok) {
            const errorData = await nextResponse.json();
            if (errorData.error === 'Must make a decision first') {
                // Already at a decision point, just reload current state
                const eventsResponse = await fetch(`${API_BASE}/sessions/${currentSessionId}/events?since=${lastDecisionStep}`);
                const data = await eventsResponse.json();
                
                displayEvents(data.events);
                if (data.decision_point) {
                    showDecisionPoint(data.decision_point);
                }
                updateMetrics(data.events);
                updateScore();
                currentStep = data.current_step ?? currentStep;
                return;
            }
        }
        
        // Then get the updated events
        const response = await fetch(`${API_BASE}/sessions/${currentSessionId}/events?since=${lastDecisionStep}`);
        const data = await response.json();

        const finalReportBtn = document.getElementById('view-nist-button');
        // Display events
        displayEvents(data.events);

        // Check for decision point
        if (data.decision_point) {
            showDecisionPoint(data.decision_point);
            document.getElementById('next-event-btn').style.display = 'none';
            if (finalReportBtn) finalReportBtn.style.display = 'none';
        } else {
            document.getElementById('next-event-btn').style.display = data.has_more ? 'block' : 'none';
            if (finalReportBtn) finalReportBtn.style.display = data.has_more ? 'none' : 'block';
        }

        // Update metrics
        updateMetrics(data.events);

        // Update score
        updateScore();
        currentStep = data.current_step ?? currentStep;

        // Check if scenario is complete
        if (!data.has_more && !data.decision_point) {
        completeScenario();
        }
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

// Display events
function displayEvents(events, reset = false) {
    const container = document.getElementById('events-container');
    
    if (reset) {
        container.innerHTML = '';
        displayedEventIds.clear();
    }
    
    events.forEach(event => {
        if (event.type === 'decision_point') return;
        if (event.id && displayedEventIds.has(event.id)) return;
        
        const eventDiv = document.createElement('div');
        eventDiv.className = `event-item alert-${event.severity || 'medium'}`;
        
        let logEntry = '';
        if (event.log_entry) {
            logEntry = `<div class="log-entry">${escapeHtml(event.log_entry)}</div>`;
        }

        eventDiv.innerHTML = `
            <h4>${escapeHtml(event.title || 'Event')}</h4>
            <div class="event-meta">
                <strong>Source:</strong> ${escapeHtml(event.source || 'Unknown')} | 
                <strong>Time:</strong> ${formatTimestamp(event.timestamp)}
            </div>
            <div class="event-description">${escapeHtml(event.description || '')}</div>
            ${logEntry}
        `;
        
        container.appendChild(eventDiv);
        if (event.id) displayedEventIds.add(event.id);
    });

    container.scrollTop = container.scrollHeight;
}

// Show decision point
function showDecisionPoint(decisionPoint) {
    const section = document.getElementById('decision-section');
    const description = document.getElementById('decision-description');
    const options = document.getElementById('decision-options');

    description.textContent = decisionPoint.description;
    options.innerHTML = '';
    currentDecisionPoint = decisionPoint;

    decisionPoint.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option.text;
        btn.addEventListener('click', () => submitDecision(decisionPoint.id, option.id));
        options.appendChild(btn);
    });

    section.style.display = 'block';
    document.getElementById('feedback-section').style.display = 'none';
    // Remember which step this decision corresponds to
    pendingDecisionStep = currentStep;
}

// Submit decision
async function submitDecision(actionId, optionId) {
    try {
        const response = await fetch(`${API_BASE}/sessions/${currentSessionId}/action`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action_id: actionId, option_id: optionId })
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit decision');
        }

        const feedback = await response.json();
        showFeedback(feedback, optionId);
        
        // Hide decision section
        document.getElementById('decision-section').style.display = 'none';
        
        // Update score
        updateScore();
        // After resolving a decision, start a new sequence: remember last decision step
        if (pendingDecisionStep !== null) {
            lastDecisionStep = pendingDecisionStep;
            pendingDecisionStep = null;
        }

        // Load next event after a delay (scenarios now have multiple decision points)
        setTimeout(() => {
            loadNextEvent();
        }, 3000);
    } catch (error) {
        console.error('Error submitting decision:', error);
        alert('Failed to submit decision. Please try again.');
    }
}

// Show feedback
function showFeedback(feedback, selectedOptionId) {
    const section = document.getElementById('feedback-section');
    const content = document.getElementById('feedback-content');

    const feedbackClass = feedback.correct ? 'feedback-correct' : 'feedback-incorrect';
    const icon = feedback.correct ? '✓' : '✗';
    const selectedOption = currentDecisionPoint && selectedOptionId
        ? currentDecisionPoint.options.find(opt => opt.id === selectedOptionId)
        : null;
    const explanation = feedback.explanation || (selectedOption ? selectedOption.explanation : '');
    const why = explanation ? `<p><strong>Why:</strong> ${explanation}</p>` : '';

    content.innerHTML = `
        <div class="${feedbackClass}">
            <strong>${icon} ${feedback.correct ? 'Correct!' : 'Incorrect'}</strong>
            <p>${feedback.feedback}</p>
            <p><strong>Score:</strong> ${feedback.score} / ${feedback.max_score}</p>
            ${why}
            <button id="view-feedback-details-btn" class="btn-secondary" style="margin-top: 15px; width: 100%;">View Detailed Analysis</button>
            <p style="margin-top: 10px; font-style: italic; color: #666;">Hold tight for a few seconds while the NIST standard practice page appears automatically.</p>
        </div>
    `;

    const detailsBtn = document.getElementById('view-feedback-details-btn');
    if (detailsBtn) {
        detailsBtn.dataset.feedback = JSON.stringify(feedback);
        detailsBtn.dataset.optionId = selectedOptionId || '';
        detailsBtn.dataset.decision = currentDecisionPoint ? JSON.stringify(currentDecisionPoint) : '';
        detailsBtn.onclick = () => {
            const storedFeedback = detailsBtn.dataset.feedback
                ? JSON.parse(detailsBtn.dataset.feedback)
                : feedback;
            const storedDecision = detailsBtn.dataset.decision
                ? JSON.parse(detailsBtn.dataset.decision)
                : currentDecisionPoint;
            const storedOptionId = detailsBtn.dataset.optionId || selectedOptionId;
            showFeedbackDetailsModal(storedFeedback, storedOptionId, storedDecision);
        };
    }

    section.style.display = 'block';
}

function showFeedbackDetailsModal(feedback, selectedOptionId = null, decisionPoint = null) {
    const modal = document.getElementById('feedback-details-modal');
    const body = document.getElementById('feedback-details-body');
    if (!modal || !body || !decisionPoint) return;

    const selectedOption = decisionPoint.options.find(opt => opt.id === selectedOptionId);
    const maxScore = feedback.max_score || decisionPoint.max_score || 10;
    const awardedScore = feedback.score ?? (selectedOption ? selectedOption.score : 0);

    const sortedOptions = [...decisionPoint.options].sort((a, b) => b.score - a.score);
    let html = '';

    if (selectedOption) {
        html += `
            <div style="margin-bottom: 25px; padding: 15px; background: #f8f9fa; border-left: 4px solid #667eea; border-radius: 4px;">
                <h4 style="color: #667eea; margin-bottom: 10px;">Your Selection</h4>
                <p><strong>${escapeHtml(selectedOption.text)}</strong></p>
                <p><strong>Score:</strong> ${awardedScore} / ${maxScore} points</p>
                <p><strong>Feedback:</strong> ${escapeHtml(selectedOption.feedback || 'No feedback available')}</p>
                ${selectedOption.explanation ? `<p><strong>Explanation:</strong> ${escapeHtml(selectedOption.explanation)}</p>` : ''}
            </div>
        `;
    }

    html += `
        <h4 style="color: #667eea; margin-bottom: 15px;">All Options Comparison</h4>
        <p style="margin-bottom: 15px; color: #666;">Review all available options to understand why certain choices score higher:</p>
    `;

    sortedOptions.forEach(option => {
        const isSelected = option.id === selectedOptionId;
        const displayScore = isSelected ? awardedScore : option.score;
        const scoreColor = displayScore >= 8 ? '#28a745' : displayScore >= 5 ? '#ffc107' : '#dc3545';
        const scoreLabel = displayScore >= 8 ? 'Optimal/Strong' : displayScore >= 5 ? 'Partial' : 'Incorrect';

        html += `
            <div style="margin-bottom: 20px; padding: 15px; background: ${isSelected ? '#f0f4ff' : 'white'}; border: 2px solid ${isSelected ? '#667eea' : '#e9ecef'}; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                    <strong style="color: #333; flex: 1;">${escapeHtml(option.text)}</strong>
                    <span style="background: ${scoreColor}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.85em; font-weight: 600; margin-left: 10px;">
                        ${displayScore} points (${scoreLabel})
                    </span>
                </div>
                <p style="margin: 8px 0; color: #555;"><strong>Feedback:</strong> ${escapeHtml(option.feedback || 'No feedback available')}</p>
                ${option.explanation ? `<p style="margin: 8px 0; color: #666; font-style: italic;"><strong>Why this option:</strong> ${escapeHtml(option.explanation)}</p>` : ''}
                ${isSelected ? `<p style="margin-top: 8px; color: #667eea; font-weight: 600;">✓ Your selection</p>` : ''}
            </div>
        `;
    });

    body.innerHTML = html;
    modal.style.display = 'flex';
}

// Update metrics
function updateMetrics(events) {
    const latestEvent = events[events.length - 1];
    if (!latestEvent || !latestEvent.metrics) return;

    const metrics = latestEvent.metrics;

    // Update CPU
    if (metrics.cpu_usage !== undefined) {
        document.getElementById('cpu-usage').textContent = `${metrics.cpu_usage}%`;
        cpuData.push({ x: new Date(), y: metrics.cpu_usage });
        if (cpuData.length > 20) cpuData.shift();
        updateChart(cpuChart, cpuData, 'CPU Usage (%)');
    }

    // Update Memory
    if (metrics.memory_usage !== undefined) {
        document.getElementById('memory-usage').textContent = `${metrics.memory_usage}%`;
        memoryData.push({ x: new Date(), y: metrics.memory_usage });
        if (memoryData.length > 20) memoryData.shift();
        updateChart(memoryChart, memoryData, 'Memory Usage (%)');
    }

    // Update Network
    if (metrics.inbound_connections !== undefined) {
        document.getElementById('network-traffic').textContent = `${metrics.inbound_connections.toLocaleString()}`;
        networkData.push({ x: new Date(), y: metrics.inbound_connections });
        if (networkData.length > 20) networkData.shift();
        updateChart(networkChart, networkData, 'Inbound Connections');
    }
}

// Initialize charts
function initializeCharts() {
    const chartOptions = {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                legend: { display: false }
            }
        }
    };

    cpuChart = new Chart(document.getElementById('cpu-chart'), {
        ...chartOptions,
        data: { datasets: [{ data: [], borderColor: '#667eea', tension: 0.4 }] }
    });

    memoryChart = new Chart(document.getElementById('memory-chart'), {
        ...chartOptions,
        data: { datasets: [{ data: [], borderColor: '#764ba2', tension: 0.4 }] }
    });

    networkChart = new Chart(document.getElementById('network-chart'), {
        ...chartOptions,
        data: { datasets: [{ data: [], borderColor: '#28a745', tension: 0.4 }] }
    });
}

// Update chart
function updateChart(chart, data, label) {
    chart.data.datasets[0].data = data;
    chart.data.datasets[0].label = label;
    chart.update('none');
}

// Update score
async function updateScore() {
    if (!currentSessionId) return;

    try {
        const response = await fetch(`${API_BASE}/sessions/${currentSessionId}/status`);
        const status = await response.json();

        document.getElementById('current-score').textContent = status.score;
        document.getElementById('max-score').textContent = status.max_score;
        
        const percentage = status.max_score > 0 ? (status.score / status.max_score * 100) : 0;
        document.getElementById('score-fill').style.width = `${percentage}%`;
    } catch (error) {
        console.error('Error updating score:', error);
    }
}

// Complete scenario
async function completeScenario() {
    if (!currentSessionId) return;

    try {
        const response = await fetch(`${API_BASE}/sessions/${currentSessionId}/complete`, {
            method: 'POST'
        });

        const result = await response.json();
        showCompletionScreen(result);
    } catch (error) {
        console.error('Error completing scenario:', error);
    }
}

// Show completion screen
function showCompletionScreen(result) {
    // Hide simulation screen elements
    document.getElementById('decision-section').style.display = 'none';
    document.getElementById('feedback-section').style.display = 'none';
    document.getElementById('next-event-btn').style.display = 'none';

    const scoreElement = document.getElementById('final-score');
    const maxScoreElement = document.getElementById('final-max-score');
    const percentageElement = document.getElementById('final-score-percentage');
    if (scoreElement && maxScoreElement && percentageElement) {
        const percentage = result.percentage || (result.max_score > 0 ? (result.score / result.max_score) * 100 : 0);
        scoreElement.textContent = result.score || 0;
        maxScoreElement.textContent = result.max_score || 10;
        percentageElement.textContent = `${Math.round(percentage)}%`;
    }

    // Display recommendations
    const recommendationsList = document.getElementById('recommendations-list');
    recommendationsList.innerHTML = '';

    if (result.recommendations && typeof result.recommendations === 'object') {
        Object.keys(result.recommendations).forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'recommendation-category';
            
            const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ');
            categoryDiv.innerHTML = `<h4>${categoryTitle}</h4>`;

            if (Array.isArray(result.recommendations[category])) {
                result.recommendations[category].forEach(rec => {
                    const recDiv = document.createElement('div');
                    recDiv.className = 'recommendation-item';
                    recDiv.innerHTML = `
                        <h5>${rec.title} <span class="priority priority-${rec.priority}">${rec.priority}</span></h5>
                        <p>${rec.description}</p>
                    `;
                    categoryDiv.appendChild(recDiv);
                });
            }

            recommendationsList.appendChild(categoryDiv);
        });
    } else {
        // Default recommendations if none provided
        recommendationsList.innerHTML = '<p>Great job completing this scenario! Review your decision and consider how you could improve your response time and accuracy.</p>';
    }

    showScreen('completion-screen');
}

// Utility functions
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function formatTimestamp(timestamp) {
    if (!timestamp) return 'Unknown';
    const date = new Date(timestamp);
    return date.toLocaleString();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

