# 🚀 CI/CD Setup Guide

## 📋 Overview

โปรเจค CSK INNOVATE ได้ติดตั้งระบบ CI/CD ที่สมบูรณ์แบบด้วย GitHub Actions และ Docker

### 🛠️ Components

1. **CI Pipeline** - Continuous Integration
   - Code linting & formatting
   - TypeScript type checking
   - Unit tests with Jest
   - Build verification
   - Security audits
   - Docker image builds
   - Performance testing with Lighthouse

2. **CD Pipeline** - Continuous Deployment
   - Automated deployment to Vercel
   - VPS deployment via SSH
   - API backend deployment
   - Health checks
   - Notifications

3. **Docker Support**
   - Multi-stage production builds
   - Container orchestration with Docker Compose
   - Image publishing to GitHub Container Registry

---

## 🔧 Initial Setup

### 1. GitHub Repository Setup

```bash
# Initialize git if not already done
cd /home/teddy/csk-innovate
git init
git add .
git commit -m "Initial commit with CI/CD setup"

# Add remote and push
git remote add origin https://github.com/YOUR-USERNAME/csk-innovate.git
git branch -M main
git push -u origin main
```

### 2. GitHub Secrets Configuration

ไปที่ **Settings** → **Secrets and variables** → **Actions** และเพิ่ม secrets ต่อไปนี้:

#### For Vercel Deployment:
```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_org_id_here
VERCEL_PROJECT_ID=your_project_id_here
```

ดูวิธีการหา token:
```bash
# Install Vercel CLI
npm install -g vercel

# Login and get token
vercel login
vercel link  # เชื่อมโยงโปรเจค
```

#### For VPS Deployment:
```
VPS_HOST=your_server_ip_or_domain
VPS_USERNAME=your_ssh_username
VPS_SSH_KEY=your_private_ssh_key_content
VPS_PORT=22
```

ดูวิธีการสร้าง SSH Key:
```bash
# Generate SSH key pair
ssh-keygen -t ed25519 -C "github-actions"

# Copy public key to VPS
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@your-vps-ip

# แสดง private key (นำไปใส่ใน GitHub Secrets)
cat ~/.ssh/id_ed25519
```

#### For Database (if needed):
```
DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=csk_db
DB_USER=postgres
DB_PASSWORD=your_secure_password
```

---

## 🚦 CI/CD Workflows

### 1. CI Pipeline (`.github/workflows/ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

**Jobs:**
- ✅ Linting และ TypeScript checking
- ✅ Unit tests with coverage
- ✅ Build verification
- ✅ API backend tests
- ✅ Security audit
- ✅ Docker build test
- ✅ Lighthouse performance test

**Example:**
```bash
# จะทำงานอัตโนมัติเมื่อ push หรือ pull request
git push origin main
```

### 2. CD Pipeline (`.github/workflows/cd.yml`)

**Triggers:**
- Push to `main` branch
- Git tags (e.g., `v1.0.0`)
- Manual dispatch

**Jobs:**
- 📦 Build production package
- 🚀 Deploy to Vercel
- 🖥️ Deploy to VPS
- 🔌 Deploy API backend
- 🏥 Health checks
- 📢 Notifications

**Manual Deployment:**
```bash
# ไปที่ GitHub Actions → CD Pipeline → Run workflow
# เลือก environment: production หรือ staging
```

### 3. Docker Pipeline (`.github/workflows/docker.yml`)

**Triggers:**
- Push to `main` branch
- Git tags
- Releases

**Jobs:**
- 🐳 Build Docker images (frontend & API)
- 📤 Push to GitHub Container Registry

---

## 🐳 Docker Usage

### Local Development

```bash
# Build และ run ทั้งหมด
npm run docker:run

# หรือใช้ docker-compose โดยตรง
docker-compose up -d

# ดู logs
docker-compose logs -f

# Stop services
npm run docker:stop
```

### Production Deployment

```bash
# ใช้ production configuration
npm run docker:prod

# หรือ
docker-compose -f docker-compose.prod.yml up -d
```

### Build Images Manually

```bash
# Build frontend
docker build -t csk-innovate-frontend:latest .

# Build API
docker build -t csk-innovate-api:latest ./api

# Tag และ push to registry
docker tag csk-innovate-frontend:latest ghcr.io/YOUR-USERNAME/csk-innovate-frontend:latest
docker push ghcr.io/YOUR-USERNAME/csk-innovate-frontend:latest
```

---

## 🧪 Testing

### Run Tests Locally

```bash
# Unit tests
npm test

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

### Create Tests

สร้างไฟล์ test ใน `__tests__/` หรือติดท้าย `.test.tsx`:

```typescript
// components/__tests__/Hero.test.tsx
import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero Component', () => {
  it('renders hero title', () => {
    render(<Hero />);
    expect(screen.getByText(/CSK INNOVATE/i)).toBeInTheDocument();
  });
});
```

---

## 📊 Monitoring & Logs

### GitHub Actions Logs

ดู logs ที่: `https://github.com/YOUR-USERNAME/csk-innovate/actions`

### Docker Logs

```bash
# ดู logs ของ service ที่ระบุ
docker-compose logs -f frontend
docker-compose logs -f api

# ดู logs ทั้งหมด
docker-compose logs -f

# ดู logs แบบ real-time
docker logs -f csk-frontend
```

### Production Logs (VPS)

```bash
# SSH เข้า VPS
ssh user@your-vps-ip

# PM2 logs
pm2 logs csk-innovate
pm2 logs csk-api

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 🔄 Deployment Strategies

### 1. Vercel Deployment (Recommended)

**Pros:**
- ✅ Zero configuration
- ✅ Automatic SSL
- ✅ Global CDN
- ✅ Preview deployments for PRs
- ✅ Automatic rollbacks

**How it works:**
- Push to `main` → Automatic deployment
- Pull request → Preview deployment
- Tagged release → Production deployment

### 2. VPS Deployment

**Pros:**
- ✅ Full control
- ✅ Custom infrastructure
- ✅ No vendor lock-in

**Process:**
1. GitHub Actions builds the app
2. Packages as tar.gz
3. SCP to VPS
4. Extract and deploy
5. PM2 manages process
6. Nginx as reverse proxy

### 3. Docker Deployment

**Pros:**
- ✅ Consistent environments
- ✅ Easy scaling
- ✅ Version control
- ✅ Quick rollbacks

**Process:**
1. Build Docker images
2. Push to registry
3. Pull on production
4. Deploy with docker-compose

---

## 🛡️ Security Best Practices

1. **Secrets Management**
   - ❌ Never commit `.env` files
   - ✅ Use GitHub Secrets for sensitive data
   - ✅ Use `.env.example` as template

2. **SSH Keys**
   - ✅ Use dedicated keys for CI/CD
   - ✅ Rotate keys regularly
   - ✅ Use ED25519 keys (more secure)

3. **Docker Images**
   - ✅ Use multi-stage builds
   - ✅ Run as non-root user
   - ✅ Scan for vulnerabilities

4. **Dependencies**
   - ✅ Run `npm audit` regularly
   - ✅ Update dependencies
   - ✅ Use lock files

---

## 🚨 Troubleshooting

### CI Pipeline ล้มเหลว

```bash
# 1. Check logs in GitHub Actions
# 2. Run locally
npm run lint
npm run type-check
npm test
npm run build

# 3. Fix issues and push again
git add .
git commit -m "fix: resolve CI issues"
git push
```

### Deployment ล้มเหลว

```bash
# 1. Check GitHub Secrets are set correctly
# 2. Verify VPS connectivity
ssh user@your-vps-ip

# 3. Check disk space on VPS
df -h

# 4. Check PM2 status
pm2 status
pm2 logs

# 5. Restart services
pm2 restart all
```

### Docker Issues

```bash
# Remove all containers and rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d

# Check container logs
docker-compose logs -f

# Prune unused resources
docker system prune -a
```

---

## 📈 Performance Optimization

### 1. Next.js Optimization

```javascript
// next.config.mjs
const nextConfig = {
  output: 'standalone', // For Docker
  compress: true,
  poweredByHeader: false,
  images: {
    domains: ['your-cdn.com'],
    formats: ['image/webp', 'image/avif'],
  },
};
```

### 2. Docker Build Optimization

- ✅ Multi-stage builds
- ✅ Layer caching
- ✅ Minimal base images (Alpine)
- ✅ .dockerignore file

### 3. Caching Strategy

- ✅ GitHub Actions cache
- ✅ Docker layer cache
- ✅ NPM dependency cache
- ✅ Next.js build cache

---

## 📝 Versioning

### Semantic Versioning

```bash
# Create a new release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# This triggers:
# - Full CI pipeline
# - Production deployment
# - Docker image build with version tag
```

### Version Format
- `v1.0.0` - Major release
- `v1.1.0` - Minor release (new features)
- `v1.1.1` - Patch release (bug fixes)

---

## 🎯 Next Steps

1. ✅ Push code to GitHub
2. ✅ Configure GitHub Secrets
3. ✅ Test CI pipeline with a pull request
4. ✅ Deploy to Vercel or VPS
5. ✅ Setup custom domain
6. ✅ Configure monitoring
7. ✅ Setup backup strategy

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment](https://vercel.com/docs)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## 🆘 Support

หากมีปัญหา:
1. ตรวจสอบ logs ใน GitHub Actions
2. ดู documentation นี้
3. ตรวจสอบ GitHub Issues
4. ติดต่อทีมพัฒนา

---

**Version:** 1.0.0
**Last Updated:** January 6, 2026
