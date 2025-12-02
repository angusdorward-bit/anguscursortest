// Chatbot functionality for San Francisco Jogging Tours
document.addEventListener('DOMContentLoaded', function() {
    const chatbotWidget = document.getElementById('chatbotWidget');
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');

    // Tour information
    const routes = [
        { name: 'Golden Gate Bridge Loop', duration: '45 minutes' },
        { name: 'Crissy Field to Fort Point', duration: '30 minutes' },
        { name: 'Marina Green to Palace of Fine Arts', duration: '25 minutes' },
        { name: 'Presidio Coastal Trail', duration: '75 minutes' },
        { name: 'Embarcadero Waterfront', duration: '40 minutes' },
        { name: 'Muir Woods', duration: '60 minutes' }
    ];

    // Generate available time slots for the next 7 days
    function getAvailableTimeSlots() {
        const slots = [];
        const today = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        // Generate slots for next 7 days
        for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
            const date = new Date(today);
            date.setDate(today.getDate() + dayOffset);
            const dayName = days[date.getDay()];
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            
            // Available times: 6:00 AM, 8:00 AM, 10:00 AM, 2:00 PM, 4:00 PM
            const times = ['6:00 AM', '8:00 AM', '10:00 AM', '2:00 PM', '4:00 PM'];
            
            times.forEach(time => {
                // Randomly make some slots unavailable (simulating bookings)
                if (Math.random() > 0.3) { // 70% availability
                    slots.push({
                        date: dateStr,
                        day: dayName,
                        time: time,
                        available: true
                    });
                }
            });
        }
        
        return slots;
    }

    // Format time slots for display
    function formatTimeSlots(slots) {
        if (slots.length === 0) {
            return 'Sorry, all time slots are currently booked for the next 7 days. Please check back later or contact us directly for special arrangements.';
        }

        let grouped = {};
        slots.forEach(slot => {
            const key = `${slot.day}, ${slot.date}`;
            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(slot.time);
        });

        let message = 'Here are the available tour times for the next 7 days:\n\n';
        Object.keys(grouped).forEach(date => {
            message += `📅 **${date}**\n`;
            grouped[date].forEach(time => {
                message += `   • ${time}\n`;
            });
            message += '\n';
        });
        message += 'Would you like to book one of these times?';
        
        return message;
    }

    // AI Response Generator
    function generateResponse(userMessage) {
        const message = userMessage.toLowerCase().trim();

        // Check for scheduling/availability questions
        if (message.includes('available') || message.includes('schedule') || 
            message.includes('time') || message.includes('when') || 
            message.includes('booking') || message.includes('book') ||
            message.includes('slot') || message.includes('appointment')) {
            const slots = getAvailableTimeSlots();
            return formatTimeSlots(slots);
        }

        // Check for route questions
        if (message.includes('route') || message.includes('tour') && !message.includes('price')) {
            if (message.includes('golden gate')) {
                return `The **Golden Gate Bridge Loop** is a 45-minute tour that takes you across the iconic bridge with stunning panoramic views of the bay, Crissy Field, and the Pacific Ocean. It's one of our most popular routes! 🌉`;
            }
            if (message.includes('crissy') || message.includes('fort point')) {
                return `The **Crissy Field to Fort Point** route is a 30-minute scenic run along the waterfront, passing by the beautiful beach and ending at the historic Fort Point National Historic Site directly under the Golden Gate Bridge. 🏃`;
            }
            if (message.includes('marina') || message.includes('palace')) {
                return `The **Marina Green to Palace of Fine Arts** is a 25-minute route showcasing the beautiful Greco-Roman inspired Palace of Fine Arts and the scenic marina with yacht harbor views. 🏛️`;
            }
            if (message.includes('presidio') || message.includes('coastal')) {
                return `The **Presidio Coastal Trail** is our longest route at 75 minutes. It features Baker Beach, coastal redwoods, and spectacular ocean views. Perfect for those who want a longer adventure! 🌊`;
            }
            if (message.includes('embarcadero') || message.includes('waterfront')) {
                return `The **Embarcadero Waterfront** route is a 40-minute tour along the historic waterfront, passing the Ferry Building, Pier 39, and offering views of Alcatraz Island. ⛵`;
            }
            if (message.includes('muir woods')) {
                return `The **Muir Woods** tour is a 60-minute adventure through the beautiful redwood forest. This route takes you through majestic old-growth redwoods in the heart of the Bay Area. 🌲`;
            }
            
            // General routes question
            let routesList = 'We offer 6 amazing running routes:\n\n';
            routes.forEach(route => {
                routesList += `🏃 **${route.name}** - ${route.duration}\n`;
            });
            routesList += '\nWhich route would you like to learn more about?';
            return routesList;
        }

        // Check for pricing questions
        if (message.includes('price') || message.includes('cost') || 
            message.includes('fee') || message.includes('how much') ||
            message.includes('payment')) {
            return `Our standard tour pricing:\n\n💰 **Individual Tour:** $45 per person\n💰 **Group Tour (3-5 people):** $40 per person\n💰 **Large Group (6+ people):** $35 per person\n\nAll tours include a certified guide, route information, and water breaks. Prices may vary for special events or private tours. Would you like to book a tour?`;
        }

        // Check for duration/length questions
        if (message.includes('how long') || message.includes('duration') || 
            message.includes('length') || message.includes('time') && message.includes('take')) {
            return `Our tours vary in length:\n\n⏱️ **Short tours (25-30 min):** Marina Green to Palace of Fine Arts, Crissy Field to Fort Point\n⏱️ **Medium tours (40-45 min):** Golden Gate Bridge Loop, Embarcadero Waterfront\n⏱️ **Long tours (60-75 min):** Muir Woods, Presidio Coastal Trail\n\nAll times are approximate and include stops for photos and rest. Which route are you interested in?`;
        }

        // Check for difficulty/fitness questions
        if (message.includes('difficult') || message.includes('fitness') || 
            message.includes('level') || message.includes('beginner') ||
            message.includes('experienced') || message.includes('pace')) {
            return `Our tours are designed for all fitness levels! 🏃\n\n**Beginner-friendly routes:**\n• Marina Green to Palace of Fine Arts (25 min, flat terrain)\n• Crissy Field to Fort Point (30 min, mostly flat)\n\n**Moderate routes:**\n• Golden Gate Bridge Loop (45 min, some hills)\n• Embarcadero Waterfront (40 min, flat)\n\n**Challenging routes:**\n• Presidio Coastal Trail (75 min, varied terrain)\n• Muir Woods (60 min, some elevation)\n\nOur guides adjust the pace to match the group. No one gets left behind! Which route sounds right for you?`;
        }

        // Check for what to bring questions
        if (message.includes('bring') || message.includes('need') && 
            (message.includes('what') || message.includes('should'))) {
            return `Here's what to bring for your tour:\n\n✅ Comfortable running shoes\n✅ Weather-appropriate athletic clothing\n✅ Water bottle (we also provide water breaks)\n✅ Sunscreen (especially for morning tours)\n✅ Phone/camera for photos\n\nWe recommend light layers since San Francisco weather can change quickly. Our guides will have first aid supplies and route information. Anything else you'd like to know?`;
        }

        // Check for weather questions
        if (message.includes('weather') || message.includes('rain') || 
            message.includes('cancel') || message.includes('refund')) {
            return `Weather Policy:\n\n🌤️ Tours run in most weather conditions (light rain is fine!)\n⛈️ Tours are cancelled only for severe weather (heavy rain, storms, unsafe conditions)\n🔄 Full refunds or rescheduling available for weather cancellations\n☀️ San Francisco weather is usually perfect for running!\n\nWe'll contact you 24 hours before if there are any concerns. Ready to check available times?`;
        }

        // Check for location/meeting point questions
        if (message.includes('where') || message.includes('meet') || 
            message.includes('location') || message.includes('start')) {
            return `Meeting Points:\n\n📍 **Golden Gate Bridge routes:** Meet at Crissy Field parking lot\n📍 **Marina routes:** Meet at Marina Green\n📍 **Embarcadero:** Meet at Ferry Building\n📍 **Muir Woods:** We'll coordinate a meeting point (transportation available)\n\nExact meeting points and directions are sent via email when you book. All locations are easily accessible by public transit or car (parking available). Which route interests you?`;
        }

        // Check for group/private tour questions
        if (message.includes('group') || message.includes('private') || 
            message.includes('alone') || message.includes('solo')) {
            return `Group Options:\n\n👥 **Public tours:** Join other runners - great way to meet people!\n👤 **Private tours:** Available for individuals or private groups\n👨‍👩‍👧‍👦 **Corporate/team building:** Special rates for groups of 8+\n\nPrivate tours can be customized to your pace and interests. Would you like to check available times for public tours or inquire about a private tour?`;
        }

        // Check for greeting/friendly responses
        if (message.includes('hello') || message.includes('hi') || 
            message.includes('hey') || message === '') {
            return `Hi! I'm here to help you plan your perfect running tour of San Francisco! 🏃\n\nI can help you:\n• Check available tour times\n• Learn about our routes\n• Answer questions about pricing, difficulty, and more\n\nWhat would you like to know?`;
        }

        // Check for contact/questions
        if (message.includes('contact') || message.includes('email') || 
            message.includes('phone') || message.includes('reach')) {
            return `You can reach us:\n\n📧 Email: info@sfjoggingtours.com\n📞 Phone: (415) 555-RUNS\n💬 Chat: Right here! (That's me!)\n\nOr visit our Contact page for more information. Is there something specific I can help you with?`;
        }

        // Default response for unrecognized queries
        return `I'm here to help you with:\n\n📅 **Scheduling** - Check available tour times\n📍 **Routes** - Learn about our 6 different running routes\n💰 **Pricing** - Get tour cost information\n❓ **General Questions** - Ask about difficulty, what to bring, weather, etc.\n\nCould you rephrase your question, or would you like to check available times?`;
    }

    // Add message to chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (typeof content === 'string') {
            // Simple text message
            const paragraphs = content.split('\n\n');
            paragraphs.forEach(para => {
                if (para.trim()) {
                    const p = document.createElement('p');
                    // Handle bold text
                    p.innerHTML = para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    contentDiv.appendChild(p);
                }
            });
        } else {
            contentDiv.appendChild(content);
        }
        
        messageDiv.appendChild(contentDiv);
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Show typing indicator
    function showTypingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message bot-message';
        messageDiv.id = 'typing-indicator';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'typing-indicator';
        contentDiv.innerHTML = '<span></span><span></span><span></span>';
        
        messageDiv.appendChild(contentDiv);
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    // Scroll to bottom of chat
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Handle user message
    function handleUserMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, true);
        chatbotInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Generate and show bot response after a short delay
        setTimeout(() => {
            removeTypingIndicator();
            const response = generateResponse(message);
            addMessage(response, false);
        }, 1000 + Math.random() * 1000); // 1-2 second delay to simulate thinking
    }

    // Toggle chatbot
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            chatbotContainer.classList.toggle('active');
            if (chatbotContainer.classList.contains('active')) {
                chatbotInput.focus();
            }
        });
    }

    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            chatbotContainer.classList.remove('active');
        });
    }

    // Send message on button click
    if (chatbotSend) {
        chatbotSend.addEventListener('click', handleUserMessage);
    }

    // Send message on Enter key
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleUserMessage();
            }
        });
    }

    // Prevent chatbot from closing when clicking inside
    if (chatbotContainer) {
        chatbotContainer.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

