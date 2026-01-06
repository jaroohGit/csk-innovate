const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3010;

app.use(cors());
app.use(express.json());

// System prompt สำหรับ CSK INNOVATE
const SYSTEM_PROMPT = `You are Teddy, a helpful assistant for CSK INNOVATE - Industrial IIoT & AI Solutions company.

CSK INNOVATE provides:
1. Industrial IIoT Platform - Real-time monitoring, MQTT protocol, Remote control
2. AI Analytics & Prediction - Predictive maintenance, Process optimization, Machine Learning
3. Smart Manufacturing Solutions - Digital transformation, Industry 4.0 implementation
4. Success Stories - Wastewater treatment monitoring (BOD/COD/SS prediction), Food & beverage industry solutions

Contact: info@cskinnovate.com | www.cskinnovate.com

Keep answers concise, friendly, and professional. Mix Thai and English when appropriate.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Call Ollama API
    const response = await fetch('http://127.0.0.1:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tinyllama:latest',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 200, // Limit response length
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    const botMessage = data.message?.content || 'ขอโทษครับ ไม่สามารถตอบคำถามได้ในขณะนี้';

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
  res.json({ status: 'ok', model: 'TinyLlama via Ollama' });
});

app.listen(PORT, () => {
  console.log(`🚀 Chat API server running on port ${PORT}`);
  console.log(`💬 Using TinyLlama model via Ollama`);
});
