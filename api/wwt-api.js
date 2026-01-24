const { pool } = require('./db-connector');

// Mock data mode for development/testing when DB is not available
const MOCK_MODE = process.env.MOCK_DATA === 'true' || false;

if (MOCK_MODE) {
  console.log('🎭 WWT API running in MOCK DATA mode');
} else {
  console.log('📊 WWT API connected to database');
}


/**
 * Get daily energy consumption data
 * Calculates energy based on flow rate and operational hours
 */
async function getDailyEnergy(days = 7) {
  if (MOCK_MODE) {
    // Return mock data
    const mockData = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      mockData.push({
        date: date.toISOString().split('T')[0],
        total_flow_m3: (100 + Math.random() * 50).toFixed(2),
        energy_kwh: (50 + Math.random() * 25).toFixed(2),
        readings_count: Math.floor(Math.random() * 100) + 50,
        avg_flow_rate: (150 + Math.random() * 50).toFixed(2)
      });
    }
    return mockData;
  }

  try {
    const result = await pool.query(`
      SELECT 
        DATE(time) as date,
        ROUND(SUM(flow_meter_no1_realtime * 0.001)::numeric, 2) as total_flow_m3,
        ROUND((SUM(flow_meter_no1_realtime * 0.001) * 0.5)::numeric, 2) as energy_kwh,
        COUNT(*) as readings_count,
        ROUND(AVG(flow_meter_no1_realtime)::numeric, 2) as avg_flow_rate
      FROM wwt01_data
      WHERE time > NOW() - INTERVAL '${days} days'
      GROUP BY DATE(time)
      ORDER BY date DESC
    `);
    
    return result.rows;
  } catch (error) {
    console.error('❌ getDailyEnergy error:', error.message);
    throw error;
  }
}

/**
 * Get water volume data for AT-02 (or similar tanks)
 */
async function getWaterVolume(hours = 24) {
  if (MOCK_MODE) {
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const time = new Date();
      time.setHours(time.getHours() - i);
      mockData.push({
        time: time.toISOString(),
        flow_rate: (150 + Math.random() * 50).toFixed(2),
        volume_m3_per_min: (0.15 + Math.random() * 0.05).toFixed(3)
      });
    }
    return mockData;
  }

  try {
    const result = await pool.query(`
      SELECT 
        time,
        ROUND(flow_meter_no1_realtime::numeric, 2) as flow_rate,
        ROUND((flow_meter_no1_realtime * 0.001)::numeric, 3) as volume_m3_per_min
      FROM wwt01_data
      WHERE time > NOW() - INTERVAL '${hours} hours'
      ORDER BY time DESC
      LIMIT 100
    `);
    
    return result.rows;
  } catch (error) {
    console.error('❌ getWaterVolume error:', error.message);
    throw error;
  }
}

/**
 * Get real-time WWT data for dashboard
 */
async function getRealtimeWWTData() {
  if (MOCK_MODE) {
    return {
      time: new Date().toISOString(),
      ph: (7.2 + Math.random() * 0.6).toFixed(2),
      temperature: (28 + Math.random() * 4).toFixed(2),
      flow_rate: (150 + Math.random() * 50).toFixed(2),
      instant_power_kw: (0.075 + Math.random() * 0.025).toFixed(3)
    };
  }

  try {
    const result = await pool.query(`
      SELECT 
        time,
        ROUND(ph_sensor_01::numeric, 2) as ph,
        ROUND(temp_01::numeric, 2) as temperature,
        ROUND(flow_meter_no1_realtime::numeric, 2) as flow_rate,
        ROUND((flow_meter_no1_realtime * 0.001 * 0.5)::numeric, 3) as instant_power_kw
      FROM wwt01_data
      ORDER BY time DESC
      LIMIT 1
    `);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  } catch (error) {
    console.error('❌ getRealtimeWWTData error:', error.message);
    throw error;
  }
}

/**
 * Get hourly data for charts
 */
async function getHourlyData(hours = 24) {
  if (MOCK_MODE) {
    const mockData = [];
    for (let i = hours - 1; i >= 0; i--) {
      const hour = new Date();
      hour.setHours(hour.getHours() - i, 0, 0, 0);
      mockData.push({
        hour: hour.toISOString(),
        avg_ph: (7.2 + Math.random() * 0.6).toFixed(2),
        avg_temp: (28 + Math.random() * 4).toFixed(2),
        avg_flow: (150 + Math.random() * 50).toFixed(2),
        energy_kwh: (2 + Math.random() * 1).toFixed(2),
        sample_count: Math.floor(Math.random() * 50) + 10
      });
    }
    return mockData;
  }

  try {
    const result = await pool.query(`
      SELECT 
        DATE_TRUNC('hour', time) as hour,
        ROUND(AVG(ph_sensor_01)::numeric, 2) as avg_ph,
        ROUND(AVG(temp_01)::numeric, 2) as avg_temp,
        ROUND(AVG(flow_meter_no1_realtime)::numeric, 2) as avg_flow,
        ROUND(SUM(flow_meter_no1_realtime * 0.001 * 0.5)::numeric, 2) as energy_kwh,
        COUNT(*) as sample_count
      FROM wwt01_data
      WHERE time > NOW() - INTERVAL '${hours} hours'
      GROUP BY DATE_TRUNC('hour', time)
      ORDER BY hour DESC
    `);
    
    return result.rows;
  } catch (error) {
    console.error('❌ getHourlyData error:', error.message);
    throw error;
  }
}

/**
 * Get all available columns from wwt01_data table
 */
async function getAvailableColumns() {
  if (MOCK_MODE) {
    return [
      { column_name: 'time', data_type: 'timestamp' },
      { column_name: 'ph_sensor_01', data_type: 'double precision' },
      { column_name: 'temp_01', data_type: 'double precision' },
      { column_name: 'flow_meter_no1_realtime', data_type: 'double precision' }
    ];
  }

  try {
    const result = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'wwt01_data'
      ORDER BY ordinal_position
    `);
    
    return result.rows;
  } catch (error) {
    console.error('❌ getAvailableColumns error:', error.message);
    throw error;
  }
}

/**
 * Get WWT summary statistics
 */
async function getWWTSummary() {
  if (MOCK_MODE) {
    const realtime = await getRealtimeWWTData();
    return {
      realtime: realtime,
      summary_24h: {
        total_readings: 1440,
        avg_ph_24h: '7.45',
        avg_temp_24h: '29.8',
        avg_flow_24h: '175.5',
        total_energy_24h_kwh: '63.18',
        min_ph_24h: '6.8',
        max_ph_24h: '8.1'
      }
    };
  }

  try {
    // Get real-time data
    const realtime = await getRealtimeWWTData();
    
    // Get 24-hour summary
    const summary24h = await pool.query(`
      SELECT 
        COUNT(*) as total_readings,
        ROUND(AVG(ph_sensor_01)::numeric, 2) as avg_ph_24h,
        ROUND(AVG(temp_01)::numeric, 2) as avg_temp_24h,
        ROUND(AVG(flow_meter_no1_realtime)::numeric, 2) as avg_flow_24h,
        ROUND(SUM(flow_meter_no1_realtime * 0.001 * 0.5)::numeric, 2) as total_energy_24h_kwh,
        MIN(ph_sensor_01) as min_ph_24h,
        MAX(ph_sensor_01) as max_ph_24h
      FROM wwt01_data
      WHERE time > NOW() - INTERVAL '24 hours'
    `);
    
    return {
      realtime: realtime,
      summary_24h: summary24h.rows[0] || null
    };
  } catch (error) {
    console.error('❌ getWWTSummary error:', error.message);
    throw error;
  }
}

module.exports = {
  getDailyEnergy,
  getWaterVolume,
  getRealtimeWWTData,
  getHourlyData,
  getAvailableColumns,
  getWWTSummary
};
