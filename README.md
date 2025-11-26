# 🚀 CreatorPulse — AI-Powered Analytics for Content Creators

> Transform scattered social media metrics into actionable insights with AI-driven recommendations.

A modern, full-stack SaaS platform that helps content creators and marketing teams make data-driven decisions across multiple social platforms.

---

## ✨ What It Does

**CreatorPulse** analyzes your content performance across YouTube, Instagram, TikTok, and Facebook to provide:

- 📊 **Smart Analytics** - Unified dashboard showing performance across all platforms
- ⏰ **Optimal Posting Times** - AI determines the best days and hours to post for maximum engagement
- 🎯 **Platform Recommendations** - Data-driven advice on where to invest your time and resources
- 💡 **Content Ideas** - AI-generated suggestions based on your top-performing content
- 🤖 **AI Chat Assistant** - Ask questions about your analytics and get instant insights
- ⚠️ **Growth Alerts** - Early warnings about declining trends or stagnation

---

## 🎯 Key Features

### For Creators
- Upload analytics from multiple platforms in JSON format
- Get personalized recommendations based on YOUR data
- Understand what content resonates with your audience
- Discover the best times to post for maximum reach
- Chat with AI to explore your analytics deeper

### For Businesses
- **No Python Required** - 100% Node.js, deploys anywhere (including cPanel)
- **Fast & Scalable** - Pure JavaScript analytics engine
- **Secure** - JWT authentication, Google OAuth, encrypted passwords
- **Modern Stack** - React 19, Node.js, MongoDB, OpenAI
- **Production Ready** - Built-in caching, error handling, optimized builds

---

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite for lightning-fast builds
- **Tailwind CSS** for beautiful, responsive design
- **Framer Motion** for smooth animations
- **React Query** for efficient data fetching
- **Recharts** for interactive visualizations

### Backend
- **Node.js + Express** RESTful API
- **MongoDB** for flexible data storage
- **OpenAI GPT-4** for intelligent insights
- **Pure JavaScript** analytics (no Python dependencies)
- **JWT + Google OAuth** for secure authentication

### Analytics Engine
- **100% JavaScript** - No external dependencies
- **Statistical Analysis** - Trend detection, volatility analysis
- **Pattern Recognition** - Content theme clustering
- **Performance Optimized** - Direct function calls, no subprocess overhead

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- OpenAI API key

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/mehedi-hridoy/creator-pulse.git
cd creator-pulse

# 2. Setup Backend
cd backend
npm install

# Create .env file (see Configuration section below)
cp .env.example .env
# Edit .env with your credentials

npm run dev  # Starts on http://localhost:5000

# 3. Setup Frontend (in a new terminal)
cd frontend
npm install --legacy-peer-deps
npm run dev  # Starts on http://localhost:5173
```

### Configuration

Create `backend/.env` with these variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/creatorpulse
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/creatorpulse

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-characters

# OpenAI (required for AI features)
OPENAI_API_KEY=sk-proj-your-openai-api-key

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
POST_OAUTH_REDIRECT=http://localhost:5173/dashboard

# CORS (for local development)
CORS_ORIGINS=http://localhost:5173,http://localhost:5174

# Server
PORT=5000
NODE_ENV=development
```

### Important: Local vs Production URLs

**When running locally**, your configuration uses:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`
- CORS Origins: `http://localhost:5173`

**When deploying to production** (e.g., `creatorpulse.mehedihridoy.online`), update:

1. **Backend `.env`**:
   ```env
   CORS_ORIGINS=https://creatorpulse.mehedihridoy.online
   GOOGLE_CALLBACK_URL=https://api.creatorpulse.mehedihridoy.online/auth/google/callback
   POST_OAUTH_REDIRECT=https://creatorpulse.mehedihridoy.online/dashboard
   NODE_ENV=production
   ```

2. **Frontend** - Update API URL in your frontend code:
   ```javascript
   // In frontend/src/stores/authStore.js or config file
   const API_URL = 'https://api.creatorpulse.mehedihridoy.online'
   ```

3. **Google OAuth Console**:
   - Add production callback URL: `https://api.creatorpulse.mehedihridoy.online/auth/google/callback`
   - Add authorized origin: `https://creatorpulse.mehedihridoy.online`

---

## 📦 Deployment

### Build for Production

```bash
# Build Frontend
cd frontend
npm run build
# Output: frontend/dist/

# Backend runs directly (no build needed)
cd backend
npm start
```

### Deploy to cPanel

1. **Upload files** to your cPanel hosting
2. **Setup Node.js App** in cPanel:
   - Application Root: `creator-pulse/backend`
   - Startup File: `src/server.js`
   - Node Version: 18.x or higher
3. **Set environment variables** (production URLs)
4. **Upload `frontend/dist/`** to public_html
5. **Run NPM Install** in cPanel Node.js app panel

### Deploy to Other Platforms

- **Vercel/Netlify** - Frontend (automatic from Git)
- **Railway/Render** - Backend (automatic from Git)
- **DigitalOcean** - Full-stack droplet
- **Heroku** - Both frontend and backend

---

## 📖 API Endpoints

### Authentication
- `POST /auth/register` - Create account
- `POST /auth/login` - Email login
- `GET /auth/google` - Google OAuth
- `GET /auth/me` - Get current user

### Analytics
- `POST /upload/json` - Upload platform analytics
- `GET /analytics/overview` - Dashboard stats
- `DELETE /analytics/clear` - Clear all data

### AI Recommendations
- `GET /ai/recommendations` - Get AI-powered insights
- `POST /ai/ask` - Chat with AI about your data
- `POST /ai/recommendations/clear-cache` - Force refresh

---

## 🎨 Screenshots

[Add screenshots here of your dashboard, recommendations page, and chat interface]

---

## 🔒 Security Features

- ✅ JWT token authentication
- ✅ Bcrypt password hashing
- ✅ Google OAuth 2.0 integration
- ✅ CORS protection
- ✅ Environment variable protection
- ✅ MongoDB injection prevention
- ✅ Rate limiting ready

---

## 🚀 Performance

- **Fast Loading** - Optimized React builds with code splitting
- **Efficient Caching** - 6-hour cache for analytics (configurable)
- **Quick Analytics** - Direct JavaScript execution (~50-100ms)
- **Responsive Design** - Works on mobile, tablet, desktop

---

## 📊 Analytics Features

### Posting Schedule Analysis
- Identifies best days and times to post
- Platform-specific recommendations
- Based on engagement rate and views

### Platform Focus
- Growth rate calculations
- Engagement rate comparison
- Investment recommendations (invest more, maintain, deprioritize)

### Growth Alerts
- Declining trend detection
- High volatility warnings
- Stagnation identification

### Content Themes
- Clusters content by performance
- Identifies top-performing patterns
- Provides example titles from each cluster

---

## 🛣️ Roadmap

- [ ] Real-time analytics streaming
- [ ] Team collaboration features
- [ ] Advanced scheduling automation
- [ ] Custom report generation
- [ ] Mobile app (React Native)
- [ ] Integration with platform APIs (auto-fetch data)

---

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 👨‍💻 Developer

**Mehedi Hridoy**
- GitHub: [@mehedi-hridoy](https://github.com/mehedi-hridoy)
- Website: [mehedihridoy.online](https://mehedihridoy.online)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Support

For issues or questions:
1. Open an issue on GitHub
2. Contact through website
3. Check the documentation

---

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐ on GitHub!

---



