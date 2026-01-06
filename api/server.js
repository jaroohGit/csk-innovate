const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getDatabaseContext } = require('./db-connector');
const app = express();
const PORT = 3010;

app.use(cors());
app.use(express.json());

// Groq API Configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// System prompt - Clear instruction to use provided data
const SYSTEM_PROMPT = `You are Teddy, assistant for CSK INNOVATE (Industrial IoT and AI company).

CRITICAL: When user asks about system data, pH, temperature, flow rate, or sensor status, 
you MUST use the "Current System Data" provided in the user message. 
DO NOT say "I don't have real-time data" - the data IS provided to you.

Answer in Thai or English based on user's language, short and clear.

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

app.listen(PORT, () => {
  console.log(`🚀 Chat API server running on port ${PORT}`);
  console.log('💬 Using Llama 3.3 70B via Groq API');
  console.log('🗄️ Database integration enabled (TimescaleDB)');
  if (!GROQ_API_KEY) {
    console.error('⚠️  WARNING: GROQ_API_KEY not found in environment!');
  }
});
