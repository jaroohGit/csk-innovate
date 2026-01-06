# Node.js API Dockerfile
FROM node:20-alpine

# Install dependencies for building native modules
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    postgresql-client

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "server.js"]
