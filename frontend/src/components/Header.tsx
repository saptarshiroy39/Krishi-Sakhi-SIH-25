import React from 'react'
import { Bell, Sun, Moon, Languages, User } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const { toggleLanguage, t } = useLanguage()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('appTitle', { en: 'Krishi Sakhi', ml: 'കൃഷി സഖി' })}
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {}}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Toggle Theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
          
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Toggle Language"
          >
            <Languages className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <button
            onClick={() => {}}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Profile"
          >
            <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <div className="bg-primary-100 dark:bg-primary-900 px-3 py-2 rounded-lg">
            <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
              <Sun className="w-4 h-4" />
              <span className="text-sm font-medium">28°C</span>
            </div>
            <div className="text-xs text-primary-500 dark:text-primary-500">
              {t('weather', { en: 'Clear', ml: 'വെയിൽ' })}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header