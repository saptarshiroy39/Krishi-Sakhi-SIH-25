import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { LanguageProvider } from './contexts/LanguageContext.tsx'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import Activities from './pages/Activities.tsx'
import Chat from './pages/Chat.tsx'
import Schemes from './pages/Schemes.tsx'
import Knowledge from './pages/Knowledge.tsx'
import Profile from './pages/Profile.tsx'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/knowledge" element={<Knowledge />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Layout>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App