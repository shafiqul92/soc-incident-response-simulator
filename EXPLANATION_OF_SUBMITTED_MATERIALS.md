# EXPLANATION OF SUBMITTED MATERIALS

## Overview

This section provides an organized overview of all components included in the final project deliverable. The Interactive Network Incident Response Simulator consists of source code files, documentation, demonstration videos, and project reports. All materials are organized in the project repository and can be accessed through the GitHub repository or by downloading the project files directly.

**GitHub Repository:** https://github.com/shafiqul92/soc-incident-response-simulator

---

## PROJECT CONTENT DELIVERABLES

### Item 1: Final Project Report

- **Item Description:** Comprehensive final project report documenting the complete project, including project overview, objectives, architecture, implementation details, enhancements since intermediate submission, outcomes assessment, and analysis of strengths and weaknesses.

- **File name/path/link:** 
  - `PROJECT_SUMMARY.md` (Markdown format)
  - `530 Project Final Submission.docx` or `CPRE-5300 Project Final Submission.docx` (if submitted as Word document)

- **Relevant information:** This document contains the complete project documentation, including all sections requested in the final submission template. It can be read as a Markdown file or converted to PDF/Word format for submission.

---

### Item 2: Intermediate Project Report

- **Item Description:** Intermediate project report submitted earlier in the semester, documenting the project status at the intermediate milestone.

- **File name/path/link:** 
  - `INTERMEDIATE_REPORT.txt`
  - `CPRE-5300_INTERMEDIATE_PROJECT_REPORT_MD_SHAFIQUL_ISLAM.docx`
  - `CPRE-5300_INTERMEDIATE_PROJECT_REPORT_MD_SHAFIQUL_ISLAM.pdf`

- **Relevant information:** Provides baseline documentation of the project's state at the intermediate submission point. Useful for comparing progress made in the final phase.

---

### Item 3: Project Proposal

- **Item Description:** Initial project proposal document submitted at the beginning of the semester.

- **File name/path/link:** 
  - `CPRE-5300_Project_Proposal_Md_Shafiqul_Islam.pdf`

- **Relevant information:** Contains the original project plan, objectives, and scope as proposed at the start of the project.

---

### Item 4: Demonstration Video

- **Item Description:** Video demonstration showing the application in action, walking through scenario selection, event progression, decision-making, feedback, and NIST recommendations.

- **File name/path/link:** 
  - `PROJECT-DEMO.mp4`
  - `Network Incident Response Simulator - Demo.mp4`

- **Relevant information:** The video demonstrates the complete user workflow, including all major features: scenario selection, event progression, decision points, feedback system, detailed analysis modal, Learning Center, and NIST recommendations screen. The video can be played in any standard video player (VLC, Windows Media Player, QuickTime, etc.).

---

## SOURCE CODE AND READMES

### Item 1: Main Application Backend (Flask Server)

- **Item Description:** Core Flask backend application (`app.py`) that handles API endpoints, session management, scenario loading, decision processing, scoring, and NIST recommendation generation.

- **File name/path/link:** 
  - `app.py`

- **Relevant information:** 
  - **Documentation:** The file includes comprehensive inline comments explaining major functions, API endpoints, and key logic.
  - **Key Functions:** 
    - `load_scenarios()`: Loads scenario JSON files
    - Session management and API route handlers
    - Decision processing and scoring logic
    - NIST recommendation generation
  - **Installation:** Requires Python 3.7+ and dependencies listed in `requirements.txt`. See README.md for detailed installation instructions.
  - **Execution:** Run with `python app.py` (defaults to port 5050)

---

### Item 2: Frontend HTML Template

- **Item Description:** Main HTML template (`index.html`) containing the structure for all application screens: scenario selection, Learning Center, simulation screen, completion screen, and modal dialogs.

- **File name/path/link:** 
  - `templates/index.html`

- **Relevant information:** 
  - **Structure:** Contains all screen definitions, modal structures, and semantic HTML markup
  - **Key Sections:** 
    - Header with Learning Center button
    - Scenario Selection Screen
    - Learning Center Screen (comprehensive educational content)
    - Simulation Screen (events, metrics, decisions, feedback)
    - Completion Screen (NIST Recommendations)
    - Modals (Scoring Rubric, Scenario Background, Detailed Analysis)
  - **Dependencies:** Requires Flask template rendering. Uses Chart.js via CDN for metrics visualization.

---

### Item 3: Frontend JavaScript Logic

- **Item Description:** Client-side JavaScript (`app.js`) that handles all frontend interactions, API communication, screen navigation, event display, chart updates, decision submission, and modal management.

- **File name/path/link:** 
  - `static/js/app.js`

- **Relevant information:** 
  - **Documentation:** Well-commented code explaining functions, state management, and event handlers
  - **Key Features:** 
    - Scenario loading and session creation
    - Event progression and display
    - Decision submission and feedback display
    - Chart.js integration for metrics visualization
    - Modal handling and screen navigation
    - State management (session IDs, displayed events, decision points)
  - **Browser Compatibility:** Works in modern browsers (Chrome, Firefox, Edge, Safari)

---

### Item 4: Stylesheet (CSS)

- **Item Description:** Comprehensive CSS stylesheet (`style.css`) providing modern, responsive styling for all application screens, cards, buttons, modals, charts, and animations.

- **File name/path/link:** 
  - `static/css/style.css`

- **Relevant information:** 
  - **Features:** 
    - Responsive design with CSS Grid and Flexbox
    - Smooth animations and transitions
    - Color-coded severity indicators
    - Modal styling with backdrop
    - Chart container styling
    - Learning Center card layout
  - **Design:** Modern gradient backgrounds, card-based layouts, professional color scheme

---

### Item 5: Scenario Data Files (JSON)

- **Item Description:** JSON files defining all scenario content, including events, decision points, options, scoring, feedback, and explanations. Organized as main scenarios and sub-scenarios.

- **File name/path/link:** 
  - `scenarios/ddos.json` (Main DDoS scenario)
  - `scenarios/data_breach.json` (Main Data Breach scenario)
  - `scenarios/ransomware.json` (Main Ransomware scenario)
  - `scenarios/scenario_1.json` through `scenarios/scenario_10.json` (Sub-scenarios)

- **Relevant information:** 
  - **Structure:** Each file contains events array, decision points with options, scoring definitions, and feedback messages
  - **Data-Driven Design:** The application is fully data-driven—new scenarios can be added by creating new JSON files without modifying code
  - **Content:** All scenarios are synthetic and educational, aligned with NIST SP 800-61 framework
  - **Format:** Standard JSON format, human-readable and editable

---

### Item 6: Project README

- **Item Description:** Comprehensive README file providing installation instructions, usage guide, project structure, technology stack, dependencies, and troubleshooting information.

- **File name/path/link:** 
  - `README.md`

- **Relevant information:** 
  - **Installation Instructions:** Step-by-step guide for setting up the development environment
  - **Running Instructions:** Commands to start the Flask server and access the application
  - **Project Structure:** Directory layout explanation
  - **Usage Guide:** How to use the simulator, navigate scenarios, and understand scoring
  - **Troubleshooting:** Common issues and solutions
  - **Technology Stack:** Complete list of technologies used

---

### Item 7: Python Dependencies File

- **Item Description:** Requirements file listing all Python package dependencies needed to run the application.

- **File name/path/link:** 
  - `requirements.txt`

- **Relevant information:** 
  - **Contents:** 
    - Flask==3.0.0 (Web framework)
    - Flask-CORS==4.0.0 (Cross-Origin Resource Sharing support)
  - **Installation:** Run `pip install -r requirements.txt` to install all dependencies
  - **Python Version:** Requires Python 3.7 or higher

---

### Item 8: Code Archive (Text Format)

- **Item Description:** Archive containing source code files in text format for easy review and submission.

- **File name/path/link:** 
  - `code.zip` (Archive)
  - `code/app.txt` (Backend code)
  - `code/index.txt` (HTML template)
  - `code/app_js.txt` (JavaScript code)
  - `code/style_css.txt` (CSS code)

- **Relevant information:** 
  - **Purpose:** Alternative format for code submission/review
  - **Format:** Plain text files containing code content
  - **Organization:** All major code files included in organized archive

---

## PARTNERS

**Note:** This is an individual project completed by Md Shafiqul Islam. All components, code, documentation, and deliverables were created independently by the author.

---

## DEPENDENCIES, RESOURCES & TOOLS

### Required Software and Versions

- **Python 3.7 or higher**
  - Download from: https://www.python.org/downloads/
  - Required for running the Flask backend server

- **pip** (Python package manager)
  - Comes bundled with Python installation
  - Used to install Python dependencies from `requirements.txt`

- **Web Browser** (any modern browser)
  - Chrome, Firefox, Edge, or Safari
  - Used to access and interact with the web application
  - Must support JavaScript (ES6+) and modern CSS features

### Python Dependencies (installed via pip)

- **Flask 3.0.0**
  - Purpose: Web framework for backend API and routing
  - Installation: `pip install Flask==3.0.0`

- **Flask-CORS 4.0.0**
  - Purpose: Enables Cross-Origin Resource Sharing for frontend-backend communication
  - Installation: `pip install Flask-CORS==4.0.0`

### External JavaScript Libraries (loaded via CDN)

- **Chart.js 4.4.0+**
  - Purpose: Real-time visualization of system metrics (CPU, Memory, Network)
  - Source: Loaded from `cdn.jsdelivr.net` (no installation required)
  - Used for: Line charts displaying metrics over time

### Development Tools (Optional)

- **Git**
  - Purpose: Version control (if cloning from repository)
  - Optional: Project can be downloaded as ZIP instead

- **Code Editor/IDE**
  - Any text editor or IDE (VS Code, PyCharm, Sublime Text, etc.)
  - Optional: Only needed for code modifications

- **Virtual Environment (Python venv)**
  - Purpose: Isolated Python environment (recommended but not required)
  - Usage: `python -m venv venv` then activate before installing dependencies

### Operating System Compatibility

- **Windows 10/11**
- **macOS** (Intel or Apple Silicon)
- **Linux** (Ubuntu, Debian, or similar)

### Hardware Requirements

- **Minimal requirements:** Any modern computer capable of running Python 3.7+ and a web browser
- **No special hardware required:** Standard development machine is sufficient
- **Network:** Internet connection required only for initial Chart.js CDN loading (can work offline after first load)

### Configuration

- **Port Configuration:** 
  - Default port: 5050
  - Can be modified in `app.py` if port conflict exists
  - Access via: `http://localhost:5050`

- **No API Keys Required:** The application uses only local scenario data—no external APIs or authentication needed

### Data Sources

- **Scenario Content:** All scenario data is synthetic and stored in JSON files
- **No External Data:** Application does not require external databases, APIs, or data sources
- **Standalone Operation:** Fully functional without internet connection (after initial Chart.js load)

---

## ACCESS AND EXECUTION INSTRUCTIONS

### Quick Start Guide

1. **Install Python 3.7+** (if not already installed)
2. **Navigate to project directory** in terminal/command prompt
3. **Install dependencies:** `pip install -r requirements.txt`
4. **Run the application:** `python app.py`
5. **Open browser:** Navigate to `http://localhost:5050`
6. **Start using:** Click on a scenario card to begin simulation

For detailed instructions, see `README.md`.

---

## FILE ORGANIZATION SUMMARY

```
CPRE-5300_PROJECT/
├── app.py                          # Backend Flask application
├── requirements.txt                # Python dependencies
├── README.md                       # Installation and usage guide
├── PROJECT_SUMMARY.md              # Final project report
├── INTERMEDIATE_REPORT.txt         # Intermediate milestone report
├── templates/
│   └── index.html                  # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css              # Stylesheet
│   └── js/
│       └── app.js                 # Frontend JavaScript
├── scenarios/
│   ├── ddos.json                  # DDoS main scenario
│   ├── data_breach.json           # Data Breach main scenario
│   ├── ransomware.json            # Ransomware main scenario
│   └── scenario_1.json through scenario_10.json  # Sub-scenarios
├── code/
│   ├── app.txt                    # Backend code (text format)
│   ├── index.txt                  # HTML code (text format)
│   ├── app_js.txt                 # JavaScript code (text format)
│   └── style_css.txt              # CSS code (text format)
├── code.zip                       # Code archive
├── PROJECT-DEMO.mp4               # Demonstration video
└── [Additional documentation files]
```

---

All submitted materials are organized, documented, and ready for assessment. The source code includes inline comments, the README provides comprehensive installation instructions, and all dependencies are clearly specified.

