import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Activities from './pages/Activities'
import Chat from './pages/Chat'
import Schemes from './pages/Schemes'
import Knowledge from './pages/Knowledge'

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
            </Routes>
          </Layout>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App