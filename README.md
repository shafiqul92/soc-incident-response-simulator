# Interactive Network Incident Response Simulator

A web-based training tool for Security Operations Center (SOC) analysts and cybersecurity students. Practice detecting, analyzing, and responding to real-world cyber incidents in a safe, synthetic environment.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Technology Stack](#technology-stack)
- [Dependencies](#dependencies)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🎯 Overview

This simulator provides hands-on training for incident response through three main scenarios:

1. **DDoS Attack Scenario** - Volumetric network attacks with 3 sub-scenarios
2. **Data Breach Scenario** - Credential misuse and data exfiltration with 3 sub-scenarios
3. **Ransomware Infection Scenario** - File encryption and lateral movement with 4 sub-scenarios

Each scenario includes realistic events, decision points, scoring, and NIST-aligned feedback.

## ✨ Features

- **Interactive Scenarios**: Realistic incident simulations with synthetic events
- **Decision Points**: Multiple-choice questions with immediate feedback
- **Scoring System**: Real-time scoring based on priority and effectiveness
- **Visual Metrics**: CPU, Memory, and Network traffic visualizations
- **Tab Navigation**: Easy switching between sub-scenarios
- **Scenario Descriptions**: Detailed context for each scenario
- **NIST-Aligned Recommendations**: Industry-standard incident response guidance

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.7 or higher** ([Download Python](https://www.python.org/downloads/))
- **pip** (Python package manager - comes with Python)
- **Web Browser** (Chrome, Firefox, Edge, or Safari)
- **Git** (optional, for cloning the repository)

### Verify Python Installation

Open a terminal/command prompt and run:

```bash
python --version
# or
python3 --version
```

You should see Python 3.7 or higher.

## 🚀 Installation

### Step 1: Clone or Download the Project

If you have Git installed:

```bash
git clone <repository-url>
cd CPRE-5300_PROJECT
```

Or download and extract the project ZIP file to your desired location.

### Step 2: Navigate to Project Directory

```bash
cd CPRE-5300_PROJECT
```

### Step 3: Create Virtual Environment (Recommended)

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

This will install:
- Flask (web framework)
- Flask-CORS (CORS support)

## 🏃 Running the Application

### Step 1: Start the Flask Server

From the project root directory, run:

```bash
python app.py
```

Or if using Python 3 explicitly:

```bash
python3 app.py
```

You should see output similar to:

```
 * Running on http://127.0.0.1:5050
 * Debug mode: on
```

### Step 2: Open in Web Browser

Open your web browser and navigate to:

```
http://localhost:5050
```

or

```
http://127.0.0.1:5050
```

### Step 3: Start Training!

1. Read the welcome message and project overview
2. Select a scenario (DDoS, Data Breach, or Ransomware)
3. Choose a sub-scenario tab (if available)
4. Click "Next Event" to progress through events
5. Make decisions at decision points
6. Review your score and feedback

### Step 4: Stop the Server

Press `Ctrl+C` in the terminal to stop the Flask server.

## 📁 Project Structure

```
CPRE-5300_PROJECT/
│
├── app.py                      # Flask backend application
├── requirements.txt            # Python dependencies
├── README.md                   # This file
├── INTERMEDIATE_REPORT.md     # Project report
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

## 📖 Usage Guide

### Selecting a Scenario

1. On the main page, you'll see three scenario cards
2. Click on any scenario card to begin
3. The scenario page will load with tabs (if sub-scenarios exist)

### Using Tabs

- Each tab represents a sub-scenario
- Click a tab to switch to that sub-scenario
- The description updates automatically
- Each tab runs independently

### Progressing Through Events

1. Click "Next Event" to see the next event
2. Events appear in chronological order
3. Watch the metrics (CPU, Memory, Network) update
4. Read event descriptions and log entries carefully

### Making Decisions

1. When a decision point appears, read the question carefully
2. Review all available options
3. Select the best response based on:
   - Priority (immediate vs. delayed action)
   - Effectiveness (does it solve the problem?)
   - Best practices (NIST-aligned procedures)
4. Click your chosen option
5. Review the feedback and score

### Understanding Scores

- Each decision point is worth up to 10 points
- Your total score accumulates across all decisions
- Higher scores indicate better decision-making
- Review feedback to understand why certain choices are better

### Viewing Scoring Rubric

- Click "View Scoring Rubric" button (visible during scenarios)
- Review the scoring criteria
- Understand how decisions are evaluated

## 🛠 Technology Stack

### Backend
- **Python 3.x**: Programming language
- **Flask**: Web framework
- **Flask-CORS**: Cross-origin resource sharing

### Frontend
- **HTML5**: Markup
- **CSS3**: Styling with animations
- **JavaScript (ES6+)**: Frontend logic
- **Chart.js**: Metrics visualization (loaded via CDN)

### Data Storage
- **JSON**: Scenario definitions and session data

## 📦 Dependencies

### Python Dependencies

All Python dependencies are listed in `requirements.txt`:

```
Flask==3.0.0
Flask-CORS==4.0.0
```

To install:
```bash
pip install -r requirements.txt
```

### Frontend Dependencies

Frontend dependencies are loaded via CDN (no installation needed):

- **Chart.js**: Loaded from `cdn.jsdelivr.net`

### System Requirements

- **Python**: 3.7 or higher
- **RAM**: Minimum 512MB available
- **Disk Space**: ~10MB for project files
- **Browser**: Modern browser with JavaScript enabled

## 🔧 Troubleshooting

### Port Already in Use

**Error**: `Address already in use` or `Port 5050 is already in use`

**Solution**: 
1. Find and close the process using port 5050
2. Or modify `app.py` to use a different port (change `port=5050` to another number)

**Windows:**
```bash
netstat -ano | findstr :5050
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
lsof -ti:5050 | xargs kill -9
```

### Module Not Found Error

**Error**: `ModuleNotFoundError: No module named 'flask'`

**Solution**: 
1. Ensure virtual environment is activated
2. Reinstall dependencies: `pip install -r requirements.txt`

### Scenarios Not Loading

**Error**: Scenarios don't appear or show errors

**Solution**:
1. Verify all JSON files exist in `scenarios/` directory
2. Check JSON file syntax (use a JSON validator)
3. Restart the Flask server

### Browser Issues

**Error**: Page doesn't load or JavaScript errors

**Solution**:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Try a different browser
3. Check browser console for errors (F12)
4. Ensure JavaScript is enabled

### CORS Errors

**Error**: CORS policy errors in browser console

**Solution**:
1. Ensure Flask-CORS is installed: `pip install Flask-CORS`
2. Verify `CORS(app)` is in `app.py`

## 🎓 Learning Resources

### Understanding Scenarios

- Read scenario descriptions before starting
- Review the severity legend to understand event priorities
- Take time to analyze each event
- Consider the NIST incident response lifecycle

### Best Practices

1. **Read Carefully**: Pay attention to event details and timestamps
2. **Think Before Deciding**: Consider all options before selecting
3. **Learn from Feedback**: Review explanations to understand best practices
4. **Practice Multiple Times**: Try scenarios multiple times to improve
5. **Review Recommendations**: Study the NIST-aligned recommendations

## 🔒 Security Note

This simulator uses **synthetic data only**. All events, logs, and metrics are pre-authored and do not represent real security incidents. No actual systems or data are involved.

## 📝 Development Notes

### Adding New Scenarios

1. Create a new JSON file in `scenarios/` directory
2. Follow the existing JSON schema
3. Update `app.py` to load the new scenario
4. Restart the server

### Modifying Existing Scenarios

1. Edit the JSON file in `scenarios/` directory
2. Ensure valid JSON syntax
3. Restart the server to load changes

### Customizing UI

- Modify `static/css/style.css` for styling
- Edit `static/js/app.js` for functionality
- Update `templates/index.html` for structure

## 🤝 Contributing

This is an educational project. For suggestions or improvements:

1. Document the proposed change
2. Test thoroughly
3. Ensure compatibility with existing features

## 📄 License

This project is created for educational purposes as part of CPRE-5300 coursework.

## 👤 Author

**Md Shafiqul Islam**  
Course: CPRE-5300  
Semester: Fall 2025

## 📚 References

- NIST SP 800-61 Rev. 2: Computer Security Incident Handling Guide
- CISA: Incident Response Playbooks
- ENISA: Ransomware Good Practice Guide
- Verizon DBIR 2024: Data Breach Investigations Report

## 🆘 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review the INTERMEDIATE_REPORT.md for implementation details
3. Verify all dependencies are installed correctly

---

**Last Updated**: November 2025  
**Version**: 1.0 (Intermediate Release)
