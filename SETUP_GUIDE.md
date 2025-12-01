# Complete Setup Guide

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ installed ([Download](https://nodejs.org/))
- **MongoDB** installed locally or MongoDB Atlas account ([Sign up](https://www.mongodb.com/cloud/atlas))
- **React Native CLI** installed globally
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, Mac only)
- **OpenAI API Key** ([Get one](https://platform.openai.com/api-keys))
- **Google AdMob Account** ([Sign up](https://admob.google.com/))

## Step 1: Clone Repository

```bash
git clone https://github.com/mohsinazeem564/universal-study-assistant.git
cd universal-study-assistant
```

## Step 2: Backend Setup

### 2.1 Install Dependencies

```bash
cd backend
npm install
```

### 2.2 Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` file:

```env
# Server
PORT=3000
NODE_ENV=development

# Database - Choose one:
# Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/study-assistant

# OR MongoDB Atlas (recommended):
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/study-assistant

# AI Services
OPENAI_API_KEY=sk-your-openai-api-key-here
GEMINI_API_KEY=your-gemini-api-key-here  # Optional

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8081
```

### 2.3 Start MongoDB (if using local)

```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 2.4 Run Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server should be running at `http://localhost:3000`

### 2.5 Test Backend

```bash
# Health check
curl http://localhost:3000/health

# Get subjects
curl http://localhost:3000/api/subjects

# Test problem solving
curl -X POST http://localhost:3000/api/problems/solve \
  -H "Content-Type: application/json" \
  -d '{
    "problem": "What is 2+2?",
    "subject": "Mathematics",
    "difficulty": "easy"
  }'
```

## Step 3: Mobile App Setup

### 3.1 Install Dependencies

```bash
cd ../mobile
npm install
```

### 3.2 Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` file:

```env
# API Configuration
API_URL=http://localhost:3000/api
# For Android emulator, use: http://10.0.2.2:3000/api
# For iOS simulator, use: http://localhost:3000/api
# For physical device, use your computer's IP: http://192.168.1.x:3000/api

# Google AdMob - Use test IDs for development
ADMOB_APP_ID_ANDROID=ca-app-pub-3940256099942544~3347511713
ADMOB_BANNER_ID_ANDROID=ca-app-pub-3940256099942544/6300978111
ADMOB_INTERSTITIAL_ID_ANDROID=ca-app-pub-3940256099942544/1033173712

ADMOB_APP_ID_IOS=ca-app-pub-3940256099942544~1458002511
ADMOB_BANNER_ID_IOS=ca-app-pub-3940256099942544/2934735716
ADMOB_INTERSTITIAL_ID_IOS=ca-app-pub-3940256099942544/4411468910
```

### 3.3 iOS Setup (Mac only)

```bash
cd ios
pod install
cd ..
```

### 3.4 Android Setup

Update `android/local.properties` with your Android SDK path:

```properties
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

### 3.5 Run Mobile App

**Start Metro Bundler:**
```bash
npm start
```

**Run on Android:**
```bash
# In a new terminal
npx react-native run-android
```

**Run on iOS:**
```bash
# In a new terminal
npx react-native run-ios
```

## Step 4: Google AdMob Setup (Production)

### 4.1 Create AdMob Account

1. Go to [AdMob](https://admob.google.com/)
2. Sign in with Google account
3. Accept terms and conditions

### 4.2 Create Apps

**For Android:**
1. Click "Apps" → "Add App"
2. Select "Android"
3. Enter app name: "Universal Study Assistant"
4. Copy the App ID (format: `ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy`)

**For iOS:**
1. Click "Apps" → "Add App"
2. Select "iOS"
3. Enter app name: "Universal Study Assistant"
4. Copy the App ID

### 4.3 Create Ad Units

For each app, create:

**Banner Ad:**
1. Click "Ad units" → "Add ad unit"
2. Select "Banner"
3. Name: "Home Banner"
4. Copy Ad Unit ID

**Interstitial Ad:**
1. Click "Ad units" → "Add ad unit"
2. Select "Interstitial"
3. Name: "Problem Solved Interstitial"
4. Copy Ad Unit ID

**Rewarded Ad (Optional):**
1. Click "Ad units" → "Add ad unit"
2. Select "Rewarded"
3. Name: "Premium Feature Unlock"
4. Copy Ad Unit ID

### 4.4 Update App Configuration

**Android** - Edit `mobile/android/app/src/main/AndroidManifest.xml`:
```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy"/>
```

**iOS** - Edit `mobile/ios/UniversalStudyAssistant/Info.plist`:
```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy</string>
```

**Environment Variables** - Update `mobile/.env`:
```env
ADMOB_APP_ID_ANDROID=ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy
ADMOB_BANNER_ID_ANDROID=ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy
ADMOB_INTERSTITIAL_ID_ANDROID=ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy

ADMOB_APP_ID_IOS=ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy
ADMOB_BANNER_ID_IOS=ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy
ADMOB_INTERSTITIAL_ID_IOS=ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy
```

## Step 5: Testing

### Backend Tests
```bash
cd backend
npm test
```

### Mobile Tests
```bash
cd mobile
npm test
```

### Manual Testing Checklist

- [ ] Backend health check works
- [ ] Can fetch subjects list
- [ ] Can solve a simple math problem
- [ ] Can solve problems in different subjects
- [ ] Diagrams generate correctly
- [ ] Mobile app connects to backend
- [ ] Can input and solve problems
- [ ] Solutions display correctly
- [ ] Ads load (test ads in development)
- [ ] Navigation works
- [ ] History saves problems
- [ ] Search works

## Step 6: Common Issues & Solutions

### Backend Issues

**MongoDB Connection Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
Solution: Start MongoDB service or check MongoDB Atlas connection string

**OpenAI API Error:**
```
Error: Invalid API key
```
Solution: Verify your OpenAI API key in `.env` file

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::3000
```
Solution: Kill process using port 3000 or change PORT in `.env`

### Mobile Issues

**Metro Bundler Error:**
```
Error: Unable to resolve module
```
Solution:
```bash
cd mobile
rm -rf node_modules
npm install
npx react-native start --reset-cache
```

**Android Build Error:**
```
Error: SDK location not found
```
Solution: Create/update `android/local.properties` with SDK path

**iOS Pod Install Error:**
```
Error: CocoaPods not installed
```
Solution:
```bash
sudo gem install cocoapods
cd ios
pod install
```

**API Connection Error:**
```
Network request failed
```
Solution:
- Android emulator: Use `http://10.0.2.2:3000/api`
- iOS simulator: Use `http://localhost:3000/api`
- Physical device: Use your computer's IP address

### AdMob Issues

**Ads Not Showing:**
- Use test ad IDs during development
- Check AdMob account is approved (takes 24-48 hours)
- Verify App IDs in manifest/Info.plist
- Check internet connection

**Test Ads Not Loading:**
- Ensure using correct test ad unit IDs
- Check AdMob SDK is properly initialized
- Verify Google Play Services (Android)

## Step 7: Development Workflow

### Daily Development

1. **Start Backend:**
```bash
cd backend
npm run dev
```

2. **Start Mobile:**
```bash
cd mobile
npm start
# In another terminal:
npx react-native run-android  # or run-ios
```

3. **Make Changes:**
- Backend: Changes auto-reload with nodemon
- Mobile: Press 'r' in Metro to reload, or enable Fast Refresh

4. **Test Changes:**
- Use Postman/curl for API testing
- Use React Native Debugger for mobile debugging

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/your-feature
```

## Step 8: Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Step 9: Monitoring & Maintenance

### Backend Monitoring
- Check server logs regularly
- Monitor MongoDB Atlas dashboard
- Track API usage and costs
- Set up error alerts (Sentry)

### Mobile Monitoring
- Check app store reviews
- Monitor crash reports
- Track AdMob earnings
- Analyze user engagement

### Regular Maintenance
- Update dependencies monthly
- Review and optimize AI prompts
- Add new subjects based on demand
- Improve ad placement based on metrics

## Need Help?

- **Documentation**: Check README.md and other docs
- **Issues**: [GitHub Issues](https://github.com/mohsinazeem564/universal-study-assistant/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mohsinazeem564/universal-study-assistant/discussions)
- **Email**: mohsinazeem564@gmail.com

## Next Steps

1. ✅ Complete setup
2. 📱 Test the app thoroughly
3. 🎨 Customize branding
4. 📝 Add more subjects if needed
5. 🚀 Deploy to production
6. 📊 Monitor and optimize
7. 💰 Start earning!

Good luck with your app! 🎓
