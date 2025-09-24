import React, { useState } from 'react'
import { MessageSquare, Send, Sparkles } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

interface Message {
  id: number
  content: string
  isUser: boolean
  timestamp: Date
}

const Chat: React.FC = () => {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: t('welcomeMessage', { 
        en: 'Hello! I\'m your AI farming assistant. How can I help you today?',
        ml: 'ഹലോ! ഞാൻ നിങ്ങളുടെ AI കാർഷിക സഹായിയാണ്. ഇന്ന് എങ്ങനെ സഹായിക്കാം?'
      }),
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        content: getBotResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('weather')) {
      return t('weatherResponse', {
        en: 'The current weather is perfect for outdoor activities. Temperature is 28°C with clear skies.',
        ml: 'നിലവിലെ കാലാവസ്ഥ പുറത്തുള്ള പ്രവർത്തനങ്ങൾക്ക് അനുയോജ്യമാണ്. താപനില 28°C ആണ്, ആകാശം തെളിഞ്ഞിരിക്കുന്നു.'
      })
    } else if (message.includes('crop') || message.includes('rice') || message.includes('wheat')) {
      return t('cropResponse', {
        en: 'For this season, I recommend focusing on rice and wheat cultivation based on your region.',
        ml: 'ഈ സീസണിൽ, നിങ്ങളുടെ പ്രദേശത്തെ അടിസ്ഥാനമാക്കി നെല്ലും ഗോതമ്പും കൃഷിയിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കാൻ ഞാൻ ശുപാർശ ചെയ്യുന്നു.'
      })
    } else if (message.includes('activity') || message.includes('log')) {
      return t('activityResponse', {
        en: 'I see you\'ve been active with sowing and watering. Great work! Remember to log your pest control activities for better tracking.',
        ml: 'നിങ്ങൾ വിതയലും നീരൊഴിക്കലും സജീവമായി നടത്തുന്നത് ഞാൻ കാണുന്നു. മികച്ച പ്രവർത്തനം! മികച്ച ട്രാക്കിംഗിനായി നിങ്ങളുടെ കീട നിയന്ത്രണ പ്രവർത്തനങ്ങൾ രേഖപ്പെടുത്താൻ ഓർക്കുക.'
      })
    } else {
      return t('defaultResponse', {
        en: 'That\'s interesting! Can you tell me more about your specific farming needs?',
        ml: 'അത് രസകരമാണ്! നിങ്ങളുടെ നിർദ്ദിഷ്ട കാർഷിക ആവശ്യങ്ങളെക്കുറിച്ച് കൂടുതൽ പറയാമോ?'
      })
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center mb-6">
        <MessageSquare className="w-8 h-8 text-primary-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('aiChat', { en: 'AI Chat', ml: 'എഐ ചാറ്റ്' })}
        </h1>
      </div>

      <div className="card h-[500px] flex flex-col">
        <div className="flex items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <Sparkles className="w-6 h-6 text-primary-500 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('farmAssistant', { en: 'Farm Assistant', ml: 'കാർഷിക സഹായി' })}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isUser
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t('chatPlaceholder', {
              en: 'Ask about farming, weather, or log activities...',
              ml: 'കൃഷി, കാലാവസ്ഥ, അല്ലെങ്കിൽ പ്രവർത്തനങ്ങൾ ചോദിക്കുക...'
            })}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            maxLength={500}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat