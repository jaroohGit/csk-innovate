#!/bin/bash

# Test Telegram Notifier
# This script tests all notification types

echo "🧪 Testing Telegram Notifier for CSK-INNOVATE Vue"
echo "============================================"
echo ""

cd "$(dirname "$0")"

# Check if configured
if ! grep -q "TELEGRAM_BOT_TOKEN=." .env || ! grep -q "TELEGRAM_CHAT_ID=." .env; then
    echo "❌ Telegram not configured!"
    echo ""
    echo "Run this first:"
    echo "  bash setup-telegram.sh"
    echo ""
    exit 1
fi

echo "📨 Sending test messages..."
echo ""

# Test info
echo "1️⃣  Testing INFO message..."
node telegram-notifier.js "ℹ️  This is an information message" info
sleep 2

# Test success
echo "2️⃣  Testing SUCCESS message..."
node telegram-notifier.js "✅ This is a success message" success
sleep 2

# Test error
echo "3️⃣  Testing ERROR message..."
node telegram-notifier.js "❌ This is an error message" error
sleep 2

# Test warning
echo "4️⃣  Testing WARNING message..."
node telegram-notifier.js "⚠️  This is a warning message" warning
sleep 2

# Test progress
echo "5️⃣  Testing PROGRESS message..."
node telegram-notifier.js "🔄 This is a progress message (50% complete)" progress
sleep 2

echo ""
echo "✅ All test messages sent!"
echo ""
echo "Check your Telegram to see the results."
