import React from 'react'
import { BookOpen, Calendar, Bug, Leaf, Droplets, Beaker, Cloud } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Knowledge: React.FC = () => {
  const { t } = useLanguage()

  const knowledgeCategories = [
    {
      id: 1,
      title: { en: 'Crop Calendar', ml: 'വിള കലണ്ടർ' },
      description: { 
        en: 'Seasonal planting and harvesting schedules for optimal crop yield.',
        ml: 'മികച്ച വിള വിളവിനായുള്ള സീസണൽ നടീൽ, വിളവെടുപ്പ് ഷെഡ്യൂളുകൾ.'
      },
      icon: Calendar,
      action: { en: 'View Calendar', ml: 'കലണ്ടർ കാണുക' }
    },
    {
      id: 2,
      title: { en: 'Pest Management', ml: 'കീട നിയന്ത്രണം' },
      description: { 
        en: 'Identify and manage common pests that affect your crops.',
        ml: 'നിങ്ങളുടെ വിളകളെ ബാധിക്കുന്ന സാധാരണ കീടങ്ങളെ തിരിച്ചറിയുകയും നിയന്ത്രിക്കുകയും ചെയ്യുക.'
      },
      icon: Bug,
      action: { en: 'Learn More', ml: 'കൂടുതൽ അറിയുക' }
    },
    {
      id: 3,
      title: { en: 'Soil Health', ml: 'മണ്ണിന്റെ ആരോഗ്യം' },
      description: { 
        en: 'Understanding soil types, testing, and improvement techniques.',
        ml: 'മണ്ണിന്റെ തരങ്ങൾ, പരിശോധന, മെച്ചപ്പെടുത്തൽ സാങ്കേതികതകൾ എന്നിവ മനസ്സിലാക്കുക.'
      },
      icon: Leaf,
      action: { en: 'Soil Guide', ml: 'മണ്ണ് ഗൈഡ്' }
    },
    {
      id: 4,
      title: { en: 'Irrigation', ml: 'ജലസേചനം' },
      description: { 
        en: 'Water management and efficient irrigation practices.',
        ml: 'ജല മാനേജ്മെന്റും കാര്യക്ഷമമായ ജലസേചന രീതികളും.'
      },
      icon: Droplets,
      action: { en: 'Water Guide', ml: 'വെള്ള ഗൈഡ്' }
    },
    {
      id: 5,
      title: { en: 'Fertilizers', ml: 'വളങ്ങൾ' },
      description: { 
        en: 'Types of fertilizers and application methods for different crops.',
        ml: 'വിവിധ വിളകൾക്കുള്ള വളങ്ങളുടെ തരങ്ങളും പ്രയോഗ രീതികളും.'
      },
      icon: Beaker,
      action: { en: 'Fertilizer Guide', ml: 'വള ഗൈഡ്' }
    },
    {
      id: 6,
      title: { en: 'Weather Patterns', ml: 'കാലാവസ്ഥാ പാറ്റേണുകൾ' },
      description: { 
        en: 'Understanding weather impacts on farming and adaptation strategies.',
        ml: 'കൃഷിയിൽ കാലാവസ്ഥയുടെ സ്വാധീനവും അനുകൂല തന്ത്രങ്ങളും മനസ്സിലാക്കുക.'
      },
      icon: Cloud,
      action: { en: 'Weather Info', ml: 'കാലാവസ്ഥാ വിവരങ്ങൾ' }
    }
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center mb-6">
        <BookOpen className="w-8 h-8 text-primary-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('knowledgeBase', { en: 'Knowledge Base', ml: 'അറിവിന്റെ കലവറ' })}
        </h1>
      </div>

      <div className="card">
        <div className="flex items-center mb-6">
          <BookOpen className="w-6 h-6 text-primary-500 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('farmingResources', { en: 'Farming Resources', ml: 'കാർഷിക വിഭവങ്ങൾ' })}
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {t('resourcesDescription', { 
            en: 'Access a wealth of information on local crop calendars, pest data, best practices, and more.',
            ml: 'പ്രാദേശിക വിള കലണ്ടറുകൾ, കീട ഡാറ്റ, മികച്ച സമ്പ്രദായങ്ങൾ എന്നിവയെക്കുറിച്ചുള്ള ഒരുപാട് വിവരങ്ങൾ ആക്സസ് ചെയ്യുക.'
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {knowledgeCategories.map((category) => {
          const Icon = category.icon
          return (
            <div key={category.id} className="card hover:shadow-xl transition-all duration-300 group">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t(`knowledge.${category.id}.title`, category.title)}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t(`knowledge.${category.id}.description`, category.description)}
                </p>
                
                <button className="btn-primary group-hover:bg-primary-700 transition-colors duration-300">
                  {t(`knowledge.${category.id}.action`, category.action)}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t('customAdvice', { en: 'Need Custom Advice?', ml: 'കസ്റ്റം ഉപദേശം വേണോ?' })}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('customAdviceDescription', { 
              en: 'Our AI assistant can provide personalized farming advice based on your specific needs.',
              ml: 'നിങ്ങളുടെ പ്രത്യേക ആവശ്യങ്ങൾ അടിസ്ഥാനമാക്കി വ്യക്തിഗതമാക്കിയ കാർഷിക ഉപദേശം ഞങ്ങളുടെ AI അസിസ്റ്റന്റിന് നൽകാൻ കഴിയും.'
            })}
          </p>
          <button className="btn-primary">
            <BookOpen className="w-4 h-4 mr-2" />
            {t('askAI', { en: 'Ask AI Assistant', ml: 'AI അസിസ്റ്റന്റിനോട് ചോദിക്കുക' })}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Knowledge