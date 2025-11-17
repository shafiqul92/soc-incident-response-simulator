# Event Information Sources

## Where Event Data Comes From

The events in this simulator are **synthetic but realistic** - they're designed based on real-world incident patterns, industry standards, and authoritative security guidance.

## Primary Sources

### 1. **NIST SP 800-61 Rev. 2** (Computer Security Incident Handling Guide)
- **Source**: National Institute of Standards and Technology
- **What it provides**: Standard incident response procedures, indicator types, and response actions
- **How we use it**: 
  - Event severity levels (low, medium, high, critical)
  - Incident response phases (Detection → Containment → Eradication → Recovery)
  - Decision point structure and recommended actions

### 2. **CISA Incident Response Playbooks**
- **Source**: Cybersecurity & Infrastructure Security Agency
- **What it provides**: Specific playbooks for different attack types (DDoS, data breach, ransomware)
- **How we use it**:
  - Realistic alert formats and log entries
  - Containment procedures
  - Recovery steps

### 3. **Verizon Data Breach Investigations Report (DBIR)**
- **Source**: Verizon's annual security report
- **What it provides**: Real attack statistics, common indicators, and attack patterns
- **How we use it**:
  - Traffic spike percentages (300% increase is realistic)
  - Common attack vectors
  - Time-to-detection metrics

### 4. **ENISA Ransomware Guidance**
- **Source**: European Union Agency for Cybersecurity
- **What it provides**: Ransomware indicators, lateral movement patterns, file encryption behaviors
- **How we use it**:
  - SMB write anomalies
  - Process execution patterns
  - File access error patterns

## How Events Are Designed

### Step 1: Research Real Attack Patterns
We study:
- Real incident reports (sanitized)
- Security vendor threat intelligence
- Industry case studies
- Academic research on attack behaviors

### Step 2: Extract Key Indicators
From research, we identify:
- **Early indicators**: What shows up first? (e.g., traffic spike)
- **Escalation indicators**: What shows it's getting worse? (e.g., CPU spike)
- **Critical indicators**: What shows it's critical? (e.g., service outage)
- **Recovery indicators**: What shows it's improving? (e.g., traffic normalization)

### Step 3: Create Synthetic Events
We design events that:
- Match real log formats (e.g., `[WARNING] CPU usage: 85%`)
- Use realistic metrics (e.g., CPU percentages, connection counts)
- Follow realistic timelines (events spaced 2-5 minutes apart)
- Show realistic progression (metrics increase/decrease logically)

### Step 4: Validate Against Standards
We verify events align with:
- NIST incident response framework
- Industry best practices
- Real-world SOC dashboard formats

## Example: DDoS Event Design

### Real-World Pattern (from research):
```
1. Traffic spike detected (early warning)
2. Server resources start depleting (escalation)
3. Service becomes unavailable (critical)
4. Mitigation applied (containment)
5. Service recovers (recovery)
```

### Our Synthetic Events:
```json
Event 1: "Traffic spike 300%" → Based on DBIR statistics
Event 2: "CPU 85%" → Realistic server stress level
Event 3: "Service unavailable 15%" → Realistic outage percentage
Event 4: "SYN flood 80%" → Common DDoS attack type
Event 5: "Recovery metrics" → Based on NIST recovery phase
```

## Event Metrics Sources

### CPU/Memory Usage:
- **Realistic ranges**: Based on server monitoring data
- **Progression**: Follows real attack patterns (gradual increase)
- **Source**: Industry server performance baselines

### Network Traffic:
- **Connection counts**: Based on typical web server capacities
- **Spike percentages**: Based on DBIR attack statistics
- **Source**: Network monitoring best practices

### Log Formats:
- **Format**: Matches real Apache/Nginx/Windows Event Log formats
- **Severity levels**: Standard syslog levels (INFO, WARNING, ERROR, CRITICAL)
- **Source**: Common logging standards (RFC 5424)

## Why Synthetic (Not Real) Data?

1. **Safety**: No risk of exposing real incidents or sensitive data
2. **Educational**: Focused on learning, not real threats
3. **Controlled**: Predictable scenarios for consistent learning
4. **Ethical**: No privacy concerns or legal issues

## How to Add More Events

### Template for New Event:
```json
{
  "id": "event_X",
  "type": "alert",  // or "log"
  "timestamp": "2025-11-15T10:XX:XXZ",
  "source": "System Name",
  "severity": "medium",  // low, medium, high, critical
  "title": "Event Title",
  "description": "What happened",
  "log_entry": "Optional log format entry",
  "metrics": {
    "cpu_usage": 50,
    "memory_usage": 60,
    // Add relevant metrics
  }
}
```

### Research Before Adding:
1. Check NIST SP 800-61 for indicator types
2. Review CISA playbooks for attack-specific events
3. Look at real incident reports (sanitized) for patterns
4. Ensure metrics follow realistic progression

## References

1. NIST SP 800-61 Rev. 2: Computer Security Incident Handling Guide
2. CISA Incident Response Playbooks (2024)
3. ENISA: Ransomware Good Practice Guide (2022)
4. Verizon DBIR 2024: Data Breach Investigations Report
5. RFC 5424: The Syslog Protocol

## Event Realism Checklist

When creating events, ensure:
- [ ] Metrics are realistic (not exaggerated)
- [ ] Timeline is realistic (events spaced appropriately)
- [ ] Log format matches real systems
- [ ] Severity levels are appropriate
- [ ] Progression makes logical sense
- [ ] Aligns with NIST/CISA guidance
- [ ] No real data or sensitive information

