const { Pool } = require('pg');

// เชื่อมต่อกับ TimescaleDB จาก deploy project
const pool = new Pool({
  host: 'localhost',
  database: 'wwt_data',
  user: 'postgres',
  password: 'postgres',
  port: 5436,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Test connection on startup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log('✅ Database connected successfully at', res.rows[0].now);
  }
});

// ฟังก์ชันตรวจสอบว่ามีข้อมูลในตารางหรือไม่
async function checkDataAvailability() {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as wwt01_count
      FROM wwt01_data
    `);
    
    const wwt01Count = parseInt(result.rows[0].wwt01_count);
    
    console.log(`📊 Data availability: wwt01=${wwt01Count} records`);
    
    return {
      hasData: wwt01Count > 0,
      wwt01Count
    };
  } catch (error) {
    console.error('❌ Data availability check error:', error.message);
    return { hasData: false, wwt01Count: 0 };
  }
}

async function getSystemStats() {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_readings,
        ROUND(AVG(ph_sensor_01)::numeric, 2) as avg_ph,
        ROUND(AVG(temp_01)::numeric, 2) as avg_temp,
        ROUND(AVG(flow_meter_no1_realtime)::numeric, 2) as avg_flow,
        MIN(time) as first_reading,
        MAX(time) as last_reading,
        (SELECT ROUND(ph_sensor_01::numeric, 2) FROM wwt01_data ORDER BY time DESC LIMIT 1) as latest_ph,
        (SELECT ROUND(temp_01::numeric, 2) FROM wwt01_data ORDER BY time DESC LIMIT 1) as latest_temp,
        (SELECT ROUND(flow_meter_no1_realtime::numeric, 2) FROM wwt01_data ORDER BY time DESC LIMIT 1) as latest_flow
      FROM wwt01_data
      WHERE time > NOW() - INTERVAL '30 days'
    `);
    
    if (result.rows.length === 0 || result.rows[0].total_readings === '0') {
      return null;
    }
    
    return result.rows[0];
  } catch (error) {
    console.error('❌ getSystemStats error:', error.message);
    return null;
  }
}

async function getTreatmentEfficiency() {
  try {
    // Database นี้ไม่มีข้อมูล BOD/COD/SS ให้คำนวณจาก pH และ temperature trends
    const result = await pool.query(`
      SELECT 
        ROUND(AVG(ph_sensor_01)::numeric, 2) as avg_ph,
        ROUND(STDDEV(ph_sensor_01)::numeric, 3) as ph_stability,
        ROUND(AVG(temp_01)::numeric, 2) as avg_temp,
        ROUND(AVG(flow_meter_no1_realtime)::numeric, 2) as avg_flow,
        COUNT(*) as sample_count
      FROM wwt01_data
      WHERE time > NOW() - INTERVAL '30 days'
    `);
    
    if (result.rows.length === 0 || result.rows[0].sample_count === '0') {
      return null;
    }
    
    return result.rows[0];
  } catch (error) {
    console.error('❌ getTreatmentEfficiency error:', error.message);
    return null;
  }
}

async function getRecentAlerts() {
  try {
    const result = await pool.query(`
      SELECT 
        time,
        CASE 
          WHEN ph_sensor_01 < 6.5 OR ph_sensor_01 > 8.5 THEN 'pH นอกขอบเขต'
          WHEN temp_01 > 35 THEN 'อุณหภูมิสูงเกินไป'
          WHEN flow_meter_no1_realtime < 50 THEN 'อัตราไหลต่ำผิดปกติ'
          ELSE 'ปกติ'
        END as alert_type,
        ROUND(ph_sensor_01::numeric, 2) as ph,
        ROUND(temp_01::numeric, 2) as temperature,
        ROUND(flow_meter_no1_realtime::numeric, 2) as flow_rate
      FROM wwt01_data
      WHERE time > NOW() - INTERVAL '7 days'
        AND (ph_sensor_01 < 6.5 OR ph_sensor_01 > 8.5 
             OR temp_01 > 35 
             OR flow_meter_no1_realtime < 50)
      ORDER BY time DESC
      LIMIT 10
    `);
    return result.rows;
  } catch (error) {
    console.error('❌ getRecentAlerts error:', error.message);
    return [];
  }
}

async function getSensorStatus() {
  try {
    const result = await pool.query(`
      SELECT 
        'wwt01' as sensor_id,
        MAX(time) as last_update,
        ROUND(EXTRACT(EPOCH FROM (NOW() - MAX(time)))::numeric, 0) as seconds_ago,
        CASE 
          WHEN MAX(time) > NOW() - INTERVAL '5 minutes' THEN 'Online'
          WHEN MAX(time) > NOW() - INTERVAL '1 hour' THEN 'Warning'
          ELSE 'Offline'
        END as status
      FROM wwt01_data
    `);
    return result.rows;
  } catch (error) {
    console.error('❌ getSensorStatus error:', error.message);
    return [];
  }
}

async function getDatabaseContext(userMessage) {
  const message = userMessage.toLowerCase();
  let context = '';

  try {
    // ตรวจสอบว่ามีข้อมูลหรือไม่ก่อน
    const dataCheck = await checkDataAvailability();
    
    if (!dataCheck.hasData) {
      console.log('⚠️ No data available in database');
      return `\n⚠️ ขณะนี้ยังไม่มีข้อมูลจากเซ็นเซอร์ในระบบ\nระบบ IoT Platform พร้อมใช้งาน แต่รอการเชื่อมต่อเซ็นเซอร์\n`;
    }

    console.log(`✅ Found ${dataCheck.wwt01Count} records in database`);

    // ถ้าถามเกี่ยวกับสถิติหรือข้อมูลระบบ หรือ pH/temperature/flow
    if (message.includes('สถิติ') || message.includes('ข้อมูล') || 
        message.includes('stat') || message.includes('ระบบ') || 
        message.includes('status') || message.includes('current') ||
        message.includes('ph') || message.includes('พีเอช') || message.includes('ค่า') ||
        message.includes('temperature') || message.includes('อุณหภูมิ') ||
        message.includes('flow') || message.includes('อัตราการไหล') ||
        message.includes('ล่าสุด') || message.includes('latest') || message.includes('เท่าไหร่')) {
      const stats = await getSystemStats();
      if (stats && stats.total_readings > 0) {
        context += `\n📊 System Statistics (Last 30 days):
- Total readings: ${stats.total_readings} times
- Average pH: ${stats.avg_ph}
- Average temperature: ${stats.avg_temp}°C
- Average flow rate: ${stats.avg_flow} L/min
- Last reading: ${new Date(stats.last_reading).toLocaleString('en-US')}

🔴 LATEST REAL-TIME VALUES:
- Latest pH: ${stats.latest_ph}
- Latest temperature: ${stats.latest_temp}°C
- Latest flow rate: ${stats.latest_flow} L/min\n`;
      }
    }

    // ถ้าถามเกี่ยวกับประสิทธิภาพ
    if (message.includes('ประสิทธิภาพ') || message.includes('efficiency') || 
        message.includes('bod') || message.includes('cod') || message.includes('ss')) {
      const efficiency = await getTreatmentEfficiency();
      if (efficiency && efficiency.sample_count > 0) {
        context += `\n⚡ System Performance (Last 30 days):
- Average pH: ${efficiency.avg_ph} (stability: ${efficiency.ph_stability})
- Average temperature: ${efficiency.avg_temp}°C
- Average flow: ${efficiency.avg_flow} L/min
- Data samples: ${efficiency.sample_count} records\n`;
      }
    }

    // ถ้าถามเกี่ยวกับการแจ้งเตือนหรือปัญหา
    if (message.includes('แจ้งเตือน') || message.includes('alert') || 
        message.includes('ปัญหา') || message.includes('problem')) {
      const alerts = await getRecentAlerts();
      if (alerts && alerts.length > 0) {
        context += `\n🚨 Recent Alerts (Last 7 days):\n`;
        alerts.slice(0, 3).forEach((alert, idx) => {
          context += `${idx + 1}. ${alert.alert_type} - ${new Date(alert.time).toLocaleString('en-US')}\n`;
        });
        context += `\nTotal alerts found: ${alerts.length}\n`;
      } else {
        context += `\n✅ No alerts found. System operating normally.\n`;
      }
    }

    // ถ้าถามเกี่ยวกับสถานะเซ็นเซอร์
    if (message.includes('เซ็นเซอร์') || message.includes('sensor') || 
        message.includes('สถานะ') || message.includes('status')) {
      const sensors = await getSensorStatus();
      if (sensors && sensors.length > 0) {
        context += `\n🔌 สถานะเซ็นเซอร์:\n`;
        sensors.forEach(sensor => {
          const icon = sensor.status === 'Online' ? '✅' : sensor.status === 'Warning' ? '⚠️' : '❌';
          const minutesAgo = Math.floor(sensor.seconds_ago / 60);
          context += `${icon} ${sensor.sensor_id}: ${sensor.status} (${minutesAgo} นาทีที่แล้ว)\n`;
        });
      }
    }

    return context;
  } catch (error) {
    console.error('❌ Error generating database context:', error.message);
    return '';
  }
}

module.exports = {
  pool,
  checkDataAvailability,
  getSystemStats,
  getTreatmentEfficiency,
  getRecentAlerts,
  getSensorStatus,
  getDatabaseContext
};
