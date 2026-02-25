#!/bin/bash
# Deployment script for CSK-INNOVATE Vue Dashboard
# This script builds and deploys the frontend container with the backend services

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/home/teddy/CSK-INNOVATE-vue"
BACKEND_DIR="/home/teddy/CSK-INNOVATE-iot-v2"
CONTAINER_NAME="CSK-INNOVATE-vue-app"
IMAGE_NAME="CSK-INNOVATE-vue-frontend"
NETWORK_NAME="CSK-INNOVATE-net"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}CSK-INNOVATE Vue Dashboard Deployment${NC}"
echo -e "${BLUE}========================================${NC}"

# Check if backend services are running
echo -e "\n${YELLOW}[1/8] Checking backend services...${NC}"
cd "$BACKEND_DIR"
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✓ Backend services are running${NC}"
    docker-compose ps | grep "Up" | awk '{print "  - " $1}'
else
    echo -e "${RED}✗ Backend services are not running!${NC}"
    echo -e "${YELLOW}Starting backend services...${NC}"
    docker-compose up -d
    sleep 10
fi

# Check if Docker network exists
echo -e "\n${YELLOW}[2/8] Checking Docker network...${NC}"
if docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
    echo -e "${GREEN}✓ Network '$NETWORK_NAME' exists${NC}"
else
    echo -e "${YELLOW}Creating Docker network '$NETWORK_NAME'...${NC}"
    docker network create "$NETWORK_NAME"
    echo -e "${GREEN}✓ Network created${NC}"
fi

# Navigate to project directory
cd "$PROJECT_DIR"

# Stop and remove existing container
echo -e "\n${YELLOW}[3/8] Stopping existing container...${NC}"
if docker ps -a | grep -q "$CONTAINER_NAME"; then
    docker stop "$CONTAINER_NAME" || true
    docker rm "$CONTAINER_NAME" || true
    echo -e "${GREEN}✓ Existing container removed${NC}"
else
    echo -e "${GREEN}✓ No existing container found${NC}"
fi

# Remove old image to force fresh build
echo -e "\n${YELLOW}[4/8] Cleaning old images...${NC}"
docker images | grep "$IMAGE_NAME" | awk '{print $3}' | xargs -r docker rmi -f || true
echo -e "${GREEN}✓ Old images cleaned${NC}"

# Build Docker image
echo -e "\n${YELLOW}[5/8] Building Docker image...${NC}"
docker-compose build --no-cache
echo -e "${GREEN}✓ Docker image built successfully${NC}"

# Start container
echo -e "\n${YELLOW}[6/8] Starting container...${NC}"
docker-compose up -d
echo -e "${GREEN}✓ Container started${NC}"

# Wait for container to be healthy
echo -e "\n${YELLOW}[7/8] Waiting for health check...${NC}"
TIMEOUT=60
ELAPSED=0
while [ $ELAPSED -lt $TIMEOUT ]; do
    if docker inspect --format='{{.State.Health.Status}}' "$CONTAINER_NAME" 2>/dev/null | grep -q "healthy"; then
        echo -e "${GREEN}✓ Container is healthy${NC}"
        break
    fi
    echo -n "."
    sleep 2
    ELAPSED=$((ELAPSED + 2))
done

if [ $ELAPSED -ge $TIMEOUT ]; then
    echo -e "\n${RED}✗ Container health check timeout${NC}"
    echo -e "${YELLOW}Checking logs:${NC}"
    docker logs --tail 50 "$CONTAINER_NAME"
    exit 1
fi

# Restart Caddy to pick up new backend
echo -e "\n${YELLOW}[8/8] Restarting Caddy proxy...${NC}"
cd "$BACKEND_DIR"
docker-compose restart caddy
sleep 3
echo -e "${GREEN}✓ Caddy restarted${NC}"

# Show deployment status
echo -e "\n${BLUE}========================================${NC}"
echo -e "${GREEN}✓ Deployment successful!${NC}"
echo -e "${BLUE}========================================${NC}"

echo -e "\n${YELLOW}Container Status:${NC}"
docker ps --filter "name=$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo -e "\n${YELLOW}Test URLs:${NC}"
echo -e "  ${BLUE}Local:${NC}      http://localhost:8081"
echo -e "  ${BLUE}Production:${NC} https://www.CSK-INNOVATEbiogas.com"

echo -e "\n${YELLOW}Quick Commands:${NC}"
echo -e "  ${BLUE}View logs:${NC}   docker logs -f $CONTAINER_NAME"
echo -e "  ${BLUE}Stop:${NC}        docker stop $CONTAINER_NAME"
echo -e "  ${BLUE}Restart:${NC}     docker restart $CONTAINER_NAME"
echo -e "  ${BLUE}Shell:${NC}       docker exec -it $CONTAINER_NAME sh"

echo -e "\n${YELLOW}Testing connection...${NC}"
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8081 | grep -q "200"; then
    echo -e "${GREEN}✓ Local access working (http://localhost:8081)${NC}"
else
    echo -e "${RED}✗ Local access failed${NC}"
fi

echo -e "\n${GREEN}Deployment complete! 🚀${NC}\n"
