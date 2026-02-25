#!/usr/bin/env node

/**
 * Telegram Notifier for CSK-INNOVATE Vue Development
 * Usage: node telegram-notifier.js "message" [type]
 * Types: info, success, error, warning, progress
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class TelegramNotifier {
  constructor() {
    this.loadConfig();
  }

  loadConfig() {
    // Try to load from .env file
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const lines = envContent.split('\n');
      
      lines.forEach(line => {
        const match = line.match(/^([^#=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          const value = match[2].trim().replace(/^["']|["']$/g, '');
          if (key === 'TELEGRAM_BOT_TOKEN') {
            this.botToken = value;
          } else if (key === 'TELEGRAM_CHAT_ID') {
            this.chatId = value;
          }
        }
      });
    }

    // Fallback to environment variables
    this.botToken = this.botToken || process.env.TELEGRAM_BOT_TOKEN;
    this.chatId = this.chatId || process.env.TELEGRAM_CHAT_ID;
  }

  isConfigured() {
    return !!(this.botToken && this.chatId);
  }

  getEmoji(type) {
    const emojis = {
      info: '💬',
      success: '✅',
      error: '❌',
      warning: '⚠️',
      progress: '🔄'
    };
    return emojis[type] || '💬';
  }

  formatMessage(message, type = 'info') {
    const emoji = this.getEmoji(type);
    const timestamp = new Date().toLocaleString('th-TH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    return `${emoji} *CSK-INNOVATE Vue Development*\n\n${message}\n\n⏰ ${timestamp}`;
  }

  async send(message, type = 'info') {
    if (!this.isConfigured()) {
      console.log('⚠️  Telegram not configured. Message:', message);
      return { success: false, error: 'Not configured' };
    }

    try {
      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
      const formattedMessage = this.formatMessage(message, type);

      const response = await axios.post(url, {
        chat_id: this.chatId,
        text: formattedMessage,
        parse_mode: 'Markdown'
      });

      console.log(`✅ Telegram notification sent: ${type.toUpperCase()}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ Failed to send Telegram notification:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Convenience methods
  async notify(message) {
    return this.send(message, 'info');
  }

  async success(message) {
    return this.send(message, 'success');
  }

  async error(message) {
    return this.send(message, 'error');
  }

  async warning(message) {
    return this.send(message, 'warning');
  }

  async progress(message) {
    return this.send(message, 'progress');
  }
}

// Command line usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
📱 Telegram Notifier - CSK-INNOVATE Vue Development

Usage: node telegram-notifier.js "message" [type]

Types:
  info     - 💬 Information message (default)
  success  - ✅ Success message
  error    - ❌ Error message
  warning  - ⚠️  Warning message
  progress - 🔄 Progress message

Examples:
  node telegram-notifier.js "Starting build..."
  node telegram-notifier.js "Build completed!" success
  node telegram-notifier.js "Build failed" error

Configuration:
  Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env file
    `);
    process.exit(0);
  }

  const message = args[0];
  const type = args[1] || 'info';

  const notifier = new TelegramNotifier();
  
  if (!notifier.isConfigured()) {
    console.error(`
❌ Telegram not configured!

Please set up your Telegram bot:

1. Create a bot with @BotFather on Telegram
2. Get your bot token
3. Start a chat with your bot
4. Get your chat ID from: https://api.telegram.org/bot<TOKEN>/getUpdates
5. Add to .env file:

TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
    `);
    process.exit(1);
  }

  notifier.send(message, type).then(result => {
    if (result.success) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  });
}

module.exports = TelegramNotifier;
