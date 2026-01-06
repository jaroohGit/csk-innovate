#!/bin/bash

# CSK INNOVATE Deployment Script
# This script deploys the Next.js app to /var/www/html

set -e  # Exit on error

echo "🚀 Starting deployment process..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

PROJECT_DIR="/home/teddy/csk-innovate"
WEB_ROOT="/var/www/html"
BACKUP_DIR="/home/teddy/backups/csk-$(date +%Y%m%d_%H%M%S)"

cd $PROJECT_DIR

# 1. Create backup
echo -e "${YELLOW}📦 Creating backup of current site...${NC}"
sudo mkdir -p $(dirname $BACKUP_DIR)
sudo cp -r $WEB_ROOT $BACKUP_DIR
echo -e "${GREEN}✓ Backup created at: $BACKUP_DIR${NC}"

# 2. Build the project
echo -e "${YELLOW}🔨 Building Next.js project...${NC}"
npm run build
echo -e "${GREEN}✓ Build completed${NC}"

# 3. Stop any running PM2 process
echo -e "${YELLOW}🛑 Stopping existing processes...${NC}"
pm2 stop csk-innovate 2>/dev/null || echo "No existing process to stop"
pm2 delete csk-innovate 2>/dev/null || echo "No existing process to delete"

# 4. Copy files to web root
echo -e "${YELLOW}📁 Copying files to web root...${NC}"
sudo rsync -av --delete \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.next/cache' \
  $PROJECT_DIR/.next/ $WEB_ROOT/.next/
sudo rsync -av $PROJECT_DIR/public/ $WEB_ROOT/public/
sudo cp $PROJECT_DIR/package*.json $WEB_ROOT/
sudo cp $PROJECT_DIR/next.config.mjs $WEB_ROOT/

echo -e "${GREEN}✓ Files copied${NC}"

# 5. Install dependencies in web root
echo -e "${YELLOW}📦 Installing production dependencies...${NC}"
cd $WEB_ROOT
sudo npm install --production --no-optional
echo -e "${GREEN}✓ Dependencies installed${NC}"

# 6. Set correct permissions
echo -e "${YELLOW}🔐 Setting permissions...${NC}"
sudo chown -R www-data:www-data $WEB_ROOT
sudo chmod -R 755 $WEB_ROOT
echo -e "${GREEN}✓ Permissions set${NC}"

# 7. Start with PM2
echo -e "${YELLOW}▶️  Starting application with PM2...${NC}"
cd $WEB_ROOT
sudo pm2 start npm --name "csk-innovate" -- start
sudo pm2 save
echo -e "${GREEN}✓ Application started${NC}"

# 8. Setup PM2 startup
echo -e "${YELLOW}⚙️  Configuring PM2 startup...${NC}"
sudo pm2 startup systemd -u www-data --hp /var/www
echo -e "${GREEN}✓ PM2 startup configured${NC}"

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "🌐 Website: ${GREEN}https://www.cskinnovate.com${NC}"
echo -e "📊 PM2 Status: ${YELLOW}pm2 status${NC}"
echo -e "📝 PM2 Logs: ${YELLOW}pm2 logs csk-innovate${NC}"
echo -e "🔄 Restart: ${YELLOW}pm2 restart csk-innovate${NC}"
echo ""
echo -e "💾 Backup location: ${YELLOW}$BACKUP_DIR${NC}"
echo ""
