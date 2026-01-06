#!/bin/bash

# 🚀 CI/CD Quick Setup Script
# This script helps you configure the CI/CD pipeline quickly

set -e

echo "🚀 CSK INNOVATE - CI/CD Setup"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo -e "${YELLOW}Step 1: Checking prerequisites...${NC}"

# Check Node.js
if command_exists node; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓ Node.js ${NODE_VERSION} installed${NC}"
else
    echo -e "${RED}✗ Node.js not found. Please install Node.js 20 or later.${NC}"
    exit 1
fi

# Check npm
if command_exists npm; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓ npm ${NPM_VERSION} installed${NC}"
else
    echo -e "${RED}✗ npm not found.${NC}"
    exit 1
fi

# Check git
if command_exists git; then
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✓ ${GIT_VERSION}${NC}"
else
    echo -e "${RED}✗ git not found. Please install git.${NC}"
    exit 1
fi

# Check Docker (optional)
if command_exists docker; then
    DOCKER_VERSION=$(docker --version)
    echo -e "${GREEN}✓ ${DOCKER_VERSION}${NC}"
else
    echo -e "${YELLOW}⚠ Docker not found (optional for local testing)${NC}"
fi

echo ""
echo -e "${YELLOW}Step 2: Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"

echo ""
echo -e "${YELLOW}Step 3: Setting up environment files...${NC}"

if [ ! -f ".env.local" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        echo -e "${GREEN}✓ Created .env.local from .env.example${NC}"
        echo -e "${YELLOW}⚠ Please edit .env.local with your actual values${NC}"
    else
        echo -e "${YELLOW}⚠ .env.example not found${NC}"
    fi
else
    echo -e "${GREEN}✓ .env.local already exists${NC}"
fi

echo ""
echo -e "${YELLOW}Step 4: Running tests...${NC}"
npm run type-check || echo -e "${YELLOW}⚠ TypeScript errors found${NC}"
npm run lint || echo -e "${YELLOW}⚠ ESLint errors found${NC}"
echo -e "${GREEN}✓ Initial checks completed${NC}"

echo ""
echo -e "${YELLOW}Step 5: Building application...${NC}"
npm run build
echo -e "${GREEN}✓ Build successful${NC}"

echo ""
echo "================================"
echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Configure GitHub repository:"
echo "   git init (if not done)"
echo "   git remote add origin YOUR_REPO_URL"
echo "   git add ."
echo "   git commit -m \"Initial commit with CI/CD\""
echo "   git push -u origin main"
echo ""
echo "2. Configure GitHub Secrets (in repository settings):"
echo "   - VERCEL_TOKEN"
echo "   - VERCEL_ORG_ID"
echo "   - VERCEL_PROJECT_ID"
echo "   - VPS_HOST (optional)"
echo "   - VPS_USERNAME (optional)"
echo "   - VPS_SSH_KEY (optional)"
echo ""
echo "3. Read the full guide:"
echo "   cat CI-CD-GUIDE.md"
echo ""
echo "4. Test locally:"
echo "   npm run dev          # Development server"
echo "   npm run docker:run   # Docker local test"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
