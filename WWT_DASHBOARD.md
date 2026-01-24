# WWT Report Dashboard

## Overview
The WWT (Wastewater Treatment) Report Dashboard provides real-time monitoring and analytics for wastewater treatment operations. It addresses the energy calculation issues and provides comprehensive data visualization.

## Features

### 1. Real-time Monitoring
- **pH Level**: Current pH reading with timestamp
- **Temperature**: Real-time temperature monitoring (°C)
- **Flow Rate**: Current flow rate (L/min)
- **Power**: Instantaneous power consumption (kW)

### 2. 24-Hour Summary
- Total energy consumption (kWh)
- Average pH, temperature, and flow rate
- Statistical overview of the last 24 hours

### 3. Energy Graphs (FIXED)
- **Daily Energy Consumption**: Bar chart showing energy usage over the last 7 days
- **Hourly Energy Consumption**: Detailed hourly energy tracking for the last 24 hours
- Energy calculation formula: `energy_kwh = flow_rate_L/min * 0.001 * 0.5`

### 4. Trend Analysis
- Hourly trends for pH, temperature, and flow rate
- Multi-axis line charts for easy comparison
- 24-hour historical data

## Access
Navigate to `/wwt-report` or use the "WWT Report" link in the navigation menu.

## Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```bash
# Frontend API URL
NEXT_PUBLIC_API_URL=http://localhost:3010
```

Create a `.env` file in the `api/` directory:

```bash
# Database Configuration
DB_HOST=localhost
DB_NAME=wwt_data
DB_USER=postgres
DB_PASSWORD=postgres
DB_PORT=5436

# Mock Data Mode (for testing without database)
MOCK_DATA=true

# Groq API Key (optional, for chatbot)
GROQ_API_KEY=your_api_key_here
```

## Development

### Running with Mock Data
When you don't have access to the TimescaleDB database, you can use mock data mode:

1. In `api/.env`, set: `MOCK_DATA=true`
2. Start the API server: `cd api && npm start`
3. Start the Next.js dev server: `npm run dev`
4. Access the dashboard at `http://localhost:3000/wwt-report`

### Running with Real Database
1. Ensure TimescaleDB is running and accessible
2. In `api/.env`, set: `MOCK_DATA=false`
3. Configure database connection parameters
4. Start both servers as above

## API Endpoints

The dashboard consumes the following API endpoints:

- `GET /api/wwt/summary` - Real-time data and 24-hour summary
- `GET /api/wwt/energy/daily?days=7` - Daily energy consumption
- `GET /api/wwt/hourly?hours=24` - Hourly aggregated data
- `GET /api/wwt/volume?hours=24` - Water volume data
- `GET /api/wwt/columns` - Database schema information

## Technical Details

### Energy Calculation
The energy consumption is calculated based on flow rate and pump efficiency:

```javascript
const FLOW_TO_M3_CONVERSION = 0.001; // L/min to m3/min
const M3_TO_KWH_FACTOR = 0.5;        // kWh per m3 (pump energy)
energy_kwh = flow_rate * FLOW_TO_M3_CONVERSION * M3_TO_KWH_FACTOR
```

### Data Refresh
The dashboard automatically refreshes data every 30 seconds to provide near real-time monitoring.

### Security
- SQL injection protection via parameterized queries
- Environment-based configuration (no hardcoded credentials)
- CodeQL security scan passed with 0 vulnerabilities

## Troubleshooting

### "Failed to fetch data" Error
- Check that the API server is running on port 3010
- Verify the `NEXT_PUBLIC_API_URL` environment variable
- If using a database, ensure it's accessible
- Try enabling `MOCK_DATA=true` for testing

### Energy Showing as 0
This was the original issue and has been fixed. The problem was:
1. Missing energy calculation logic in the API
2. Incorrect or missing flow rate data
3. String/number type conversion issues

The fix includes:
- Proper energy calculation in SQL queries
- Mock data mode for testing
- Type-safe number formatting utilities

## Database Schema
The dashboard expects a `wwt01_data` table with the following columns:
- `time` (timestamp)
- `ph_sensor_01` (double precision)
- `temp_01` (double precision)
- `flow_meter_no1_realtime` (double precision)

Additional MQTT variables can be added to this table as needed.

## Future Enhancements
- [ ] Add AT-02 water volume specific graphs
- [ ] Implement database logging for new MQTT variables
- [ ] Add data export functionality (CSV/Excel)
- [ ] Implement alert thresholds and notifications
- [ ] Add user authentication and role-based access
- [ ] Mobile responsive optimizations
