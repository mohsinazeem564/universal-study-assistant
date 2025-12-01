# Universal Study Assistant 🎓

AI-powered educational platform that solves problems across ALL subjects with visual explanations, diagrams, and simple language everyone can understand.

## 🌟 Features

- **All Subjects Covered**: Mathematics, Physics, Chemistry, Biology, Computer Science, Languages, Social Sciences, Engineering, Arts, Business, Medicine, Law, and more
- **AI-Powered Solutions**: Get instant answers with step-by-step explanations
- **Visual Learning**: Automatic diagram and image generation
- **Simple Explanations**: ELI5 mode makes complex topics easy to understand
- **Multi-Language Support**: Learn in your preferred language
- **Google AdMob Integration**: Monetized with non-intrusive ads
- **Offline Mode**: Access saved solutions without internet
- **Progress Tracking**: Monitor your learning journey

## 📱 Tech Stack

### Mobile App (React Native)
- React Native 0.73+
- TypeScript
- Redux Toolkit
- React Navigation
- React Native Paper (UI)
- Google AdMob SDK

### Backend (Node.js)
- Express.js
- MongoDB
- OpenAI GPT-4
- Google Gemini Pro
- Image generation APIs

### Web Dashboard (Next.js)
- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- React Native CLI
- Android Studio / Xcode
- MongoDB

### Installation

```bash
# Clone repository
git clone https://github.com/mohsinazeem564/universal-study-assistant.git
cd universal-study-assistant

# Install backend dependencies
cd backend
npm install

# Install mobile app dependencies
cd ../mobile
npm install

# Install web dashboard dependencies
cd ../web
npm install
```

### Environment Setup

Create `.env` files in each directory:

**backend/.env**
```
MONGODB_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
PORT=3000
```

**mobile/.env**
```
API_URL=http://localhost:3000
ADMOB_APP_ID=your_admob_app_id
ADMOB_BANNER_ID=your_banner_id
ADMOB_INTERSTITIAL_ID=your_interstitial_id
```

### Run the App

```bash
# Start backend
cd backend
npm run dev

# Start mobile app (iOS)
cd mobile
npx react-native run-ios

# Start mobile app (Android)
npx react-native run-android

# Start web dashboard
cd web
npm run dev
```

## 📚 Subject Categories

### STEM
- Mathematics (Algebra, Geometry, Calculus, Statistics, Trigonometry)
- Physics (Mechanics, Thermodynamics, Electromagnetism, Quantum)
- Chemistry (Organic, Inorganic, Physical, Analytical)
- Biology (Botany, Zoology, Genetics, Microbiology, Ecology)
- Computer Science (Programming, Algorithms, Data Structures, AI/ML)
- Engineering (Civil, Mechanical, Electrical, Chemical, Software)

### Languages & Literature
- English, Spanish, French, German, Chinese, Arabic, Urdu
- Grammar, Literature, Writing, Poetry, Linguistics

### Social Sciences
- History (World, Ancient, Modern)
- Geography (Physical, Human, Political)
- Economics (Micro, Macro, International)
- Psychology, Sociology, Anthropology
- Political Science, Philosophy

### Professional & Specialized
- Medicine (Anatomy, Physiology, Pharmacology)
- Law (Constitutional, Criminal, Civil)
- Business (Management, Marketing, Finance, Accounting)
- Arts (Music Theory, Art History, Design)
- Agriculture, Environmental Science
- Architecture, Urban Planning

## 💰 Monetization

- **Banner Ads**: Non-intrusive bottom banners
- **Interstitial Ads**: Between problem solutions
- **Rewarded Ads**: Unlock premium features
- **Premium Subscription**: Ad-free experience with advanced features

## 🎯 Roadmap

- [x] Core AI problem solver
- [x] Visual diagram generation
- [x] Google AdMob integration
- [ ] Voice input for problems
- [ ] AR visualization for 3D concepts
- [ ] Collaborative study rooms
- [ ] Teacher dashboard
- [ ] Gamification & achievements
- [ ] Mobile app launch (iOS & Android)

## 📄 License

MIT License - See LICENSE file

## 🤝 Contributing

Contributions welcome! Please read CONTRIBUTING.md

## 📧 Contact

- Email: mohsinazeem564@gmail.com
- GitHub: [@mohsinazeem564](https://github.com/mohsinazeem564)

---

Built with ❤️ to make education accessible to everyone
