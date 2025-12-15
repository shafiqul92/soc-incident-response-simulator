# Interactive Network Incident Response Simulator
## Comprehensive Project Summary & Feature Documentation

**Author:** Md Shafiqul Islam  
**Course:** CPRE-5300  
**Semester:** Fall 2025  
**Date:** November 2025  
**GitHub Repository:** https://github.com/shafiqul92/soc-incident-response-simulator

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Application Architecture](#2-application-architecture)
3. [Screen-by-Screen Breakdown](#3-screen-by-screen-breakdown)
4. [Core Systems & Features](#4-core-systems--features)
5. [User Flows](#5-user-flows)
6. [Technical Implementation Details](#6-technical-implementation-details)
7. [Enhancements Since Intermediate Report](#7-enhancements-since-intermediate-report)
8. [Technology Stack](#8-technology-stack)

---

## 1. PROJECT OVERVIEW

### 1.1 What This Application Does

The **Interactive Network Incident Response Simulator** is a web-based training tool that provides hands-on, realistic practice for Security Operations Center (SOC) analysts and cybersecurity students. The application simulates three major types of cyber incidents:

- **DDoS Attacks** (Distributed Denial of Service)
- **Data Breaches** (Credential theft and data exfiltration)
- **Ransomware Infections** (Lateral movement and file encryption)

Users navigate through realistic incident timelines, analyze events and system metrics, make critical response decisions, and receive immediate feedback on their choices. All scenarios are aligned with **NIST SP 800-61** incident response framework and incorporate real-world attack patterns.

### 1.2 Key Capabilities

1. **Realistic Incident Simulation**: Chronological events with system metrics, logs, and alerts
2. **Interactive Decision Points**: Multiple-choice questions requiring strategic choices
3. **Real-Time Scoring**: Immediate feedback with explanations and scoring
4. **Comprehensive Learning Center**: Educational content covering incident types, indicators, and response procedures
5. **NIST-Aligned Recommendations**: Post-scenario analysis based on NIST SP 800-61 framework
6. **Detailed Analysis Modals**: In-depth comparison of all decision options
7. **Visual Metrics Dashboard**: Real-time charts for CPU, Memory, and Network traffic

### 1.3 Target Audience

- Undergraduate students studying cybersecurity or networking
- Early-career IT and security professionals
- SOC analysts in training
- Instructors and course designers

---

## 2. APPLICATION ARCHITECTURE

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Web Browser (Client)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   HTML/CSS   │  │ JavaScript   │  │   Chart.js   │      │
│  │  (Templates) │  │  (Frontend   │  │  (Metrics)   │      │
│  │              │  │   Logic)     │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                         │
                         │ HTTP/REST API
                         │
┌─────────────────────────────────────────────────────────────┐
│                   Flask Server (Backend)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ API Routes   │  │   Session    │  │   Scenario   │      │
│  │              │  │  Management  │  │    Loader    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                         │
                         │ File I/O
                         │
┌─────────────────────────────────────────────────────────────┐
│                   JSON Scenario Files                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Main        │  │   Sub-       │  │   Event &    │      │
│  │  Scenarios   │  │  Scenarios   │  │  Decision    │      │
│  │              │  │              │  │   Data       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Component Responsibilities

**Frontend (Browser)**
- Renders UI and handles user interactions
- Manages screen transitions and modal displays
- Sends API requests and processes responses
- Updates charts and visualizations
- Handles event progression and decision submission

**Backend (Flask Server)**
- Loads scenario definitions from JSON files
- Manages user sessions (in-memory storage)
- Processes decisions and calculates scores
- Generates NIST-aligned recommendations
- Serves API endpoints for frontend consumption

**Data Layer (JSON Files)**
- Stores scenario definitions (events, decisions, options)
- Contains scoring rules and feedback messages
- Defines sub-scenario relationships

---

## 3. SCREEN-BY-SCREEN BREAKDOWN

### 3.1 Header (Persistent Across All Screens)

**Location:** Top of every page

**Components:**
- **Application Title**: "Network Incident Response Simulator"
- **Subtitle**: "SOC-Style Training Tool for DDoS, Data Breach, and Ransomware Scenarios"
- **Learning Center Button**: Navigates to comprehensive educational content

**Functionality:**
- Always visible, providing consistent navigation
- Gradient purple background with animated overlay
- Learning Center button accessible from any screen

---

### 3.2 Scenario Selection Screen

**Purpose:** Landing page where users choose which incident type to practice

**Layout:**
```
┌────────────────────────────────────────────────────────────┐
│  Welcome Section (Intro Text)                              │
│  - Project goals and learning objectives                   │
│  - How the simulator works                                │
│  - Note about synthetic data                              │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  Scenario Cards (3 cards in grid)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                │
│  │   DDoS   │  │   Data   │  │Ransomware│                │
│  │  Attack  │  │  Breach  │  │          │                │
│  └──────────┘  └──────────┘  └──────────┘                │
└────────────────────────────────────────────────────────────┘
```

**Key Elements:**

1. **Welcome Section**
   - Explains project goals and target audience
   - Lists learning objectives:
     - Indicator recognition
     - NIST-aligned response procedures
     - Decision-making under pressure
     - Best practices learning
   - Describes how the simulator works
   - Includes note about synthetic data and NIST/CISA alignment

2. **Scenario Cards**
   - Three clickable cards representing:
     - **DDoS Attack Scenario**
     - **Data Breach Scenario**
     - **Ransomware Infection Scenario**
   - Each card shows:
     - Scenario name and type
     - Brief description
     - Visual styling with hover effects

**User Interaction:**
- Clicking a scenario card loads the Simulation Screen
- Cards have smooth animations and hover states

---

### 3.3 Learning Center Screen

**Purpose:** Comprehensive educational resource covering all incident types

**Layout:**
```
┌────────────────────────────────────────────────────────────┐
│  Learning Center Header                                    │
│  - Title and subtitle                                      │
│  - Quick navigation pills (jump links)                     │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  Learning Content Grid (Card Layout)                       │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  TCP/IP &    │  │    DDoS      │                        │
│  │    Logs      │  │              │                        │
│  └──────────────┘  └──────────────┘                        │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  Data Breach │  │  Ransomware  │                        │
│  │              │  │              │                        │
│  └──────────────┘  └──────────────┘                        │
│  ┌──────────────┐                                         │
│  │ NIST Mapping │                                         │
│  └──────────────┘                                         │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  Navigation Button                                         │
│  [Back to Scenarios]                                       │
└────────────────────────────────────────────────────────────┘
```

**Content Sections:**

1. **TCP/IP & Where Your Logs Come From**
   - TCP/IP layer breakdown (Network, Transport, Application, Host)
   - Common evidence artifacts (logs, NetFlow, EDR)
   - Why SYN floods are "special" (half-open connections)
   - Collapsible details sections

2. **DDoS (Distributed Denial of Service)**
   - **Definition**: What DDoS attacks are
   - **What happens**: Typical attack progression
   - **Attack types**: Volumetric, Protocol, Application-layer
   - **Indicators**: Network, system, and application-level signs
   - **Response playbook**: Best practices and why certain actions score higher
   - **Real-world examples**: Dyn DNS outage (2016), Memcached amplification (2018)

3. **Data Breach**
   - **Definition**: Unauthorized access and data exfiltration
   - **Breach chain**: Initial access → Privilege expansion → Exfiltration
   - **Indicators**: Auth anomalies, account changes, exfil patterns
   - **Response playbook**: Containment, evidence preservation, MFA enforcement
   - **Real-world examples**: Target 2013 breach, credential stuffing campaigns

4. **Ransomware**
   - **Definition**: Malware that encrypts files and demands payment
   - **Attack stages**: Initial access → Lateral movement → Encryption → Ransom note
   - **Indicators**: File encryption, SMB connections, shadow copy deletion
   - **Response playbook**: Isolation, backup restoration, persistence removal
   - **Real-world examples**: WannaCry (2017), Colonial Pipeline (2021), NotPetya (2017)

5. **NIST Incident Response Lifecycle Mapping**
   - Table showing how simulator actions map to NIST phases:
     - Preparation
     - Detection & Analysis
     - Containment
     - Eradication
     - Recovery
     - Post-Incident Activity

**Features:**
- Collapsible `<details>` sections for organized content
- Quick navigation pills at top for fast jumping
- Color-coded tags for incident types
- Recommended reading links to NIST SP 800-61, CISA guides, MITRE ATT&CK

**User Interaction:**
- Scroll through content or use jump links
- Expand/collapse detail sections
- Click "Back to Scenarios" to return to main screen

---

### 3.4 Simulation Screen

**Purpose:** Main interactive interface where users progress through incident scenarios

**Layout:**
```
┌────────────────────────────────────────────────────────────┐
│  Simulation Header                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Scenario     │  │   Severity   │  │    Score     │    │
│  │ Title & Back │  │   Legend     │  │   Display    │    │
│  │ Button       │  │   (4 levels) │  │   & Rubric   │    │
│  └──────────────┘  └──────────────┘  │   & Bkgd     │    │
│                                       │   Buttons    │    │
│                                       └──────────────┘    │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  Scenario Tabs (if sub-scenarios exist)                    │
│  [Tab 1] [Tab 2] [Tab 3]                                  │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  Scenario Description Box (if description exists)          │
└────────────────────────────────────────────────────────────┘

┌──────────────────────────┬────────────────────────────────┐
│  Left Panel              │  Right Panel                   │
│  ┌────────────────────┐  │  ┌────────────────────┐       │
│  │ Events & Logs      │  │  │ System Metrics     │       │
│  │                    │  │  │ - CPU Usage        │       │
│  │ [Event 1]          │  │  │ - Memory Usage     │       │
│  │ [Event 2]          │  │  │ - Network Traffic  │       │
│  │ [Event 3]          │  │  └────────────────────┘       │
│  │                    │  │                                │
│  │ [Next Event]       │  │  ┌────────────────────┐       │
│  │                    │  │  │ Decision Section   │       │
│  │                    │  │  │ (when active)      │       │
│  └────────────────────┘  │  └────────────────────┘       │
│                          │                                │
│                          │  ┌────────────────────┐       │
│                          │  │ Feedback Section   │       │
│                          │  │ (after decision)   │       │
│                          │  └────────────────────┘       │
└──────────────────────────┴────────────────────────────────┘
```

**Header Components:**

1. **Left Section: Scenario Title & Back Button**
   - Displays current scenario name
   - "Back to Scenarios" button to return to selection screen

2. **Center Section: Severity Indicators Legend**
   - Visual legend explaining color-coded severity levels:
     - **Critical** (Red): Immediate action required
     - **High** (Orange): Urgent attention needed
     - **Medium** (Yellow): Monitor closely
     - **Low** (Green): Informational / Recovery
   - Each item has tooltip with additional context

3. **Right Section: Score & Actions**
   - **Score Display**: Current score / Maximum score with progress bar
   - **View Scoring Rubric Button**: Opens modal explaining scoring system
   - **View Scenario Background Button**: Opens modal with scenario-specific context

**Tab Navigation:**
- If scenario has sub-scenarios, tabs appear below header
- Each tab represents a sub-scenario
- Clicking a tab starts that sub-scenario independently
- Active tab is highlighted
- Description box updates when switching tabs

**Left Panel: Events & Logs**

**Purpose:** Chronological display of incident events

**Features:**
- Events displayed in chronological order
- Color-coded severity bars (Critical/High/Medium/Low)
- Event details include:
  - Timestamp
  - Source (e.g., "Firewall", "Web Server", "Load Balancer")
  - Title
  - Description
  - Log entries (formatted in code-style boxes)
- "Next Event" button appears when more events are available
- Events persist after decision points (not cleared)

**Event Display Logic:**
- Events are tracked by ID to prevent duplicates
- Only new events are appended to the log
- Container scrolls to bottom when new events are added

**Right Panel: System Metrics**

**Purpose:** Real-time visualization of system performance

**Components:**
- **CPU Usage Chart**: Line chart showing CPU percentage over time
- **Memory Usage Chart**: Line chart showing memory percentage over time
- **Network Traffic Chart**: Line chart showing network traffic volume

**Features:**
- Chart.js library for visualization
- Charts update as events progress
- Historical data points displayed on timeline
- Color-coded (blue for CPU/Network, purple for Memory)

**Decision Section**

**Purpose:** Presents decision points where users must choose response actions

**When Appears:** After specific events trigger a decision point

**Layout:**
```
┌────────────────────────────────────────────────────────────┐
│  Decision Required                                         │
│  [Decision description/question text]                      │
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │ [Option 1 Button]                                  │   │
│  └────────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────┐   │
│  │ [Option 2 Button]                                  │   │
│  └────────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────┐   │
│  │ [Option 3 Button]                                  │   │
│  └────────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────┐   │
│  │ [Option 4 Button]                                  │   │
│  └────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

**Features:**
- Decision description/question explains the situation
- Multiple choice options (typically 3-4 options)
- Options styled as buttons
- Selecting an option submits the decision via API

**Feedback Section**

**Purpose:** Provides immediate feedback after decision submission

**When Appears:** Immediately after user selects a decision option

**Layout:**
```
┌────────────────────────────────────────────────────────────┐
│  Feedback                                                   │
│  ┌────────────────────────────────────────────────────┐   │
│  │ ✓/✗ Correct/Incorrect                              │   │
│  │ [Feedback message]                                  │   │
│  │ Score: X / 10                                       │   │
│  │ Why: [Explanation]                                  │   │
│  │                                                     │   │
│  │ [View Detailed Analysis Button]                    │   │
│  │                                                     │   │
│  │ Note: "Please wait for the NIST standard practice  │   │
│  │        page to appear automatically"                │   │
│  └────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

**Components:**
- **Status Icon**: ✓ for correct, ✗ for incorrect
- **Feedback Message**: Brief explanation of the outcome
- **Score Display**: Points awarded / Maximum points
- **Explanation**: "Why" section explaining the reasoning
- **View Detailed Analysis Button**: Opens detailed comparison modal
- **Automatic Transition**: After brief display, automatically transitions to NIST Recommendations page

**Color Coding:**
- Green background with checkmark for correct answers
- Red/pink background with X for incorrect answers

---

### 3.5 Detailed Analysis Modal

**Purpose:** Comprehensive comparison of all decision options

**When Appears:** User clicks "View Detailed Analysis" button in feedback section

**Layout:**
```
┌────────────────────────────────────────────────────────────┐
│  Detailed Analysis                            [✕ Close]    │
├────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐   │
│  │ Your Selection                                     │   │
│  │ [Selected option text]                             │   │
│  │ Score: X / 10 points                               │   │
│  │ Feedback: [Message]                                │   │
│  │ Explanation: [Reasoning]                           │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  All Options Comparison                                    │
│  Review all available options to understand why certain   │
│  choices score higher:                                     │
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │ Option 1 (Optimal/Strong)      [10 pts badge]      │   │
│  │ Feedback: [Message]                                 │   │
│  │ Why this option: [Reasoning]                        │   │
│  └────────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────┐   │
│  │ Option 2 (Partial)            [5 pts badge]        │   │
│  │ ...                                                 │   │
│  └────────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────┐   │
│  │ Option 3 (Incorrect) - ✓ Your selection [2 pts]    │   │
│  │ ...                                                 │   │
│  └────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

**Features:**
- **Your Selection Section**: Highlights the option the user chose
- **All Options Comparison**: Lists all options sorted by score (highest first)
- **Score Badges**: Color-coded badges (green for optimal, yellow for partial, red for incorrect)
- **Option Explanations**: Why each option scores what it does
- **Scrollable Content**: Modal body is scrollable for long option lists
- **Close Button**: Top-right X button to close modal

**Scoring Display:**
- Options sorted from highest to lowest score
- User's selection is highlighted with blue border and checkmark
- Score badges show points and category (Optimal/Strong, Partial, Incorrect)

---

### 3.6 NIST Recommendations Screen (Completion Screen)

**Purpose:** Displays NIST-aligned recommendations after scenario completion

**When Appears:** Automatically after user makes final decision (or manually via button if implemented)

**Layout:**
```
┌────────────────────────────────────────────────────────────┐
│  NIST Recommendations                                      │
│                                                            │
│  Preparation                                               │
│  ┌────────────────────────────────────────────────────┐   │
│  │ • Network Segmentation [High Priority]             │   │
│  │   Description of recommendation                    │   │
│  └────────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────┐   │
│  │ • Backup and Recovery Procedures [High Priority]   │   │
│  │   Description of recommendation                    │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  Detection                                                 │
│  ┌────────────────────────────────────────────────────┐   │
│  │ • Improve Indicator Recognition [Medium Priority]  │   │
│  │   Description of recommendation                    │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  Containment                                               │
│  ┌────────────────────────────────────────────────────┐   │
│  │ • Faster Containment [High Priority]               │   │
│  │   Description of recommendation                    │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  [Additional phases: Eradication, Recovery, Post-Incident]│
│                                                            │
│  ┌────────────────────┐  ┌────────────────────┐          │
│  │ Back to Scenario   │  │ Try Another        │          │
│  │                    │  │ Scenario           │          │
│  └────────────────────┘  └────────────────────┘          │
└────────────────────────────────────────────────────────────┘
```

**Content Structure:**
- Recommendations organized by NIST IR lifecycle phases:
  - **Preparation**
  - **Detection & Analysis**
  - **Containment**
  - **Eradication**
  - **Recovery**
  - **Post-Incident Activity**

**Recommendation Format:**
- **Title**: Brief recommendation name
- **Priority**: High, Medium, or Low
- **Description**: Detailed explanation of the recommendation

**Features:**
- Recommendations generated based on user's performance
- Priority levels help users understand what to focus on
- No score display (removed as per user request)
- **Back to Scenario Button**: Returns to simulation screen with previous state restored
- **Try Another Scenario Button**: Returns to scenario selection screen

---

### 3.7 Modals

#### 3.7.1 Scoring Rubric Modal

**Purpose:** Explains how decisions are scored

**When Appears:** User clicks "View Scoring Rubric" button

**Content:**
- Explains scoring system:
  - **10 points (Optimal)**: Highest-priority best practice
  - **8-9 points (Strong)**: Correct but slightly slower action
  - **3-5 points (Partial)**: Effort but not recommended approach
  - **0-2 points (Incorrect)**: Ineffective or risky action
- Explains that feedback provides explanations
- Notes NIST SP 800-61 alignment

#### 3.7.2 Scenario Background Modal

**Purpose:** Provides scenario-specific context and educational information

**When Appears:** User clicks "View Scenario Background" button

**Content:**
- Scenario-specific background information
- Explains what type of incident this is
- Provides context about indicators and expected responses
- Similar to Learning Center content but focused on current scenario

**Features:**
- Populated dynamically based on current scenario
- Scrollable content
- Close button

---

## 4. CORE SYSTEMS & FEATURES

### 4.1 Session Management System

**Purpose:** Tracks user progress through scenarios

**Implementation:**
- In-memory dictionary storage (Python `dict`)
- Each session has unique UUID
- Session stores:
  - Current step index
  - Events viewed
  - Decisions made
  - Current score
  - Maximum possible score
  - Scenario/sub-scenario reference
  - Session state flags

**Session Lifecycle:**
1. User selects scenario → Session created via `POST /api/sessions`
2. Session ID returned to frontend
3. Frontend stores session ID for subsequent API calls
4. Each event load or decision submission uses session ID
5. Session persists until user starts new scenario or server restarts

**Limitations:**
- Sessions lost on server restart (in-memory storage)
- Single-user support (no session isolation)
- No persistent storage to database

### 4.2 Event Progression System

**Purpose:** Manages sequential display of incident events

**Flow:**
1. User clicks "Next Event" button
2. Frontend calls `GET /api/sessions/<id>/events`
3. Backend returns events for current step
4. Frontend displays events in left panel
5. Backend increments step counter
6. Process repeats until all events displayed

**Event Types:**
- **Alert**: Security alert or notification
- **Log**: System log entry
- **Decision Point**: Triggers decision section

**Event Display Logic:**
- Events tracked by ID to prevent duplicates
- `displayedEventIds` Set tracks which events already shown
- Only new events appended to container
- Events persist after decisions (not cleared)

**Metrics Integration:**
- Events can include `metrics` object with CPU, memory, network data
- Metrics update charts in real-time
- Historical data points preserved in chart datasets

### 4.3 Decision Point System

**Purpose:** Presents critical response choices to users

**When Triggered:**
- Event with `type: "decision_point"` appears in event stream
- Decision section becomes visible
- Decision options displayed as buttons

**Decision Structure:**
```json
{
  "id": "decision_1",
  "type": "decision_point",
  "description": "What action should you take?",
  "max_score": 10,
  "options": [
    {
      "id": "opt_1",
      "text": "Option text",
      "score": 10,
      "correct": true,
      "feedback": "Feedback message",
      "explanation": "Why this is correct"
    }
  ]
}
```

**Decision Submission Flow:**
1. User clicks option button
2. Frontend calls `POST /api/sessions/<id>/action` with:
   - `action_id`: Decision point ID
   - `option_id`: Selected option ID
3. Backend processes decision:
   - Calculates score
   - Updates session score
   - Generates feedback
   - Marks decision as resolved
4. Frontend displays feedback
5. After feedback display, automatically transitions to NIST Recommendations

### 4.4 Scoring System

**Purpose:** Evaluates user decisions and provides assessment

**Scoring Logic:**
- Each decision point has `max_score` (typically 10)
- Each option has assigned `score` (0-10)
- Selected option's score is added to session total
- Cumulative score tracked across all decisions

**Score Categories:**
- **10 points (Optimal)**: Best practice, immediate action, highly effective
- **8-9 points (Strong)**: Correct approach, effective but may require coordination
- **3-5 points (Partial)**: Shows effort but not recommended, has drawbacks
- **0-2 points (Incorrect)**: Ineffective, risky, or worsens situation

**Feedback Generation:**
- Immediate feedback after each decision
- Includes:
  - Correct/Incorrect status
  - Feedback message
  - Score awarded
  - Explanation (why this score)

**Final Scoring:**
- Total score / Maximum possible score
- Percentage calculated
- Displayed on completion screen (if enabled)

### 4.5 NIST Recommendations Generation

**Purpose:** Provides post-scenario analysis aligned with NIST SP 800-61

**Generation Logic:**
- Backend analyzes session performance
- Generates recommendations based on:
  - Score percentage
  - Decisions made
  - Missed opportunities
  - Scenario type

**Recommendation Categories:**
1. **Preparation**: Proactive measures (network segmentation, backups)
2. **Detection**: Improving indicator recognition
3. **Containment**: Faster response times
4. **Eradication**: Removing threats completely
5. **Recovery**: Restoration and business continuity
6. **Post-Incident**: Lessons learned and plan updates

**Priority Levels:**
- **High**: Critical improvements needed
- **Medium**: Important but not urgent
- **Low**: Nice-to-have enhancements

### 4.6 Metrics Visualization System

**Purpose:** Real-time display of system performance metrics

**Implementation:**
- Chart.js library for chart rendering
- Three separate line charts:
  - CPU Usage (%)
  - Memory Usage (%)
  - Network Traffic (volume)

**Data Flow:**
1. Events include `metrics` object
2. Metrics extracted from events
3. Data points added to chart datasets
4. Charts updated with `chart.update()`
5. Historical trend visible over time

**Chart Features:**
- Line charts with time-series data
- Color-coded (blue for CPU/Network, purple for Memory)
- Responsive sizing
- Smooth animations on update

---

## 5. USER FLOWS

### 5.1 Complete Scenario Flow

```
1. User lands on Scenario Selection Screen
   ↓
2. User clicks scenario card (e.g., "DDoS Attack")
   ↓
3. Simulation Screen loads
   - Header displays scenario name
   - Tabs appear (if sub-scenarios exist)
   - Description box shows scenario overview
   ↓
4. User clicks tab (or first tab auto-loads)
   ↓
5. Sub-scenario starts
   - Events begin appearing
   - Metrics charts initialize
   ↓
6. User clicks "Next Event" repeatedly
   - Events accumulate in left panel
   - Metrics update with each event
   ↓
7. Decision Point appears
   - Decision section becomes visible
   - Options displayed as buttons
   ↓
8. User selects an option
   ↓
9. Decision submitted to backend
   ↓
10. Feedback displayed immediately
    - Status (correct/incorrect)
    - Score
    - Explanation
    - "View Detailed Analysis" button
    ↓
11. User can click "View Detailed Analysis" (optional)
    - Modal opens with comprehensive comparison
    - User reviews all options
    - User closes modal
    ↓
12. Automatic transition to NIST Recommendations
    - Completion screen displays
    - Recommendations organized by NIST phases
    - "Back to Scenario" and "Try Another Scenario" buttons
    ↓
13a. User clicks "Back to Scenario"
     - Returns to simulation screen
     - Previous state restored (feedback visible)
     ↓
13b. User clicks "Try Another Scenario"
     - Returns to scenario selection screen
     - Can start new scenario
```

### 5.2 Learning Center Flow

```
1. User clicks "Learning Center" button (from header)
   ↓
2. Learning Center Screen displays
   - Hero section with title and jump links
   - Content grid with cards
   ↓
3. User scrolls through content
   - Expands/collapses detail sections
   - Reads educational material
   ↓
4. User clicks jump link (optional)
   - Scrolls to specific section
   ↓
5. User clicks "Back to Scenarios"
   ↓
6. Returns to Scenario Selection Screen
```

### 5.3 Modal Interactions

**Scoring Rubric Modal:**
```
1. User clicks "View Scoring Rubric" button
   ↓
2. Modal opens with scoring explanation
   ↓
3. User reads content
   ↓
4. User clicks "Close" or clicks outside modal
   ↓
5. Modal closes, returns to simulation screen
```

**Scenario Background Modal:**
```
1. User clicks "View Scenario Background" button
   ↓
2. Modal opens with scenario-specific context
   ↓
3. User reads educational content
   ↓
4. User clicks "Close" or clicks outside modal
   ↓
5. Modal closes, returns to simulation screen
```

**Detailed Analysis Modal:**
```
1. User makes decision and receives feedback
   ↓
2. User clicks "View Detailed Analysis" button
   ↓
3. Modal opens showing:
   - User's selection highlighted
   - All options sorted by score
   - Detailed explanations
   ↓
4. User scrolls through comparison
   ↓
5. User clicks "✕ Close" button
   ↓
6. Modal closes, returns to feedback view
```

---

## 6. TECHNICAL IMPLEMENTATION DETAILS

### 6.1 Backend API Endpoints

#### `GET /api/scenarios`
**Purpose:** List all available scenarios

**Response:**
```json
[
  {
    "id": "ddos",
    "name": "DDoS Attack Scenario",
    "description": "...",
    "type": "DDoS",
    "has_sub_scenarios": true
  }
]
```

#### `GET /api/scenarios/<scenario_id>`
**Purpose:** Get full scenario definition including sub-scenarios

**Response:**
```json
{
  "name": "DDoS Attack Scenario",
  "type": "DDoS",
  "description": "...",
  "sub_scenarios": [
    {
      "id": "scenario_1",
      "name": "Initial Traffic Spike Detection",
      "description": "..."
    }
  ]
}
```

#### `POST /api/sessions`
**Purpose:** Create new simulation session

**Request Body:**
```json
{
  "scenario_id": "ddos",
  "sub_scenario_id": "scenario_1"  // optional
}
```

**Response:**
```json
{
  "session_id": "uuid-string",
  "scenario": {...}
}
```

#### `GET /api/sessions/<session_id>/events`
**Purpose:** Get events for current step

**Query Parameters:**
- `since`: Last decision step index (optional)

**Response:**
```json
{
  "events": [...],
  "decision_point": {...},  // if decision point reached
  "current_step": 5,
  "has_more": true
}
```

#### `POST /api/sessions/<session_id>/action`
**Purpose:** Submit decision/action

**Request Body:**
```json
{
  "action_id": "decision_1",
  "option_id": "opt_2"
}
```

**Response:**
```json
{
  "feedback": "Feedback message",
  "score": 8,
  "max_score": 10,
  "correct": true,
  "explanation": "..."
}
```

#### `GET /api/sessions/<session_id>/status`
**Purpose:** Get current session status

**Response:**
```json
{
  "current_step": 10,
  "score": 25,
  "max_score": 40,
  "completed": false
}
```

#### `POST /api/sessions/<session_id>/complete`
**Purpose:** Mark scenario as complete and get recommendations

**Response:**
```json
{
  "recommendations": {
    "preparation": [...],
    "detection": [...],
    "containment": [...],
    "eradication": [...],
    "recovery": [...],
    "post_incident": [...]
  }
}
```

### 6.2 Frontend State Management

**Global Variables:**
- `currentSessionId`: Active session UUID
- `currentScenario`: Current scenario object
- `scenarios`: Loaded scenario list
- `currentStep`: Server-reported step index
- `lastDecisionStep`: Index of last resolved decision
- `pendingDecisionStep`: Decision step waiting for resolution
- `displayedEventIds`: Set of already-displayed event IDs
- `currentDecisionPoint`: Active decision point object
- Chart objects: `cpuChart`, `memoryChart`, `networkChart`
- Chart data arrays: `cpuData`, `memoryData`, `networkData`

**Screen Management:**
- `showScreen(screenId)`: Switches visible screen
- Screens: `scenario-selection`, `learning-center`, `simulation-screen`, `completion-screen`
- Only one screen active at a time

**Modal Management:**
- Modals: `rubric-modal`, `scenario-background-modal`, `feedback-details-modal`
- Toggle via `style.display = 'flex'` / `'none'`
- Click outside to close (event delegation)

### 6.3 Data Flow Patterns

**Scenario Loading:**
```
Browser → GET /api/scenarios → Backend loads JSON → Response → Frontend renders cards
```

**Session Creation:**
```
Browser → POST /api/sessions → Backend creates session → Returns session_id → Frontend stores ID
```

**Event Progression:**
```
Browser → GET /api/sessions/<id>/events → Backend returns events → Frontend displays → User clicks "Next Event" → Repeat
```

**Decision Submission:**
```
Browser → POST /api/sessions/<id>/action → Backend processes → Returns feedback → Frontend shows feedback → Auto-transition to recommendations
```

### 6.4 JSON Data Structure

**Main Scenario File:**
```json
{
  "name": "DDoS Attack Scenario",
  "type": "DDoS",
  "description": "Comprehensive scenario covering...",
  "sub_scenarios": [
    {"id": "scenario_1", "name": "...", "description": "..."}
  ]
}
```

**Sub-Scenario File:**
```json
{
  "name": "Initial Traffic Spike Detection",
  "description": "...",
  "events": [
    {
      "id": "event_1",
      "type": "alert",
      "timestamp": "2025-11-15T10:00:00Z",
      "source": "Network Monitor",
      "severity": "high",
      "title": "Unusual Traffic Spike Detected",
      "description": "...",
      "metrics": {
        "cpu_usage": 45,
        "memory_usage": 60,
        "network_traffic": 5000
      }
    },
    {
      "id": "decision_1",
      "type": "decision_point",
      "description": "What action should you take?",
      "max_score": 10,
      "options": [...]
    }
  ]
}
```

---

## 7. ENHANCEMENTS SINCE INTERMEDIATE REPORT

### 7.1 Learning Center Implementation

**What Was Added:**
- Comprehensive educational content covering all incident types
- Structured sections with collapsible details
- Real-world case studies (Dyn, Memcached, Target, WannaCry, Colonial Pipeline, NotPetya)
- TCP/IP fundamentals and log source mapping
- NIST lifecycle mapping table
- Quick navigation with jump links
- Professional card-based layout

**Impact:**
- Provides educational foundation before scenarios
- Helps users understand "why" certain actions score higher
- Improves learning outcomes through contextual information

### 7.2 Enhanced Feedback System

**What Was Added:**
- **Detailed Analysis Modal**: Comprehensive comparison of all options
- **Option Sorting**: Options displayed by score (highest first)
- **Visual Highlighting**: User's selection clearly marked
- **Score Badges**: Color-coded badges showing score categories
- **Scrollable Content**: Modal supports long option lists

**Impact:**
- Deeper understanding of decision rationale
- Clear comparison helps users learn from mistakes
- More educational value than simple correct/incorrect feedback

### 7.3 Scenario Background Modal

**What Was Added:**
- Per-scenario contextual information
- Educational content specific to current scenario type
- Accessible from simulation header

**Impact:**
- Users can get help without leaving simulation
- Context-specific guidance improves decision-making
- Reduces need to navigate away from scenario

### 7.4 UI/UX Improvements

**What Was Added:**
- **Severity Legend**: Moved to simulation header for better visibility
- **Event Persistence**: Events no longer cleared after decisions
- **Smooth Transitions**: Improved animations and state management
- **Better Modal UX**: Scrollable modals, close buttons, click-outside-to-close
- **Automatic Progression**: Streamlined flow to NIST Recommendations

**Impact:**
- Better user experience
- More intuitive navigation
- Professional appearance

### 7.5 State Management Improvements

**What Was Added:**
- **Event Deduplication**: Prevents duplicate events using Set tracking
- **State Restoration**: "Back to Scenario" restores previous state
- **Better Session Tracking**: Improved step and decision tracking

**Impact:**
- Prevents bugs and confusion
- Better user experience when navigating back
- More reliable event progression

---

## 8. TECHNOLOGY STACK

### 8.1 Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.12.6 | Programming language |
| Flask | 3.0.0 | Web framework |
| Flask-CORS | 4.0.0 | Cross-Origin Resource Sharing |
| JSON | Built-in | Data serialization |
| UUID | Built-in | Session ID generation |

### 8.2 Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | Standard | Markup and structure |
| CSS3 | Standard | Styling and animations |
| JavaScript (ES6+) | ES2020+ | Frontend logic |
| Chart.js | 4.4.0+ (CDN) | Metrics visualization |

### 8.3 Data Storage

- **Format**: JSON files
- **Location**: `scenarios/` directory
- **Files**: 13 JSON files (3 main scenarios + 10 sub-scenarios)

### 8.4 Development Tools

- Git (version control)
- VS Code / Any IDE (code editing)
- Web Browser (testing - Chrome, Firefox, Edge)

---

## 9. DETAILED API ENDPOINT DOCUMENTATION

### 9.1 Scenario Management Endpoints

#### GET `/api/scenarios`
**Purpose:** Retrieve list of all available main scenarios

**Request:** No parameters required

**Response Format:**
```json
[
  {
    "id": "ddos",
    "name": "DDoS Attack Scenario",
    "description": "Comprehensive scenario covering...",
    "type": "DDoS",
    "has_sub_scenarios": true
  },
  {
    "id": "data_breach",
    "name": "Data Breach Scenario",
    "description": "...",
    "type": "Data Breach",
    "has_sub_scenarios": true
  },
  {
    "id": "ransomware",
    "name": "Ransomware Infection Scenario",
    "description": "...",
    "type": "Ransomware",
    "has_sub_scenarios": true
  }
]
```

**Error Responses:**
- `500 Internal Server Error`: If scenario files cannot be loaded

#### GET `/api/scenarios/<scenario_id>`
**Purpose:** Get detailed scenario information including sub-scenarios

**URL Parameters:**
- `scenario_id`: One of `ddos`, `data_breach`, or `ransomware`

**Response Format:**
```json
{
  "name": "DDoS Attack Scenario",
  "type": "DDoS",
  "description": "Comprehensive scenario covering...",
  "sub_scenarios": [
    {
      "id": "scenario_1",
      "name": "Initial Traffic Spike Detection",
      "description": "Focus: Early warning signs..."
    },
    {
      "id": "scenario_2",
      "name": "SYN Flood Pattern Recognition",
      "description": "Focus: SYN flood attacks..."
    },
    {
      "id": "scenario_3",
      "name": "Mixed Attack Pattern Response",
      "description": "Focus: Evolving attacks..."
    }
  ]
}
```

**Error Responses:**
- `404 Not Found`: If scenario_id doesn't exist

### 9.2 Session Management Endpoints

#### POST `/api/sessions`
**Purpose:** Create a new simulation session

**Request Body:**
```json
{
  "scenario_id": "ddos",
  "sub_scenario_id": "scenario_1"  // Optional - if omitted, uses main scenario
}
```

**Response Format:**
```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "scenario": {
    "name": "Initial Traffic Spike Detection",
    "description": "...",
    "events": [...]
  }
}
```

**Session State Initialization:**
- `current_step`: 0
- `score`: 0
- `max_score`: Calculated from decision points
- `events_viewed`: []
- `actions_taken`: []
- `state`: {} (for tracking containment, eradication, etc.)

**Error Responses:**
- `400 Bad Request`: Invalid scenario_id or sub_scenario_id
- `404 Not Found`: Scenario or sub-scenario not found

#### GET `/api/sessions/<session_id>/status`
**Purpose:** Get current session status and progress

**Response Format:**
```json
{
  "current_step": 5,
  "score": 18,
  "max_score": 30,
  "completed": false,
  "scenario_name": "Initial Traffic Spike Detection"
}
```

**Error Responses:**
- `404 Not Found`: Session doesn't exist

### 9.3 Event Progression Endpoints

#### GET `/api/sessions/<session_id>/events`
**Purpose:** Get events for the current step in the session

**Query Parameters:**
- `since` (optional): Last decision step index to get events after that point

**Response Format:**
```json
{
  "events": [
    {
      "id": "event_1",
      "type": "alert",
      "timestamp": "2025-11-15T10:00:00Z",
      "source": "Network Monitor",
      "severity": "high",
      "title": "Unusual Traffic Spike Detected",
      "description": "Inbound TCP connection rate increased by 300%...",
      "metrics": {
        "cpu_usage": 45,
        "memory_usage": 60,
        "network_traffic": 5000
      }
    }
  ],
  "decision_point": null,  // or decision point object if reached
  "current_step": 1,
  "has_more": true
}
```

**Event Types:**
- `alert`: Security alert or notification
- `log`: System log entry
- `decision_point`: Triggers decision section

**Error Responses:**
- `404 Not Found`: Session doesn't exist

#### POST `/api/sessions/<session_id>/next`
**Purpose:** Advance to the next event (legacy endpoint, now handled by GET events)

**Note:** This endpoint exists for backward compatibility but the frontend primarily uses GET `/api/sessions/<id>/events` with step tracking.

### 9.4 Decision Processing Endpoints

#### POST `/api/sessions/<session_id>/action`
**Purpose:** Submit a decision/action choice

**Request Body:**
```json
{
  "action_id": "decision_1",
  "option_id": "opt_2"
}
```

**Response Format:**
```json
{
  "feedback": "Correct! Quick containment reduces attack volume.",
  "score": 10,
  "max_score": 10,
  "correct": true,
  "explanation": "Blocking the heaviest sources immediately reduces impact and aligns with NIST containment phase best practices."
}
```

**Backend Processing:**
1. Validates session exists
2. Finds decision point by `action_id`
3. Finds selected option by `option_id`
4. Retrieves option's score, feedback, and explanation
5. Updates session score: `session['score'] += option['score']`
6. Marks decision as resolved
7. Returns feedback object

**Error Responses:**
- `400 Bad Request`: Invalid action_id or option_id
- `404 Not Found`: Session doesn't exist
- `500 Internal Server Error`: Decision point or option not found in scenario

### 9.5 Completion and Recommendations Endpoints

#### POST `/api/sessions/<session_id>/complete`
**Purpose:** Mark scenario as complete and generate NIST recommendations

**Response Format:**
```json
{
  "recommendations": {
    "preparation": [
      {
        "title": "Network Segmentation",
        "description": "Implement network segmentation to limit lateral movement...",
        "priority": "high"
      }
    ],
    "detection": [
      {
        "title": "Improve Indicator Recognition",
        "description": "Focus on recognizing key indicators earlier...",
        "priority": "medium"
      }
    ],
    "containment": [
      {
        "title": "Faster Containment",
        "description": "Work on identifying and executing containment actions...",
        "priority": "high"
      }
    ],
    "eradication": [],
    "recovery": [
      {
        "title": "Multi-Factor Authentication",
        "description": "Implement MFA to prevent credential-based attacks...",
        "priority": "high"
      }
    ],
    "post_incident": [
      {
        "title": "Incident Response Plan Review",
        "description": "Review and update incident response plans...",
        "priority": "medium"
      }
    ]
  },
  "final_score": 25,
  "max_score": 30,
  "score_percentage": 83.33
}
```

**Recommendation Generation Logic:**
- Analyzes session performance (score percentage, decisions made, phase coverage)
- Generates recommendations based on:
  - Overall score (low scores → more detection/preparation recommendations)
  - Missed opportunities (e.g., no containment actions → containment recommendations)
  - Scenario type (DDoS → network segmentation, Data Breach → MFA, etc.)
- Organizes by NIST SP 800-61 phases
- Assigns priority levels (high, medium, low)

---

## 10. DETAILED SCENARIO JSON SCHEMA

### 10.1 Main Scenario File Structure

```json
{
  "name": "DDoS Attack Scenario",
  "type": "DDoS",
  "description": "Comprehensive scenario covering multiple attack types...",
  "sub_scenarios": [
    {
      "id": "scenario_1",
      "name": "Initial Traffic Spike Detection",
      "description": "Focus: Early warning signs..."
    }
  ]
}
```

**Note:** Main scenario files (`ddos.json`, `data_breach.json`, `ransomware.json`) primarily serve as containers for sub-scenarios. Actual event data is in sub-scenario files.

### 10.2 Sub-Scenario File Structure

```json
{
  "name": "Initial Traffic Spike Detection",
  "description": "This sub-scenario focuses on early detection...",
  "events": [
    {
      "id": "event_1",
      "type": "alert",
      "timestamp": "2025-11-15T10:00:00Z",
      "source": "Network Monitor",
      "severity": "high",
      "title": "Unusual Traffic Spike Detected",
      "description": "Inbound TCP connection rate increased by 300% in the last 5 minutes.",
      "metrics": {
        "cpu_usage": 45,
        "memory_usage": 60,
        "network_traffic": 5000
      },
      "log_entry": "2025-11-15 10:00:00 [INFO] Connection rate: 15,234/min (76%)"
    },
    {
      "id": "decision_1",
      "type": "decision_point",
      "timestamp": "2025-11-15T10:05:00Z",
      "description": "What action should you take to contain this traffic spike?",
      "max_score": 10,
      "options": [
        {
          "id": "opt_1",
          "text": "Block top 10 source IPs immediately",
          "action_type": "block_ip",
          "score": 10,
          "correct": true,
          "feedback": "Correct! Quick containment reduces attack volume.",
          "explanation": "Blocking the heaviest sources immediately reduces impact and aligns with NIST containment phase best practices."
        },
        {
          "id": "opt_2",
          "text": "Engage upstream provider for traffic scrubbing",
          "action_type": "upstream_scrubbing",
          "score": 8,
          "correct": true,
          "feedback": "Good choice, especially for large floods.",
          "explanation": "Upstream filtering removes malicious traffic earlier in the network path, but may take longer to implement."
        },
        {
          "id": "opt_3",
          "text": "Restart the web server",
          "action_type": "restart_service",
          "score": 2,
          "correct": false,
          "feedback": "Not ideal. Does not stop the attack.",
          "explanation": "Restarting causes downtime and the flood resumes immediately after restart."
        },
        {
          "id": "opt_4",
          "text": "Wait and monitor for 10 more minutes",
          "action_type": "monitor",
          "score": 0,
          "correct": false,
          "feedback": "Incorrect. Immediate action is required.",
          "explanation": "Delaying allows further impact and service degradation."
        }
      ]
    }
  ]
}
```

### 10.3 Event Object Schema

**Common Fields:**
- `id` (string, required): Unique identifier for the event
- `type` (string, required): `"alert"`, `"log"`, or `"decision_point"`
- `timestamp` (string, ISO 8601 format): Event timestamp
- `source` (string): Source system (e.g., "Firewall", "Web Server")
- `severity` (string): `"critical"`, `"high"`, `"medium"`, or `"low"`
- `title` (string): Event title
- `description` (string): Detailed event description
- `metrics` (object, optional): System metrics at this point
  - `cpu_usage` (number): CPU percentage (0-100)
  - `memory_usage` (number): Memory percentage (0-100)
  - `network_traffic` (number): Network traffic volume
- `log_entry` (string, optional): Formatted log entry text

### 10.4 Decision Point Object Schema

**Fields:**
- `id` (string, required): Unique identifier (typically `"decision_1"`, `"decision_2"`, etc.)
- `type` (string, required): Must be `"decision_point"`
- `timestamp` (string, ISO 8601 format): When decision point occurs
- `description` (string, required): Question or decision prompt
- `max_score` (number, required): Maximum points for this decision (typically 10)
- `options` (array, required): Array of option objects (typically 3-4 options)

### 10.5 Option Object Schema

**Fields:**
- `id` (string, required): Unique identifier (typically `"opt_1"`, `"opt_2"`, etc.)
- `text` (string, required): Option text displayed to user
- `action_type` (string, optional): Type of action (e.g., `"block_ip"`, `"isolate_host"`)
- `score` (number, required): Points awarded for this option (0-10)
- `correct` (boolean, required): Whether this is a correct/optimal choice
- `feedback` (string, required): Immediate feedback message
- `explanation` (string, required): Detailed explanation of why this option scores as it does

**Scoring Guidelines:**
- **10 points**: Optimal, immediate, highly effective action
- **8-9 points**: Strong, correct approach, effective but may require coordination
- **3-5 points**: Partial, shows effort but not recommended, has drawbacks
- **0-2 points**: Incorrect, ineffective, risky, or worsens situation

---

## 11. DETAILED SCORING ALGORITHM

### 11.1 Scoring Philosophy

The scoring system is designed to evaluate decisions based on four weighted criteria:

1. **Technical Correctness (40%)**: Does the action technically address the problem?
2. **Priority and Timing (30%)**: Is this the right action at the right time?
3. **NIST Phase Alignment (20%)**: Does this align with the appropriate NIST incident response phase?
4. **Industry Best Practices (10%)**: Does this follow recognized best practices?

### 11.2 Score Calculation

**Option Score Assignment:**
Each option in a decision point is pre-assigned a score (0-10) based on the above criteria. The score is stored in the scenario JSON file.

**Session Score Accumulation:**
```python
# Pseudocode
session['score'] = 0
session['max_score'] = 0

for each decision_point in scenario:
    session['max_score'] += decision_point['max_score']
    
    when user selects option:
        selected_option = find_option(decision_point, option_id)
        session['score'] += selected_option['score']
```

**Final Score Calculation:**
```python
score_percentage = (session['score'] / session['max_score']) * 100
```

### 11.3 Score Tiers and Feedback Mapping

**Tier 1: Optimal (10 points)**
- Characteristics:
  - Immediate action required and taken
  - Highly effective at solving the problem
  - Aligns with NIST best practices
  - Minimal negative side effects
- Example: "Block top 10 source IPs immediately" in DDoS scenario
- Feedback: "Correct! Quick containment reduces attack volume."

**Tier 2: Strong (8-9 points)**
- Characteristics:
  - Correct approach
  - Effective but may require coordination or take longer
  - Still aligns with best practices
- Example: "Engage upstream provider for traffic scrubbing" in DDoS scenario
- Feedback: "Good choice, especially for large floods."

**Tier 3: Partial (3-5 points)**
- Characteristics:
  - Shows understanding but not the recommended approach
  - May have significant drawbacks
  - Partially addresses the problem
- Example: "Restart the web server" in DDoS scenario
- Feedback: "Not ideal. Does not stop the attack."

**Tier 4: Incorrect (0-2 points)**
- Characteristics:
  - Ineffective or risky
  - Worsens the situation
  - Delays proper response
- Example: "Wait and monitor for 10 more minutes" in DDoS scenario
- Feedback: "Incorrect. Immediate action is required."

### 11.4 Recommendation Generation Based on Scores

**High Performance (80%+ score):**
- Focus on advanced topics (post-incident improvements, advanced detection)
- Fewer basic recommendations

**Medium Performance (50-79% score):**
- Balanced recommendations across all phases
- Emphasis on areas with lower scores

**Low Performance (<50% score):**
- Focus on fundamentals (detection, basic containment)
- More preparation and detection recommendations
- Emphasis on indicator recognition

---

## 12. DETAILED STATE MANAGEMENT

### 12.1 Session State Structure

```python
session = {
    'session_id': '550e8400-e29b-41d4-a716-446655440000',
    'scenario_id': 'ddos',
    'sub_scenario_id': 'scenario_1',
    'created_at': '2025-11-15T10:00:00Z',
    'current_step': 5,
    'score': 18,
    'max_score': 30,
    'events_viewed': ['event_1', 'event_2', 'event_3'],
    'actions_taken': [
        {
            'decision_id': 'decision_1',
            'option_id': 'opt_1',
            'score': 10,
            'timestamp': '2025-11-15T10:05:00Z'
        }
    ],
    'state': {
        'containment': True,
        'eradication': False,
        'recovery': False,
        'blocked_ips': ['203.0.113.1', '203.0.113.2'],
        'isolated_hosts': []
    },
    'last_decision_step': 2
}
```

### 12.2 Frontend State Variables

```javascript
// Global state variables
let currentSessionId = null;           // Active session UUID
let currentScenario = null;            // Current scenario object
let scenarios = {};                    // Loaded scenario list
let currentStep = 0;                   // Server-reported current step
let lastDecisionStep = -1;             // Index of last resolved decision
let pendingDecisionStep = null;        // Decision step waiting for resolution
let displayedEventIds = new Set();     // Track displayed events (prevent duplicates)
let currentDecisionPoint = null;       // Active decision point object

// Chart state
let cpuChart = null;
let memoryChart = null;
let networkChart = null;
let cpuData = [];
let memoryData = [];
let networkData = [];
```

### 12.3 State Synchronization

**Backend → Frontend:**
- Session state is authoritative on backend
- Frontend requests state via API calls
- Frontend updates local variables based on API responses

**Frontend → Backend:**
- User actions (decisions) sent to backend
- Backend updates session state
- Backend returns updated state in response

**State Persistence:**
- Currently: In-memory only (lost on server restart)
- Future: Database-backed persistence for multi-user support

---

## 13. ERROR HANDLING AND EDGE CASES

### 13.1 Backend Error Handling

**Scenario Loading Errors:**
```python
try:
    with open(scenario_file, 'r') as f:
        scenario = json.load(f)
except FileNotFoundError:
    # Log error, return 404
except json.JSONDecodeError:
    # Log error, return 500 with message about invalid JSON
```

**Session Errors:**
```python
if session_id not in sessions:
    return jsonify({'error': 'Session not found'}), 404
```

**Decision Validation:**
```python
decision_point = find_decision_point(scenario, action_id)
if not decision_point:
    return jsonify({'error': 'Decision point not found'}), 400

option = find_option(decision_point, option_id)
if not option:
    return jsonify({'error': 'Option not found'}), 400
```

### 13.2 Frontend Error Handling

**API Request Failures:**
```javascript
try {
    const response = await fetch(`${API_BASE}/sessions/${sessionId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action_id, option_id })
    });
    
    if (!response.ok) {
        throw new Error('Failed to submit decision');
    }
    
    const feedback = await response.json();
    showFeedback(feedback, optionId);
} catch (error) {
    console.error('Error submitting decision:', error);
    alert('Failed to submit decision. Please try again.');
}
```

**Event Duplication Prevention:**
```javascript
// Track displayed event IDs
displayedEventIds = new Set();

// Only display new events
events.forEach(event => {
    if (!displayedEventIds.has(event.id)) {
        displayEvent(event);
        displayedEventIds.add(event.id);
    }
});
```

**Chart Initialization Errors:**
```javascript
try {
    cpuChart = new Chart(ctx, config);
} catch (error) {
    console.error('Chart initialization failed:', error);
    // Fallback: Display metric as text only
}
```

### 13.3 Edge Cases Handled

1. **Missing Metrics**: If event has no metrics, charts don't update (no error)
2. **Empty Scenarios**: Handled gracefully with empty state messages
3. **Invalid JSON**: Backend validates and returns error, frontend shows error message
4. **Network Failures**: Frontend shows user-friendly error messages
5. **Session Timeout**: Frontend detects missing session and prompts to restart
6. **Browser Compatibility**: Modern browser checks, graceful degradation

---

## 14. EDUCATIONAL DESIGN RATIONALE

### 14.1 Progressive Disclosure

The simulator uses progressive disclosure to manage cognitive load:
- **Learning Center**: Background knowledge before practice
- **Scenario Background**: Context-specific help during practice
- **Immediate Feedback**: Quick reinforcement after decisions
- **Detailed Analysis**: Deep comparison when user seeks more understanding
- **NIST Recommendations**: Comprehensive guidance after completion

### 14.2 Scaffolding Strategy

**Level 1: Guided Learning (Learning Center)**
- Provides foundational knowledge
- Explains "what" and "why"
- Real-world examples for context

**Level 2: Supported Practice (Simulation)**
- Hands-on practice with help available
- Scenario background button for context
- Immediate feedback for correction

**Level 3: Independent Practice (Repeated Scenarios)**
- Users can repeat scenarios
- Apply learned knowledge
- Improve scores through practice

### 14.3 Feedback Design Principles

**Immediate Feedback:**
- Provided instantly after decision
- Includes correctness, score, and brief explanation
- Prevents incorrect knowledge from solidifying

**Detailed Feedback:**
- Available on-demand (Detailed Analysis modal)
- Compares all options side-by-side
- Explains tradeoffs and best practices
- Supports deeper understanding

**Delayed Feedback (Recommendations):**
- Provided after scenario completion
- Connects performance to improvement areas
- Maps to NIST framework for professional relevance

### 14.4 Realism vs. Educational Value

**Realistic Elements:**
- Real-world attack patterns and indicators
- Authentic log formats and sources
- Realistic system metrics and trends
- Industry-standard terminology

**Educational Adaptations:**
- Simplified timelines (compressed for learning)
- Clear decision points (not ambiguous)
- Structured feedback (explanatory, not just correct/incorrect)
- Synthetic data (safe, no real risks)

---

## CONCLUSION

This comprehensive summary documents the current state of the Interactive Network Incident Response Simulator, including all enhancements made since the intermediate report. The application provides a robust, educational platform for practicing incident response skills through realistic scenarios, detailed feedback, and comprehensive learning resources.

The system successfully balances educational value with user experience, providing both guided learning (Learning Center) and hands-on practice (simulations). All components work together to create an effective training tool aligned with NIST SP 800-61 framework and industry best practices.

**Key Achievements:**
- Complete implementation of three major incident types with 10 sub-scenarios
- Comprehensive Learning Center with real-world case studies
- Detailed feedback system with option comparison
- NIST-aligned recommendations and scoring
- Professional, responsive user interface
- Well-documented, extensible codebase

**Technical Excellence:**
- Clean separation of concerns (frontend/backend)
- Data-driven scenario design (JSON-based)
- Robust error handling and edge case management
- Comprehensive API documentation
- Detailed state management

**Educational Value:**
- Progressive disclosure and scaffolding
- Multiple feedback mechanisms
- Real-world alignment with industry standards
- Safe, controlled learning environment

---

**Document Version:** 2.0  
**Last Updated:** December 2025  
**Project Status:** Final Release - Complete and Production Ready

