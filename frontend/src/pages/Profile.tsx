import React, { useState, useEffect } from 'react'
import { 
  User, Phone, MapPin, Edit2, Save,
  Wheat, Trees, Heart, Droplets, Mountain, 
  Calendar, CheckCircle, Activity,
  Mail, Trash2, X, Plus, Search, RefreshCw, ChevronDown, ChevronUp
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext'
import { API_ENDPOINTS, apiCall } from '../config/api'

// Kerala Districts
const KERALA_DISTRICTS = [
  'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 
  'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 
  'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'
]

interface FarmerProfile {
  id: number
  name: string
  phone_number: string
  email?: string
  village_town?: string
  district?: string
  experience_years?: number
  profile_image?: string
  occupation?: string
  farm_type?: string
}

interface FarmData {
  id: number
  size: number
  location: string
  crops: string[]
  livestock: string[]
  irrigation_system?: string
  soil_type?: string
  water_source?: string
  farm_status?: string
  organic_certified?: boolean
  established_year?: number
}



const Profile: React.FC = () => {
  const { t } = useLanguage()
  
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showAddFarm, setShowAddFarm] = useState(false)
  const [showEditFarm, setShowEditFarm] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showMoreDetails, setShowMoreDetails] = useState<{[key: number]: boolean}>({})
  const [newFarmData, setNewFarmData] = useState({
    size: 0,
    location: '',
    crops: '',
    livestock: '',
    irrigation_system: '',
    soil_type: '',
    water_source: '',
    farm_status: '',
    organic_certified: false,
    established_year: new Date().getFullYear()
  })
  const [editFarmData, setEditFarmData] = useState({
    id: 0,
    size: 0,
    location: '',
    crops: '',
    livestock: '',
    irrigation_system: '',
    soil_type: '',
    water_source: '',
    farm_status: '',
    organic_certified: false,
    established_year: new Date().getFullYear()
  })
  const [profileData, setProfileData] = useState<FarmerProfile>({
    id: 1,
    name: 'Ramesh Kumar',
    phone_number: '+91 98765 43210',
    email: 'ramesh.kumar@email.com',
    village_town: 'Kattappana',
    district: 'Idukki',
    profile_image: '',
    farm_type: 'Mixed Farming'
  })
  
  const [farmData, setFarmData] = useState<FarmData[]>([])

  const fetchProfileData = async () => {
    try {
      const data = await apiCall(API_ENDPOINTS.PROFILE_BY_ID(1))
      setProfileData(data.farmer)
      setFarmData(data.farms)
    } catch (error) {
      console.error('Error fetching profile data:', error)
      // Use default data if API fails
      setFarmData([
        {
          id: 1,
          size: 2.5,
          location: 'Kattappana, Idukki',
          crops: ['Cardamom', 'Pepper', 'Coffee'],
          livestock: ['Cows', 'Goats'],
          irrigation_system: 'Drip Irrigation',
          soil_type: 'Loamy Soil',
          water_source: 'Borewell',
          farm_status: 'Active',
          organic_certified: true,
          established_year: 2015
        }
      ])
    }
  }

  useEffect(() => {
    fetchProfileData().finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    console.log('handleSave called, isEditing:', isEditing)
    console.log('profileData:', profileData)
    
    try {
      // Validate required fields
      if (!profileData.name.trim()) {
        alert(t('nameRequired', { en: 'Name is required', ml: 'പേര് ആവശ്യമാണ്' }))
        return
      }
      
      if (!profileData.phone_number.trim()) {
        alert(t('phoneRequired', { en: 'Phone number is required', ml: 'ഫോൺ നമ്പർ ആവശ്യമാണ്' }))
        return
      }

      const updateData = {
        name: profileData.name.trim(),
        phone_number: profileData.phone_number.trim(),
        email: profileData.email?.trim() || null,
        village_town: profileData.village_town?.trim() || null,
        district: profileData.district || null,
        experience_years: profileData.experience_years || 0,
        occupation: profileData.occupation?.trim() || null,
        farm_type: profileData.farm_type || null
      }

      // Optimistic update - switch to view mode immediately for better UX
      setIsEditing(false)
      
      console.log('Sending update data:', updateData)
      console.log('API endpoint:', API_ENDPOINTS.PROFILE_BY_ID(profileData.id))

      // Make API call in background without blocking UI
      apiCall(API_ENDPOINTS.PROFILE_BY_ID(profileData.id), {
        method: 'PUT',
        body: JSON.stringify(updateData)
      })
      .then(() => {
        console.log('Profile updated via API successfully')
      })
      .catch((apiError) => {
        console.warn('API call failed:', apiError)
        // If API fails, you could show a subtle notification or retry logic here
      })
      
      console.log('Profile save completed (UI updated, API call in progress)')
      
    } catch (error) {
      console.error('Error updating profile:', error)
      alert(t('updateError', { en: 'Error updating profile. Please try again.', ml: 'പ്രൊഫൈൽ അപ്ഡേറ്റ് ചെയ്യുന്നതിൽ പിശക്. വീണ്ടും ശ്രമിക്കുക.' }))
    }
  }

  const handleInputChange = (field: keyof FarmerProfile, value: string | number) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }



  const toggleFarmDetails = (farmId: number) => {
    setShowMoreDetails(prev => ({
      ...prev,
      [farmId]: !prev[farmId]
    }))
  }

  const handleFarmEdit = (farmId: number) => {
    const farm = farmData.find(f => f.id === farmId)
    if (farm) {
      setEditFarmData({
        id: farm.id,
        size: farm.size,
        location: farm.location,
        crops: farm.crops.join(', '),
        livestock: farm.livestock.join(', '),
        irrigation_system: farm.irrigation_system || '',
        soil_type: farm.soil_type || '',
        water_source: farm.water_source || '',
        farm_status: farm.farm_status || '',
        organic_certified: farm.organic_certified || false,
        established_year: farm.established_year || new Date().getFullYear()
      })
      setShowEditFarm(true)
    }
  }



  const handleEditFarmSubmit = async () => {
    try {
      const crops = editFarmData.crops.split(',').map(crop => crop.trim()).filter(crop => crop.length > 0)
      const livestock = editFarmData.livestock.split(',').map(animal => animal.trim()).filter(animal => animal.length > 0)

      await apiCall(API_ENDPOINTS.FARM_BY_ID(editFarmData.id), {
        method: 'PUT',
        body: JSON.stringify({
          size: editFarmData.size,
          location: editFarmData.location,
          crops: crops,
          livestock: livestock,
          irrigation_system: editFarmData.irrigation_system,
          soil_type: editFarmData.soil_type,
          water_source: editFarmData.water_source,
          farm_status: editFarmData.farm_status,
          organic_certified: editFarmData.organic_certified,
          established_year: editFarmData.established_year
        })
      })

      // Update local state
      setFarmData(prev => prev.map(farm =>
        farm.id === editFarmData.id
          ? {
              ...farm,
              size: editFarmData.size,
              location: editFarmData.location,
              crops,
              livestock,
              irrigation_system: editFarmData.irrigation_system,
              soil_type: editFarmData.soil_type,
              water_source: editFarmData.water_source,
              farm_status: editFarmData.farm_status,
              organic_certified: editFarmData.organic_certified,
              established_year: editFarmData.established_year
            }
          : farm
      ))
      setShowEditFarm(false)
      setEditFarmData({
        id: 0,
        size: 0,
        location: '',
        crops: '',
        livestock: '',
        irrigation_system: '',
        soil_type: '',
        water_source: '',
        farm_status: '',
        organic_certified: false,
        established_year: new Date().getFullYear()
      })
      console.log('Farm updated successfully')
    } catch (error) {
      console.error('Error updating farm:', error)
    }
  }

  const handleFarmDelete = async (farmId: number) => {
    console.log('Delete farm called for ID:', farmId)
    
    // Show confirmation dialog
    const confirmed = confirm(t('confirmDeleteFarm', { 
      en: 'Are you sure you want to delete this farm?', 
      ml: 'ഈ ഫാം ഇല്ലാതാക്കാൻ നിങ്ങൾക്ക് ഉറപ്പാണോ?' 
    }))
    
    if (!confirmed) {
      console.log('Farm deletion cancelled by user')
      return
    }

    try {
      // Optimistic update - remove from UI immediately
      setFarmData(prev => prev.filter(farm => farm.id !== farmId))
      console.log('Farm removed from UI, making API call...')
      
      // Make API call in background
      apiCall(API_ENDPOINTS.FARM_BY_ID(farmId), {
        method: 'DELETE'
      })
      .then(() => {
        console.log('Farm deleted via API successfully')
      })
      .catch((error) => {
        console.error('Error deleting farm via API:', error)
        // If API fails, you could restore the farm or show error message
      })
      
    } catch (error) {
      console.error('Error in delete handler:', error)
    }
  }



  const handleAddFarm = async () => {
    try {
      await apiCall(API_ENDPOINTS.FARM, {
        method: 'POST',
        body: JSON.stringify({
          farmer_id: profileData.id,
          size: newFarmData.size,
          location: newFarmData.location
        })
      })
        // Add to local state (simplified for demo)
        const newFarm: FarmData = {
          id: Date.now(), // Temporary ID
          size: newFarmData.size,
          location: newFarmData.location,
          crops: newFarmData.crops.split(',').map(c => c.trim()).filter(c => c),
          livestock: newFarmData.livestock.split(',').map(l => l.trim()).filter(l => l),
          irrigation_system: newFarmData.irrigation_system || undefined,
          soil_type: newFarmData.soil_type || undefined,
          water_source: newFarmData.water_source || undefined,
          farm_status: newFarmData.farm_status || undefined,
          organic_certified: newFarmData.organic_certified,
          established_year: newFarmData.established_year || undefined
        }
        
        setFarmData(prev => [...prev, newFarm])
        setShowAddFarm(false)
        setNewFarmData({ 
          size: 0, 
          location: '', 
          crops: '', 
          livestock: '',
          irrigation_system: '',
          soil_type: '',
          water_source: '',
          farm_status: '',
          organic_certified: false,
          established_year: new Date().getFullYear()
        })
        console.log('Farm added successfully')
    } catch (error) {
      console.error('Error adding farm:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-primary-500 animate-spin mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">
            {t('loadingProfile', { en: 'Loading profile...', ml: 'പ്രൊഫൈൽ ലോഡ് ചെയ്യുന്നു...' })}
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
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold font-display text-gray-900 dark:text-text-primary">
              {t('profile', { en: 'Profile', ml: 'പ്രൊഫൈൽ' })}
            </h1>
            
            <button
              onClick={(e) => {
                e.preventDefault()
                console.log('Button clicked, isEditing:', isEditing)
                if (isEditing) {
                  handleSave()
                } else {
                  setIsEditing(true)
                }
              }}
              className={`p-3 rounded-full transition-all duration-200 active:scale-95 ${
                isEditing 
                  ? 'bg-primary-500 text-white hover:bg-primary-600' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {isEditing ? (
                <Save className="w-5 h-5" strokeWidth={2} />
              ) : (
                <Edit2 className="w-5 h-5" strokeWidth={2} />
              )}
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-surface-dark/60 dark:to-surface-dark/50 rounded-2xl p-6 shadow-card border border-primary-200 dark:border-primary-900 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-primary-400 rounded-2xl flex items-center justify-center shadow-card overflow-hidden">
                  {profileData.profile_image ? (
                    <img 
                      src={profileData.profile_image} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-white" strokeWidth={2} />
                  )}
                </div>
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-white/50 dark:bg-gray-800/50 border border-primary-300 dark:border-primary-700 rounded-xl px-3 py-2 text-gray-900 dark:text-text-primary font-bold text-lg w-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <h2 className="text-lg font-bold text-gray-900 dark:text-text-primary">{profileData.name}</h2>
                )}
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" strokeWidth={2} />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {profileData.village_town}{profileData.district ? `, ${profileData.district}` : ''}
                  </span>
                </div>
              </div>
            </div>


          </div>

          {/* Personal Information */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary mb-4 flex items-center">
              <User className="w-5 h-5 text-primary-500 mr-2" />
              {t('personalInfo', { en: 'Personal Information', ml: 'വ്യക്തിഗത വിവരങ്ങൾ' })}
            </h3>
            
            <div className="space-y-4">
              {/* Phone Number */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {t('phoneNumber', { en: 'Phone Number', ml: 'ഫോൺ നമ്പർ' })}
                  </p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone_number}
                      onChange={(e) => handleInputChange('phone_number', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="font-medium text-gray-900 dark:text-text-primary">{profileData.phone_number}</p>
                  )}
                </div>
              </div>
              
              {/* Email Address */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600 dark:text-green-400" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {t('emailAddress', { en: 'Email Address', ml: 'ഇമെയിൽ വിലാസം' })}
                  </p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={t('emailPlaceholder', { en: 'Enter your email', ml: 'നിങ്ങളുടെ ഇമെയിൽ നൽകുക' })}
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="font-medium text-gray-900 dark:text-text-primary">{profileData.email || 'Not provided'}</p>
                  )}
                </div>
              </div>

              {/* Village/Town */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {t('villageTown', { en: 'Village/Town', ml: 'ഗ്രാമം/പട്ടണം' })}
                  </p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.village_town || ''}
                      onChange={(e) => handleInputChange('village_town', e.target.value)}
                      placeholder={t('villagePlaceholder', { en: 'Enter village or town', ml: 'ഗ്രാമം അല്ലെങ്കിൽ പട്ടണം നൽകുക' })}
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="font-medium text-gray-900 dark:text-text-primary">{profileData.village_town || 'Not provided'}</p>
                  )}
                </div>
              </div>

              {/* District */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {t('district', { en: 'District', ml: 'ജില്ല' })}
                  </p>
                  {isEditing ? (
                    <select
                      value={profileData.district || ''}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">{t('selectDistrict', { en: 'Select District', ml: 'ജില്ല തിരഞ്ഞെടുക്കുക' })}</option>
                      {KERALA_DISTRICTS.map((district) => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="font-medium text-gray-900 dark:text-text-primary">{profileData.district || 'Not provided'}</p>
                  )}
                </div>
              </div>




            </div>
          </div>

          {/* Farm Information */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary flex items-center">
                <Trees className="w-5 h-5 text-primary-500 mr-2" />
                {t('farmDetails', { en: 'Farm Details', ml: 'ഫാം വിശദാംശങ്ങൾ' })}
              </h3>
              
              <div className="flex items-center space-x-2">
                {/* Search Button */}
                <button 
                  onClick={() => setShowSearch(!showSearch)}
                  className={`p-3 rounded-full transition-all duration-200 active:scale-95 ${
                    showSearch 
                      ? 'bg-primary-500 text-white hover:bg-primary-600' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <Search className="w-5 h-5" strokeWidth={2} />
                </button>
                {/* Add Farm Button */}
                <button 
                  onClick={() => setShowAddFarm(true)}
                  className="bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full transition-all duration-200 active:scale-95"
                >
                  <Plus className="w-5 h-5" strokeWidth={2} />
                </button>
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
                    placeholder={t('searchFarms', { en: 'Search farms...', ml: 'ഫാമുകൾ തിരയുക...' })}
                    className="w-full px-4 py-3 pl-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
                </div>
              </div>
            )}
            
            {/* Farm Cards */}
            <div className="space-y-3">
              {farmData.filter(farm => {
                if (!searchTerm) return true;
                const lowerSearchTerm = searchTerm.toLowerCase();
                return (
                  farm.location.toLowerCase().includes(lowerSearchTerm) ||
                  farm.crops.some(crop => crop.toLowerCase().includes(lowerSearchTerm)) ||
                  farm.livestock.some(animal => animal.toLowerCase().includes(lowerSearchTerm)) ||
                  `farm ${farm.id}`.toLowerCase().includes(lowerSearchTerm)
                );
              }).map((farm) => (
                <div key={farm.id} className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  {/* Farm Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-text-primary text-lg">
                        {t('farm', { en: 'Farm', ml: 'ഫാം' })} {farm.id}
                      </h4>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{farm.location}</span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-xs font-medium">
                          <Trees className="w-3 h-3 mr-1" />
                          {farm.size} {t('acres', { en: 'acres', ml: 'ഏക്കർ' })}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleFarmEdit(farm.id)}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" strokeWidth={2} />
                      </button>
                      <button
                        onClick={() => handleFarmDelete(farm.id)}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Production Section */}
                  <div className="mb-4">
                    <div className="grid grid-cols-1 gap-3">
                      {/* Crops */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Wheat className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('crops', { en: 'Crops', ml: 'വിളകൾ' })}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 ml-6">
                          {farm.crops.length > 0 ? farm.crops.map((crop, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs">
                              {crop}
                            </span>
                          )) : (
                            <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                              {t('noCrops', { en: 'No crops added', ml: 'വിളകൾ ചേർത്തിട്ടില്ല' })}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Livestock */}
                      {farm.livestock.length > 0 && (
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Heart className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t('livestock', { en: 'Livestock', ml: 'കന്നുകാലികൾ' })}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 ml-6">
                            {farm.livestock.map((animal, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs">
                                {animal}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Show More Button */}
                  <div className="border-t border-green-200 dark:border-green-700 pt-3">
                    <button
                      onClick={() => toggleFarmDetails(farm.id)}
                      className="flex items-center justify-center w-full py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <span className="mr-2">
                        {showMoreDetails[farm.id] ? 
                          t('showLess', { en: 'Show Less', ml: 'കുറച്ചു കാണിക്കുക' }) : 
                          t('showMore', { en: 'Show More', ml: 'കൂടുതൽ കാണിക്കുക' })
                        }
                      </span>
                      {showMoreDetails[farm.id] ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      }
                    </button>
                    
                    {/* Collapsible Farm Details */}
                    {showMoreDetails[farm.id] && (
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        {/* Irrigation System */}
                        {farm.irrigation_system && (
                          <div className="flex items-center space-x-1">
                            <Droplets className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                            <span className="text-gray-600 dark:text-gray-400 truncate">{farm.irrigation_system}</span>
                          </div>
                        )}

                        {/* Soil Type */}
                        {farm.soil_type && (
                          <div className="flex items-center space-x-1">
                            <Mountain className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                            <span className="text-gray-600 dark:text-gray-400 truncate">{farm.soil_type}</span>
                          </div>
                        )}

                        {/* Water Source */}
                        {farm.water_source && (
                          <div className="flex items-center space-x-1">
                            <Droplets className="w-3 h-3 text-blue-500 dark:text-blue-400" />
                            <span className="text-gray-600 dark:text-gray-400 truncate">{farm.water_source}</span>
                          </div>
                        )}

                        {/* Organic Certification */}
                        {farm.organic_certified !== undefined && (
                          <div className="flex items-center space-x-1">
                            <CheckCircle className={`w-3 h-3 ${farm.organic_certified ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`} />
                            <span className="text-gray-600 dark:text-gray-400">
                              {farm.organic_certified ? t('organic', { en: 'Organic', ml: 'ജൈവ' }) : t('conventional', { en: 'Conventional', ml: 'പരമ്പരാഗത' })}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {farmData.length === 0 && (
                <div className="text-center py-8">
                  <Trees className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('noFarms', { en: 'No farms added yet', ml: 'ഇതുവരെ ഫാമുകൾ ചേർത്തിട്ടില്ല' })}
                  </p>
                  <button
                    onClick={() => setShowAddFarm(true)}
                    className="mt-3 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    {t('addFirstFarm', { en: 'Add your first farm', ml: 'നിങ്ങളുടെ ആദ്യത്തെ ഫാം ചേർക്കുക' })}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Add Farm Modal */}
          {showAddFarm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold font-display text-gray-900 dark:text-text-primary">
                    {t('addNewFarm', { en: 'Add New Farm', ml: 'പുതിയ ഫാം ചേർക്കുക' })}
                  </h3>
                  <button
                    onClick={() => setShowAddFarm(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                      {t('farmLocation', { en: 'Farm Location', ml: 'ഫാം സ്ഥലം' })}
                    </label>
                    <input
                      type="text"
                      value={newFarmData.location}
                      onChange={(e) => setNewFarmData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder={t('locationPlaceholder', { en: 'e.g., Kattappana, Idukki', ml: 'ഉദാ: കട്ടപ്പന, ഇടുക്കി' })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                      {t('farmSize', { en: 'Farm Size (acres)', ml: 'ഫാം വലുപ്പം (ഏക്കർ)' })}
                    </label>
                    <input
                      type="number"
                      value={newFarmData.size || ''}
                      onChange={(e) => setNewFarmData(prev => ({ ...prev, size: parseFloat(e.target.value) || 0 }))}
                      placeholder="2.5"
                      step="0.1"
                      min="0"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                      {t('crops', { en: 'Crops (comma separated)', ml: 'വിളകൾ (കോമയാൽ വേർതിരിച്ച്)' })}
                    </label>
                    <input
                      type="text"
                      value={newFarmData.crops}
                      onChange={(e) => setNewFarmData(prev => ({ ...prev, crops: e.target.value }))}
                      placeholder={t('cropsPlaceholder', { en: 'e.g., Rice, Wheat, Corn', ml: 'ഉദാ: നെല്ല്, ഗോതമ്പ്, ചോളം' })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                      {t('livestock', { en: 'Livestock (comma separated)', ml: 'കന്നുകാലികൾ (കോമയാൽ വേർതിരിച്ച്)' })}
                    </label>
                    <input
                      type="text"
                      value={newFarmData.livestock}
                      onChange={(e) => setNewFarmData(prev => ({ ...prev, livestock: e.target.value }))}
                      placeholder={t('livestockPlaceholder', { en: 'e.g., Cows, Goats, Chickens', ml: 'ഉദാ: പശു, ആട്, കോഴി' })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors"
                    />
                  </div>

                  {/* Row 1: Irrigation System & Soil Type */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                        {t('irrigationSystem', { en: 'Irrigation System', ml: 'ജലസേചന സംവിധാനം' })}
                      </label>
                      <select
                        value={newFarmData.irrigation_system}
                        onChange={(e) => setNewFarmData(prev => ({ ...prev, irrigation_system: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzY5NzA4RCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')] bg-no-repeat bg-[position:right_12px_center] pr-10"
                      >
                        <option value="">{t('selectIrrigation', { en: 'Select Irrigation System', ml: 'ജലസേചന സംവിധാനം തിരഞ്ഞെടുക്കുക' })}</option>
                        <option value="Drip Irrigation">{t('dripIrrigation', { en: 'Drip Irrigation', ml: 'ഡ്രിപ് ജലസേചനം' })}</option>
                        <option value="Sprinkler Irrigation">{t('sprinklerIrrigation', { en: 'Sprinkler Irrigation', ml: 'സ്പ്രിങ്ക്ലർ ജലസേചനം' })}</option>
                        <option value="Flood Irrigation">{t('floodIrrigation', { en: 'Flood Irrigation', ml: 'വെള്ളപ്പൊക്ക ജലസേചനം' })}</option>
                        <option value="Rain Fed">{t('rainFed', { en: 'Rain Fed', ml: 'മഴ നിർഭര' })}</option>
                        <option value="Manual Watering">{t('manualWatering', { en: 'Manual Watering', ml: 'കൈകൊണ്ട് നനയ്ക്കൽ' })}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                        {t('soilType', { en: 'Soil Type', ml: 'മണ്ണിന്റെ തരം' })}
                      </label>
                      <select
                        value={newFarmData.soil_type}
                        onChange={(e) => setNewFarmData(prev => ({ ...prev, soil_type: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzY5NzA4RCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')] bg-no-repeat bg-[position:right_12px_center] pr-10"
                      >
                        <option value="">{t('selectSoilType', { en: 'Select Soil Type', ml: 'മണ്ണിന്റെ തരം തിരഞ്ഞെടുക്കുക' })}</option>
                        <option value="Loamy Soil">{t('loamySoil', { en: 'Loamy Soil', ml: 'കളിമണ്ണ്' })}</option>
                        <option value="Clay Soil">{t('claySoil', { en: 'Clay Soil', ml: 'കളിമൺ' })}</option>
                        <option value="Sandy Soil">{t('sandySoil', { en: 'Sandy Soil', ml: 'മണൽമണ്ണ്' })}</option>
                        <option value="Silt Soil">{t('siltSoil', { en: 'Silt Soil', ml: 'സിൽറ്റ് മണ്ണ്' })}</option>
                        <option value="Red Soil">{t('redSoil', { en: 'Red Soil', ml: 'ചുവന്ന മണ്ണ്' })}</option>
                        <option value="Black Soil">{t('blackSoil', { en: 'Black Soil', ml: 'കറുത്ത മണ്ണ്' })}</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Water Source & Organic Certification */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                        {t('waterSource', { en: 'Water Source', ml: 'ജലസ്രോതസ്സ്' })}
                      </label>
                      <select
                        value={newFarmData.water_source}
                        onChange={(e) => setNewFarmData(prev => ({ ...prev, water_source: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzY5NzA4RCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')] bg-no-repeat bg-[position:right_12px_center] pr-10"
                      >
                        <option value="">{t('selectWaterSource', { en: 'Select Water Source', ml: 'ജലസ്രോതസ്സ് തിരഞ്ഞെടുക്കുക' })}</option>
                        <option value="Borewell">{t('borewell', { en: 'Borewell', ml: 'ബോർവെൽ' })}</option>
                        <option value="Well">{t('well', { en: 'Well', ml: 'കിണർ' })}</option>
                        <option value="River">{t('river', { en: 'River', ml: 'നദി' })}</option>
                        <option value="Pond">{t('pond', { en: 'Pond', ml: 'കുളം' })}</option>
                        <option value="Canal">{t('canal', { en: 'Canal', ml: 'കനാൽ' })}</option>
                        <option value="Rainwater">{t('rainwater', { en: 'Rainwater', ml: 'മഴവെള്ളം' })}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                        {t('organicCertified', { en: 'Organic Certification', ml: 'ജൈവ സർട്ടിഫിക്കേഷൻ' })}
                      </label>
                      <select
                        value={newFarmData.organic_certified.toString()}
                        onChange={(e) => setNewFarmData(prev => ({ ...prev, organic_certified: e.target.value === 'true' }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzY5NzA4RCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')] bg-no-repeat bg-[position:right_12px_center] pr-10"
                      >
                        <option value="false">{t('no', { en: 'No', ml: 'ഇല്ല' })}</option>
                        <option value="true">{t('yes', { en: 'Yes', ml: 'ഉണ്ട്' })}</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Modal Actions */}
                <div className="flex items-center justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowAddFarm(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors"
                  >
                    {t('cancel', { en: 'Cancel', ml: 'റദ്ദാക്കുക' })}
                  </button>
                  <button
                    onClick={handleAddFarm}
                    disabled={!newFarmData.location || !newFarmData.size}
                    className="px-4 sm:px-6 py-2.5 sm:py-2 bg-primary-400 hover:bg-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors inline-flex items-center space-x-2 min-h-[44px]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t('add', { en: 'Add', ml: 'ചേർക്കുക' })}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Farm Modal */}
          {showEditFarm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold font-display text-gray-900 dark:text-text-primary">
                    {t('editFarm', { en: 'Edit Farm', ml: 'ഫാം എഡિറ്റ് ചെയ്യുക' })}
                  </h3>
                  <button
                    onClick={() => setShowEditFarm(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                      {t('farmLocation', { en: 'Farm Location', ml: 'ഫാം സ്ഥലം' })}
                    </label>
                    <input
                      type="text"
                      value={editFarmData.location}
                      onChange={(e) => setEditFarmData({...editFarmData, location: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                      {t('farmSize', { en: 'Farm Size (acres)', ml: 'ഫാം വലുപ്പം (ഏക്കർ)' })}
                    </label>
                    <input
                      type="number"
                      value={editFarmData.size || ''}
                      onChange={(e) => setEditFarmData({...editFarmData, size: Number(e.target.value)})}
                      min="0"
                      step="0.1"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                      {t('crops', { en: 'Crops (comma separated)', ml: 'വിളകൾ (കോമയാൽ വേർതിരിച്ച്)' })}
                    </label>
                    <input
                      type="text"
                      value={editFarmData.crops}
                      onChange={(e) => setEditFarmData({...editFarmData, crops: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                      {t('livestock', { en: 'Livestock (comma separated)', ml: 'കന്നുകാലികൾ (കോമയാൽ വേർതിരിച്ച്)' })}
                    </label>
                    <input
                      type="text"
                      value={editFarmData.livestock}
                      onChange={(e) => setEditFarmData({...editFarmData, livestock: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors"
                    />
                  </div>

                  {/* Row 1: Irrigation System & Soil Type */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                        {t('irrigationSystem', { en: 'Irrigation System', ml: 'ജലസേചന സംവിധാനം' })}
                      </label>
                      <select
                        value={editFarmData.irrigation_system}
                        onChange={(e) => setEditFarmData({...editFarmData, irrigation_system: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzY5NzA4RCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')] bg-no-repeat bg-[position:right_12px_center] pr-10"
                      >
                        <option value="">{t('selectIrrigation', { en: 'Select Irrigation System', ml: 'ജലസേചന സംവിധാനം തിരഞ്ഞെടുക്കുക' })}</option>
                        <option value="Drip Irrigation">{t('dripIrrigation', { en: 'Drip Irrigation', ml: 'ഡ്രിപ് ജലസേചനം' })}</option>
                        <option value="Sprinkler Irrigation">{t('sprinklerIrrigation', { en: 'Sprinkler Irrigation', ml: 'സ്പ്രിങ്ക്ലർ ജലസേചനം' })}</option>
                        <option value="Flood Irrigation">{t('floodIrrigation', { en: 'Flood Irrigation', ml: 'വെള്ളപ്പൊക്ക ജലസേചനം' })}</option>
                        <option value="Rain Fed">{t('rainFed', { en: 'Rain Fed', ml: 'മഴ നിർഭര' })}</option>
                        <option value="Manual Watering">{t('manualWatering', { en: 'Manual Watering', ml: 'കൈകൊണ്ട് നനയ്ക്കൽ' })}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                        {t('soilType', { en: 'Soil Type', ml: 'മണ്ണിന്റെ തരം' })}
                      </label>
                      <select
                        value={editFarmData.soil_type}
                        onChange={(e) => setEditFarmData({...editFarmData, soil_type: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzY5NzA4RCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')] bg-no-repeat bg-[position:right_12px_center] pr-10"
                      >
                        <option value="">{t('selectSoilType', { en: 'Select Soil Type', ml: 'മണ്ണിന്റെ തരം തിരഞ്ഞെടുക്കുക' })}</option>
                        <option value="Loamy Soil">{t('loamySoil', { en: 'Loamy Soil', ml: 'കളിമണ്ണ്' })}</option>
                        <option value="Clay Soil">{t('claySoil', { en: 'Clay Soil', ml: 'കളിമൺ' })}</option>
                        <option value="Sandy Soil">{t('sandySoil', { en: 'Sandy Soil', ml: 'മണൽമണ്ണ്' })}</option>
                        <option value="Silt Soil">{t('siltSoil', { en: 'Silt Soil', ml: 'സിൽറ്റ് മണ്ണ്' })}</option>
                        <option value="Red Soil">{t('redSoil', { en: 'Red Soil', ml: 'ചുവന്ന മണ്ണ്' })}</option>
                        <option value="Black Soil">{t('blackSoil', { en: 'Black Soil', ml: 'കറുത്ത മണ്ണ്' })}</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Water Source & Organic Certification */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                        {t('waterSource', { en: 'Water Source', ml: 'ജലസ്രോതസ്സ്' })}
                      </label>
                      <select
                        value={editFarmData.water_source}
                        onChange={(e) => setEditFarmData({...editFarmData, water_source: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzY5NzA4RCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')] bg-no-repeat bg-[position:right_12px_center] pr-10"
                      >
                        <option value="">{t('selectWaterSource', { en: 'Select Water Source', ml: 'ജലസ്രോതസ്സ് തിരഞ്ഞെടുക്കുക' })}</option>
                        <option value="Borewell">{t('borewell', { en: 'Borewell', ml: 'ബോർവെൽ' })}</option>
                        <option value="Well">{t('well', { en: 'Well', ml: 'കിണർ' })}</option>
                        <option value="River">{t('river', { en: 'River', ml: 'നദി' })}</option>
                        <option value="Pond">{t('pond', { en: 'Pond', ml: 'കുളം' })}</option>
                        <option value="Canal">{t('canal', { en: 'Canal', ml: 'കനാൽ' })}</option>
                        <option value="Rainwater">{t('rainwater', { en: 'Rainwater', ml: 'മഴവെള്ളം' })}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                        {t('organicCertified', { en: 'Organic Certification', ml: 'ജൈവ സർട്ടിഫിക്കേഷൻ' })}
                      </label>
                      <select
                        value={editFarmData.organic_certified.toString()}
                        onChange={(e) => setEditFarmData({...editFarmData, organic_certified: e.target.value === 'true'})}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzY5NzA4RCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')] bg-no-repeat bg-[position:right_12px_center] pr-10"
                      >
                        <option value="false">{t('no', { en: 'No', ml: 'ഇല്ല' })}</option>
                        <option value="true">{t('yes', { en: 'Yes', ml: 'ഉണ്ട്' })}</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Modal Actions */}
                <div className="flex items-center justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowEditFarm(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors"
                  >
                    {t('cancel', { en: 'Cancel', ml: 'റദ്ദാക്കുക' })}
                  </button>
                  <button
                    onClick={handleEditFarmSubmit}
                    disabled={!editFarmData.location || !editFarmData.size}
                    className="px-4 sm:px-6 py-2.5 sm:py-2 bg-primary-400 hover:bg-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors inline-flex items-center space-x-2 min-h-[44px]"
                  >
                    <Save className="w-4 h-4" />
                    <span>{t('update', { en: 'Update', ml: 'അപ്ഡേറ്റ് ചെയ്യുക' })}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Profile
