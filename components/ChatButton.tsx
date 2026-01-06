'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'สวัสดีครับ! ผม Teddy ผมสามารถช่วยตอบคำถามเบื้องต้นเกี่ยวกับ CSK INNOVATE ได้ครับ\n\nลองถามเกี่ยวกับ:\n• บริการของเรา\n• IIoT\n• AI Analytics\n• ติดต่อเรา',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    // สวัสดี / Hello
    if (msg.includes('สวัสดี') || msg.includes('hello') || msg.includes('hi')) {
      return 'สวัสดีครับ! ยินดีที่ได้รู้จักครับ มีอะไรให้ผมช่วยไหมครับ?';
    }

    // บริการ / Services
    if (msg.includes('บริการ') || msg.includes('service') || msg.includes('ทำอะไร')) {
      return 'CSK INNOVATE มีบริการหลัก 4 ด้าน:\n\n1. 🏭 Industrial IIoT Platform\n   - Real-time monitoring\n   - Remote control systems\n\n2. 🤖 AI Analytics & Prediction\n   - Predictive maintenance\n   - Process optimization\n\n3. 🎯 Smart Manufacturing Solutions\n   - Digital transformation\n   - Industry 4.0\n\n4. 💼 Use Cases & Success Stories\n   - Wastewater treatment\n   - Food & beverage industry\n\nสนใจด้านไหนเป็นพิเศษครับ?';
    }

    // IIoT
    if (msg.includes('iiot') || msg.includes('iot') || msg.includes('อินเทอร์เน็ต')) {
      return '🏭 Industrial IIoT Platform ของเรา:\n\n• Real-time Data Monitoring\n  - ติดตามข้อมูลแบบเรียลไทม์\n  - Dashboard แสดงผลข้อมูล\n\n• Remote Control\n  - ควบคุมระบบจากระยะไกล\n  - Alert & notification\n\n• MQTT Protocol\n  - การสื่อสารที่เสถียร\n  - รองรับ sensor หลากหลาย\n\nสนใจรายละเอียดเพิ่มเติมไหมครับ?';
    }

    // AI
    if (msg.includes('ai') || msg.includes('artificial') || msg.includes('ปัญญาประดิษฐ์') || msg.includes('เอไอ')) {
      return '🤖 AI Analytics & Prediction:\n\n• Predictive Maintenance\n  - ทำนายการเสียของเครื่องจักร\n  - ลดค่าใช้จ่ายในการซ่อมบำรุง\n\n• Process Optimization\n  - เพิ่มประสิทธิภาพการผลิต\n  - ลดของเสีย\n\n• Machine Learning Models\n  - BOD/COD prediction\n  - Quality control\n\nต้องการทราบรายละเอียดเพิ่มเติมไหมครับ?';
    }

    // ติดต่อ / Contact
    if (msg.includes('ติดต่อ') || msg.includes('contact') || msg.includes('email') || msg.includes('โทร') || msg.includes('phone')) {
      return '📞 ติดต่อ CSK INNOVATE:\n\n• Email: info@cskinnovate.com\n• Phone: +66 (0) XX-XXX-XXXX\n• Website: www.cskinnovate.com\n\nหรือสามารถกรอกฟอร์มติดต่อในหน้าเว็บด้านล่างได้เลยครับ!';
    }

    // ราคา / Price
    if (msg.includes('ราคา') || msg.includes('price') || msg.includes('ค่าใช้จ่าย') || msg.includes('cost')) {
      return 'ราคาของบริการจะขึ้นอยู่กับ:\n\n• ขนาดของโครงการ\n• จำนวน sensors/devices\n• ความซับซ้อนของระบบ\n• Feature ที่ต้องการ\n\nแนะนำให้ติดต่อทีมงานเพื่อขอใบเสนอราคาที่เหมาะสมกับความต้องการของคุณครับ!\n\n📧 Email: info@cskinnovate.com';
    }

    // Wastewater
    if (msg.includes('น้ำเสีย') || msg.includes('wastewater') || msg.includes('wwt') || msg.includes('บำบัด')) {
      return '💧 Wastewater Treatment Monitoring:\n\n• Real-time parameter monitoring\n  - pH, BOD, COD, SS\n  - Temperature, Flow rate\n\n• Treatment Efficiency\n  - BOD removal: 86%+\n  - COD removal: 70%+\n  - SS removal: 83%+\n\n• Predictive Analytics\n  - BOD prediction\n  - Maintenance scheduling\n\nสนใจ case study เพิ่มเติมไหมครับ?';
    }

    // ขอบคุณ / Thank you
    if (msg.includes('ขอบคุณ') || msg.includes('thank') || msg.includes('ขอบใจ')) {
      return 'ยินดีครับ! มีคำถามอื่นๆ อีกไหมครับ? 😊';
    }

    // Default
    return 'ขอโทษครับ ผมยังไม่เข้าใจคำถามนี้\n\nลองถามเกี่ยวกับ:\n• บริการของเรา\n• IIoT Platform\n• AI Analytics\n• ติดต่อเรา\n• ราคา\n\nหรือติดต่อทีมงานโดยตรงที่ info@cskinnovate.com ครับ';
  };

  const handleSend = () => {
    if (message.trim()) {
      // Add user message
      const userMsg: Message = {
        text: message,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);

      // Get bot response
      const botResponse = getBotResponse(message);
      
      // Add bot response after a short delay
      setTimeout(() => {
        const botMsg: Message = {
          text: botResponse,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
      }, 500);

      setMessage('');
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 hover:scale-110"
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">T</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Teddy Assistant</h3>
                <p className="text-white/80 text-xs">Online - Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-3 ${msg.isUser ? 'flex-row-reverse' : ''}`}>
                {!msg.isUser && (
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-semibold">T</span>
                  </div>
                )}
                <div className="flex-1 max-w-[80%]">
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      msg.isUser
                        ? 'bg-orange-500 text-white rounded-tr-none ml-auto'
                        : 'bg-white/5 text-gray-300 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString('th-TH', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="พิมพ์ข้อความ... Type a message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={handleSend}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-2 text-center">
              Basic Q&A System - No API required
            </p>
          </div>
        </div>
      )}
    </>
  );
}
