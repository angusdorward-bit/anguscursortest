// Rain Effect Animation (Low Intensity)
document.addEventListener('DOMContentLoaded', function() {
    const rainContainer = document.getElementById('rainContainer');
    
    if (rainContainer) {
        // Create rain drops with low intensity
        for (let i = 0; i < 30; i++) { // Reduced from typical 50-100 for low intensity
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            drop.style.left = Math.random() * 100 + '%';
            drop.style.animationDuration = (Math.random() * 2 + 1) + 's';
            drop.style.animationDelay = Math.random() * 2 + 's';
            drop.style.opacity = Math.random() * 0.3 + 0.1; // Low opacity
            rainContainer.appendChild(drop);
        }
    }

    // Dropdown Toggle Functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const dropdownContent = this.nextElementSibling;
            
            // Close all other dropdowns
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    otherToggle.setAttribute('aria-expanded', 'false');
                    const otherContent = otherToggle.nextElementSibling;
                    if (otherContent) {
                        otherContent.classList.remove('active');
                    }
                }
            });
            
            // Toggle current dropdown
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                dropdownContent.classList.remove('active');
            } else {
                this.setAttribute('aria-expanded', 'true');
                dropdownContent.classList.add('active');
            }
        });
    });

    // Ambient Music Player Functionality
    const musicToggle = document.getElementById('musicToggle');
    const ambientMusic = document.getElementById('ambientMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeControl = document.querySelector('.music-volume-control');
    
    if (musicToggle && ambientMusic) {
        // Set initial volume
        ambientMusic.volume = volumeSlider.value / 100;
        
        // Handle play/pause toggle
        musicToggle.addEventListener('click', function() {
            if (ambientMusic.paused) {
                // Attempt to play music (requires user interaction due to browser policies)
                ambientMusic.play().then(() => {
                    musicToggle.classList.add('playing');
                    musicToggle.querySelector('.music-label').textContent = 'Music On';
                }).catch(error => {
                    console.log('Autoplay prevented. User interaction required.');
                    // Show message or keep button state
                });
            } else {
                ambientMusic.pause();
                musicToggle.classList.remove('playing');
                musicToggle.querySelector('.music-label').textContent = 'Ambient Music';
            }
        });
        
        // Handle volume control
        if (volumeSlider) {
            volumeSlider.addEventListener('input', function() {
                ambientMusic.volume = this.value / 100;
            });
            
            // Show volume control on hover and when interacting
            volumeSlider.addEventListener('mousedown', function() {
                volumeControl.classList.add('active');
            });
        }
        
        // Update button state when music ends or is paused
        ambientMusic.addEventListener('pause', function() {
            musicToggle.classList.remove('playing');
            musicToggle.querySelector('.music-label').textContent = 'Ambient Music';
        });
        
        ambientMusic.addEventListener('play', function() {
            musicToggle.classList.add('playing');
            musicToggle.querySelector('.music-label').textContent = 'Music On';
        });
        
        // Handle errors (e.g., file not found)
        ambientMusic.addEventListener('error', function() {
            console.log('Error loading audio file. Please ensure ambient-music.mp3 or ambient-music.ogg exists.');
            musicToggle.style.opacity = '0.6';
            musicToggle.style.cursor = 'not-allowed';
            musicToggle.title = 'Audio file not found. Please add ambient-music.mp3 or ambient-music.ogg to your project folder.';
        });
    }

    // Liability Waiver Modal Functionality
    const waiverModal = document.getElementById('waiverModal');
    const waiverButton = document.getElementById('waiverButton');
    const waiverLink = document.getElementById('waiverLink');
    const waiverClose = document.getElementById('waiverClose');
    const waiverAgree = document.getElementById('waiverAgree');
    const waiverDecline = document.getElementById('waiverDecline');
    const waiverDate = document.getElementById('waiverDate');
    
    // Set current date in waiver
    if (waiverDate) {
        const today = new Date();
        const dateString = today.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        waiverDate.textContent = dateString;
    }
    
    // Function to open modal
    function openWaiverModal() {
        if (waiverModal) {
            waiverModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }
    
    // Function to close modal
    function closeWaiverModal() {
        if (waiverModal) {
            waiverModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
    
    // Open modal on button clicks
    if (waiverButton) {
        waiverButton.addEventListener('click', openWaiverModal);
    }
    
    if (waiverLink) {
        waiverLink.addEventListener('click', openWaiverModal);
    }
    
    // Close modal on X button
    if (waiverClose) {
        waiverClose.addEventListener('click', closeWaiverModal);
    }
    
    // Close modal on Cancel button
    if (waiverDecline) {
        waiverDecline.addEventListener('click', closeWaiverModal);
    }
    
    // Handle "I Agree" button
    if (waiverAgree) {
        waiverAgree.addEventListener('click', function() {
            // Here you would typically save the agreement to a database
            // For now, we'll just show an alert and close the modal
            alert('Thank you for acknowledging the liability waiver. You can now proceed with booking your tour.');
            closeWaiverModal();
        });
    }
    
    // Close modal when clicking outside of it
    if (waiverModal) {
        waiverModal.addEventListener('click', function(e) {
            if (e.target === waiverModal) {
                closeWaiverModal();
            }
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && waiverModal && waiverModal.classList.contains('active')) {
            closeWaiverModal();
        }
    });

    // Dark Mode Functionality
    const darkModeButton = document.getElementById('darkModeButton');
    const body = document.body;
    
    // Function to get current PST time
    function getPSTTime() {
        const now = new Date();
        // Convert to PST (UTC-8) or PDT (UTC-7) - JavaScript handles DST automatically with timezone
        const pstTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
        return pstTime;
    }
    
    // Function to check if it's after 5:30pm PST
    function isAfter530PM() {
        const pstTime = getPSTTime();
        const hours = pstTime.getHours();
        const minutes = pstTime.getMinutes();
        return hours > 17 || (hours === 17 && minutes >= 30);
    }
    
    // Function to enable dark mode
    function enableDarkMode() {
        body.classList.add('dark-mode');
        if (darkModeButton) {
            darkModeButton.classList.add('active');
            darkModeButton.querySelector('.dark-mode-icon').textContent = '☀️';
            darkModeButton.querySelector('.dark-mode-label').textContent = 'Light Mode';
        }
        localStorage.setItem('darkMode', 'enabled');
    }
    
    // Function to disable dark mode
    function disableDarkMode() {
        body.classList.remove('dark-mode');
        if (darkModeButton) {
            darkModeButton.classList.remove('active');
            darkModeButton.querySelector('.dark-mode-icon').textContent = '🌙';
            darkModeButton.querySelector('.dark-mode-label').textContent = 'Dark Mode';
        }
        localStorage.setItem('darkMode', 'disabled');
    }
    
    // Function to toggle dark mode
    function toggleDarkMode() {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }
    
    // Initialize dark mode on page load
    function initializeDarkMode() {
        // Check if user has manually set a preference
        const savedPreference = localStorage.getItem('darkMode');
        
        if (savedPreference === 'enabled') {
            enableDarkMode();
        } else if (savedPreference === 'disabled') {
            disableDarkMode();
        } else {
            // No saved preference - auto-enable if after 5:30pm PST
            if (isAfter530PM()) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    }
    
    // Check time periodically and auto-enable dark mode if needed
    function checkTimeAndUpdateDarkMode() {
        const savedPreference = localStorage.getItem('darkMode');
        
        // Only auto-update if user hasn't manually set a preference
        // or if they want it to auto-update (we'll check time regardless)
        // Actually, let's make it smarter: if it's after 5:30pm and dark mode is off, enable it
        // But respect manual toggles during the day
        if (isAfter530PM() && !body.classList.contains('dark-mode')) {
            // Only auto-enable if no preference was saved, or if preference was 'disabled' but we're past the time
            const savedPreference = localStorage.getItem('darkMode');
            if (!savedPreference || savedPreference === 'disabled') {
                enableDarkMode();
            }
        }
    }
    
    // Initialize dark mode when page loads
    initializeDarkMode();
    
    // Set up button click handler
    if (darkModeButton) {
        darkModeButton.addEventListener('click', toggleDarkMode);
    }
    
    // Check time every minute to auto-enable dark mode after 5:30pm PST
    setInterval(checkTimeAndUpdateDarkMode, 60000); // Check every minute
    
    // Also check when page becomes visible (if user leaves tab open)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            checkTimeAndUpdateDarkMode();
        }
    });
});

