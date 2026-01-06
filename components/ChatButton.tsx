'use client';

import { useState } from 'react';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'สวัสดีครับ! มีอะไรให้ Teddy ช่วยเหลือไหมครับ? แจ้งมาได้เลยครับ 😊',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages([...messages, userMessage]);
      setMessage('');

      setTimeout(() => {
        const botReply = {
          id: messages.length + 2,
          text: 'ขอบคุณสำหรับข้อความครับ! ทีมงานจะติดต่อกลับไปโดยเร็วที่สุดครับ',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botReply]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-8 w-[90vw] sm:w-96 h-[500px] bg-[#0d0d0d] rounded-2xl shadow-2xl border border-white/10 flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-accent to-accent/80 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Teddy - CSK INNOVATE</h3>
                <p className="text-xs text-white/80">พร้อมให้คำปรึกษา</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0a]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-accent text-white rounded-br-none'
                      : 'bg-white/5 text-white rounded-bl-none border border-white/10'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                  }`}>
                    {msg.timestamp.toLocaleTimeString('th-TH', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-[#0d0d0d]">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="พิมพ์ข้อความ..."
                className="flex-1 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="w-10 h-10 rounded-full bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-4 sm:right-8 w-16 h-16 bg-accent text-white rounded-full shadow-lg shadow-accent/25 hover:scale-110 transition-all z-50 flex items-center justify-center group"
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20"></span>
      </button>
    </>
  );
}