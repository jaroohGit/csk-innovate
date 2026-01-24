const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getDatabaseContext } = require('./db-connector');
const healthRouter = require('./health');
const wwtApi = require('./wwt-api');
const app = express();
const PORT = 3010;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.use('/api', healthRouter);

// Groq API Configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// System prompt - Clear instruction to use provided data
const SYSTEM_PROMPT = `You are Teddy, assistant for CSK INNOVATE (Industrial IoT and AI company).

CRITICAL INSTRUCTIONS:
1. When user asks about system data, pH, temperature, flow rate, or sensor status, you MUST use the data provided in the user message.
2. If user asks about a parameter that doesn't exist exactly, look at "AVAILABLE DATA FIELDS" and "RELEVANT FIELDS" sections to find similar parameters.
3. DO NOT say "I don't have real-time data" - the data IS provided to you in the message.
4. If the exact field name doesn't match, use the closest similar field name from the available data.
5. Answer in Thai or English based on user's language, short and clear.

FUZZY MATCHING EXAMPLES:
- If user asks "pH" or "ค่า pH" → use any field containing "ph", "pH", "ph_value"
- If user asks "temperature" or "อุณหภูมิ" → use "temp", "temperature", "degrees"
- If user asks "flow" or "ฟลว์" → use "flow", "flow_rate", "flowrate"
- If user asks "BOD" or "บีโอดี" → use "bod", "bod_in", "bod_out"

Services:
1. IIoT Platform - Real-time monitoring 150,000 THB
2. AI Analytics - Predictive Maintenance 200,000 THB
3. Wastewater Treatment - pH BOD COD monitoring

Contact: contact@cskinnovate.com`;


app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('📩 User message:', message);

    // ดึงข้อมูลจาก database ตามคำถามของ user
    const dbContext = await getDatabaseContext(message);
    
    // ใส่ข้อมูล database เข้าไปใน user message เพื่อให้ AI เห็นชัดเจน
    let userMessage = message;
    if (dbContext) {
      userMessage = `USER QUESTION: ${message}\n\n=== REAL-TIME SYSTEM DATA FROM DATABASE ===\n${dbContext}\n\nIMPORTANT: Use the data above to answer. This is REAL data from our sensors, not hypothetical.`;
      console.log('✅ Database context added');
    }

    // Call Groq API
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Groq API error: ${response.statusText} - ${error}`);
    }

    const data = await response.json();
    const botMessage = data.choices?.[0]?.message?.content || 'ขอโทษครับ ไม่สามารถตอบคำถามได้ในขณะนี้';

    console.log('🤖 AI response:', botMessage.substring(0, 100) + '...');

    res.json({ message: botMessage });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to get response',
      message: 'ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง' 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', model: 'Llama 3.3 70B via Groq', database: 'TimescaleDB Connected' });
});

// WWT Dashboard API Endpoints
app.get('/api/wwt/summary', async (req, res) => {
  try {
    const summary = await wwtApi.getWWTSummary();
    res.json(summary);
  } catch (error) {
    console.error('Error fetching WWT summary:', error);
    res.status(500).json({ error: 'Failed to fetch WWT summary' });
  }
});

app.get('/api/wwt/energy/daily', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const data = await wwtApi.getDailyEnergy(days);
    res.json(data);
  } catch (error) {
    console.error('Error fetching daily energy:', error);
    res.status(500).json({ error: 'Failed to fetch daily energy data' });
  }
});

app.get('/api/wwt/volume', async (req, res) => {
  try {
    const hours = parseInt(req.query.hours) || 24;
    const data = await wwtApi.getWaterVolume(hours);
    res.json(data);
  } catch (error) {
    console.error('Error fetching water volume:', error);
    res.status(500).json({ error: 'Failed to fetch water volume data' });
  }
});

app.get('/api/wwt/hourly', async (req, res) => {
  try {
    const hours = parseInt(req.query.hours) || 24;
    const data = await wwtApi.getHourlyData(hours);
    res.json(data);
  } catch (error) {
    console.error('Error fetching hourly data:', error);
    res.status(500).json({ error: 'Failed to fetch hourly data' });
  }
});

app.get('/api/wwt/columns', async (req, res) => {
  try {
    const columns = await wwtApi.getAvailableColumns();
    res.json(columns);
  } catch (error) {
    console.error('Error fetching columns:', error);
    res.status(500).json({ error: 'Failed to fetch columns' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Chat API server running on port ${PORT}`);
  console.log('💬 Using Llama 3.3 70B via Groq API');
  console.log('🗄️ Database integration enabled (TimescaleDB)');
  if (!GROQ_API_KEY) {
    console.error('⚠️  WARNING: GROQ_API_KEY not found in environment!');
  }
});
