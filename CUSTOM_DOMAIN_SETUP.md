# Custom Domain Setup - www.cskinnovate.com

## DNS Configuration Required

เพื่อให้เว็บไซต์ใช้งานผ่าน https://www.cskinnovate.com คุณต้องตั้งค่า DNS records ที่ domain registrar ของคุณ:

### Option 1: CNAME Record (Recommended for www subdomain)

```
Type: CNAME
Host: www
Value: jaroohgit.github.io
TTL: 3600 (or Auto)
```

### Option 2: Apex Domain (cskinnovate.com)

ถ้าต้องการให้ใช้งานทั้ง `cskinnovate.com` และ `www.cskinnovate.com`:

```
Type: A
Host: @
Value: 185.199.108.153
TTL: 3600

Type: A
Host: @
Value: 185.199.109.153
TTL: 3600

Type: A
Host: @
Value: 185.199.110.153
TTL: 3600

Type: A
Host: @
Value: 185.199.111.153
TTL: 3600

Type: CNAME
Host: www
Value: jaroohgit.github.io
TTL: 3600
```

## GitHub Settings

1. ไปที่ Repository Settings → Pages
2. ใน "Custom domain" ใส่: `www.cskinnovate.com`
3. เลือก "Enforce HTTPS" (จะเปิดได้หลัง DNS propagate)
4. Save

## Verification Steps

1. **Check DNS Propagation** (รอ 5-60 นาที หลังตั้งค่า DNS):
   ```bash
   dig www.cskinnovate.com +short
   # ควรได้ jaroohgit.github.io
   ```

2. **Check HTTPS Certificate**:
   - GitHub จะสร้าง SSL certificate อัตโนมัติผ่าน Let's Encrypt
   - รอประมาณ 5-15 นาทีหลังเปิด "Enforce HTTPS"

3. **Test Site**:
   ```bash
   curl -I https://www.cskinnovate.com
   # HTTP/2 200 OK
   ```

## Timeline

- DNS Propagation: 5 minutes - 48 hours (usually within 1 hour)
- SSL Certificate: 5-15 minutes after DNS is active
- Full deployment: Usually complete within 1-2 hours

## Troubleshooting

### CNAME already taken
ถ้าเจอ error "CNAME already taken":
- ตรวจสอบว่าไม่มี repository อื่นใช้ domain นี้
- ลบ CNAME ออกจาก repository เก่า

### DNS not resolving
```bash
# ตรวจสอบ DNS
nslookup www.cskinnovate.com
dig www.cskinnovate.com

# ตรวจสอบว่าชี้ไปที่ GitHub Pages หรือไม่
dig www.cskinnovate.com CNAME +short
```

### HTTPS not working
- รอให้ DNS propagate เสร็จก่อน
- ตรวจสอบว่าเปิด "Enforce HTTPS" ใน GitHub Pages settings
- รอ SSL certificate generation (5-15 นาที)

## Files Modified

- ✅ `public/CNAME` - Custom domain configuration
- ✅ `next.config.mjs` - Base path configuration
- ✅ `.github/workflows/deploy-pages.yml` - Ensure CNAME in build output

## Current Status

- ✅ CNAME file created
- ✅ Build configuration updated
- ✅ Deployment workflow updated
- ⏳ DNS configuration (requires action at domain registrar)
- ⏳ GitHub Pages custom domain setup

## Next Steps

1. **Configure DNS** at your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
2. **Wait for DNS propagation** (5-60 minutes)
3. **Configure GitHub Pages**:
   - Go to: https://github.com/jaroohGit/csk-innovate/settings/pages
   - Enter custom domain: `www.cskinnovate.com`
   - Enable "Enforce HTTPS"
4. **Push updated code** (CNAME file and config changes)
5. **Test the live site** at https://www.cskinnovate.com
