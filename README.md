# Krishi Sakhi - AI-Powered Agricultural Assistant

A comprehensive AI-powered agricultural assistance platform built with modern web technologies to help farmers make informed decisions about their crops, access government schemes, and get personalized farming advice.

## 🌟 Features

### 🏠 **Smart Dashboard**
- Personalized welcome with AI assistant introduction
- Quick action buttons for common farming tasks
- Real-time weather integration
- Recent activities overview
- Government schemes preview

### 🤖 **AI Chat Assistant**
- Context-aware farming advice
- Multi-language support (English & Malayalam)
- Real-time chat interface
- Farming best practices guidance
- Weather and crop recommendations

### 🌾 **Activity Management**
- Comprehensive farm activity logging
- Activity status tracking (completed/pending)
- Crop-specific activity management
- Historical activity analytics
- Progress monitoring

### 💰 **Government Schemes**
- Comprehensive scheme database
- Detailed eligibility criteria
- Application guidance
- Categorized scheme listings
- Scheme recommendation engine

### 📚 **Knowledge Base**
- Crop calendars and planting guides
- Pest identification and management
- Soil health and testing information
- Irrigation best practices
- Fertilizer application guides
- Weather pattern analysis

## 🏗️ Architecture

### Frontend (Modern React TypeScript)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for lightning-fast development
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router for SPA navigation
- **Icons**: Lucide React for beautiful, consistent icons
- **State Management**: React Context API
- **Responsive**: Mobile-first design approach

### Backend (Flask Python)
- **Framework**: Flask with Blueprint architecture
- **Database**: SQLAlchemy ORM with SQLite
- **API**: RESTful API design
- **CORS**: Cross-origin support for React frontend
- **Migration**: Flask-Migrate for database versioning

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 18 or higher
- **Python**: 3.8 or higher
- **npm** or **yarn**
- **pip**

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/saptarshiroy39/Krishi-Sakhi-SIH-25.git
cd Krishi-Sakhi-SIH-25
```

#### 2. Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Initialize database
python main.py
```

#### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

#### 4. Access the Application
- **Frontend Development**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Legacy Templates**: http://localhost:5000/legacy

## 🎨 Design System

### Color Palette
- **Primary**: Green theme representing agriculture and growth
- **Secondary**: Warm yellow/orange for energy and warmth
- **Neutral**: Sophisticated grays for readability
- **Success/Warning/Error**: Semantic colors for status indication

### Typography
- **Font**: Inter for excellent readability and modern feel
- **Hierarchy**: Well-defined heading and body text scales
- **Responsiveness**: Fluid typography that scales across devices

### Components
- **Cards**: Elevated surfaces with subtle shadows and hover effects
- **Buttons**: Multiple variants (primary, secondary) with consistent styling
- **Navigation**: Bottom navigation for mobile, header for desktop
- **Forms**: Clean input fields with proper focus states

## 📱 Mobile-First Approach

The application is designed with a mobile-first approach, ensuring excellent user experience across all devices:

- **Responsive Grid**: Adaptive layouts that work on any screen size
- **Touch-Friendly**: Large tap targets and gesture support
- **Performance**: Optimized for mobile networks and devices
- **Progressive**: Works offline with service worker (future enhancement)

## 🌐 Internationalization

Built-in support for multiple languages:
- **English**: Default language
- **Malayalam**: Full translation support
- **Extensible**: Easy to add more languages

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development
```bash
python main.py       # Start Flask development server
flask db migrate     # Create database migrations
flask db upgrade     # Apply database migrations
```

### Project Structure
```
Krishi-Sakhi-SIH-25/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React contexts (theme, language)
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility functions
│   │   └── ...
│   ├── public/             # Static assets
│   └── dist/               # Built frontend (production)
├── blueprints/             # Flask blueprints (API modules)
├── templates/              # Legacy Jinja2 templates
├── static/                 # Legacy static files
├── instance/               # SQLite database
├── models.py               # Database models
├── main.py                 # Flask application entry point
└── requirements.txt        # Python dependencies
```

## 🚀 Deployment

### Production Build
```bash
# Build frontend for production
cd frontend
npm run build

# The Flask app will automatically serve the built React app
python main.py
```

### Environment Variables
Create a `.env` file in the root directory:
```env
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///app.db
FLASK_ENV=production
PORT=5000
```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test         # Run tests
npm run test:coverage # Run tests with coverage
```

### Backend Testing
```bash
python -m pytest    # Run Python tests
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices for frontend
- Use Python PEP 8 style guide for backend
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Smart India Hackathon 2025** for the inspiration
- **Agricultural research** community for domain knowledge
- **Open source** libraries and frameworks used in this project

## 📞 Support

For support, email [your-email@example.com] or create an issue in the GitHub repository.

---

**Made with 💚 for farmers and agriculture community**