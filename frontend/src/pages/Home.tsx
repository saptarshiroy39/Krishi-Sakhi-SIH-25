import React, { useState, useEffect } from 'react'
import { 
  Sparkles, CloudRain, Calendar, Building2, BookOpen,
  RefreshCw, Thermometer, Droplets, Wind, MapPin, Zap, ChevronRight, User, Wheat, Cloud, TrendingUp
} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { Link } from 'react-router-dom'
import { API_ENDPOINTS, apiCall } from '../config/api'





interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  wind_speed: number;
  icon: string;
  feels_like: number;
  location: string;
}

interface DashboardStats {
  total_crops: number;
  active_tasks: number;
  upcoming_activities: number;
  weather_alerts: number;
  recent_activities_count: number;
}

interface DashboardData {
  weather: WeatherData | null;
  advisory: string;
  stats: DashboardStats;
  last_updated: string;
}

const Home: React.FC = () => {
  const { t } = useLanguage()

  // State management
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState('Kochi')
  const [userName, setUserName] = useState('Ramesh')
  const [pendingActivities, setPendingActivities] = useState(0)
  const [totalFarms, setTotalFarms] = useState(0)
  const [isGeneratingAdvisory, setIsGeneratingAdvisory] = useState(false)
  const [isGeneratingStats, setIsGeneratingStats] = useState(false)

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      console.log('Fetching dashboard data for location:', location)
      const data = await apiCall(API_ENDPOINTS.HOME_DASHBOARD(location))
      console.log('Dashboard data received:', data)
      
      if (data.success) {
        console.log('Setting dashboard data with weather:', data.data.weather)
        setDashboardData(data.data)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  // Fetch activities data
  const fetchActivitiesData = async () => {
    try {
      const data = await apiCall(API_ENDPOINTS.ACTIVITIES)
      if (data.success) {
        const pending = data.data.filter((activity: any) => activity.status === 'pending').length
        setPendingActivities(pending)
      }
    } catch (error) {
      console.error('Error fetching activities data:', error)
      setPendingActivities(0)
    }
  }

  // Fetch profile data (for user name, location, and farms count)
  const fetchProfileData = async () => {
    try {
      const data = await apiCall(API_ENDPOINTS.PROFILE_BY_ID(1))
      console.log('Profile API response:', data)
      
      if (data.success) {
        // Update user name
        if (data.name) {
          setUserName(data.name)
        }
        
        // Update location
        if (data.location || data.city) {
          setLocation(data.location || data.city)
        }
        
        // Update farms count
        if (data.farms) {
          setTotalFarms(data.farms.length)
        }
      }
    } catch (error) {
      console.error('Error fetching profile data:', error)
      // Keep default values on error
      setUserName('Ramesh Kumar')
      setLocation('Kochi')
      setTotalFarms(0)
    }
  }



  // Generate advisory
  const generateAdvisory = async () => {
    setIsGeneratingAdvisory(true)
    try {
      const data = await apiCall(API_ENDPOINTS.HOME_ADVISORY_REGENERATE, {
        method: 'POST',
        body: JSON.stringify({ location })
      })
      
      if (data.success && dashboardData) {
        setDashboardData({
          ...dashboardData,
          advisory: data.data.advisory,
          last_updated: data.data.generated_at
        })
      }
    } catch (error) {
      console.error('Error generating advisory:', error)
    } finally {
      setIsGeneratingAdvisory(false)
    }
  }

  // Generate statistics
  const generateStatistics = async () => {
    setIsGeneratingStats(true)
    try {
      await fetchDashboardData()
    } catch (error) {
      console.error('Error generating statistics:', error)
    } finally {
      setIsGeneratingStats(false)
    }
  }



  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      // First fetch profile data (which includes location)
      await fetchProfileData()
      // Then fetch other data
      await Promise.all([
        fetchDashboardData(),
        fetchActivitiesData()
      ])
      setLoading(false)
    }
    
    loadData()
  }, [])

  // Refresh dashboard data when location changes
  useEffect(() => {
    if (location !== 'Kochi') { // Only refetch if location actually changed
      fetchDashboardData()
    }
  }, [location])





  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-primary-500 animate-spin mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">
            {t('loadingDashboard', { en: 'Loading dashboard...', ml: 'ഡാഷ്ബോർഡ് ലോഡ് ചെയ്യുന്നു...' })}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-20">
      <div className="px-4 py-6 space-y-6 max-w-md mx-auto">
        {/* Header */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card">
          <div className="flex flex-col space-y-3">
            <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-text-primary">
              {t('welcome', { en: `Welcome, ${userName}`, ml: `സ്വാഗതം, ${userName}` })}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-gray-600 dark:text-text-secondary text-sm">
                  {location}
                </span>
              </div>
              <div className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse mr-2"></span>
                <span className="text-primary-600 dark:text-primary-400 text-xs font-medium">Live</span>
              </div>
            </div>
          </div>
        </div>



        {/* Weather Widget - Full Width */}
        <Link
          to="/knowledge#weather-forecast"
          className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-6 rounded-2xl shadow-card hover:shadow-elevated transition-all duration-400 hover:-translate-y-0.5 text-left border border-blue-200 dark:border-blue-800 block"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
              <Cloud className="w-6 h-6 text-blue-500 dark:text-blue-400" />
              {t('weather', { en: 'Weather', ml: 'കാലാവസ്ഥ' })}
            </h2>
            <ChevronRight className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          </div>
          
          {dashboardData?.weather ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-100/50 dark:bg-blue-800/30 rounded-lg">
                <Thermometer className="w-8 h-8 text-red-500 dark:text-red-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{dashboardData.weather.temperature}°C</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">Temperature</p>
              </div>
              
              <div className="text-center p-3 bg-blue-100/50 dark:bg-blue-800/30 rounded-lg">
                <Droplets className="w-8 h-8 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{dashboardData.weather.humidity}%</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">Humidity</p>
              </div>
              
              <div className="text-center p-3 bg-blue-100/50 dark:bg-blue-800/30 rounded-lg">
                <Wind className="w-8 h-8 text-green-500 dark:text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{dashboardData.weather.wind_speed} m/s</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">Wind Speed</p>
              </div>
              
              <div className="text-center p-3 bg-blue-100/50 dark:bg-blue-800/30 rounded-lg">
                <img 
                  src={`https://openweathermap.org/img/wn/${dashboardData.weather.icon}@2x.png`}
                  alt="Weather"
                  className="w-8 h-8 mx-auto mb-2"
                />
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 capitalize">{dashboardData.weather.description}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Condition</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Cloud className="w-12 h-12 text-blue-400 dark:text-blue-300 mx-auto mb-2" />
              <p className="text-blue-600 dark:text-blue-300">Loading weather data...</p>
            </div>
          )}
        </Link>

        {/* Activities and Farms Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Activities Card */}
          <Link
            to="/activities"
            className="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-card hover:shadow-elevated transition-all duration-400 hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-3">
              <User className="w-5 h-5 text-green-600 dark:text-green-400" strokeWidth={2} />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-text-primary text-sm mb-1">
              {t('activities', { en: 'Activities', ml: 'പ്രവർത്തനങ്ങൾ' })}
            </h3>
            <p className="text-gray-600 dark:text-text-secondary text-xs mb-2">
              {t('manageFarmActivities', { en: 'Manage farm activities', ml: 'കൃഷി പ്രവർത്തനങ്ങൾ നിയന്ത്രിക്കുക' })}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {pendingActivities}
              </span>
              <span className="text-xs text-green-600 dark:text-green-400">
                {t('pending', { en: 'Pending', ml: 'കാത്തിരിക്കുന്ന' })}
              </span>
            </div>
          </Link>

          {/* Farms Card */}
          <Link
            to="/profile"
            className="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-card hover:shadow-elevated transition-all duration-400 hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mb-3">
              <Wheat className="w-5 h-5 text-amber-600 dark:text-amber-400" strokeWidth={2} />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-text-primary text-sm mb-1">
              {t('farms', { en: 'Farms', ml: 'കൃഷിയിടങ്ങൾ' })}
            </h3>
            <p className="text-gray-600 dark:text-text-secondary text-xs mb-2">
              {t('viewFarmDetails', { en: 'View farm details', ml: 'കൃഷി വിവരങ്ങൾ കാണുക' })}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                {totalFarms}
              </span>
              <span className="text-xs text-amber-600 dark:text-amber-400">
                {t('total', { en: 'Total', ml: 'ആകെ' })}
              </span>
            </div>
          </Link>
        </div>

        {/* AI-Powered Advisory Card */}
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-surface-dark/60 dark:to-surface-dark/50 rounded-2xl p-6 shadow-card border border-primary-200 dark:border-primary-900">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-400 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <h2 className="text-lg font-semibold font-display text-gray-900 dark:text-text-primary">
                {t('aiAdvisory', { en: "AI Farming Advisory", ml: 'AI കൃഷി ഉപദേശം' })}
              </h2>
            </div>
            <button
              onClick={generateAdvisory}
              disabled={isGeneratingAdvisory}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 dark:disabled:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
            >
              {isGeneratingAdvisory ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {t('generating', { en: 'Generating...', ml: 'സൃഷ്ടിക്കുന്നു...' })}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {t('generate', { en: 'Generate', ml: 'സൃഷ്ടിക്കുക' })}
                </>
              )}
            </button>
          </div>
          
          {dashboardData?.advisory ? (
            <div className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-4 border border-primary-100 dark:border-primary-900">
              <div className="text-gray-700 dark:text-gray-300">
                <div className="space-y-3">
                  {dashboardData.advisory.split('\n').map((line: string, index: number) => (
                    line.trim() && (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm leading-relaxed">{line.trim()}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-primary-100 dark:border-primary-800">
                <div className="flex items-center text-xs text-primary-600 dark:text-primary-400">
                  <Sparkles className="w-3 h-3 mr-1" />
                  <span>{t('poweredByAI', { en: 'Powered by AI', ml: 'AI പവർഡ്' })}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(dashboardData.last_updated).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-4 text-center border border-primary-100 dark:border-primary-900">
              <Zap className="w-12 h-12 text-primary-400 mx-auto mb-3" />
              <p className="text-primary-600 dark:text-primary-400 font-medium">
                {t('clickToGenerate', { en: 'Click Generate to get AI farming advisory', ml: 'AI കൃഷി ഉപദേശം ലഭിക്കാൻ ജനറേറ്റ് ക്ലിക്ക് ചെയ്യൂ' })}
              </p>
            </div>
          )}
        </div>



        {/* Farm Statistics */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold font-display text-gray-900 dark:text-text-primary">
                {t('farmStats', { en: 'Farm Statistics', ml: 'ഫാം സ്ഥിതിവിവരക്കണക്കുകൾ' })}
              </h2>
            </div>
            <button
              onClick={generateStatistics}
              disabled={isGeneratingStats}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 dark:disabled:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
            >
              {isGeneratingStats ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {t('generating', { en: 'Generating...', ml: 'സൃഷ്ടിക്കുന്നു...' })}
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  {t('generate', { en: 'Generate', ml: 'സൃഷ്ടിക്കുക' })}
                </>
              )}
            </button>
          </div>

          {dashboardData?.stats ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                      {dashboardData.stats.total_crops}
                    </p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      {t('totalCrops', { en: 'Total Crops', ml: 'മൊത്തം വിളകൾ' })}
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {dashboardData.stats.active_tasks}
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {t('activeTasks', { en: 'Active Tasks', ml: 'സജീവ ജോലികൾ' })}
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                      {dashboardData.stats.upcoming_activities}
                    </p>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      {t('upcomingActivities', { en: 'Upcoming', ml: 'വരാനിരിക്കുന്നവ' })}
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-xl p-4 border border-red-200 dark:border-red-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                      {dashboardData.stats.weather_alerts}
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {t('weatherAlerts', { en: 'Weather Alerts', ml: 'കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ' })}
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <CloudRain className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <TrendingUp className="w-12 h-12 text-emerald-400 dark:text-emerald-300 mx-auto mb-3" />
              <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                {t('clickToGenerateStats', { en: 'Click Generate to view farm statistics', ml: 'ഫാം സ്ഥിതിവിവരക്കണക്കുകൾ കാണാൻ ജനറേറ്റ് ക്ലിക്ക് ചെയ്യൂ' })}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Home