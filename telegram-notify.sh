#!/bin/bash
# Wrapper script to use OpenClaw Telegram notifier
# Usage: bash telegram-notify.sh "message" [type]

MESSAGE="$1"
TYPE="${2:-info}"

if [ -z "$MESSAGE" ]; then
  echo "Usage: bash telegram-notify.sh \"message\" [type]"
  echo "Types: info, success, error, warning, progress"
  exit 1
fi

# Use OpenClaw telegram-notifier
cd ~/openclaw-webdev && node telegram-notifier.js "$MESSAGE" "$TYPE"
