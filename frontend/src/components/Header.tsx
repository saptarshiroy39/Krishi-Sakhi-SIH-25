import React from 'react'
import { Link } from 'react-router-dom'
import { Bell, Sun, Moon, Globe, User } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const { toggleLanguage, t } = useLanguage()

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm" 
      style={{ 
        paddingTop: 'env(safe-area-inset-top, 0px)', // Add padding for mobile notch/status bar
        width: '100%'
      }}>
      <div className="px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-white font-bold text-xl">🌱</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold font-display text-gray-900 dark:text-white">
                Krishi<span className="text-emerald-500">Sakhi</span>
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">Agricultural Assistant</p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-lg font-bold font-display text-gray-900 dark:text-white">
                Krishi<span className="text-emerald-500">Sakhi</span>
              </h1>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <button className="relative p-2.5 text-gray-500 dark:text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-2xl transition-all duration-300 active:scale-95 group">
              <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" strokeWidth={2} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-2xl transition-all duration-300 active:scale-95 group"
              aria-label={t('toggleTheme', { en: 'Toggle theme', ml: 'തീം മാറ്റുക' })}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" strokeWidth={2} />
              ) : (
                <Sun className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" strokeWidth={2} />
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-2xl transition-all duration-300 active:scale-95 group"
              aria-label={t('toggleLanguage', { en: 'Toggle language', ml: 'ഭാഷ മാറ്റുക' })}
            >
              <Globe className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" strokeWidth={2} />
            </button>

            {/* User Profile */}
            <div className="flex items-center ml-1">
              <Link 
                to="/profile"
                className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 p-2 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all duration-300 active:scale-95 group"
              >
                <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" strokeWidth={2} />
                </div>
                <span className="hidden sm:block text-white font-medium text-sm pr-1">Ramesh</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header