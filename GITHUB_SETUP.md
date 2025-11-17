# GitHub Repository Setup Guide

## Project Name
**Recommended**: `soc-incident-response-simulator`

Alternative names:
- `network-incident-response-simulator`
- `cyber-incident-training-tool`
- `soc-analyst-training-platform`

## Setup Instructions

### Option 1: Create Repository on GitHub First (Recommended)

1. Go to https://github.com/new
2. Repository name: `soc-incident-response-simulator`
3. Description: "Interactive Network Incident Response Simulator - SOC-Style Training Tool for DDoS, Data Breach, and Ransomware Scenarios"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Option 2: Use Command Line (After providing GitHub username)

Run these commands in the project directory:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Interactive Network Incident Response Simulator"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/soc-incident-response-simulator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Files Included

The following files will be uploaded:
- All source code (app.py, HTML, CSS, JavaScript)
- Scenario JSON files
- Documentation (README.md, INTERMEDIATE_REPORT.md)
- Configuration files (requirements.txt, .gitignore)
- Project structure

## Repository Settings

After creating the repository, consider:
- Adding topics: `cybersecurity`, `incident-response`, `soc-training`, `ddos`, `ransomware`, `data-breach`, `flask`, `python`
- Adding a description
- Setting up branch protection (optional)
- Enabling Issues and Discussions (for feedback)

