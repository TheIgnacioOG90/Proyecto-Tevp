/**
 * =====================================================
 * JAVASCRIPT PARA MOCKUP MÓVIL DE TEVP
 * (Técnicos Especializados y Venta de Productos)
 * Mobile-First Responsive JavaScript
 * =====================================================
 */

/**
 * CONFIGURACIÓN Y CONSTANTES GLOBALES
 */
const TEVP_CONFIG = {
    APP_NAME: 'TEVP Móvil',
    VERSION: '2.0.1',
    API_BASE_URL: 'https://api.tevp.cl',
    STORAGE_PREFIX: 'tevp_mobile_',
    
    // Configuración de tiempos
    SPLASH_DURATION: 2500,
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 4000,
    
    // Configuración de touch
    SWIPE_THRESHOLD: 50,
    LONG_PRESS_DURATION: 500,
    
    // Configuración de búsqueda
    SEARCH_DEBOUNCE_TIME: 500,
    MIN_SEARCH_LENGTH: 3,
    
    // Estados de la aplicación
    SCREENS: {
        SPLASH: 'splashScreen',
        ONBOARDING: 'onboardingScreen',
        LOGIN: 'loginScreen',
        REGISTER: 'registerScreen',
        HOME: 'homeScreen',
        SERVICES: 'servicesScreen',
        PROFESSIONALS: 'professionalsScreen',
        ORDERS: 'ordersScreen',
        PROFILE: 'profileScreen'
    }
};

/**
 * CLASE PRINCIPAL DE LA APLICACIÓN MÓVIL
 */
class TEVPMobileApp {
    constructor() {
        this.currentScreen = TEVP_CONFIG.SCREENS.SPLASH;
        this.isAuthenticated = false;
        this.userData = null;
        this.onboardingCurrentSlide = 1;
        this.searchTimeout = null;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.isInitialized = false;
        
        // Referencias a elementos DOM principales
        this.elements = {};
        
        // Inicializar aplicación
        this.init();
    }

    /**
     * INICIALIZACIÓN PRINCIPAL DE LA APLICACIÓN
     */
    init() {
        console.log(`🚀 Inicializando ${TEVP_CONFIG.APP_NAME} v${TEVP_CONFIG.VERSION}`);
        
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    /**
     * INICIALIZACIÓN COMPLETA DE LA APLICACIÓN
     */
    async initializeApp() {
        try {
            // 1. Cachear referencias DOM
            this.cacheElementReferences();
            
            // 2. Verificar estado de autenticación y onboarding
            await this.checkAppState();
            
            // 3. Configurar event listeners
            this.setupEventListeners();
            
            // 4. Configurar componentes móviles
            this.setupMobileFeatures();
            
            // 5. Mostrar splash screen
            this.showSplashScreen();
            
            // 6. Marcar como inicializado
            this.isInitialized = true;
            
            console.log('✅ Aplicación inicializada correctamente');
            
        } catch (error) {
            console.error('❌ Error al inicializar la aplicación:', error);
            this.showError('Error al inicializar la aplicación');
        }
    }

    /**
     * CACHEAR REFERENCIAS A ELEMENTOS DOM IMPORTANTES
     */
    cacheElementReferences() {
        console.log('📋 Cacheando referencias DOM...');
        
        // Pantallas principales
        this.elements.splash = document.getElementById('splashScreen');
        this.elements.onboarding = document.getElementById('onboardingScreen');
        this.elements.login = document.getElementById('loginScreen');
        this.elements.register = document.getElementById('registerScreen');
        this.elements.home = document.getElementById('homeScreen');
        
        // Navegación
        this.elements.mainNav = document.getElementById('mainNavbar');
        this.elements.bottomNav = document.getElementById('bottomNavigation');
        this.elements.navToggler = document.getElementById('navToggler');
        
        // Onboarding
        this.elements.onboardingSlides = document.querySelectorAll('.onboarding-slide');
        this.elements.onboardingIndicators = document.querySelectorAll('.indicator');
        this.elements.nextSlide = document.getElementById('nextSlide');
        this.elements.skipOnboarding = document.getElementById('skipOnboarding');
        this.elements.startApp = document.getElementById('startApp');
        
        // Formularios de autenticación
        this.elements.loginForm = document.getElementById('loginForm');
        this.elements.registerForm = document.getElementById('registerForm');
        this.elements.userTypeRadios = document.querySelectorAll('input[name="userType"]');
        this.elements.professionalFields = document.getElementById('professionalFields');
        
        // Toggles de contraseña
        this.elements.toggleLoginPassword = document.getElementById('toggleLoginPassword');
        this.elements.toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
        
        // Búsqueda
        this.elements.quickSearch = document.getElementById('quickSearch');
        this.elements.searchButton = document.getElementById('searchButton');
        
        // Modal de solicitud de servicio
        this.elements.requestServiceModal = document.getElementById('requestServiceModal');
        this.elements.requestServiceButton = document.getElementById('requestServiceButton');
        this.elements.categoryButtons = document.querySelectorAll('.category-btn');
        
        // Toasts
        this.elements.successToast = document.getElementById('successToast');
        this.elements.errorToast = document.getElementById('errorToast');
        this.elements.infoToast = document.getElementById('infoToast');
        
        // Loading overlay
        this.elements.globalLoading = document.getElementById('globalLoading');
        
        console.log('✅ Referencias DOM cacheadas');
    }

    /**
     * VERIFICAR ESTADO DE LA APLICACIÓN (AUTENTICACIÓN Y ONBOARDING)
     */
    async checkAppState() {
        console.log('🔍 Verificando estado de la aplicación...');
        
        try {
            // Verificar si es la primera vez que usa la app
            const hasSeenOnboarding = localStorage.getItem(TEVP_CONFIG.STORAGE_PREFIX + 'onboarding_completed');
            
            // Verificar estado de autenticación
            const authToken = localStorage.getItem(TEVP_CONFIG.STORAGE_PREFIX + 'auth_token');
            const userData = localStorage.getItem(TEVP_CONFIG.STORAGE_PREFIX + 'user_data');
            
            if (authToken && userData) {
                this.isAuthenticated = true;
                this.userData = JSON.parse(userData);
                console.log('👤 Usuario autenticado:', this.userData.nombre);
            }
            
            // Determinar pantalla inicial después del splash
            if (!hasSeenOnboarding) {
                this.nextScreen = TEVP_CONFIG.SCREENS.ONBOARDING;
            } else if (!this.isAuthenticated) {
                this.nextScreen = TEVP_CONFIG.SCREENS.LOGIN;
            } else {
                this.nextScreen = TEVP_CONFIG.SCREENS.HOME;
            }
            
            console.log('📍 Próxima pantalla:', this.nextScreen);
            
        } catch (error) {
            console.error('❌ Error verificando estado:', error);
            this.nextScreen = TEVP_CONFIG.SCREENS.ONBOARDING;
        }
    }

    /**
     * CONFIGURAR TODOS LOS EVENT LISTENERS
     */
    setupEventListeners() {
        console.log('🎯 Configurando event listeners...');
        
        // Event listeners de onboarding
        this.setupOnboardingListeners();
        
        // Event listeners de navegación
        this.setupNavigationListeners();
        
        // Event listeners de autenticación
        this.setupAuthenticationListeners();
        
        // Event listeners de búsqueda
        this.setupSearchListeners();
        
        // Event listeners de servicios
        this.setupServiceListeners();
        
        // Event listeners de touch/gestos
        this.setupTouchListeners();
        
        // Event listeners de formularios
        this.setupFormListeners();
        
        // Event listeners globales
        this.setupGlobalListeners();
        
        console.log('✅ Event listeners configurados');
    }

    /**
     * CONFIGURAR EVENT LISTENERS DEL ONBOARDING
     */
    setupOnboardingListeners() {
        // Botón siguiente del onboarding
        if (this.elements.nextSlide) {
            this.elements.nextSlide.addEventListener('click', () => this.nextOnboardingSlide());
        }
        
        // Botón saltar onboarding
        if (this.elements.skipOnboarding) {
            this.elements.skipOnboarding.addEventListener('click', () => this.completeOnboarding());
        }
        
        // Botón comenzar aplicación
        if (this.elements.startApp) {
            this.elements.startApp.addEventListener('click', () => this.completeOnboarding());
        }
        
        // Indicadores de página del onboarding
        this.elements.onboardingIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToOnboardingSlide(index + 1));
        });
    }

    /**
     * CONFIGURAR EVENT LISTENERS DE NAVEGACIÓN
     */
    setupNavigationListeners() {
        // Navegación principal
        document.querySelectorAll('[data-screen]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const screenName = e.currentTarget.getAttribute('data-screen');
                this.navigateToScreen(screenName);
            });
        });
        
        // Navegación inferior
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const screenName = e.currentTarget.getAttribute('data-screen');
                if (screenName) {
                    this.navigateToScreen(screenName);
                    this.updateBottomNavigation(screenName);
                }
            });
        });
        
        // Botón de menú hamburguesa
        if (this.elements.navToggler) {
            this.elements.navToggler.addEventListener('click', () => this.toggleMainNavigation());
        }
    }

    /**
     * CONFIGURAR EVENT LISTENERS DE AUTENTICACIÓN
     */
    setupAuthenticationListeners() {
        // Formulario de login
        if (this.elements.loginForm) {
            this.elements.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        // Formulario de registro
        if (this.elements.registerForm) {
            this.elements.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
        
        // Toggle de contraseñas
        if (this.elements.toggleLoginPassword) {
            this.elements.toggleLoginPassword.addEventListener('click', () => 
                this.togglePasswordVisibility('loginPassword', 'toggleLoginPassword'));
        }
        
        if (this.elements.toggleRegisterPassword) {
            this.elements.toggleRegisterPassword.addEventListener('click', () => 
                this.togglePasswordVisibility('registerPassword', 'toggleRegisterPassword'));
        }
        
        // Cambio de tipo de usuario en registro
        this.elements.userTypeRadios.forEach(radio => {
            radio.addEventListener('change', (e) => this.handleUserTypeChange(e));
        });
        
        // Login con redes sociales
        document.getElementById('loginGoogle')?.addEventListener('click', () => this.handleSocialLogin('google'));
        document.getElementById('loginFacebook')?.addEventListener('click', () => this.handleSocialLogin('facebook'));
    }

    /**
     * CONFIGURAR EVENT LISTENERS DE BÚSQUEDA
     */
    setupSearchListeners() {
        // Búsqueda rápida
        if (this.elements.quickSearch) {
            this.elements.quickSearch.addEventListener('input', (e) => this.handleSearch(e));
            this.elements.quickSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performSearch(e.target.value);
                }
            });
        }
        
        // Botón de búsqueda
        if (this.elements.searchButton) {
            this.elements.searchButton.addEventListener('click', () => 
                this.performSearch(this.elements.quickSearch.value));
        }
    }

    /**
     * CONFIGURAR EVENT LISTENERS DE SERVICIOS
     */
    setupServiceListeners() {
        // Tarjetas de servicios
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', (e) => this.handleServiceCardClick(e));
        });
        
        // Tarjetas de profesionales
        document.querySelectorAll('.professional-card').forEach(card => {
            card.addEventListener('click', (e) => this.handleProfessionalCardClick(e));
        });
        
        // Botón de solicitar servicio
        if (this.elements.requestServiceButton) {
            this.elements.requestServiceButton.addEventListener('click', () => this.openRequestServiceModal());
        }
        
        // Botones de categorías en modal
        this.elements.categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCategorySelection(e));
        });
        
        // Formulario de solicitud rápida
        document.getElementById('submitQuickRequest')?.addEventListener('click', () => this.handleQuickServiceRequest());
        
        // Botón de usar ubicación
        document.getElementById('useLocationBtn')?.addEventListener('click', () => this.requestLocation());
    }

    /**
     * CONFIGURAR EVENT LISTENERS DE TOUCH/GESTOS
     */
    setupTouchListeners() {
        // Agregar soporte para swipe en el onboarding
        if (this.elements.onboarding) {
            this.elements.onboarding.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
            this.elements.onboarding.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        }
        
        // Prevenir zoom en inputs
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('focus', () => this.preventZoom(input));
            input.addEventListener('blur', () => this.allowZoom());
        });
        
        // Mejorar experiencia de scroll
        this.setupScrollOptimization();
    }

    /**
     * CONFIGURAR EVENT LISTENERS DE FORMULARIOS
     */
    setupFormListeners() {
        // Validación en tiempo real
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('blur', (e) => this.validateField(e.target));
            input.addEventListener('input', (e) => this.clearFieldError(e.target));
        });
        
        // Formateo automático de campos especiales
        document.getElementById('registerRun')?.addEventListener('input', (e) => this.formatRUT(e));
        document.getElementById('registerPhone')?.addEventListener('input', (e) => this.formatPhone(e));
    }

    /**
     * CONFIGURAR EVENT LISTENERS GLOBALES
     */
    setupGlobalListeners() {
        // Gestión de errores de red
        window.addEventListener('online', () => this.handleConnectionChange(true));
        window.addEventListener('offline', () => this.handleConnectionChange(false));
        
        // Gestión de cambios de orientación
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleOrientationChange(), 500);
        });
        
        // Gestión del botón atrás del navegador
        window.addEventListener('popstate', (e) => this.handleBackButton(e));
        
        // Prevenir comportamiento por defecto en algunos elementos
        document.addEventListener('dragstart', (e) => e.preventDefault());
        document.addEventListener('selectstart', (e) => {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
            }
        });
    }

    /**
     * CONFIGURAR CARACTERÍSTICAS MÓVILES ESPECÍFICAS
     */
    setupMobileFeatures() {
        console.log('📱 Configurando características móviles...');
        
        // Configurar viewport para dispositivos móviles
        this.setupViewport();
        
        // Configurar PWA si está disponible
        this.setupPWA();
        
        // Configurar notificaciones push
        this.setupNotifications();
        
        // Configurar modo sin conexión
        this.setupOfflineMode();
        
        // Configurar gestos táctiles avanzados
        this.setupAdvancedTouchGestures();
        
        console.log('✅ Características móviles configuradas');
    }

    /**
     * MOSTRAR SPLASH SCREEN
     */
    showSplashScreen() {
        console.log('🎭 Mostrando splash screen...');
        
        if (this.elements.splash) {
            this.elements.splash.classList.add('active');
            
            setTimeout(() => {
                this.hideSplashScreen();
            }, TEVP_CONFIG.SPLASH_DURATION);
        } else {
            // Si no hay splash, ir directamente a la siguiente pantalla
            this.navigateToScreen(this.nextScreen);
        }
    }

    /**
     * OCULTAR SPLASH SCREEN
     */
    hideSplashScreen() {
        console.log('👋 Ocultando splash screen...');
        
        if (this.elements.splash) {
            this.elements.splash.classList.remove('active');
            
            setTimeout(() => {
                this.navigateToScreen(this.nextScreen);
            }, TEVP_CONFIG.ANIMATION_DURATION);
        }
    }

    /**
     * NAVEGAR A UNA PANTALLA ESPECÍFICA
     */
    navigateToScreen(screenName) {
        console.log(`🧭 Navegando a: ${screenName}`);
        
        // Validar que la pantalla existe
        if (!document.getElementById(screenName)) {
            console.error(`❌ Pantalla no encontrada: ${screenName}`);
            return;
        }
        
        // Ocultar pantalla actual
        const currentScreenElement = document.getElementById(this.currentScreen);
        if (currentScreenElement) {
            currentScreenElement.classList.remove('active');
            currentScreenElement.classList.add('d-none');
        }
        
        // Mostrar nueva pantalla
        const newScreenElement = document.getElementById(screenName);
        newScreenElement.classList.remove('d-none');
        
        setTimeout(() => {
            newScreenElement.classList.add('active');
            
            // Configurar navegación según la pantalla
            this.setupScreenNavigation(screenName);
            
        }, 50);
        
        // Actualizar estado
        this.currentScreen = screenName;
        
        // Actualizar historial del navegador
        this.updateBrowserHistory(screenName);
        
        console.log(`✅ Navegación completada a: ${screenName}`);
    }

    /**
     * CONFIGURAR NAVEGACIÓN ESPECÍFICA POR PANTALLA
     */
    setupScreenNavigation(screenName) {
        const showMainNav = ['homeScreen', 'servicesScreen', 'professionalsScreen', 'ordersScreen', 'profileScreen'].includes(screenName);
        const showBottomNav = showMainNav;
        
        // Mostrar/ocultar navegación principal
        if (this.elements.mainNav) {
            this.elements.mainNav.classList.toggle('d-none', !showMainNav);
        }
        
        // Mostrar/ocultar navegación inferior
        if (this.elements.bottomNav) {
            this.elements.bottomNav.classList.toggle('d-none', !showBottomNav);
        }
        
        // Configuraciones específicas por pantalla
        switch (screenName) {
            case 'homeScreen':
                this.updateGreeting();
                this.loadFeaturedServices();
                this.loadRecommendedProfessionals();
                break;
            case 'servicesScreen':
                this.loadAllServices();
                break;
            case 'professionalsScreen':
                this.loadAllProfessionals();
                break;
            case 'ordersScreen':
                this.loadUserOrders();
                break;
            case 'profileScreen':
                this.loadUserProfile();
                break;
        }
    }

    /**
     * MANEJAR ONBOARDING - SIGUIENTE SLIDE
     */
    nextOnboardingSlide() {
        const totalSlides = this.elements.onboardingSlides.length;
        
        if (this.onboardingCurrentSlide < totalSlides) {
            this.onboardingCurrentSlide++;
            this.updateOnboardingSlide();
        } else {
            this.completeOnboarding();
        }
    }

    /**
     * IR A UN SLIDE ESPECÍFICO DEL ONBOARDING
     */
    goToOnboardingSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= this.elements.onboardingSlides.length) {
            this.onboardingCurrentSlide = slideNumber;
            this.updateOnboardingSlide();
        }
    }

    /**
     * ACTUALIZAR SLIDE VISIBLE DEL ONBOARDING
     */
    updateOnboardingSlide() {
        // Actualizar slides
        this.elements.onboardingSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index + 1 === this.onboardingCurrentSlide);
        });
        
        // Actualizar indicadores
        this.elements.onboardingIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index + 1 === this.onboardingCurrentSlide);
        });
        
        // Actualizar botones
        const isLastSlide = this.onboardingCurrentSlide === this.elements.onboardingSlides.length;
        
        if (this.elements.nextSlide) {
            this.elements.nextSlide.classList.toggle('d-none', isLastSlide);
        }
        
        if (this.elements.startApp) {
            this.elements.startApp.classList.toggle('d-none', !isLastSlide);
        }
    }

    /**
     * COMPLETAR ONBOARDING
     */
    completeOnboarding() {
        console.log('✅ Onboarding completado');
        
        // Marcar onboarding como completado
        localStorage.setItem(TEVP_CONFIG.STORAGE_PREFIX + 'onboarding_completed', 'true');
        
        // Navegar a login o home según autenticación
        const nextScreen = this.isAuthenticated ? 'homeScreen' : 'loginScreen';
        this.navigateToScreen(nextScreen);
    }

    /**
     * MANEJAR LOGIN
     */
    async handleLogin(e) {
        e.preventDefault();
        console.log('🔑 Intentando login...');
        
        const formData = new FormData(e.target);
        const email = formData.get('email') || document.getElementById('loginEmail').value;
        const password = formData.get('password') || document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe')?.checked;
        
        // Validaciones básicas
        if (!this.validateEmail(email)) {
            this.showError('Por favor ingresa un email válido');
            this.shakeElement(document.getElementById('loginEmail'));
            return;
        }
        
        if (password.length < 6) {
            this.showError('La contraseña debe tener al menos 6 caracteres');
            this.shakeElement(document.getElementById('loginPassword'));
            return;
        }
        
        // Mostrar loading en botón
        const submitButton = document.getElementById('loginSubmit');
        this.showButtonLoading(submitButton, true);
        
        try {
            // Simular llamada a API (reemplazar con llamada real)
            await this.simulateAPICall();
            
            // Simular datos de usuario exitoso
            const userData = {
                id: 1,
                nombre: 'Usuario',
                email: email,
                tipo: 'cliente',
                verificado: true
            };
            
            // Guardar datos de autenticación
            this.isAuthenticated = true;
            this.userData = userData;
            
            if (rememberMe) {
                localStorage.setItem(TEVP_CONFIG.STORAGE_PREFIX + 'auth_token', 'demo_token_' + Date.now());
                localStorage.setItem(TEVP_CONFIG.STORAGE_PREFIX + 'user_data', JSON.stringify(userData));
            }
            
            this.showSuccess('¡Bienvenido a TEVP!');
            
            // Navegar al home
            setTimeout(() => {
                this.navigateToScreen('homeScreen');
            }, 1000);
            
        } catch (error) {
            console.error('❌ Error en login:', error);
            this.showError('Credenciales incorrectas');
            this.shakeElement(e.target);
        } finally {
            this.showButtonLoading(submitButton, false);
        }
    }

    /**
     * MANEJAR REGISTRO
     */
    async handleRegister(e) {
        e.preventDefault();
        console.log('📝 Intentando registro...');
        
        const formData = new FormData(e.target);
        const userData = {
            nombre: formData.get('nombre') || document.getElementById('registerName').value,
            apellidos: formData.get('apellidos') || document.getElementById('registerLastname').value,
            run: formData.get('run') || document.getElementById('registerRun').value,
            email: formData.get('email') || document.getElementById('registerEmail').value,
            telefono: formData.get('telefono') || document.getElementById('registerPhone').value,
            password: formData.get('password') || document.getElementById('registerPassword').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            tipo: formData.get('userType') || 'cliente',
            especialidad: document.getElementById('specialtySelect')?.value,
            experiencia: document.getElementById('experienceYears')?.value,
            aceptaTerminos: document.getElementById('acceptTerms')?.checked
        };
        
        // Validaciones
        if (!this.validateRegisterData(userData)) {
            return;
        }
        
        // Mostrar loading
        const submitButton = document.getElementById('registerSubmit');
        this.showButtonLoading(submitButton, true);
        
        try {
            // Simular registro exitoso
            await this.simulateAPICall();
            
            this.showSuccess('¡Cuenta creada exitosamente!');
            
            // Navegar a login después de un momento
            setTimeout(() => {
                this.navigateToScreen('loginScreen');
            }, 1500);
            
        } catch (error) {
            console.error('❌ Error en registro:', error);
            this.showError('Error al crear la cuenta');
        } finally {
            this.showButtonLoading(submitButton, false);
        }
    }

    /**
     * VALIDAR DATOS DE REGISTRO
     */
    validateRegisterData(userData) {
        // Validar campos obligatorios
        if (!userData.nombre || !userData.apellidos) {
            this.showError('Nombre y apellidos son obligatorios');
            return false;
        }
        
        if (!this.validateRUT(userData.run)) {
            this.showError('RUT inválido');
            this.shakeElement(document.getElementById('registerRun'));
            return false;
        }
        
        if (!this.validateEmail(userData.email)) {
            this.showError('Email inválido');
            this.shakeElement(document.getElementById('registerEmail'));
            return false;
        }
        
        if (!this.validatePhone(userData.telefono)) {
            this.showError('Teléfono inválido');
            this.shakeElement(document.getElementById('registerPhone'));
            return false;
        }
        
        if (userData.password.length < 8) {
            this.showError('La contraseña debe tener al menos 8 caracteres');
            this.shakeElement(document.getElementById('registerPassword'));
            return false;
        }
        
        if (userData.password !== userData.confirmPassword) {
            this.showError('Las contraseñas no coinciden');
            this.shakeElement(document.getElementById('confirmPassword'));
            return false;
        }
        
        if (!userData.aceptaTerminos) {
            this.showError('Debes aceptar los términos y condiciones');
            return false;
        }
        
        // Validaciones adicionales para profesionales
        if (userData.tipo === 'profesional') {
            if (!userData.especialidad) {
                this.showError('Debes seleccionar una especialidad');
                this.shakeElement(document.getElementById('specialtySelect'));
                return false;
            }
        }
        
        return true;
    }

    /**
     * MANEJAR CAMBIO DE TIPO DE USUARIO
     */
    handleUserTypeChange(e) {
        const userType = e.target.value;
        const professionalFields = this.elements.professionalFields;
        
        if (professionalFields) {
            if (userType === 'profesional') {
                professionalFields.classList.remove('d-none');
                professionalFields.querySelectorAll('input, select').forEach(field => {
                    field.required = true;
                });
            } else {
                professionalFields.classList.add('d-none');
                professionalFields.querySelectorAll('input, select').forEach(field => {
                    field.required = false;
                    field.value = '';
                });
            }
        }
    }

    /**
     * TOGGLE VISIBILIDAD DE CONTRASEÑA
     */
    togglePasswordVisibility(inputId, buttonId) {
        const input = document.getElementById(inputId);
        const button = document.getElementById(buttonId);
        const icon = button.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'far fa-eye';
        }
    }

    /**
     * MANEJAR BÚSQUEDA CON DEBOUNCE
     */
    handleSearch(e) {
        const query = e.target.value.trim();
        
        // Limpiar timeout anterior
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        
        // Solo buscar si hay suficientes caracteres
        if (query.length >= TEVP_CONFIG.MIN_SEARCH_LENGTH) {
            this.searchTimeout = setTimeout(() => {
                this.performSearch(query);
            }, TEVP_CONFIG.SEARCH_DEBOUNCE_TIME);
        }
    }

    /**
     * REALIZAR BÚSQUEDA
     */
    async performSearch(query) {
        if (!query || query.length < TEVP_CONFIG.MIN_SEARCH_LENGTH) {
            return;
        }
        
        console.log(`🔍 Buscando: ${query}`);
        
        this.showLoading(true);
        
        try {
            // Simular búsqueda (reemplazar con llamada real a API)
            await this.simulateAPICall();
            
            // Simular resultados
            const results = this.generateMockSearchResults(query);
            
            // Mostrar resultados (implementar según diseño)
            this.showSearchResults(results);
            
            this.showInfo(`Se encontraron ${results.length} resultados para "${query}"`);
            
        } catch (error) {
            console.error('❌ Error en búsqueda:', error);
            this.showError('Error al realizar la búsqueda');
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * MANEJAR CLICK EN TARJETA DE SERVICIO
     */
    handleServiceCardClick(e) {
        const serviceCard = e.currentTarget;
        const serviceType = serviceCard.getAttribute('data-service');
        
        console.log(`🛠️ Servicio seleccionado: ${serviceType}`);
        
        // Animación de feedback
        serviceCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            serviceCard.style.transform = '';
        }, 150);
        
        // Navegar a detalle del servicio o abrir modal
        this.openServiceDetail(serviceType);
    }

    /**
     * MANEJAR CLICK EN TARJETA DE PROFESIONAL
     */
    handleProfessionalCardClick(e) {
        const professionalCard = e.currentTarget;
        const professionalId = professionalCard.getAttribute('data-professional');
        
        console.log(`👨‍💼 Profesional seleccionado: ${professionalId}`);
        
        // Animación de feedback
        this.animateCardClick(professionalCard);
        
        // Navegar a perfil del profesional
        this.openProfessionalProfile(professionalId);
    }

    /**
     * ABRIR MODAL DE SOLICITAR SERVICIO
     */
    openRequestServiceModal() {
        console.log('📝 Abriendo modal de solicitud de servicio');
        
        if (this.elements.requestServiceModal) {
            const modal = new bootstrap.Modal(this.elements.requestServiceModal);
            modal.show();
        }
    }

    /**
     * MANEJAR SELECCIÓN DE CATEGORÍA
     */
    handleCategorySelection(e) {
        const button = e.currentTarget;
        const category = button.getAttribute('data-category');
        
        // Desseleccionar todas las categorías
        this.elements.categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Seleccionar la categoría actual
        button.classList.add('active');
        
        console.log(`📂 Categoría seleccionada: ${category}`);
    }

    /**
     * MANEJAR SOLICITUD RÁPIDA DE SERVICIO
     */
    async handleQuickServiceRequest() {
        const selectedCategory = document.querySelector('.category-btn.active');
        const description = document.getElementById('problemDescription').value;
        const urgency = document.querySelector('input[name="urgency"]:checked').value;
        const address = document.getElementById('serviceAddress').value;
        
        if (!selectedCategory) {
            this.showError('Por favor selecciona una categoría');
            return;
        }
        
        if (!description.trim()) {
            this.showError('Por favor describe el problema');
            return;
        }
        
        if (!address.trim()) {
            this.showError('Por favor ingresa la dirección');
            return;
        }
        
        this.showLoading(true);
        
        try {
            // Simular envío de solicitud
            await this.simulateAPICall();
            
            // Cerrar modal
            const modal = bootstrap.Modal.getInstance(this.elements.requestServiceModal);
            modal.hide();
            
            // Limpiar formulario
            this.clearQuickRequestForm();
            
            this.showSuccess('¡Solicitud enviada! Pronto te contactaremos.');
            
        } catch (error) {
            console.error('❌ Error enviando solicitud:', error);
            this.showError('Error al enviar la solicitud');
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * SOLICITAR UBICACIÓN DEL USUARIO
     */
    requestLocation() {
        console.log('📍 Solicitando ubicación...');
        
        if (!navigator.geolocation) {
            this.showError('Tu dispositivo no soporta geolocalización');
            return;
        }
        
        const useLocationBtn = document.getElementById('useLocationBtn');
        useLocationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log(`📍 Ubicación obtenida: ${latitude}, ${longitude}`);
                
                // Simular conversión de coordenadas a dirección
                this.reverseGeocode(latitude, longitude);
                
                useLocationBtn.innerHTML = '<i class="fas fa-check text-success"></i>';
                setTimeout(() => {
                    useLocationBtn.innerHTML = '<i class="fas fa-crosshairs"></i>';
                }, 2000);
            },
            (error) => {
                console.error('❌ Error obteniendo ubicación:', error);
                this.showError('No se pudo obtener tu ubicación');
                useLocationBtn.innerHTML = '<i class="fas fa-crosshairs"></i>';
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    }

    /**
     * MANEJAR GESTOS TOUCH
     */
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchEnd(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = this.touchStartX - touchEndX;
        const diffY = this.touchStartY - touchEndY;
        
        // Detectar swipe horizontal
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > TEVP_CONFIG.SWIPE_THRESHOLD) {
            if (diffX > 0) {
                // Swipe left - siguiente slide
                this.nextOnboardingSlide();
            } else {
                // Swipe right - slide anterior
                if (this.onboardingCurrentSlide > 1) {
                    this.onboardingCurrentSlide--;
                    this.updateOnboardingSlide();
                }
            }
        }
    }

    /**
     * ACTUALIZAR NAVEGACIÓN INFERIOR
     */
    updateBottomNavigation(activeScreen) {
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-screen') === activeScreen) {
                item.classList.add('active');
            }
        });
    }

    /**
     * ACTUALIZAR SALUDO EN HOME
     */
    updateGreeting() {
        const userNameSpan = document.getElementById('userName');
        if (userNameSpan && this.userData) {
            userNameSpan.textContent = this.userData.nombre;
        }
    }

    /**
     * CARGAR SERVICIOS DESTACADOS
     */
    async loadFeaturedServices() {
        console.log('🛠️ Cargando servicios destacados...');
        
        try {
            // Simular carga de datos
            await this.simulateAPICall();
            
            // Los servicios ya están en el HTML estático
            // Aquí se actualizarían con datos reales de la API
            
        } catch (error) {
            console.error('❌ Error cargando servicios:', error);
        }
    }

    /**
     * CARGAR PROFESIONALES RECOMENDADOS
     */
    async loadRecommendedProfessionals() {
        console.log('👨‍💼 Cargando profesionales recomendados...');
        
        try {
            // Simular carga de datos
            await this.simulateAPICall();
            
            // Los profesionales ya están en el HTML estático
            // Aquí se actualizarían con datos reales de la API
            
        } catch (error) {
            console.error('❌ Error cargando profesionales:', error);
        }
    }

    /**
     * MOSTRAR/OCULTAR LOADING GLOBAL
     */
    showLoading(show) {
        if (this.elements.globalLoading) {
            this.elements.globalLoading.classList.toggle('d-none', !show);
        }
    }

    /**
     * MOSTRAR LOADING EN BOTÓN
     */
    showButtonLoading(button, show) {
        if (!button) return;
        
        const textSpan = button.querySelector('.btn-text');
        const spinnerSpan = button.querySelector('.btn-spinner');
        
        if (textSpan && spinnerSpan) {
            textSpan.classList.toggle('d-none', show);
            spinnerSpan.classList.toggle('d-none', !show);
        }
        
        button.disabled = show;
    }

    /**
     * MOSTRAR NOTIFICACIÓN DE ÉXITO
     */
    showSuccess(message) {
        this.showToast('success', message);
    }

    /**
     * MOSTRAR NOTIFICACIÓN DE ERROR
     */
    showError(message) {
        this.showToast('error', message);
    }

    /**
     * MOSTRAR NOTIFICACIÓN DE INFORMACIÓN
     */
    showInfo(message) {
        this.showToast('info', message);
    }

    /**
     * MOSTRAR TOAST NOTIFICATION
     */
    showToast(type, message) {
        const toastElement = document.getElementById(`${type}Toast`);
        const messageElement = document.getElementById(`${type}Message`);
        
        if (toastElement && messageElement) {
            messageElement.textContent = message;
            
            const toast = new bootstrap.Toast(toastElement, {
                delay: TEVP_CONFIG.TOAST_DURATION
            });
            
            toast.show();
        }
        
        console.log(`📢 Toast ${type}: ${message}`);
    }

    /**
     * ANIMAR CLICK EN ELEMENTO
     */
    animateCardClick(element) {
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            element.style.transform = '';
            setTimeout(() => {
                element.style.transition = '';
            }, 300);
        }, 100);
    }

    /**
     * SACUDIR ELEMENTO (PARA ERRORES)
     */
    shakeElement(element) {
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, 500);
    }

    /**
     * UTILIDADES DE VALIDACIÓN
     */
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    validateRUT(rut) {
        if (!rut) return false;
        
        // Remover puntos y guión
        rut = rut.replace(/\./g, '').replace(/\-/g, '').toUpperCase();
        
        if (rut.length < 8 || rut.length > 9) return false;
        
        const rutNumbers = rut.slice(0, -1);
        const verificador = rut.slice(-1);
        
        // Validar que todos sean números (excepto el verificador que puede ser K)
        if (!/^[0-9]+$/.test(rutNumbers)) return false;
        if (!/^[0-9K]$/.test(verificador)) return false;
        
        // Algoritmo de validación del RUT
        let suma = 0;
        let multiplicador = 2;
        
        for (let i = rutNumbers.length - 1; i >= 0; i--) {
            suma += parseInt(rutNumbers[i]) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }
        
        const resto = suma % 11;
        const verificadorCalculado = resto === 0 ? '0' : resto === 1 ? 'K' : (11 - resto).toString();
        
        return verificador === verificadorCalculado;
    }

    validatePhone(phone) {
        // Validar formato básico de teléfono chileno
        const re = /^(\+56)?[0-9]{8,9}$/;
        return re.test(phone.replace(/\s/g, ''));
    }

    /**
     * FORMATEAR RUT MIENTRAS SE ESCRIBE
     */
    formatRUT(e) {
        let value = e.target.value.replace(/\./g, '').replace(/\-/g, '');
        
        if (value.length <= 1) {
            e.target.value = value;
            return;
        }
        
        const rutNumbers = value.slice(0, -1);
        const verificador = value.slice(-1);
        
        // Agregar puntos cada 3 dígitos
        const formattedRut = rutNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        
        e.target.value = formattedRut + '-' + verificador;
    }

    /**
     * FORMATEAR TELÉFONO MIENTRAS SE ESCRIBE
     */
    formatPhone(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Agregar +56 si no lo tiene
        if (value.length > 0 && !value.startsWith('56')) {
            value = '56' + value;
        }
        
        // Formatear como +56 9 1234 5678
        if (value.length >= 2) {
            value = '+' + value;
        }
        
        e.target.value = value;
    }

    /**
     * SIMULAR LLAMADA A API
     */
    simulateAPICall(delay = 1500) {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }

    /**
     * GENERAR RESULTADOS DE BÚSQUEDA SIMULADOS
     */
    generateMockSearchResults(query) {
        const mockResults = [
            { type: 'service', name: 'Plomería de emergencia', category: 'Plomería' },
            { type: 'professional', name: 'Carlos Mendoza', specialty: 'Plomero' },
            { type: 'service', name: 'Instalación eléctrica', category: 'Electricidad' },
            { type: 'professional', name: 'María González', specialty: 'Electricista' }
        ];
        
        // Filtrar resultados basados en la consulta
        return mockResults.filter(result => 
            result.name.toLowerCase().includes(query.toLowerCase()) ||
            result.category?.toLowerCase().includes(query.toLowerCase()) ||
            result.specialty?.toLowerCase().includes(query.toLowerCase())
        );
    }

    /**
     * CONFIGURAR VIEWPORT PARA MÓVILES
     */
    setupViewport() {
        // Prevenir zoom en dispositivos iOS
        document.addEventListener('touchstart', function() {}, { passive: true });
        
        // Ajustar altura de viewport para dispositivos móviles
        const setViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', () => {
            setTimeout(setViewportHeight, 500);
        });
    }

    /**
     * CONFIGURAR PWA
     */
    setupPWA() {
        // Detectar si la app puede ser instalada
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Mostrar botón de instalación personalizado
            this.showInstallPrompt();
        });
        
        // Detectar cuando la app es instalada
        window.addEventListener('appinstalled', () => {
            console.log('📱 TEVP instalado como PWA');
            this.showSuccess('¡TEVP instalado correctamente!');
        });
    }

    /**
     * CONFIGURAR NOTIFICACIONES
     */
    async setupNotifications() {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            const permission = await Notification.requestPermission();
            
            if (permission === 'granted') {
                console.log('✅ Permisos de notificación concedidos');
            }
        }
    }

    /**
     * ACTUALIZAR HISTORIAL DEL NAVEGADOR
     */
    updateBrowserHistory(screenName) {
        const url = `${window.location.pathname}#${screenName}`;
        history.pushState({ screen: screenName }, '', url);
    }

    /**
     * MANEJAR BOTÓN ATRÁS DEL NAVEGADOR
     */
    handleBackButton(e) {
        if (e.state && e.state.screen) {
            this.navigateToScreen(e.state.screen);
        } else {
            // Navegación por defecto al presionar atrás
            switch (this.currentScreen) {
                case 'homeScreen':
                    // En home, salir de la app o mostrar confirmación
                    this.showExitConfirmation();
                    break;
                default:
                    this.navigateToScreen('homeScreen');
                    break;
            }
        }
    }

    /**
     * MOSTRAR CONFIRMACIÓN DE SALIDA
     */
    showExitConfirmation() {
        if (confirm('¿Deseas salir de TEVP?')) {
            window.close();
        }
    }

    /**
     * LIMPIAR FORMULARIO DE SOLICITUD RÁPIDA
     */
    clearQuickRequestForm() {
        // Limpiar campos del formulario
        document.getElementById('problemDescription').value = '';
        document.getElementById('serviceAddress').value = '';
        
        // Desseleccionar categorías
        this.elements.categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Resetear urgencia a normal
        document.getElementById('normalUrgency').checked = true;
    }
}

/**
 * INICIALIZAR APLICACIÓN CUANDO EL DOM ESTÉ LISTO
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 DOM cargado, inicializando TEVP Mobile...');
    
    // Crear instancia global de la aplicación
    window.tevpApp = new TEVPMobileApp();
});

/**
 * FUNCIONES UTILITARIAS GLOBALES
 */

// Debounce function para optimizar eventos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function para optimizar scroll y resize
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Detectar características del dispositivo
const deviceInfo = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
    isAndroid: /Android/.test(navigator.userAgent),
    hasTouch: 'ontouchstart' in window,
    isStandalone: window.matchMedia('(display-mode: standalone)').matches
};

// Optimizaciones para diferentes dispositivos
if (deviceInfo.isIOS) {
    // Optimizaciones específicas para iOS
    document.body.classList.add('ios-device');
}

if (deviceInfo.isAndroid) {
    // Optimizaciones específicas para Android
    document.body.classList.add('android-device');
}

if (deviceInfo.isStandalone) {
    // App instalada como PWA
    document.body.classList.add('pwa-installed');
}

// Prevenir comportamientos no deseados en móvil
if (deviceInfo.isMobile) {
    // Prevenir selección de texto accidental
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
    
    // Mejorar rendimiento del scroll
    let ticking = false;
    
    function updateScrollPosition() {
        // Aquí se pueden agregar efectos de scroll optimizados
        ticking = false;
    }
    
    document.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    }, { passive: true });
}

/**
 * EVENT LISTENERS GLOBALES PARA OPTIMIZACIÓN
 */

// Optimizar rendimiento pausando animaciones cuando la pestaña no está activa
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pausar animaciones y reducir uso de recursos
        document.body.classList.add('page-hidden');
    } else {
        // Reactivar animaciones
        document.body.classList.remove('page-hidden');
    }
});

// Manejar cambios de conexión
window.addEventListener('online', function() {
    console.log('🌐 Conexión restaurada');
    document.body.classList.remove('offline');
    if (window.tevpApp) {
        window.tevpApp.showSuccess('Conexión restaurada');
    }
});

window.addEventListener('offline', function() {
    console.log('📵 Conexión perdida');
    document.body.classList.add('offline');
    if (window.tevpApp) {
        window.tevpApp.showError('Sin conexión a internet');
    }
});

// Manejar errores JavaScript globales
window.addEventListener('error', function(e) {
    console.error('💥 Error JavaScript global:', e);
    
    if (window.tevpApp && window.tevpApp.isInitialized) {
        window.tevpApp.showError('Ha ocurrido un error inesperado');
    }
});

// Manejar errores de promesas no capturadas
window.addEventListener('unhandledrejection', function(e) {
    console.error('💥 Promise rechazada no capturada:', e);
    
    if (window.tevpApp && window.tevpApp.isInitialized) {
        window.tevpApp.showError('Error de conexión');
    }
});

/**
 * CONSOLE LOG INFORMATIVO
 */
console.log(`
🔧 TEVP MÓVIL v${TEVP_CONFIG.VERSION}
📱 Optimizado para dispositivos móviles
🚀 Desarrollado para presentación técnica

Características:
✅ Progressive Web App (PWA)
✅ Responsive Design Mobile-First
✅ Touch Gestures & Interactions
✅ Offline Mode Support
✅ Push Notifications Ready
✅ Modern JavaScript ES6+
✅ Bootstrap 5.3.2 Integration
✅ Font Awesome 6.4.0 Icons

Dispositivo detectado:
📱 Móvil: ${deviceInfo.isMobile}
🍎 iOS: ${deviceInfo.isIOS}
🤖 Android: ${deviceInfo.isAndroid}
👆 Touch: ${deviceInfo.hasTouch}
📦 PWA: ${deviceInfo.isStandalone}
`);

/**
 * =====================================================
 * FIN DEL ARCHIVO JAVASCRIPT MOCKUP MÓVIL TEVP
 * =====================================================
 */