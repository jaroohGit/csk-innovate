const { pool } = require('./db-connector');

/**
 * Get daily energy consumption data
 * Calculates energy based on flow rate and operational hours
 */
async function getDailyEnergy(days = 7) {
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
