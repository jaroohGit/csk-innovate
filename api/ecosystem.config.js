module.exports = {
  apps: [{
    name: 'csk-chat-api',
    script: './chat.js',
    cwd: '/home/teddy/csk-innovate/api',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3010
    },
    error_file: '/home/teddy/logs/chat-api-error.log',
    out_file: '/home/teddy/logs/chat-api-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
