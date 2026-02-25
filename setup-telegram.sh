#!/bin/bash

# Telegram Notifier Setup Script for CSK-INNOVATE Vue
# This script helps you configure Telegram notifications

echo "📱 Telegram Notifier Setup for CSK-INNOVATE Vue"
echo "=========================================="
echo ""

# Check if axios is installed
if ! grep -q "axios" package.json; then
    echo "📦 Installing axios..."
    npm install axios
else
    echo "✅ axios is already installed"
fi

echo ""
echo "🤖 Setting up Telegram Bot"
echo ""
echo "Follow these steps:"
echo ""
echo "1. Open Telegram and search for: @BotFather"
echo "2. Send command: /newbot"
echo "3. Follow the prompts to create your bot"
echo "4. Copy the bot TOKEN you receive"
echo ""
read -p "Enter your Bot TOKEN: " BOT_TOKEN

echo ""
echo "5. Start a chat with your bot (search for your bot's username)"
echo "6. Send any message to your bot"
echo "7. Visit this URL in your browser (replace <TOKEN> with your token):"
echo "   https://api.telegram.org/bot${BOT_TOKEN}/getUpdates"
echo "8. Look for \"chat\":{\"id\":123456789} and copy the ID"
echo ""
read -p "Enter your Chat ID: " CHAT_ID

# Update .env file
ENV_FILE=".env"

# Remove old Telegram settings if they exist
sed -i '/^TELEGRAM_BOT_TOKEN=/d' "$ENV_FILE" 2>/dev/null
sed -i '/^TELEGRAM_CHAT_ID=/d' "$ENV_FILE" 2>/dev/null

# Check if Telegram section exists
if ! grep -q "# Telegram Notifications" "$ENV_FILE"; then
    echo "" >> "$ENV_FILE"
    echo "# Telegram Notifications" >> "$ENV_FILE"
fi

# Add new settings
echo "TELEGRAM_BOT_TOKEN=$BOT_TOKEN" >> "$ENV_FILE"
echo "TELEGRAM_CHAT_ID=$CHAT_ID" >> "$ENV_FILE"

echo ""
echo "✅ Configuration saved to .env"
echo ""
echo "🧪 Testing notification..."
echo ""

# Test the notifier
node telegram-notifier.js "🎉 Telegram Notifier setup completed successfully!" success

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Setup completed successfully!"
    echo ""
    echo "📋 Usage examples:"
    echo ""
    echo "  # Send info message"
    echo "  node telegram-notifier.js \"Your message here\""
    echo ""
    echo "  # Send success message"
    echo "  node telegram-notifier.js \"Task completed!\" success"
    echo ""
    echo "  # Send error message"
    echo "  node telegram-notifier.js \"Something went wrong\" error"
    echo ""
else
    echo ""
    echo "❌ Test failed. Please check your bot token and chat ID."
    echo ""
fi
