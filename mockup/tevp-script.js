// ===== TEVP MOCKUP - SISTEMA COMPLETO Y FUNCIONAL =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 TEVP Mockup - Sistema Avanzado Iniciado');
    
    // Configurar navegación entre etapas
    setupStageNavigation();
    
    // Configurar efectos visuales
    setupVisualEffects();
    
    // Configurar animaciones
    setupAnimations();
    
    // Inicializar primera etapa
    initializeDefaultStage();
    
    console.log('✅ Todas las funcionalidades activadas');
});

// ===== FUNCIÓN PRINCIPAL DE NAVEGACIÓN =====
function setupStageNavigation() {
    const stageButtons = document.querySelectorAll('.stage-btn');
    const stageContents = document.querySelectorAll('.stage-content');
    
    stageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetStage = this.getAttribute('data-stage');
            
            console.log(`📱 Cambiando a ${targetStage}`);
            
            // OCULTAR TODAS LAS ETAPAS con animación
            stageContents.forEach(content => {
                content.classList.remove('active');
                setTimeout(() => {
                    content.style.display = 'none';
                }, 100);
            });
            
            // QUITAR ACTIVE DE TODOS LOS BOTONES
            stageButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // ACTIVAR BOTÓN CLICKEADO
            this.classList.add('active');
            
            // MOSTRAR SOLO LA ETAPA SELECCIONADA con animación
            setTimeout(() => {
                const targetContent = document.getElementById(targetStage);
                if (targetContent) {
                    targetContent.style.display = 'block';
                    setTimeout(() => {
                        targetContent.classList.add('active');
                    }, 50);
                    console.log(`✅ Mostrando solo ${targetStage}`);
                    
                    // Contar pantallas de la etapa activa
                    updateScreenCounter(targetContent);
                }
            }, 150);
        });
    });
}

// ===== FUNCIÓN PARA CONTAR PANTALLAS =====
function updateScreenCounter(stageContent) {
    const screens = stageContent.querySelectorAll('.screen-card');
    const counter = document.querySelector('.screen-counter');
    
    if (counter) {
        counter.textContent = `Pantallas: ${screens.length}`;
    }
    
    console.log(`📊 Etapa activa tiene ${screens.length} pantallas`);
}

// ===== FUNCIÓN PARA EFECTOS VISUALES =====
function setupVisualEffects() {
    // Efecto hover para las pantallas
    const screenCards = document.querySelectorAll('.screen-card');
    
    screenCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efecto click para las imágenes
        const img = card.querySelector('img');
        if (img) {
            img.addEventListener('click', function() {
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        }
    });
}

// ===== FUNCIÓN PARA ANIMACIONES =====
function setupAnimations() {
    // Animación de entrada para las pantallas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.screen-card').forEach(card => {
        observer.observe(card);
    });
}

// ===== FUNCIÓN PARA INICIALIZAR PRIMERA ETAPA =====
function initializeDefaultStage() {
    const firstStageBtn = document.querySelector('.stage-btn[data-stage="stage1"]');
    const firstStageContent = document.getElementById('stage1');
    
    if (firstStageBtn && firstStageContent) {
        // Activar primer botón
        firstStageBtn.classList.add('active');
        
        // Mostrar primer contenido
        firstStageContent.style.display = 'block';
        setTimeout(() => {
            firstStageContent.classList.add('active');
        }, 100);
        
        // Contar pantallas
        updateScreenCounter(firstStageContent);
        
        console.log('🎯 Etapa 1 inicializada por defecto');
    }
}

// ===== FUNCIÓN PARA BÚSQUEDA DE PANTALLAS =====
function searchScreens(searchTerm) {
    const allScreens = document.querySelectorAll('.screen-card');
    
    allScreens.forEach(screen => {
        const title = screen.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm.toLowerCase())) {
            screen.style.display = 'block';
            screen.style.opacity = '1';
        } else {
            screen.style.opacity = '0.3';
        }
    });
}

// ===== FUNCIÓN PARA PANTALLA COMPLETA =====
function toggleFullscreen(element) {
    if (!document.fullscreenElement) {
        element.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// ==========================================
// NAVEGACIÓN COMPACTA
// ==========================================

function setupCompactNavigation() {
    const prevBtn = document.getElementById('prev-screen');
    const nextBtn = document.getElementById('next-screen');
    const backToTopBtn = document.getElementById('back-to-top');
    const toggleBtn = document.getElementById('toggle-nav');
    const floatingNav = document.getElementById('floating-nav');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateToScreen(currentScreenIndex - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateToScreen(currentScreenIndex + 1));
    }
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ 
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    if (toggleBtn && floatingNav) {
        toggleBtn.addEventListener('click', () => {
            floatingNav.classList.toggle('collapsed');
            const icon = toggleBtn.querySelector('i');
            if (floatingNav.classList.contains('collapsed')) {
                icon.className = 'fas fa-chevron-up';
            } else {
                icon.className = 'fas fa-chevron-down';
            }
        });
    }
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) return; // Ignorar si hay modificadores
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                navigateToScreen(currentScreenIndex - 1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigateToScreen(currentScreenIndex + 1);
                break;
            case 'Home':
                e.preventDefault();
                window.scrollTo({ 
                    top: 0,
                    behavior: 'smooth'
                });
                break;
            case 'Escape':
                e.preventDefault();
                if (floatingNav) {
                    floatingNav.classList.toggle('collapsed');
                    const icon = toggleBtn.querySelector('i');
                    if (floatingNav.classList.contains('collapsed')) {
                        icon.className = 'fas fa-chevron-up';
                    } else {
                        icon.className = 'fas fa-chevron-down';
                    }
                }
                break;
        }
    });
}

function initializeScreenCounter() {
    // Contar solo las pantallas de la etapa activa
    const activeStage = document.querySelector('.stage-content.active');
    if (activeStage) {
        allScreens = activeStage.querySelectorAll('.screen-card');
        totalScreens = allScreens.length;
        currentScreenIndex = Math.min(currentScreenIndex, totalScreens - 1);
    } else {
        // Si no hay etapa activa, usar todas las pantallas (fallback)
        allScreens = document.querySelectorAll('.screen-card');
        totalScreens = allScreens.length;
        currentScreenIndex = Math.min(currentScreenIndex, totalScreens - 1);
    }
    updateScreenCounter();
    updateNavigationButtons();
}

function navigateToScreen(index) {
    if (index < 0 || index >= totalScreens) return;
    
    currentScreenIndex = index;
    const targetScreen = allScreens[currentScreenIndex];
    
    if (targetScreen) {
        const offsetTop = targetScreen.offsetTop - 100; // Offset para mejor visibilidad
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Highlight effect más sutil
        targetScreen.style.transition = 'all 0.5s ease';
        targetScreen.style.transform = 'scale(1.02)';
        targetScreen.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.15)';
        
        setTimeout(() => {
            targetScreen.style.transform = '';
            targetScreen.style.boxShadow = '';
        }, 800);
        
        console.log(`📱 Navegando a pantalla ${currentScreenIndex + 1} de ${totalScreens} en la etapa activa`);
    }
    
    updateScreenCounter();
    updateNavigationButtons();
}

function updateScreenCounter() {
    const counter = document.getElementById('screen-counter');
    const stageIndicator = document.getElementById('stage-indicator');
    
    if (counter) {
        counter.textContent = `${currentScreenIndex + 1} / ${totalScreens}`;
    }
    
    if (stageIndicator) {
        const activeStageBtn = document.querySelector('.stage-btn.active');
        if (activeStageBtn) {
            const stageText = activeStageBtn.querySelector('span').textContent;
            const stageMatch = stageText.match(/Etapa (\d+)/);
            if (stageMatch) {
                const stageNumber = stageMatch[1];
                stageIndicator.textContent = `Etapa ${stageNumber}`;
            } else {
                stageIndicator.textContent = stageText;
            }
        } else {
            // Si no hay etapa activa, mostrar todas las etapas
            stageIndicator.textContent = 'Todas las Etapas';
        }
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-screen');
    const nextBtn = document.getElementById('next-screen');
    
    if (prevBtn) {
        prevBtn.disabled = currentScreenIndex <= 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentScreenIndex >= totalScreens - 1;
    }
}

// ==========================================
// NAVEGACIÓN ENTRE ETAPAS
// ==========================================

function setupStageNavigation() {
    const stageButtons = document.querySelectorAll('.stage-btn');
    const stageContents = document.querySelectorAll('.stage-content');
    
    stageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetStage = this.getAttribute('data-stage');
            
            // PASO 1: Ocultar todas las etapas
            stageContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // PASO 2: Remover active de todos los botones
            stageButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // PASO 3: Activar el botón clickeado
            this.classList.add('active');
            
            // PASO 4: Mostrar solo la etapa seleccionada
            const targetContent = document.getElementById(targetStage);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // PASO 5: Resetear navegación para esta etapa
                currentScreenIndex = 0;
                setTimeout(() => {
                    initializeScreenCounter();
                }, 100);
            }
            
            console.log(`📱 Mostrando SOLO ${targetStage}`);
        });
    });
}

// ==========================================
// INTERACCIONES DE PANTALLAS
// ==========================================

function setupScreenInteractions() {
    // Configurar botones de navegación en pantallas
    setupNavigationButtons();
    
    // Configurar toggles y switches
    setupToggles();
    
    // Configurar selectors de tipo de usuario
    setupUserTypeSelectors();
    
    // Configurar métodos de pago
    setupPaymentMethods();
    
    // Configurar filtros
    setupFilters();
    
    // Configurar navegación inferior
    setupBottomNavigation();
}

function setupNavigationButtons() {
    // Botones de retroceso
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('🔙 Botón de retroceso clickeado');
            // Aquí iría la lógica de navegación hacia atrás
            animateButtonClick(this);
        });
    });
    
    // Botones de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('🔍 Filtros abiertos');
            animateButtonClick(this);
        });
    });
    
    // Botones de favoritos
    const favButtons = document.querySelectorAll('.fav-btn');
    favButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fas');
            icon.classList.toggle('far');
            console.log('❤️ Favorito toggleado');
            animateButtonClick(this);
        });
    });
}

function setupToggles() {
    // Switches de servicios
    const switches = document.querySelectorAll('.switch input[type="checkbox"]');
    switches.forEach(switchEl => {
        switchEl.addEventListener('change', function() {
            const serviceItem = this.closest('.service-item');
            const serviceName = serviceItem.querySelector('h4').textContent;
            
            if (this.checked) {
                console.log(`✅ Servicio "${serviceName}" activado`);
                serviceItem.style.opacity = '1';
            } else {
                console.log(`❌ Servicio "${serviceName}" desactivado`);
                serviceItem.style.opacity = '0.6';
            }
            
            // Animación del switch
            const slider = this.nextElementSibling;
            slider.style.transform = 'scale(1.1)';
            setTimeout(() => {
                slider.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function setupUserTypeSelectors() {
    const typeOptions = document.querySelectorAll('.type-option');
    typeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remover active de todas las opciones
            typeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Agregar active a la opción clickeada
            this.classList.add('active');
            
            const userType = this.querySelector('h4').textContent;
            console.log(`👤 Tipo de usuario seleccionado: ${userType}`);
            
            // Animación
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function setupPaymentMethods() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remover active de todas las opciones
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            
            // Agregar active a la opción clickeada
            this.classList.add('active');
            
            const paymentMethod = this.querySelector('span').textContent;
            console.log(`💳 Método de pago seleccionado: ${paymentMethod}`);
            
            // Animación
            animateSelection(this);
        });
    });
}

function setupFilters() {
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Para filtros múltiples, no remover otras selecciones
            // Solo toggle la actual
            this.classList.toggle('active');
            
            const filterText = this.textContent;
            console.log(`🔍 Filtro "${filterText}" ${this.classList.contains('active') ? 'activado' : 'desactivado'}`);
            
            // Animación
            animateSelection(this);
        });
    });
    
    // Filtros de estado en contrataciones
    const statusFilters = document.querySelectorAll('.status-filters .filter-chip');
    statusFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Para filtros de estado, solo uno puede estar activo
            statusFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            const status = this.textContent;
            console.log(`📋 Estado filtrado: ${status}`);
            
            // Simular filtrado de contratos
            filterContracts(status);
        });
    });
}

function setupBottomNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover active de todos los elementos del mismo nav
            const bottomNav = this.closest('.bottom-nav');
            const allNavItems = bottomNav.querySelectorAll('.nav-item');
            allNavItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Agregar active al elemento clickeado
            this.classList.add('active');
            
            const navText = this.querySelector('span').textContent;
            console.log(`🧭 Navegación: ${navText}`);
            
            // Animación
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// ==========================================
// FORMULARIOS INTERACTIVOS
// ==========================================

function setupForms() {
    // Validación en tiempo real
    setupFormValidation();
    
    // Manejo de envío de formularios
    setupFormSubmission();
    
    // Autocompletado y sugerencias
    setupAutoComplete();
}

function setupFormValidation() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remover clases de error mientras el usuario escribe
            this.classList.remove('error');
            const errorMsg = this.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const required = field.hasAttribute('required') || field.closest('.form-group').querySelector('label').textContent.includes('*');
    
    let isValid = true;
    let errorMessage = '';
    
    // Validación de campos requeridos
    if (required && !value) {
        isValid = false;
        errorMessage = 'Este campo es obligatorio';
    }
    
    // Validación específica por tipo
    if (value && fieldType === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Ingresa un email válido';
        }
    }
    
    if (value && fieldType === 'tel') {
        const phoneRegex = /^(\+56\s?)?9\s?\d{4}\s?\d{4}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Formato: +56 9 1234 5678';
        }
    }
    
    if (value && fieldType === 'password' && value.length < 8) {
        isValid = false;
        errorMessage = 'La contraseña debe tener al menos 8 caracteres';
    }
    
    // Mostrar/ocultar mensaje de error
    showFieldValidation(field, isValid, errorMessage);
    
    return isValid;
}

function showFieldValidation(field, isValid, errorMessage) {
    // Remover mensaje de error anterior
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('valid');
    } else {
        field.classList.remove('valid');
        field.classList.add('error');
        
        // Agregar mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        field.parentNode.appendChild(errorDiv);
    }
}

function setupFormSubmission() {
    const forms = document.querySelectorAll('form, .login-form, .register-form, .service-form');
    forms.forEach(form => {
        const submitBtn = form.querySelector('.btn-primary, .btn[type="submit"]');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handleFormSubmission(form);
            });
        }
    });
}

function handleFormSubmission(form) {
    console.log('📝 Enviando formulario...');
    
    // Simular proceso de envío
    const submitBtn = form.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    submitBtn.classList.add('loading');
    
    // Simular delay de red
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('loading');
        
        // Mostrar mensaje de éxito
        showNotification('¡Formulario enviado correctamente!', 'success');
        
        console.log('✅ Formulario enviado exitosamente');
    }, 2000);
}

// ==========================================
// ELEMENTOS INTERACTIVOS
// ==========================================

function setupInteractiveElements() {
    // Botones interactivos
    setupButtons();
    
    // Cards clickeables
    setupClickableCards();
    
    // Elementos con hover effects
    setupHoverEffects();
    
    // Notificaciones
    setupNotifications();
}

function setupButtons() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!this.classList.contains('disabled')) {
                animateButtonClick(this);
                
                const buttonText = this.textContent.trim();
                console.log(`🔘 Botón clickeado: "${buttonText}"`);
                
                // Acciones específicas por tipo de botón
                if (buttonText.includes('Pagar')) {
                    handlePayment(this);
                } else if (buttonText.includes('Confirmar')) {
                    handleConfirmation(this);
                } else if (buttonText.includes('Contactar')) {
                    handleContact(this);
                } else if (buttonText.includes('Calificar')) {
                    handleRating(this);
                }
            }
        });
    });
}

function setupClickableCards() {
    const clickableCards = document.querySelectorAll('.professional-card, .service-card, .category-item, .contract-card, .job-card');
    clickableCards.forEach(card => {
        card.addEventListener('click', function() {
            animateCardClick(this);
            
            const cardTitle = this.querySelector('h4, span')?.textContent || 'Card';
            console.log(`🎯 Card clickeada: "${cardTitle}"`);
        });
    });
}

function setupHoverEffects() {
    const hoverElements = document.querySelectorAll('.screen-card, .professional-result, .option-item');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ==========================================
// ANIMACIONES
// ==========================================

function setupAnimations() {
    // Animación de entrada para las pantallas
    const screenCards = document.querySelectorAll('.screen-card');
    
    // Intersection Observer para animaciones on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    screenCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

function animateButtonClick(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

function animateCardClick(card) {
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 200);
}

function animateSelection(element) {
    element.style.transform = 'scale(1.02)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

// ==========================================
// FUNCIONES ESPECÍFICAS
// ==========================================

function handlePayment(button) {
    console.log('💳 Procesando pago...');
    
    const originalText = button.textContent;
    button.textContent = 'Procesando...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = '¡Pago exitoso!';
        button.classList.remove('btn-primary');
        button.classList.add('btn-secondary');
        
        showNotification('¡Pago realizado correctamente!', 'success');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.classList.remove('btn-secondary');
            button.classList.add('btn-primary');
        }, 3000);
    }, 2000);
}

function handleConfirmation(button) {
    console.log('✅ Confirmando acción...');
    showNotification('Acción confirmada', 'success');
}

function handleContact(button) {
    console.log('📞 Iniciando contacto...');
    showNotification('Contacto iniciado', 'info');
}

function handleRating(button) {
    console.log('⭐ Abriendo sistema de calificación...');
    showNotification('Sistema de calificación abierto', 'info');
}

function filterContracts(status) {
    const contracts = document.querySelectorAll('.contract-card');
    contracts.forEach(contract => {
        const contractStatus = contract.querySelector('.contract-status span').textContent;
        
        if (status === 'Todos' || contractStatus === status) {
            contract.style.display = 'block';
            contract.style.opacity = '1';
        } else {
            contract.style.opacity = '0.3';
        }
    });
}

// ==========================================
// SISTEMA DE NOTIFICACIONES
// ==========================================

function setupNotifications() {
    // Crear contenedor de notificaciones si no existe
    if (!document.querySelector('.notifications-container')) {
        const container = document.createElement('div');
        container.className = 'notifications-container';
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info', duration = 3000) {
    const container = document.querySelector('.notifications-container');
    const notification = document.createElement('div');
    
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Agregar event listener para cerrar
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Agregar al container
    container.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-remover después del duration
    if (duration > 0) {
        setTimeout(() => {
            removeNotification(notification);
        }, duration);
    }
    
    console.log(`🔔 Notificación mostrada: ${message}`);
}

function removeNotification(notification) {
    notification.classList.add('hide');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// ==========================================
// UTILIDADES ADICIONALES
// ==========================================

function setupAutoComplete() {
    const searchInputs = document.querySelectorAll('input[type="text"], input[placeholder*="buscar"], input[placeholder*="Buscar"]');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            if (value.length > 2) {
                console.log(`🔍 Buscando: "${value}"`);
                // Aquí iría la lógica de autocompletado
            }
        });
    });
}

// Función para simular loading states
function simulateLoading(element, duration = 1500) {
    element.classList.add('loading');
    
    setTimeout(() => {
        element.classList.remove('loading');
    }, duration);
}

// Debug function
function logScreenInfo() {
    const activeStage = document.querySelector('.stage-content.active');
    const stageTitle = activeStage?.querySelector('.stage-header h2')?.textContent || 'Desconocido';
    
    console.log(`📱 Etapa activa: ${stageTitle}`);
    console.log(`📱 Pantallas en esta etapa: ${activeStage?.querySelectorAll('.screen-card').length || 0}`);
}

// ==========================================
// PANTALLA DE BIENVENIDA ANIMADA
// ==========================================

function setupWelcomeScreen() {
    const welcomeScreen = document.querySelector('[data-screen="1.1"] .welcome-screen');
    if (!welcomeScreen) return;
    
    // Inicializar estados
    const loadingSection = welcomeScreen.querySelector('.loading-section');
    const welcomeContent = welcomeScreen.querySelector('.welcome-content');
    
    if (loadingSection && welcomeContent) {
        // Ocultar contenido inicialmente
        welcomeContent.style.opacity = '0';
        welcomeContent.style.transform = 'translateY(20px)';
        
        // Animar aparición progresiva
        setTimeout(() => {
            animateWelcomeElements(welcomeScreen);
        }, 100);
        
        // Simular progreso de carga
        simulateLoadingProgress();
        
        // Mostrar contenido después de la carga
        setTimeout(() => {
            showWelcomeContent(loadingSection, welcomeContent);
        }, 3500);
    }
}

function simulateLoadingProgress() {
    const progressFill = document.querySelector('[data-screen="1.1"] .progress-fill');
    const loadingText = document.querySelector('[data-screen="1.1"] .loading-text');
    
    if (!progressFill || !loadingText) return;
    
    const messages = [
        'Inicializando plataforma...',
        'Conectando profesionales...',
        'Verificando seguridad...',
        'Preparando experiencia...',
        '¡Listo para comenzar!'
    ];
    
    let progress = 0;
    let messageIndex = 0;
    
    const updateProgress = () => {
        progress += Math.random() * 25 + 10;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        
        if (messageIndex < messages.length) {
            loadingText.textContent = messages[messageIndex];
            messageIndex++;
        }
        
        if (progress < 100) {
            setTimeout(updateProgress, 600 + Math.random() * 400);
        }
    };
    
    updateProgress();
}

function showWelcomeContent(loadingSection, welcomeContent) {
    // Fade out loading
    loadingSection.style.transition = 'all 0.5s ease';
    loadingSection.style.opacity = '0';
    loadingSection.style.transform = 'translateY(-20px)';
    
    // Fade in welcome content
    setTimeout(() => {
        loadingSection.style.display = 'none';
        welcomeContent.style.transition = 'all 0.6s ease';
        welcomeContent.style.opacity = '1';
        welcomeContent.style.transform = 'translateY(0)';
        
        // Animar elementos del contenido
        animateContentElements(welcomeContent);
    }, 500);
}

function animateContentElements(welcomeContent) {
    const benefitCards = welcomeContent.querySelectorAll('.benefit-card');
    const buttons = welcomeContent.querySelectorAll('.btn');
    const stats = welcomeContent.querySelectorAll('.stat-item');
    
    // Animar tarjetas de beneficios
    benefitCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Animar botones
    buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            button.style.transition = 'all 0.3s ease';
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
        }, 600 + (index * 100));
    });
    
    // Animar estadísticas
    stats.forEach((stat, index) => {
        const number = stat.querySelector('.stat-number');
        if (number) {
            number.style.opacity = '0';
            setTimeout(() => {
                number.style.transition = 'all 0.5s ease';
                number.style.opacity = '1';
                animateNumber(number);
            }, 1000 + (index * 100));
        }
    });
}

function animateNumber(element) {
    const text = element.textContent;
    const isPercentage = text.includes('%');
    const isK = text.includes('K');
    const is247 = text.includes('24/7');
    
    if (is247) return; // No animar 24/7
    
    let targetNumber = parseInt(text);
    if (isK) targetNumber *= 1000;
    
    let current = 0;
    const increment = targetNumber / 30;
    
    const updateNumber = () => {
        current += increment;
        if (current >= targetNumber) {
            current = targetNumber;
        }
        
        let displayValue = Math.floor(current);
        if (isK) displayValue = Math.floor(current / 1000) + 'K';
        if (isPercentage) displayValue += '%';
        
        element.textContent = displayValue + (isPercentage ? '' : (isK ? '+' : ''));
        
        if (current < targetNumber) {
            setTimeout(updateNumber, 50);
        }
    };
    
    updateNumber();
}

function animateWelcomeElements(welcomeScreen) {
    // Agregar clases de animación para CSS
    const logoRing = welcomeScreen.querySelector('.logo-ring');
    const appTitle = welcomeScreen.querySelector('.app-title');
    const appSubtitle = welcomeScreen.querySelector('.app-subtitle');
    
    if (logoRing) {
        logoRing.style.animation = 'rotate 4s linear infinite, pulse 2s ease-in-out infinite';
    }
    
    if (appTitle) {
        appTitle.style.animation = 'slideInDown 0.8s ease-out';
    }
    
    if (appSubtitle) {
        appSubtitle.style.animation = 'fadeInUp 1s ease-out 0.3s both';
    }
}

// Exponer funciones útiles al scope global para debugging
window.TEVP = {
    logScreenInfo,
    showNotification,
    simulateLoading,
    setupWelcomeScreen
};

console.log('🎉 TEVP Mockup JavaScript completamente cargado!');