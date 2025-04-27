// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Loading Screen Animation
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    simulateLoading(loadingScreen, loadingProgress);
    
    // Set current year in footer
    setCurrentYear();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize language selector and i18n
    initLanguageSelector();
    
    // Initialize account modals
    initAccountModals();
    
    // Initialize forms
    initForms();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize animations
    initAnimations();
    
    // Initialize map if present
    if (document.getElementById('charging-map')) {
        initChargingMap();
    }
    
    // Initialize FAQ accordion
    initFAQ();
    
    // Initialize lazy loading for images and videos
    initLazyLoading();

    // Initialize footer links
    initFooterLinks();

    // Initialize cookie consent
    initCookieConsent();
}

function simulateLoading(loadingScreen, loadingProgress) {
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        loadingProgress.style.width = `${Math.min(progress, 100)}%`;
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
                // Show cookie consent modal after loading screen is hidden
                setTimeout(() => {
                    const cookieModal = document.getElementById('cookieModal');
                    const cookieOverlay = document.getElementById('cookieOverlay');
                    if (cookieModal && cookieOverlay) {
                        cookieModal.style.display = 'block';
                        cookieOverlay.style.display = 'block';
                        // Trigger reflow
                        cookieModal.offsetHeight;
                        cookieOverlay.offsetHeight;
                        // Add active class for animation
                        cookieModal.classList.add('active');
                        cookieOverlay.classList.add('active');
                    }
                }, 500);
            }, 500);
        }
    }, 100);
}

function setCurrentYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-theme');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
}

function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        
        if (mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

function initSearch() {
    const searchBox = document.querySelector('.search-box');
    const searchInput = searchBox.querySelector('input');
    const searchBtn = searchBox.querySelector('.search-btn');
    
    // Handle search button click
    searchBtn.addEventListener('click', function() {
        performSearch(searchInput.value);
    });

    // Handle Enter key press
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

function performSearch(query) {
    if (!query.trim()) return;
    
    // Redirect to Google with the search query
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.location.href = searchUrl;
}

function initLanguageSelector() {
    const languageSelector = document.getElementById('language-selector');
    
    // Initialize i18next
    i18next
        .use(i18nextHttpBackend)
        .use(i18nextBrowserLanguageDetector)
        .init({
            fallbackLng: 'en',
            debug: false,
            backend: {
                loadPath: 'locales/{{lng}}/{{ns}}.json'
            }
        }, function(err, t) {
            if (err) {
                console.error('Error initializing i18next:', err);
                return;
            }
            updateContent();
        });

    // Update content when language changes
    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = i18next.t(key);
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.setAttribute('placeholder', i18next.t(key));
        });
    }

    // Change language when selector changes
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            i18next.changeLanguage(selectedLanguage, (err, t) => {
                if (err) {
                    console.error('Error changing language:', err);
                    return;
                }
                updateContent();
            });
        });
    }

    // Set initial language in selector
    i18next.on('initialized', function(options) {
        if (languageSelector) {
            languageSelector.value = i18next.language;
        }
    });

    // Update language selector when language changes
    i18next.on('languageChanged', function() {
        if (languageSelector) {
            languageSelector.value = i18next.language;
        }
    });
}

function initAccountModals() {
    const accountBtn = document.getElementById('account-btn');
    const signInModal = document.getElementById('signin-modal');
    const signUpModal = document.getElementById('signup-modal');
    
    if (accountBtn) {
        accountBtn.addEventListener('click', function(e) {
            e.preventDefault();
            signInModal.classList.add('active');
        });
    }
    
    // Modal functionality
    const closeModals = document.querySelectorAll('.close-modal');
    const showSignUp = document.getElementById('show-signup');
    const showSignIn = document.getElementById('show-signin');
    
    if (showSignUp) {
        showSignUp.addEventListener('click', (e) => {
            e.preventDefault();
            signInModal.classList.remove('active');
            signUpModal.classList.add('active');
        });
    }
    
    if (showSignIn) {
        showSignIn.addEventListener('click', (e) => {
            e.preventDefault();
            signUpModal.classList.remove('active');
            signInModal.classList.add('active');
        });
    }
    
    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
}

function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Disable submit button to prevent multiple submissions
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Submitting...';
            }

            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (!isValid) {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit';
                }
                return;
            }

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    form.reset();
                    showNotification('Form submitted successfully!', 'success');
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('Error submitting form. Please try again.', 'error');
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit';
                }
            }
        });
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function initSmoothScrolling() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scroll for section links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const header = document.querySelector('.header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initScrollEffects() {
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active link based on scroll position
    function setActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // Set initial active link
    setActiveLink();
    
    // Update active link on scroll
    window.addEventListener('scroll', setActiveLink);
}

function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initAnimations() {
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .model-card, .news-card, .resource-card, .testimonial-card, .stat-item, .info-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load in case elements are already in view
    animateOnScroll();
    
    // Animate stats counting
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

function initChargingMap() {
    // Default to San Francisco coordinates
    const map = L.map('charging-map').setView([37.7749, -122.4194], 13);
    
    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Sample charging station data (in a real app, this would come from an API)
    const chargingStations = [
        { lat: 37.7749, lng: -122.4194, name: "Downtown Charging Station", type: "dcfast", connectors: ["ccs", "chademo"] },
        { lat: 37.7849, lng: -122.4294, name: "Market Street Charger", type: "level2", connectors: ["j1772"] },
        { lat: 37.7649, lng: -122.4094, name: "Tesla Supercharger", type: "tesla", connectors: ["tesla"] },
        { lat: 37.7549, lng: -122.3994, name: "Public Parking Charger", type: "level2", connectors: ["j1772"] },
        { lat: 37.7949, lng: -122.4394, name: "Shopping Center Charger", type: "dcfast", connectors: ["ccs", "chademo"] }
    ];
    
    // Add markers for each charging station
    chargingStations.forEach(station => {
        const marker = L.marker([station.lat, station.lng]).addTo(map);
        
        let connectorText = station.connectors.map(connector => {
            switch(connector) {
                case 'j1772': return 'J1772';
                case 'ccs': return 'CCS';
                case 'chademo': return 'CHAdeMO';
                case 'tesla': return 'Tesla';
                default: return connector;
            }
        }).join(', ');
        
        marker.bindPopup(`
            <h3>${station.name}</h3>
            <p><strong>Type:</strong> ${station.type === 'dcfast' ? 'DC Fast' : 
                                      station.type === 'level2' ? 'Level 2' : 
                                      'Tesla Supercharger'}</p>
            <p><strong>Connectors:</strong> ${connectorText}</p>
        `);
    });
    
    // Map search functionality
    const mapSearchInput = document.getElementById('map-search-input');
    const mapSearchBtn = document.getElementById('map-search-btn');
    
    if (mapSearchBtn) {
        mapSearchBtn.addEventListener('click', () => {
            const query = mapSearchInput.value.trim();
            if (query) {
                // In a real app, you would geocode the address here
                // For demo purposes, we'll just show an alert
                alert(i18next.t('map.searching', {query: query}));
            }
        });
    }
    
    // Map filter functionality
    const chargerTypeFilter = document.getElementById('charger-type');
    const connectorTypeFilter = document.getElementById('connector-type');
    
    if (chargerTypeFilter && connectorTypeFilter) {
        chargerTypeFilter.addEventListener('change', updateMapFilters);
        connectorTypeFilter.addEventListener('change', updateMapFilters);
    }
    
    function updateMapFilters() {
        const chargerType = chargerTypeFilter.value;
        const connectorType = connectorTypeFilter.value;
        
        // In a real app, you would filter the markers based on these selections
        console.log(`Filtering by charger type: ${chargerType}, connector type: ${connectorType}`);
    }
}

function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
            
            // Close other open items
            faqQuestions.forEach(q => {
                if (q !== question && q.parentElement.classList.contains('active')) {
                    q.parentElement.classList.remove('active');
                }
            });
        });
    });
}

function initLazyLoading() {
    // Handle video loading for better performance
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // Only autoplay video if it's in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(e => console.log('Video autoplay prevented:', e));
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(video);
    });

    // Lazy load images
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers without native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

function initFooterLinks() {
    try {
        // Get all footer links
        const footerLinks = document.querySelectorAll('.footer-links a, .footer-social a, .social-icons a');
        
        // Add click event listeners to each link
        footerLinks.forEach(link => {
            // Remove any existing click event listeners to prevent duplicates
            link.removeEventListener('click', handleFooterLinkClick);
            link.addEventListener('click', handleFooterLinkClick);
        });

        function handleFooterLinkClick(e) {
            const href = this.getAttribute('href');
            
            if (!href || href === '#') {
                // If the link is empty or just a hash, prevent default behavior
                e.preventDefault();
                console.warn('Invalid or empty link clicked:', this.textContent);
                return;
            }
            
            // Check if it's an external link
            if (href.startsWith('http') || href.startsWith('//')) {
                // For external links, prevent default and open in new tab
                e.preventDefault();
                window.open(href, '_blank');
            } else {
                // For internal links, verify the page exists
                fetch(href, { method: 'HEAD' })
                    .then(response => {
                        if (!response.ok) {
                            e.preventDefault();
                            console.error('Page not found:', href);
                            // You could show a notification to the user here
                        }
                    })
                    .catch(error => {
                        e.preventDefault();
                        console.error('Error checking page:', href, error);
                        // You could show a notification to the user here
                    });
            }
        }
    } catch (error) {
        console.error('Error initializing footer links:', error);
    }
}

// Initialize cookie consent functionality
function initCookieConsent() {
    const cookieModal = document.getElementById('cookieModal');
    const cookieOverlay = document.getElementById('cookieOverlay');
    const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');
    const cookieDenyBtn = document.getElementById('cookieDenyBtn');
    const cookieSettingsBtn = document.getElementById('cookieSettingsBtn');
    const cookieSettingsModal = document.getElementById('cookieSettingsModal');
    const cookieSettingsBackBtn = document.getElementById('cookieSettingsBackBtn');
    const cookieSaveSettingsBtn = document.getElementById('cookieSaveSettingsBtn');

    // Check if user has already made a choice
    if (getCookie('cookieConsent')) {
        cookieModal.style.display = 'none';
        cookieOverlay.style.display = 'none';
        return;
    }

    // Handle accept button
    if (cookieAcceptBtn) {
        cookieAcceptBtn.addEventListener('click', () => {
            setCookie('cookieConsent', 'all', 365);
            closeCookieModal();
        });
    }

    // Handle deny button
    if (cookieDenyBtn) {
        cookieDenyBtn.addEventListener('click', () => {
            setCookie('cookieConsent', 'none', 365);
            closeCookieModal();
        });
    }

    // Handle settings button
    if (cookieSettingsBtn) {
        cookieSettingsBtn.addEventListener('click', () => {
            cookieModal.classList.remove('active');
            cookieSettingsModal.style.display = 'block';
            cookieSettingsModal.classList.add('active');
        });
    }

    // Handle back button in settings
    if (cookieSettingsBackBtn) {
        cookieSettingsBackBtn.addEventListener('click', () => {
            cookieSettingsModal.classList.remove('active');
            setTimeout(() => {
                cookieSettingsModal.style.display = 'none';
                cookieModal.classList.add('active');
            }, 300);
        });
    }

    // Handle save settings button
    if (cookieSaveSettingsBtn) {
        cookieSaveSettingsBtn.addEventListener('click', () => {
            const analytics = document.getElementById('analyticsCookies').checked;
            const marketing = document.getElementById('marketingCookies').checked;
            setCookie('cookieConsent', JSON.stringify({ analytics, marketing }), 365);
            closeCookieModal();
        });
    }

    function closeCookieModal() {
        cookieModal.classList.remove('active');
        cookieOverlay.classList.remove('active');
        setTimeout(() => {
            cookieModal.style.display = 'none';
            cookieOverlay.style.display = 'none';
        }, 300);
    }
}

// Cookie helper functions
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
    