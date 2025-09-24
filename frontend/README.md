# Krishi Sakhi Frontend

A modern React TypeScript frontend for the Krishi Sakhi AI farming assistant application, built with Vite, Tailwind CSS, and TypeScript.

## Features

- 🌱 **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- 🎨 **Beautiful UI**: Clean, responsive design with dark/light mode
- 🌐 **Multilingual**: Support for English and Malayalam
- 📱 **Mobile-First**: Responsive design optimized for mobile devices
- ⚡ **Fast**: Built with Vite for lightning-fast development
- 🎯 **Type-Safe**: Full TypeScript support for better development experience

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Header.tsx     # App header with navigation
│   ├── BottomNav.tsx  # Bottom navigation bar
│   └── Layout.tsx     # Main layout wrapper
├── contexts/          # React contexts
│   ├── ThemeContext.tsx    # Theme management
│   └── LanguageContext.tsx # Language management
├── pages/             # Page components
│   ├── Home.tsx       # Dashboard/home page
│   ├── Activities.tsx # Farm activities log
│   ├── Chat.tsx       # AI chat interface
│   ├── Schemes.tsx    # Government schemes
│   └── Knowledge.tsx  # Knowledge base
├── lib/               # Utility functions
│   └── utils.ts       # Common utilities
├── App.tsx            # Main app component
├── main.tsx          # App entry point
└── index.css         # Global styles
```

## Features Overview

### 🏠 Dashboard (Home)
- Welcome section with AI assistant introduction
- Quick action buttons for common tasks
- Weather and farm status overview
- Recent activities summary
- Government schemes preview

### 🌾 Activities
- Comprehensive farm activity logging
- Activity status tracking (completed/pending)
- Crop-specific activity management
- Historical activity view

### 🤖 AI Chat
- Interactive chat with AI farming assistant
- Context-aware responses
- Support for farming queries
- Real-time messaging interface

### 💰 Government Schemes
- Browse available government schemes
- Detailed scheme information
- Eligibility and application guidance
- Categorized scheme listing

### 📚 Knowledge Base
- Comprehensive farming resources
- Crop calendars and guides
- Pest management information
- Soil health and irrigation guides
- Weather pattern insights

## Technology Stack

- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Lucide React**: Beautiful, customizable icons
- **ESLint**: Code linting and formatting

## Customization

### Theme System
The app supports light and dark themes with automatic system preference detection. Theme state is persisted in localStorage.

### Language Support
Built-in support for English and Malayalam with easy extensibility for additional languages.

### Styling
Uses Tailwind CSS with custom color palette and animations. Modify `tailwind.config.js` to customize the design system.

## Backend Integration

The frontend is designed to work with the Flask backend API. Update the proxy configuration in `vite.config.ts` to match your backend URL:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000', // Your Flask backend URL
      changeOrigin: true
    }
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.