# 🚀 Deployment Guide

Quick guide to deploy CreatorPulse to production.

---

## 📋 Pre-Deployment Checklist

- [ ] MongoDB database ready (Atlas or self-hosted)
- [ ] OpenAI API key obtained
- [ ] Domain/subdomain configured
- [ ] SSL certificate ready (Let's Encrypt recommended)
- [ ] Google OAuth credentials (if using)

---

## 🔧 Environment Configuration

### Local Development
Use these URLs when developing locally:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`
- CORS: `http://localhost:5173`

### Production
Update to your domain (example: `creatorpulse.mehedihridoy.online`):
- Backend: `https://api.creatorpulse.mehedihridoy.online`
- Frontend: `https://creatorpulse.mehedihridoy.online`
- CORS: `https://creatorpulse.mehedihridoy.online`

---

## 🎯 cPanel Deployment

### Step 1: Prepare Files

```bash
# Build frontend
cd frontend
npm run build

# Files to upload:
# - backend/ (entire folder)
# - frontend/dist/ (build output)
```

### Step 2: Upload to cPanel

1. **Backend**: Upload `backend/` folder to `/home/username/creator-pulse/backend`
2. **Frontend**: Upload `frontend/dist/` contents to `/home/username/public_html/` (or subdomain folder)

### Step 3: Setup Node.js Application

In cPanel → **Setup Node.js App**:

- **Node.js version**: 18.x or higher
- **Application mode**: Production
- **Application root**: `creator-pulse/backend`
- **Application URL**: Your domain or subdomain
- **Application startup file**: `src/server.js`

### Step 4: Environment Variables

Add these in the Node.js app environment variables section:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/creatorpulse
JWT_SECRET=your-production-jwt-secret-32-characters-minimum
COOKIE_SECRET=your-production-cookie-secret
OPENAI_API_KEY=sk-proj-your-real-openai-api-key
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=https://api.creatorpulse.mehedihridoy.online/auth/google/callback
POST_OAUTH_REDIRECT=https://creatorpulse.mehedihridoy.online/dashboard
CORS_ORIGINS=https://creatorpulse.mehedihridoy.online
PORT=5000
NODE_ENV=production
BRAND_NAME=CreatorPulse
```

### Step 5: Install Dependencies

In the cPanel Node.js app panel:
- Click **"Run NPM Install"**
- Wait for installation to complete
- Click **"Restart"**

### Step 6: Update Google OAuth

In [Google Cloud Console](https://console.cloud.google.com/):

1. Go to **APIs & Services** → **Credentials**
2. Edit your OAuth 2.0 Client
3. Add **Authorized redirect URIs**:
   ```
   https://api.creatorpulse.mehedihridoy.online/auth/google/callback
   ```
4. Add **Authorized JavaScript origins**:
   ```
   https://creatorpulse.mehedihridoy.online
   ```
5. Save changes

### Step 7: Test

1. Visit your frontend URL: `https://creatorpulse.mehedihridoy.online`
2. Try registering/logging in
3. Upload sample analytics
4. Check recommendations page

---

## ☁️ Alternative: Vercel + Railway

### Frontend on Vercel

```bash
cd frontend
vercel --prod
```

Set environment variable:
- `VITE_API_URL=https://your-backend.railway.app`

### Backend on Railway

1. Connect GitHub repository
2. Railway auto-detects Node.js
3. Set environment variables (same as above)
4. Deploy automatically

---

## 🐳 Docker Deployment (Optional)

```bash
# Coming soon - Dockerfile included in future updates
```

---

## ✅ Post-Deployment Verification

- [ ] Frontend loads correctly
- [ ] Can register/login
- [ ] Can upload analytics
- [ ] Recommendations generate successfully
- [ ] AI chat works
- [ ] Google OAuth works (if configured)
- [ ] No console errors
- [ ] SSL certificate valid

---

## 🔍 Troubleshooting

### Backend not starting
- Check Node.js version (must be 18+)
- Verify all environment variables are set
- Check MongoDB connection string
- Look at error logs in cPanel

### CORS errors
- Ensure `CORS_ORIGINS` matches your frontend URL exactly
- Include `https://` and no trailing slash
- Check if SSL is enabled

### Google OAuth not working
- Verify callback URL in Google Console matches `.env`
- Check authorized origins are correct
- Ensure credentials are production credentials

### Analytics not generating
- Verify `OPENAI_API_KEY` is set and valid
- Check OpenAI account has credits
- Look at backend logs for errors

---

## 📊 Monitoring

### Check Logs
- **cPanel**: Node.js app panel → View logs
- **Railway**: Dashboard → Deployments → Logs
- **Vercel**: Dashboard → Project → Deployments → Function logs

### Performance
- Monitor MongoDB Atlas metrics
- Check OpenAI API usage
- Review response times

---

## 🔐 Security Recommendations

- ✅ Use strong JWT_SECRET (32+ random characters)
- ✅ Keep `.env` files secure (never commit to Git)
- ✅ Use HTTPS only in production
- ✅ Regularly update dependencies
- ✅ Monitor for security vulnerabilities
- ✅ Set up rate limiting (optional but recommended)

---

## 📞 Need Help?

1. Check error logs first
2. Verify environment variables
3. Test API endpoints with Postman
4. Open an issue on GitHub
5. Contact: [mehedihridoy101@gmail.com]

---


