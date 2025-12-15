# Interactive Network Incident Response Simulator

A web-based training tool designed for cybersecurity students and Security Operations Center (SOC) trainees. The simulator provides hands-on practice in detecting, analyzing, and responding to common cyber incidents using synthetic data in a safe, controlled environment. All scenarios and feedback are aligned with the NIST SP 800-61 Incident Response framework.

---

## Overview

The Interactive Network Incident Response Simulator presents learners with realistic incident timelines composed of alerts, logs, and system metrics. Users must interpret evolving signals and make response decisions at key moments, receiving immediate feedback and structured guidance.

The simulator includes three primary incident types:

- **DDoS Attacks**: Network and transport-layer overload scenarios
- **Data Breaches**: Credential misuse and data exfiltration detection
- **Ransomware Infections**: Encryption activity, lateral movement, and recovery decisions

A built-in Learning Center provides background instruction, and a Detailed Analysis view explains tradeoffs between response options.

---

## Key Features

- Interactive incident timelines with severity indicators
- Decision points with tiered scoring and explanations
- Detailed Analysis view comparing all response options
- Real-time CPU, memory, and network metrics visualization (Chart.js)
- Learning Center with incident indicators and response guidance
- End-of-scenario recommendations mapped to NIST SP 800-61 phases
- JSON-driven scenario design for easy extension and modification

---

## Prerequisites

- Python 3.7 or higher
- pip (Python package manager)
- A modern web browser (Chrome, Firefox, Edge, or Safari)
- Git (optional, for cloning the repository)

---

## Download

### Option 1: Clone with Git (Recommended)

If you have Git installed, clone the repository:

```bash
git clone https://github.com/shafiqul92/soc-incident-response-simulator.git
cd soc-incident-response-simulator
```

### Option 2: Download ZIP

1. Visit the repository: https://github.com/shafiqul92/soc-incident-response-simulator
2. Click the green **"Code"** button
3. Select **"Download ZIP"**
4. Extract the ZIP file to your desired location
5. Navigate to the extracted folder in your terminal/command prompt

---

## Installation

From the project root directory:

```bash
python -m venv venv

# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

## Running the Application

Start the Flask server:

```bash
python app.py
```

Open a web browser and navigate to:

```
http://localhost:5050
```

## Project Structure

```
.
├── app.py                     # Flask backend (API, sessions, scoring, recommendations)
├── requirements.txt           # Python dependencies
├── README.md                  # This file
├── templates/
│   └── index.html             # Main UI layout and screens
├── static/
│   ├── js/
│   │   └── app.js             # Frontend logic (API calls, navigation, charts)
│   └── css/
│       └── style.css          # Styling and layout
└── scenarios/
    ├── ddos.json              # DDoS scenario
    ├── data_breach.json       # Data breach scenario
    ├── ransomware.json        # Ransomware scenario
    └── scenario_1.json ...    # Sub-scenarios
```

## Scenarios and Data

All scenarios are defined using JSON files stored in the `scenarios/` directory. Each scenario includes events, decision points, scoring logic, and feedback messages.

All data is fully synthetic and intended solely for educational use.

## Dependencies

**Python dependencies** (listed in `requirements.txt`):

- Flask==3.0.0
- Flask-CORS==4.0.0

**Frontend library**:

- Chart.js (loaded via CDN from cdn.jsdelivr.net)

## Known Limitations

- Session state is stored in memory and resets when the server restarts
- No persistent learner tracking or instructor analytics
- Testing has primarily been conducted through manual walkthroughs

## Documentation

Extended documentation is provided in `PROJECT_SUMMARY.md`.

The final project report (submitted as a PDF to Canvas) contains the complete write-up, evaluation, and reflection.
