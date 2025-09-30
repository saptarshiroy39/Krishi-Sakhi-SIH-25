<div align="center">
  
# 🌾 Krishi Sakhi

### AI-Powered Agricultural Assistance Platform

*Empowering farmers with intelligent insights, real-time data, and personalized guidance*

[![Made for SIH 2025](https://img.shields.io/badge/Made%20for-SIH%202025-green?style=for-the-badge)](https://sih.gov.in/)
[![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python)](https://www.python.org/)

[Features](#-features) • [Demo](#-demo) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [API Keys](#-api-configuration) • [Documentation](#-documentation)

</div>

---

## 📖 Overview

**Krishi Sakhi** is a comprehensive agricultural assistance platform that leverages cutting-edge AI technology to revolutionize farming practices. Built for Smart India Hackathon 2025, it combines real-time weather data, AI-powered advisory, government scheme information, and intelligent crop management into a single, user-friendly application.

### � Problem Statement

Farmers face challenges in:
- Accessing timely, accurate agricultural information
- Understanding and applying for government schemes
- Making data-driven farming decisions
- Adapting to changing weather patterns
- Managing farm activities efficiently

### 💡 Our Solution

Krishi Sakhi provides:
- **AI-powered chat assistant** for instant farming advice
- **Real-time weather integration** with OpenWeather API
- **Intelligent advisory system** using Gemini AI
- **Government schemes database** with eligibility checking
- **Activity management** for farm operations
- **Knowledge base** with crop calendars and best practices
- **Multi-language support** (English & Malayalam)

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🏠 Smart Dashboard
- **Personalized Welcome** - User-specific greetings and stats
- **Weather Widget** - Real-time weather with 24-hour forecast
- **AI Farming Advisory** - Context-aware tips based on weather
- **Quick Stats** - Activities, farms, and alerts at a glance
- **Data Caching** - Smart loading for better performance

</td>
<td width="50%">

### 🤖 AI Chat Assistant
- **Intelligent Responses** - Powered by Gemini 2.5 Flash
- **Weather Integration** - Real-time weather data in responses
- **Translation** - Instant English ↔ Malayalam translation
- **Image Analysis** - Upload crop photos for pest/disease ID
- **Context Awareness** - Remembers conversation history

</td>
</tr>
<tr>
<td width="50%">

### 🌾 Activity Management
- **Activity Tracking** - Log and monitor farm activities
- **Status Management** - Pending, in-progress, completed
- **Crop-Specific** - Organize by crop type
- **Calendar View** - Schedule and plan activities
- **Progress Analytics** - Track completion rates

</td>
<td width="50%">

### 💰 Government Schemes
- **Comprehensive Database** - 20+ schemes with details
- **Smart Search** - Filter by category, budget, deadline
- **Eligibility Check** - Automatic eligibility assessment
- **Application Guide** - Step-by-step application process
- **Document Checklist** - Required documents list

</td>
</tr>
<tr>
<td width="50%">

### 📚 Knowledge Base
- **24-Hour Weather Forecast** - Hourly predictions
- **Market Prices** - Real-time crop prices (GROQ AI)
- **Crop Calendar** - Monthly planting guides (GROQ AI)
- **Smart Farming Tips** - AI-generated best practices
- **Search Functionality** - Quick information access

</td>
<td width="50%">

### 👤 Profile Management
- **User Information** - Name, location, contact details
- **Farm Management** - Multiple farms with area tracking
- **Crop Management** - Active crops with planting dates
- **Language Toggle** - English/Malayalam switching
- **Theme Toggle** - Light/Dark mode support

</td>
</tr>
</table>

---

## 🏗️ Tech Stack

<div align="center">

### Frontend
[![React](https://img.shields.io/badge/React-18.0-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-6.0-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com/)

### Backend
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=flat-square&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-D71F00?style=flat-square&logo=sqlalchemy&logoColor=white)](https://sqlalchemy.org/)

### AI & APIs
[![Google Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![GROQ](https://img.shields.io/badge/GROQ-Llama_3.1-FF6B6B?style=flat-square&logo=meta&logoColor=white)](https://groq.com/)
[![OpenWeather](https://img.shields.io/badge/OpenWeather-API-EB6E4B?style=flat-square&logo=weatherapi&logoColor=white)](https://openweathermap.org/)

</div>

### 📦 Key Libraries

**Frontend:**
- **React 18** - Modern UI library with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, consistent icon set
- **React Router** - Client-side routing
- **Context API** - State management (Theme, Language, Notifications)

**Backend:**
- **Flask 3.0** - Lightweight WSGI web framework
- **SQLAlchemy 2.0** - SQL toolkit and ORM
- **Flask-CORS** - Cross-Origin Resource Sharing
- **Flask-Migrate** - Database migrations (Alembic)
- **Supabase** - PostgreSQL database hosting

**AI Services:**
- **Google Gemini AI** - Primary AI model for chat and advisory
- **GROQ (Llama 3.1)** - Fast inference for market prices, crop calendar, tips
- **OpenWeather API** - Real-time weather data and forecasts

---

## 🔑 API Configuration

### Required API Keys

Create a `.env` file in the project root:

```bash
# ============================================
# AI API Keys
# ============================================

# Gemini API Key 1 - Used for AI Chat and Advisory
GEMINI_API_KEY_1=your_gemini_api_key_1_here

# Gemini API Key 2 - Used for Translation and Content Generation
GEMINI_API_KEY_2=your_gemini_api_key_2_here

# GROQ API Key - Used for Market Prices, Crop Calendar, Farming Tips
GROQ_API_KEY=your_groq_api_key_here

# ============================================
# Weather API
# ============================================

# OpenWeather API Key - Used for Real-time Weather Data
OPENWEATHER_API_KEY=your_openweather_api_key_here

# ============================================
# Database Configuration
# ============================================

# Supabase PostgreSQL Database URL
DATABASE_URL=postgresql://user:password@host:port/database

# ============================================
# Flask Configuration
# ============================================

# Flask Secret Key for Sessions
SECRET_KEY=krishi-sakhi-super-secret-key-2025

# Flask Environment (development/production)
FLASK_ENV=development

# Server Port
PORT=5000

# CORS Settings
ALLOWED_ORIGINS=*
```

### 🔐 Getting Your API Keys

<details>
<summary><b>📘 Google Gemini API</b></summary>

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key and add to `.env` file
5. **Free Tier**: 60 requests/minute

</details>

<details>
<summary><b>⚡ GROQ API</b></summary>

1. Visit [GROQ Console](https://console.groq.com/)
2. Sign up for free account
3. Navigate to API Keys section
4. Generate new API key
5. Copy and add to `.env` file
6. **Free Tier**: Very generous limits with Llama 3.1

</details>

<details>
<summary><b>🌦️ OpenWeather API</b></summary>

1. Visit [OpenWeather](https://openweathermap.org/api)
2. Sign up for free account
3. Go to "API keys" tab
4. Copy default API key or create new one
5. Add to `.env` file
6. **Free Tier**: 1000 calls/day, 60 calls/minute

</details>

<details>
<summary><b>🗄️ Supabase PostgreSQL</b></summary>

1. Visit [Supabase](https://supabase.com/)
2. Create new project
3. Go to Settings → Database
4. Copy connection string
5. Add to `.env` as `DATABASE_URL`
6. **Free Tier**: 500MB database, unlimited API requests

</details>

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 18+ | [Download](https://nodejs.org/) |
| Python | 3.8+ | [Download](https://python.org/) |
| npm/yarn | Latest | Included with Node.js |
| pip | Latest | Included with Python |

### Installation Steps

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/saptarshiroy39/Krishi-Sakhi-SIH-25.git
cd Krishi-Sakhi-SIH-25
```

#### 2️⃣ Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Setup environment variables (create .env file)
# Add all required API keys (see API Configuration section)

# Initialize database with sample data
python init_db.py

# Start Flask backend server
python main.py
```

**Backend will run on:** `http://localhost:5000`

#### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Start Vite development server
npm run dev
```

**Frontend will run on:** `http://localhost:3000`

#### 4️⃣ Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api

### 🎯 One-Command Setup (PowerShell)

```powershell
# Run everything at once
pip install -r requirements.txt && python init_db.py && Start-Job { python main.py } && cd frontend && npm install && npm run dev
```

---

## 📁 Project Structure

```
Krishi-Sakhi-SIH-25/
│
├── 📂 frontend/                    # React TypeScript Frontend
│   ├── 📂 src/
│   │   ├── 📂 components/         # Reusable UI components
│   │   │   ├── Header.tsx         # Top navigation bar
│   │   │   ├── BottomNav.tsx      # Mobile bottom navigation
│   │   │   ├── Layout.tsx         # Main layout wrapper
│   │   │   └── LoadingSpinner.tsx # Loading component
│   │   │
│   │   ├── 📂 contexts/           # React Context providers
│   │   │   ├── ThemeContext.tsx   # Light/Dark theme
│   │   │   ├── LanguageContext.tsx # English/Malayalam
│   │   │   └── NotificationContext.tsx # Notification state
│   │   │
│   │   ├── 📂 pages/              # Page components
│   │   │   ├── Home.tsx           # Dashboard
│   │   │   ├── Chat.tsx           # AI chat assistant
│   │   │   ├── Activities.tsx     # Activity management
│   │   │   ├── Schemes.tsx        # Government schemes
│   │   │   ├── Knowledge.tsx      # Knowledge base
│   │   │   ├── Profile.tsx        # User profile
│   │   │   ├── Notifications.tsx  # Notifications page
│   │   │   └── LoginSignup.tsx    # Auth pages
│   │   │
│   │   ├── 📂 config/             # Configuration
│   │   │   └── api.ts             # API endpoints
│   │   │
│   │   ├── App.tsx                # Main app component
│   │   ├── main.tsx               # Entry point
│   │   └── index.css              # Global styles
│   │
│   ├── public/                     # Static assets
│   ├── package.json                # Node dependencies
│   ├── vite.config.ts             # Vite configuration
│   ├── tailwind.config.js         # Tailwind CSS config
│   └── tsconfig.json              # TypeScript config
│
├── 📂 blueprints/                  # Flask API Blueprints
│   ├── home.py                    # Dashboard & weather API
│   ├── chat.py                    # AI chat & translation
│   ├── activity.py                # Activity management
│   ├── schemes.py                 # Government schemes
│   ├── knowledge.py               # Knowledge base
│   ├── advisory.py                # Personalized advisory
│   └── profile.py                 # User profile API
│
├── 📂 instance/                    # Instance-specific files
│   └── app.db                     # SQLite database (fallback)
│
├── models.py                      # Database models (SQLAlchemy)
├── main.py                        # Flask application entry
├── init_db.py                     # Database initialization
├── db_manager.py                  # Database utilities
├── requirements.txt               # Python dependencies
├── .env                           # Environment variables
├── cleanup.ps1                    # Cleanup script
└── README.md                      # This file
```

---

## 🛠️ Development

### Frontend Development

```bash
cd frontend

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type checking
npm run type-check
```

### Backend Development

```bash
# Start Flask development server
python main.py

# Initialize database
python init_db.py

# Database management
python db_manager.py check          # Check DB connection
python db_manager.py stats          # Show statistics
python db_manager.py init           # Initialize migrations
python db_manager.py migrate        # Create migration
python db_manager.py upgrade        # Apply migrations
python db_manager.py downgrade      # Rollback migration

# Run cleanup
.\cleanup.ps1                       # Remove cache files
```

### API Endpoints

#### 🏠 Home & Dashboard
```
GET  /api/home/dashboard?location=Kochi&generate_advisory=true
GET  /api/home/weather?location=Kochi
POST /api/home/advisory/regenerate
```

#### 💬 Chat & AI
```
POST /api/chat
POST /api/chat/translate
POST /api/chat/image-analysis
```

#### 🌾 Activities
```
GET    /api/activities
POST   /api/activities
GET    /api/activities/:id
PUT    /api/activities/:id
DELETE /api/activities/:id
```

#### 💰 Government Schemes
```
GET  /api/schemes
GET  /api/schemes/:id
POST /api/schemes/check-eligibility
```

#### 📚 Knowledge Base
```
GET  /api/knowledge/market-prices
GET  /api/knowledge/crop-calendar
GET  /api/knowledge/farming-tips
```

#### 👤 Profile
```
GET    /api/profile/:id
PUT    /api/profile/:id
POST   /api/profile/farm
DELETE /api/profile/farm/:farm_id
```

---

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary-50:  #ECFDF5;
--primary-100: #D1FAE5;
--primary-500: #10B981;  /* Main brand color */
--primary-600: #059669;
--primary-900: #064E3B;

/* Semantic Colors */
--success: #10B981;
--warning: #F59E0B;
--error:   #EF4444;
--info:    #3B82F6;

/* Neutral Colors */
--gray-50:  #F9FAFB;
--gray-100: #F3F4F6;
--gray-500: #6B7280;
--gray-900: #111827;
```

### Typography

```css
/* Font Family */
font-family: 'Inter', 'SF Pro Display', -apple-system, 
             BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;

/* Font Sizes */
--text-xs:   0.75rem;   /* 12px */
--text-sm:   0.875rem;  /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg:   1.125rem;  /* 18px */
--text-xl:   1.25rem;   /* 20px */
--text-2xl:  1.5rem;    /* 24px */
--text-3xl:  1.875rem;  /* 30px */
```

### Components

- **Cards**: Elevated with `border-2` and subtle shadows
- **Buttons**: Primary (green gradient), Secondary (outlined)
- **Inputs**: Clean with focus ring states
- **Icons**: Lucide React with consistent sizing
- **Spacing**: 4px base unit (using Tailwind's spacing scale)

---

## 📱 Responsive Design

### Breakpoints

| Device | Width | Tailwind |
|--------|-------|----------|
| Mobile | < 640px | default |
| Tablet | ≥ 640px | `sm:` |
| Laptop | ≥ 1024px | `lg:` |
| Desktop | ≥ 1280px | `xl:` |

### Mobile-First Approach

- Bottom navigation for mobile devices
- Touch-friendly tap targets (minimum 44px)
- Optimized images and lazy loading
- Responsive grid layouts
- Adaptive typography

---

## 🌐 Internationalization (i18n)

### Supported Languages

- 🇬🇧 **English** (Default)
- 🇮🇳 **മലയാളം** (Malayalam)

### Usage

```typescript
import { useLanguage } from '../contexts/LanguageContext'

const MyComponent = () => {
  const { t } = useLanguage()
  
  return (
    <h1>
      {t('welcome', { 
        en: 'Welcome to Krishi Sakhi', 
        ml: 'കൃഷി സഖിയിലേക്ക് സ്വാഗതം' 
      })}
    </h1>
  )
}
```

### Adding New Languages

1. Update `LanguageContext.tsx`
2. Add translations in components
3. Test all pages with new language

---

## 🧪 Testing

### Frontend Testing

```bash
cd frontend

# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

### Backend Testing

```bash
# Run pytest
python -m pytest

# Run with coverage
python -m pytest --cov=. --cov-report=html

# Run specific test file
python -m pytest tests/test_api.py
```

---

## 🚀 Deployment

### Option 1: Traditional Hosting

#### Backend (Heroku/Railway/Render)

```bash
# Install Gunicorn
pip install gunicorn

# Create Procfile
echo "web: gunicorn main:app" > Procfile

# Deploy to platform
# Follow platform-specific instructions
```

#### Frontend (Vercel/Netlify)

```bash
cd frontend

# Build production bundle
npm run build

# Deploy dist/ folder
# Follow platform-specific instructions
```

### Option 2: Docker

```dockerfile
# Dockerfile (create in root)
FROM python:3.13-slim

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Install Node.js and build frontend
RUN apt-get update && apt-get install -y nodejs npm
RUN cd frontend && npm install && npm run build

EXPOSE 5000

CMD ["python", "main.py"]
```

```bash
# Build and run
docker build -t krishi-sakhi .
docker run -p 5000:5000 --env-file .env krishi-sakhi
```

### Environment Variables for Production

```bash
# Update .env for production
FLASK_ENV=production
DEBUG=False
DATABASE_URL=your_production_database_url
SECRET_KEY=your_super_secret_key_here
ALLOWED_ORIGINS=https://yourdomain.com
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- 🐛 **Report Bugs** - Found a bug? Open an issue
- 💡 **Suggest Features** - Have an idea? We'd love to hear it
- 📝 **Improve Documentation** - Help others understand the project
- 💻 **Submit Code** - Fix bugs or add features
- 🌍 **Add Translations** - Help us reach more farmers

### Development Workflow

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Krishi-Sakhi-SIH-25.git
   cd Krishi-Sakhi-SIH-25
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Go to original repository
   - Click "New Pull Request"
   - Describe your changes

### Commit Message Convention

```
feat: new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons, etc
refactor: code restructuring
test: adding tests
chore: maintenance tasks
```

### Code Style Guidelines

**TypeScript/React:**
- Use functional components with hooks
- Use TypeScript for type safety
- Follow Airbnb style guide
- Use meaningful variable names

**Python:**
- Follow PEP 8 style guide
- Use type hints where applicable
- Write docstrings for functions
- Keep functions small and focused

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Krishi Sakhi Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

See [LICENSE](LICENSE) file for full details.

---

## 🙏 Acknowledgments

### Built With

- **React Team** - For the amazing React library
- **Flask Team** - For the lightweight and powerful web framework
- **Google AI** - For Gemini API and advanced AI capabilities
- **GROQ** - For blazing-fast inference with Llama models
- **OpenWeather** - For comprehensive weather data
- **Supabase** - For PostgreSQL hosting and backend services
- **Lucide** - For beautiful, consistent icons
- **Tailwind Labs** - For the excellent CSS framework

### Special Thanks

- **Smart India Hackathon 2025** - For the inspiration and platform
- **Agricultural Research Community** - For domain knowledge and guidance
- **Open Source Community** - For countless libraries and tools
- **Our Team** - For dedication and hard work

### Resources & Inspiration

- [Smart India Hackathon](https://sih.gov.in/)
- [Ministry of Agriculture & Farmers Welfare](https://agricoop.nic.in/)
- [Indian Council of Agricultural Research](https://icar.org.in/)

---

## 📞 Support & Contact

### Getting Help

- 📖 **Documentation** - Read this README thoroughly
- 🐛 **Bug Reports** - [Open an issue](https://github.com/saptarshiroy39/Krishi-Sakhi-SIH-25/issues)
- 💬 **Discussions** - [GitHub Discussions](https://github.com/saptarshiroy39/Krishi-Sakhi-SIH-25/discussions)
- 📧 **Email** - saptarshiroy0039@gmail.com

### Team

- **Saptarshi Roy** - [@saptarshiroy39](https://github.com/saptarshiroy39)
- **Team Members** - [Contributors](https://github.com/saptarshiroy39/Krishi-Sakhi-SIH-25/graphs/contributors)

### Stay Updated

- ⭐ **Star this repo** to stay updated
- 👁️ **Watch** for notifications
- 🍴 **Fork** to contribute

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/saptarshiroy39/Krishi-Sakhi-SIH-25?style=social)
![GitHub forks](https://img.shields.io/github/forks/saptarshiroy39/Krishi-Sakhi-SIH-25?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/saptarshiroy39/Krishi-Sakhi-SIH-25?style=social)

![GitHub issues](https://img.shields.io/github/issues/saptarshiroy39/Krishi-Sakhi-SIH-25)
![GitHub pull requests](https://img.shields.io/github/issues-pr/saptarshiroy39/Krishi-Sakhi-SIH-25)
![GitHub last commit](https://img.shields.io/github/last-commit/saptarshiroy39/Krishi-Sakhi-SIH-25)
![GitHub repo size](https://img.shields.io/github/repo-size/saptarshiroy39/Krishi-Sakhi-SIH-25)

---

<div align="center">

### Made with 💚 for Farmers

**Empowering Agriculture Through Technology**

[⬆ Back to Top](#-krishi-sakhi)

</div>
