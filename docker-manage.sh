#!/bin/bash
# CSK Innovate Docker Management Script

case "$1" in
  start)
    echo "🚀 Starting CSK Innovate with Docker..."
    cd /home/teddy/csk-innovate
    docker-compose -f docker-compose.prod.yml up -d
    echo "✅ Services started!"
    docker-compose -f docker-compose.prod.yml ps
    ;;
  
  stop)
    echo "🛑 Stopping CSK Innovate..."
    cd /home/teddy/csk-innovate
    docker-compose -f docker-compose.prod.yml down
    echo "✅ Services stopped!"
    ;;
  
  restart)
    echo "🔄 Restarting CSK Innovate..."
    cd /home/teddy/csk-innovate
    docker-compose -f docker-compose.prod.yml restart
    echo "✅ Services restarted!"
    ;;
  
  logs)
    echo "📋 Showing logs..."
    cd /home/teddy/csk-innovate
    docker-compose -f docker-compose.prod.yml logs -f --tail=50
    ;;
  
  status)
    echo "📊 CSK Innovate Status:"
    cd /home/teddy/csk-innovate
    docker-compose -f docker-compose.prod.yml ps
    ;;
  
  rebuild)
    echo "🔨 Rebuilding images..."
    cd /home/teddy/csk-innovate
    docker build -t csk-innovate-web:latest .
    cd api
    docker build -t csk-innovate-api:latest .
    echo "✅ Images rebuilt!"
    ;;
  
  *)
    echo "CSK Innovate Docker Manager"
    echo ""
    echo "Usage: $0 {start|stop|restart|logs|status|rebuild}"
    echo ""
    echo "Commands:"
    echo "  start   - Start all services"
    echo "  stop    - Stop all services"
    echo "  restart - Restart all services"
    echo "  logs    - Show logs (follow mode)"
    echo "  status  - Show service status"
    echo "  rebuild - Rebuild Docker images"
    exit 1
    ;;
esac

exit 0
