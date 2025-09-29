import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Activity, FileText, Bot, Brain } from 'lucide-react'
import { clsx } from 'clsx'

const BottomNav: React.FC = () => {
  const location = useLocation()

  const navItems = [
    {
      path: '/',
      icon: Home
    },
    {
      path: '/activities',
      icon: Activity
    },
    {
      path: '/chat',
      icon: Bot
    },
    {
      path: '/knowledge',
      icon: Brain
    },
    {
      path: '/schemes',
      icon: FileText
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 px-6 py-4 shadow-2xl z-50">
      <div className="max-w-sm mx-auto">
        <div className="flex justify-between items-center relative">
          {/* Background glow for active item */}
          <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return isActive ? (
                <div 
                  key={item.path}
                  className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-400/10 animate-pulse"
                />
              ) : (
                <div key={item.path} className="w-14 h-14" />
              )
            })}
          </div>
          
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-500 ease-out group',
                  'hover:scale-110 active:scale-95 transform-gpu',
                  isActive 
                    ? 'bg-emerald-500 dark:bg-emerald-600 shadow-emerald-500/30 dark:shadow-emerald-600/30 shadow-lg scale-110' 
                    : 'bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/70 dark:hover:bg-gray-700/70'
                )}
              >
                {/* Icon */}
                <Icon 
                  className={clsx(
                    'transition-all duration-300 ease-out',
                    isActive 
                      ? 'w-6 h-6 text-white dark:text-white drop-shadow-sm' 
                      : 'w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200'
                  )} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                
                {/* Ripple effect on tap */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 rounded-2xl transition-transform duration-150" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default BottomNav