// Sistema de navegación para mockups TEVP
const NAVIGATION_MAP = {
    // Navegación principal
    'home': '05-home-mobile.html',
    'servicios': '06-servicios-mobile.html',
    'busqueda': 'android-busqueda-servicios.html',
    'profesionales': 'android-profesionales-disponibles.html',
    'profesional-detalle': '07-profesional-mobile.html',
    'contratar': 'android-gestion-servicio.html',
    'mis-pedidos': '08-pedidos-mobile.html',
    'mi-perfil': '09-perfil-mobile.html',
    
    // Panel profesional
    'dashboard-profesional': 'android-profesional-trabajos.html',
    'mis-trabajos': 'android-trabajos-realizados.html',
    'ganancias': 'android-ganancias-dinero.html',
    'retiros': 'android-retiro-dinero.html',
    'perfil-profesional': 'android-perfil-profesional.html',
    'resenas': 'android-calificaciones-resenas.html',
    
    // Navegación inicial
    'login': '03-login-mobile.html',
    'registro': '04-registro-mobile.html',
    'onboarding': '02-onboarding-mobile.html',
    'splash': '01-splash.html',
    
    // Galería
    'galeria': 'galeria-mobile.html'
};

// Función para navegar entre pantallas
function navigateTo(screen) {
    if (NAVIGATION_MAP[screen]) {
        window.location.href = NAVIGATION_MAP[screen];
    } else {
        console.log('Pantalla no encontrada:', screen);
    }
}

// Función para volver atrás
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        navigateTo('galeria');
    }
}

// Funciones específicas de navegación
function irABusqueda() {
    navigateTo('busqueda');
}

function irAProfesionales() {
    navigateTo('profesionales');
}

function irAServicios() {
    navigateTo('servicios');
}

function irAMiPerfil() {
    navigateTo('mi-perfil');
}

function irAMisPedidos() {
    navigateTo('mis-pedidos');
}

function irADashboard() {
    navigateTo('dashboard-profesional');
}

function irAGanancias() {
    navigateTo('ganancias');
}

function verProfesional(id) {
    // Navegar al detalle del profesional
    navigateTo('profesional-detalle');
}

function contratarServicio(servicio) {
    // Navegar a la pantalla de contratación
    navigateTo('contratar');
}

// Auto-setup de navegación al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Agregar eventos a botones comunes
    const backButtons = document.querySelectorAll('.back-button, .btn-back');
    backButtons.forEach(btn => {
        btn.addEventListener('click', goBack);
    });
    
    // Agregar eventos a botones de navegación
    const navButtons = document.querySelectorAll('[data-navigate]');
    navButtons.forEach(btn => {
        const target = btn.getAttribute('data-navigate');
        btn.addEventListener('click', () => navigateTo(target));
    });
});