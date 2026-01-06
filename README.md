# CSK INNOVATE - Industrial IoT & AI Solutions

> Modern web platform for industrial IoT and AI solutions with full CI/CD pipeline

[![CI Pipeline](https://github.com/YOUR-USERNAME/csk-innovate/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR-USERNAME/csk-innovate/actions/workflows/ci.yml)
[![CD Pipeline](https://github.com/YOUR-USERNAME/csk-innovate/actions/workflows/cd.yml/badge.svg)](https://github.com/YOUR-USERNAME/csk-innovate/actions/workflows/cd.yml)

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/YOUR-USERNAME/csk-innovate.git
cd csk-innovate

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📋 Features

- ✅ **Next.js 14** - React framework with App Router
- ✅ **TypeScript** - Type-safe development
- ✅ **Tailwind CSS** - Utility-first CSS framework
- ✅ **CI/CD Pipeline** - Automated testing and deployment
- ✅ **Docker Support** - Containerized deployment
- ✅ **API Backend** - Node.js/Express API with PostgreSQL
- ✅ **Responsive Design** - Mobile-first approach

## 🛠️ Tech Stack

### Frontend
- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS

### Backend
- Node.js & Express
- PostgreSQL
- Docker

### DevOps
- GitHub Actions (CI/CD)
- Docker & Docker Compose
- Vercel / VPS deployment

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint code
npm run type-check   # TypeScript check
npm test             # Run tests
npm run format       # Format code with Prettier

# Docker commands
npm run docker:build  # Build Docker images
npm run docker:run    # Run containers
npm run docker:stop   # Stop containers
npm run docker:prod   # Production mode
```

## 🚀 CI/CD Pipeline

This project includes a complete CI/CD setup with GitHub Actions:

### CI Pipeline
- ✅ Code linting & formatting
- ✅ TypeScript type checking
- ✅ Unit tests with coverage
- ✅ Build verification
- ✅ Security audits
- ✅ Docker build tests

### CD Pipeline
- 🚀 Automated deployment to Vercel
- 🖥️ VPS deployment via SSH
- 🔌 API backend deployment
- 🏥 Health checks

**Quick Setup:** See [QUICKSTART-CICD.md](QUICKSTART-CICD.md)

**Full Documentation:** See [CI-CD-GUIDE.md](CI-CD-GUIDE.md)

## 📦 Project Structure

```
csk-innovate/
├── .github/workflows/    # CI/CD pipelines
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── fonts/           # Custom fonts
│   └── globals.css      # Global styles
├── components/          # React components
├── hooks/               # Custom React hooks
├── public/              # Static assets
├── api/                 # Backend API
│   ├── server.js        # API server
│   ├── db-connector.js  # Database connection
│   └── Dockerfile       # API container
├── nginx/               # Nginx configuration
├── Dockerfile           # Frontend container
├── docker-compose.yml   # Docker orchestration
└── CI-CD-GUIDE.md      # CI/CD documentation
```

## 🐳 Docker Deployment

### Local Development
```bash
docker-compose up -d
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Check Status
```bash
docker-compose ps
docker-compose logs -f
```

## 📚 Documentation

- [CI/CD Setup Guide](CI-CD-GUIDE.md) - Complete CI/CD documentation
- [Quick Start Guide](QUICKSTART-CICD.md) - Quick setup in 5 minutes
- [Deployment Guide](DEPLOYMENT.md) - Deployment options

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

- 📖 [Documentation](CI-CD-GUIDE.md)
- 🐛 [Issue Tracker](https://github.com/YOUR-USERNAME/csk-innovate/issues)

---

**CSK INNOVATE** - Industrial IoT & AI Solutions

