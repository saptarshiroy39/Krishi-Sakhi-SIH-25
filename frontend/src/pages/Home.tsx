import React from 'react'
import { Sparkles, Cloud, BarChart3, Leaf, TrendingUp, Calendar } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  const { t } = useLanguage()

  const quickActions = [
    {
      icon: Cloud,
      label: { en: 'Weather Forecast', ml: 'കാലാവസ്ഥ പ്രവചനം' },
      action: 'weather'
    },
    {
      icon: Leaf,
      label: { en: 'Paddy Disease', ml: 'നെല്ല് രോഗങ്ങൾ' },
      action: 'paddy'
    },
    {
      icon: TrendingUp,
      label: { en: 'Organic Fertilizers', ml: 'ഓർഗാനിക് വളങ്ങൾ' },
      action: 'organic'
    }
  ]

  const recentActivities = [
    {
      name: { en: 'Sowing', ml: 'വിത്ത് വിതയൽ' },
      date: '15/07/2024',
      crop: { en: 'Rice', ml: 'നെല്ല്' },
      status: 'completed'
    },
    {
      name: { en: 'Watering', ml: 'നീർ വിളകൽ' },
      date: '16/07/2024',
      crop: { en: 'Wheat', ml: 'ഗോതമ്പ്' },
      status: 'completed'
    },
    {
      name: { en: 'Pest Control', ml: 'കീട നിയന്ത്രണം' },
      date: '18/07/2024',
      crop: { en: 'Rice', ml: 'നെല്ല്' },
      status: 'pending'
    }
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center py-8">
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 bg-primary-500 rounded-full animate-pulse-glow opacity-30"></div>
          <div className="relative bg-primary-500 p-6 rounded-full">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t('heroTitle', { en: 'Welcome to Krishi Sakhi AI', ml: 'കൃഷി സഹായി എഐയിലേക്ക് സ്വാഗതം' })}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
          {t('heroSubtitle', { 
            en: 'I am reviewing your farm\'s profile and past activities to provide the best advice. Feel free to ask me anything about your farm!',
            ml: 'നിങ്ങളുടെ ഫാം പ്രൊഫൈലും പൂർവ്വ പ്രവർത്തനങ്ങളും ഞാൻ വിലയിരുത്തുന്നുണ്ട്. മികച്ച ഉപദേശം ലഭിക്കാൻ എന്തും ചോദിക്കാം!'
          })}
        </p>
        
        {/* Quick Actions */}
        <div className="flex justify-center space-x-4 mb-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <button
                key={index}
                className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 border border-gray-200 dark:border-gray-700"
              >
                <Icon className="w-6 h-6 text-primary-500 mb-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t(`quickAction.${action.action}`, action.label)}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Mini Cards Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card py-4">
          <div className="flex items-center justify-center mb-2">
            <Cloud className="w-6 h-6 text-primary-500" />
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900 dark:text-white">28°C</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t('weather', { en: 'Clear', ml: 'വെയിൽ' })}
            </div>
          </div>
        </div>
        
        <div className="card py-4">
          <div className="flex items-center justify-center mb-2">
            <Leaf className="w-6 h-6 text-primary-500" />
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {t('soil', { en: 'Soil', ml: 'മണ്ണ്' })}
            </div>
          </div>
        </div>
        
        <div className="card py-4">
          <div className="flex items-center justify-center mb-2">
            <BarChart3 className="w-6 h-6 text-primary-500" />
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {t('markets', { en: 'Markets', ml: 'വിപണി' })}
            </div>
          </div>
        </div>
      </div>

      {/* Today's Advisory */}
      <div className="card">
        <div className="flex items-center mb-4">
          <Sparkles className="w-6 h-6 text-primary-500 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('todayAdvisory', { en: 'Today\'s Advisory', ml: 'ഇന്നത്തെ ഉപദേശം' })}
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('advisoryDesc', { 
            en: 'Generate a personalized advisory for your farm.',
            ml: 'നിങ്ങളുടെ കൃഷിക്കായി വ്യക്തിഗതമാക്കിയ ഉപദേശം സൃഷ്ടിക്കുക.'
          })}
        </p>
        <button className="btn-primary">
          <Sparkles className="w-4 h-4 mr-2" />
          {t('getAdvisory', { en: 'Get Advisory', ml: 'ഉപദേശം നേടുക' })}
        </button>
      </div>

      {/* Recent Activities */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-primary-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('recentActivities', { en: 'Recent Activities', ml: 'സമീപകാല പ്രവർത്തനങ്ങൾ' })}
            </h2>
          </div>
          <Link 
            to="/activities"
            className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
          >
            {t('viewAll', { en: 'View All', ml: 'എല്ലാം കാണുക' })}
          </Link>
        </div>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {t(`activity.${activity.name.en.toLowerCase()}`, activity.name)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {t(`crop.${activity.crop.en.toLowerCase()}`, activity.crop)} • {activity.date}
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                activity.status === 'completed' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {t(`status.${activity.status}`, { 
                  en: activity.status === 'completed' ? 'Completed' : 'Pending',
                  ml: activity.status === 'completed' ? 'പൂർത്തിയായി' : 'തീർപ്പാക്കാൻ ബാക്കി'
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Government Schemes */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BarChart3 className="w-6 h-6 text-primary-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('govSchemes', { en: 'Government Schemes', ml: 'സർക്കാർ പദ്ധതികൾ' })}
            </h2>
          </div>
          <Link 
            to="/schemes"
            className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
          >
            {t('viewAll', { en: 'View All', ml: 'എല്ലാം കാണുക' })}
          </Link>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {t('schemesDesc', { 
            en: 'Find relevant government schemes and subsidies.',
            ml: 'പ്രസക്തമായ സർക്കാർ പദ്ധതികളും സബ്‌സിഡികളും കണ്ടെത്തുക.'
          })}
        </p>
      </div>
    </div>
  )
}

export default Home