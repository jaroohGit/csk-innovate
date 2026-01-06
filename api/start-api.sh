#!/bin/bash

echo "Starting CSK Chat API..."

# Kill existing
pkill -f "chat-simple.js"
sleep 1

# Start API
cd /home/teddy/csk-innovate/api
nohup node chat-simple.js > /home/teddy/logs/chat-api.log 2>&1 &

sleep 2

# Test
echo "Testing API..."
curl -s http://localhost:3010/api/health

echo ""
echo "✅ Chat API started!"
echo "📋 Logs: tail -f /home/teddy/logs/chat-api.log"
