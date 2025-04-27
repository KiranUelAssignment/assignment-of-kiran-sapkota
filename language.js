// Language translations object
const translations = {
    en: {
        // Navigation
        'nav.signin': 'Sign In',
        'nav.search': 'Search',
        'nav.account': 'Account',
        
        // Common
        'common.loading': 'Loading...',
        'common.error': 'Error',
        'common.success': 'Success',
        'common.warning': 'Warning',
        'common.info': 'Info',
        
        // Buttons
        'btn.submit': 'Submit',
        'btn.cancel': 'Cancel',
        'btn.save': 'Save',
        'btn.delete': 'Delete',
        'btn.edit': 'Edit',
        'btn.view': 'View',
        
        // Messages
        'msg.welcome': 'Welcome to EV World',
        'msg.contact': 'Contact Us',
        'msg.about': 'About Us',
        'msg.services': 'Our Services',
        'msg.products': 'Our Products',
        'msg.blog': 'Blog',
        'msg.careers': 'Careers'
    },
    es: {
        // Navigation
        'nav.signin': 'Iniciar Sesión',
        'nav.search': 'Buscar',
        'nav.account': 'Cuenta',
        
        // Common
        'common.loading': 'Cargando...',
        'common.error': 'Error',
        'common.success': 'Éxito',
        'common.warning': 'Advertencia',
        'common.info': 'Información',
        
        // Buttons
        'btn.submit': 'Enviar',
        'btn.cancel': 'Cancelar',
        'btn.save': 'Guardar',
        'btn.delete': 'Eliminar',
        'btn.edit': 'Editar',
        'btn.view': 'Ver',
        
        // Messages
        'msg.welcome': 'Bienvenido a EV World',
        'msg.contact': 'Contáctenos',
        'msg.about': 'Sobre Nosotros',
        'msg.services': 'Nuestros Servicios',
        'msg.products': 'Nuestros Productos',
        'msg.blog': 'Blog',
        'msg.careers': 'Carreras'
    },
    // Add more languages as needed
};

// Function to set the language
function setLanguage(lang) {
    // Save the selected language to localStorage
    localStorage.setItem('preferredLanguage', lang);
    
    // Update the language selector
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = lang;
    }
    
    // Update all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update the HTML lang attribute
    document.documentElement.lang = lang;
}

// Function to initialize language
function initLanguage() {
    // Get the preferred language from localStorage or browser
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 
                            navigator.language.split('-')[0] || 
                            'en';
    
    // Set the initial language
    setLanguage(preferredLanguage);
    
    // Add event listener to language selector
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initLanguage); 