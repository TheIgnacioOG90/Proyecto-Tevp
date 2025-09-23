// ===== VARIABLES GLOBALES =====
let services = [];
let professionals = [];
let cart = JSON.parse(localStorage.getItem('tevp-cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('tevp-currentUser')) || null;
let users = JSON.parse(localStorage.getItem('tevp-users')) || [];

// ===== DATOS INICIALES - SERVICIOS PROFESIONALES =====

// Categorías de servicios disponibles
const serviceCategories = [
    { id: 1, nombre: "Plomería", icono: "fas fa-wrench", color: "primary" },
    { id: 2, nombre: "Electricidad", icono: "fas fa-bolt", color: "warning" },
    { id: 3, nombre: "Climatización", icono: "fas fa-snowflake", color: "info" },
    { id: 4, nombre: "Electrodomésticos", icono: "fas fa-tv", color: "success" },
    { id: 5, nombre: "Construcción", icono: "fas fa-hammer", color: "dark" },
    { id: 6, nombre: "Soldadura", icono: "fas fa-fire", color: "danger" }
];

// Profesionales por categoría
const initialProfessionals = [
    // PLOMERÍA
    {
        id: 1,
        nombre: "Carlos Mendoza",
        especialidad: "Plomería",
        experiencia: 8,
        calificacion: 4.8,
        totalReseñas: 156,
        tarifaPorHora: 12000,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        certificado: "Técnico en Instalaciones Sanitarias DUOC UC",
        biografia: "Técnico especializado en sistemas hidráulicos con 8 años de experiencia. Experto en reparaciones complejas y instalaciones nuevas.",
        servicios: ["Reparación filtraciones", "Cambio de cañerías", "Instalación sanitarios"],
        tareasRealizadas: 342,
        disponibilidad: "Lun-Vie 8:00-18:00",
        preciosAprox: {
            "Reparación básica": "$25.000 - $35.000",
            "Cambio de cañería": "$45.000 - $80.000",
            "Instalación completa": "$120.000 - $200.000"
        },
        reseñas: [
            { cliente: "María S.", comentario: "Excelente trabajo, muy profesional", calificacion: 5 },
            { cliente: "Juan P.", comentario: "Rápido y eficiente, lo recomiendo", calificacion: 5 },
            { cliente: "Ana M.", comentario: "Muy buen precio y calidad", calificacion: 4 }
        ]
    },
    {
        id: 2,
        nombre: "Miguel Torres",
        especialidad: "Plomería",
        experiencia: 12,
        calificacion: 4.9,
        totalReseñas: 203,
        tarifaPorHora: 15000,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        certificado: "Maestro Plomero Certificado SEC",
        biografia: "Maestro plomero con más de 12 años de experiencia. Especialista en sistemas de calefacción y agua caliente.",
        servicios: ["Sistemas calefacción", "Agua caliente", "Emergencias 24/7"],
        tareasRealizadas: 567,
        disponibilidad: "24/7 Emergencias",
        preciosAprox: {
            "Emergencia nocturna": "$35.000 - $50.000",
            "Sistema calefacción": "$200.000 - $400.000",
            "Mantención preventiva": "$30.000 - $45.000"
        },
        reseñas: [
            { cliente: "Pedro R.", comentario: "Solucionó mi problema de emergencia rápidamente", calificacion: 5 },
            { cliente: "Carmen L.", comentario: "Muy profesional y confiable", calificacion: 5 }
        ]
    },
    {
        id: 3,
        nombre: "Roberto Silva",
        especialidad: "Plomería",
        experiencia: 6,
        calificacion: 4.6,
        totalReseñas: 89,
        tarifaPorHora: 10000,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        certificado: "Técnico en Gasfitería CFT",
        biografia: "Técnico joven y dinámico, especializado en reparaciones rápidas y eficientes. Excelente atención al cliente.",
        servicios: ["Destapes", "Llaves de paso", "Mantención general"],
        tareasRealizadas: 178,
        disponibilidad: "Lun-Sáb 9:00-19:00",
        preciosAprox: {
            "Destape cañería": "$20.000 - $40.000",
            "Cambio llave": "$15.000 - $25.000",
            "Visita técnica": "$12.000"
        },
        reseñas: [
            { cliente: "Luis C.", comentario: "Muy buen precio y rápido", calificacion: 4 },
            { cliente: "Elena V.", comentario: "Joven pero muy competente", calificacion: 5 }
        ]
    },
    {
        id: 4,
        nombre: "Juan Pérez",
        especialidad: "Plomería",
        experiencia: 15,
        calificacion: 5.0,
        totalReseñas: 312,
        tarifaPorHora: 18000,
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
        certificado: "Ingeniero en Construcción + Especialización Sanitaria",
        biografia: "Profesional con vasta experiencia en proyectos residenciales y comerciales. Especialista en diseño de sistemas hidráulicos.",
        servicios: ["Proyectos integrales", "Diseño sistemas", "Supervisión obras"],
        tareasRealizadas: 89,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Proyecto completo": "$500.000 - $2.000.000",
            "Diseño sistema": "$150.000 - $300.000",
            "Supervisión": "$80.000/día"
        },
        reseñas: [
            { cliente: "Empresa XYZ", comentario: "Excelente profesional para proyectos grandes", calificacion: 5 }
        ]
    },
    {
        id: 5,
        nombre: "Andrés Morales",
        especialidad: "Plomería",
        experiencia: 4,
        calificacion: 4.4,
        totalReseñas: 67,
        tarifaPorHora: 9000,
        avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face",
        certificado: "Técnico INACAP en proceso",
        biografia: "Técnico en formación con gran entusiasmo y precios accesibles. Ideal para trabajos básicos y mantenimientos.",
        servicios: ["Reparaciones básicas", "Mantención", "Trabajos menores"],
        tareasRealizadas: 134,
        disponibilidad: "Lun-Dom 10:00-20:00",
        preciosAprox: {
            "Reparación simple": "$15.000 - $25.000",
            "Mantención básica": "$20.000 - $30.000",
            "Consulta técnica": "$8.000"
        },
        reseñas: [
            { cliente: "Rosa M.", comentario: "Muy económico y bueno para trabajos simples", calificacion: 4 }
        ]
    },

    // ELECTRICIDAD
    {
        id: 6,
        nombre: "Luis Ramirez",
        especialidad: "Electricidad",
        experiencia: 10,
        calificacion: 4.9,
        totalReseñas: 234,
        tarifaPorHora: 16000,
        avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
        certificado: "Electricista Clase A SEC",
        biografia: "Electricista certificado SEC con especialización en instalaciones residenciales e industriales. Experto en domótica.",
        servicios: ["Instalaciones certificadas", "Domótica", "Emergencias eléctricas"],
        tareasRealizadas: 456,
        disponibilidad: "Lun-Vie 8:00-19:00",
        preciosAprox: {
            "Instalación enchufe": "$18.000 - $25.000",
            "Tablero eléctrico": "$200.000 - $400.000",
            "Certificación SEC": "$80.000 - $150.000"
        },
        reseñas: [
            { cliente: "Carlos F.", comentario: "Excelente electricista, muy profesional", calificacion: 5 },
            { cliente: "Patricia G.", comentario: "Instaló todo mi sistema domótico perfecto", calificacion: 5 }
        ]
    },
    {
        id: 7,
        nombre: "Patricia González",
        especialidad: "Electricidad",
        experiencia: 7,
        calificacion: 4.7,
        totalReseñas: 145,
        tarifaPorHora: 14000,
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c6e19067?w=150&h=150&fit=crop&crop=face",
        certificado: "Técnico Electricista Industrial",
        biografia: "Técnica especializada en sistemas de iluminación y automatización. Primera mujer certificada en su región.",
        servicios: ["Iluminación LED", "Automatización", "Eficiencia energética"],
        tareasRealizadas: 287,
        disponibilidad: "Lun-Vie 9:00-17:00",
        preciosAprox: {
            "Sistema LED completo": "$150.000 - $350.000",
            "Automatización básica": "$200.000 - $500.000",
            "Consultoría energética": "$50.000"
        },
        reseñas: [
            { cliente: "Diego S.", comentario: "Excelente trabajo en iluminación", calificacion: 5 },
            { cliente: "Mónica R.", comentario: "Muy profesional y detallista", calificacion: 4 }
        ]
    },
    {
        id: 8,
        nombre: "Fernando Castro",
        especialidad: "Electricidad",
        experiencia: 20,
        calificacion: 5.0,
        totalReseñas: 567,
        tarifaPorHora: 22000,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        certificado: "Ingeniero Eléctrico + SEC Clase A",
        biografia: "Ingeniero eléctrico con 20 años de experiencia en proyectos de gran envergadura. Especialista en sistemas de alta tensión.",
        servicios: ["Proyectos industriales", "Alta tensión", "Auditorías eléctricas"],
        tareasRealizadas: 123,
        disponibilidad: "Cita previa",
        preciosAprox: {
            "Proyecto industrial": "$1.000.000+",
            "Auditoría eléctrica": "$300.000 - $800.000",
            "Consultoría": "$100.000/hora"
        },
        reseñas: [
            { cliente: "Industrias ABC", comentario: "El mejor ingeniero eléctrico de la región", calificacion: 5 }
        ]
    },

    // CLIMATIZACIÓN
    {
        id: 9,
        nombre: "Diego Vargas",
        especialidad: "Climatización",
        experiencia: 9,
        calificacion: 4.8,
        totalReseñas: 178,
        tarifaPorHora: 15000,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        certificado: "Técnico en Refrigeración y Climatización",
        biografia: "Especialista en sistemas de aire acondicionado y refrigeración comercial. Certificado en gases refrigerantes.",
        servicios: ["Mantención A/A", "Instalación equipos", "Recarga gas"],
        tareasRealizadas: 389,
        disponibilidad: "Lun-Sáb 8:00-18:00",
        preciosAprox: {
            "Mantención A/A": "$35.000 - $55.000",
            "Recarga gas": "$45.000 - $80.000",
            "Instalación equipo": "$120.000 - $250.000"
        },
        reseñas: [
            { cliente: "Isabel T.", comentario: "Mi aire quedó como nuevo", calificacion: 5 },
            { cliente: "Roberto K.", comentario: "Muy profesional y puntual", calificacion: 4 }
        ]
    },
    {
        id: 10,
        nombre: "Carmen Soto",
        especialidad: "Climatización",
        experiencia: 6,
        calificacion: 4.6,
        totalReseñas: 92,
        tarifaPorHora: 13000,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        certificado: "Técnico CFT en Climatización",
        biografia: "Técnica especializada en sistemas residenciales de climatización. Experta en ahorro energético y mantención preventiva.",
        servicios: ["Climatización residencial", "Ahorro energético", "Mantención preventiva"],
        tareasRealizadas: 156,
        disponibilidad: "Mar-Sáb 9:00-17:00",
        preciosAprox: {
            "Mantención residencial": "$30.000 - $45.000",
            "Optimización energética": "$80.000 - $120.000",
            "Diagnóstico sistema": "$25.000"
        },
        reseñas: [
            { cliente: "Fernando L.", comentario: "Excelente atención y servicio", calificacion: 5 },
            { cliente: "Gloria N.", comentario: "Me ayudó a ahorrar mucho en la cuenta de luz", calificacion: 4 }
        ]
    },

    // ELECTRODOMÉSTICOS
    {
        id: 11,
        nombre: "Sergio Moreno",
        especialidad: "Electrodomésticos",
        experiencia: 11,
        calificacion: 4.9,
        totalReseñas: 267,
        tarifaPorHora: 14000,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        certificado: "Técnico Especialista en Línea Blanca",
        biografia: "Especialista en reparación de refrigeradores, lavadoras y lavavajillas. Trabajo con todas las marcas y repuestos originales.",
        servicios: ["Reparación refrigeradores", "Lavadoras", "Lavavajillas"],
        tareasRealizadas: 678,
        disponibilidad: "Lun-Vie 8:30-18:30",
        preciosAprox: {
            "Reparación refrigerador": "$35.000 - $120.000",
            "Cambio compresor": "$180.000 - $300.000",
            "Reparación lavadora": "$30.000 - $80.000"
        },
        reseñas: [
            { cliente: "Claudia P.", comentario: "Mi refrigerador quedó perfecto", calificacion: 5 },
            { cliente: "Gonzalo R.", comentario: "Muy honesto con los precios", calificacion: 5 }
        ]
    },
    {
        id: 12,
        nombre: "Andrea López",
        especialidad: "Electrodomésticos",
        experiencia: 5,
        calificacion: 4.5,
        totalReseñas: 88,
        tarifaPorHora: 11000,
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c6e19067?w=150&h=150&fit=crop&crop=face",
        certificado: "Técnico en Electrodomésticos",
        biografia: "Técnica especializada en pequeños electrodomésticos y mantención preventiva. Servicio a domicilio con garantía extendida.",
        servicios: ["Pequeños electrodomésticos", "Mantención", "Microondas"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Vie 10:00-19:00",
        preciosAprox: {
            "Reparación microondas": "$25.000 - $45.000",
            "Mantención preventiva": "$20.000 - $35.000",
            "Pequeños electrodomésticos": "$15.000 - $30.000"
        },
        reseñas: [
            { cliente: "Raquel S.", comentario: "Muy buena atención y rápida", calificacion: 4 },
            { cliente: "Tomás H.", comentario: "Precios justos y buen trabajo", calificacion: 5 }
        ]
    }
];

// Servicios principales (resumen por categoría)
const initialServices = [
    {
        id: 1,
        codigo: "PLOM001",
        nombre: "Servicios de Plomería",
        descripcion: "Reparación de filtraciones, cambio de llaves, destape de cañerías y mantención general",
        categoria: "Plomería",
        precioDesde: 9000,
        precioHasta: 18000,
        imagen: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
        profesionalesDisponibles: 5,
        tiempoRespuesta: "30 min - 2 hrs"
    },
    {
        id: 2,
        codigo: "ELEC001",
        nombre: "Servicios Eléctricos",
        descripcion: "Instalación eléctrica, reparación de cortocircuitos y certificación SEC",
        categoria: "Electricidad",
        precioDesde: 14000,
        precioHasta: 22000,
        imagen: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
        profesionalesDisponibles: 3,
        tiempoRespuesta: "1 - 4 hrs"
    },
    {
        id: 3,
        codigo: "CLIM001",
        nombre: "Climatización",
        descripcion: "Mantención de aires acondicionados, recarga de gas y optimización energética",
        categoria: "Climatización",
        precioDesde: 13000,
        precioHasta: 15000,
        imagen: "https://images.unsplash.com/photo-1635274250950-fab8fb6d3bfb?w=400&h=300&fit=crop",
        profesionalesDisponibles: 2,
        tiempoRespuesta: "2 - 6 hrs"
    },
    {
        id: 4,
        codigo: "ELECT001",
        nombre: "Reparación Electrodomésticos",
        descripcion: "Reparación de refrigeradores, lavadoras, microondas y línea blanca en general",
        categoria: "Electrodomésticos",
        precioDesde: 11000,
        precioHasta: 14000,
        imagen: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&h=300&fit=crop",
        profesionalesDisponibles: 2,
        tiempoRespuesta: "1 - 3 hrs"
    },
    {
        id: 5,
        codigo: "CONST001",
        nombre: "Construcción y Albañilería",
        descripcion: "Trabajos de albañilería, construcción de muros y reparaciones estructurales",
        categoria: "Construcción",
        precioDesde: 12000,
        precioHasta: 20000,
        imagen: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
        profesionalesDisponibles: 4,
        tiempoRespuesta: "4 - 24 hrs"
    },
    {
        id: 6,
        codigo: "SOLD001",
        nombre: "Soldadura Especializada",
        descripcion: "Trabajos de soldadura en acero, aluminio y estructuras metálicas",
        categoria: "Soldadura",
        precioDesde: 15000,
        precioHasta: 25000,
        imagen: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop",
        profesionalesDisponibles: 3,
        tiempoRespuesta: "2 - 8 hrs"
    }
];

// Regiones y comunas de Chile
const regionesComunas = {
    "Región Metropolitana": [
        "Santiago", "Puente Alto", "Maipú", "La Florida", "Las Condes", "Providencia",
        "Ñuñoa", "San Bernardo", "Vitacura", "Lo Barnechea", "Quilicura", "Peñalolén"
    ],
    "Región de Valparaíso": [
        "Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio",
        "Quillota", "Los Andes", "Limache"
    ],
    "Región del Biobío": [
        "Concepción", "Talcahuano", "Los Ángeles", "Chillán", "Coronel",
        "San Pedro de la Paz", "Tomé", "Hualpén"
    ]
};

// ===== FUNCIONES PRINCIPALES =====

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar servicios y profesionales si no existen
    if (!localStorage.getItem('tevp-services')) {
        services = initialServices;
        localStorage.setItem('tevp-services', JSON.stringify(services));
    } else {
        services = JSON.parse(localStorage.getItem('tevp-services'));
    }

    if (!localStorage.getItem('tevp-professionals')) {
        professionals = initialProfessionals;
        localStorage.setItem('tevp-professionals', JSON.stringify(professionals));
    } else {
        professionals = JSON.parse(localStorage.getItem('tevp-professionals'));
    }
    
    // Inicializar según la página
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'productos.html':
            initServicesPage();
            break;
        case 'detalle-producto.html':
            initServiceDetailPage();
            break;
        case 'registro.html':
            initRegisterPage();
            enhanceRegisterForm();
            break;
        case 'login.html':
            initLoginPage();
            enhanceLoginForm();
            break;
        case 'contacto.html':
            initContactPage();
            enhanceContactForm();
            break;
        case 'nosotros.html':
            initAboutPage();
            break;
    }
    
    // Actualizar contador del carrito y navegación
    updateCartCount();
    updateNavbar();
});

// Función para cargar servicios destacados en la página principal
function initHomePage() {
    loadFeaturedServices();
}

// Función para cargar todos los servicios
function initServicesPage() {
    loadAllServices();
}

// Función para cargar servicios destacados
function loadFeaturedServices() {
    const container = document.getElementById('productos-lista');
    if (!container) return;

    // Limpiar loader
    container.innerHTML = '';

    services.slice(0, 6).forEach(service => {
        const serviceCard = createServiceCard(service);
        container.appendChild(serviceCard);
    });
}

// Función para cargar todos los servicios
function loadAllServices() {
    const container = document.getElementById('productos-lista');
    if (!container) return;

    container.innerHTML = '';

    services.forEach(service => {
        const serviceCard = createServiceCard(service);
        container.appendChild(serviceCard);
    });
}

// Función para crear tarjeta de servicio
function createServiceCard(service) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';
    
    const categoryColor = serviceCategories.find(cat => cat.nombre === service.categoria)?.color || 'primary';
    
    col.innerHTML = `
        <div class="card product-card h-100">
            <img src="${service.imagen}" class="card-img-top" alt="${service.nombre}">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="badge bg-${categoryColor}">${service.categoria}</span>
                    <small class="text-muted">${service.profesionalesDisponibles} profesionales</small>
                </div>
                <h5 class="card-title">${service.nombre}</h5>
                <p class="card-text">${service.descripcion}</p>
                <div class="mb-3">
                    <div class="d-flex justify-content-between text-muted small">
                        <span><i class="fas fa-clock me-1"></i>${service.tiempoRespuesta}</span>
                        <span><i class="fas fa-dollar-sign me-1"></i>${formatPrice(service.precioDesde)} - ${formatPrice(service.precioHasta)}/hr</span>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-transparent">
                <button class="btn btn-primary w-100" onclick="viewServiceProfessionals(${service.id})">
                    <i class="fas fa-users me-2"></i>Ver Profesionales
                </button>
            </div>
        </div>
    `;
    
    return col;
}

// Función para ver profesionales de un servicio
function viewServiceProfessionals(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;
    
    // Redireccionar a página de profesionales con el servicio seleccionado
    window.location.href = `profesionales.html?categoria=${encodeURIComponent(service.categoria)}`;
}

// Función para formatear precios
function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', { 
        style: 'currency', 
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

// Funciones del carrito (adaptadas para servicios)
function addToCart(professionalId, serviceType = "Consulta básica") {
    const professional = professionals.find(p => p.id === professionalId);
    if (!professional) return;

    const cartItem = {
        id: Date.now(),
        professionalId: professional.id,
        professionalName: professional.nombre,
        serviceType: serviceType,
        especialidad: professional.especialidad,
        precio: professional.tarifaPorHora,
        cantidad: 1,
        avatar: professional.avatar
    };

    cart.push(cartItem);
    localStorage.setItem('tevp-cart', JSON.stringify(cart));
    updateCartCount();
    
    // Animación y notificación
    showAlert(`${professional.nombre} añadido al carrito`, 'success');
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.animation = 'bounce 0.6s ease';
        setTimeout(() => {
            cartIcon.style.animation = '';
        }, 600);
    }
}

// Actualizar contador del carrito
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Cargar modal del carrito
function loadCartModal() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h5>Tu carrito está vacío</h5>
                <p class="text-muted">Agrega algunos servicios profesionales</p>
            </div>
        `;
        cartTotal.textContent = '$0';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.precio * item.cantidad;
        total += itemTotal;
        
        html += `
            <div class="cart-item">
                <div class="row align-items-center">
                    <div class="col-2">
                        <img src="${item.avatar}" class="rounded-circle" alt="${item.professionalName}">
                    </div>
                    <div class="col-6">
                        <h6 class="mb-1">${item.professionalName}</h6>
                        <small class="text-muted">${item.especialidad} - ${item.serviceType}</small>
                    </div>
                    <div class="col-2">
                        <span class="fw-bold">${formatPrice(itemTotal)}</span>
                    </div>
                    <div class="col-2">
                        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    cartItems.innerHTML = html;
    
    // Calcular IVA
    const iva = total * 0.19;
    const totalWithIVA = total + iva;
    
    cartTotal.innerHTML = `
        <div class="text-end">
            <div>Subtotal: ${formatPrice(total)}</div>
            <div>IVA (19%): ${formatPrice(iva)}</div>
            <div class="fw-bold">Total: ${formatPrice(totalWithIVA)}</div>
        </div>
    `;
}

// Eliminar del carrito
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('tevp-cart', JSON.stringify(cart));
    updateCartCount();
    loadCartModal();
    showAlert('Servicio eliminado del carrito', 'info');
}

// Función para actualizar navbar según estado de sesión
function updateNavbar() {
    // Esta función se mantiene igual que antes
    const navbarNav = document.querySelector('#navbarNav .navbar-nav:last-child');
    if (!navbarNav) return;

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    if (isLoggedIn && userName) {
        navbarNav.innerHTML = `
            <li class="nav-item me-3">
                <a href="#" class="cart-icon" data-bs-toggle="modal" data-bs-target="#cartModal" onclick="loadCartModal()">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="cart-count">0</span>
                </a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                    <i class="fas fa-user me-2"></i>${userName}
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#"><i class="fas fa-user me-2"></i>Mi Perfil</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fas fa-history me-2"></i>Mis Servicios</a></li>
                    ${userRole === 'admin' || userRole === 'vendedor' ? 
                        '<li><hr class="dropdown-divider"></li><li><a class="dropdown-item" href="admin/home.html"><i class="fas fa-cog me-2"></i>Panel Admin</a></li>' : ''}
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Cerrar Sesión</a></li>
                </ul>
            </li>
        `;
    }
}

// Resto de funciones (mantener las existentes y agregar las específicas para servicios)

// Funciones de autenticación
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    showAlert('Sesión cerrada exitosamente', 'info');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Función para autenticar usuario
function authenticateUser(email, password) {
    // Credenciales de administrador
    if (email === 'admin@tevp.cl' && password === 'admin123') {
        loginSuccess({
            email: email,
            role: 'admin',
            name: 'Administrador TEVP'
        }, 'admin/home.html');
        return;
    }
    
    // Credenciales de vendedor
    if (email === 'vendedor@tevp.cl' && password === 'vend123') {
        loginSuccess({
            email: email,
            role: 'vendedor',
            name: 'Vendedor TEVP'
        }, 'admin/home.html');
        return;
    }
    
    // Simulación de usuarios registrados
    const registeredUsers = JSON.parse(localStorage.getItem('tevp-registered-users') || '[]');
    const user = registeredUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        loginSuccess({
            email: user.email,
            role: 'cliente',
            name: user.nombre
        }, 'index.html');
        return;
    }
    
    // Crear usuario automáticamente para propósitos de demostración
    if (email.includes('@') && password.length >= 4) {
        const newUser = {
            email: email,
            password: password,
            nombre: email.split('@')[0],
            role: 'cliente'
        };
        
        registeredUsers.push(newUser);
        localStorage.setItem('tevp-registered-users', JSON.stringify(registeredUsers));
        
        loginSuccess({
            email: newUser.email,
            role: 'cliente',
            name: newUser.nombre
        }, 'index.html');
        return;
    }
    
    // Credenciales incorrectas
    showLoginSpinner(false);
    showAlert('Credenciales incorrectas. Verifica tu email y contraseña.', 'error');
}

// Función para manejar login exitoso
function loginSuccess(userData, redirectUrl) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userEmail', userData.email);
    
    showLoginSpinner(false);
    
    const roleText = userData.role === 'admin' ? 'Administrador' : 
                     userData.role === 'vendedor' ? 'Vendedor' : 'Cliente';
    
    showAlert(`¡Bienvenido ${roleText}!`, 'success');
    
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 1500);
}

// Funciones para mostrar alertas
function showAlert(message, type = 'info', duration = 5000) {
    const alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    alertContainer.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 500px;
    `;
    
    alertContainer.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertContainer);
    
    // Auto-remover después del tiempo especificado
    setTimeout(() => {
        if (alertContainer.parentNode) {
            alertContainer.remove();
        }
    }, duration);
}

// Funciones para mejorar formularios
function enhanceLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    // Configurar validación en tiempo real
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
        emailInput.addEventListener('input', clearFieldError);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', validatePassword);
        passwordInput.addEventListener('input', clearFieldError);
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Limpiar errores previos
        clearAllErrors();
        
        // Validar campos
        let hasErrors = false;
        
        if (!validateEmail()) hasErrors = true;
        if (!validatePassword()) hasErrors = true;
        
        if (hasErrors) {
            showAlert('Por favor, corrige los errores en el formulario', 'warning');
            return;
        }
        
        // Mostrar spinner de carga
        showLoginSpinner(true);
        
        // Simular delay de autenticación
        setTimeout(() => {
            authenticateUser(email, password);
        }, 1000);
    });
}

// Función de validación de email
function validateEmail() {
    const emailInput = document.getElementById('email');
    if (!emailInput) return true;
    
    const email = emailInput.value.trim();
    
    // Limpiar error previo
    clearFieldError(emailInput);
    
    if (!email) {
        showFieldError(emailInput, 'El email es obligatorio');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFieldError(emailInput, 'Formato de email inválido');
        return false;
    }
    
    const allowedDomains = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com', 'tevp.cl'];
    const domain = email.split('@')[1];
    if (!allowedDomains.includes(domain)) {
        showFieldError(emailInput, 'Solo se permiten dominios: @duoc.cl, @profesor.duoc.cl, @gmail.com, @tevp.cl');
        return false;
    }
    
    showFieldSuccess(emailInput);
    return true;
}

// Función de validación de contraseña
function validatePassword() {
    const passwordInput = document.getElementById('password');
    if (!passwordInput) return true;
    
    const password = passwordInput.value;
    
    // Limpiar error previo
    clearFieldError(passwordInput);
    
    if (!password) {
        showFieldError(passwordInput, 'La contraseña es obligatoria');
        return false;
    }
    
    if (password.length < 4) {
        showFieldError(passwordInput, 'La contraseña debe tener al menos 4 caracteres');
        return false;
    }
    
    if (password.length > 10) {
        showFieldError(passwordInput, 'La contraseña no puede tener más de 10 caracteres');
        return false;
    }
    
    showFieldSuccess(passwordInput);
    return true;
}

// Funciones auxiliares para manejo de errores en campos
function showFieldError(input, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    
    let errorDiv = input.parentNode.parentNode.querySelector('.invalid-feedback');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        input.parentNode.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

function showFieldSuccess(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    
    const errorDiv = input.parentNode.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function clearFieldError(input) {
    if (typeof input === 'object') {
        input.classList.remove('is-invalid', 'is-valid');
        const errorDiv = input.parentNode.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) errorDiv.remove();
    } else {
        // Si se llama como event listener
        this.classList.remove('is-invalid', 'is-valid');
        const errorDiv = this.parentNode.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) errorDiv.remove();
    }
}

function clearAllErrors() {
    document.querySelectorAll('.is-invalid, .is-valid').forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });
    document.querySelectorAll('.invalid-feedback').forEach(error => {
        error.remove();
    });
}

function showLoginSpinner(show) {
    const submitBtn = document.querySelector('#login-form button[type="submit"]');
    if (!submitBtn) return;
    
    if (show) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Verificando...';
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Iniciar Sesión';
    }
}

// Función para mostrar/ocultar contraseña
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('togglePasswordIcon');
    
    if (!passwordInput || !toggleIcon) return;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Función para mostrar modal de recuperación de contraseña
function showPasswordRecovery() {
    showAlert(`
        <div class="text-start">
            <h5><i class="fas fa-key me-2 text-primary"></i>Recuperar Contraseña</h5>
            <p>Para recuperar tu contraseña, puedes usar las siguientes opciones:</p>
            <ul>
                <li><strong>Estudiantes:</strong> Contacta al soporte técnico de DUOC UC</li>
                <li><strong>Profesores:</strong> Usa las credenciales institucionales</li>
                <li><strong>Clientes:</strong> Puedes registrarte nuevamente con el mismo email</li>
            </ul>
            <p class="text-muted small">
                <i class="fas fa-info-circle me-1"></i>
                En un entorno real, aquí se enviaría un link de recuperación al email.
            </p>
        </div>
    `, 'info', 8000);
}

// Funciones de inicialización de páginas
function initLoginPage() {
    console.log('Iniciando página de login');
}

function initRegisterPage() {
    console.log('Iniciando página de registro');
}

function enhanceRegisterForm() {
    // Implementar validaciones de registro
    console.log('Mejorando formulario de registro');
}

function initContactPage() {
    console.log('Iniciando página de contacto');
}

function enhanceContactForm() {
    // Implementar validaciones de contacto
    console.log('Mejorando formulario de contacto');
}

function initAboutPage() {
    console.log('Iniciando página acerca de');
}

// Función para inicializar página de detalle de servicio
function initServiceDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');
    const categoria = urlParams.get('categoria');
    
    if (categoria) {
        loadProfessionalsByCategory(categoria);
    } else if (serviceId) {
        loadServiceDetails(parseInt(serviceId));
    }
}

// Función para cargar profesionales por categoría
function loadProfessionalsByCategory(categoria) {
    const professionalsByCategory = professionals.filter(p => p.especialidad === categoria);
    
    if (professionalsByCategory.length === 0) {
        showAlert('No se encontraron profesionales en esta categoría', 'warning');
        return;
    }
    
    // Si estamos en productos.html, mostrar los profesionales ahí
    displayProfessionals(professionalsByCategory);
}

// Función para mostrar lista de profesionales
function displayProfessionals(professionalList) {
    const container = document.getElementById('productos-lista');
    if (!container) return;
    
    container.innerHTML = '';
    
    professionalList.forEach(professional => {
        const professionalCard = createProfessionalCard(professional);
        container.appendChild(professionalCard);
    });
}

// Función para crear tarjeta de profesional
function createProfessionalCard(professional) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';
    
    const stars = '★'.repeat(Math.floor(professional.calificacion)) + '☆'.repeat(5 - Math.floor(professional.calificacion));
    
    col.innerHTML = `
        <div class="card professional-card h-100">
            <div class="card-header text-center">
                <img src="${professional.avatar}" class="rounded-circle mb-2" width="80" height="80" alt="${professional.nombre}">
                <h5 class="card-title mb-1">${professional.nombre}</h5>
                <span class="badge bg-primary">${professional.especialidad}</span>
            </div>
            <div class="card-body">
                <div class="row text-center mb-3">
                    <div class="col-4">
                        <small class="text-muted d-block">Calificación</small>
                        <span class="text-warning">${stars}</span><br>
                        <small>${professional.calificacion}/5 (${professional.totalReseñas})</small>
                    </div>
                    <div class="col-4">
                        <small class="text-muted d-block">Experiencia</small>
                        <strong>${professional.experiencia} años</strong>
                    </div>
                    <div class="col-4">
                        <small class="text-muted d-block">Precio/hora</small>
                        <strong>${formatPrice(professional.tarifaPorHora)}</strong>
                    </div>
                </div>
                
                <h6>Servicios:</h6>
                <ul class="list-unstyled">
                    ${professional.servicios.map(s => `<li><i class="fas fa-check text-success me-1"></i>${s}</li>`).join('')}
                </ul>
                
                <div class="mb-2">
                    <small class="text-muted">${professional.certificado}</small>
                </div>
                
                <div class="mb-2">
                    <i class="fas fa-clock me-1 text-muted"></i>
                    <small>${professional.disponibilidad}</small>
                </div>
            </div>
            <div class="card-footer">
                <button class="btn btn-primary w-100 mb-2" onclick="viewProfessionalDetail(${professional.id})">
                    <i class="fas fa-info-circle me-1"></i>Ver Detalles
                </button>
                <button class="btn btn-outline-success w-100" onclick="addToCart(${professional.id}, 'Consulta')">
                    <i class="fas fa-calendar-plus me-1"></i>Solicitar Servicio
                </button>
            </div>
        </div>
    `;
    
    return col;
}

// Función para ver detalle completo del profesional
function viewProfessionalDetail(professionalId) {
    const professional = professionals.find(p => p.id === professionalId);
    if (!professional) return;
    
    // Crear modal con información detallada
    const modalHtml = `
        <div class="modal fade" id="professionalDetailModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <img src="${professional.avatar}" class="rounded-circle me-3" width="60" height="60" alt="${professional.nombre}">
                            <div>
                                <h5 class="modal-title mb-0">${professional.nombre}</h5>
                                <span class="badge bg-primary">${professional.especialidad}</span>
                            </div>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Información Profesional</h6>
                                <p><strong>Experiencia:</strong> ${professional.experiencia} años</p>
                                <p><strong>Certificado:</strong> ${professional.certificado}</p>
                                <p><strong>Tareas Realizadas:</strong> ${professional.tareasRealizadas}</p>
                                <p><strong>Disponibilidad:</strong> ${professional.disponibilidad}</p>
                                
                                <h6 class="mt-3">Biografía</h6>
                                <p>${professional.biografia}</p>
                            </div>
                            <div class="col-md-6">
                                <h6>Servicios Ofrecidos</h6>
                                <ul>
                                    ${professional.servicios.map(s => `<li>${s}</li>`).join('')}
                                </ul>
                                
                                <h6 class="mt-3">Precios Aproximados</h6>
                                <div class="list-group">
                                    ${Object.entries(professional.preciosAprox).map(([servicio, precio]) => 
                                        `<div class="list-group-item d-flex justify-content-between">
                                            <span>${servicio}</span>
                                            <strong>${precio}</strong>
                                        </div>`
                                    ).join('')}
                                </div>
                            </div>
                        </div>
                        
                        <hr>
                        
                        <h6>Reseñas de Clientes</h6>
                        ${professional.reseñas && professional.reseñas.length > 0 ? 
                            professional.reseñas.map(review => `
                                <div class="border rounded p-3 mb-2">
                                    <div class="d-flex justify-content-between">
                                        <strong>${review.cliente}</strong>
                                        <span class="text-warning">${'★'.repeat(review.calificacion)}${'☆'.repeat(5-review.calificacion)}</span>
                                    </div>
                                    <p class="mb-0 mt-1">${review.comentario}</p>
                                </div>
                            `).join('') :
                            '<p class="text-muted">No hay reseñas disponibles</p>'
                        }
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" onclick="addToCart(${professional.id}, 'Consulta profesional')" data-bs-dismiss="modal">
                            <i class="fas fa-calendar-plus me-1"></i>Solicitar Servicio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal anterior si existe
    const existingModal = document.getElementById('professionalDetailModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar modal al DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('professionalDetailModal'));
    modal.show();
}