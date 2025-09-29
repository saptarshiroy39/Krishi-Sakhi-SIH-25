import React, { useState, useEffect } from 'react'
import { 
  CloudRain, Calendar, RefreshCw, Search,
  Droplets, Wind, Eye, Lightbulb, TrendingUp,
  Sprout, Sun, Clock, BarChart3, Leaf, Zap
} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { API_ENDPOINTS, apiCall } from '../config/api'

interface MarketPrice {
  name: string;
  price: number;
  change: number;
}

interface CropCalendarItem {
  month: string;
  crops: string[];
  activities: string[];
  tips: string;
}

const Knowledge: React.FC = () => {
  const { t } = useLanguage()

  // State management
  const [weatherForecast, setWeatherForecast] = useState<any>(null)
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([])
  const [cropCalendar, setCropCalendar] = useState<CropCalendarItem[]>([])
  const [loading, setLoading] = useState(true)
  const [location] = useState('Kochi')
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Mock crop calendar data (you can replace with API call)
  const mockCropCalendar: CropCalendarItem[] = [
    {
      month: 'January',
      crops: ['Tomato', 'Onion', 'Cabbage', 'Cauliflower'],
      activities: ['Land preparation', 'Sowing', 'Irrigation'],
      tips: 'Perfect time for winter vegetables. Ensure proper drainage.'
    },
    {
      month: 'February', 
      crops: ['Brinjal', 'Okra', 'Chili', 'Cucumber'],
      activities: ['Transplanting', 'Fertilizing', 'Pest control'],
      tips: 'Monitor for early pest attacks. Apply organic fertilizers.'
    },
    {
      month: 'March',
      crops: ['Watermelon', 'Muskmelon', 'Bitter gourd', 'Ridge gourd'],
      activities: ['Summer crop planting', 'Mulching', 'Water management'],
      tips: 'Start summer crops early. Focus on water conservation.'
    },
    {
      month: 'April',
      crops: ['Rice', 'Maize', 'Sugarcane', 'Cotton'],
      activities: ['Pre-monsoon activities', 'Seed treatment', 'Field preparation'],
      tips: 'Prepare for monsoon crops. Check irrigation systems.'
    },
    {
      month: 'May',
      crops: ['Rice', 'Pulses', 'Fodder crops', 'Green manure'],
      activities: ['Nursery preparation', 'Land preparation', 'Organic matter addition'],
      tips: 'Focus on soil health improvement with organic matter.'
    },
    {
      month: 'June',
      crops: ['Rice', 'Maize', 'Pulses', 'Cotton'],
      activities: ['Transplanting', 'Direct seeding', 'Weed management'],
      tips: 'Monsoon planting season. Ensure proper drainage.'
    },
    {
      month: 'July',
      crops: ['Rice', 'Maize', 'Pulses', 'Vegetables'],
      activities: ['Gap filling', 'Top dressing', 'Pest monitoring'],
      tips: 'Critical growth period. Monitor for pests and diseases.'
    },
    {
      month: 'August',
      crops: ['Rice', 'Sugarcane', 'Vegetables', 'Spices'],
      activities: ['Weeding', 'Fertilizer application', 'Disease control'],
      tips: 'Heavy monsoon period. Focus on drainage and disease control.'
    },
    {
      month: 'September',
      crops: ['Post-monsoon vegetables', 'Flowers', 'Spices'],
      activities: ['Harvest preparation', 'Post-monsoon sowing', 'Storage preparation'],
      tips: 'Transition period. Prepare for post-monsoon crops.'
    },
    {
      month: 'October',
      crops: ['Wheat', 'Barley', 'Mustard', 'Peas'],
      activities: ['Rabi crop sowing', 'Harvesting Kharif crops', 'Storage'],
      tips: 'Winter crop planting season. Focus on timely sowing.'
    },
    {
      month: 'November',
      crops: ['Wheat', 'Barley', 'Gram', 'Lentil'],
      activities: ['Irrigation', 'Fertilizer application', 'Pest control'],
      tips: 'Cool season crops. Monitor for late blight and rusts.'
    },
    {
      month: 'December',
      crops: ['Wheat', 'Vegetables', 'Flowers', 'Spices'],
      activities: ['Winter care', 'Harvesting', 'Marketing'],
      tips: 'Harvest season for many crops. Plan for value addition.'
    }
  ]

  // Fetch weather forecast
  const fetchWeatherForecast = async () => {
    try {
      const data = await apiCall(API_ENDPOINTS.HOME_WEATHER(location))
      if (data.success) {
        setWeatherForecast(data.data)
      }
    } catch (error) {
      console.error('Error fetching weather forecast:', error)
    }
  }

  // Fetch market prices 
  const fetchMarketPrices = async () => {
    try {
      const data = await apiCall(API_ENDPOINTS.HOME_DASHBOARD(location))
      if (data.success && data.data.market_prices) {
        setMarketPrices(data.data.market_prices)
      }
    } catch (error) {
      console.error('Error fetching market prices:', error)
    }
  }

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true)
      await Promise.all([
        fetchWeatherForecast(),
        fetchMarketPrices()
      ])
      setCropCalendar(mockCropCalendar)
      setLoading(false)
    }

    initializeData()
  }, [])

  // Handle scroll to weather forecast on page load with hash
  useEffect(() => {
    const scrollToWeatherForecast = () => {
      if (window.location.hash === '#weather-forecast') {
        const element = document.getElementById('weather-forecast')
        if (element) {
          // Scroll with some offset to account for fixed headers
          const elementPosition = element.offsetTop
          const offsetPosition = elementPosition - 80 // 80px offset for better positioning
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }
    }

    if (!loading) {
      // Try scrolling immediately
      scrollToWeatherForecast()
      
      // Also try after a short delay to ensure all content is rendered
      setTimeout(scrollToWeatherForecast, 300)
      
      // And try once more after data might be loaded
      setTimeout(scrollToWeatherForecast, 1000)
    }
  }, [loading])

  // Also handle hash changes while already on the page
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#weather-forecast') {
        const element = document.getElementById('weather-forecast')
        if (element) {
          const elementPosition = element.offsetTop
          const offsetPosition = elementPosition - 80
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Search functionality
  const searchContent = (content: string, term: string): boolean => {
    return content.toLowerCase().includes(term.toLowerCase())
  }

  const getFilteredContent = () => {
    if (!searchTerm.trim()) {
      return {
        showWeather: true,
        showMarketPrices: true,
        showCropCalendar: true,
        showFarmingTips: true
      }
    }

    const term = searchTerm.trim()
    return {
      showWeather: searchContent('weather forecast temperature humidity wind rain', term) ||
                  searchContent('24 hour forecast climate', term),
      showMarketPrices: searchContent('market prices cost rates crops vegetables', term) ||
                       searchContent('price trends buying selling', term),
      showCropCalendar: searchContent('crop calendar monthly planting sowing harvesting', term) ||
                       searchContent('seasonal activities farming tips', term) ||
                       cropCalendar.some(month => 
                         searchContent(month.month, term) ||
                         month.crops.some(crop => searchContent(crop, term)) ||
                         month.activities.some(activity => searchContent(activity, term)) ||
                         searchContent(month.tips, term)
                       ),
      showFarmingTips: searchContent('smart farming tips water management soil health', term) ||
                      searchContent('irrigation organic drip seasonal planning', term)
    }
  }

  const filteredContent = getFilteredContent()

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-primary-500 animate-spin mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">
            {t('loadingKnowledge', { en: 'Loading knowledge base...', ml: 'വിജ്ഞാന ശേഖരം ലോഡ് ചെയ്യുന്നു...' })}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-md mx-auto">
        <div className="px-4 py-6 pb-20 space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sticky top-0 bg-background-light dark:bg-background-dark z-10 py-2">
            <h1 className="text-xl font-bold font-display text-gray-900 dark:text-text-primary">
              {t('knowledgeBase', { en: 'Knowledge Base', ml: 'വിജ্ഞാન ശേഖരം' })}
            </h1>
            
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className={`p-3 rounded-full transition-all duration-200 active:scale-95 ${
                  showSearch 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                }`}
                aria-label={t('search', { en: 'Search', ml: 'തിരയുക' })}
              >
                <Search className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Search Bar - Conditional */}
          {showSearch && (
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('searchKnowledge', { en: 'Search knowledge base...', ml: 'വിജ്ഞാന ശേഖരത്തിൽ തിരയുക...' })}
                  className="w-full px-4 py-3 pl-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
              </div>
            </div>
          )}

          {/* 24-Hour Weather Forecast */}
          {filteredContent.showWeather && (
          <div id="weather-forecast" className="bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30 rounded-2xl p-6 border-2 border-sky-200 dark:border-sky-800">
            <div className="flex items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
                  <CloudRain className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-sky-900 dark:text-sky-100">
                  {t('weatherForecast', { en: '24-Hour Forecast', ml: '24 മണിക്കൂർ പ്രവചനം' })}
                </h2>
              </div>
            </div>

            {weatherForecast ? (
              <div className="space-y-4">
                {/* Current Weather Card */}
                <div className="bg-white/70 dark:bg-sky-900/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-sky-700 dark:text-sky-300 mb-1">
                        {t('currentWeather', { en: 'Current Weather', ml: 'നിലവിലെ കാലാവസ്ഥ' })}
                      </p>
                      <p className="text-2xl font-bold text-sky-900 dark:text-sky-100">
                        {weatherForecast.current?.temperature || 'N/A'}°C
                      </p>
                      <p className="text-sm text-sky-600 dark:text-sky-400">
                        {t('feelsLike', { en: 'Feels like', ml: 'അനുഭവപ്പെടുന്നത്' })} {weatherForecast.current?.feels_like || 'N/A'}°C
                      </p>
                    </div>
                    <div className="text-center">
                      <img 
                        src={`https://openweathermap.org/img/wn/${weatherForecast.current?.icon || '01d'}.png`}
                        alt="Weather"
                        className="w-16 h-16 mx-auto"
                      />
                      <p className="text-xs text-sky-700 dark:text-sky-300">
                        {weatherForecast.current?.description || 'Clear'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Weather Details */}
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-sky-200 dark:border-sky-700">
                    <div className="text-center">
                      <Droplets className="w-4 h-4 text-sky-500 mx-auto mb-1" />
                      <p className="text-xs text-sky-700 dark:text-sky-300">
                        {t('humidity', { en: 'Humidity', ml: 'ഈർപ്പം' })}
                      </p>
                      <p className="text-sm font-semibold text-sky-900 dark:text-sky-100">
                        {weatherForecast.current?.humidity || 'N/A'}%
                      </p>
                    </div>
                    <div className="text-center">
                      <Wind className="w-4 h-4 text-sky-500 mx-auto mb-1" />
                      <p className="text-xs text-sky-700 dark:text-sky-300">
                        {t('windSpeed', { en: 'Wind', ml: 'കാറ്റ്' })}
                      </p>
                      <p className="text-sm font-semibold text-sky-900 dark:text-sky-100">
                        {weatherForecast.current?.wind_speed || 'N/A'} m/s
                      </p>
                    </div>
                    <div className="text-center">
                      <Eye className="w-4 h-4 text-sky-500 mx-auto mb-1" />
                      <p className="text-xs text-sky-700 dark:text-sky-300">
                        {t('visibility', { en: 'Visibility', ml: 'ദൃശ്യത' })}
                      </p>
                      <p className="text-sm font-semibold text-sky-900 dark:text-sky-100">
                        {weatherForecast.current?.visibility || 'N/A'} km
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hourly Forecast Cards */}
                <div className="grid grid-cols-4 gap-3 overflow-x-auto">
                  {weatherForecast.forecast?.slice(0, 8).map((hour: any, index: number) => (
                    <div key={index} className="bg-white/70 dark:bg-sky-900/30 rounded-lg p-3 text-center min-w-[80px]">
                      <p className="text-xs text-sky-700 dark:text-sky-300 mb-1">
                        {hour.time}
                      </p>
                      <img 
                        src={`https://openweathermap.org/img/wn/${hour.icon}.png`}
                        alt="Weather"
                        className="w-8 h-8 mx-auto mb-1"
                      />
                      <p className="text-sm font-bold text-sky-900 dark:text-sky-100">
                        {hour.temperature}°
                      </p>
                      <p className="text-xs text-sky-600 dark:text-sky-400">
                        {hour.humidity}%
                      </p>
                    </div>
                  )) || (
                    <div className="col-span-4 text-center py-4">
                      <p className="text-sky-600 dark:text-sky-400">
                        {t('forecastNotAvailable', { en: 'Forecast data not available', ml: 'പ്രവചന ഡാറ്റ ലഭ്യമല്ല' })}
                      </p>
                    </div>
                  )}
                </div>

                {/* Weather Insights */}
                {weatherForecast.insights && (
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                          {t('farmingInsight', { en: 'Farming Insight', ml: 'കൃഷി ഉൾക്കാഴ്ച' })}
                        </h4>
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                          {weatherForecast.insights}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="w-5 h-5 text-sky-500 animate-spin mr-2" />
                <span className="text-sky-600 dark:text-sky-400">
                  {t('loadingWeather', { en: 'Loading weather data...', ml: 'കാലാവസ്ഥാ ഡാറ്റ ലോഡ് ചെയ്യുന്നു...' })}
                </span>
              </div>
            )}
          </div>
          )}

          {/* Market Prices */}
          {filteredContent.showMarketPrices && (
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border-2 border-green-200 dark:border-green-700">
            <div className="flex items-center mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold font-display text-gray-900 dark:text-text-primary">
                  {t('marketPrices', { en: 'Market Prices', ml: 'വിപണി വിലകൾ' })}
                </h2>
              </div>
            </div>

            {marketPrices && marketPrices.length > 0 ? (
              <div className="space-y-3">
                {marketPrices.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-text-primary">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-text-secondary">
                          {t('perKg', { en: 'per kg', ml: 'കിലോയ്ക്ക്' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900 dark:text-text-primary">
                        ₹{item.price}
                      </p>
                      <p className={`text-sm flex items-center ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.change >= 0 ? '+' : ''}{item.change}%
                        <TrendingUp className={`w-3 h-3 ml-1 ${item.change < 0 ? 'rotate-180' : ''}`} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="w-5 h-5 text-gray-500 animate-spin mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  {t('loadingPrices', { en: 'Loading market prices...', ml: 'വിപണി വിലകൾ ലോഡ് ചെയ്യുന്നു...' })}
                </span>
              </div>
            )}
          </div>
          )}

          {/* Crop Calendar */}
          {filteredContent.showCropCalendar && (
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-700">
            <div className="flex items-center mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold font-display text-gray-900 dark:text-text-primary">
                  {t('cropCalendar', { en: 'Crop Calendar', ml: 'വിള കലണ്ടർ' })}
                </h2>
              </div>
            </div>

            {/* Month Selector */}
            <div className="mb-4">
              <div className="grid grid-cols-4 gap-2">
                {months.map((month, index) => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth(index)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                      selectedMonth === index
                        ? 'bg-purple-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {month.substring(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Month Details */}
            {cropCalendar[selectedMonth] && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2 flex items-center">
                    <Sprout className="w-4 h-4 mr-2" />
                    {cropCalendar[selectedMonth].month} - {t('recommendedCrops', { en: 'Recommended Crops', ml: 'ശുപാർശ ചെയ്യുന്ന വിളകൾ' })}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cropCalendar[selectedMonth].crops.map((crop, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-full text-xs">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {t('keyActivities', { en: 'Key Activities', ml: 'പ്രധാന പ്രവർത്തനങ്ങൾ' })}
                  </h4>
                  <ul className="space-y-1">
                    {cropCalendar[selectedMonth].activities.map((activity, index) => (
                      <li key={index} className="text-sm text-blue-800 dark:text-blue-200 flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    {t('expertTip', { en: 'Expert Tip', ml: 'വിദഗ്ധ ഉപദേശം' })}
                  </h4>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    {cropCalendar[selectedMonth].tips}
                  </p>
                </div>
              </div>
            )}
          </div>
          )}

          {/* Smart Farming Tips */}
          {filteredContent.showFarmingTips && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border-2 border-green-200 dark:border-green-800">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-green-900 dark:text-green-100 ml-3">
                {t('smartFarmingTips', { en: 'Smart Farming Tips', ml: 'സ്മാർട്ട് കൃഷി ടിപ്പുകൾ' })}
              </h2>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/70 dark:bg-green-900/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    <Droplets className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                      {t('waterManagement', { en: 'Water Management', ml: 'ജല പരിപാലനം' })}
                    </h4>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      {t('waterTip', { en: 'Use drip irrigation to save 30-50% water while improving crop yield.', ml: 'വിള വിളവ് മെച്ചപ്പെടുത്തുമ്പോൾ 30-50% വെള്ളം ലാഭിക്കാൻ ഡ്രിപ്പ് ജലസേചനം ഉപയോഗിക്കുക.' })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-green-900/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                      {t('soilHealth', { en: 'Soil Health', ml: 'മണ്ണിന്റെ ആരോഗ്യം' })}
                    </h4>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      {t('soilTip', { en: 'Test soil pH regularly and add organic matter to improve soil structure.', ml: 'മണ്ണിന്റെ pH പതിവായി പരിശോധിക്കുകയും മണ്ണിന്റെ ഘടന മെച്ചപ്പെടുത്താൻ ജൈവവസ്തുക്കൾ ചേർക്കുകയും ചെയ്യുക.' })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-green-900/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    <Sun className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                      {t('seasonalPlanning', { en: 'Seasonal Planning', ml: 'സീസണൽ ആസൂത്രണം' })}
                    </h4>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      {t('seasonTip', { en: 'Plan crop rotation based on seasonal weather patterns for maximum yield.', ml: 'പരമാവധി വിളവിനായി സീസണൽ കാലാവസ്ഥാ പാറ്റേണുകളെ അടിസ്ഥാനമാക്കി വിള മാറ്റി കൃഷി ആസൂത്രണം ചെയ്യുക.' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* No Search Results */}
          {searchTerm.trim() && !filteredContent.showWeather && !filteredContent.showMarketPrices && !filteredContent.showCropCalendar && !filteredContent.showFarmingTips && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {t('noSearchResults', { en: 'No results found', ml: 'ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല' })}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {t('tryDifferentSearch', { en: 'Try searching for weather, prices, crops, or farming tips', ml: 'കാലാവസ്ഥ, വിലകൾ, വിളകൾ, അല്ലെങ്കിൽ കൃഷി ടിപ്പുകൾക്കായി തിരയാൻ ശ്രമിക്കുക' })}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Knowledge
