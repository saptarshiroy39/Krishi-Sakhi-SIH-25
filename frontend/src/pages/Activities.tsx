import React from 'react'
import { Sprout, Calendar, CheckCircle, Clock } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Activities: React.FC = () => {
  const { t } = useLanguage()

  const activities = [
    {
      id: 1,
      name: { en: 'Sowing', ml: 'വിത്ത് വിതയൽ' },
      date: '15/07/2024',
      crop: { en: 'Rice', ml: 'നെല്ല്' },
      status: 'completed'
    },
    {
      id: 2,
      name: { en: 'Watering', ml: 'നീർ വിളകൽ' },
      date: '16/07/2024',
      crop: { en: 'Wheat', ml: 'ഗോതമ്പ്' },
      status: 'completed'
    },
    {
      id: 3,
      name: { en: 'Pest Control', ml: 'കീട നിയന്ത്രണം' },
      date: '18/07/2024',
      crop: { en: 'Rice', ml: 'നെല്ല്' },
      status: 'completed'
    },
    {
      id: 4,
      name: { en: 'Fertilizing', ml: 'വളപ്രയോഗം' },
      date: '20/07/2024',
      crop: { en: 'Wheat', ml: 'ഗോതമ്പ്' },
      status: 'pending'
    },
    {
      id: 5,
      name: { en: 'Harvesting', ml: 'വിളവെടുപ്പ്' },
      date: '25/07/2024',
      crop: { en: 'Rice', ml: 'നെല്ല്' },
      status: 'pending'
    }
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center mb-6">
        <Sprout className="w-8 h-8 text-primary-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('allActivities', { en: 'All Activities', ml: 'എല്ലാ പ്രവർത്തനങ്ങളും' })}
        </h1>
      </div>

      <div className="card">
        <div className="flex items-center mb-6">
          <Calendar className="w-6 h-6 text-primary-500 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('farmActivitiesLog', { en: 'Farm Activities Log', ml: 'കാർഷിക പ്രവർത്തന രേഖ' })}
          </h2>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  activity.status === 'completed' 
                    ? 'bg-green-100 dark:bg-green-900' 
                    : 'bg-yellow-100 dark:bg-yellow-900'
                }`}>
                  {activity.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  )}
                </div>
                
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {t(`activity.${activity.name.en.toLowerCase()}`, activity.name)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {t(`crop.${activity.crop.en.toLowerCase()}`, activity.crop)} • {activity.date}
                  </div>
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
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

        <div className="mt-6 text-center">
          <button className="btn-primary">
            <Sprout className="w-4 h-4 mr-2" />
            {t('addActivity', { en: 'Add New Activity', ml: 'പുതിയ പ്രവർത്തനം ചേർക്കുക' })}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Activities