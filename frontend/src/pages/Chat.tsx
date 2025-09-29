import React, { useState, useRef, useEffect } from 'react'
import { Send, Mic, Camera, Bot, Upload, Image, X, ChevronDown, Languages, Volume2, Square, Trash2, Search, ChevronUp, Plus, Copy, Check, Clock } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

interface Message {
  id: number
  content: string
  isUser: boolean
  timestamp: Date
  imageUrl?: string
  translatedContent?: string
  originalLanguage?: 'en' | 'ml'
  isTranslated?: boolean
}

const Chat: React.FC = () => {
  const { t } = useLanguage()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
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
  const [isLoading, setIsLoading] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{file: File, preview: string} | null>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [isTranslating, setIsTranslating] = useState<number | null>(null)
  const [isReading, setIsReading] = useState<number | null>(null)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<number[]>([])
  const [currentSearchIndex, setCurrentSearchIndex] = useState(-1)
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null)
  const isReadingRef = useRef<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const mobileFileInputRef = useRef<HTMLInputElement>(null)
  const hasChatHistory = messages.length > 1

  // *** FIXED SCROLL EFFECT ***
  // This single effect handles scrolling to the bottom whenever a new message is added.
  useEffect(() => {
    // This function scrolls the chat container to the very bottom.
    const scrollToBottom = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    };

    // We call scrollToBottom with a minimal delay.
    // This ensures that React has finished rendering the new message
    // before we try to scroll to it.
    setTimeout(scrollToBottom, 0);

  }, [messages]); // This effect runs every time the 'messages' array changes.

  // Clear chat function
  const clearChat = () => {
    // Reset to initial state with only welcome message
    setMessages([
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
    
    // Clear any selected image
    setSelectedImage(null)
    
    // Clear input
    setInputMessage('')
    
    // Stop any ongoing audio
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
      setCurrentAudio(null)
    }
    
    // Reset states
    setIsReading(null)
    setIsTranslating(null)
    setShowScrollButton(false)
    setShowClearConfirm(false)
    setCopiedMessageId(null)
    
    // Close search if open
    setShowSearch(false)
    setSearchQuery('')
    setSearchResults([])
    setCurrentSearchIndex(-1)
    
    // Clear reading ref
    isReadingRef.current = null
    
    console.log('Chat cleared successfully')
  }

  // New chat function (same as clear chat but with different messaging)
  const startNewChat = () => {
    clearChat()
    console.log('New chat started')
  }

  // Mobile device detection
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768) ||
           ('ontouchstart' in window)
  }

  // Mobile camera handler
  const handleMobileCamera = () => {
    if (mobileFileInputRef.current) {
      mobileFileInputRef.current.click()
    }
  }

  // Handle mobile camera file selection
  const handleMobileCameraFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageUpload(file)
      // Clear the input so the same image can be selected again
      event.target.value = ''
    }
  }

  // Copy message function
  const copyMessage = async (messageId: number) => {
    const message = messages.find(msg => msg.id === messageId)
    if (!message) return

    try {
      // Get the content to copy (translated if available, otherwise original)
      const textToCopy = message.isTranslated && message.translatedContent 
        ? message.translatedContent 
        : message.content

      await navigator.clipboard.writeText(textToCopy)
      setCopiedMessageId(messageId)
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedMessageId(null)
      }, 2000)
      
      console.log('Message copied to clipboard')
    } catch (error) {
      console.error('Failed to copy message:', error)
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea')
        const textToCopy = message.isTranslated && message.translatedContent 
          ? message.translatedContent 
          : message.content
        textArea.value = textToCopy
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        setCopiedMessageId(messageId)
        setTimeout(() => {
          setCopiedMessageId(null)
        }, 2000)
        console.log('Message copied to clipboard (fallback)')
      } catch (fallbackError) {
        console.error('Fallback copy also failed:', fallbackError)
      }
    }
  }

  // Search functions
  const highlightTextInElement = (element: Element, searchTerm: string) => {
    // Remove existing highlights first
    element.querySelectorAll('.search-text-highlight').forEach(highlight => {
      const parent = highlight.parentNode
      if (parent) {
        parent.replaceChild(document.createTextNode(highlight.textContent || ''), highlight)
        parent.normalize() // Merge adjacent text nodes
      }
    })

    // Get all text nodes in the element
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    )

    const textNodes: Text[] = []
    let node
    while (node = walker.nextNode()) {
      textNodes.push(node as Text)
    }

    // Highlight matching text in each text node
    textNodes.forEach(textNode => {
      const text = textNode.textContent || ''
      const lowerText = text.toLowerCase()
      const lowerSearchTerm = searchTerm.toLowerCase()
      
      if (lowerText.includes(lowerSearchTerm)) {
        const fragment = document.createDocumentFragment()
        let lastIndex = 0
        let index = lowerText.indexOf(lowerSearchTerm)
        
        while (index !== -1) {
          // Add text before the match
          if (index > lastIndex) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex, index)))
          }
          
          // Add highlighted match
          const highlight = document.createElement('span')
          highlight.className = 'search-text-highlight'
          highlight.textContent = text.slice(index, index + searchTerm.length)
          fragment.appendChild(highlight)
          
          lastIndex = index + searchTerm.length
          index = lowerText.indexOf(lowerSearchTerm, lastIndex)
        }
        
        // Add remaining text
        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex)))
        }
        
        // Replace the original text node
        textNode.parentNode?.replaceChild(fragment, textNode)
      }
    })
  }

  const performSearch = (query: string) => {
    // Clear existing highlights
    document.querySelectorAll('.search-text-highlight').forEach(highlight => {
      const parent = highlight.parentNode
      if (parent) {
        parent.replaceChild(document.createTextNode(highlight.textContent || ''), highlight)
        parent.normalize()
      }
    })

    if (!query.trim()) {
      setSearchResults([])
      setCurrentSearchIndex(-1)
      return
    }

    const results: number[] = []
    const searchTerm = query.toLowerCase()

    messages.forEach((message) => {
      // Search in original content
      if (message.content.toLowerCase().includes(searchTerm)) {
        results.push(message.id)
      }
      // Also search in translated content if available
      if (message.translatedContent && message.translatedContent.toLowerCase().includes(searchTerm)) {
        if (!results.includes(message.id)) {
          results.push(message.id)
        }
      }
    })

    setSearchResults(results)
    setCurrentSearchIndex(results.length > 0 ? 0 : -1)
    
    // Highlight text in all matching messages
    results.forEach(messageId => {
      const messageElement = document.getElementById(`message-${messageId}`)
      if (messageElement) {
        highlightTextInElement(messageElement, query)
      }
    })
    
    // Scroll to first result
    if (results.length > 0) {
      scrollToMessage(results[0])
    }
  }

  const scrollToMessage = (messageId: number) => {
    const messageElement = document.getElementById(`message-${messageId}`)
    if (messageElement && scrollContainerRef.current) {
      messageElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
      
      // Remove existing message highlights
      document.querySelectorAll('.search-message-highlight').forEach(el => {
        el.classList.remove('search-message-highlight')
      })
      
      // Highlight the current message container subtly
      messageElement.classList.add('search-message-highlight')
      setTimeout(() => {
        messageElement.classList.remove('search-message-highlight')
      }, 2000)
    }
  }

  const navigateSearch = (direction: 'next' | 'prev') => {
    if (searchResults.length === 0) return

    let newIndex = currentSearchIndex
    if (direction === 'next') {
      newIndex = (currentSearchIndex + 1) % searchResults.length
    } else {
      newIndex = currentSearchIndex <= 0 ? searchResults.length - 1 : currentSearchIndex - 1
    }

    setCurrentSearchIndex(newIndex)
    scrollToMessage(searchResults[newIndex])
  }

  const closeSearch = () => {
    setShowSearch(false)
    setSearchQuery('')
    setSearchResults([])
    setCurrentSearchIndex(-1)
    
    // Remove text highlights
    document.querySelectorAll('.search-text-highlight').forEach(highlight => {
      const parent = highlight.parentNode
      if (parent) {
        parent.replaceChild(document.createTextNode(highlight.textContent || ''), highlight)
        parent.normalize()
      }
    })
    
    // Remove message highlights
    document.querySelectorAll('.search-message-highlight').forEach(el => {
      el.classList.remove('search-message-highlight')
    })
  }

  const updateScrollState = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const contentOverflows = container.scrollHeight > container.clientHeight + 1
    if (!contentOverflows) {
      setShowScrollButton(false)
      return
    }

    const threshold = 50
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < threshold
    setShowScrollButton(!isNearBottom)
  }

  // Scroll handler - Show scroll button when not at bottom and content overflows
  const handleScroll = () => {
    updateScrollState()
  }

  useEffect(() => {
    if (hasChatHistory) {
      updateScrollState()
    } else {
      setShowScrollButton(false)
    }
  }, [messages, showSearch, hasChatHistory])

  // Smart scroll to bottom - Only works when there's content to scroll
  const scrollToBottom = () => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    
    // Only scroll if there's actually content that needs scrolling
    if (container.scrollHeight <= container.clientHeight) return
    
    // Enhanced scroll to bottom with multiple attempts for long messages
    const scrollToEnd = () => {
      const maxScrollTop = container.scrollHeight - container.clientHeight
      container.scrollTop = maxScrollTop // Direct assignment for immediate effect
    }
    
    // Multiple scroll attempts to handle dynamic content
    scrollToEnd()
    setTimeout(scrollToEnd, 50)
    setTimeout(scrollToEnd, 150)
    setTimeout(scrollToEnd, 300)

    setTimeout(updateScrollState, 350)
  }

  // Translation function  
  const translateMessage = async (messageId: number) => {
    setIsTranslating(messageId)
    try {
      const message = messages.find(m => m.id === messageId)
      if (!message || message.isUser) return

      // If already translated, toggle back to original
      if (message.isTranslated && message.translatedContent) {
        setMessages(prevMessages =>
          prevMessages.map(m =>
            m.id === messageId
              ? { ...m, isTranslated: false }
              : m
          )
        )
        setIsTranslating(null)
        return
      }

      const contentToTranslate = message.content
      const currentLang = message.originalLanguage || 'en'
      const targetLang = currentLang === 'en' ? 'ml' : 'en'

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: contentToTranslate,
          from: currentLang,
          to: targetLang
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages(prevMessages =>
          prevMessages.map(m =>
            m.id === messageId
              ? { 
                  ...m, 
                  translatedContent: data.translatedText,
                  isTranslated: true,
                  originalLanguage: currentLang
                }
              : m
          )
        )
      }
    } catch (error) {
      console.error('Translation error:', error)
    } finally {
      setIsTranslating(null)
    }
  }

  // Stop TTS function
  const stopReading = () => {
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
      setCurrentAudio(null)
    }
    setIsReading(null) // Always reset reading state regardless of audio state
    isReadingRef.current = null // Clear the ref to cancel any pending audio
  }

  // Text-to-Speech function
  const readMessage = async (messageId: number) => {
    setIsReading(messageId)
    isReadingRef.current = messageId
    try {
      const message = messages.find(m => m.id === messageId)
      if (!message || message.isUser) return

      // Get the text to read (translated version if available and active)
      const textToRead = message.isTranslated && message.translatedContent 
        ? message.translatedContent 
        : message.content

      // Determine language for TTS
      const language = message.isTranslated 
        ? (message.originalLanguage === 'en' ? 'ml' : 'en')
        : (message.originalLanguage || 'en')

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: textToRead,
          language: language
        }),
      })

      if (response.ok) {
        const audioBlob = await response.blob()
        
        // Check if user has stopped reading while we were loading
        if (isReadingRef.current !== messageId) {
          return // User has cancelled, don't play audio
        }
        
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)
        
        // Store the current audio instance
        setCurrentAudio(audio)
        
        audio.onended = () => {
          setIsReading(null)
          setCurrentAudio(null)
          isReadingRef.current = null
          URL.revokeObjectURL(audioUrl)
        }
        
        audio.onerror = () => {
          setIsReading(null)
          setCurrentAudio(null)
          isReadingRef.current = null
          URL.revokeObjectURL(audioUrl)
        }
        
        // Check again before playing (in case user clicked stop during audio loading)
        if (isReadingRef.current === messageId) {
          await audio.play()
        } else {
          // Clean up if cancelled
          setCurrentAudio(null)
          URL.revokeObjectURL(audioUrl)
        }
      }
    } catch (error) {
      console.error('TTS error:', error)
      setIsReading(null)
      setCurrentAudio(null)
      isReadingRef.current = null
    }
  }

  // Function to format AI response text
  const formatAIResponse = (text: string) => {
    // Helper function to process bold and italic text
    const processBoldItalic = (text: string) => {
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
    }

    // Split text into lines for processing
    const lines = text.split('\n')
    const formattedElements: JSX.Element[] = []
    
    lines.forEach((line, index) => {
      if (line.trim() === '') {
        // Empty line - add spacing
        formattedElements.push(<br key={`br-${index}`} />)
      } else if (line.startsWith('###')) {
        // Heading
        const headingText = line.replace(/^###\s*/, '')
        const processedHeading = processBoldItalic(headingText)
        formattedElements.push(
          <h3 
            key={`h3-${index}`} 
            className="font-semibold text-sm mt-3 mb-1 text-gray-900 dark:text-white"
            dangerouslySetInnerHTML={{ __html: processedHeading }}
          />
        )
      } else if (line.startsWith('##')) {
        // Subheading
        const headingText = line.replace(/^##\s*/, '')
        const processedHeading = processBoldItalic(headingText)
        formattedElements.push(
          <h2 
            key={`h2-${index}`} 
            className="font-bold text-base mt-3 mb-2 text-gray-900 dark:text-white"
            dangerouslySetInnerHTML={{ __html: processedHeading }}
          />
        )
      } else if (line.trim().match(/^\d+\./)) {
        // Numbered list item
        const processedLine = processBoldItalic(line.trim())
        formattedElements.push(
          <div key={`num-${index}`} className="ml-2 mb-1">
            <span 
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: processedLine }}
            />
          </div>
        )
      } else if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
        // Bullet point
        const bulletText = line.replace(/^[-•]\s*/, '')
        const processedBullet = processBoldItalic(bulletText)
        formattedElements.push(
          <div key={`bullet-${index}`} className="ml-4 mb-1 flex">
            <span className="mr-2 text-sm">•</span>
            <span 
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: processedBullet }}
            />
          </div>
        )
      } else {
        // Regular paragraph - handle bold text
        const processedLine = processBoldItalic(line)
        
        formattedElements.push(
          <p 
            key={`p-${index}`} 
            className="text-sm leading-relaxed mb-2"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        )
      }
    })
    
    return <div className="space-y-1">{formattedElements}</div>
  }

  const handleSendMessage = async () => {
    if ((!inputMessage.trim() && !selectedImage) || isLoading) return

    const userMessage: Message = {
      id: Date.now(),
      content: inputMessage || (selectedImage ? "Image uploaded" : ""),
      isUser: true,
      timestamp: new Date(),
      imageUrl: selectedImage?.preview
    }

    setMessages(prev => [...prev, userMessage])
    const messageToSend = inputMessage
    const imageToSend = selectedImage
    setInputMessage('')
    setSelectedImage(null)
    setIsLoading(true)

    try {
      let response;
      
      if (imageToSend) {
        // Send image with message
        const formData = new FormData()
        formData.append('image', imageToSend.file)
        formData.append('message', messageToSend || '')
        
        response = await fetch('/api/chat/image', {
          method: 'POST',
          body: formData,
        })
      } else {
        // Send text message only
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: messageToSend }),
        })
      }

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      
      // Simple language detection for response
      const responseText = data.response || getBotResponse(messageToSend)
      const isResponseInMalayalam = /[\u0D00-\u0D7F]/.test(responseText)
      
      const botResponse: Message = {
        id: Date.now() + 1,
        content: responseText,
        isUser: false,
        timestamp: new Date(),
        originalLanguage: isResponseInMalayalam ? 'ml' : 'en',
        isTranslated: false
      }
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorResponse: Message = {
        id: Date.now() + 1,
        content: t('errorMessage', {
          en: 'Sorry, I encountered an error. Please try again.',
          ml: 'ക്ഷമിക്കണം, ഒരു പിശക് സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക.'
        }),
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
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

  // Voice recording functionality
  const handleVoiceRecording = () => {
    console.log('Voice recording clicked, isListening:', isListening)
    
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      alert(t('voiceNotSupported', {
        en: 'Voice recognition is not supported in your browser. Please use Chrome or Edge.',
        ml: 'നിങ്ങളുടെ ബ്രൗസറിൽ വോയിസ് റെക്കഗ്നിഷൻ പിന്തുണയ്ക്കുന്നില്ল. ദയവായി Chrome അല്ലെങ്കിൽ Edge ഉപയോഗിക്കുക.'
      }))
      return
    }

    if (isListening) {
      console.log('Stopping voice recognition')
      setIsListening(false)
      return
    }

    try {
      const recognition = new SpeechRecognition()
      
      // Configure recognition for real-time transcription
      recognition.continuous = true  // Keep listening continuously
      recognition.interimResults = true  // Show results as user speaks
      recognition.lang = 'en-US'
      recognition.maxAlternatives = 1

      let finalTranscript = ''
      let interimTranscript = ''

      recognition.onstart = () => {
        console.log('Speech recognition started')
        setIsListening(true)
        finalTranscript = inputMessage.trim() // Start with existing text
      }

      recognition.onresult = (event: any) => {
        console.log('Speech recognition result:', event)
        
        interimTranscript = ''
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          
          if (event.results[i].isFinal) {
            finalTranscript += (finalTranscript ? ' ' : '') + transcript
            console.log('Final transcript:', finalTranscript)
          } else {
            interimTranscript += transcript
            console.log('Interim transcript:', interimTranscript)
          }
        }
        
        // Update input with final + interim transcript
        const displayText = finalTranscript + (interimTranscript ? ' ' + interimTranscript : '')
        setInputMessage(displayText)
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
        
        let errorMessage = t('voiceError', {
          en: 'Voice recognition error. Please try again.',
          ml: 'വോയിസ് റെക്കഗ്നിഷൻ പിശക്. ദയവായി വീണ്ടും ശ്രമിക്കുക.'
        })
        
        if (event.error === 'not-allowed') {
          errorMessage = t('micPermission', {
            en: 'Microphone permission denied. Please allow microphone access.',
            ml: 'മൈക്രോഫോൺ അനുമതി നിഷേധിച്ചു. ദയവായി മൈക്രോഫോൺ ആക്സസ് അനുവദിക്കുക.'
          })
        }
        
        alert(errorMessage)
      }

      recognition.onend = () => {
        console.log('Speech recognition ended')
        setIsListening(false)
        
        // Finalize the text with only the final transcript
        if (finalTranscript) {
          setInputMessage(finalTranscript)
        }
      }

      console.log('Starting speech recognition')
      recognition.start()
      
    } catch (error) {
      console.error('Speech recognition initialization error:', error)
      setIsListening(false)
      alert(t('voiceNotSupported', {
        en: 'Voice recognition failed to initialize. Please try again.',
        ml: 'വോയിസ് റെക്കഗ്നിഷൻ ആരംഭിക്കുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.'
      }))
    }
  }

  // Image upload functionality
  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const preview = e.target?.result as string
      setSelectedImage({ file, preview })
      setShowImageUpload(false)
      // Don't automatically set input message - let user type their own
    }
    reader.readAsDataURL(file)
  }

  const handleCamera = async () => {
    try {
      setShowImageUpload(false) // Close the popup first
      
      // Check if mobile device and use native camera
      if (isMobileDevice()) {
        handleMobileCamera()
        return
      }
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser')
      }

      console.log('Requesting camera access...')
      
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Prefer rear camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      
      console.log('Camera access granted, creating video element...')
      
      // Detect dark mode more reliably
      const isDarkMode = document.documentElement.classList.contains('dark')
      console.log('Dark mode detected:', isDarkMode, 'Classes:', document.documentElement.className)
      
      // Create video container with enhanced styling
      const videoContainer = document.createElement('div')
      videoContainer.style.cssText = `
        position: relative;
        width: 100%;
        max-width: 520px;
        height: 360px;
        margin-bottom: 20px;
        margin-top: 10px;
        border-radius: 20px;
        overflow: hidden;
        background: ${isDarkMode ? '#0f172a' : '#f8fafc'};
        box-shadow: ${isDarkMode ? 
          'inset 0 2px 4px 0 rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(71, 85, 105, 0.3)' : 
          'inset 0 2px 4px 0 rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(148, 163, 184, 0.3)'
        };
        display: flex;
        align-items: center;
        justify-content: center;
      `

      // Create video element for camera preview
      const video = document.createElement('video')
      video.srcObject = stream
      video.autoplay = true
      video.playsInline = true
      video.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        border-radius: 20px;
        background: ${isDarkMode ? '#111827' : '#f8fafc'};
      `
      
      videoContainer.appendChild(video)
      
      // Create canvas for capturing image
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      
      // Create modal for camera interface
      const modal = document.createElement('div')
      modal.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: ${isDarkMode ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.75)'}; z-index: 1000;
        display: flex; flex-direction: column; align-items: center;
        justify-content: center; padding: 20px;
        backdrop-filter: blur(12px);
        animation: modalFadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      `
      
      const container = document.createElement('div')
      container.style.cssText = `
        background: ${isDarkMode ? 'linear-gradient(145deg, #1e293b, #0f172a)' : 'linear-gradient(145deg, #ffffff, #f8fafc)'}; 
        border-radius: 24px; padding: 20px;
        max-width: min(600px, 95vw); max-height: 95vh; overflow: hidden;
        display: flex; flex-direction: column; align-items: center;
        border: ${isDarkMode ? '1px solid #475569' : '1px solid #e2e8f0'};
        box-shadow: ${isDarkMode ? 
          '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(148, 163, 184, 0.1)' : 
          '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        };
        animation: modalSlideIn 0.3s ease-out;
        position: relative;
      `
      

      
      // Camera switching functionality
      let currentFacingMode = 'environment' // Start with rear camera
      let currentStream = stream // Keep reference to current stream
      
      const switchCamera = async () => {
        try {
          // Stop current stream
          currentStream.getTracks().forEach(track => track.stop())
          
          // Switch camera mode
          currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment'
          
          // Get new stream with switched camera
          currentStream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              facingMode: currentFacingMode,
              width: { ideal: 1280 },
              height: { ideal: 720 }
            } 
          })
          
          // Update video stream
          video.srcObject = currentStream
          
          // Update switch button text and icon
          const nextCameraText = currentFacingMode === 'environment' ? 
            t('frontCamera', { en: 'Front', ml: 'മുന്നിൽ' }) : 
            t('rearCamera', { en: 'Rear', ml: 'പിന്നിൽ' })
          
          // Update switch camera icon tooltip or visual feedback if needed
          switchCameraIcon.title = nextCameraText
        } catch (error) {
          console.error('Error switching camera:', error)
          alert(t('cameraSwitchError', {
            en: 'Could not switch camera. Some devices may not support camera switching.',
            ml: 'ക്യാമറ സ്വിച്ച് ചെയ്യാൻ കഴിഞ്ഞില്ല. ചില ഉപകരണങ്ങൾ ക്യാമറ സ്വിച്ചിംഗ് പിന്തുണയ്ക്കുന്നില്ല.'
          }))
        }
      }
      
      // Add camera switch button as floating icon in bottom right of video
      const switchCameraIcon = document.createElement('button')
      switchCameraIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
          <path d="M21 3v5h-5"/>
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
          <path d="M3 21v-5h5"/>
        </svg>
      `
      switchCameraIcon.style.cssText = `
        position: absolute;
        bottom: 12px;
        right: 12px;
        background: ${isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(248, 250, 252, 0.95)'};
        color: ${isDarkMode ? '#e2e8f0' : '#1e293b'};
        border: none;
        border-radius: 50%;
        width: 44px;
        height: 44px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        backdrop-filter: blur(10px);
        border: 2px solid ${isDarkMode ? 'rgba(148, 163, 184, 0.3)' : 'rgba(71, 85, 105, 0.3)'};
        z-index: 5;
        box-shadow: ${isDarkMode ? 
          '0 4px 6px -1px rgba(0, 0, 0, 0.4)' : 
          '0 4px 6px -1px rgba(0, 0, 0, 0.15)'
        };
      `
      switchCameraIcon.onclick = switchCamera
      
      // Add hover effects for camera switch button
      switchCameraIcon.onmouseover = () => {
        switchCameraIcon.style.background = isDarkMode ? 'rgba(51, 65, 85, 0.9)' : 'rgba(226, 232, 240, 1)'
        switchCameraIcon.style.transform = 'scale(1.05)'
      }
      
      switchCameraIcon.onmouseout = () => {
        switchCameraIcon.style.background = isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(248, 250, 252, 0.95)'
        switchCameraIcon.style.transform = 'scale(1)'
      }
      
      // Update cleanup function to use currentStream
      const cleanup = () => {
        currentStream.getTracks().forEach(track => track.stop())
        document.body.removeChild(modal)
      }

      const buttonContainer = document.createElement('div')
      buttonContainer.style.cssText = `
        display: flex; 
        gap: 16px; 
        margin: 20px 0; 
        flex-wrap: wrap; 
        justify-content: center;
        align-items: center;
        width: 100%;
      `
      
      // Update switch camera icon to be a regular button (not overlay)
      switchCameraIcon.style.cssText = `
        background: ${isDarkMode ? 'linear-gradient(145deg, #374151, #1f2937)' : 'linear-gradient(145deg, #f1f5f9, #e2e8f0)'}; 
        color: ${isDarkMode ? '#e2e8f0' : '#1e293b'};
        border: ${isDarkMode ? '1px solid #6b7280' : '1px solid #cbd5e1'};
        border-radius: 50%;
        padding: 16px; 
        cursor: pointer; 
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: ${isDarkMode ? 
          '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : 
          '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        };
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.025em;
      `
      switchCameraIcon.title = t('switchCamera', { en: 'Switch Camera', ml: 'ക്യാമറ മാറ്റുക' })
      
      // Update hover effects for switch camera button
      switchCameraIcon.onmouseover = () => {
        switchCameraIcon.style.background = isDarkMode ? 'linear-gradient(145deg, #1f2937, #111827)' : 'linear-gradient(145deg, #e2e8f0, #cbd5e1)'
        switchCameraIcon.style.transform = 'translateY(-1px) scale(1.02)'
      }
      
      switchCameraIcon.onmouseout = () => {
        switchCameraIcon.style.background = isDarkMode ? 'linear-gradient(145deg, #374151, #1f2937)' : 'linear-gradient(145deg, #f1f5f9, #e2e8f0)'
        switchCameraIcon.style.transform = 'translateY(0) scale(1)'
      }
      

      
      const captureBtn = document.createElement('button')
      captureBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
      `
      captureBtn.style.cssText = `
        background: linear-gradient(145deg, #10b981, #059669); 
        color: white; 
        border: none; 
        border-radius: 50%;
        padding: 16px; 
        cursor: pointer; 
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.4);
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.025em;
      `
      captureBtn.title = t('capture', { en: 'Capture', ml: 'പിടിക്കുക' })
      
      const captureHover = () => {
        captureBtn.style.background = 'linear-gradient(145deg, #059669, #047857)'
        captureBtn.style.transform = 'translateY(-1px)'
        captureBtn.style.boxShadow = '0 6px 18px 0 rgba(16, 185, 129, 0.5)'
      }
      
      const captureLeave = () => {
        captureBtn.style.background = 'linear-gradient(145deg, #10b981, #059669)'
        captureBtn.style.transform = 'translateY(0)'
        captureBtn.style.boxShadow = '0 4px 14px 0 rgba(16, 185, 129, 0.4)'
      }
      
      captureBtn.onmouseover = captureHover
      captureBtn.onmouseout = captureLeave
      
      // Create cancel button with red X
      const cancelBtn = document.createElement('button')
      cancelBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `
      cancelBtn.style.cssText = `
        background: linear-gradient(145deg, #ef4444, #dc2626); 
        color: white; 
        border: none; 
        border-radius: 50%;
        padding: 16px; 
        cursor: pointer; 
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 14px 0 rgba(239, 68, 68, 0.4);
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.025em;
      `
      cancelBtn.title = t('cancel', { en: 'Cancel', ml: 'റദ്ദാക്കുക' })
      
      const cancelHover = () => {
        cancelBtn.style.background = 'linear-gradient(145deg, #dc2626, #b91c1c)'
        cancelBtn.style.transform = 'translateY(-1px)'
        cancelBtn.style.boxShadow = '0 6px 18px 0 rgba(239, 68, 68, 0.5)'
      }
      
      const cancelLeave = () => {
        cancelBtn.style.background = 'linear-gradient(145deg, #ef4444, #dc2626)'
        cancelBtn.style.transform = 'translateY(0)'
        cancelBtn.style.boxShadow = '0 4px 14px 0 rgba(239, 68, 68, 0.4)'
      }
      
      cancelBtn.onmouseover = cancelHover
      cancelBtn.onmouseout = cancelLeave
      
      cancelBtn.onclick = () => {
        currentStream.getTracks().forEach(track => track.stop())
        document.body.removeChild(modal)
      }
      
      captureBtn.onclick = () => {
        try {
          // Set canvas dimensions to match video
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          
          // Draw current video frame to canvas
          context?.drawImage(video, 0, 0)
          
          // Convert canvas to blob
          canvas.toBlob((blob) => {
            if (blob) {
              // Create file from blob
              const file = new File([blob], `camera-capture-${Date.now()}.jpg`, { type: 'image/jpeg' })
              console.log('Camera capture successful:', file.name)
              handleImageUpload(file)
            }
            cleanup()
          }, 'image/jpeg', 0.8)
          
        } catch (error) {
          console.error('Capture error:', error)
          cleanup()
          alert(t('captureError', {
            en: 'Failed to capture image. Please try again.',
            ml: 'ചിത്രം പിടിക്കുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.'
          }))
        }
      }
      
      // Assemble modal
      container.appendChild(videoContainer)
      buttonContainer.appendChild(cancelBtn)
      buttonContainer.appendChild(captureBtn)
      buttonContainer.appendChild(switchCameraIcon)
      container.appendChild(buttonContainer)
      modal.appendChild(container)
      document.body.appendChild(modal)
      
      // Handle video loaded
      video.onloadedmetadata = () => {
        console.log('Video metadata loaded, ready to capture')
      }
      
    } catch (error) {
      console.error('Camera error:', error)
      
      let errorMessage = t('cameraError', {
        en: 'Unable to access camera. Please check permissions and try again.',
        ml: 'ക്യാമറ ആക്സസ് ചെയ്യാൻ കഴിയുന്നില്ല. അനുമതികൾ പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക.'
      })
      
      const cameraError = error as any
      if (cameraError.name === 'NotAllowedError') {
        errorMessage = t('cameraPermission', {
          en: 'Camera permission denied. Please allow camera access in your browser settings.',
          ml: 'ക്യാമറ അനുമതി നിഷേധിച്ചു. നിങ്ങളുടെ ബ്രൗസർ ക്രമീകരണങ്ങളിൽ ക്യാമറ ആക്സസ് അനുവദിക്കുക.'
        })
      } else if (cameraError.name === 'NotFoundError') {
        errorMessage = t('cameraNotFound', {
          en: 'No camera found on this device.',
          ml: 'ഈ ഉപകരണത്തിൽ ക്യാമറ കണ്ടെത്തിയില്ല.'
        })
      }
      
      alert(errorMessage)
    }
  }

  return (
    <div className="relative h-full bg-background-light dark:bg-background-dark flex flex-col mobile-height max-w-md mx-auto" 
      style={{ 
        paddingTop: 'env(safe-area-inset-top, 0px)', // Account for mobile safe area
        minHeight: '100vh'
      }}>
      
      {/* Search Bar - Only when active */}
      {showSearch && (
        <div className="fixed top-0 left-0 right-0 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-700 z-40 px-3 py-4 sm:p-4">
          <div className="flex items-center space-x-2 max-w-md mx-auto">
            <div className="flex-1 relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  performSearch(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigateSearch('next')
                  } else if (e.key === 'Escape') {
                    closeSearch()
                  }
                }}
                placeholder={t('searchPlaceholder', { 
                  en: 'Search messages...', 
                  ml: 'സന്ദേശങ്ങൾ തിരയുക...' 
                })}
                className="w-full px-4 py-3 sm:px-3 sm:py-2 text-base sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-text-primary min-h-[48px] sm:min-h-auto touch-manipulation"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    performSearch('')
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Navigation and close buttons */}
            {searchResults.length > 0 && (
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => navigateSearch('prev')}
                  className="p-3 sm:p-2 text-gray-600 dark:text-gray-400 rounded-lg transition-colors min-h-[48px] min-w-[48px] sm:min-h-auto sm:min-w-auto touch-manipulation"
                >
                  <ChevronUp className="w-5 h-5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => navigateSearch('next')}
                  className="p-3 sm:p-2 text-gray-600 dark:text-gray-400 rounded-lg transition-colors min-h-[48px] min-w-[48px] sm:min-h-auto sm:min-w-auto touch-manipulation"
                >
                  <ChevronDown className="w-5 h-5 sm:w-4 sm:h-4" />
                </button>
              </div>
            )}
            
            <button
              onClick={closeSearch}
              className="p-3 sm:p-2 text-gray-600 dark:text-gray-400 rounded-lg transition-colors min-h-[48px] min-w-[48px] sm:min-h-auto sm:min-w-auto touch-manipulation"
            >
              <X className="w-5 h-5 sm:w-4 sm:h-4" />
            </button>
          </div>
          
          {/* Search results info */}
          <div className="text-center mt-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {searchResults.length > 0 ? (
                t('searchResults', { 
                  en: `${currentSearchIndex + 1} of ${searchResults.length} results`, 
                  ml: `${searchResults.length} ൽ ${currentSearchIndex + 1}` 
                })
              ) : searchQuery ? (
                t('noResults', { en: 'No results found', ml: 'ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല' })
              ) : null}
            </p>
          </div>
        </div>
      )}
      
      {/* Header with rounded action buttons - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-20" 
        style={{ 
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 5rem)',
          width: '100%'
        }}>
        <div className="max-w-md mx-auto">
          <div className="flex justify-end items-center space-x-3 mb-4">
            {/* New Chat Button */}
            <button
              onClick={startNewChat}
              className="p-3 rounded-full bg-primary-500 text-white shadow-lg transition-all duration-200 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
              title={t('newChat', { en: 'New Chat', ml: 'പുതിയ ചാറ്റ്' })}
            >
              <Plus className="w-5 h-5" strokeWidth={2} />
            </button>
            
            {/* Search Button - Only show when there are actual chat messages */}
            {messages.length > 1 && (
              <button
                onClick={() => {
                  setShowSearch(!showSearch)
                  if (!showSearch) {
                    setTimeout(() => searchInputRef.current?.focus(), 100)
                  }
                }}
                className={`p-3 rounded-full shadow-lg transition-all duration-200 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  showSearch 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
                title={t('searchChat', { en: 'Search Chat', ml: 'ചാറ്റ് തിരയുക' })}
              >
                <Search className="w-5 h-5" strokeWidth={2} />
              </button>
            )}
            
            {/* Previous Chats Button (History) */}
            <button
              onClick={() => console.log('Show previous chats')} // Placeholder for now
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 shadow-lg transition-all duration-200 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
              title={t('previousChats', { en: 'Previous Chats', ml: 'മുന്നത്തെ ചാറ്റുകൾ' })}
            >
              <Clock className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Messages Area - Full height container with top padding for fixed header */}
      <div 
        ref={scrollContainerRef}
        onScroll={hasChatHistory ? handleScroll : undefined}
        className="flex-1 px-4 pb-8 scroll-smooth chat-scroll flex flex-col"
        id="chat-container"
        style={{ 
          height: showSearch 
            ? 'calc(100vh - 240px - env(safe-area-inset-top, 0px))' // With search bar + fixed header: 100px + 80px + 60px = 240px
            : 'calc(100vh - 160px - env(safe-area-inset-top, 0px))', // With fixed header: input area 100px + header 60px = 160px
          maxHeight: showSearch 
            ? 'calc(100vh - 240px - env(safe-area-inset-top, 0px))' // With search bar + fixed header: 100px + 80px + 60px = 240px
            : 'calc(100vh - 160px - env(safe-area-inset-top, 0px))', // With fixed header: input area 100px + header 60px = 160px
          overflowY: hasChatHistory ? 'auto' : 'hidden',
          display: 'flex',
          flexDirection: 'column',
          scrollBehavior: 'smooth',
          overscrollBehavior: 'contain',
          paddingTop: '140px' // Space for fixed header
        }}
      >
        {messages.length === 1 && (
          /* Welcome Section - Mobile optimized with no scroll */
          <div 
            className="flex flex-col items-center justify-start text-center px-4 sm:px-6"
            style={{ 
              minHeight: '100%',
              overflow: 'hidden'
            }}
          >
            {/* Robot Icon Circle - Mobile responsive */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 dark:text-green-400" />
            </div>
            
            {/* Welcome Title - Mobile responsive */}
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-text-primary mb-2 sm:mb-3">
              {t('welcomeTitle', { 
                en: 'Welcome to Krishi Sakhi AI', 
                ml: 'കൃഷി സഖി AI-യിലേക്ക് സ്വാഗതം' 
              })}
            </h2>
            
            {/* Welcome Message - Mobile responsive */}
            <p className="text-gray-600 dark:text-text-secondary text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 max-w-xs">
              {messages[0].content}
            </p>
            
            {/* Suggestion Buttons - Mobile optimized */}
            <div className="w-full max-w-sm space-y-3">
              <button
                onClick={() => {
                  const message = t('weatherQuery', { 
                    en: 'What is the current weather forecast for farming?', 
                    ml: 'കൃഷിക്കായുള്ള നിലവിലെ കാലാവസ്ഥ പ്രവചനം എന്താണ്?' 
                  })
                  setInputMessage(message)
                  setTimeout(() => handleSendMessage(), 100)
                }}
                className="w-full py-4 px-4 bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-text-primary rounded-xl border border-gray-200 dark:border-gray-600 transition-colors text-sm font-medium focus:ring-2 focus:ring-primary-400 min-h-[48px] touch-manipulation active:scale-98"
              >
                {t('weatherForecast', { en: 'Weather Forecast', ml: 'കാലാവസ്ഥ പ്രവചനം' })}
              </button>
              
              <button
                onClick={() => {
                  const message = t('diseaseQuery', { 
                    en: 'How can I identify and treat paddy diseases?', 
                    ml: 'നെൽ രോഗങ്ങൾ എങ്ങനെ തിരിച്ചറിയാനും ചികിത്സിക്കാനും കഴിയും?' 
                  })
                  setInputMessage(message)
                  setTimeout(() => handleSendMessage(), 100)
                }}
                className="w-full py-4 px-4 bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-text-primary rounded-xl border border-gray-200 dark:border-gray-600 transition-colors text-sm font-medium focus:ring-2 focus:ring-primary-400 min-h-[48px] touch-manipulation active:scale-98"
              >
                {t('paddyDisease', { en: 'Paddy Disease', ml: 'നെൽക്കൃഷി രോഗങ്ങൾ' })}
              </button>
              
              <button
                onClick={() => {
                  const message = t('fertilizerQuery', { 
                    en: 'What are the best organic fertilizers for crops?', 
                    ml: 'വിളകൾക്ക് ഏറ്റവും മികച്ച ജൈവ വളങ്ങൾ ഏതാണ്?' 
                  })
                  setInputMessage(message)
                  setTimeout(() => handleSendMessage(), 100)
                }}
                className="w-full py-4 px-4 bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-text-primary rounded-xl border border-gray-200 dark:border-gray-600 transition-colors text-sm font-medium focus:ring-2 focus:ring-primary-400 min-h-[48px] touch-manipulation active:scale-98"
              >
                {t('organicFertilizers', { en: 'Organic Fertilizers', ml: 'ജൈവ വളങ്ങൾ' })}
              </button>
            </div>
          </div>
        )}
        
        {/* Chat Messages */}
        {messages.length > 1 && (
          <div className="flex flex-col mt-auto space-y-3 pb-24">
            {messages.slice(1).map((message) => (
              <div
                key={message.id}
                id={`message-${message.id}`}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in px-1`}
              >
                <div className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'} max-w-[90%] sm:max-w-[85%]`}>
                  <div
                    className={`px-3 py-3 sm:px-4 rounded-2xl ${
                      message.isUser
                        ? 'bg-primary-500 text-white rounded-br-md border-2 border-primary-600'
                        : 'bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-text-primary rounded-bl-md border-2 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {message.imageUrl && (
                      <div className="mb-2">
                        <img
                          src={message.imageUrl}
                          alt="Uploaded"
                          className="max-w-48 max-h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                        />
                      </div>
                    )}
                    {!message.isUser ? (
                      <div>
                        {/* AI Message Content */}
                        {formatAIResponse(
                          message.isTranslated && message.translatedContent 
                            ? message.translatedContent 
                            : message.content
                        )}
                        
                        {/* Action Buttons for AI Messages - Mobile Optimized */}
                        <div className="flex items-center justify-end gap-1 sm:gap-2 mt-3 pt-2 border-t border-gray-200 dark:border-gray-600 flex-wrap">
                          {/* Copy Button */}
                          <button
                            onClick={() => copyMessage(message.id)}
                            className="flex items-center gap-1 px-3 py-2 sm:px-2 sm:py-1 text-xs text-gray-600 dark:text-gray-400 rounded-md transition-colors min-h-[36px] touch-manipulation"
                            title="Copy message"
                          >
                            {copiedMessageId === message.id ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            {copiedMessageId === message.id ? (
                              t('copied', { en: 'Copied', ml: 'പകർത്തി' })
                            ) : (
                              t('copy', { en: 'Copy', ml: 'പകർത്തുക' })
                            )}
                          </button>
                          
                          {/* Translate Button */}
                          <button
                            onClick={() => translateMessage(message.id)}
                            disabled={isTranslating === message.id}
                            className="flex items-center gap-1 px-3 py-2 sm:px-2 sm:py-1 text-xs text-gray-600 dark:text-gray-400 rounded-md transition-colors disabled:opacity-50 min-h-[36px] touch-manipulation"
                            title={message.isTranslated ? "Show Original" : "Translate"}
                          >
                            <Languages className="w-3 h-3" />
                            {isTranslating === message.id ? (
                              t('translating', { en: 'Translating...', ml: 'വിവർത്തനം ചെയ്യുന്നു...' })
                            ) : message.isTranslated ? (
                              t('showOriginal', { en: 'Original', ml: 'യഥാർത്ഥം' })
                            ) : (
                              t('translate', { en: 'Translate', ml: 'വിവർത്തനം' })
                            )}
                          </button>
                          
                          {/* TTS Button */}
                          <button
                            onClick={() => {
                              if (isReading === message.id) {
                                stopReading()
                              } else {
                                readMessage(message.id)
                              }
                            }}
                            className="flex items-center gap-1 px-3 py-2 sm:px-2 sm:py-1 text-xs text-gray-600 dark:text-gray-400 rounded-md transition-colors min-h-[36px] touch-manipulation"
                            title={isReading === message.id ? "Stop reading" : "Listen to message"}
                          >
                            {isReading === message.id ? (
                              <Square className="w-3 h-3" />
                            ) : (
                              <Volume2 className="w-3 h-3" />
                            )}
                            {isReading === message.id ? (
                              t('stop', { en: 'Stop', ml: 'നിർത്തുക' })
                            ) : (
                              t('listen', { en: 'Listen', ml: 'കേൾക്കുക' })
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      // User messages without copy functionality
                      <div>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* WhatsApp-style Scroll to Bottom Button - Mobile Optimized */}
      {showScrollButton && (
        <div 
          className="absolute right-4 sm:right-6 z-40"
          style={{
            bottom: '140px' // Moved higher - increased from 112px to 140px
          }}
        >
          <button
            onClick={scrollToBottom}
            className="w-12 h-12 sm:w-10 sm:h-10 bg-white dark:bg-gray-700 rounded-full border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center transition-all duration-200 touch-manipulation"
            aria-label="Scroll to bottom"
          >
            <ChevronDown className="w-6 h-6 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      )}

      {/* Image Upload Popup */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 m-4 max-w-sm w-full border-2 border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary mb-4">
              {t('addImage', { en: 'Add Image', ml: 'ചിത്രം ചേർക്കുക' })}
            </h3>
            <div className="space-y-3">
              <button
                onClick={handleCamera}
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-primary-500 text-white rounded-xl transition-colors"
              >
                <Camera className="w-5 h-5" />
                <span>{t('takePhoto', { en: 'Take Photo', ml: 'ഫോട്ടോ എടുക്കുക' })}</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-text-primary rounded-xl transition-colors"
              >
                <Upload className="w-5 h-5" />
                <span>{t('uploadImage', { en: 'Upload Image', ml: 'ചിത്രം അപ്‌ലോഡ് ചെയ്യുക' })}</span>
              </button>
              <button
                onClick={() => setShowImageUpload(false)}
                className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-text-primary rounded-xl transition-colors"
              >
                {t('cancel', { en: 'Cancel', ml: 'റദ്ദാക്കുക' })}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Chat Confirmation Dialog */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 m-4 max-w-sm w-full border-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
                {t('clearChatTitle', { en: 'Clear Chat History?', ml: 'ചാറ്റ് ചരിത്രം മായ്ക്കണോ?' })}
              </h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              {t('clearChatMessage', { 
                en: 'This will permanently delete all your chat messages. This action cannot be undone.',
                ml: 'ഇത് നിങ്ങളുടെ എല്ലാ ചാറ്റ് സന്ദേശങ്ങളും സ്ഥിരമായി ഇല്ലാതാക്കും. ഈ പ്രവർത്തനം പഴയപടിയാക്കാൻ കഴിയില്ല.'
              })}
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-text-primary rounded-xl transition-colors font-medium"
              >
                {t('cancel', { en: 'Cancel', ml: 'റദ്ദാക്കുക' })}
              </button>
              <button
                onClick={clearChat}
                className="flex-1 py-3 px-4 bg-red-500 text-white rounded-xl transition-colors font-medium"
              >
                {t('clearConfirm', { en: 'Clear Chat', ml: 'ചാറ്റ് മായ്ക്കുക' })}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            handleImageUpload(file)
          }
        }}
        style={{ display: 'none' }}
      />

      {/* Hidden Mobile Camera Input */}
      <input
        ref={mobileFileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleMobileCameraFile}
        style={{ display: 'none' }}
      />

      {/* Fixed Input Area */}
      <div 
        className="fixed left-0 right-0 bg-background-light dark:bg-background-dark px-3 py-4 sm:p-4 z-40 safe-area-inset-bottom"
        style={{
          bottom: '100px' // Moved up higher to provide better spacing from floating navbar
        }}
      >
        {/* Image Preview */}
        {selectedImage && (
          <div className="mb-3 max-w-md mx-auto">
            <div className="relative inline-block">
              <img
                src={selectedImage.preview}
                alt="Selected"
                className="w-20 h-20 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-2 sm:space-x-3 max-w-md mx-auto">
          {/* Image Upload Button */}
          <button
            type="button"
            onClick={() => setShowImageUpload(true)}
            className="p-3 sm:p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors focus:ring-2 focus:ring-primary-400 min-h-[48px] min-w-[48px] touch-manipulation border border-gray-300 dark:border-gray-600 flex items-center justify-center"
          >
            <Image className="w-5 h-5" />
          </button>
          
          {/* Input Field */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={t('chatPlaceholder', {
                en: 'Ask a question...',
                ml: 'ചോദ്യം ചോദിക്കൂ...'
              })}
              className="w-full px-4 py-3 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-text-primary text-base sm:text-sm min-h-[48px] touch-manipulation"
              maxLength={500}
            />
          </div>
          
          {/* Voice Button */}
          <button
            type="button"
            onClick={handleVoiceRecording}
            className={`p-3 sm:p-3 rounded-full transition-colors focus:ring-2 focus:ring-primary-400 min-h-[48px] min-w-[48px] touch-manipulation border flex items-center justify-center ${
              isListening
                ? 'bg-red-500 text-white animate-pulse border-red-600'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600'
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>
          
          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={(!inputMessage.trim() && !selectedImage) || isLoading}
            className={`p-3 sm:p-3 rounded-full transition-all duration-200 focus:ring-2 focus:ring-primary-400 min-h-[48px] min-w-[48px] touch-manipulation border flex items-center justify-center ${
              (inputMessage.trim() || selectedImage) && !isLoading
                ? 'bg-primary-500 text-white border-primary-600 active:bg-primary-600 active:scale-95'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-600'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat