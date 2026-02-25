# 📱 Telegram Notifier - Quick Start Guide

## ✅ Setup Completed!

The Telegram notification system has been installed in your CSK-INNOVATE Vue project.

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Create Telegram Bot

1. Open Telegram app
2. Search for **@BotFather**
3. Send: `/newbot`
4. Follow prompts:
   - Bot name: **CSK-INNOVATE Dev Bot**
   - Username: **CSK-INNOVATE_dev_bot** (must be unique)
5. **Copy the TOKEN** you receive

### Step 2: Get Chat ID

1. Start a chat with your new bot
2. Send any message (e.g., "hello")
3. Open browser and visit:
   ```
   https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
   ```
   (Replace `<YOUR_TOKEN>` with your bot token)
4. Find `"chat":{"id":123456789}` in the response
5. **Copy the Chat ID** (the number)

### Step 3: Configure

Run the setup script:
```bash
cd ~/CSK-INNOVATE-vue
bash setup-telegram.sh
```

Or manually edit `.env`:
```bash
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

---

## 🧪 Test It!

```bash
cd ~/CSK-INNOVATE-vue

# Quick test
node telegram-notifier.js "Hello from CSK-INNOVATE! 👋"

# Test all message types
bash test-telegram.sh
```

---

## 💡 Usage Examples

### Command Line

```bash
# Info message (default)
node telegram-notifier.js "Starting development server..."

# Success message
node telegram-notifier.js "Build completed!" success

# Error message
node telegram-notifier.js "Build failed!" error

# Warning message
node telegram-notifier.js "Deprecated API detected" warning

# Progress message
node telegram-notifier.js "Processing: 75% complete" progress
```

### In Scripts

Add to your `package.json`:
```json
{
  "scripts": {
    "dev": "node telegram-notifier.js '🚀 Starting dev server...' && vue-cli-service serve",
    "build": "node telegram-notifier.js '🔨 Building...' && vue-cli-service build && node telegram-notifier.js '✅ Build complete!' success"
  }
}
```

### In Bash Scripts

```bash
#!/bin/bash

# Notify start
node ~/CSK-INNOVATE-vue/telegram-notifier.js "🏁 Starting deployment..."

# Do work
docker-compose up -d

# Check result
if [ $? -eq 0 ]; then
    node ~/CSK-INNOVATE-vue/telegram-notifier.js "✅ Deployment successful!" success
else
    node ~/CSK-INNOVATE-vue/telegram-notifier.js "❌ Deployment failed!" error
fi
```

### In Node.js/JavaScript

```javascript
const TelegramNotifier = require('./telegram-notifier');

async function myTask() {
  const notifier = new TelegramNotifier();
  
  await notifier.notify('🚀 Task started');
  
  try {
    // Your code here
    await doSomething();
    
    await notifier.success('✅ Task completed!');
  } catch (error) {
    await notifier.error(`❌ Error: ${error.message}`);
  }
}
```

---

## 📋 Message Types

| Type | Icon | Usage |
|------|------|-------|
| `info` | 💬 | General information |
| `success` | ✅ | Successful operations |
| `error` | ❌ | Errors and failures |
| `warning` | ⚠️ | Warnings and cautions |
| `progress` | 🔄 | Progress updates |

---

## 🎯 Real-World Examples

### Docker Deployment
```bash
node telegram-notifier.js "🚀 Starting Docker deployment..."
cd ~/CSK-INNOVATE-iot-v2
docker-compose build && docker-compose up -d
node telegram-notifier.js "✅ Services running!" success
```

### Database Backup
```bash
node telegram-notifier.js "💾 Starting database backup..."
docker exec CSK-INNOVATE-timescaledb pg_dump -U CSK-INNOVATE > backup.sql
tar -czf backup-$(date +%Y%m%d).tar.gz backup.sql
node telegram-notifier.js "✅ Backup completed: backup-$(date +%Y%m%d).tar.gz" success
```

### Long Build Process
```bash
node telegram-notifier.js "🔨 Starting frontend build..." progress
cd ~/CSK-INNOVATE-vue
npm run build
node telegram-notifier.js "✅ Frontend build completed!" success
```

---

## 🔧 Files Created

- ✅ `telegram-notifier.js` - Main notification script
- ✅ `setup-telegram.sh` - Interactive setup script
- ✅ `test-telegram.sh` - Test all message types
- ✅ `.env` - Updated with Telegram config section

---

## 🛡️ Security

- ✅ `.env` is in `.gitignore` (credentials won't be committed)
- ✅ Bot tokens and chat IDs are stored locally only
- ✅ Notifications only work when properly configured

---

## ❓ Troubleshooting

### "Telegram not configured" error
Run: `bash setup-telegram.sh` and follow the prompts

### Messages not arriving
1. Check bot token is correct
2. Verify chat ID matches your chat
3. Ensure you've sent at least one message to your bot

### Test connection
```bash
# Simple test
node telegram-notifier.js "Test message" info

# Detailed test
bash test-telegram.sh
```

---

## 📚 Next Steps

1. **Setup your bot**: `bash setup-telegram.sh`
2. **Test it**: `bash test-telegram.sh`
3. **Add to your workflow**: See usage examples above
4. **Enjoy notifications!** 🎉

---

## 📞 Support

For issues or questions:
- Check `.env` file has correct values
- Test with: `node telegram-notifier.js "test"`
- Review Telegram bot permissions with @BotFather

---

**Ready to get notifications? Start with Step 1 above! 🚀**
