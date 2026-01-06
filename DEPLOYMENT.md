# 🚀 CSK INNOVATE Deployment Guide

## วิธีการ Deploy ไปยัง https://www.cskinnovate.com/

### Option 1: Deploy ด้วย Vercel (แนะนำ - ง่ายที่สุด)

#### ขั้นตอน:

1. **ติดตั้ง Vercel CLI**
```bash
npm install -g vercel
```

2. **Login เข้า Vercel**
```bash
vercel login
```

3. **Deploy โปรเจค**
```bash
cd /home/teddy/csk-innovate
vercel
```
- เลือก "Yes" เมื่อถามว่าต้องการ setup
- ตั้งชื่อโปรเจคเป็น `csk-innovate`

4. **Deploy Production พร้อม Custom Domain**
```bash
vercel --prod
```

5. **เพิ่ม Custom Domain**
```bash
vercel domains add www.cskinnovate.com
vercel domains add cskinnovate.com
```

6. **ตั้งค่า DNS Records** (ที่ Domain Registrar)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21
```

---

### Option 2: Deploy ด้วย Node.js Server

#### ขั้นตอน:

1. **อัพโหลดโปรเจคไปยัง Server**
```bash
# ใช้ rsync หรือ scp
rsync -avz /home/teddy/csk-innovate/ user@server:/var/www/cskinnovate/
```

2. **บน Server ติดตั้ง Dependencies**
```bash
cd /var/www/cskinnovate
npm install --production
npm run build
```

3. **เริ่ม Server ด้วย PM2**
```bash
npm install -g pm2
pm2 start npm --name "csk-innovate" -- start
pm2 save
pm2 startup
```

4. **ตั้งค่า Nginx Reverse Proxy**
```nginx
server {
    listen 80;
    server_name cskinnovate.com www.cskinnovate.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. **ติดตั้ง SSL Certificate**
```bash
sudo certbot --nginx -d cskinnovate.com -d www.cskinnovate.com
```

---

### Option 3: Deploy Static Export

#### ขั้นตอน:

1. **แก้ไข next.config.mjs**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
```

2. **Build Static Files**
```bash
npm run build
```

3. **อัพโหลด `out/` folder ไปยัง Web Server**
```bash
# ไปยัง Apache/Nginx document root
rsync -avz out/ user@server:/var/www/html/
```

4. **ตั้งค่า Web Server** (Nginx example)
```nginx
server {
    listen 80;
    server_name cskinnovate.com www.cskinnovate.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🔧 Quick Deploy Commands

### สำหรับ Deploy ครั้งแรก
```bash
cd /home/teddy/csk-innovate
npm install -g vercel
vercel login
vercel --prod
```

### สำหรับ Update ครั้งถัดไป
```bash
cd /home/teddy/csk-innovate
npm run build
vercel --prod
```

---

## ✅ Checklist หลัง Deploy

- [ ] เว็บไซต์เปิดได้ที่ https://www.cskinnovate.com
- [ ] SSL Certificate ใช้งานได้ (แสดง 🔒 ใน browser)
- [ ] Mobile responsive ทำงานได้ปกติ
- [ ] ทุก section แสดงผลถูกต้อง
- [ ] Logo แสดงผลถูกต้อง
- [ ] Form contact ส่งข้อมูลได้

---

## 🆘 Troubleshooting

### หากมีปัญหา:
1. ตรวจสอบ build logs: `vercel logs`
2. ตรวจสอบ DNS propagation: `nslookup cskinnovate.com`
3. Clear browser cache: Ctrl+Shift+R
4. ตรวจสอบ SSL: https://www.ssllabs.com/ssltest/

---

## 📞 Support

หากต้องการความช่วยเหลือเพิ่มเติม:
- Vercel Documentation: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
