import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Sprout, MessageSquare, Wallet, BookOpen } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { clsx } from 'clsx'

const BottomNav: React.FC = () => {
  const location = useLocation()
  const { t } = useLanguage()

  const navItems = [
    {
      path: '/',
      icon: Home,
      label: { en: 'Home', ml: 'ഹോം' }
    },
    {
      path: '/activities',
      icon: Sprout,
      label: { en: 'Activities', ml: 'പ്രവർത്തനങ്ങൾ' }
    },
    {
      path: '/chat',
      icon: MessageSquare,
      label: { en: 'AI Chat', ml: 'എഐ ചാറ്റ്' }
    },
    {
      path: '/schemes',
      icon: Wallet,
      label: { en: 'Schemes', ml: 'പദ്ധതികൾ' }
    },
    {
      path: '/knowledge',
      icon: BookOpen,
      label: { en: 'Knowledge', ml: 'അറിവ്' }
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
      <div className="max-w-4xl mx-auto flex justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'nav-item flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200',
                isActive && 'active'
              )}
            >
              <Icon className={clsx(
                'w-5 h-5 mb-1',
                isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'
              )} />
              <span className={clsx(
                'text-xs font-medium',
                isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'
              )}>
                {t(`nav.${item.path.slice(1) || 'home'}`, item.label)}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav