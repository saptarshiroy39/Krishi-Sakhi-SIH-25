// Single initialization block (avoid duplicates)
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeLanguage();
    initializeActivities();
    initializeInteractiveElements();
    initializeNavigation();
    initializeChat();
    initializeKnowledge();
    initializeSchemes();
    initializeHeroQuickActions();
    updateInlineWeather();
});

// Theme functionality
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle?.querySelector('.material-icons');
    
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        if (themeIcon) themeIcon.textContent = 'dark_mode';
    }
    
    // Theme toggle handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');
            
            if (themeIcon) {
                themeIcon.textContent = isLight ? 'dark_mode' : 'light_mode';
            }
            
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            // Enhanced visual feedback
            themeToggle.style.transform = 'scale(0.85) rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
            
            showToast(isLight ? 'Switched to Light Mode' : 'Switched to Dark Mode', 'info');
        });
    }
}

// Language functionality
function initializeLanguage() {
    const languageToggle = document.getElementById('language-toggle');
    const icon = languageToggle?.querySelector('.material-icons');
    const savedLanguage = localStorage.getItem('language') || 'en';
    if (savedLanguage === 'ml') {
        switchLanguage('ml');
        if (icon) icon.classList.add('lang-ml');
    }
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            const current = localStorage.getItem('language') || 'en';
            const next = current === 'en' ? 'ml' : 'en';
            localStorage.setItem('language', next);
            switchLanguage(next);
            if (icon) {
                icon.style.transform = 'rotateY(180deg)';
                setTimeout(()=> icon.style.transform='rotateY(0deg)',300);
            }
            showToast(next === 'en' ? 'Language switched to English' : 'ഭാഷ മലയാളമായി മാറ്റി', 'success');
        });
    }
}

function switchLanguage(lang) {
    const elements = document.querySelectorAll('[data-en][data-ml]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            // Add fade effect
            element.style.opacity = '0.7';
            setTimeout(() => {
                element.textContent = text;
                element.style.opacity = '1';
            }, 100);
        }
    });
    
    // Update placeholder text for input fields
    const inputElements = document.querySelectorAll('[data-en-placeholder][data-ml-placeholder]');
    inputElements.forEach(element => {
        const placeholder = element.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
    
    // Update activities with language
    setTimeout(() => {
        if (typeof displayActivities === 'function') {
            displayActivities();
        }
    }, 200);
}

// Activities functionality
function initializeActivities() {
    const activitiesList = document.getElementById('activities-list');
    
    if (!activitiesList) return;

    // Sample data for recent activities with more details
    const activities = [
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
            status: 'completed'
        },
        {
            name: { en: 'Fertilizing', ml: 'വളപ്രയോഗം' },
            date: '20/07/2024',
            crop: { en: 'Wheat', ml: 'ഗോതമ്പ്' },
            status: 'pending'
        }
    ];

    function displayActivities() {
        if (!activitiesList) return;
        
        const currentLang = localStorage.getItem('language') || 'en';
        activitiesList.innerHTML = '';
        const displayCount = window.location.pathname === '/activities' ? activities.length : 3;
        
        activities.slice(0, displayCount).forEach((activity, index) => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.style.animationDelay = `${index * 0.1}s`;
            
            const statusClass = activity.status === 'completed' ? 'completed' : 'pending';
            const statusText = activity.status === 'completed' 
                ? (currentLang === 'en' ? 'Completed' : 'പൂർത്തിയായി') 
                : (currentLang === 'en' ? 'Pending' : 'അവശേഷിക്കുന്ന');
            
            const activityName = typeof activity.name === 'object' ? activity.name[currentLang] : activity.name;
            const cropName = typeof activity.crop === 'object' ? activity.crop[currentLang] : activity.crop;
            
            activityItem.innerHTML = `
                <div class="activity-main">
                    <span class="activity-name">${activityName}</span>
                    <span class="activity-crop">${cropName}</span>
                </div>
                <div class="activity-meta">
                    <div class="activity-date">${activity.date}</div>
                    <div class="activity-status ${statusClass}">${statusText}</div>
                </div>
            `;
            activitiesList.appendChild(activityItem);
        });
    }
    
    // Make displayActivities globally accessible
    window.displayActivities = displayActivities;

    displayActivities();
}

// Interactive elements functionality
function initializeInteractiveElements() {
    // Advisory button
    const advisoryBtn = document.querySelector('.advisory-content .btn');
    if (advisoryBtn) {
        advisoryBtn.addEventListener('click', () => {
            showToast('Generating personalized advisory...', 'info');
            // Add loading state
            advisoryBtn.style.opacity = '0.7';
            advisoryBtn.textContent = 'Generating...';
            
            setTimeout(() => {
                advisoryBtn.style.opacity = '1';
                advisoryBtn.textContent = 'Get Advisory';
                showToast('Advisory generated! Check your dashboard.', 'success');
            }, 2000);
        });
    }
    
    // Add click effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on buttons or links
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
            
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            item.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Utility functions
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Weather update functionality
function updateWeather() {
    const weatherDiv = document.querySelector('.weather');
    if (weatherDiv) {
        // Simulate weather update
        const temps = ['26°C', '28°C', '30°C', '25°C'];
        const conditions = ['Clear', 'Cloudy', 'Sunny', 'Partly Cloudy'];
        
        const randomTemp = temps[Math.floor(Math.random() * temps.length)];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        
        const tempDiv = weatherDiv.querySelector('div:first-child');
        const conditionDiv = weatherDiv.querySelector('div:last-child');
        
        if (tempDiv) tempDiv.textContent = randomTemp;
        if (conditionDiv) conditionDiv.textContent = randomCondition;
    }
}

// Update weather every 5 minutes
setInterval(updateWeather, 300000);

// Chat functionality
function initializeChat() {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!chatInput || !sendBtn || !chatMessages) return;
    
    // Sample responses
    const botResponses = {
        greeting: [
            "Hello! How can I help you with your farming today?",
            "Hi there! What farming questions do you have?",
            "Welcome! I'm here to assist with your agricultural needs."
        ],
        weather: [
            "The current weather is perfect for outdoor activities. Temperature is 28°C with clear skies.",
            "It's a great day for farming! Clear weather with good visibility.",
            "Weather conditions are favorable for most farming activities today."
        ],
        crops: [
            "For this season, I recommend focusing on rice and wheat cultivation based on your region.",
            "Consider crop rotation to maintain soil health. Rice-wheat rotation works well.",
            "Your crops are looking good based on recent activity logs!"
        ],
        activities: [
            "I see you've been active with sowing and watering. Great work!",
            "Remember to log your pest control activities for better tracking.",
            "Your recent activities show good farming practices. Keep it up!"
        ],
        default: [
            "That's interesting! Can you tell me more about your specific farming needs?",
            "I'd love to help! Could you provide more details about your question?",
            "Great question! Let me think about the best farming advice for that."
        ]
    };
    
    function getRandomResponse(category) {
        const responses = botResponses[category] || botResponses.default;
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const p = document.createElement('p');
        p.textContent = content;
        contentDiv.appendChild(p);
        messageDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add animation
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 50);
    }
    
    function getBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return getRandomResponse('greeting');
        } else if (message.includes('weather') || message.includes('temperature') || message.includes('rain')) {
            return getRandomResponse('weather');
        } else if (message.includes('crop') || message.includes('plant') || message.includes('grow') || message.includes('seed')) {
            return getRandomResponse('crops');
        } else if (message.includes('activity') || message.includes('log') || message.includes('record')) {
            return getRandomResponse('activities');
        } else {
            return getRandomResponse('default');
        }
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, true);
        chatInput.value = '';
        sendBtn.disabled = true;
        
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot typing';
        typingDiv.innerHTML = '<div class="message-content"><p>Typing...</p></div>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate bot response delay
        setTimeout(() => {
            typingDiv.remove();
            const response = getBotResponse(message);
            addMessage(response);
            sendBtn.disabled = false;
        }, 1000 + Math.random() * 1000);
    }
    
    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    chatInput.addEventListener('input', () => {
        sendBtn.disabled = chatInput.value.trim() === '';
    });
    
    // Initial state
    sendBtn.disabled = true;
}

// Removed duplicate DOMContentLoaded block above

// Knowledge page functionality
function initializeKnowledge() {
    const knowledgeBtns = document.querySelectorAll('.knowledge-btn');
    
    knowledgeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.knowledge-card');
            const title = card.querySelector('h3').textContent;
            
            showToast(`Loading ${title} information...`, 'info');
            
            // Add loading state
            btn.style.opacity = '0.7';
            const originalText = btn.textContent;
            btn.textContent = 'Loading...';
            
            setTimeout(() => {
                btn.style.opacity = '1';
                btn.textContent = originalText;
                showToast(`${title} guide is now available!`, 'success');
            }, 1500);
        });
    });
}

// Schemes page functionality
function initializeSchemes() {
    const schemeLinks = document.querySelectorAll('.scheme-link');
    
    schemeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const card = link.closest('.scheme-card');
            const title = card.querySelector('h3').textContent;
            
            showToast(`Opening ${title} details...`, 'info');
            
            setTimeout(() => {
                showToast('Scheme details loaded successfully!', 'success');
            }, 1000);
        });
    });
}

// Hero quick actions
function initializeHeroQuickActions() {
    const qaButtons = document.querySelectorAll('.qa-btn');
    qaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            btn.style.transform = 'scale(0.94)';
            setTimeout(()=> btn.style.transform='scale(1)',180);
            let message;
            switch(action){
                case 'weather':
                    message = 'Opening detailed weather insights...';
                    break;
                case 'paddy':
                    message = 'Analyzing paddy disease knowledge base...';
                    break;
                case 'organic':
                    message = 'Listing recommended organic fertilizers...';
                    break;
                default:
                    message = 'Processing action...';
            }
            showToast(message,'info');
        });
    });
}

// Inline weather miniature update referencing existing updateWeather for main card if needed
function updateInlineWeather() {
    const mini = document.getElementById('inline-weather');
    if(!mini) return;
    const temps = ['26°C','27°C','28°C','29°C','30°C'];
    const conds = [
        {en:'Clear', ml:'വെയിൽ'},
        {en:'Cloudy', ml:'മേഘാവൃതം'},
        {en:'Sunny', ml:'സൂര്യപ്രകാശം'},
        {en:'Humid', ml:'ആർദ്രം'}
    ];
    const t = temps[Math.floor(Math.random()*temps.length)];
    const c = conds[Math.floor(Math.random()*conds.length)];
    const tempEl = mini.querySelector('.mini-temp');
    const condEl = mini.querySelector('.mini-condition');
    if(tempEl) tempEl.textContent = t;
    if(condEl){
        const lang = localStorage.getItem('language') || 'en';
        condEl.textContent = c[lang];
        condEl.setAttribute('data-en', c.en);
        condEl.setAttribute('data-ml', c.ml);
    }
    setTimeout(updateInlineWeather, 240000); // refresh every 4 minutes
}
