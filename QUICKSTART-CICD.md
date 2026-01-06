# 🎯 Quick Start - CI/CD Pipeline

## วิธีเริ่มต้นอย่างง่าย

### ขั้นตอนที่ 1: เตรียมโปรเจค

```bash
# เข้าไปในโฟลเดอร์โปรเจค
cd /home/teddy/csk-innovate

# Run setup script
chmod +x setup-cicd.sh
./setup-cicd.sh
```

### ขั้นตอนที่ 2: Push ไป GitHub

```bash
# สร้าง repository ใหม่บน GitHub ก่อน
# แล้วรันคำสั่งเหล่านี้:

git init
git add .
git commit -m "Initial commit with CI/CD setup"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/csk-innovate.git
git push -u origin main
```

### ขั้นตอนที่ 3: ตั้งค่า GitHub Secrets

1. ไปที่ GitHub repository
2. Settings → Secrets and variables → Actions
3. เพิ่ม secrets ต่อไปนี้:

**สำหรับ Vercel (แนะนำ):**
- `VERCEL_TOKEN` - ได้จาก https://vercel.com/account/tokens
- `VERCEL_ORG_ID` - หลังจากรัน `vercel link`
- `VERCEL_PROJECT_ID` - หลังจากรัน `vercel link`

**สำหรับ VPS (ถ้าต้องการ):**
- `VPS_HOST` - IP หรือ domain ของ VPS
- `VPS_USERNAME` - username สำหรับ SSH
- `VPS_SSH_KEY` - Private SSH key (ทั้งหมด)
- `VPS_PORT` - 22 (default)

### ขั้นตอนที่ 4: ทดสอบ CI/CD

```bash
# สร้าง branch ใหม่
git checkout -b feature/test-ci

# แก้ไขไฟล์ใดๆ
echo "test" >> README.md

# Commit และ push
git add .
git commit -m "test: CI pipeline"
git push origin feature/test-ci

# สร้าง Pull Request บน GitHub
# CI pipeline จะทำงานอัตโนมัติ
```

### ขั้นตอนที่ 5: Deploy

```bash
# Merge PR เข้า main branch
# หรือ push ไป main โดยตรง
git checkout main
git merge feature/test-ci
git push origin main

# CD pipeline จะ deploy อัตโนมัติ
```

---

## 📁 ไฟล์ที่สำคัญ

```
csk-innovate/
├── .github/workflows/
│   ├── ci.yml          # Continuous Integration
│   ├── cd.yml          # Continuous Deployment
│   └── docker.yml      # Docker builds
├── Dockerfile          # Frontend container
├── docker-compose.yml  # Local development
├── docker-compose.prod.yml  # Production
├── CI-CD-GUIDE.md     # Full documentation
└── setup-cicd.sh      # Quick setup script
```

---

## 🔄 Workflow การทำงาน

### Development Flow:
```
Code → Commit → Push → CI Tests → PR Review → Merge → Deploy
```

### CI Pipeline (อัตโนมัติ):
1. ✅ Lint code
2. ✅ Type check
3. ✅ Run tests
4. ✅ Build app
5. ✅ Security audit
6. ✅ Docker build test

### CD Pipeline (อัตโนมัติเมื่อ merge เข้า main):
1. 📦 Build production
2. 🚀 Deploy to Vercel
3. 🖥️ Deploy to VPS (ถ้าเปิดใช้)
4. 🏥 Health check
5. 📢 Notify

---

## 🧪 คำสั่งที่ใช้บ่อย

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build production
npm run lint             # Check code quality
npm run type-check       # Check TypeScript
npm test                 # Run tests

# Docker
npm run docker:build     # Build images
npm run docker:run       # Run containers
npm run docker:stop      # Stop containers
npm run docker:prod      # Production mode

# Format
npm run format           # Format code
npm run format:check     # Check formatting
```

---

## 🚨 แก้ปัญหาเบื้องต้น

### CI ล้มเหลว?
```bash
# Run locally first
npm run lint
npm run type-check
npm test
npm run build
```

### Deployment ล้มเหลว?
- ตรวจสอบ GitHub Secrets ว่าถูกต้อง
- ดู logs ใน GitHub Actions
- ตรวจสอบ Vercel dashboard

### Docker ไม่ทำงาน?
```bash
# Rebuild from scratch
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

---

## 📚 เอกสารเพิ่มเติม

- [CI-CD-GUIDE.md](CI-CD-GUIDE.md) - คู่มือฉบับเต็ม
- [DEPLOYMENT.md](DEPLOYMENT.md) - คู่มือ deployment
- [GitHub Actions Docs](https://docs.github.com/actions)
- [Vercel Docs](https://vercel.com/docs)

---

## ✅ Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Create `.env.local` from `.env.example`
- [ ] Push to GitHub
- [ ] Configure GitHub Secrets
- [ ] Test CI with Pull Request
- [ ] Merge to main and verify deployment
- [ ] Setup custom domain (ถ้าต้องการ)
- [ ] Monitor application

---

**หากมีปัญหา:** อ่าน [CI-CD-GUIDE.md](CI-CD-GUIDE.md) หรือดู GitHub Actions logs
