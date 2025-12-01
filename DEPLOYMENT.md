# Deployment Guide

## Backend Deployment

### Option 1: Deploy to Railway

1. **Create Railway Account**: https://railway.app
2. **Install Railway CLI**:
```bash
npm install -g @railway/cli
```

3. **Login and Deploy**:
```bash
cd backend
railway login
railway init
railway up
```

4. **Add Environment Variables** in Railway Dashboard:
- `MONGODB_URI`
- `OPENAI_API_KEY`
- `GEMINI_API_KEY`
- `PORT=3000`

### Option 2: Deploy to Render

1. **Create Render Account**: https://render.com
2. **Connect GitHub Repository**
3. **Create New Web Service**
4. **Configure**:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Add environment variables

### Option 3: Deploy to Vercel (Serverless)

```bash
cd backend
vercel
```

## Mobile App Deployment

### Android

1. **Generate Signing Key**:
```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. **Configure Gradle** (`android/app/build.gradle`):
```gradle
android {
    signingConfigs {
        release {
            storeFile file('my-release-key.keystore')
            storePassword 'your-password'
            keyAlias 'my-key-alias'
            keyPassword 'your-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

3. **Build APK**:
```bash
cd android
./gradlew assembleRelease
```

4. **Upload to Google Play Console**:
   - Create app listing
   - Upload APK/AAB
   - Configure AdMob
   - Submit for review

### iOS

1. **Configure Xcode**:
```bash
cd ios
pod install
open UniversalStudyAssistant.xcworkspace
```

2. **Set up Signing & Capabilities**:
   - Select your team
   - Configure bundle identifier
   - Add AdMob App ID to Info.plist

3. **Archive and Upload**:
   - Product → Archive
   - Distribute App
   - Upload to App Store Connect

4. **App Store Connect**:
   - Create app listing
   - Add screenshots
   - Submit for review

## Google AdMob Setup

1. **Create AdMob Account**: https://admob.google.com

2. **Create App**:
   - Add Android app
   - Add iOS app
   - Get App IDs

3. **Create Ad Units**:
   - Banner Ad
   - Interstitial Ad
   - Rewarded Ad (optional)

4. **Update Environment Variables**:
```env
# Android
ADMOB_APP_ID_ANDROID=ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy
ADMOB_BANNER_ID_ANDROID=ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy
ADMOB_INTERSTITIAL_ID_ANDROID=ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy

# iOS
ADMOB_APP_ID_IOS=ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy
ADMOB_BANNER_ID_IOS=ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy
ADMOB_INTERSTITIAL_ID_IOS=ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy
```

5. **Update AndroidManifest.xml** and **Info.plist** with App IDs

## Database Setup

### MongoDB Atlas

1. **Create Account**: https://www.mongodb.com/cloud/atlas
2. **Create Cluster** (Free tier available)
3. **Create Database User**
4. **Whitelist IP** (0.0.0.0/0 for development)
5. **Get Connection String**:
```
mongodb+srv://username:password@cluster.mongodb.net/study-assistant
```

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://...
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
PORT=3000
NODE_ENV=production
```

### Mobile (.env)
```env
API_URL=https://your-backend-url.com/api
ADMOB_APP_ID_ANDROID=ca-app-pub-...
ADMOB_BANNER_ID_ANDROID=ca-app-pub-...
ADMOB_INTERSTITIAL_ID_ANDROID=ca-app-pub-...
ADMOB_APP_ID_IOS=ca-app-pub-...
ADMOB_BANNER_ID_IOS=ca-app-pub-...
ADMOB_INTERSTITIAL_ID_IOS=ca-app-pub-...
```

## Monitoring & Analytics

### Backend Monitoring
- Use Railway/Render built-in logs
- Add Sentry for error tracking
- Use MongoDB Atlas monitoring

### Mobile Analytics
- Google Analytics for Firebase
- AdMob reporting dashboard
- Crashlytics for crash reporting

## Cost Optimization

### Free Tier Options
- **Backend**: Railway (500 hours/month free) or Render (750 hours/month free)
- **Database**: MongoDB Atlas (512MB free)
- **AI**: OpenAI has pay-as-you-go pricing
- **AdMob**: Free to use, you earn from ads

### Estimated Monthly Costs
- Backend hosting: $0-10 (free tier sufficient initially)
- Database: $0 (free tier)
- AI API calls: $20-100 (depends on usage)
- Total: ~$20-110/month

### Revenue Potential
- AdMob earnings: $1-5 per 1000 impressions
- With 10,000 daily users: $300-1500/month potential
- Premium subscription: Additional revenue stream

## Launch Checklist

- [ ] Backend deployed and tested
- [ ] Database configured and secured
- [ ] Environment variables set
- [ ] AdMob configured
- [ ] Mobile app built and tested
- [ ] App store listings created
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] Analytics configured
- [ ] Monitoring set up
- [ ] Backup strategy implemented
- [ ] Submit to app stores

## Post-Launch

1. **Monitor Performance**:
   - Check error logs daily
   - Monitor API response times
   - Track AdMob earnings

2. **Gather Feedback**:
   - Read app store reviews
   - Monitor support emails
   - Track user engagement

3. **Iterate**:
   - Fix bugs quickly
   - Add requested features
   - Optimize ad placement
   - Improve AI responses

## Support

For deployment issues:
- Backend: Check Railway/Render logs
- Mobile: Check Xcode/Android Studio logs
- Database: Check MongoDB Atlas logs
- AI: Check OpenAI dashboard

---

Good luck with your launch! 🚀
