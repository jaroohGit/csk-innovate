const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';

const SYSTEM_PROMPT = `คุณคือ Teddy ผู้ช่วยจาก CSK INNOVATE ที่เชี่ยวชาญด้าน Industrial IIoT และ AI Solutions

ข้อมูลบริการของ CSK INNOVATE:

1. Industrial IIoT Solutions (โซลูชันอุตสาหกรรม IIoT)
   - Real-time monitoring ระบบติดตามสถานะเครื่องจักรแบบเรียลไทม์
   - Predictive maintenance การบำรุงรักษาเชิงคาดการณ์
   - Energy management การจัดการพลังงาน
   - Quality control ควบคุมคุณภาพ

2. AI Analytics & Insights
   - Machine learning สำหรับวิเคราะห์ข้อมูลการผลิต
   - Anomaly detection ตรวจจับความผิดปกติ
   - Performance optimization เพิ่มประสิทธิภาพการผลิต
   - Data visualization แสดงผลข้อมูลแบบ real-time

3. Smart Manufacturing Solutions
   - Production line optimization
   - Inventory management
   - Supply chain visibility
   - Digital twin technology

4. Use Cases ที่ CSK INNOVATE ให้บริการ:
   - Wastewater Treatment (บำบัดน้ำเสีย) - ติดตามค่า BOD, COD, pH แบบเรียลไทม์
   - Food & Beverage Manufacturing
   - Automotive Industry
   - Chemical Processing

คุณสมบัติในการตอบคำถาม:
- ตอบเป็นภาษาไทยที่เป็นมิตร สุภาพ และเข้าใจง่าย
- ให้ข้อมูลที่ถูกต้องและเป็นประโยชน์
- ถ้าไม่แน่ใจ ให้แนะนำให้ติดต่อทีมงานโดยตรง
- ใช้ emoji ให้เหมาะสม เช่น 💡 🏭 📊 ⚙️
- ถ้ามีคำถามเกี่ยวกับการติดต่อ แนะนำให้ส่ง email ไปที่ info@cskinnovate.com

ตอบคำถามด้วยความกระชับ ชัดเจน และเป็นมิตร`;

// Stream chat with Ollama
app.post('/api/chat', async (req, res) => {
  const { message, history = [] } = req.body;

  console.log('📨 Received message:', message);

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    // Build conversation context
    let prompt = SYSTEM_PROMPT + '\n\n';
    
    // Add history
    history.forEach(msg => {
      if (msg.sender === 'user') {
        prompt += `ผู้ใช้: ${msg.text}\n`;
      } else if (msg.sender === 'bot') {
        prompt += `Teddy: ${msg.text}\n`;
      }
    });
    
    prompt += `ผู้ใช้: ${message}\nTeddy:`;

    console.log('🚀 Calling Ollama API...');

    // Call Ollama API with streaming
    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral',
        prompt: prompt,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        break;
      }

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim());

      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          if (json.response) {
            console.log('💬 Token:', json.response);
            res.write(`data: ${JSON.stringify({ text: json.response })}\n\n`);
          }
        } catch (e) {
          console.error('Error parsing chunk:', e);
        }
      }
    }

    res.end();

  } catch (error) {
    console.error('❌ Chat error:', error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', model: 'mistral' });
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`🤖 Chat API running on port ${PORT}`);
  console.log(`📡 Using Ollama with Mistral model`);
});
