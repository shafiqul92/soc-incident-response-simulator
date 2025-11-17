# Quick Start Guide

## Step 1: Install Dependencies

Open a terminal/command prompt and navigate to the project directory:

```bash
cd C:\CPRE-5300_PROJECT
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

## Step 2: Start the Server

Run the Flask application:

```bash
python app.py
```

You should see output like:
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

## Step 3: Open in Browser

Open your web browser and go to:
```
http://localhost:5000
```

## Step 4: Start a Scenario

1. Click on one of the three scenario cards:
   - **DDoS Attack Scenario**
   - **Data Breach Scenario**
   - **Ransomware Infection Scenario**

2. Review the events and logs as they appear

3. When a decision point appears, select the best response action

4. Receive immediate feedback on your choices

5. Complete the scenario to see your final score and recommendations

## Troubleshooting

### Port Already in Use
If port 5000 is already in use, you can change it in `app.py`:
```python
app.run(debug=True, port=5001)  # Change to any available port
```

### Scenarios Not Loading
- Ensure all JSON files exist in the `scenarios/` folder
- Check the browser console (F12) for any JavaScript errors
- Verify the Flask server is running and shows no errors

### Charts Not Displaying
- Check your internet connection (Chart.js is loaded from CDN)
- Verify browser console for any JavaScript errors

## Next Steps

- Read the full README.md for detailed documentation
- Customize scenarios by editing JSON files in `scenarios/`
- Modify styling in `static/css/style.css`
- Add new features in `static/js/app.js`

## Testing the Application

1. **Test DDoS Scenario:**
   - Look for traffic spikes and CPU increases
   - Choose to block IPs or enable SYN cookies
   - Verify containment actions

2. **Test Data Breach Scenario:**
   - Identify failed logins and unusual locations
   - Disable compromised accounts
   - Isolate affected hosts

3. **Test Ransomware Scenario:**
   - Detect SMB anomalies and file encryption
   - Isolate infected hosts immediately
   - Choose recovery procedures

Enjoy learning incident response!

