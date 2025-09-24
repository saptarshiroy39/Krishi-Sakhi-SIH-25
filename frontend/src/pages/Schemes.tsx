import React from 'react'
import { Wallet, ArrowRight, DollarSign, Shield, Leaf, CreditCard } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Schemes: React.FC = () => {
  const { t } = useLanguage()

  const schemes = [
    {
      id: 1,
      name: { en: 'PM-KISAN Samman Nidhi', ml: 'പിഎം-കിസാൻ സമ്മാൻ നിധി' },
      description: { 
        en: 'Direct income support to all landholding farmers\' families. ₹6,000 per year in three installments.',
        ml: 'എല്ലാ ഭൂവുടമസ്ഥ കർഷക കുടുംബങ്ങൾക്കും നേരിട്ടുള്ള വരുമാന പിന്തുണ. മൂന്ന് ഗഡുകളായി വർഷത്തിൽ ₹6,000.'
      },
      tag: { en: 'Income Support', ml: 'വരുമാന പിന്തുണ' },
      icon: DollarSign
    },
    {
      id: 2,
      name: { en: 'Pradhan Mantri Fasal Bima Yojana', ml: 'പ്രധാനമന്ത്രി ഫസൽ ബീമ യോജന' },
      description: { 
        en: 'Crop insurance scheme providing financial support to farmers suffering crop loss/damage.',
        ml: 'വിള നഷ്ടം/കേടുപാടുകൾ അനുഭവിക്കുന്ന കർഷകർക്ക് സാമ്പത്തിക പിന്തുണ നൽകുന്ന വിള ഇൻഷുറൻസ് പദ്ധതി.'
      },
      tag: { en: 'Insurance', ml: 'ഇൻഷുറൻസ്' },
      icon: Shield
    },
    {
      id: 3,
      name: { en: 'Soil Health Card Scheme', ml: 'മണ്ണ് ആരോഗ്യ കാർഡ് പദ്ധതി' },
      description: { 
        en: 'Promotes soil testing and provides soil health cards to farmers for better crop planning.',
        ml: 'മണ്ണ് പരിശോധനയെ പ്രോത്സാഹിപ്പിക്കുകയും മികച്ച വിള ആസൂത്രണത്തിനായി കർഷകർക്ക് മണ്ണ് ആരോഗ്യ കാർഡുകൾ നൽകുകയും ചെയ്യുന്നു.'
      },
      tag: { en: 'Soil Testing', ml: 'മണ്ണ് പരിശോധന' },
      icon: Leaf
    },
    {
      id: 4,
      name: { en: 'PM Kisan Credit Card', ml: 'പിഎം കിസാൻ ക്രെഡിറ്റ് കാർഡ്' },
      description: { 
        en: 'Provides farmers with timely access to credit for their production needs.',
        ml: 'കർഷകർക്ക് അവരുടെ ഉൽപ്പാദന ആവശ്യങ്ങൾക്കായി സമയബന്ധിത വായ്പാ സൗകര്യം നൽകുന്നു.'
      },
      tag: { en: 'Credit', ml: 'വായ്പ' },
      icon: CreditCard
    }
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center mb-6">
        <Wallet className="w-8 h-8 text-primary-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('governmentSchemes', { en: 'Government Schemes', ml: 'സർക്കാർ പദ്ധതികൾ' })}
        </h1>
      </div>

      <div className="card">
        <div className="flex items-center mb-6">
          <Wallet className="w-6 h-6 text-primary-500 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('availableSchemes', { en: 'Available Schemes', ml: 'ലഭ്യമായ പദ്ധതികൾ' })}
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {t('schemesDescription', { 
            en: 'Find information about various government schemes and subsidies available for farmers.',
            ml: 'കർഷകർക്ക് ലഭ്യമായ വിവിധ സർക്കാർ പദ്ധതികളെയും സബ്സിഡികളെയും കുറിച്ചുള്ള വിവരങ്ങൾ കണ്ടെത്തുക.'
          })}
        </p>
      </div>

      <div className="space-y-4">
        {schemes.map((scheme) => {
          const Icon = scheme.icon
          return (
            <div key={scheme.id} className="card hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <Icon className="w-6 h-6 text-primary-500 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t(`scheme.${scheme.id}.name`, scheme.name)}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t(`scheme.${scheme.id}.description`, scheme.description)}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                      {t(`scheme.${scheme.id}.tag`, scheme.tag)}
                    </span>
                    
                    <button className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors">
                      <span className="mr-2">
                        {t('learnMore', { en: 'Learn More', ml: 'കൂടുതൽ അറിയുക' })}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t('needHelp', { en: 'Need Help?', ml: 'സഹായം വേണോ?' })}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('helpDescription', { 
              en: 'Our AI assistant can help you find the most suitable schemes for your farm.',
              ml: 'നിങ്ങളുടെ കൃഷിക്ക് ഏറ്റവും അനുയോജ്യമായ പദ്ധതികൾ കണ്ടെത്താൻ ഞങ്ങളുടെ AI അസിസ്റ്റന്റിന് സഹായിക്കാനാകും.'
            })}
          </p>
          <button className="btn-primary">
            <Wallet className="w-4 h-4 mr-2" />
            {t('findSchemes', { en: 'Find Suitable Schemes', ml: 'അനുയോജ്യമായ പദ്ധതികൾ കണ്ടെത്തുക' })}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Schemes