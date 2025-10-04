/* ===== NAVIGATION.JS - SISTEMA DE NAVEGACIÓN PARA ANDROID MOCKUPS ===== */
/* Este archivo maneja toda la navegación y funcionalidad del sidebar */

// Variables globales
let sidebarActive = false;

// Función para alternar el sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (!sidebar || !overlay) {
        console.warn('Elementos de sidebar no encontrados');
        return;
    }
    
    sidebarActive = !sidebarActive;
    
    if (sidebarActive) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    } else {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Función para cerrar el sidebar
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        sidebarActive = false;
    }
}

// Navegación entre pantallas
function navigateTo(page) {
    console.log('Navegando a:', page);
    
    // Cerrar sidebar si está abierto
    closeSidebar();
    
    // Mapeo de páginas
    const pageMap = {
        'home': 'android-home-logueado.html',
        'dashboard': 'android-home-logueado.html',
        'buscar': 'android-busqueda-servicios.html',
        'buscar-servicios': 'android-busqueda-servicios.html',
        'servicios': 'android-mis-contrataciones.html',
        'contrataciones': 'android-mis-contrataciones.html',
        'mis-contrataciones': 'android-mis-contrataciones.html',
        'perfil': 'android-perfil-usuario.html',
        'usuario': 'android-perfil-usuario.html',
        'detalle-profesional': 'android-detalle-profesional.html',
        'profesional': 'android-detalle-profesional.html',
        'reservar': 'android-reservar-servicio.html',
        'galeria': 'galeria-mobile.html',
        'volver': 'galeria-mobile.html'
    };
    
    const targetPage = pageMap[page];
    
    if (targetPage) {
        // Efecto de transición
        const currentPage = document.body;
        currentPage.style.opacity = '0.8';
        currentPage.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            window.location.href = targetPage;
        }, 200);
    } else {
        console.warn('Página no encontrada:', page);
        alert('Página en desarrollo: ' + page);
    }
}

// Función para abrir mockups desde la galería
function openMockup(filename) {
    if (!filename) {
        console.error('Nombre de archivo no proporcionado');
        return;
    }
    
    // Verificar si el archivo tiene extensión
    if (!filename.includes('.html')) {
        filename += '.html';
    }
    
    // Crear enlace temporal
    const link = document.createElement('a');
    link.href = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Efecto visual en la tarjeta
    const card = event?.currentTarget;
    if (card) {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }
    
    // Abrir en nueva pestaña
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Abriendo mockup:', filename);
}

// Función para manejar el botón "atrás"
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // Si no hay historial, ir a la galería
        window.location.href = 'galeria-mobile.html';
    }
}

// Funciones de utilidad para diferentes pantallas

// Búsqueda de servicios
function performSearch(query) {
    if (!query) {
        query = document.querySelector('.search-input')?.value || '';
    }
    
    if (query.trim()) {
        console.log('Realizando búsqueda:', query);
        // Aquí iría la lógica de búsqueda real
        alert(`Buscando: "${query}"`);
    } else {
        alert('Por favor ingresa un término de búsqueda');
    }
}

function selectCategory(category) {
    console.log('Categoría seleccionada:', category);
    // Simular navegación a resultados de categoría
    alert(`Mostrando servicios de: ${category}`);
}

// Gestión de favoritos
function toggleFavorite(itemId) {
    console.log('Alternando favorito:', itemId);
    const heartIcon = event?.target?.querySelector('i') || event?.target;
    
    if (heartIcon) {
        if (heartIcon.classList.contains('fas')) {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            heartIcon.style.color = 'white';
        } else {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            heartIcon.style.color = '#ffd700';
        }
    }
}

// Gestión de contacto
function contactProfessional(professionalId) {
    console.log('Contactando profesional:', professionalId);
    alert('Abriendo chat con el profesional...');
}

function callProfessional(phone) {
    console.log('Llamando a:', phone);
    if (phone) {
        window.location.href = `tel:${phone}`;
    } else {
        alert('Iniciando llamada...');
    }
}

// Gestión de servicios
function cancelService(serviceId) {
    if (confirm('¿Estás seguro de que quieres cancelar este servicio?')) {
        console.log('Cancelando servicio:', serviceId);
        alert('Servicio cancelado exitosamente');
        // Aquí iría la lógica de cancelación
    }
}

function rateService(serviceId) {
    console.log('Calificando servicio:', serviceId);
    alert('Abriendo sistema de calificación...');
}

function trackService(serviceId) {
    console.log('Siguiendo servicio:', serviceId);
    alert('Abriendo seguimiento en tiempo real...');
}

// Configuración y ajustes
function openSettings() {
    alert('Abriendo configuración...');
}

function showHelp() {
    alert('Mostrando centro de ayuda...');
}

function openSupport() {
    alert('Contactando soporte técnico...');
}

// Gestión de notificaciones
function showNotifications() {
    alert('Mostrando notificaciones...');
}

function markNotificationAsRead(notificationId) {
    console.log('Marcando notificación como leída:', notificationId);
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Navigation.js cargado correctamente');
    
    // Agregar event listeners automáticamente
    
    // Botones del sidebar
    const menuBtns = document.querySelectorAll('.menu-btn');
    menuBtns.forEach(btn => {
        btn.addEventListener('click', toggleSidebar);
    });
    
    // Botón de cerrar sidebar
    const closeBtns = document.querySelectorAll('.close-btn');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeSidebar);
    });
    
    // Overlay del sidebar
    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
    
    // Botones de "atrás"
    const backBtns = document.querySelectorAll('.back-btn');
    backBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            goBack();
        });
    });
    
    // Búsqueda con Enter
    const searchInputs = document.querySelectorAll('.search-input, input[type="search"]');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    });
    
    // Botones de búsqueda
    const searchBtns = document.querySelectorAll('.search-btn');
    searchBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = document.querySelector('.search-input');
            performSearch(input?.value);
        });
    });
    
    // Enlaces del sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo prevenir default si es un enlace interno
            if (this.href.includes('galeria-mobile.html')) {
                e.preventDefault();
                closeSidebar();
                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            }
        });
    });
    
    // Gestión de navegación inferior
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover clase active de todos los items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Agregar clase active al item clickeado
            this.classList.add('active');
        });
    });
    
    // Prevenir zoom en doble tap en dispositivos móviles
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Manejar orientación del dispositivo
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    });
});

// Funciones específicas para diferentes tipos de mockup

// Para la pantalla de perfil
function editProfile() {
    alert('Abriendo editor de perfil...');
}

function changeProfilePicture() {
    alert('Seleccionar nueva foto de perfil...');
}

// Para la pantalla de reservas
function confirmReservation() {
    alert('¡Reserva confirmada! Te contactaremos pronto.');
    // Simular navegación a mis contrataciones
    setTimeout(() => {
        navigateTo('mis-contrataciones');
    }, 1500);
}

function selectDate(date) {
    console.log('Fecha seleccionada:', date);
}

function selectTime(time) {
    console.log('Hora seleccionada:', time);
}

// Para filtros y opciones
function applyFilters() {
    alert('Aplicando filtros...');
}

function clearFilters() {
    alert('Limpiando filtros...');
}

// Exportar funciones para uso global
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.navigateTo = navigateTo;
window.openMockup = openMockup;
window.goBack = goBack;
window.performSearch = performSearch;
window.selectCategory = selectCategory;
window.toggleFavorite = toggleFavorite;
window.contactProfessional = contactProfessional;
window.callProfessional = callProfessional;
window.cancelService = cancelService;
window.rateService = rateService;
window.trackService = trackService;
window.confirmReservation = confirmReservation;

console.log('🚀 Navigation.js cargado - Sistema de navegación Android Mockup listo');