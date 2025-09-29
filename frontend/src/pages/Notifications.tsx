import React, { useState } from 'react'
import { Bell, CheckCircle, AlertCircle, Info, Clock, Trash2, Search } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

interface Notification {
  id: number
  type: 'info' | 'success' | 'warning' | 'error'
  title: { en: string; ml: string }
  message: { en: string; ml: string }
  timestamp: Date
  isRead: boolean
}

const Notifications: React.FC = () => {
  const { t } = useLanguage()
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'success',
      title: { en: 'Weather Alert', ml: 'കാലാവസ്ഥാ മുന്നറിയിപ്പ്' },
      message: { en: 'Perfect weather conditions for planting rice this week', ml: 'ഈ ആഴ്ച നെല്ല് നടാൻ അനുയോജ്യമായ കാലാവസ്ഥ' },
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isRead: false
    },
    {
      id: 2,
      type: 'info',
      title: { en: 'New Scheme Available', ml: 'പുതിയ പദ്ധതി ലഭ്യം' },
      message: { en: 'PM-KISAN scheme benefits are now available for your region', ml: 'PM-KISAN പദ്ധതിയുടെ ആനുകൂല്യങ്ങൾ നിങ്ങളുടെ പ്രദേശത്ത് ലഭ്യമാണ്' },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isRead: true
    },
    {
      id: 3,
      type: 'warning',
      title: { en: 'Pest Alert', ml: 'കീട മുന്നറിയിപ്പ്' },
      message: { en: 'Brown plant hopper detected in nearby farms. Take preventive measures', ml: 'സമീപത്തെ കൃഷിയിടങ്ങളിൽ തവിട്ട് ചാടുന്ന പുഴു കണ്ടെത്തി. പ്രതിരോധ നടപടികൾ സ്വീകരിക്കുക' },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      isRead: false
    },
    {
      id: 4,
      type: 'info',
      title: { en: 'Market Price Update', ml: 'മാർക്കറ്റ് വില അപ്ഡേറ്റ്' },
      message: { en: 'Rice prices increased by 5% in Kochi market', ml: 'കൊച്ചി മാർക്കറ്റിൽ നെല്ലിന്റെ വില 5% വർദ്ധിച്ചു' },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isRead: true
    },
    {
      id: 5,
      type: 'error',
      title: { en: 'Activity Reminder', ml: 'പ്രവർത്തന ഓർമ്മപ്പെടുത്തൽ' },
      message: { en: 'You have 3 pending farming activities scheduled for today', ml: 'ഇന്നത്തേക്ക് ഷെഡ്യൂൾ ചെയ്ത 3 കാർഷിക പ്രവർത്തനങ്ങൾ ബാക്കിയുണ്ട്' },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      isRead: false
    }
  ])

  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000)
    
    if (diffInSeconds < 60) {
      return t('justNow', { en: 'Just now', ml: 'ഇപ്പോൾ തന്നെ' })
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return t('minutesAgo', { en: `${minutes}m ago`, ml: `${minutes} മിനിറ്റ് മുമ്പ്` })
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return t('hoursAgo', { en: `${hours}h ago`, ml: `${hours} മണിക്കൂർ മുമ്പ്` })
    } else {
      const days = Math.floor(diffInSeconds / 86400)
      return t('daysAgo', { en: `${days}d ago`, ml: `${days} ദിവസം മുമ്പ്` })
    }
  }

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const handleToggleSearch = () => {
    setShowSearch(!showSearch)
    if (showSearch) {
      setSearchTerm('')
    }
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  // Filter notifications by search term
  const filteredNotifications = React.useMemo(() => {
    if (!searchTerm) {
      return notifications
    }
    
    return notifications.filter(notification => 
      notification.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.title.ml.includes(searchTerm) ||
      notification.message.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.ml.includes(searchTerm)
    )
  }, [notifications, searchTerm])

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="px-4 py-4 pb-20 max-w-md mx-auto">
        
        {/* Mobile-Optimized Header */}
        <div className="flex items-center justify-between mb-4 sticky top-0 bg-background-light dark:bg-background-dark z-10 py-2">
          <h1 className="text-xl font-bold font-display text-gray-900 dark:text-text-primary">
            {t('notifications', { en: 'Notifications', ml: 'അറിയിപ്പുകൾ' })}
          </h1>
          
          <div className="flex items-center space-x-2">
            {/* Search Icon */}
            <button 
              onClick={handleToggleSearch}
              className={`p-3 rounded-full transition-all duration-200 active:scale-95 ${
                showSearch 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
              }`}
              aria-label={t('search', { en: 'Search', ml: 'തിരയുക' })}
            >
              <Search className="w-5 h-5" strokeWidth={2} />
            </button>

            {/* Mark All Read Button */}
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition-all duration-200 active:scale-95"
                title={t('markAllRead', { en: 'Mark all as read', ml: 'എല്ലാം വായിച്ചതായി അടയാളപ്പെടുത്തുക' })}
              >
                <CheckCircle className="w-5 h-5" strokeWidth={2} />
              </button>
            )}
            
            {/* Clear All Button */}
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="p-3 rounded-full bg-red-500 dark:bg-red-600 text-white transition-all duration-200 active:scale-95"
                title={t('clearAll', { en: 'Clear all', ml: 'എല്ലാം മായ്ക്കുക' })}
              >
                <Trash2 className="w-5 h-5" strokeWidth={2} />
              </button>
            )}
          </div>
        </div>

        {/* Search Input */}
        {showSearch && (
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('searchNotifications', { en: 'Search notifications...', ml: 'അറിയിപ്പുകൾ തിരയുക...' })}
                className="w-full px-4 py-3 pl-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
            </div>
          </div>
        )}

        {/* Content */}
        {filteredNotifications.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary mb-2">
              {t('noNotifications', { en: 'No notifications', ml: 'അറിയിപ്പുകളൊന്നുമില്ല' })}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('noNotificationsDesc', { en: 'You\'re all caught up! Check back later for updates.', ml: 'നിങ്ങൾ എല്ലാം കണ്ടു കഴിഞ്ഞു! അപ്ഡേറ്റുകൾക്കായി പിന്നീട് വീണ്ടും നോക്കുക.' })}
            </p>
          </div>
        ) : (
          /* Notification List */
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-gray-50 dark:bg-background-dark/50 rounded-2xl p-4 active:bg-gray-100 dark:active:bg-background-dark/70"
                onClick={() => !notification.isRead && markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-semibold text-sm ${
                          notification.isRead 
                            ? 'text-gray-900 dark:text-text-primary' 
                            : 'text-primary-900 dark:text-primary-100'
                        }`}>
                          {notification.title.en}
                        </h4>
                        <p className={`text-sm mt-1 ${
                          notification.isRead 
                            ? 'text-gray-600 dark:text-gray-400' 
                            : 'text-primary-800 dark:text-primary-200'
                        }`}>
                          {notification.message.en}
                        </p>
                        
                        {/* Timestamp */}
                        <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{getTimeAgo(notification.timestamp)}</span>
                          {!notification.isRead && (
                            <span className="ml-2 w-2 h-2 bg-primary-500 rounded-full"></span>
                          )}
                        </div>
                      </div>
                      
                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                        className="p-3 text-gray-500 active:text-red-600 dark:text-gray-400 dark:active:text-red-400 active:bg-red-50 dark:active:bg-red-900/20 rounded-xl"
                        title={t('delete', { en: 'Delete', ml: 'ഇല്ലാതാക്കുക' })}
                        aria-label={t('delete', { en: 'Delete', ml: 'ഇല്ലാതാക്കുക' })}
                      >
                        <Trash2 className="w-5 h-5" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications
