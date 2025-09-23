// ===== VARIABLES GLOBALES =====
let services = [];
let professionals = [];
let cart = []; // Iniciar vacío
let currentUser = JSON.parse(localStorage.getItem('tevp-currentUser')) || null;

// Limpiar carrito al cargar la página
localStorage.removeItem('tevp-cart');

// Hacer las variables accesibles globalmente
window.services = services;
window.professionals = professionals;
window.cart = cart;

// ===== DATOS INICIALES =====

// Categorías de servicios disponibles
const serviceCategories = [
    { id: 1, nombre: "Plomería", icono: "fas fa-wrench", color: "primary" },
    { id: 2, nombre: "Electricidad", icono: "fas fa-bolt", color: "warning" },
    { id: 3, nombre: "Climatización", icono: "fas fa-snowflake", color: "info" },
    { id: 4, nombre: "Construcción", icono: "fas fa-hard-hat", color: "secondary" },
    { id: 5, nombre: "Soldadura", icono: "fas fa-fire-flame-curved", color: "danger" },
    { id: 6, nombre: "Pintura", icono: "fas fa-paint-roller", color: "success" },
    { id: 7, nombre: "Jardinería", icono: "fas fa-seedling", color: "success" },
    { id: 8, nombre: "Limpieza", icono: "fas fa-broom", color: "info" },
    { id: 9, nombre: "Seguridad", icono: "fas fa-shield-alt", color: "dark" },
    { id: 10, nombre: "Electrodomésticos", icono: "fas fa-tv", color: "primary" },
    { id: 11, nombre: "Carpintería", icono: "fas fa-hammer", color: "dark" },
    { id: 12, nombre: "Cerrajería", icono: "fas fa-key", color: "warning" },
    { id: 13, nombre: "Gasfitería", icono: "fas fa-fire", color: "danger" },
    { id: 14, nombre: "Refrigeración", icono: "fas fa-temperature-low", color: "primary" },
    { id: 15, nombre: "Calefón y Calderas", icono: "fas fa-water", color: "info" },
    { id: 16, nombre: "Contadores", icono: "fas fa-tachometer-alt", color: "secondary" }
];

// Profesionales expandidos (10+ por categoría)
const initialProfessionals = [
    // ===== PLOMERÍA (10 profesionales) =====
    {
        id: 1,
        nombre: "Carlos Mendoza Rivera",
        especialidad: "Plomería",
        experiencia: 8,
        calificacion: 4.8,
        totalReseñas: 156,
        tarifaPorHora: 32000,
        avatar: "https://randomuser.me/api/portraits/men/12.jpg",
        certificado: "Técnico en Instalaciones Sanitarias DUOC UC, Certificación SEC",
        biografia: "Técnico especializado en sistemas hidráulicos residenciales e industriales con 8 años de experiencia. Experto en reparaciones complejas, instalaciones nuevas y sistemas de alta presión.",
        servicios: ["Reparación filtraciones", "Cambio de cañerías", "Instalación sanitarios", "Sistemas de riego"],
        tareasRealizadas: 342,
        disponibilidad: "Lun-Vie 8:00-18:00, Sáb 9:00-14:00",
        preciosAprox: {
            "Reparación básica": "$25.000 - $35.000",
            "Cambio de cañería": "$45.000 - $80.000",
            "Instalación completa": "$120.000 - $200.000"
        },
        reseñas: [
            { cliente: "María S.", comentario: "Excelente trabajo, muy profesional y limpio", calificacion: 5 },
            { cliente: "Juan P.", comentario: "Rápido y eficiente, solucionó todo en una visita", calificacion: 5 }
        ]
    },
    {
        id: 2,
        nombre: "Miguel Torres Sánchez",
        especialidad: "Plomería",
        experiencia: 12,
        calificacion: 4.9,
        totalReseñas: 203,
        tarifaPorHora: 38000,
        avatar: "https://randomuser.me/api/portraits/men/25.jpg",
        certificado: "Maestro Plomero Certificado SEC, Especialista en Calefacción",
        biografia: "Maestro plomero con más de 12 años de experiencia en proyectos residenciales y comerciales. Especialista en sistemas de calefacción central y emergencias 24/7.",
        servicios: ["Sistemas calefacción", "Agua caliente", "Emergencias 24/7", "Proyectos comerciales"],
        tareasRealizadas: 567,
        disponibilidad: "24/7 Emergencias",
        preciosAprox: {
            "Emergencia nocturna": "$50.000 - $70.000",
            "Sistema calefacción": "$200.000 - $400.000",
            "Mantención preventiva": "$30.000 - $45.000"
        },
        reseñas: [
            { cliente: "Pedro R.", comentario: "Solucionó mi emergencia a las 2AM, excelente servicio", calificacion: 5 },
            { cliente: "Carmen L.", comentario: "Muy profesional y confiable, lo llamo siempre", calificacion: 5 }
        ]
    },
    {
        id: 3,
        nombre: "Roberto Silva Morales",
        especialidad: "Plomería",
        experiencia: 6,
        calificacion: 4.6,
        totalReseñas: 89,
        tarifaPorHora: 28000,
        avatar: "https://randomuser.me/api/portraits/men/44.jpg",
        certificado: "Técnico en Gasfitería CFT, Curso SENCE Actualizado",
        biografia: "Técnico joven y dinámico, especializado en reparaciones rápidas y eficientes. Excelente atención al cliente y precios competitivos.",
        servicios: ["Destapes", "Llaves de paso", "Mantención general", "Instalaciones menores"],
        tareasRealizadas: 178,
        disponibilidad: "Lun-Sáb 9:00-19:00",
        preciosAprox: {
            "Destape cañería": "$20.000 - $40.000",
            "Cambio llave": "$15.000 - $25.000",
            "Visita técnica": "$12.000"
        },
        reseñas: [
            { cliente: "Luis C.", comentario: "Muy buen precio y rápido en la solución", calificacion: 4 },
            { cliente: "Elena V.", comentario: "Joven pero muy competente y responsable", calificacion: 5 }
        ]
    },
    {
        id: 4,
        nombre: "Juan Pérez Contreras",
        especialidad: "Plomería",
        experiencia: 15,
        calificacion: 4.9,
        totalReseñas: 287,
        tarifaPorHora: 42000,
        avatar: "https://randomuser.me/api/portraits/men/55.jpg",
        certificado: "Maestro Mayor Plomero, Instructor DUOC UC, Certificación Internacional",
        biografia: "Maestro plomero con 15 años de experiencia y más de 500 proyectos completados. Instructor en DUOC UC y consultor técnico.",
        servicios: ["Proyectos complejos", "Edificios", "Consultorías técnicas", "Supervisión obras"],
        tareasRealizadas: 523,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Consultoría técnica": "$60.000 - $80.000",
            "Proyecto edificio": "$500.000+",
            "Supervisión obra": "$100.000/día"
        },
        reseñas: [
            { cliente: "Constructora ABC", comentario: "Profesional de primera, maneja proyectos grandes", calificacion: 5 },
            { cliente: "Rodrigo M.", comentario: "Solucionó un problema que nadie más pudo", calificacion: 5 }
        ]
    },
    {
        id: 5,
        nombre: "Francisco Herrera Lagos",
        especialidad: "Plomería",
        experiencia: 9,
        calificacion: 4.7,
        totalReseñas: 134,
        tarifaPorHora: 35000,
        avatar: "https://randomuser.me/api/portraits/women/23.jpg",
        certificado: "Técnico Plomero Especialista, Certificación en Piscinas y Spas",
        biografia: "Especialista en sistemas de piscinas, spas y sistemas de agua especializados. 9 años de experiencia en proyectos residenciales exclusivos.",
        servicios: ["Piscinas y spas", "Sistemas de bombeo", "Automatización", "Equipos importados"],
        tareasRealizadas: 245,
        disponibilidad: "Lun-Vie 9:00-18:00, Sáb morning",
        preciosAprox: {
            "Mantención piscina": "$45.000 - $65.000",
            "Reparación bomba": "$35.000 - $80.000",
            "Instalación spa": "$200.000 - $350.000"
        },
        reseñas: [
            { cliente: "Villa del Mar", comentario: "Experto en piscinas, muy recomendable", calificacion: 5 },
            { cliente: "Gonzalo T.", comentario: "Arregló mi spa cuando nadie más pudo", calificacion: 4 }
        ]
    },
    {
        id: 6,
        nombre: "Andrés Vásquez Ruiz",
        especialidad: "Plomería",
        experiencia: 7,
        calificacion: 4.5,
        totalReseñas: 98,
        tarifaPorHora: 30000,
        avatar: "https://randomuser.me/api/portraits/women/37.jpg",
        certificado: "Plomero Residencial, Especialista Cocinas y Baños",
        biografia: "Plomero especializado en remodelaciones de cocinas y baños. Experiencia en proyectos residenciales con enfoque en diseño y funcionalidad.",
        servicios: ["Remodelación baños", "Cocinas", "Grifería premium", "Instalaciones modernas"],
        tareasRealizadas: 189,
        disponibilidad: "Lun-Vie 8:30-17:30",
        preciosAprox: {
            "Remodelación baño": "$150.000 - $300.000",
            "Instalación cocina": "$100.000 - $250.000",
            "Grifería premium": "$80.000 - $150.000"
        },
        reseñas: [
            { cliente: "Casa Moderna", comentario: "Remodelación de baño espectacular", calificacion: 5 },
            { cliente: "Departamento Centro", comentario: "Muy prolijo y ordenado", calificacion: 4 }
        ]
    },
    {
        id: 7,
        nombre: "Patricio Moreno Castro",
        especialidad: "Plomería",
        experiencia: 11,
        calificacion: 4.8,
        totalReseñas: 167,
        tarifaPorHora: 36000,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        certificado: "Plomero Industrial, Especialista Sistemas Presión",
        biografia: "Plomero industrial con experiencia en sistemas de alta presión, plantas industriales y edificios comerciales.",
        servicios: ["Plomería industrial", "Alta presión", "Edificios comerciales", "Sistemas complejos"],
        tareasRealizadas: 298,
        disponibilidad: "Lun-Vie 7:00-16:00",
        preciosAprox: {
            "Sistema industrial": "$300.000 - $800.000",
            "Alta presión": "$200.000 - $500.000",
            "Edificio comercial": "$400.000+"
        },
        reseñas: [
            { cliente: "Fábrica Sur", comentario: "Maneja muy bien sistemas industriales", calificacion: 5 },
            { cliente: "Edificio Corporativo", comentario: "Profesional serio y competente", calificacion: 5 }
        ]
    },
    {
        id: 8,
        nombre: "Eduardo Sáez González",
        especialidad: "Plomería",
        experiencia: 5,
        calificacion: 4.4,
        totalReseñas: 76,
        tarifaPorHora: 26000,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        certificado: "Técnico Plomero CFT, Especialista Mantención",
        biografia: "Técnico joven especializado en mantención preventiva y reparaciones económicas. Enfoque en soluciones duraderas a precios justos.",
        servicios: ["Mantención preventiva", "Reparaciones económicas", "Servicio residencial", "Emergencias básicas"],
        tareasRealizadas: 123,
        disponibilidad: "Lun-Sáb 9:00-18:00",
        preciosAprox: {
            "Mantención anual": "$80.000 - $150.000",
            "Reparación económica": "$20.000 - $50.000",
            "Servicio básico": "$25.000 - $60.000"
        },
        reseñas: [
            { cliente: "Familia López", comentario: "Muy honesto y precios justos", calificacion: 4 },
            { cliente: "Condominio Norte", comentario: "Buen servicio de mantención", calificacion: 4 }
        ]
    },
    {
        id: 9,
        nombre: "Gabriel Contreras Díaz",
        especialidad: "Plomería",
        experiencia: 13,
        calificacion: 4.9,
        totalReseñas: 201,
        tarifaPorHora: 39000,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        certificado: "Maestro Plomero, Especialista Agua Potable, Consultor",
        biografia: "Maestro plomero especialista en sistemas de agua potable, redes de distribución y proyectos de gran envergadura. Consultor técnico reconocido.",
        servicios: ["Agua potable", "Redes distribución", "Proyectos grandes", "Consultorías especializadas"],
        tareasRealizadas: 445,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Red agua potable": "$500.000+",
            "Proyecto grande": "$800.000+",
            "Consultoría": "$100.000 - $150.000"
        },
        reseñas: [
            { cliente: "Municipalidad", comentario: "Excelente consultor técnico", calificacion: 5 },
            { cliente: "Inmobiliaria", comentario: "Maneja proyectos complejos perfectamente", calificacion: 5 }
        ]
    },
    {
        id: 10,
        nombre: "Rodrigo Herrera Soto",
        especialidad: "Plomería",
        experiencia: 10,
        calificacion: 4.7,
        totalReseñas: 156,
        tarifaPorHora: 34000,
        avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
        certificado: "Plomero Especialista, Técnico Soldadura, Reparador Avanzado",
        biografia: "Plomero con 10 años de experiencia especializado en soldadura de cañerías, reparaciones complejas y instalaciones especiales.",
        servicios: ["Soldadura cañerías", "Reparaciones complejas", "Instalaciones especiales", "Trabajo en cobre"],
        tareasRealizadas: 278,
        disponibilidad: "Lun-Vie 8:00-17:00, Emergencias",
        preciosAprox: {
            "Soldadura especializada": "$60.000 - $120.000",
            "Reparación compleja": "$80.000 - $200.000",
            "Instalación especial": "$150.000 - $350.000"
        },
        reseñas: [
            { cliente: "Restaurante Gourmet", comentario: "Excelente soldador, trabajo perfecto", calificacion: 5 },
            { cliente: "Casa Antigua", comentario: "Reparó cañerías muy complejas", calificacion: 4 }
        ]
    },

    // ===== ELECTRICIDAD (10 profesionales) =====
    {
        id: 11,
        nombre: "José Luis Ramírez",
        especialidad: "Electricidad",
        experiencia: 10,
        calificacion: 4.8,
        totalReseñas: 178,
        tarifaPorHora: 35000,
        avatar: "https://randomuser.me/api/portraits/men/71.jpg",
        certificado: "Electricista Autorizado SEC Clase A, Especialista Domiciliaria",
        biografia: "Electricista certificado con 10 años de experiencia en instalaciones domiciliarias y comerciales. Especialista en automatización del hogar e iluminación LED.",
        servicios: ["Instalaciones domiciliarias", "Automatización hogar", "Iluminación LED", "Sistemas inteligentes"],
        tareasRealizadas: 412,
        disponibilidad: "Lun-Vie 8:00-18:00, Sáb mañana",
        preciosAprox: {
            "Instalación completa": "$150.000 - $300.000",
            "Automatización": "$200.000 - $500.000",
            "Iluminación LED": "$80.000 - $150.000"
        },
        reseñas: [
            { cliente: "Familia Rodríguez", comentario: "Excelente trabajo, casa moderna ahora", calificacion: 5 },
            { cliente: "Pablo M.", comentario: "Profesional serio y muy capaz", calificacion: 5 }
        ]
    },
    {
        id: 12,
        nombre: "Andrea Muñoz Silva",
        especialidad: "Electricidad",
        experiencia: 8,
        calificacion: 4.9,
        totalReseñas: 156,
        tarifaPorHora: 33000,
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c6e19067?w=150&h=150&fit=crop&crop=face",
        certificado: "Electricista Industrial DUOC UC, Especialista Motores",
        biografia: "Electricista industrial con 8 años de experiencia en motores, tableros y sistemas de potencia. Amplio reconocimiento por su profesionalismo.",
        servicios: ["Motores industriales", "Tableros eléctricos", "Sistemas potencia", "Mantención industrial"],
        tareasRealizadas: 267,
        disponibilidad: "Lun-Vie 7:00-16:00",
        preciosAprox: {
            "Tablero eléctrico": "$200.000 - $400.000",
            "Motor industrial": "$150.000 - $350.000",
            "Mantención": "$80.000 - $120.000"
        },
        reseñas: [
            { cliente: "Fábrica Metal", comentario: "Muy profesional, sabe mucho", calificacion: 5 },
            { cliente: "Taller Mecánico", comentario: "Solucionó problema complejo rápido", calificacion: 5 }
        ]
    },
    {
        id: 13,
        nombre: "Ricardo Fernández López",
        especialidad: "Electricidad",
        experiencia: 14,
        calificacion: 4.9,
        totalReseñas: 234,
        tarifaPorHora: 40000,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        certificado: "Maestro Electricista SEC, Especialista Alta Tensión, Instructor",
        biografia: "Maestro electricista con 14 años de experiencia en alta y baja tensión. Instructor técnico y consultor en proyectos eléctricos complejos.",
        servicios: ["Alta tensión", "Proyectos complejos", "Edificios comerciales", "Consultorías"],
        tareasRealizadas: 567,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Proyecto edificio": "$800.000+",
            "Alta tensión": "$300.000 - $600.000",
            "Consultoría": "$100.000 - $150.000"
        },
        reseñas: [
            { cliente: "Constructora Prime", comentario: "El mejor electricista que hemos contratado", calificacion: 5 },
            { cliente: "Centro Comercial", comentario: "Maneja proyectos grandes perfectamente", calificacion: 5 }
        ]
    },
    // ===== CLIMATIZACIÓN (5 profesionales) =====
    {
        id: 14,
        nombre: "Diego Castillo Vega",
        especialidad: "Climatización",
        experiencia: 9,
        calificacion: 4.7,
        totalReseñas: 134,
        tarifaPorHora: 35000,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        certificado: "Técnico en Refrigeración y Climatización, Certificación HVAC",
        biografia: "Especialista en sistemas HVAC con experiencia en instalación, mantenimiento y reparación de equipos de climatización residencial y comercial.",
        servicios: ["Aire acondicionado", "Calefacción central", "Mantención HVAC", "Split residencial"],
        tareasRealizadas: 287,
        disponibilidad: "Lun-Vie 8:00-17:00, Sáb 9:00-13:00",
        preciosAprox: {
            "Instalación split": "$80.000 - $120.000",
            "Mantención aire": "$25.000 - $40.000",
            "Reparación general": "$30.000 - $60.000"
        },
        reseñas: [
            { cliente: "Casa Las Condes", comentario: "Instaló mi aire acondicionado perfecto", calificacion: 5 },
            { cliente: "Oficina Centro", comentario: "Muy profesional y ordenado", calificacion: 4 }
        ]
    },
    {
        id: 15,
        nombre: "Patricia Muñoz Ríos",
        especialidad: "Climatización",
        experiencia: 11,
        calificacion: 4.8,
        totalReseñas: 189,
        tarifaPorHora: 38000,
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        certificado: "Ingeniera en Refrigeración, Especialista Sistemas Industriales",
        biografia: "Ingeniera especializada en sistemas de climatización industrial y comercial. Experta en eficiencia energética y sistemas automatizados.",
        servicios: ["HVAC industrial", "Automatización", "Eficiencia energética", "Proyectos comerciales"],
        tareasRealizadas: 456,
        disponibilidad: "Lun-Vie 8:30-18:00",
        preciosAprox: {
            "Proyecto comercial": "$200.000 - $500.000",
            "Sistema industrial": "$300.000 - $800.000",
            "Consultoría": "$80.000 - $120.000"
        },
        reseñas: [
            { cliente: "Mall Plaza", comentario: "Excelente trabajo en nuestro centro comercial", calificacion: 5 },
            { cliente: "Empresa Logística", comentario: "Muy técnica y profesional", calificacion: 5 }
        ]
    },
    {
        id: 16,
        nombre: "Andrés Herrera Cruz",
        especialidad: "Climatización",
        experiencia: 7,
        calificacion: 4.5,
        totalReseñas: 98,
        tarifaPorHora: 32000,
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        certificado: "Técnico Climatización Residencial, Curso Splits Inverter",
        biografia: "Técnico especializado en climatización residencial, con gran experiencia en instalación y reparación de equipos split y sistemas de calefacción.",
        servicios: ["Split inverter", "Calefacción gas", "Mantención residencial", "Reparaciones urgentes"],
        tareasRealizadas: 245,
        disponibilidad: "Lun-Sáb 9:00-18:00",
        preciosAprox: {
            "Instalación split": "$70.000 - $100.000",
            "Reparación split": "$25.000 - $50.000",
            "Mantención anual": "$35.000 - $50.000"
        },
        reseñas: [
            { cliente: "Departamento Providencia", comentario: "Rápido y eficiente", calificacion: 4 },
            { cliente: "Casa Ñuñoa", comentario: "Buen precio y calidad", calificacion: 5 }
        ]
    },

    // ===== CONSTRUCCIÓN (6 profesionales) =====
    {
        id: 17,
        nombre: "Ricardo Silva Morales",
        especialidad: "Construcción",
        experiencia: 15,
        calificacion: 4.9,
        totalReseñas: 134,
        tarifaPorHora: 45000,
        avatar: "https://randomuser.me/api/portraits/men/20.jpg",
        certificado: "Maestro Constructor, Prevención de Riesgos",
        biografia: "Maestro constructor con 15 años construyendo proyectos residenciales y comerciales.",
        servicios: ["Obra gruesa", "Albañilería", "Fundaciones", "Proyectos complejos"],
        tareasRealizadas: 89,
        disponibilidad: "Lun-Vie 7:00-17:00",
        preciosAprox: {
            "Obra gruesa": "$2.500.000+",
            "Albañilería": "$15.000/m²",
            "Fundaciones": "$1.200.000+"
        },
        reseñas: [
            { cliente: "Casa Maipú", comentario: "Excelente calidad de construcción", calificacion: 5 },
            { cliente: "Pedro M.", comentario: "Muy profesional y cumplidor", calificacion: 5 }
        ]
    },
    {
        id: 18,
        nombre: "Manuel Rodríguez Pérez",
        especialidad: "Construcción",
        experiencia: 12,
        calificacion: 4.7,
        totalReseñas: 98,
        tarifaPorHora: 42000,
        avatar: "https://randomuser.me/api/portraits/men/33.jpg",
        certificado: "Constructor Civil, Especialista en Remodelaciones",
        biografia: "Constructor especializado en remodelaciones y ampliaciones de viviendas.",
        servicios: ["Remodelaciones", "Ampliaciones", "Terminaciones", "Restauraciones"],
        tareasRealizadas: 156,
        disponibilidad: "Lun-Sáb 8:00-18:00",
        preciosAprox: {
            "Remodelación": "$800.000 - $3.000.000",
            "Ampliación": "$1.500.000+",
            "Terminaciones": "$500.000+"
        },
        reseñas: [
            { cliente: "Remodelación Providencia", comentario: "Transformó nuestra casa", calificacion: 5 },
            { cliente: "Ana G.", comentario: "Muy buena terminación", calificacion: 4 }
        ]
    },
    {
        id: 19,
        nombre: "Jorge Hernández Castro",
        especialidad: "Construcción",
        experiencia: 8,
        calificacion: 4.6,
        totalReseñas: 67,
        tarifaPorHora: 38000,
        avatar: "https://randomuser.me/api/portraits/men/54.jpg",
        certificado: "Técnico Constructor, Especialista Estructuras",
        biografia: "Técnico constructor especializado en estructuras metálicas y hormigón.",
        servicios: ["Estructuras metálicas", "Hormigón armado", "Techos", "Escaleras"],
        tareasRealizadas: 124,
        disponibilidad: "Lun-Vie 7:30-16:30",
        preciosAprox: {
            "Estructura metálica": "$800.000+",
            "Losa hormigón": "$1.200.000+",
            "Escalera": "$600.000+"
        },
        reseñas: [
            { cliente: "Casa Las Condes", comentario: "Excelente trabajo en estructura", calificacion: 5 },
            { cliente: "Bodega Industrial", comentario: "Muy técnico y preciso", calificacion: 4 }
        ]
    },
    {
        id: 20,
        nombre: "Carlos Muñoz Vargas",
        especialidad: "Construcción",
        experiencia: 10,
        calificacion: 4.8,
        totalReseñas: 112,
        tarifaPorHora: 40000,
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
        certificado: "Constructor, Especialista Viviendas Sociales",
        biografia: "Constructor con experiencia en viviendas sociales y proyectos habitacionales.",
        servicios: ["Viviendas sociales", "Proyectos habitacionales", "Obra nueva", "Supervisión"],
        tareasRealizadas: 78,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Casa completa": "$15.000.000+",
            "Supervisión": "$200.000/mes",
            "Proyecto habitacional": "Cotización"
        },
        reseñas: [
            { cliente: "Inmobiliaria Norte", comentario: "Maneja bien proyectos grandes", calificacion: 5 },
            { cliente: "Familia Rodriguez", comentario: "Construyó nuestra casa perfecta", calificacion: 5 }
        ]
    },
    {
        id: 21,
        nombre: "Roberto Torres Fuentes",
        especialidad: "Construcción",
        experiencia: 6,
        calificacion: 4.5,
        totalReseñas: 45,
        tarifaPorHora: 35000,
        avatar: "https://randomuser.me/api/portraits/men/28.jpg",
        certificado: "Técnico Construcción, Especialista Tabiquería",
        biografia: "Técnico joven especializado en tabiquería y construcción en seco.",
        servicios: ["Tabiquería seca", "Cielos falsos", "Construcción en seco", "Aislación"],
        tareasRealizadas: 89,
        disponibilidad: "Lun-Sáb 8:30-17:30",
        preciosAprox: {
            "Tabique m²": "$8.000 - $12.000",
            "Cielo falso m²": "$6.000 - $10.000",
            "Aislación m²": "$4.000 - $8.000"
        },
        reseñas: [
            { cliente: "Oficina Centro", comentario: "Rápido en tabiquería", calificacion: 4 },
            { cliente: "Departamento Nuevo", comentario: "Muy prolijo", calificacion: 5 }
        ]
    },
    {
        id: 22,
        nombre: "Patricio Herrera Lagos",
        especialidad: "Construcción",
        experiencia: 14,
        calificacion: 4.9,
        totalReseñas: 187,
        tarifaPorHora: 48000,
        avatar: "https://randomuser.me/api/portraits/men/47.jpg",
        certificado: "Maestro Mayor Constructor, Especialista Patrimonio",
        biografia: "Maestro constructor especializado en restauración de patrimonio y construcciones históricas.",
        servicios: ["Restauración patrimonio", "Construcciones históricas", "Adobe", "Técnicas tradicionales"],
        tareasRealizadas: 45,
        disponibilidad: "Lun-Vie 9:00-16:00",
        preciosAprox: {
            "Restauración": "$50.000/m²+",
            "Adobe": "$25.000/m²",
            "Patrimonio": "Cotización especializada"
        },
        reseñas: [
            { cliente: "Casa Patrimonio", comentario: "Experto en construcción histórica", calificacion: 5 },
            { cliente: "Municipalidad", comentario: "Trabajo muy especializado", calificacion: 5 }
        ]
    },

    // ===== SOLDADURA (5 profesionales) =====
    {
        id: 23,
        nombre: "Eduardo Ramírez Soto",
        especialidad: "Soldadura",
        experiencia: 12,
        calificacion: 4.8,
        totalReseñas: 156,
        tarifaPorHora: 35000,
        avatar: "https://randomuser.me/api/portraits/men/31.jpg",
        certificado: "Soldador Calificado AWS, Especialista MIG/TIG",
        biografia: "Soldador profesional con 12 años de experiencia en soldadura industrial y artística.",
        servicios: ["Soldadura MIG", "Soldadura TIG", "Estructuras metálicas", "Reparaciones"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Soldadura básica": "$25.000 - $40.000",
            "Estructura metálica": "$200.000+",
            "Reparación": "$30.000 - $60.000"
        },
        reseñas: [
            { cliente: "Taller Mecánico", comentario: "Excelente calidad de soldadura", calificacion: 5 },
            { cliente: "Casa Particular", comentario: "Reparó mi portón perfectamente", calificacion: 5 }
        ]
    },
    {
        id: 24,
        nombre: "Fernando Castro Muñoz",
        especialidad: "Soldadura",
        experiencia: 9,
        calificacion: 4.6,
        totalReseñas: 89,
        tarifaPorHora: 32000,
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
        certificado: "Soldador Industrial, Especialista Acero Inoxidable",
        biografia: "Soldador especializado en acero inoxidable para industria alimentaria y médica.",
        servicios: ["Acero inoxidable", "Soldadura sanitaria", "Equipos industriales", "Mantención"],
        tareasRealizadas: 167,
        disponibilidad: "Lun-Sáb 7:00-16:00",
        preciosAprox: {
            "Acero inoxidable": "$40.000 - $80.000",
            "Equipo industrial": "$150.000+",
            "Soldadura sanitaria": "$50.000+"
        },
        reseñas: [
            { cliente: "Restaurant", comentario: "Profesional en cocinas industriales", calificacion: 5 },
            { cliente: "Clínica", comentario: "Trabajo muy limpio y preciso", calificacion: 4 }
        ]
    },
    {
        id: 25,
        nombre: "Miguel Vargas Rojas",
        especialidad: "Soldadura",
        experiencia: 15,
        calificacion: 4.9,
        totalReseñas: 203,
        tarifaPorHora: 42000,
        avatar: "https://randomuser.me/api/portraits/men/58.jpg",
        certificado: "Maestro Soldador, Instructor DUOC UC",
        biografia: "Maestro soldador con 15 años de experiencia e instructor en DUOC UC.",
        servicios: ["Soldadura submarina", "Proyectos especiales", "Capacitación", "Supervisión"],
        tareasRealizadas: 98,
        disponibilidad: "Proyectos especiales",
        preciosAprox: {
            "Soldadura submarina": "$200.000+",
            "Proyecto especial": "Cotización",
            "Capacitación": "$80.000/jornada"
        },
        reseñas: [
            { cliente: "Puerto", comentario: "Excelente soldadura submarina", calificacion: 5 },
            { cliente: "Empresa Minera", comentario: "Muy profesional y capacitado", calificacion: 5 }
        ]
    },
    {
        id: 26,
        nombre: "Andrés López Herrera",
        especialidad: "Soldadura",
        experiencia: 7,
        calificacion: 4.4,
        totalReseñas: 67,
        tarifaPorHora: 28000,
        avatar: "https://randomuser.me/api/portraits/men/36.jpg",
        certificado: "Soldador Básico, Especialista Portones",
        biografia: "Soldador especializado en portones, rejas y trabajos residenciales.",
        servicios: ["Portones", "Rejas de seguridad", "Escaleras", "Trabajos decorativos"],
        tareasRealizadas: 145,
        disponibilidad: "Lun-Sáb 9:00-18:00",
        preciosAprox: {
            "Portón": "$180.000 - $350.000",
            "Reja m²": "$25.000 - $40.000",
            "Escalera": "$200.000+"
        },
        reseñas: [
            { cliente: "Casa Las Condes", comentario: "Hermoso portón de fierro", calificacion: 4 },
            { cliente: "Villa", comentario: "Rejas muy bien hechas", calificacion: 5 }
        ]
    },
    {
        id: 27,
        nombre: "Raúl Moreno Silva",
        especialidad: "Soldadura",
        experiencia: 11,
        calificacion: 4.7,
        totalReseñas: 134,
        tarifaPorHora: 38000,
        avatar: "https://randomuser.me/api/portraits/men/49.jpg",
        certificado: "Soldador Calificado, Especialista Aluminio",
        biografia: "Soldador especializado en aluminio y metales no ferrosos para ventanas y estructuras.",
        servicios: ["Soldadura aluminio", "Ventanas", "Estructuras livianas", "Reparaciones especializadas"],
        tareasRealizadas: 189,
        disponibilidad: "Lun-Vie 8:30-17:30",
        preciosAprox: {
            "Soldadura aluminio": "$35.000 - $60.000",
            "Ventana": "$120.000 - $250.000",
            "Estructura liviana": "$150.000+"
        },
        reseñas: [
            { cliente: "Oficina Centro", comentario: "Excelente trabajo en ventanas", calificacion: 5 },
            { cliente: "Casa Moderna", comentario: "Muy profesional", calificacion: 4 }
        ]
    },

    // ===== PINTURA (6 profesionales) =====
    {
        id: 28,
        nombre: "Antonio Morales Jiménez",
        especialidad: "Pintura",
        experiencia: 10,
        calificacion: 4.8,
        totalReseñas: 145,
        tarifaPorHora: 25000,
        avatar: "https://randomuser.me/api/portraits/men/21.jpg",
        certificado: "Maestro Pintor, Especialista Decorativo",
        biografia: "Maestro pintor con 10 años de experiencia en pintura decorativa y residencial.",
        servicios: ["Pintura decorativa", "Latex", "Esmalte", "Empapelado"],
        tareasRealizadas: 267,
        disponibilidad: "Lun-Sáb 8:00-17:00",
        preciosAprox: {
            "Pintura interior m²": "$3.500 - $6.000",
            "Pintura exterior m²": "$4.500 - $8.000",
            "Empapelado m²": "$8.000 - $15.000"
        },
        reseñas: [
            { cliente: "Casa Ñuñoa", comentario: "Excelente terminación", calificacion: 5 },
            { cliente: "Oficina", comentario: "Muy limpio y prolijo", calificacion: 5 }
        ]
    },
    {
        id: 29,
        nombre: "Luis González Vega",
        especialidad: "Pintura",
        experiencia: 8,
        calificacion: 4.6,
        totalReseñas: 98,
        tarifaPorHora: 22000,
        avatar: "https://randomuser.me/api/portraits/men/34.jpg",
        certificado: "Pintor Profesional, Especialista Fachadas",
        biografia: "Pintor especializado en fachadas y trabajos en altura.",
        servicios: ["Fachadas", "Trabajos en altura", "Pintura industrial", "Hidrolavado"],
        tareasRealizadas: 178,
        disponibilidad: "Lun-Vie 7:30-16:30",
        preciosAprox: {
            "Fachada m²": "$5.000 - $10.000",
            "Trabajo altura": "$8.000 - $12.000",
            "Hidrolavado m²": "$2.000 - $4.000"
        },
        reseñas: [
            { cliente: "Edificio Centro", comentario: "Excelente trabajo en fachada", calificacion: 5 },
            { cliente: "Casa 3 pisos", comentario: "No teme a las alturas", calificacion: 4 }
        ]
    },
    {
        id: 30,
        nombre: "Pedro Ramirez Torres",
        especialidad: "Pintura",
        experiencia: 12,
        calificacion: 4.9,
        totalReseñas: 189,
        tarifaPorHora: 28000,
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        certificado: "Maestro Pintor Artístico, Restaurador",
        biografia: "Maestro pintor especializado en restauración y técnicas artísticas.",
        servicios: ["Restauración", "Pintura artística", "Murales", "Técnicas especiales"],
        tareasRealizadas: 89,
        disponibilidad: "Lun-Vie 9:00-16:00",
        preciosAprox: {
            "Restauración m²": "$15.000 - $30.000",
            "Mural m²": "$25.000 - $50.000",
            "Técnica especial": "Cotización"
        },
        reseñas: [
            { cliente: "Casa Patrimonio", comentario: "Restauró bellamente nuestra casa", calificacion: 5 },
            { cliente: "Restaurant", comentario: "Hermoso mural", calificacion: 5 }
        ]
    },
    {
        id: 31,
        nombre: "Javier Silva Campos",
        especialidad: "Pintura",
        experiencia: 6,
        calificacion: 4.4,
        totalReseñas: 67,
        tarifaPorHora: 20000,
        avatar: "https://randomuser.me/api/portraits/men/29.jpg",
        certificado: "Pintor Residencial, Curso SENCE",
        biografia: "Pintor joven especializado en viviendas y departamentos.",
        servicios: ["Pintura residencial", "Departamentos", "Oficinas", "Empaste"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Sáb 8:30-17:30",
        preciosAprox: {
            "Departamento": "$350.000 - $800.000",
            "Casa": "$800.000 - $1.500.000",
            "Empaste m²": "$2.500 - $4.000"
        },
        reseñas: [
            { cliente: "Depto Providencia", comentario: "Buen precio y calidad", calificacion: 4 },
            { cliente: "Casa Maipú", comentario: "Rápido y eficiente", calificacion: 5 }
        ]
    },
    {
        id: 32,
        nombre: "Mario Herrera Soto",
        especialidad: "Pintura",
        experiencia: 9,
        calificacion: 4.7,
        totalReseñas: 123,
        tarifaPorHora: 24000,
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
        certificado: "Pintor Industrial, Especialista Anticorrosivo",
        biografia: "Pintor especializado en pintura industrial y anticorrosiva.",
        servicios: ["Pintura anticorrosiva", "Industrial", "Estructuras metálicas", "Protección"],
        tareasRealizadas: 156,
        disponibilidad: "Lun-Vie 7:00-16:00",
        preciosAprox: {
            "Anticorrosivo m²": "$6.000 - $12.000",
            "Estructura metálica": "$8.000 - $15.000",
            "Industrial": "Cotización"
        },
        reseñas: [
            { cliente: "Fábrica", comentario: "Excelente protección anticorrosiva", calificacion: 5 },
            { cliente: "Galpón", comentario: "Trabajo muy técnico", calificacion: 4 }
        ]
    },
    {
        id: 33,
        nombre: "Ricardo Castro López",
        especialidad: "Pintura",
        experiencia: 11,
        calificacion: 4.8,
        totalReseñas: 167,
        tarifaPorHora: 26000,
        avatar: "https://randomuser.me/api/portraits/men/38.jpg",
        certificado: "Maestro Pintor, Especialista Texturas",
        biografia: "Maestro pintor especializado en texturas y acabados especiales.",
        servicios: ["Texturas decorativas", "Estuco", "Acabados especiales", "Consultoría color"],
        tareasRealizadas: 198,
        disponibilidad: "Lun-Vie 9:00-17:00",
        preciosAprox: {
            "Textura m²": "$8.000 - $15.000",
            "Estuco m²": "$12.000 - $20.000",
            "Acabado especial": "Cotización"
        },
        reseñas: [
            { cliente: "Hotel", comentario: "Texturas hermosas", calificacion: 5 },
            { cliente: "Casa exclusiva", comentario: "Acabados de primera", calificacion: 5 }
        ]
    },

    // ===== JARDINERÍA (5 profesionales) =====
    {
        id: 34,
        nombre: "Fernando Valdés Moreno",
        especialidad: "Jardinería",
        experiencia: 7,
        calificacion: 4.6,
        totalReseñas: 89,
        tarifaPorHora: 18000,
        avatar: "https://randomuser.me/api/portraits/men/26.jpg",
        certificado: "Técnico Agrícola, Paisajista",
        biografia: "Técnico agrícola especializado en diseño de jardines y paisajismo.",
        servicios: ["Diseño jardines", "Paisajismo", "Riego automático", "Mantención"],
        tareasRealizadas: 134,
        disponibilidad: "Lun-Sáb 8:00-17:00",
        preciosAprox: {
            "Diseño jardín": "$200.000 - $500.000",
            "Riego automático": "$300.000+",
            "Mantención mes": "$50.000 - $120.000"
        },
        reseñas: [
            { cliente: "Casa Las Condes", comentario: "Hermoso diseño de jardín", calificacion: 5 },
            { cliente: "Villa", comentario: "Muy creativo", calificacion: 4 }
        ]
    },
    {
        id: 35,
        nombre: "Gabriel Torres Ruiz",
        especialidad: "Jardinería",
        experiencia: 12,
        calificacion: 4.8,
        totalReseñas: 156,
        tarifaPorHora: 22000,
        avatar: "https://randomuser.me/api/portraits/men/43.jpg",
        certificado: "Ingeniero Agrónomo, Especialista Césped",
        biografia: "Ingeniero agrónomo especializado en césped y mantención de jardines.",
        servicios: ["Césped profesional", "Mantención jardines", "Fertilización", "Control plagas"],
        tareasRealizadas: 267,
        disponibilidad: "Lun-Vie 8:00-16:00",
        preciosAprox: {
            "Césped m²": "$3.000 - $8.000",
            "Mantención": "$80.000 - $200.000",
            "Control plagas": "$50.000 - $100.000"
        },
        reseñas: [
            { cliente: "Club de Golf", comentario: "Excelente manejo de césped", calificacion: 5 },
            { cliente: "Condominio", comentario: "Jardines siempre perfectos", calificacion: 5 }
        ]
    },
    {
        id: 36,
        nombre: "Andrés López Castro",
        especialidad: "Jardinería",
        experiencia: 5,
        calificacion: 4.4,
        totalReseñas: 67,
        tarifaPorHora: 16000,
        avatar: "https://randomuser.me/api/portraits/men/37.jpg",
        certificado: "Jardinero Profesional, Especialista Poda",
        biografia: "Jardinero especializado en poda de árboles y arbustos ornamentales.",
        servicios: ["Poda árboles", "Poda ornamental", "Limpieza jardín", "Plantación"],
        tareasRealizadas: 189,
        disponibilidad: "Lun-Sáb 9:00-18:00",
        preciosAprox: {
            "Poda árbol": "$25.000 - $80.000",
            "Limpieza jardín": "$30.000 - $60.000",
            "Plantación": "$15.000 - $40.000"
        },
        reseñas: [
            { cliente: "Casa Particular", comentario: "Excelente poda", calificacion: 4 },
            { cliente: "Edificio", comentario: "Muy cuidadoso", calificacion: 5 }
        ]
    },
    {
        id: 37,
        nombre: "Roberto Silva Vega",
        especialidad: "Jardinería",
        experiencia: 9,
        calificacion: 4.7,
        totalReseñas: 123,
        tarifaPorHora: 20000,
        avatar: "https://randomuser.me/api/portraits/men/50.jpg",
        certificado: "Paisajista, Especialista Jardines Verticales",
        biografia: "Paisajista especializado en jardines verticales y espacios reducidos.",
        servicios: ["Jardines verticales", "Terrazas", "Balcones", "Jardines interiores"],
        tareasRealizadas: 98,
        disponibilidad: "Lun-Vie 9:00-17:00",
        preciosAprox: {
            "Jardín vertical m²": "$25.000 - $50.000",
            "Terraza": "$150.000 - $400.000",
            "Jardín interior": "$100.000 - $300.000"
        },
        reseñas: [
            { cliente: "Departamento Centro", comentario: "Transformó mi terraza", calificacion: 5 },
            { cliente: "Oficina", comentario: "Hermoso jardín interior", calificacion: 5 }
        ]
    },
    {
        id: 38,
        nombre: "Carlos Moreno Herrera",
        especialidad: "Jardinería",
        experiencia: 6,
        calificacion: 4.5,
        totalReseñas: 78,
        tarifaPorHora: 17000,
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
        certificado: "Jardinero, Especialista Huertos Urbanos",
        biografia: "Jardinero especializado en huertos urbanos y cultivos orgánicos.",
        servicios: ["Huertos urbanos", "Cultivos orgánicos", "Compostaje", "Hidroponía"],
        tareasRealizadas: 145,
        disponibilidad: "Lun-Sáb 8:30-16:30",
        preciosAprox: {
            "Huerto urbano": "$80.000 - $200.000",
            "Sistema hidropónico": "$150.000+",
            "Compostaje": "$50.000 - $100.000"
        },
        reseñas: [
            { cliente: "Familia eco", comentario: "Excelente huerto orgánico", calificacion: 5 },
            { cliente: "Colegio", comentario: "Enseñó a los niños sobre plantas", calificacion: 4 }
        ]
    },
    {
        id: 74,
        nombre: "Esteban Morales Silva",
        especialidad: "Jardinería", 
        experiencia: 8,
        calificacion: 4.6,
        totalReseñas: 123,
        tarifaPorHora: 19000,
        avatar: "https://randomuser.me/api/portraits/men/58.jpg",
        certificado: "Jardinero Deportivo, Especialista Canchas",
        biografia: "Jardinero especializado en mantención de canchas deportivas y césped especializado.",
        servicios: ["Canchas deportivas", "Césped deportivo", "Mantención estadios", "Riego deportivo"],
        tareasRealizadas: 167,
        disponibilidad: "Lun-Dom según temporada",
        preciosAprox: {
            "Cancha fútbol": "$200.000 - $500.000",
            "Césped deportivo m²": "$5.000 - $12.000",
            "Mantención estadio": "$300.000+/mes"
        },
        reseñas: [
            { cliente: "Club Deportivo", comentario: "Cancha siempre en perfectas condiciones", calificacion: 5 },
            { cliente: "Estadio Municipal", comentario: "Experto en césped deportivo", calificacion: 4 }
        ]
    },
    {
        id: 75,
        nombre: "Claudio Torres Herrera", 
        especialidad: "Jardinería",
        experiencia: 4,
        calificacion: 4.3,
        totalReseñas: 67,
        tarifaPorHora: 15000,
        avatar: "https://randomuser.me/api/portraits/men/27.jpg",
        certificado: "Jardinero Básico, Especialista Mantención",
        biografia: "Jardinero joven especializado en mantención básica y trabajos menores.",
        servicios: ["Mantención básica", "Poda simple", "Limpieza jardín", "Riego manual"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Sáb 8:00-18:00",
        preciosAprox: {
            "Mantención básica": "$30.000 - $60.000",
            "Poda simple": "$15.000 - $35.000",
            "Limpieza": "$20.000 - $40.000"
        },
        reseñas: [
            { cliente: "Casa Particular", comentario: "Buen precio para mantención", calificacion: 4 },
            { cliente: "Jardín pequeño", comentario: "Puntual y responsable", calificacion: 4 }
        ]
    },

    // ===== LIMPIEZA (7 profesionales) =====
    {
        id: 39,
        nombre: "María González López",
        especialidad: "Limpieza",
        experiencia: 8,
        calificacion: 4.7,
        totalReseñas: 134,
        tarifaPorHora: 15000,
        avatar: "https://randomuser.me/api/portraits/women/24.jpg",
        certificado: "Técnico en Limpieza Profesional, Certificación Desinfección",
        biografia: "Técnico en limpieza con 8 años de experiencia en limpieza residencial y comercial.",
        servicios: ["Limpieza profunda", "Desinfección", "Limpieza post construcción", "Mantención"],
        tareasRealizadas: 287,
        disponibilidad: "Lun-Sáb 8:00-17:00",
        preciosAprox: {
            "Limpieza casa": "$25.000 - $60.000",
            "Limpieza oficina": "$30.000 - $80.000",
            "Post construcción": "$50.000 - $120.000"
        },
        reseñas: [
            { cliente: "Casa Las Condes", comentario: "Dejó todo impecable", calificacion: 5 },
            { cliente: "Oficina Centro", comentario: "Muy profesional y confiable", calificacion: 5 }
        ]
    },
    {
        id: 40,
        nombre: "Carmen Silva Morales",
        especialidad: "Limpieza",
        experiencia: 12,
        calificacion: 4.9,
        totalReseñas: 198,
        tarifaPorHora: 18000,
        avatar: "https://randomuser.me/api/portraits/women/35.jpg",
        certificado: "Supervisora de Limpieza, Especialista Hospitalaria",
        biografia: "Supervisora con 12 años de experiencia en limpieza hospitalaria y especializada.",
        servicios: ["Limpieza hospitalaria", "Desinfección médica", "Protocolos especiales", "Supervisión"],
        tareasRealizadas: 156,
        disponibilidad: "Lun-Vie 7:00-16:00",
        preciosAprox: {
            "Limpieza hospitalaria": "$40.000 - $100.000",
            "Desinfección médica": "$50.000 - $80.000",
            "Protocolo especial": "Cotización"
        },
        reseñas: [
            { cliente: "Clínica", comentario: "Excelente protocolo de desinfección", calificacion: 5 },
            { cliente: "Consultorio", comentario: "Muy rigurosa y profesional", calificacion: 5 }
        ]
    },
    {
        id: 41,
        nombre: "Rosa Herrera Castro",
        especialidad: "Limpieza",
        experiencia: 6,
        calificacion: 4.5,
        totalReseñas: 89,
        tarifaPorHora: 14000,
        avatar: "https://randomuser.me/api/portraits/women/42.jpg",
        certificado: "Limpieza Residencial, Especialista Alfombras",
        biografia: "Especialista en limpieza de alfombras y tapicería con técnicas especializadas.",
        servicios: ["Limpieza alfombras", "Tapicería", "Cortinas", "Limpieza domiciliaria"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Sáb 9:00-18:00",
        preciosAprox: {
            "Alfombra m²": "$3.000 - $8.000",
            "Tapicería": "$25.000 - $60.000",
            "Cortinas": "$15.000 - $40.000"
        },
        reseñas: [
            { cliente: "Casa Providencia", comentario: "Dejó las alfombras como nuevas", calificacion: 5 },
            { cliente: "Hotel", comentario: "Excelente trabajo en tapicería", calificacion: 4 }
        ]
    },
    {
        id: 42,
        nombre: "Patricia Moreno Silva",
        especialidad: "Limpieza",
        experiencia: 10,
        calificacion: 4.8,
        totalReseñas: 167,
        tarifaPorHora: 16000,
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        certificado: "Especialista Limpieza Industrial, Certificación OHSAS",
        biografia: "Especialista en limpieza industrial con certificación en seguridad ocupacional.",
        servicios: ["Limpieza industrial", "Galpones", "Fábricas", "Protocolos seguridad"],
        tareasRealizadas: 98,
        disponibilidad: "Lun-Vie 7:30-16:30",
        preciosAprox: {
            "Limpieza industrial": "$80.000 - $200.000",
            "Galpón": "$60.000 - $150.000",
            "Fábrica": "Cotización especializada"
        },
        reseñas: [
            { cliente: "Fábrica Norte", comentario: "Maneja bien protocolos industriales", calificacion: 5 },
            { cliente: "Bodega", comentario: "Muy responsable y cuidadosa", calificacion: 5 }
        ]
    },
    {
        id: 43,
        nombre: "Ana Torres Vega",
        especialidad: "Limpieza",
        experiencia: 5,
        calificacion: 4.4,
        totalReseñas: 78,
        tarifaPorHora: 13000,
        avatar: "https://randomuser.me/api/portraits/women/31.jpg",
        certificado: "Limpieza Comercial, Especialista Vidrios",
        biografia: "Joven especialista en limpieza de vidrios y fachadas comerciales.",
        servicios: ["Limpieza vidrios", "Fachadas", "Edificios comerciales", "Trabajos altura"],
        tareasRealizadas: 145,
        disponibilidad: "Lun-Sáb 8:30-17:30",
        preciosAprox: {
            "Vidrios m²": "$2.000 - $5.000",
            "Fachada": "$40.000 - $100.000",
            "Edificio comercial": "$80.000 - $200.000"
        },
        reseñas: [
            { cliente: "Edificio Centro", comentario: "Vidrios siempre perfectos", calificacion: 4 },
            { cliente: "Mall", comentario: "Muy ágil en trabajos de altura", calificacion: 5 }
        ]
    },
    {
        id: 44,
        nombre: "Elena Ramírez López",
        especialidad: "Limpieza",
        experiencia: 7,
        calificacion: 4.6,
        totalReseñas: 112,
        tarifaPorHora: 15000,
        avatar: "https://randomuser.me/api/portraits/women/39.jpg",
        certificado: "Limpieza Ecológica, Productos Biodegradables",
        biografia: "Especialista en limpieza ecológica con productos biodegradables y no tóxicos.",
        servicios: ["Limpieza ecológica", "Productos naturales", "Espacios sensibles", "Niños y mascotas"],
        tareasRealizadas: 189,
        disponibilidad: "Lun-Vie 9:00-17:00",
        preciosAprox: {
            "Limpieza ecológica": "$30.000 - $70.000",
            "Casa con niños": "$25.000 - $50.000",
            "Espacios sensibles": "$35.000 - $80.000"
        },
        reseñas: [
            { cliente: "Familia Verde", comentario: "Perfecto para casa con bebés", calificacion: 5 },
            { cliente: "Guardería", comentario: "Productos seguros para niños", calificacion: 5 }
        ]
    },
    {
        id: 45,
        nombre: "Gloria Castro Muñoz",
        especialidad: "Limpieza",
        experiencia: 9,
        calificacion: 4.7,
        totalReseñas: 156,
        tarifaPorHora: 17000,
        avatar: "https://randomuser.me/api/portraits/women/46.jpg",
        certificado: "Supervisora Limpieza, Especialista Eventos",
        biografia: "Supervisora especializada en limpieza de eventos y espacios de gran escala.",
        servicios: ["Limpieza eventos", "Salones", "Matrimonios", "Coordinación equipos"],
        tareasRealizadas: 87,
        disponibilidad: "Eventos y fines de semana",
        preciosAprox: {
            "Evento pequeño": "$50.000 - $100.000",
            "Matrimonio": "$120.000 - $250.000",
            "Salón grande": "$80.000 - $180.000"
        },
        reseñas: [
            { cliente: "Centro Eventos", comentario: "Organiza equipos perfectamente", calificacion: 5 },
            { cliente: "Hotel", comentario: "Excelente para eventos grandes", calificacion: 4 }
        ]
    },

    // ===== SEGURIDAD (7 profesionales) =====
    {
        id: 46,
        nombre: "Roberto Sánchez Torres",
        especialidad: "Seguridad",
        experiencia: 12,
        calificacion: 4.8,
        totalReseñas: 145,
        tarifaPorHora: 35000,
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        certificado: "Guardia de Seguridad OS-10, Especialista Electrónica",
        biografia: "Guardia profesional con 12 años de experiencia en seguridad electrónica y vigilancia.",
        servicios: ["Sistemas alarmas", "Cámaras seguridad", "Control acceso", "Monitoreo"],
        tareasRealizadas: 98,
        disponibilidad: "24/7 Disponible",
        preciosAprox: {
            "Sistema alarmas": "$200.000 - $500.000",
            "Cámaras": "$150.000 - $400.000",
            "Control acceso": "$300.000 - $800.000"
        },
        reseñas: [
            { cliente: "Casa Las Condes", comentario: "Sistema de seguridad perfecto", calificacion: 5 },
            { cliente: "Oficina", comentario: "Muy profesional y confiable", calificacion: 5 }
        ]
    },
    {
        id: 47,
        nombre: "Carlos Vargas Herrera",
        especialidad: "Seguridad",
        experiencia: 8,
        calificacion: 4.6,
        totalReseñas: 87,
        tarifaPorHora: 30000,
        avatar: "https://randomuser.me/api/portraits/men/53.jpg",
        certificado: "Técnico Cerrajería, Especialista Cajas Fuertes",
        biografia: "Técnico especializado en cerraduras de alta seguridad y cajas fuertes.",
        servicios: ["Cerraduras seguridad", "Cajas fuertes", "Llaves especiales", "Emergencias"],
        tareasRealizadas: 156,
        disponibilidad: "Lun-Sáb 8:00-20:00",
        preciosAprox: {
            "Cerradura alta seguridad": "$80.000 - $200.000",
            "Caja fuerte": "$300.000 - $1.000.000",
            "Servicio emergencia": "$50.000 - $80.000"
        },
        reseñas: [
            { cliente: "Banco", comentario: "Experto en sistemas de alta seguridad", calificacion: 5 },
            { cliente: "Joyería", comentario: "Instaló caja fuerte perfecta", calificacion: 4 }
        ]
    },
    {
        id: 48,
        nombre: "Manuel López Castro",
        especialidad: "Seguridad",
        experiencia: 15,
        calificacion: 4.9,
        totalReseñas: 234,
        tarifaPorHora: 45000,
        avatar: "https://randomuser.me/api/portraits/men/61.jpg",
        certificado: "Jefe Seguridad, Ex Carabineros, Instructor",
        biografia: "Ex Carabinero con 15 años de experiencia en seguridad corporativa y personal.",
        servicios: ["Seguridad personal", "Corporativa", "Análisis riesgos", "Capacitación"],
        tareasRealizadas: 67,
        disponibilidad: "Proyectos especiales",
        preciosAprox: {
            "Seguridad personal": "$200.000/día",
            "Análisis riesgos": "$150.000 - $300.000",
            "Capacitación": "$100.000/jornada"
        },
        reseñas: [
            { cliente: "Ejecutivo", comentario: "Profesional serio y competente", calificacion: 5 },
            { cliente: "Empresa", comentario: "Excelente análisis de seguridad", calificacion: 5 }
        ]
    },
    {
        id: 49,
        nombre: "Diego Moreno Silva",
        especialidad: "Seguridad",
        experiencia: 6,
        calificacion: 4.4,
        totalReseñas: 78,
        tarifaPorHora: 25000,
        avatar: "https://randomuser.me/api/portraits/men/35.jpg",
        certificado: "Guardia Seguridad, Especialista Eventos",
        biografia: "Guardia especializado en seguridad de eventos y espacios públicos.",
        servicios: ["Seguridad eventos", "Control multitudes", "Fiestas privadas", "Vigilancia"],
        tareasRealizadas: 189,
        disponibilidad: "Fines de semana y eventos",
        preciosAprox: {
            "Evento privado": "$80.000 - $150.000",
            "Fiesta": "$60.000 - $120.000",
            "Vigilancia nocturna": "$40.000 - $80.000"
        },
        reseñas: [
            { cliente: "Centro Eventos", comentario: "Maneja bien las multitudes", calificacion: 4 },
            { cliente: "Fiesta Privada", comentario: "Discreto y profesional", calificacion: 5 }
        ]
    },
    {
        id: 50,
        nombre: "Andrés Torres López",
        especialidad: "Seguridad",
        experiencia: 10,
        calificacion: 4.7,
        totalReseñas: 123,
        tarifaPorHora: 32000,
        avatar: "https://randomuser.me/api/portraits/men/44.jpg",
        certificado: "Especialista CCTV, Monitoreo Remoto",
        biografia: "Especialista en sistemas CCTV y monitoreo remoto 24/7.",
        servicios: ["Sistemas CCTV", "Monitoreo remoto", "Análisis video", "Mantenimiento"],
        tareasRealizadas: 145,
        disponibilidad: "Lun-Vie 8:00-18:00",
        preciosAprox: {
            "Sistema CCTV": "$250.000 - $600.000",
            "Monitoreo 24/7": "$150.000/mes",
            "Mantenimiento": "$50.000/visita"
        },
        reseñas: [
            { cliente: "Condominio", comentario: "Sistema CCTV funcionando perfecto", calificacion: 5 },
            { cliente: "Bodega", comentario: "Monitoreo muy confiable", calificacion: 4 }
        ]
    },
    {
        id: 51,
        nombre: "Jorge Silva Ramírez",
        especialidad: "Seguridad",
        experiencia: 7,
        calificacion: 4.5,
        totalReseñas: 98,
        tarifaPorHora: 28000,
        avatar: "https://randomuser.me/api/portraits/men/48.jpg",
        certificado: "Guardia Industrial, Especialista Prevención",
        biografia: "Guardia especializado en seguridad industrial y prevención de riesgos.",
        servicios: ["Seguridad industrial", "Prevención riesgos", "Control acceso", "Rondas"],
        tareasRealizadas: 167,
        disponibilidad: "Turnos rotativos 24/7",
        preciosAprox: {
            "Guardia industrial": "$35.000 - $50.000/turno",
            "Control acceso": "$30.000 - $45.000/turno",
            "Rondas": "$25.000 - $40.000/turno"
        },
        reseñas: [
            { cliente: "Fábrica", comentario: "Muy responsable en sus rondas", calificacion: 4 },
            { cliente: "Planta", comentario: "Conoce bien prevención de riesgos", calificacion: 5 }
        ]
    },
    {
        id: 52,
        nombre: "Ricardo Herrera Vega",
        especialidad: "Seguridad",
        experiencia: 9,
        calificacion: 4.6,
        totalReseñas: 134,
        tarifaPorHora: 33000,
        avatar: "https://randomuser.me/api/portraits/men/57.jpg",
        certificado: "Especialista Portería, Control Vehicular",
        biografia: "Especialista en control de portería y seguridad vehicular en condominios.",
        servicios: ["Control portería", "Registro vehicular", "Correspondencia", "Atención visitas"],
        tareasRealizadas: 234,
        disponibilidad: "Turnos día y noche",
        preciosAprox: {
            "Portería día": "$40.000 - $60.000/turno",
            "Portería noche": "$50.000 - $70.000/turno",
            "Fin de semana": "$55.000 - $75.000/turno"
        },
        reseñas: [
            { cliente: "Condominio Norte", comentario: "Excelente trato con residentes", calificacion: 5 },
            { cliente: "Edificio Centro", comentario: "Muy ordenado con registros", calificacion: 4 }
        ]
    },

    // ===== ELECTRODOMÉSTICOS (7 profesionales) =====
    {
        id: 53,
        nombre: "Fernando Castro Morales",
        especialidad: "Electrodomésticos",
        experiencia: 11,
        calificacion: 4.8,
        totalReseñas: 156,
        tarifaPorHora: 32000,
        avatar: "https://randomuser.me/api/portraits/men/23.jpg",
        certificado: "Técnico Electrodomésticos, Especialista Línea Blanca",
        biografia: "Técnico con 11 años reparando electrodomésticos de línea blanca y cocina.",
        servicios: ["Refrigeradores", "Lavadoras", "Secadoras", "Lavavajillas"],
        tareasRealizadas: 287,
        disponibilidad: "Lun-Sáb 8:00-18:00",
        preciosAprox: {
            "Reparación refrigerador": "$35.000 - $80.000",
            "Reparación lavadora": "$25.000 - $60.000",
            "Mantención": "$20.000 - $40.000"
        },
        reseñas: [
            { cliente: "Casa Ñuñoa", comentario: "Reparó mi refrigerador perfectamente", calificacion: 5 },
            { cliente: "Depto Centro", comentario: "Muy rápido y eficiente", calificacion: 5 }
        ]
    },
    {
        id: 54,
        nombre: "Miguel Torres Sánchez",
        especialidad: "Electrodomésticos",
        experiencia: 8,
        calificacion: 4.6,
        totalReseñas: 123,
        tarifaPorHora: 28000,
        avatar: "https://randomuser.me/api/portraits/men/39.jpg",
        certificado: "Reparador Cocinas, Especialista Gas y Eléctrico",
        biografia: "Especialista en reparación de cocinas, hornos y equipos de cocina.",
        servicios: ["Cocinas gas", "Hornos eléctricos", "Microondas", "Campanas"],
        tareasRealizadas: 198,
        disponibilidad: "Lun-Vie 9:00-17:00",
        preciosAprox: {
            "Reparación cocina": "$30.000 - $70.000",
            "Reparación horno": "$25.000 - $55.000",
            "Microondas": "$20.000 - $45.000"
        },
        reseñas: [
            { cliente: "Restaurant", comentario: "Arregló toda la cocina industrial", calificacion: 5 },
            { cliente: "Casa", comentario: "Sabe mucho de cocinas a gas", calificacion: 4 }
        ]
    },
    {
        id: 55,
        nombre: "Roberto Silva López",
        especialidad: "Electrodomésticos",
        experiencia: 13,
        calificacion: 4.9,
        totalReseñas: 234,
        tarifaPorHora: 38000,
        avatar: "https://randomuser.me/api/portraits/men/51.jpg",
        certificado: "Maestro Técnico, Especialista Aire Acondicionado",
        biografia: "Maestro técnico especializado en aire acondicionado y climatización.",
        servicios: ["Aire acondicionado", "Split", "Centrales", "Mantención"],
        tareasRealizadas: 145,
        disponibilidad: "Lun-Sáb 7:30-17:30",
        preciosAprox: {
            "Reparación split": "$40.000 - $90.000",
            "Instalación": "$60.000 - $120.000",
            "Mantención": "$25.000 - $50.000"
        },
        reseñas: [
            { cliente: "Oficina", comentario: "Experto en aire acondicionado", calificacion: 5 },
            { cliente: "Casa Las Condes", comentario: "Servicio de primera calidad", calificacion: 5 }
        ]
    },
    {
        id: 56,
        nombre: "Andrés Moreno Castro",
        especialidad: "Electrodomésticos",
        experiencia: 6,
        calificacion: 4.4,
        totalReseñas: 89,
        tarifaPorHora: 25000,
        avatar: "https://randomuser.me/api/portraits/men/33.jpg",
        certificado: "Técnico Pequeños Electrodomésticos",
        biografia: "Técnico especializado en reparación de pequeños electrodomésticos del hogar.",
        servicios: ["Aspiradoras", "Planchas", "Licuadoras", "Cafeteras"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Sáb 9:00-18:00",
        preciosAprox: {
            "Reparación aspiradora": "$15.000 - $35.000",
            "Reparación cafetera": "$12.000 - $30.000",
            "Pequeños aparatos": "$10.000 - $25.000"
        },
        reseñas: [
            { cliente: "Hogar", comentario: "Reparó mi aspiradora como nueva", calificacion: 4 },
            { cliente: "Cafetería", comentario: "Experto en máquinas de café", calificacion: 5 }
        ]
    },
    {
        id: 57,
        nombre: "Pedro Herrera Vega",
        especialidad: "Electrodomésticos",
        experiencia: 9,
        calificacion: 4.7,
        totalReseñas: 167,
        tarifaPorHora: 30000,
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
        certificado: "Técnico Audio y Video, Especialista Televisores",
        biografia: "Técnico especializado en reparación de televisores y equipos de audio.",
        servicios: ["Televisores", "Equipos de música", "Home theater", "Proyectores"],
        tareasRealizadas: 178,
        disponibilidad: "Lun-Vie 8:30-17:30",
        preciosAprox: {
            "Reparación TV": "$30.000 - $80.000",
            "Equipo de música": "$25.000 - $60.000",
            "Home theater": "$40.000 - $100.000"
        },
        reseñas: [
            { cliente: "Casa Moderna", comentario: "Arregló mi TV 4K perfectamente", calificacion: 5 },
            { cliente: "Bar", comentario: "Experto en equipos de sonido", calificacion: 4 }
        ]
    },
    {
        id: 58,
        nombre: "Luis González Torres",
        especialidad: "Electrodomésticos",
        experiencia: 7,
        calificacion: 4.5,
        totalReseñas: 112,
        tarifaPorHora: 27000,
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
        certificado: "Técnico Calefacción, Especialista Estufas",
        biografia: "Técnico especializado en sistemas de calefacción y estufas eléctricas.",
        servicios: ["Estufas eléctricas", "Calefactores", "Radiadores", "Sistemas calefacción"],
        tareasRealizadas: 145,
        disponibilidad: "Lun-Sáb 8:00-17:00",
        preciosAprox: {
            "Reparación estufa": "$20.000 - $50.000",
            "Calefactor": "$15.000 - $40.000",
            "Sistema calefacción": "$50.000 - $120.000"
        },
        reseñas: [
            { cliente: "Casa", comentario: "Reparó mi calefacción central", calificacion: 5 },
            { cliente: "Oficina", comentario: "Buen servicio y precio justo", calificacion: 4 }
        ]
    },
    {
        id: 59,
        nombre: "Mario López Silva",
        especialidad: "Electrodomésticos",
        experiencia: 10,
        calificacion: 4.8,
        totalReseñas: 189,
        tarifaPorHora: 34000,
        avatar: "https://randomuser.me/api/portraits/men/55.jpg",
        certificado: "Especialista Importados, Marcas Premium",
        biografia: "Especialista en reparación de electrodomésticos importados y marcas premium.",
        servicios: ["Marcas premium", "Importados", "Garantías", "Repuestos originales"],
        tareasRealizadas: 98,
        disponibilidad: "Lun-Vie 9:00-16:00",
        preciosAprox: {
            "Marca premium": "$50.000 - $150.000",
            "Importado": "$60.000 - $180.000",
            "Repuesto original": "Según cotización"
        },
        reseñas: [
            { cliente: "Casa exclusiva", comentario: "Experto en marcas europeas", calificacion: 5 },
            { cliente: "Depto alto estándar", comentario: "Consigue repuestos difíciles", calificacion: 5 }
        ]
    },

    // ===== CARPINTERÍA (7 profesionales) =====
    {
        id: 60,
        nombre: "Juan Carlos Morales",
        especialidad: "Carpintería",
        experiencia: 14,
        calificacion: 4.9,
        totalReseñas: 198,
        tarifaPorHora: 35000,
        avatar: "https://randomuser.me/api/portraits/men/24.jpg",
        certificado: "Maestro Carpintero, Especialista Muebles Finos",
        biografia: "Maestro carpintero con 14 años creando muebles finos y trabajos personalizados.",
        servicios: ["Muebles a medida", "Restauración", "Ebanistería", "Diseño personalizado"],
        tareasRealizadas: 145,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Mueble a medida": "$200.000 - $800.000",
            "Restauración": "$80.000 - $300.000",
            "Ebanistería": "$150.000 - $500.000"
        },
        reseñas: [
            { cliente: "Casa Patrimonial", comentario: "Restauró muebles antiguos perfectamente", calificacion: 5 },
            { cliente: "Oficina Ejecutiva", comentario: "Muebles de excelente calidad", calificacion: 5 }
        ]
    },
    {
        id: 61,
        nombre: "Antonio Silva Herrera",
        especialidad: "Carpintería",
        experiencia: 9,
        calificacion: 4.7,
        totalReseñas: 134,
        tarifaPorHora: 28000,
        avatar: "https://randomuser.me/api/portraits/men/37.jpg",
        certificado: "Carpintero Construcción, Especialista Techos",
        biografia: "Carpintero especializado en techos, estructuras y carpintería de construcción.",
        servicios: ["Techos madera", "Estructuras", "Vigas", "Terrazas"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Sáb 7:00-16:00",
        preciosAprox: {
            "Techo madera m²": "$12.000 - $25.000",
            "Estructura": "$300.000 - $800.000",
            "Terraza": "$200.000 - $600.000"
        },
        reseñas: [
            { cliente: "Casa Campo", comentario: "Hermoso techo de madera", calificacion: 5 },
            { cliente: "Cabaña", comentario: "Trabajo sólido y duradero", calificacion: 4 }
        ]
    },
    {
        id: 62,
        nombre: "Francisco Torres López",
        especialidad: "Carpintería",
        experiencia: 11,
        calificacion: 4.8,
        totalReseñas: 167,
        tarifaPorHora: 32000,
        avatar: "https://randomuser.me/api/portraits/men/49.jpg",
        certificado: "Especialista Closets, Muebles Modulares",
        biografia: "Especialista en closets y sistemas de almacenamiento modulares personalizados.",
        servicios: ["Closets", "Walk-in closets", "Muebles modulares", "Organización"],
        tareasRealizadas: 189,
        disponibilidad: "Lun-Vie 8:30-17:30",
        preciosAprox: {
            "Closet estándar": "$150.000 - $400.000",
            "Walk-in closet": "$300.000 - $800.000",
            "Modular": "$100.000 - $350.000"
        },
        reseñas: [
            { cliente: "Casa Las Condes", comentario: "Walk-in closet de ensueño", calificacion: 5 },
            { cliente: "Depto Providencia", comentario: "Optimizó perfectamente el espacio", calificacion: 5 }
        ]
    },
    {
        id: 63,
        nombre: "Gabriel Moreno Vega",
        especialidad: "Carpintería",
        experiencia: 7,
        calificacion: 4.5,
        totalReseñas: 98,
        tarifaPorHora: 25000,
        avatar: "https://randomuser.me/api/portraits/men/34.jpg",
        certificado: "Carpintero Puertas y Ventanas",
        biografia: "Carpintero especializado en fabricación e instalación de puertas y ventanas.",
        servicios: ["Puertas madera", "Ventanas", "Marcos", "Reparaciones"],
        tareasRealizadas: 156,
        disponibilidad: "Lun-Sáb 8:00-17:00",
        preciosAprox: {
            "Puerta estándar": "$80.000 - $200.000",
            "Puerta premium": "$150.000 - $400.000",
            "Ventana": "$60.000 - $180.000"
        },
        reseñas: [
            { cliente: "Remodelación", comentario: "Puertas de excelente calidad", calificacion: 4 },
            { cliente: "Casa Nueva", comentario: "Muy prolijo en instalaciones", calificacion: 5 }
        ]
    },
    {
        id: 64,
        nombre: "Ricardo Castro Torres",
        especialidad: "Carpintería",
        experiencia: 12,
        calificacion: 4.8,
        totalReseñas: 178,
        tarifaPorHora: 33000,
        avatar: "https://randomuser.me/api/portraits/men/56.jpg",
        certificado: "Carpintero Cocinas, Especialista Muebles Cocina",
        biografia: "Especialista en diseño y fabricación de muebles de cocina personalizados.",
        servicios: ["Muebles cocina", "Islas", "Despensas", "Remodelación cocinas"],
        tareasRealizadas: 123,
        disponibilidad: "Lun-Vie 8:00-16:30",
        preciosAprox: {
            "Cocina completa": "$800.000 - $2.500.000",
            "Isla cocina": "$200.000 - $600.000",
            "Despensa": "$150.000 - $400.000"
        },
        reseñas: [
            { cliente: "Casa Moderna", comentario: "Cocina de revista, hermosa", calificacion: 5 },
            { cliente: "Depto Alto Estándar", comentario: "Terminaciones impecables", calificacion: 5 }
        ]
    },
    {
        id: 65,
        nombre: "Patricio Silva Morales",
        especialidad: "Carpintería",
        experiencia: 6,
        calificacion: 4.4,
        totalReseñas: 87,
        tarifaPorHora: 23000,
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
        certificado: "Carpintero Jardín, Especialista Exterior",
        biografia: "Carpintero especializado en estructuras de madera para exterior y jardín.",
        servicios: ["Decks", "Pérgolas", "Quinchos", "Mobiliario jardín"],
        tareasRealizadas: 167,
        disponibilidad: "Lun-Sáb 8:30-17:30",
        preciosAprox: {
            "Deck m²": "$15.000 - $30.000",
            "Pérgola": "$200.000 - $500.000",
            "Quincho": "$300.000 - $800.000"
        },
        reseñas: [
            { cliente: "Casa con Jardín", comentario: "Hermoso deck de madera", calificacion: 4 },
            { cliente: "Quincho", comentario: "Trabajo resistente al clima", calificacion: 5 }
        ]
    },
    {
        id: 66,
        nombre: "Rodrigo López Herrera",
        especialidad: "Carpintería",
        experiencia: 8,
        calificacion: 4.6,
        totalReseñas: 145,
        tarifaPorHora: 27000,
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
        certificado: "Carpintero Industrial, Especialista Tarimas",
        biografia: "Carpintero especializado en carpintería industrial y fabricación de tarimas.",
        servicios: ["Tarimas", "Embalajes", "Estructuras industriales", "Pallets"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Vie 7:30-16:30",
        preciosAprox: {
            "Tarima estándar": "$25.000 - $60.000",
            "Embalaje": "$30.000 - $80.000",
            "Estructura industrial": "Cotización"
        },
        reseñas: [
            { cliente: "Exportadora", comentario: "Tarimas de excelente calidad", calificacion: 5 },
            { cliente: "Bodega", comentario: "Trabajo rápido y eficiente", calificacion: 4 }
        ]
    },

    // ===== CERRAJERÍA (7 profesionales) =====
    {
        id: 67,
        nombre: "Eduardo Ramírez Castro",
        especialidad: "Cerrajería",
        experiencia: 13,
        calificacion: 4.8,
        totalReseñas: 189,
        tarifaPorHora: 30000,
        avatar: "https://randomuser.me/api/portraits/men/25.jpg",
        certificado: "Maestro Cerrajero, Especialista Cerraduras Seguridad",
        biografia: "Maestro cerrajero con 13 años especializándose en cerraduras de alta seguridad.",
        servicios: ["Cerraduras seguridad", "Llaves codificadas", "Sistemas multipunto", "Emergencias"],
        tareasRealizadas: 267,
        disponibilidad: "24/7 Emergencias",
        preciosAprox: {
            "Cerradura seguridad": "$60.000 - $150.000",
            "Sistema multipunto": "$120.000 - $250.000",
            "Emergencia": "$35.000 - $60.000"
        },
        reseñas: [
            { cliente: "Casa Las Condes", comentario: "Instaló sistema de alta seguridad", calificacion: 5 },
            { cliente: "Emergencia nocturna", comentario: "Llegó rápido, muy profesional", calificacion: 5 }
        ]
    },
    {
        id: 68,
        nombre: "Carlos Silva Torres",
        especialidad: "Cerrajería",
        experiencia: 9,
        calificacion: 4.6,
        totalReseñas: 134,
        tarifaPorHora: 25000,
        avatar: "https://randomuser.me/api/portraits/men/38.jpg",
        certificado: "Cerrajero Automotriz, Especialista Vehículos",
        biografia: "Cerrajero especializado en cerrajería automotriz y llaves de vehículos.",
        servicios: ["Llaves auto", "Cerraduras vehículos", "Controles remotos", "Transponders"],
        tareasRealizadas: 198,
        disponibilidad: "Lun-Sáb 8:00-20:00",
        preciosAprox: {
            "Llave auto": "$25.000 - $80.000",
            "Control remoto": "$40.000 - $100.000",
            "Transponder": "$60.000 - $150.000"
        },
        reseñas: [
            { cliente: "Auto BMW", comentario: "Hizo llave nueva perfectamente", calificacion: 5 },
            { cliente: "Camioneta", comentario: "Muy rápido con llaves de auto", calificacion: 4 }
        ]
    },
    {
        id: 69,
        nombre: "Manuel Torres López",
        especialidad: "Cerrajería",
        experiencia: 11,
        calificacion: 4.7,
        totalReseñas: 156,
        tarifaPorHora: 28000,
        avatar: "https://randomuser.me/api/portraits/men/43.jpg",
        certificado: "Cerrajero Edificios, Especialista Maestras",
        biografia: "Cerrajero especializado en sistemas de llaves maestras para edificios.",
        servicios: ["Llaves maestras", "Sistemas edificios", "Control acceso", "Cilindros"],
        tareasRealizadas: 145,
        disponibilidad: "Lun-Vie 8:30-17:30",
        preciosAprox: {
            "Sistema maestro": "$200.000 - $500.000",
            "Cilindro": "$30.000 - $80.000",
            "Control acceso": "$150.000 - $400.000"
        },
        reseñas: [
            { cliente: "Edificio Centro", comentario: "Sistema maestro funcionando perfecto", calificacion: 5 },
            { cliente: "Condominio", comentario: "Muy organizado con las llaves", calificacion: 4 }
        ]
    },
    {
        id: 70,
        nombre: "Roberto Moreno Silva",
        especialidad: "Cerrajería",
        experiencia: 7,
        calificacion: 4.4,
        totalReseñas: 98,
        tarifaPorHora: 22000,
        avatar: "https://randomuser.me/api/portraits/men/31.jpg",
        certificado: "Cerrajero Residencial, Especialista Manijas",
        biografia: "Cerrajero especializado en cerrajería residencial y reparación de manijas.",
        servicios: ["Manijas", "Picaportes", "Cerraduras simples", "Reparaciones"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Sáb 9:00-18:00",
        preciosAprox: {
            "Manija": "$15.000 - $40.000",
            "Picaporte": "$20.000 - $50.000",
            "Cerradura simple": "$25.000 - $60.000"
        },
        reseñas: [
            { cliente: "Casa Particular", comentario: "Arregló todas las manijas", calificacion: 4 },
            { cliente: "Departamento", comentario: "Buen precio y rápido", calificacion: 5 }
        ]
    },
    {
        id: 71,
        nombre: "Andrés Castro López",
        especialidad: "Cerrajería",
        experiencia: 10,
        calificacion: 4.7,
        totalReseñas: 167,
        tarifaPorHora: 27000,
        avatar: "https://randomuser.me/api/portraits/men/47.jpg",
        certificado: "Cerrajero Comercial, Especialista Cajas Registradoras",
        biografia: "Cerrajero especializado en cerrajería comercial y cajas registradoras.",
        servicios: ["Cajas registradoras", "Cerraduras comerciales", "Buzones", "Vitrinas"],
        tareasRealizadas: 123,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Caja registradora": "$40.000 - $100.000",
            "Cerradura comercial": "$30.000 - $80.000",
            "Vitrina": "$35.000 - $90.000"
        },
        reseñas: [
            { cliente: "Tienda", comentario: "Experto en cajas registradoras", calificacion: 5 },
            { cliente: "Local Comercial", comentario: "Muy confiable para comercios", calificacion: 4 }
        ]
    },
    {
        id: 72,
        nombre: "Francisco Herrera Torres",
        especialidad: "Cerrajería",
        experiencia: 8,
        calificacion: 4.5,
        totalReseñas: 112,
        tarifaPorHora: 24000,
        avatar: "https://randomuser.me/api/portraits/men/54.jpg",
        certificado: "Cerrajero Industrial, Especialista Candados",
        biografia: "Cerrajero especializado en cerrajería industrial y sistemas de candados.",
        servicios: ["Candados industriales", "Cerraduras galpones", "Sistemas blindaje", "Seguridad perimetral"],
        tareasRealizadas: 178,
        disponibilidad: "Lun-Sáb 7:30-16:30",
        preciosAprox: {
            "Candado industrial": "$25.000 - $80.000",
            "Cerradura galpón": "$40.000 - $120.000",
            "Sistema blindaje": "$200.000+"
        },
        reseñas: [
            { cliente: "Bodega Industrial", comentario: "Candados muy resistentes", calificacion: 4 },
            { cliente: "Galpón", comentario: "Buen sistema de seguridad", calificacion: 5 }
        ]
    },
    {
        id: 73,
        nombre: "Jorge López Morales",
        especialidad: "Cerrajería",
        experiencia: 6,
        calificacion: 4.3,
        totalReseñas: 89,
        tarifaPorHora: 21000,
        avatar: "https://randomuser.me/api/portraits/men/36.jpg",
        certificado: "Cerrajero Básico, Especialista Duplicados",
        biografia: "Cerrajero joven especializado en duplicado de llaves y servicios básicos.",
        servicios: ["Duplicado llaves", "Llaves simples", "Servicios básicos", "Emergencias menores"],
        tareasRealizadas: 267,
        disponibilidad: "Lun-Sáb 9:30-18:30",
        preciosAprox: {
            "Duplicado llave": "$3.000 - $8.000",
            "Llave simple": "$5.000 - $15.000",
            "Servicio básico": "$15.000 - $35.000"
        },
        reseñas: [
            { cliente: "Vecino", comentario: "Rápido para duplicar llaves", calificacion: 4 },
            { cliente: "Emergencia menor", comentario: "Llegó pronto y solucionó", calificacion: 4 }
        ]
    },

    // ===== GASFITERÍA (7 profesionales) =====
    {
        id: 76,
        nombre: "Ramón Soto Morales",
        especialidad: "Gasfitería",
        experiencia: 12,
        calificacion: 4.9,
        totalReseñas: 178,
        tarifaPorHora: 40000,
        avatar: "https://randomuser.me/api/portraits/men/64.jpg",
        certificado: "Gasfiter Autorizado SEC, Especialista Gas Licuado",
        biografia: "Gasfiter certificado con 12 años de experiencia en instalaciones de gas seguras.",
        servicios: ["Instalación gas", "Certificación SEC", "Reparación fugas", "Mantención"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Instalación gas": "$80.000 - $200.000",
            "Certificación SEC": "$50.000 - $80.000",
            "Reparación fuga": "$40.000 - $100.000"
        },
        reseñas: [
            { cliente: "Casa Nueva", comentario: "Instalación de gas impecable", calificacion: 5 },
            { cliente: "Restaurant", comentario: "Muy seguro y profesional", calificacion: 5 }
        ]
    },
    {
        id: 77,
        nombre: "Jorge Peña Castro",
        especialidad: "Gasfitería",
        experiencia: 9,
        calificacion: 4.7,
        totalReseñas: 145,
        tarifaPorHora: 35000,
        avatar: "https://randomuser.me/api/portraits/men/71.jpg",
        certificado: "Gasfiter Residencial, Especialista Calentadores",
        biografia: "Gasfiter especializado en calentadores a gas y sistemas domiciliarios.",
        servicios: ["Calentadores gas", "Estufas a gas", "Cocinas gas", "Mantención domiciliaria"],
        tareasRealizadas: 189,
        disponibilidad: "Lun-Sáb 8:30-17:30",
        preciosAprox: {
            "Calentador gas": "$60.000 - $150.000",
            "Estufa gas": "$40.000 - $100.000",
            "Mantención": "$25.000 - $50.000"
        },
        reseñas: [
            { cliente: "Familia Torres", comentario: "Instaló calentador perfecto", calificacion: 5 },
            { cliente: "Depto Centro", comentario: "Servicio rápido y confiable", calificacion: 4 }
        ]
    },
    {
        id: 78,
        nombre: "Manuel Rivera López",
        especialidad: "Gasfitería",
        experiencia: 15,
        calificacion: 4.8,
        totalReseñas: 267,
        tarifaPorHora: 45000,
        avatar: "https://randomuser.me/api/portraits/men/66.jpg",
        certificado: "Maestro Gasfiter, Instructor SEC",
        biografia: "Maestro gasfiter con 15 años de experiencia e instructor autorizado SEC.",
        servicios: ["Proyectos complejos", "Capacitación", "Supervisión", "Emergencias gas"],
        tareasRealizadas: 156,
        disponibilidad: "24/7 Emergencias",
        preciosAprox: {
            "Proyecto complejo": "$200.000+",
            "Emergencia gas": "$80.000 - $150.000",
            "Supervisión": "$100.000/día"
        },
        reseñas: [
            { cliente: "Edificio", comentario: "Maneja proyectos grandes", calificacion: 5 },
            { cliente: "Emergencia", comentario: "Solucionó fuga peligrosa", calificacion: 5 }
        ]
    },
    {
        id: 79,
        nombre: "Carlos Vega Torres",
        especialidad: "Gasfitería",
        experiencia: 7,
        calificacion: 4.5,
        totalReseñas: 98,
        tarifaPorHora: 32000,
        avatar: "https://randomuser.me/api/portraits/men/73.jpg",
        certificado: "Gasfiter Industrial, Especialista Gas Natural",
        biografia: "Gasfiter especializado en instalaciones de gas natural para industrias.",
        servicios: ["Gas natural", "Instalaciones industriales", "Redes gas", "Medidores"],
        tareasRealizadas: 123,
        disponibilidad: "Lun-Vie 7:30-16:30",
        preciosAprox: {
            "Gas natural": "$150.000 - $400.000",
            "Instalación industrial": "$300.000+",
            "Red gas": "$200.000+"
        },
        reseñas: [
            { cliente: "Fábrica", comentario: "Experto en gas natural", calificacion: 4 },
            { cliente: "Industria", comentario: "Instalación muy técnica", calificacion: 5 }
        ]
    },
    {
        id: 80,
        nombre: "Ricardo Herrera Silva",
        especialidad: "Gasfitería",
        experiencia: 8,
        calificacion: 4.6,
        totalReseñas: 134,
        tarifaPorHora: 33000,
        avatar: "https://randomuser.me/api/portraits/men/68.jpg",
        certificado: "Gasfiter Comercial, Especialista Hornos",
        biografia: "Gasfiter especializado en hornos comerciales y equipos de panadería.",
        servicios: ["Hornos comerciales", "Equipos panadería", "Gas comercial", "Mantención equipos"],
        tareasRealizadas: 167,
        disponibilidad: "Lun-Sáb 6:00-15:00",
        preciosAprox: {
            "Horno comercial": "$100.000 - $250.000",
            "Equipo panadería": "$80.000 - $200.000",
            "Mantención": "$40.000 - $80.000"
        },
        reseñas: [
            { cliente: "Panadería", comentario: "Mantiene nuestros hornos perfectos", calificacion: 5 },
            { cliente: "Restaurant", comentario: "Muy confiable para equipos", calificacion: 4 }
        ]
    },
    {
        id: 81,
        nombre: "Andrés Morales Castro",
        especialidad: "Gasfitería",
        experiencia: 6,
        calificacion: 4.4,
        totalReseñas: 89,
        tarifaPorHora: 28000,
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        certificado: "Gasfiter Básico, Especialista Reparaciones",
        biografia: "Gasfiter joven especializado en reparaciones menores y mantención básica.",
        servicios: ["Reparaciones menores", "Mantención básica", "Válvulas", "Conexiones"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Sáb 9:00-18:00",
        preciosAprox: {
            "Reparación menor": "$20.000 - $50.000",
            "Mantención básica": "$25.000 - $45.000",
            "Válvula": "$15.000 - $35.000"
        },
        reseñas: [
            { cliente: "Casa Particular", comentario: "Rápido y económico", calificacion: 4 },
            { cliente: "Depto", comentario: "Solucionó problema rápido", calificacion: 4 }
        ]
    },
    {
        id: 82,
        nombre: "Fernando López Ramírez",
        especialidad: "Gasfitería",
        experiencia: 10,
        calificacion: 4.7,
        totalReseñas: 156,
        tarifaPorHora: 37000,
        avatar: "https://randomuser.me/api/portraits/men/69.jpg",
        certificado: "Gasfiter Especialista, Certificación Internacional",
        biografia: "Gasfiter con certificación internacional en sistemas de gas avanzados.",
        servicios: ["Sistemas avanzados", "Gas importado", "Equipos especiales", "Consultoría técnica"],
        tareasRealizadas: 98,
        disponibilidad: "Lun-Vie 8:00-16:00",
        preciosAprox: {
            "Sistema avanzado": "$250.000+",
            "Equipo especial": "$150.000 - $300.000",
            "Consultoría": "$80.000 - $120.000"
        },
        reseñas: [
            { cliente: "Casa Premium", comentario: "Sistemas de gas de alta gama", calificacion: 5 },
            { cliente: "Proyecto Especial", comentario: "Muy técnico y actualizado", calificacion: 5 }
        ]
    },

    // ===== REFRIGERACIÓN (7 profesionales) =====
    {
        id: 83,
        nombre: "Pablo Santos Torres",
        especialidad: "Refrigeración",
        experiencia: 11,
        calificacion: 4.8,
        totalReseñas: 167,
        tarifaPorHora: 38000,
        avatar: "https://randomuser.me/api/portraits/men/70.jpg",
        certificado: "Técnico Refrigeración, Especialista Cámaras Frías",
        biografia: "Técnico especializado en sistemas de refrigeración industrial y cámaras frías.",
        servicios: ["Cámaras frías", "Refrigeración industrial", "Sistemas centrales", "Mantención"],
        tareasRealizadas: 145,
        disponibilidad: "Lun-Vie 7:00-16:00",
        preciosAprox: {
            "Cámara fría": "$800.000 - $2.000.000",
            "Sistema central": "$500.000 - $1.500.000",
            "Mantención": "$50.000 - $100.000"
        },
        reseñas: [
            { cliente: "Supermercado", comentario: "Cámaras frías funcionando perfecto", calificacion: 5 },
            { cliente: "Restaurant", comentario: "Muy profesional y rápido", calificacion: 5 }
        ]
    },
    {
        id: 84,
        nombre: "Diego Campos López",
        especialidad: "Refrigeración",
        experiencia: 8,
        calificacion: 4.6,
        totalReseñas: 123,
        tarifaPorHora: 32000,
        avatar: "https://randomuser.me/api/portraits/men/72.jpg",
        certificado: "Técnico Refrigeración Comercial",
        biografia: "Técnico especializado en refrigeración comercial y equipos de supermercados.",
        servicios: ["Vitrinas refrigeradas", "Congeladores", "Equipos comerciales", "Reparaciones"],
        tareasRealizadas: 189,
        disponibilidad: "Lun-Sáb 8:00-17:00",
        preciosAprox: {
            "Vitrina refrigerada": "$200.000 - $600.000",
            "Congelador": "$150.000 - $400.000",
            "Reparación": "$40.000 - $100.000"
        },
        reseñas: [
            { cliente: "Carnicería", comentario: "Vitrinas siempre frías", calificacion: 4 },
            { cliente: "Minimarket", comentario: "Servicio técnico excelente", calificacion: 5 }
        ]
    },
    {
        id: 85,
        nombre: "Mauricio Silva Herrera",
        especialidad: "Refrigeración",
        experiencia: 13,
        calificacion: 4.9,
        totalReseñas: 234,
        tarifaPorHora: 42000,
        avatar: "https://randomuser.me/api/portraits/men/74.jpg",
        certificado: "Maestro Refrigeración, Especialista Automático",
        biografia: "Maestro en refrigeración especializado en sistemas automáticos y control inteligente.",
        servicios: ["Sistemas automáticos", "Control inteligente", "Refrigeración médica", "Laboratorios"],
        tareasRealizadas: 98,
        disponibilidad: "Lun-Vie 8:30-16:30",
        preciosAprox: {
            "Sistema automático": "$1.000.000+",
            "Refrigeración médica": "$600.000 - $1.500.000",
            "Control inteligente": "$400.000 - $800.000"
        },
        reseñas: [
            { cliente: "Hospital", comentario: "Sistemas médicos perfectos", calificacion: 5 },
            { cliente: "Laboratorio", comentario: "Muy técnico y preciso", calificacion: 5 }
        ]
    },
    {
        id: 86,
        nombre: "Gonzalo Moreno Vega",
        especialidad: "Refrigeración",
        experiencia: 6,
        calificacion: 4.4,
        totalReseñas: 87,
        tarifaPorHora: 28000,
        avatar: "https://randomuser.me/api/portraits/men/76.jpg",
        certificado: "Técnico Refrigeración Doméstica",
        biografia: "Técnico especializado en refrigeración doméstica y reparación de refrigeradores.",
        servicios: ["Refrigeradores", "Freezers", "Reparaciones domésticas", "Mantención"],
        tareasRealizadas: 267,
        disponibilidad: "Lun-Sáb 9:00-18:00",
        preciosAprox: {
            "Reparación refrigerador": "$30.000 - $80.000",
            "Freezer": "$25.000 - $60.000",
            "Mantención": "$20.000 - $40.000"
        },
        reseñas: [
            { cliente: "Casa Particular", comentario: "Reparó mi refrigerador rápido", calificacion: 4 },
            { cliente: "Depto", comentario: "Buen precio y servicio", calificacion: 4 }
        ]
    },
    {
        id: 87,
        nombre: "Rodrigo Castro Torres",
        especialidad: "Refrigeración",
        experiencia: 9,
        calificacion: 4.7,
        totalReseñas: 134,
        tarifaPorHora: 35000,
        avatar: "https://randomuser.me/api/portraits/men/77.jpg",
        certificado: "Técnico Refrigeración Automotriz",
        biografia: "Técnico especializado en sistemas de aire acondicionado automotriz.",
        servicios: ["Aire auto", "Sistemas automotrices", "Reparación A/C", "Recarga gas"],
        tareasRealizadas: 178,
        disponibilidad: "Lun-Sáb 8:30-17:30",
        preciosAprox: {
            "Aire acondicionado auto": "$40.000 - $120.000",
            "Recarga gas": "$25.000 - $50.000",
            "Reparación A/C": "$50.000 - $150.000"
        },
        reseñas: [
            { cliente: "Auto Particular", comentario: "Aire funcionando perfecto", calificacion: 5 },
            { cliente: "Taller", comentario: "Muy buen servicio automotriz", calificacion: 4 }
        ]
    },
    {
        id: 88,
        nombre: "Víctor López Silva",
        especialidad: "Refrigeración",
        experiencia: 7,
        calificacion: 4.5,
        totalReseñas: 112,
        tarifaPorHora: 30000,
        avatar: "https://randomuser.me/api/portraits/men/78.jpg",
        certificado: "Técnico Refrigeración Transporte",
        biografia: "Técnico especializado en refrigeración para transporte y vehículos comerciales.",
        servicios: ["Transporte refrigerado", "Camiones frigoríficos", "Contenedores", "Logística fría"],
        tareasRealizadas: 145,
        disponibilidad: "Lun-Vie 6:00-15:00",
        preciosAprox: {
            "Camión frigorífico": "$200.000 - $500.000",
            "Contenedor": "$150.000 - $400.000",
            "Mantención transporte": "$80.000 - $200.000"
        },
        reseñas: [
            { cliente: "Empresa Logística", comentario: "Mantiene flota refrigerada", calificacion: 5 },
            { cliente: "Transportes", comentario: "Muy confiable para camiones", calificacion: 4 }
        ]
    },
    {
        id: 89,
        nombre: "Esteban Torres Castro",
        especialidad: "Refrigeración",
        experiencia: 12,
        calificacion: 4.8,
        totalReseñas: 189,
        tarifaPorHora: 40000,
        avatar: "https://randomuser.me/api/portraits/men/79.jpg",
        certificado: "Especialista Refrigeración Marina",
        biografia: "Especialista en sistemas de refrigeración para embarcaciones y industria pesquera.",
        servicios: ["Refrigeración marina", "Barcos pesqueros", "Conservación pescado", "Sistemas marinos"],
        tareasRealizadas: 67,
        disponibilidad: "Según temporada marítima",
        preciosAprox: {
            "Sistema marino": "$500.000 - $1.200.000",
            "Barco pesquero": "$300.000 - $800.000",
            "Conservación": "$200.000 - $600.000"
        },
        reseñas: [
            { cliente: "Pesquera", comentario: "Experto en refrigeración marina", calificacion: 5 },
            { cliente: "Barco", comentario: "Sistemas funcionando en alta mar", calificacion: 5 }
        ]
    },

    // ===== CALEFÓN Y CALDERAS (7 profesionales) =====
    {
        id: 90,
        nombre: "Héctor Ramírez Silva",
        especialidad: "Calefón y Calderas",
        experiencia: 14,
        calificacion: 4.9,
        totalReseñas: 198,
        tarifaPorHora: 45000,
        avatar: "https://randomuser.me/api/portraits/men/80.jpg",
        certificado: "Especialista Calderas, Certificación Internacional",
        biografia: "Especialista en calderas industriales y sistemas de calefacción central con 14 años de experiencia.",
        servicios: ["Calderas industriales", "Calefacción central", "Sistemas vapor", "Mantención preventiva"],
        tareasRealizadas: 123,
        disponibilidad: "Lun-Vie 7:00-16:00",
        preciosAprox: {
            "Caldera industrial": "$2.000.000+",
            "Calefacción central": "$800.000 - $2.500.000",
            "Mantención preventiva": "$100.000 - $200.000"
        },
        reseñas: [
            { cliente: "Fábrica Textil", comentario: "Mantiene nuestras calderas perfectas", calificacion: 5 },
            { cliente: "Hospital", comentario: "Muy profesional y confiable", calificacion: 5 }
        ]
    },
    {
        id: 91,
        nombre: "Luis González Castro",
        especialidad: "Calefón y Calderas",
        experiencia: 10,
        calificacion: 4.7,
        totalReseñas: 156,
        tarifaPorHora: 38000,
        avatar: "https://randomuser.me/api/portraits/men/81.jpg",
        certificado: "Técnico Calefones, Especialista Gas",
        biografia: "Técnico especializado en calefones a gas y sistemas domiciliarios de agua caliente.",
        servicios: ["Calefones a gas", "Agua caliente", "Instalación domiciliaria", "Reparaciones"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Sáb 8:00-17:00",
        preciosAprox: {
            "Calefón gas": "$80.000 - $200.000",
            "Instalación": "$60.000 - $150.000",
            "Reparación": "$30.000 - $80.000"
        },
        reseñas: [
            { cliente: "Casa Particular", comentario: "Instaló calefón perfecto", calificacion: 5 },
            { cliente: "Depto", comentario: "Servicio rápido y confiable", calificacion: 4 }
        ]
    },
    {
        id: 92,
        nombre: "Roberto Torres López",
        especialidad: "Calefón y Calderas",
        experiencia: 12,
        calificacion: 4.8,
        totalReseñas: 178,
        tarifaPorHora: 42000,
        avatar: "https://randomuser.me/api/portraits/men/82.jpg",
        certificado: "Especialista Calderas Comerciales",
        biografia: "Especialista en calderas comerciales para hoteles, hospitales y edificios.",
        servicios: ["Calderas comerciales", "Edificios", "Hoteles", "Sistemas complejos"],
        tareasRealizadas: 98,
        disponibilidad: "Lun-Vie 8:30-16:30",
        preciosAprox: {
            "Caldera comercial": "$1.200.000 - $3.000.000",
            "Sistema edificio": "$800.000 - $2.000.000",
            "Hotel": "$1.500.000+"
        },
        reseñas: [
            { cliente: "Hotel Centro", comentario: "Sistema de agua caliente perfecto", calificacion: 5 },
            { cliente: "Edificio Corporativo", comentario: "Muy técnico y profesional", calificacion: 5 }
        ]
    },
    {
        id: 93,
        nombre: "Mario Silva Herrera",
        especialidad: "Calefón y Calderas",
        experiencia: 8,
        calificacion: 4.5,
        totalReseñas: 134,
        tarifaPorHora: 35000,
        avatar: "https://randomuser.me/api/portraits/men/83.jpg",
        certificado: "Técnico Calefacción, Especialista Eléctrico",
        biografia: "Técnico especializado en calefones eléctricos y sistemas híbridos.",
        servicios: ["Calefones eléctricos", "Sistemas híbridos", "Termos eléctricos", "Eficiencia energética"],
        tareasRealizadas: 167,
        disponibilidad: "Lun-Sáb 9:00-17:00",
        preciosAprox: {
            "Calefón eléctrico": "$60.000 - $150.000",
            "Sistema híbrido": "$150.000 - $400.000",
            "Termo eléctrico": "$40.000 - $100.000"
        },
        reseñas: [
            { cliente: "Casa Ecológica", comentario: "Sistema eficiente y económico", calificacion: 4 },
            { cliente: "Depto Moderno", comentario: "Excelente calefón eléctrico", calificacion: 5 }
        ]
    },
    {
        id: 94,
        nombre: "Patricio Moreno Castro",
        especialidad: "Calefón y Calderas",
        experiencia: 9,
        calificacion: 4.6,
        totalReseñas: 145,
        tarifaPorHora: 36000,
        avatar: "https://randomuser.me/api/portraits/men/84.jpg",
        certificado: "Técnico Calderas Biomasa",
        biografia: "Técnico especializado en calderas de biomasa y sistemas ecológicos.",
        servicios: ["Calderas biomasa", "Sistemas ecológicos", "Energía renovable", "Pellets"],
        tareasRealizadas: 89,
        disponibilidad: "Lun-Vie 8:00-16:00",
        preciosAprox: {
            "Caldera biomasa": "$800.000 - $2.000.000",
            "Sistema ecológico": "$600.000 - $1.500.000",
            "Conversión pellets": "$400.000 - $1.000.000"
        },
        reseñas: [
            { cliente: "Casa Sustentable", comentario: "Sistema biomasa funcionando perfecto", calificacion: 5 },
            { cliente: "Proyecto Verde", comentario: "Muy actualizado en tecnologías", calificacion: 4 }
        ]
    },
    {
        id: 95,
        nombre: "Fernando López Torres",
        especialidad: "Calefón y Calderas",
        experiencia: 11,
        calificacion: 4.7,
        totalReseñas: 167,
        tarifaPorHora: 40000,
        avatar: "https://randomuser.me/api/portraits/men/85.jpg",
        certificado: "Especialista Calderas Condensación",
        biografia: "Especialista en calderas de condensación y alta eficiencia energética.",
        servicios: ["Calderas condensación", "Alta eficiencia", "Ahorro energético", "Tecnología avanzada"],
        tareasRealizadas: 112,
        disponibilidad: "Lun-Vie 8:30-16:30",
        preciosAprox: {
            "Caldera condensación": "$1.500.000 - $3.500.000",
            "Sistema eficiente": "$1.000.000 - $2.500.000",
            "Optimización": "$200.000 - $500.000"
        },
        reseñas: [
            { cliente: "Edificio Premium", comentario: "Ahorro energético increíble", calificacion: 5 },
            { cliente: "Casa Inteligente", comentario: "Tecnología de punta", calificacion: 5 }
        ]
    },
    {
        id: 96,
        nombre: "Andrés Castro Silva",
        especialidad: "Calefón y Calderas",
        experiencia: 6,
        calificacion: 4.3,
        totalReseñas: 98,
        tarifaPorHora: 30000,
        avatar: "https://randomuser.me/api/portraits/men/86.jpg",
        certificado: "Técnico Básico, Especialista Mantención",
        biografia: "Técnico joven especializado en mantención preventiva y reparaciones básicas.",
        servicios: ["Mantención preventiva", "Reparaciones básicas", "Limpieza calderas", "Revisiones técnicas"],
        tareasRealizadas: 189,
        disponibilidad: "Lun-Sáb 9:00-18:00",
        preciosAprox: {
            "Mantención preventiva": "$40.000 - $80.000",
            "Reparación básica": "$25.000 - $60.000",
            "Limpieza": "$30.000 - $50.000"
        },
        reseñas: [
            { cliente: "Mantención Regular", comentario: "Muy puntual y ordenado", calificacion: 4 },
            { cliente: "Casa", comentario: "Buen precio para mantención", calificacion: 4 }
        ]
    },

    // ===== CONTADORES (7 profesionales) =====
    {
        id: 97,
        nombre: "Gabriel Santos López",
        especialidad: "Contadores",
        experiencia: 13,
        calificacion: 4.8,
        totalReseñas: 167,
        tarifaPorHora: 40000,
        avatar: "https://randomuser.me/api/portraits/men/87.jpg",
        certificado: "Especialista Medidores, Certificación Eléctrica",
        biografia: "Especialista en instalación y mantención de medidores eléctricos y sistemas de medición.",
        servicios: ["Medidores eléctricos", "Sistemas medición", "Instalación contadores", "Certificaciones"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Vie 8:00-16:00",
        preciosAprox: {
            "Medidor eléctrico": "$80.000 - $200.000",
            "Sistema medición": "$150.000 - $400.000",
            "Certificación": "$50.000 - $100.000"
        },
        reseñas: [
            { cliente: "Edificio Nuevo", comentario: "Instalación de medidores perfecta", calificacion: 5 },
            { cliente: "Casa", comentario: "Muy profesional y rápido", calificacion: 5 }
        ]
    },
    {
        id: 98,
        nombre: "José Morales Torres",
        especialidad: "Contadores",
        experiencia: 9,
        calificacion: 4.6,
        totalReseñas: 134,
        tarifaPorHora: 35000,
        avatar: "https://randomuser.me/api/portraits/men/88.jpg",
        certificado: "Técnico Medidores Agua, Especialista Redes",
        biografia: "Técnico especializado en medidores de agua y sistemas de redes hídricas.",
        servicios: ["Medidores agua", "Redes hídricas", "Instalación medidores", "Lectura medidores"],
        tareasRealizadas: 189,
        disponibilidad: "Lun-Sáb 8:30-17:30",
        preciosAprox: {
            "Medidor agua": "$60.000 - $150.000",
            "Red hídrica": "$200.000 - $500.000",
            "Instalación": "$40.000 - $100.000"
        },
        reseñas: [
            { cliente: "Condominio", comentario: "Medidores funcionando perfecto", calificacion: 4 },
            { cliente: "Casa Nueva", comentario: "Instalación muy profesional", calificacion: 5 }
        ]
    },
    {
        id: 99,
        nombre: "Ricardo Herrera López",
        especialidad: "Contadores",
        experiencia: 11,
        calificacion: 4.7,
        totalReseñas: 156,
        tarifaPorHora: 38000,
        avatar: "https://randomuser.me/api/portraits/men/89.jpg",
        certificado: "Especialista Medidores Gas",
        biografia: "Especialista en medidores de gas y sistemas de control de consumo.",
        servicios: ["Medidores gas", "Control consumo", "Sistemas inteligentes", "Telemetría"],
        tareasRealizadas: 123,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Medidor gas": "$100.000 - $250.000",
            "Sistema inteligente": "$200.000 - $500.000",
            "Telemetría": "$150.000 - $400.000"
        },
        reseñas: [
            { cliente: "Edificio Moderno", comentario: "Sistema de gas inteligente", calificacion: 5 },
            { cliente: "Complex Residencial", comentario: "Telemetría funcionando perfecto", calificacion: 4 }
        ]
    },
    {
        id: 100,
        nombre: "Manuel Castro Vega",
        especialidad: "Contadores",
        experiencia: 7,
        calificacion: 4.4,
        totalReseñas: 98,
        tarifaPorHora: 32000,
        avatar: "https://randomuser.me/api/portraits/men/90.jpg",
        certificado: "Técnico Medidores Digitales",
        biografia: "Técnico especializado en medidores digitales y sistemas de nueva generación.",
        servicios: ["Medidores digitales", "Sistemas nuevos", "Actualización medidores", "Configuración"],
        tareasRealizadas: 167,
        disponibilidad: "Lun-Sáb 9:00-17:00",
        preciosAprox: {
            "Medidor digital": "$120.000 - $300.000",
            "Actualización": "$80.000 - $200.000",
            "Configuración": "$40.000 - $100.000"
        },
        reseñas: [
            { cliente: "Casa Inteligente", comentario: "Medidores digitales perfectos", calificacion: 4 },
            { cliente: "Oficina", comentario: "Actualización muy exitosa", calificacion: 5 }
        ]
    },
    {
        id: 101,
        nombre: "Diego Torres Silva",
        especialidad: "Contadores",
        experiencia: 8,
        calificacion: 4.5,
        totalReseñas: 112,
        tarifaPorHora: 33000,
        avatar: "https://randomuser.me/api/portraits/men/91.jpg",
        certificado: "Técnico Medidores Industriales",
        biografia: "Técnico especializado en medidores industriales y sistemas de gran escala.",
        servicios: ["Medidores industriales", "Gran escala", "Fábricas", "Monitoreo continuo"],
        tareasRealizadas: 89,
        disponibilidad: "Lun-Vie 7:30-16:30",
        preciosAprox: {
            "Medidor industrial": "$300.000 - $800.000",
            "Sistema gran escala": "$500.000+",
            "Monitoreo continuo": "$200.000 - $600.000"
        },
        reseñas: [
            { cliente: "Fábrica", comentario: "Medidores industriales funcionando bien", calificacion: 4 },
            { cliente: "Planta", comentario: "Monitoreo muy preciso", calificacion: 5 }
        ]
    },
    {
        id: 102,
        nombre: "Claudio López Castro",
        especialidad: "Contadores",
        experiencia: 10,
        calificacion: 4.6,
        totalReseñas: 145,
        tarifaPorHora: 36000,
        avatar: "https://randomuser.me/api/portraits/men/92.jpg",
        certificado: "Especialista Calibración Medidores",
        biografia: "Especialista en calibración y certificación de medidores de precisión.",
        servicios: ["Calibración medidores", "Certificación precisión", "Mantención técnica", "Verificaciones"],
        tareasRealizadas: 178,
        disponibilidad: "Lun-Vie 8:30-16:30",
        preciosAprox: {
            "Calibración": "$60.000 - $150.000",
            "Certificación": "$80.000 - $200.000",
            "Verificación": "$40.000 - $100.000"
        },
        reseñas: [
            { cliente: "Laboratorio", comentario: "Calibración muy precisa", calificacion: 5 },
            { cliente: "Empresa", comentario: "Certificaciones en orden", calificacion: 4 }
        ]
    },
    {
        id: 103,
        nombre: "Rodrigo Silva Torres",
        especialidad: "Contadores",
        experiencia: 6,
        calificacion: 4.3,
        totalReseñas: 87,
        tarifaPorHora: 28000,
        avatar: "https://randomuser.me/api/portraits/men/93.jpg",
        certificado: "Técnico Lectura Medidores",
        biografia: "Técnico especializado en lectura de medidores y servicios básicos.",
        servicios: ["Lectura medidores", "Servicios básicos", "Revisiones rutinarias", "Reportes"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Sáb 8:00-18:00",
        preciosAprox: {
            "Lectura medidores": "$15.000 - $30.000",
            "Revisión rutinaria": "$20.000 - $40.000",
            "Reporte": "$25.000 - $50.000"
        },
        reseñas: [
            { cliente: "Condominio", comentario: "Lecturas siempre puntuales", calificacion: 4 },
            { cliente: "Empresa", comentario: "Reportes muy ordenados", calificacion: 4 }
        ]
    },

    // ===== ELECTRICIDAD ADICIONALES (4 profesionales más) =====
    {
        id: 104,
        nombre: "Hugo Ramírez Silva",
        especialidad: "Electricidad",
        experiencia: 9,
        calificacion: 4.6,
        totalReseñas: 145,
        tarifaPorHora: 36000,
        avatar: "https://randomuser.me/api/portraits/men/94.jpg",
        certificado: "Electricista Industrial, Especialista Motores",
        biografia: "Electricista especializado en instalaciones industriales y sistemas de motores.",
        servicios: ["Electricidad industrial", "Motores eléctricos", "Tableros control", "Mantenimiento"],
        tareasRealizadas: 123,
        disponibilidad: "Lun-Vie 7:30-16:30",
        preciosAprox: {
            "Instalación industrial": "$200.000 - $800.000",
            "Motor eléctrico": "$150.000 - $500.000",
            "Tablero control": "$300.000 - $1.200.000"
        },
        reseñas: [
            { cliente: "Fábrica", comentario: "Instalación industrial perfecta", calificacion: 5 },
            { cliente: "Taller", comentario: "Motores funcionando excelente", calificacion: 4 }
        ]
    },
    {
        id: 105,
        nombre: "Pablo González Torres",
        especialidad: "Electricidad",
        experiencia: 7,
        calificacion: 4.4,
        totalReseñas: 98,
        tarifaPorHora: 32000,
        avatar: "https://randomuser.me/api/portraits/men/95.jpg",
        certificado: "Electricista Domiciliario, Certificado SEC",
        biografia: "Electricista domiciliario con amplia experiencia en casas y departamentos.",
        servicios: ["Electricidad domiciliaria", "Enchufes", "Interruptores", "Ampliaciones"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Sáb 8:00-18:00",
        preciosAprox: {
            "Enchufe nuevo": "$15.000 - $30.000",
            "Interruptor": "$12.000 - $25.000",
            "Ampliación": "$80.000 - $200.000"
        },
        reseñas: [
            { cliente: "Casa", comentario: "Instalaciones domiciliarias perfectas", calificacion: 4 },
            { cliente: "Departamento", comentario: "Muy ordenado y limpio", calificacion: 5 }
        ]
    },
    {
        id: 106,
        nombre: "Sebastián López Castro",
        especialidad: "Electricidad",
        experiencia: 11,
        calificacion: 4.7,
        totalReseñas: 167,
        tarifaPorHora: 39000,
        avatar: "https://randomuser.me/api/portraits/men/96.jpg",
        certificado: "Especialista Automatización, PLC",
        biografia: "Especialista en automatización industrial y programación de PLCs.",
        servicios: ["Automatización", "PLC", "Sistemas control", "Robótica básica"],
        tareasRealizadas: 89,
        disponibilidad: "Lun-Vie 8:30-16:30",
        preciosAprox: {
            "Sistema automatización": "$500.000 - $2.000.000",
            "Programación PLC": "$200.000 - $800.000",
            "Control industrial": "$300.000 - $1.200.000"
        },
        reseñas: [
            { cliente: "Fábrica Alimentos", comentario: "Automatización funcionando perfecto", calificacion: 5 },
            { cliente: "Planta Industrial", comentario: "PLCs programados excelente", calificacion: 4 }
        ]
    },
    {
        id: 107,
        nombre: "Cristián Torres López",
        especialidad: "Electricidad",
        experiencia: 6,
        calificacion: 4.3,
        totalReseñas: 87,
        tarifaPorHora: 28000,
        avatar: "https://randomuser.me/api/portraits/men/97.jpg",
        certificado: "Electricista Automotriz",
        biografia: "Electricista especializado en sistemas eléctricos automotrices.",
        servicios: ["Electricidad automotriz", "Sistemas auto", "Baterías", "Alternadores"],
        tareasRealizadas: 189,
        disponibilidad: "Lun-Sáb 9:00-18:00",
        preciosAprox: {
            "Sistema automotriz": "$50.000 - $200.000",
            "Batería": "$30.000 - $80.000",
            "Alternador": "$80.000 - $300.000"
        },
        reseñas: [
            { cliente: "Taller Mecánico", comentario: "Excelente con autos eléctricos", calificacion: 4 },
            { cliente: "Particular", comentario: "Arregló sistema perfecto", calificacion: 4 }
        ]
    },

    // ===== CLIMATIZACIÓN ADICIONALES (4 profesionales más) =====
    {
        id: 108,
        nombre: "Marcelo Silva Torres",
        especialidad: "Climatización",
        experiencia: 10,
        calificacion: 4.6,
        totalReseñas: 156,
        tarifaPorHora: 38000,
        avatar: "https://randomuser.me/api/portraits/men/98.jpg",
        certificado: "Técnico Refrigeración, Especialista R410A",
        biografia: "Técnico en refrigeración especializado en aires acondicionados residenciales.",
        servicios: ["Aires acondicionados", "Refrigeración", "Gas R410A", "Split"],
        tareasRealizadas: 134,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Aire split": "$300.000 - $800.000",
            "Refrigeración": "$200.000 - $600.000",
            "Mantención": "$40.000 - $100.000"
        },
        reseñas: [
            { cliente: "Casa", comentario: "Aire funcionando perfecto", calificacion: 5 },
            { cliente: "Oficina", comentario: "Instalación muy profesional", calificacion: 4 }
        ]
    },
    {
        id: 109,
        nombre: "Gonzalo Castro López",
        especialidad: "Climatización",
        experiencia: 8,
        calificacion: 4.4,
        totalReseñas: 112,
        tarifaPorHora: 34000,
        avatar: "https://randomuser.me/api/portraits/men/99.jpg",
        certificado: "Especialista Calefacción Central",
        biografia: "Especialista en sistemas de calefacción central para edificios.",
        servicios: ["Calefacción central", "Calderas", "Radiadores", "Ductos"],
        tareasRealizadas: 98,
        disponibilidad: "Lun-Sáb 8:30-17:30",
        preciosAprox: {
            "Calefacción central": "$800.000 - $3.000.000",
            "Caldera": "$600.000 - $2.000.000",
            "Radiadores": "$150.000 - $400.000"
        },
        reseñas: [
            { cliente: "Edificio", comentario: "Calefacción funcionando excelente", calificacion: 4 },
            { cliente: "Casa Grande", comentario: "Sistema muy eficiente", calificacion: 5 }
        ]
    },
    {
        id: 110,
        nombre: "Francisco López Silva",
        especialidad: "Climatización",
        experiencia: 12,
        calificacion: 4.8,
        totalReseñas: 189,
        tarifaPorHora: 42000,
        avatar: "https://randomuser.me/api/portraits/men/100.jpg",
        certificado: "Especialista HVAC, Certificación Internacional",
        biografia: "Especialista en sistemas HVAC completos para proyectos comerciales.",
        servicios: ["HVAC completo", "Ventilación", "Climatización comercial", "Eficiencia energética"],
        tareasRealizadas: 67,
        disponibilidad: "Lun-Vie 8:00-16:00",
        preciosAprox: {
            "Sistema HVAC": "$2.000.000 - $8.000.000",
            "Ventilación": "$500.000 - $2.000.000",
            "Proyecto comercial": "$1.500.000+"
        },
        reseñas: [
            { cliente: "Mall", comentario: "Sistema HVAC funcionando perfecto", calificacion: 5 },
            { cliente: "Hotel", comentario: "Climatización muy eficiente", calificacion: 5 }
        ]
    },
    {
        id: 111,
        nombre: "Álvaro Torres Castro",
        especialidad: "Climatización",
        experiencia: 5,
        calificacion: 4.2,
        totalReseñas: 76,
        tarifaPorHora: 26000,
        avatar: "https://randomuser.me/api/portraits/men/101.jpg",
        certificado: "Técnico Ventilación, Especialista Extractores",
        biografia: "Técnico especializado en ventilación y sistemas de extracción.",
        servicios: ["Ventilación", "Extractores", "Campanas", "Purificadores"],
        tareasRealizadas: 167,
        disponibilidad: "Lun-Sáb 9:00-18:00",
        preciosAprox: {
            "Extractor": "$80.000 - $200.000",
            "Campana": "$150.000 - $400.000",
            "Sistema ventilación": "$200.000 - $800.000"
        },
        reseñas: [
            { cliente: "Cocina", comentario: "Campana funcionando excelente", calificacion: 4 },
            { cliente: "Baño", comentario: "Extractor muy silencioso", calificacion: 4 }
        ]
    }
];

// Servicios disponibles
const initialServices = [
    {
        id: 1,
        codigo: "PLOM001",
        nombre: "Plomería Residencial",
        descripcion: "Reparaciones e instalaciones de plomería para el hogar",
        categoria: "Plomería",
        precioDesde: 25000,
        precioHasta: 200000,
        imagen: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
        profesionalesDisponibles: 10,
        tiempoRespuesta: "2 - 4 hrs"
    },
    {
        id: 2,
        codigo: "GASF001", 
        nombre: "Gasfitería Certificada",
        descripcion: "Instalaciones y reparaciones de gas con certificación SEC",
        categoria: "Gasfitería",
        precioDesde: 50000,
        precioHasta: 400000,
        imagen: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
        profesionalesDisponibles: 10,
        tiempoRespuesta: "1 - 3 hrs"
    },
    {
        id: 3,
        codigo: "ELEC001",
        nombre: "Electricidad Domiciliaria",
        descripcion: "Instalaciones eléctricas, automatización y sistemas inteligentes",
        categoria: "Electricidad", 
        precioDesde: 25000,
        precioHasta: 500000,
        imagen: "https://images.unsplash.com/photo-1635274250950-fab8fb6d3bfb?w=400&h=300&fit=crop",
        profesionalesDisponibles: 10,
        tiempoRespuesta: "2 - 6 hrs"
    },
    {
        id: 4,
        codigo: "CLIM001",
        nombre: "Climatización",
        descripcion: "Aire acondicionado, calefacción y sistemas de climatización",
        categoria: "Climatización",
        precioDesde: 35000,
        precioHasta: 800000,
        imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
        profesionalesDisponibles: 10,
        tiempoRespuesta: "1 - 4 hrs"
    },
    {
        id: 5,
        codigo: "REFR001",
        nombre: "Refrigeración",
        descripcion: "Reparación de refrigeradores, cámaras de frío y equipos comerciales",
        categoria: "Refrigeración",
        precioDesde: 30000,
        precioHasta: 300000,
        imagen: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
        profesionalesDisponibles: 10,
        tiempoRespuesta: "2 - 5 hrs"
    },
    {
        id: 6,
        codigo: "ELDO001",
        nombre: "Reparación Electrodomésticos",
        descripcion: "Reparación de lavadoras, refrigeradores, microondas y línea blanca",
        categoria: "Electrodomésticos",
        precioDesde: 25000,
        precioHasta: 250000,
        imagen: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop",
        profesionalesDisponibles: 10,
        tiempoRespuesta: "1 - 3 hrs"
    },
    {
        id: 7,
        codigo: "CALC001",
        nombre: "Calefón y Calderas",
        descripcion: "Instalación y reparación de calefones, calderas y sistemas térmicos",
        categoria: "Calefón y Calderas",
        precioDesde: 40000,
        precioHasta: 600000,
        imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        profesionalesDisponibles: 10,
        tiempoRespuesta: "2 - 4 hrs"
    },
    {
        id: 8,
        codigo: "CARP001",
        nombre: "Carpintería",
        descripcion: "Muebles, reparaciones, cocinas integrales y trabajos en madera",
        categoria: "Carpintería",
        precioDesde: 50000,
        precioHasta: 2000000,
        imagen: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&fit=crop",
        profesionalesDisponibles: 10,
        tiempoRespuesta: "1 - 2 días"
    },
    {
        id: 9,
        codigo: "CONS001",
        nombre: "Construcción y Remodelaciones",
        descripcion: "Albañilería, remodelaciones, ampliaciones y construcción general",
        categoria: "Construcción",
        precioDesde: 100000,
        precioHasta: 5000000,
        imagen: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
        profesionalesDisponibles: 10,
        tiempoRespuesta: "1 - 3 días"
    },
    {
        id: 10,
        codigo: "CONT001",
        nombre: "Servicios Contables",
        descripcion: "Contabilidad, asesoría tributaria, declaraciones y consultorías",
        categoria: "Contadores",
        precioDesde: 80000,
        precioHasta: 500000,
        imagen: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
        profesionalesDisponibles: 10,
        tiempoRespuesta: "Inmediato - 24 hrs"
    }
];

// ===== FUNCIONES PRINCIPALES =====

// Función para inicializar la aplicación
function initApp() {
    console.log('Iniciando aplicación TEVP');
    
    // Cargar datos iniciales
    loadInitialData();
    
    // Verificar autenticación
    checkAuthStatus();
    
    // Obtener página actual
    const currentPage = getCurrentPage();
    
    console.log('Página actual:', currentPage);
    
    // Inicializar página específica
    switch(currentPage) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'productos.html':
            initProductsPage();
            break;
        case 'profesionales.html':
            initProfessionalsPage();
            break;
        case 'login.html':
            initLoginPage();
            enhanceLoginForm();
            break;
        default:
            console.log('Página no reconocida:', currentPage);
    }
    
    // Actualizar contador del carrito en todas las páginas
    updateCartCounter();
    
    // Inicializar carrito vacío
    cart = [];
    localStorage.setItem('tevp-cart', JSON.stringify(cart));
    console.log('Carrito inicializado vacío');
}

// Obtener página actual
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop();
    return page || 'index.html';
}

// Cargar datos iniciales
function loadInitialData() {
    console.log('Cargando datos iniciales...');
    
    // FORZAR ACTUALIZACIÓN - Limpiar datos anteriores
    localStorage.removeItem('tevp-professionals');
    localStorage.removeItem('tevp-services');
    console.log('Datos anteriores limpiados para forzar actualización');
    
    // Agregar timestamp para forzar recarga
    const updateTimestamp = new Date().toISOString();
    console.log('Timestamp de actualización:', updateTimestamp);
    
    // Cargar profesionales nuevos
    localStorage.setItem('tevp-professionals', JSON.stringify(initialProfessionals));
    localStorage.setItem('tevp-update-timestamp', updateTimestamp);
    console.log('Profesionales nuevos guardados en localStorage');
    
    // Cargar servicios nuevos
    localStorage.setItem('tevp-services', JSON.stringify(initialServices));
    console.log('Servicios nuevos guardados en localStorage');
    
    // Cargar desde localStorage
    professionals = JSON.parse(localStorage.getItem('tevp-professionals')) || initialProfessionals;
    services = JSON.parse(localStorage.getItem('tevp-services')) || initialServices;
    
    // Actualizar variables globales
    window.professionals = professionals;
    window.services = services;
    window.cart = cart;
    
    console.log('Datos cargados:', professionals.length + ' profesionales, ' + services.length + ' servicios');
    
    // Debug: Mostrar profesionales por especialidad
    const profesionesPorEspecialidad = {};
    professionals.forEach(prof => {
        if (!profesionesPorEspecialidad[prof.especialidad]) {
            profesionesPorEspecialidad[prof.especialidad] = 0;
        }
        profesionesPorEspecialidad[prof.especialidad]++;
    });
    console.log('Profesionales por especialidad:', profesionesPorEspecialidad);
    
    console.log('Datos cargados:', { professionals: professionals.length, services: services.length });
}

// Verificar estado de autenticación
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    
    console.log('Estado auth:', { isLoggedIn, userRole, userName });
    
    updateAuthUI(isLoggedIn, userRole, userName);
}

// Actualizar UI de autenticación
function updateAuthUI(isLoggedIn, userRole, userName) {
    const loginBtn = document.getElementById('login-btn');
    const userInfo = document.getElementById('user-info');
    
    if (loginBtn && userInfo) {
        if (isLoggedIn && userName) {
            loginBtn.style.display = 'none';
            userInfo.style.display = 'block';
            userInfo.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i class="fas fa-user me-1"></i>${userName}
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#"><i class="fas fa-user me-2"></i>Mi Perfil</a></li>
                        <li><a class="dropdown-item" href="#"><i class="fas fa-shopping-cart me-2"></i>Mis Servicios</a></li>
                        ${userRole === 'admin' || userRole === 'vendedor' ? 
                            '<li><a class="dropdown-item" href="admin/' + (userRole === 'vendedor' ? 'dashboard-vendedor.html' : 'home.html') + '"><i class="fas fa-tachometer-alt me-2"></i>Panel de Control</a></li>' : ''
                        }
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Cerrar Sesión</a></li>
                    </ul>
                </div>
            `;
            console.log('UI actualizada para usuario logueado:', userName);
        } else {
            loginBtn.style.display = 'block';
            userInfo.style.display = 'none';
            console.log('UI actualizada para usuario no logueado');
        }
    }
}

// ===== FUNCIONES DE PÁGINA =====

// Inicializar página principal
function initHomePage() {
    console.log('Iniciando página principal');
    displayFeaturedServices();
    displayTopProfessionals();
}

// Mostrar servicios destacados
function displayFeaturedServices() {
    const container = document.getElementById('servicios-lista');
    if (!container) {
        console.log('Container servicios-lista no encontrado');
        return;
    }
    
    const featuredServices = services.slice(0, 6);
    console.log('Mostrando servicios destacados:', featuredServices.length);
    
    container.innerHTML = featuredServices.map(service => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 service-card">
                <img src="${service.imagen}" 
                     class="card-img-top" 
                     alt="${service.nombre}" 
                     style="height: 200px; object-fit: cover;"
                     onerror="this.src='https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop&crop=center'; console.log('Error loading image for ${service.nombre}');">
                <div class="card-body">
                    <h5 class="card-title">${service.nombre}</h5>
                    <p class="card-text">${service.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-${getColorForCategory(service.categoria)}">${service.categoria}</span>
                        <small class="text-muted">${service.profesionalesDisponibles} profesionales</small>
                    </div>
                    <div class="mt-2">
                        <strong>Desde $${service.precioDesde.toLocaleString()}</strong>
                        <small class="text-muted d-block">Tiempo: ${service.tiempoRespuesta}</small>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary w-100" onclick="viewServiceDetails(${service.id})">
                        Ver Profesionales
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Mostrar mejores profesionales
function displayTopProfessionals() {
    const container = document.getElementById('top-professionals');
    if (!container) {
        console.log('Container top-professionals no encontrado');
        return;
    }
    
    // Ordenar por calificación y mostrar top 6
    const topProfessionals = professionals
        .sort((a, b) => b.calificacion - a.calificacion)
        .slice(0, 6);
    
    console.log('Mostrando mejores profesionales:', topProfessionals.length);
    
    container.innerHTML = topProfessionals.map(professional => createProfessionalCard(professional)).join('');
}

// Crear tarjeta de profesional
function createProfessionalCard(professional) {
    const avgRating = professional.calificacion || 0;
    const totalReviews = professional.totalReseñas || 0;
    
    return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 professional-card">
                <div class="card-header text-center">
                    <img src="${professional.avatar}" alt="${professional.nombre}" 
                         class="rounded-circle mb-2" style="width: 80px; height: 80px; object-fit: cover;">
                    <h5 class="card-title mb-1">${professional.nombre}</h5>
                    <span class="badge bg-${getColorForCategory(professional.especialidad)} mb-2">${professional.especialidad}</span>
                </div>
                <div class="card-body">
                    <div class="rating mb-2">
                        ${generateStarRating(avgRating)}
                        <span class="ms-1">${avgRating} (${totalReviews} reseñas)</span>
                    </div>
                    <p class="card-text">
                        <small><strong>Experiencia:</strong> ${professional.experiencia} años</small><br>
                        <small><strong>Tarifa:</strong> $${professional.tarifaPorHora.toLocaleString()}/hora</small>
                    </p>
                    <p class="card-text text-truncate">${professional.biografia}</p>
                    
                    <!-- Mostrar mejores reseñas por defecto -->
                    <div class="recent-reviews mt-2">
                        ${professional.reseñas && professional.reseñas.length > 0 ? 
                            professional.reseñas.slice(0, 1).map(review => `
                                <div class="review-item small border-start border-primary ps-2 mb-1">
                                    <div class="d-flex justify-content-between">
                                        <strong>${review.cliente}</strong>
                                        <div>${generateStarRating(review.calificacion, 'sm')}</div>
                                    </div>
                                    <p class="mb-0 text-muted">"${review.comentario}"</p>
                                </div>
                            `).join('') : 
                            '<p class="text-muted small">Sin reseñas aún</p>'
                        }
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary w-100" onclick="viewProfessionalDetail(${professional.id})">
                        Ver Perfil Completo
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Generar estrellas de calificación
function generateStarRating(rating, size = '') {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    
    // Estrellas llenas
    for (let i = 0; i < fullStars; i++) {
        stars += `<i class="fas fa-star text-warning ${size}"></i>`;
    }
    
    // Media estrella
    if (halfStar) {
        stars += `<i class="fas fa-star-half-alt text-warning ${size}"></i>`;
    }
    
    // Estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
        stars += `<i class="far fa-star text-muted ${size}"></i>`;
    }
    
    return stars;
}

// Obtener color para categoría
function getColorForCategory(categoria) {
    const colors = {
        'Plomería': 'primary',
        'Gasfitería': 'info', 
        'Electricidad': 'warning',
        'Climatización': 'info',
        'Refrigeración': 'primary',
        'Electrodomésticos': 'success',
        'Calefón y Calderas': 'danger',
        'Carpintería': 'dark',
        'Construcción': 'secondary',
        'Contadores': 'info'
    };
    return colors[categoria] || 'primary';
}

// Inicializar página de servicios (productos)
function initProductsPage() {
    console.log('Iniciando página de servicios');
    displayAllServices();
    setupServiceFilters();
}

// Mostrar todos los servicios
function displayAllServices() {
    const container = document.querySelector('#products-container, #services-container, #services-grid');
    if (!container) {
        console.log('Container de servicios no encontrado');
        return;
    }
    
    console.log('Mostrando todos los servicios:', services.length);
    
    container.innerHTML = services.map(service => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 service-card">
                <img src="${service.imagen}" 
                     class="card-img-top" 
                     alt="${service.nombre}" 
                     style="height: 200px; object-fit: cover;"
                     onerror="this.src='https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop&crop=center'; console.log('Error loading image for ${service.nombre}');">
                <div class="card-body">
                    <h5 class="card-title">${service.nombre}</h5>
                    <p class="card-text">${service.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="badge bg-${getColorForCategory(service.categoria)}">${service.categoria}</span>
                        <small class="text-muted">${service.profesionalesDisponibles} profesionales</small>
                    </div>
                    <div class="mb-2">
                        <strong>$${service.precioDesde.toLocaleString()} - $${service.precioHasta.toLocaleString()}</strong>
                        <small class="text-muted d-block">Tiempo: ${service.tiempoRespuesta}</small>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary w-100" onclick="viewServiceDetails(${service.id})">
                        Ver Profesionales
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Configurar filtros de servicios
function setupServiceFilters() {
    // Agregar filtros por categoría si existen
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.innerHTML = `
            <option value="">Todas las categorías</option>
            ${serviceCategories.map(cat => 
                `<option value="${cat.nombre}">${cat.nombre}</option>`
            ).join('')}
        `;
        
        categoryFilter.addEventListener('change', filterServices);
    }
}

// Filtrar servicios
function filterServices() {
    const categoryFilter = document.getElementById('category-filter');
    const selectedCategory = categoryFilter?.value || '';
    
    let filteredServices = services;
    
    if (selectedCategory) {
        filteredServices = services.filter(service => 
            service.categoria === selectedCategory
        );
    }
    
    displayFilteredServices(filteredServices);
}

// Mostrar servicios filtrados
function displayFilteredServices(filteredServices) {
    const container = document.querySelector('#products-container, #services-container, #services-grid');
    if (!container) return;
    
    container.innerHTML = filteredServices.map(service => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 service-card">
                <img src="${service.imagen}" 
                     class="card-img-top" 
                     alt="${service.nombre}" 
                     style="height: 200px; object-fit: cover;"
                     onerror="this.src='https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop&crop=center'; console.log('Error loading image for ${service.nombre}');">
                <div class="card-body">
                    <h5 class="card-title">${service.nombre}</h5>
                    <p class="card-text">${service.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="badge bg-${getColorForCategory(service.categoria)}">${service.categoria}</span>
                        <small class="text-muted">${service.profesionalesDisponibles} profesionales</small>
                    </div>
                    <div class="mb-2">
                        <strong>$${service.precioDesde.toLocaleString()} - $${service.precioHasta.toLocaleString()}</strong>
                        <small class="text-muted d-block">Tiempo: ${service.tiempoRespuesta}</small>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary w-100" onclick="viewServiceDetails(${service.id})">
                        Ver Profesionales
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Ver detalles del servicio
function viewServiceDetails(serviceId) {
    console.log('Ver detalles del servicio:', serviceId);
    const service = services.find(s => s.id === serviceId);
    if (service) {
        // Redirigir a profesionales de esa categoría
        window.location.href = `profesionales.html?categoria=${encodeURIComponent(service.categoria)}`;
    }
}

// Hacer función global
window.viewServiceDetails = viewServiceDetails;

// Ver detalle del profesional
function viewProfessionalDetail(professionalId) {
    console.log('Ver detalle del profesional:', professionalId);
    // Aquí podrías abrir un modal o redirigir a una página de detalle
    alert('Funcionalidad de detalle del profesional en desarrollo');
}

// ===== FUNCIONES DE AUTENTICACIÓN =====

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
    console.log('Intentando autenticar:', email, 'Password length:', password.length);
    
    // Credenciales de administrador
    if (email === 'admin@tevp.cl' && password === 'admin123') {
        console.log('Login como admin detectado');
        loginSuccess({
            email: email,
            role: 'admin',
            name: 'Administrador TEVP'
        }, 'admin/home.html');
        return;
    }
    
    // Credenciales de vendedor
    if (email === 'vendedor@tevp.cl' && password === 'vend123') {
        console.log('Login como vendedor detectado');
        loginSuccess({
            email: email,
            role: 'vendedor',
            name: 'Vendedor TEVP'
        }, 'admin/dashboard-vendedor.html');
        return;
    }
    
    // Usuarios cliente predefinidos para pruebas
    const testClients = [
        { email: 'cliente@gmail.com', password: '1234', name: 'Juan Pérez' },
        { email: 'maria@duoc.cl', password: '1234', name: 'María González' },
        { email: 'carlos@gmail.com', password: '1234', name: 'Carlos Rodríguez' },
        { email: 'test@gmail.com', password: 'test', name: 'Usuario Prueba' }
    ];
    
    console.log('Buscando en clientes de prueba...');
    const testClient = testClients.find(c => c.email === email && c.password === password);
    if (testClient) {
        console.log('Cliente de prueba encontrado:', testClient.name);
        loginSuccess({
            email: testClient.email,
            role: 'cliente',
            name: testClient.name
        }, 'index.html');
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
function loginSuccessOriginal(userData, redirectUrl) {
    // Esta función fue reemplazada por una nueva versión más abajo
    console.log('Login exitoso (función original):', userData);
    
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userEmail', userData.email);
    
    showLoginSpinner(false);
    showAlert(`¡Bienvenido ${userData.name}!`, 'success');
    
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 1500);
}

// Funciones para mejorar formularios
function enhanceLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) {
        console.log('Formulario de login no encontrado');
        return;
    }

    console.log('Mejorando formulario de login');

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
        console.log('Formulario de login enviado - evento capturado');
        
        const email = emailInput?.value?.trim() || '';
        const password = passwordInput?.value || '';
        
        console.log('Datos del formulario:', { 
            email: email, 
            password: password ? '[PRESENTE - ' + password.length + ' chars]' : '[VACÍO]' 
        });
        
        // Limpiar errores previos
        clearAllErrors();
        
        // Validar campos
        let hasErrors = false;
        
        if (!validateEmail()) hasErrors = true;
        if (!validatePassword()) hasErrors = true;
        
        if (hasErrors) {
            console.log('Errores de validación encontrados');
            showAlert('Por favor, corrige los errores en el formulario', 'warning');
            return;
        }
        
        console.log('Validación pasada, iniciando autenticación...');
        
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
    
    return true;
}

// Funciones de utilidades
function showAlert(message, type = 'info') {
    console.log(`Alert [${type}]:`, message);
    
    // Crear elemento de alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${getBootstrapType(type)} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    
    alertDiv.innerHTML = `
        <i class="fas fa-${getAlertIcon(type)} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Agregar al body
    document.body.appendChild(alertDiv);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (alertDiv && alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 5000);
}

function getBootstrapType(type) {
    const typeMap = {
        'error': 'danger',
        'success': 'success',
        'warning': 'warning',
        'info': 'info'
    };
    return typeMap[type] || 'info';
}

function getAlertIcon(type) {
    const iconMap = {
        'error': 'exclamation-triangle',
        'success': 'check-circle',
        'warning': 'exclamation-circle',
        'info': 'info-circle'
    };
    return iconMap[type] || 'info-circle';
}

function showLoginSpinner(show) {
    const submitBtn = document.querySelector('#login-form button[type="submit"]');
    if (!submitBtn) return;
    
    if (show) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Iniciando sesión...';
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-sign-in-alt me-2"></i>Iniciar Sesión';
    }
}

function showFieldError(input, message) {
    console.log('Error de campo:', message);
    input.classList.add('is-invalid');
    
    // Crear o actualizar mensaje de error
    let errorDiv = input.parentNode.querySelector('.invalid-feedback');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        input.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

function clearFieldError(input) {
    if (input.target) input = input.target;
    input.classList.remove('is-invalid');
    
    const errorDiv = input.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function clearAllErrors() {
    document.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    document.querySelectorAll('.invalid-feedback').forEach(el => {
        el.remove();
    });
}

// Funciones de inicialización de páginas
function initLoginPage() {
    console.log('Iniciando página de login');
}

function initProfessionalsPage() {
    console.log('Iniciando página de profesionales');
    
    // Obtener categoría desde URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');
    
    console.log('Categoría seleccionada:', categoria);
    
    // Mostrar profesionales filtrados
    if (categoria) {
        displayProfessionalsByCategory(categoria);
    } else {
        displayAllProfessionals();
    }
}

// Mostrar todos los profesionales
function displayAllProfessionals() {
    const container = document.getElementById('professionals-container') || 
                      document.getElementById('professionals-grid') ||
                      document.getElementById('productos-lista');
    if (!container) {
        console.log('Container de profesionales no encontrado');
        return;
    }
    
    console.log('Mostrando todos los profesionales:', professionals.length);
    
    container.innerHTML = professionals.map(professional => createDetailedProfessionalCard(professional)).join('');
}

// Hacer función global
window.displayAllProfessionals = displayAllProfessionals;

// Mostrar profesionales por categoría
function displayProfessionalsByCategory(categoria) {
    const container = document.getElementById('professionals-container') || 
                      document.getElementById('professionals-grid') ||
                      document.getElementById('productos-lista');
    if (!container) {
        console.log('Container de profesionales no encontrado');
        return;
    }
    
    const filteredProfessionals = professionals.filter(p => p.especialidad === categoria);
    console.log(`Profesionales de ${categoria}:`, filteredProfessionals.length);
    
    // Actualizar título si existe
    const titleElement = document.getElementById('category-title') || document.getElementById('page-title');
    if (titleElement) {
        titleElement.textContent = `Profesionales de ${categoria}`;
    }
    
    // Actualizar descripción si existe
    const descElement = document.getElementById('category-description');
    if (descElement) {
        descElement.textContent = `${filteredProfessionals.length} profesionales especializados en ${categoria}`;
    }
    
    if (filteredProfessionals.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center">
                    <i class="fas fa-info-circle me-2"></i>
                    No hay profesionales disponibles en la categoría <strong>${categoria}</strong>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredProfessionals.map(professional => createDetailedProfessionalCard(professional)).join('');
}

// Hacer función global
window.displayProfessionalsByCategory = displayProfessionalsByCategory;

// Crear tarjeta detallada de profesional (para página de profesionales)
function createDetailedProfessionalCard(professional) {
    const avgRating = professional.calificacion || 0;
    const totalReviews = professional.totalReseñas || 0;
    
    return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 professional-card">
                <div class="card-header text-center">
                    <img src="${professional.avatar}" alt="${professional.nombre}" 
                         class="rounded-circle mb-3" style="width: 100px; height: 100px; object-fit: cover;">
                    <h5 class="card-title mb-1">${professional.nombre}</h5>
                    <span class="badge bg-${getColorForCategory(professional.especialidad)} mb-2">${professional.especialidad}</span>
                    <div class="rating mb-2">
                        ${generateStarRating(avgRating)}
                        <span class="ms-1 text-muted">${avgRating} (${totalReviews} reseñas)</span>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <small><strong>Experiencia:</strong></small>
                            <span class="badge bg-primary">${professional.experiencia} años</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <small><strong>Tarifa por hora:</strong></small>
                            <span class="price-highlight">$${professional.tarifaPorHora.toLocaleString()}</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <small><strong>Trabajos realizados:</strong></small>
                            <span class="badge bg-success">${professional.tareasRealizadas}</span>
                        </div>
                    </div>
                    
                    <p class="card-text small">${professional.biografia}</p>
                    
                    <div class="mb-3">
                        <strong class="small">Servicios:</strong>
                        <div class="mt-1">
                            ${professional.servicios.map(servicio => 
                                `<span class="badge bg-light text-dark me-1 mb-1">${servicio}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <strong class="small">Disponibilidad:</strong>
                        <p class="small text-muted mb-0">${professional.disponibilidad}</p>
                    </div>
                    
                    <!-- Reseñas recientes -->
                    ${professional.reseñas && professional.reseñas.length > 0 ? `
                        <div class="recent-reviews">
                            <strong class="small">Reseñas recientes:</strong>
                            ${professional.reseñas.slice(0, 2).map(review => `
                                <div class="review-item small border-start border-primary ps-2 mt-1 mb-2">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <strong>${review.cliente}</strong>
                                        <div class="rating-stars">${generateStarRating(review.calificacion, 'sm')}</div>
                                    </div>
                                    <p class="mb-0 text-muted fst-italic">"${review.comentario}"</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : '<p class="text-muted small">Sin reseñas aún</p>'}
                </div>
                <div class="card-footer">
                    <button class="btn btn-success w-100" onclick="hireProfessional(${professional.id})">
                        <i class="fas fa-handshake me-2"></i>Contratar Servicio
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Hacer función global
window.createDetailedProfessionalCard = createDetailedProfessionalCard;

// Contratar profesional (agregar al carrito)
function hireProfessional(professionalId) {
    console.log('=== CONTRATAR PROFESIONAL ===');
    console.log('ID del profesional:', professionalId);
    
    const professional = professionals.find(p => p.id === professionalId);
    if (!professional) {
        console.error('Profesional no encontrado:', professionalId);
        alert('Error: Profesional no encontrado');
        return;
    }
    
    console.log('Profesional encontrado:', professional.nombre);
    
    // Verificar si el usuario está logueado
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        console.log('Usuario no logueado - redirigiendo a login');
        showAlert('Debes iniciar sesión para contratar un servicio', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }
    
    console.log('Usuario logueado - procediendo a agregar al carrito');
    
    // Agregar al carrito
    const cartItem = {
        id: Date.now(), // ID único para el item del carrito
        professionalId: professional.id,
        professionalName: professional.nombre,
        service: professional.especialidad,
        price: professional.tarifaPorHora,
        rating: professional.calificacion,
        experience: professional.experiencia,
        avatar: professional.avatar,
        quantity: 1,
        date: new Date().toISOString()
    };
    
    console.log('Item creado para carrito:', cartItem);
    
    // Recargar carrito desde localStorage para asegurar sincronización
    cart = JSON.parse(localStorage.getItem('tevp-cart')) || [];
    console.log('Carrito actual antes de agregar:', cart);
    
    cart.push(cartItem);
    window.cart = cart; // Actualizar variable global
    localStorage.setItem('tevp-cart', JSON.stringify(cart));
    
    console.log('Carrito después de agregar:', cart);
    console.log('Item agregado exitosamente. Total items:', cart.length);
    
    showAlert(`${professional.nombre} agregado al carrito exitosamente!`, 'success');
    
    // Actualizar contador del carrito
    updateCartCounter();
    console.log('=== CONTRATACIÓN COMPLETADA ===');
}

// Hacer función global
window.hireProfessional = hireProfessional;

// Actualizar contador del carrito
function updateCartCounter() {
    const cartCounter = document.querySelector('.cart-count');
    if (cartCounter) {
        cartCounter.textContent = cart.length;
    }
}

// Cargar modal del carrito
function loadCartModal() {
    console.log('=== CARGANDO MODAL DEL CARRITO ===');
    console.log('Items en carrito:', cart.length);
    console.log('Contenido del carrito:', cart);
    
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (!cartItemsContainer) {
        console.error('ERROR: No se encontró el contenedor cart-items');
        alert('Error: No se encontró el contenedor del carrito');
        return;
    }
    
    console.log('Contenedor cart-items encontrado');
    
    // Limpiar contenido anterior
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        console.log('Carrito vacío - mostrando mensaje');
        cartItemsContainer.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">Tu carrito está vacío</h5>
                <p class="text-muted">Explora nuestros servicios y contrata profesionales</p>
                <a href="productos.html" class="btn btn-primary">Ver Servicios</a>
            </div>
        `;
        
        if (cartTotalElement) {
            cartTotalElement.textContent = '$0';
        }
        console.log('Modal del carrito vacío configurado');
        return;
    }
    
    console.log('Mostrando', cart.length, 'items en el carrito');
    
    // Mostrar items del carrito
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        console.log(`Item ${index + 1}:`, item.professionalName, '-', item.service, '$' + item.price.toLocaleString());
        
        const cartItemHTML = `
            <div class="cart-item border-bottom py-3">
                <div class="row align-items-center">
                    <div class="col-md-2 text-center">
                        <img src="${item.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face'}" 
                             alt="${item.professionalName}" class="rounded-circle" style="width: 60px; height: 60px; object-fit: cover;">
                    </div>
                    <div class="col-md-6">
                        <h6 class="mb-1">${item.professionalName}</h6>
                        <p class="mb-1 text-muted">${item.service}</p>
                        <small class="text-muted">
                            <i class="fas fa-star text-warning"></i> ${item.rating || '4.5'} • 
                            ${item.experience || '5'} años de experiencia
                        </small>
                    </div>
                    <div class="col-md-3 text-end">
                        <h6 class="mb-0">$${item.price.toLocaleString()}</h6>
                        <small class="text-muted">Por proyecto</small>
                    </div>
                    <div class="col-md-1 text-end">
                        <button type="button" class="btn btn-sm btn-outline-danger" 
                                onclick="removeFromCart(${index})" title="Eliminar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        cartItemsContainer.innerHTML += cartItemHTML;
    });
    
    // Actualizar total
    if (cartTotalElement) {
        cartTotalElement.textContent = `$${total.toLocaleString()}`;
        console.log('Total del carrito:', '$' + total.toLocaleString());
    }
    
    console.log('=== MODAL DEL CARRITO CARGADO EXITOSAMENTE ===');
}

// Función para eliminar item del carrito
function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem('tevp-cart', JSON.stringify(cart));
        updateCartCounter();
        loadCartModal(); // Recargar el modal
        showAlert('Servicio eliminado del carrito', 'success');
    }
}

// ======= FUNCIONES DE PROCESO DE PAGO =======

// Función para proceder al pago
function proceedToPayment() {
    console.log('=== PROCEDIENDO AL PAGO ===');
    
    // Verificar que el usuario esté logueado
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        showAlert('Debes iniciar sesión para proceder al pago', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }
    
    // Verificar que haya items en el carrito
    if (cart.length === 0) {
        showAlert('Tu carrito está vacío. Agrega servicios antes de proceder al pago.', 'warning');
        return;
    }
    
    console.log('Procediendo al pago con', cart.length, 'servicios');
    
    // Cerrar el modal del carrito
    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    if (cartModal) {
        cartModal.hide();
    }
    
    // Crear página de pago dinámicamente
    createPaymentPage();
}

// Función para crear la página de pago
function createPaymentPage() {
    console.log('Creando página de pago...');
    
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Crear HTML de la página de pago
    const paymentHTML = `
        <div class="container my-5">
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header bg-primary text-white">
                            <h4><i class="fas fa-credit-card me-2"></i>Proceso de Pago</h4>
                        </div>
                        <div class="card-body">
                            <form id="payment-form">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h5>Información Personal</h5>
                                        <div class="mb-3">
                                            <label class="form-label">Nombre Completo</label>
                                            <input type="text" class="form-control" value="${userName}" readonly>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Email</label>
                                            <input type="email" class="form-control" value="${userEmail}" readonly>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Teléfono *</label>
                                            <input type="tel" class="form-control" required placeholder="Ej: +56 9 1234 5678">
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Dirección del Servicio *</label>
                                            <textarea class="form-control" required placeholder="Dirección donde se realizará el servicio"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <h5>Método de Pago</h5>
                                        <div class="mb-3">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="paymentMethod" value="card" checked>
                                                <label class="form-check-label">
                                                    <i class="fas fa-credit-card me-2"></i>Tarjeta de Crédito/Débito
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="paymentMethod" value="transfer">
                                                <label class="form-check-label">
                                                    <i class="fas fa-university me-2"></i>Transferencia Bancaria
                                                </label>
                                            </div>
                                        </div>
                                        <div id="card-details">
                                            <div class="mb-3">
                                                <label class="form-label">Número de Tarjeta *</label>
                                                <input type="text" id="card-number" class="form-control" placeholder="1234 5678 9012 3456" maxlength="19" required>
                                            </div>
                                            <div class="row">
                                                <div class="col-6">
                                                    <label class="form-label">Vencimiento *</label>
                                                    <input type="text" id="card-expiry" class="form-control" placeholder="03/30" maxlength="5" required>
                                                </div>
                                                <div class="col-6">
                                                    <label class="form-label">CVV *</label>
                                                    <input type="text" id="card-cvv" class="form-control" placeholder="123" maxlength="4" required>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div class="d-flex justify-content-between">
                                    <button type="button" class="btn btn-secondary" onclick="goBackToCart()">
                                        <i class="fas fa-arrow-left me-2"></i>Volver al Carrito
                                    </button>
                                    <button type="submit" class="btn btn-success btn-lg">
                                        <i class="fas fa-check me-2"></i>Confirmar Pago ($${total.toLocaleString()})
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h5><i class="fas fa-receipt me-2"></i>Resumen del Pedido</h5>
                        </div>
                        <div class="card-body">
                            ${cart.map(item => `
                                <div class="d-flex justify-content-between mb-2">
                                    <div>
                                        <strong>${item.professionalName}</strong><br>
                                        <small class="text-muted">${item.service}</small>
                                    </div>
                                    <div class="text-end">
                                        $${item.price.toLocaleString()}
                                    </div>
                                </div>
                                <hr>
                            `).join('')}
                            <div class="d-flex justify-content-between">
                                <strong>Total:</strong>
                                <strong class="text-primary">$${total.toLocaleString()}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Mostrar en un nuevo modal
    showPaymentModal(paymentHTML);
}

// Función para mostrar el modal de pago
function showPaymentModal(paymentHTML) {
    // Crear modal dinámico
    const modalHTML = `
        <div class="modal fade" id="paymentModal" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-credit-card me-2"></i>Proceso de Pago - TEVP
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body p-0">
                        ${paymentHTML}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Agregar modal al DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Mostrar modal
    const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
    paymentModal.show();
    
    // Agregar evento para el formulario
    document.getElementById('payment-form').addEventListener('submit', handlePaymentSubmit);
    
    // Agregar formato automático para campos de tarjeta
    setupCardFormatting();
}

// Función para manejar el envío del pago
function handlePaymentSubmit(e) {
    e.preventDefault();
    
    console.log('Procesando pago...');
    showAlert('Procesando pago...', 'info');
    
    // Capturar datos del formulario
    const formData = new FormData(e.target);
    const paymentData = {
        phone: e.target.querySelector('input[type="tel"]').value,
        address: e.target.querySelector('textarea').value,
        cardNumber: document.getElementById('card-number').value,
        cardExpiry: document.getElementById('card-expiry').value,
        paymentMethod: e.target.querySelector('input[name="paymentMethod"]:checked').value,
        timestamp: new Date(),
        services: [...cart],
        total: cart.reduce((sum, item) => sum + item.price, 0),
        userName: localStorage.getItem('userName'),
        userEmail: localStorage.getItem('userEmail')
    };
    
    // Simular procesamiento de pago
    setTimeout(() => {
        // Cerrar modal de pago
        const paymentModal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
        if (paymentModal) {
            paymentModal.hide();
        }
        
        // Generar comprobante de pago
        generatePaymentReceipt(paymentData);
        
        // Limpiar carrito después del pago exitoso
        cart = [];
        localStorage.setItem('tevp-cart', JSON.stringify(cart));
        updateCartCounter();
        
        console.log('Pago completado y carrito limpiado');
    }, 2000);
}

// Función para generar comprobante de pago
function generatePaymentReceipt(paymentData) {
    console.log('Generando comprobante de pago...');
    
    const receiptNumber = 'TEVP-' + Date.now();
    const currentDate = new Date().toLocaleDateString('es-CL');
    const currentTime = new Date().toLocaleTimeString('es-CL');
    
    const receiptHTML = `
        <div class="receipt-container" style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <div class="receipt-header text-center mb-4">
                <h2 class="text-primary"><i class="fas fa-tools me-2"></i>TEVP</h2>
                <h4>Comprobante de Pago</h4>
                <p class="text-muted">Servicios Técnicos y de Reparación</p>
            </div>
            
            <div class="receipt-info mb-4">
                <div class="row">
                    <div class="col-6">
                        <strong>Número de Transacción:</strong><br>
                        ${receiptNumber}
                    </div>
                    <div class="col-6 text-end">
                        <strong>Fecha:</strong><br>
                        ${currentDate} - ${currentTime}
                    </div>
                </div>
            </div>
            
            <div class="customer-info mb-4">
                <h5><i class="fas fa-user me-2"></i>Información del Cliente</h5>
                <div class="row">
                    <div class="col-6">
                        <strong>Nombre:</strong> ${paymentData.userName}<br>
                        <strong>Email:</strong> ${paymentData.userEmail}
                    </div>
                    <div class="col-6">
                        <strong>Teléfono:</strong> ${paymentData.phone}<br>
                        <strong>Dirección del Servicio:</strong><br>
                        ${paymentData.address}
                    </div>
                </div>
            </div>
            
            <div class="services-info mb-4">
                <h5><i class="fas fa-list me-2"></i>Servicios Contratados</h5>
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead class="table-light">
                            <tr>
                                <th>Profesional</th>
                                <th>Especialidad</th>
                                <th>Calificación</th>
                                <th class="text-end">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${paymentData.services.map(service => `
                                <tr>
                                    <td>${service.professionalName}</td>
                                    <td>${service.service}</td>
                                    <td>
                                        <i class="fas fa-star text-warning"></i> ${service.rating || '4.5'}
                                    </td>
                                    <td class="text-end">$${service.price.toLocaleString()}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot class="table-dark">
                            <tr>
                                <th colspan="3" class="text-end">TOTAL:</th>
                                <th class="text-end">$${paymentData.total.toLocaleString()}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            
            <div class="payment-info mb-4">
                <h5><i class="fas fa-credit-card me-2"></i>Información de Pago</h5>
                <div class="row">
                    <div class="col-6">
                        <strong>Método de Pago:</strong><br>
                        ${paymentData.paymentMethod === 'card' ? 
                            '<i class="fas fa-credit-card me-1"></i>Tarjeta de Crédito/Débito' : 
                            '<i class="fas fa-university me-1"></i>Transferencia Bancaria'}
                    </div>
                    <div class="col-6">
                        ${paymentData.paymentMethod === 'card' ? 
                            `<strong>Tarjeta:</strong><br>****${paymentData.cardNumber.slice(-4)}` : 
                            '<strong>Estado:</strong><br>Pendiente confirmación'}
                    </div>
                </div>
            </div>
            
            <div class="receipt-footer text-center">
                <div class="alert alert-success">
                    <i class="fas fa-check-circle me-2"></i>
                    <strong>¡Pago Procesado Exitosamente!</strong>
                </div>
                <p class="text-muted small mb-4">
                    Te contactaremos pronto para coordinar la fecha y hora del servicio.<br>
                    Guarda este comprobante para tus registros.
                </p>
                <div class="d-flex justify-content-center gap-2">
                    <button class="btn btn-primary" onclick="printReceipt()">
                        <i class="fas fa-print me-2"></i>Imprimir
                    </button>
                    <button class="btn btn-success" onclick="downloadReceipt()">
                        <i class="fas fa-download me-2"></i>Descargar
                    </button>
                    <button class="btn btn-secondary" onclick="closeReceipt()">
                        <i class="fas fa-times me-2"></i>Cerrar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Mostrar comprobante en modal
    showReceiptModal(receiptHTML);
}

// Función para mostrar el modal del comprobante
function showReceiptModal(receiptHTML) {
    const receiptModalHTML = `
        <div class="modal fade" id="receiptModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-receipt me-2"></i>Comprobante de Pago - TEVP
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body" id="receipt-content">
                        ${receiptHTML}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal anterior si existe
    const existingModal = document.getElementById('receiptModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar nuevo modal al DOM
    document.body.insertAdjacentHTML('beforeend', receiptModalHTML);
    
    // Mostrar modal
    const receiptModal = new bootstrap.Modal(document.getElementById('receiptModal'));
    receiptModal.show();
}

// Funciones para el comprobante
function printReceipt() {
    const receiptContent = document.getElementById('receipt-content').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
        <html>
            <head>
                <title>Comprobante TEVP</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            </head>
            <body>
                ${receiptContent}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function downloadReceipt() {
    showAlert('Función de descarga será implementada próximamente', 'info');
}

function closeReceipt() {
    const receiptModal = bootstrap.Modal.getInstance(document.getElementById('receiptModal'));
    if (receiptModal) {
        receiptModal.hide();
    }
}

// Función para volver al carrito
function goBackToCart() {
    const paymentModal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
    if (paymentModal) {
        paymentModal.hide();
    }
    
    // Mostrar modal del carrito nuevamente
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    loadCartModal();
    cartModal.show();
}

// Función para configurar el formato automático de campos de tarjeta
function setupCardFormatting() {
    console.log('Configurando formato de tarjeta...');
    
    // Formato para número de tarjeta (XXXX XXXX XXXX XXXX)
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            if (formattedValue !== e.target.value) {
                e.target.value = formattedValue;
            }
        });
    }
    
    // Formato para fecha de vencimiento (MM/AA)
    const cardExpiryInput = document.getElementById('card-expiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Solo números
            
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            
            e.target.value = value;
        });
    }
    
    // Formato para CVV (solo números)
    const cardCvvInput = document.getElementById('card-cvv');
    if (cardCvvInput) {
        cardCvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }
}

// Hacer funciones de pago globalmente accesibles
window.proceedToPayment = proceedToPayment;
window.goBackToCart = goBackToCart;
window.handlePaymentSubmit = handlePaymentSubmit;
window.printReceipt = printReceipt;
window.downloadReceipt = downloadReceipt;
window.closeReceipt = closeReceipt;

// ======= FUNCIONES DE MANEJO DE USUARIO =======

// Función para mostrar información del usuario logueado
function updateUserInterface() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName');
    const userInfo = document.getElementById('user-info');
    const authRegister = document.getElementById('auth-link-register');
    const authLogin = document.getElementById('auth-link-login');
    const authLinks = document.getElementById('auth-links'); // Para compatibilidad con páginas que aún lo usen
    const userNameElement = document.getElementById('user-name');
    
    console.log('Actualizando interfaz de usuario:', { isLoggedIn, userName });
    console.log('Elementos encontrados:', { 
        userInfo: !!userInfo, 
        authRegister: !!authRegister, 
        authLogin: !!authLogin, 
        authLinks: !!authLinks,
        userNameElement: !!userNameElement 
    });
    
    if (isLoggedIn && userName) {
        // Usuario logueado - mostrar perfil
        if (userInfo) {
            userInfo.classList.remove('d-none');
            userInfo.style.display = 'block';
        }
        
        // Ocultar botones de auth (nuevo sistema)
        if (authRegister) authRegister.style.display = 'none';
        if (authLogin) authLogin.style.display = 'none';
        
        // Ocultar botones de auth (sistema anterior para compatibilidad)
        if (authLinks) authLinks.style.display = 'none';
        
        if (userNameElement) {
            userNameElement.textContent = userName;
        }
        console.log('Usuario logueado - mostrando perfil para:', userName);
    } else {
        // Usuario no logueado - mostrar enlaces de login/registro
        if (userInfo) {
            userInfo.classList.add('d-none');
            userInfo.style.display = 'none';
        }
        
        // Mostrar botones de auth (nuevo sistema)
        if (authRegister) authRegister.style.display = 'block';
        if (authLogin) authLogin.style.display = 'block';
        
        // Mostrar botones de auth (sistema anterior para compatibilidad)
        if (authLinks) authLinks.style.display = 'block';
        
        console.log('Usuario no logueado - mostrando enlaces de registro/login');
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    
    showAlert('Sesión cerrada correctamente', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Función para mostrar perfil del usuario
function showUserProfile() {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    showAlert(`Perfil de Usuario:\nNombre: ${userName}\nEmail: ${userEmail}`, 'info');
}

// Función para mostrar pedidos del usuario
function showUserOrders() {
    const cart = JSON.parse(localStorage.getItem('tevp-cart') || '[]');
    
    if (cart.length === 0) {
        showAlert('No tienes pedidos actualmente', 'info');
        return;
    }
    
    const ordersSummary = cart.map(item => 
        `• ${item.professionalName} - ${item.service}\n  Precio: $${item.price.toLocaleString()}`
    ).join('\n\n');
    
    showAlert(`Tus Pedidos Actuales:\n\n${ordersSummary}`, 'info');
}

// Función loginSuccess actualizada con interfaz de usuario
function loginSuccess(userData, redirectUrl) {
    console.log('=== LOGIN EXITOSO ===');
    console.log('Datos del usuario:', userData);
    
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userEmail', userData.email);
    
    showLoginSpinner(false);
    
    // Si estamos en la página de login, actualizar inmediatamente sin recargar
    const currentPage = getCurrentPage();
    if (currentPage === 'login.html') {
        showAlert(`¡Bienvenido ${userData.name}! Redirigiendo...`, 'success');
        
        // Actualizar interfaz inmediatamente
        setTimeout(() => {
            updateUserInterface();
        }, 100);
        
        // Redirigir después de actualizar la interfaz
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 1500);
    } else {
        // Si no estamos en login, actualizar interfaz sin redirigir
        showAlert(`¡Bienvenido ${userData.name}!`, 'success');
        updateUserInterface();
        console.log('Interfaz actualizada sin recarga');
    }
}

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, iniciando aplicación');
    
    // Actualizar avatares problemáticos con URLs más confiables
    updateProfessionalAvatars();
    
    initApp();
    updateUserInterface(); // Actualizar interfaz de usuario al cargar la página
});

// Función para actualizar avatares problemáticos
function updateProfessionalAvatars() {
    console.log('Actualizando avatares de profesionales...');
    
    // Mapeo de IDs a nuevos avatares confiables
    const avatarUpdates = {
        // Plomería
        1: "https://randomuser.me/api/portraits/men/12.jpg",
        2: "https://randomuser.me/api/portraits/men/25.jpg", 
        3: "https://randomuser.me/api/portraits/men/44.jpg",
        4: "https://randomuser.me/api/portraits/men/55.jpg",
        5: "https://randomuser.me/api/portraits/women/23.jpg",
        6: "https://randomuser.me/api/portraits/women/37.jpg",
        7: "https://randomuser.me/api/portraits/men/63.jpg",
        8: "https://randomuser.me/api/portraits/men/18.jpg",
        9: "https://randomuser.me/api/portraits/men/29.jpg",
        10: "https://randomuser.me/api/portraits/women/41.jpg",
        
        // Electricidad
        11: "https://randomuser.me/api/portraits/men/71.jpg",
        12: "https://randomuser.me/api/portraits/women/52.jpg",
        13: "https://randomuser.me/api/portraits/men/83.jpg",
        
        // Climatización
        14: "https://randomuser.me/api/portraits/men/32.jpg",
        15: "https://randomuser.me/api/portraits/women/45.jpg",
        16: "https://randomuser.me/api/portraits/men/67.jpg",
        
        // Construcción
        17: "https://randomuser.me/api/portraits/men/20.jpg",
        18: "https://randomuser.me/api/portraits/men/33.jpg",
        19: "https://randomuser.me/api/portraits/men/54.jpg",
        20: "https://randomuser.me/api/portraits/men/41.jpg",
        21: "https://randomuser.me/api/portraits/men/28.jpg",
        22: "https://randomuser.me/api/portraits/men/47.jpg",
        
        // Soldadura
        23: "https://randomuser.me/api/portraits/men/31.jpg",
        24: "https://randomuser.me/api/portraits/men/42.jpg",
        25: "https://randomuser.me/api/portraits/men/58.jpg",
        26: "https://randomuser.me/api/portraits/men/36.jpg",
        27: "https://randomuser.me/api/portraits/men/49.jpg",
        
        // Pintura
        28: "https://randomuser.me/api/portraits/men/21.jpg",
        29: "https://randomuser.me/api/portraits/men/34.jpg",
        30: "https://randomuser.me/api/portraits/men/45.jpg",
        31: "https://randomuser.me/api/portraits/men/29.jpg",
        32: "https://randomuser.me/api/portraits/men/52.jpg",
        33: "https://randomuser.me/api/portraits/men/38.jpg",
        
        // Jardinería
        34: "https://randomuser.me/api/portraits/men/26.jpg",
        35: "https://randomuser.me/api/portraits/men/43.jpg",
        36: "https://randomuser.me/api/portraits/men/37.jpg",
        37: "https://randomuser.me/api/portraits/men/50.jpg",
        38: "https://randomuser.me/api/portraits/men/41.jpg",
        74: "https://randomuser.me/api/portraits/men/58.jpg",
        75: "https://randomuser.me/api/portraits/men/27.jpg",
        
        // Limpieza
        39: "https://randomuser.me/api/portraits/women/24.jpg",
        40: "https://randomuser.me/api/portraits/women/35.jpg",
        41: "https://randomuser.me/api/portraits/women/42.jpg",
        42: "https://randomuser.me/api/portraits/women/28.jpg",
        43: "https://randomuser.me/api/portraits/women/31.jpg",
        44: "https://randomuser.me/api/portraits/women/39.jpg",
        45: "https://randomuser.me/api/portraits/women/46.jpg",
        
        // Seguridad
        46: "https://randomuser.me/api/portraits/men/22.jpg",
        47: "https://randomuser.me/api/portraits/men/53.jpg",
        48: "https://randomuser.me/api/portraits/men/61.jpg",
        49: "https://randomuser.me/api/portraits/men/35.jpg",
        50: "https://randomuser.me/api/portraits/men/44.jpg",
        51: "https://randomuser.me/api/portraits/men/48.jpg",
        52: "https://randomuser.me/api/portraits/men/57.jpg",
        
        // Electrodomésticos
        53: "https://randomuser.me/api/portraits/men/23.jpg",
        54: "https://randomuser.me/api/portraits/men/39.jpg",
        55: "https://randomuser.me/api/portraits/men/51.jpg",
        56: "https://randomuser.me/api/portraits/men/33.jpg",
        57: "https://randomuser.me/api/portraits/men/46.jpg",
        58: "https://randomuser.me/api/portraits/men/42.jpg",
        59: "https://randomuser.me/api/portraits/men/55.jpg",
        
        // Carpintería
        60: "https://randomuser.me/api/portraits/men/24.jpg",
        61: "https://randomuser.me/api/portraits/men/37.jpg",
        62: "https://randomuser.me/api/portraits/men/49.jpg",
        63: "https://randomuser.me/api/portraits/men/34.jpg",
        64: "https://randomuser.me/api/portraits/men/56.jpg",
        65: "https://randomuser.me/api/portraits/men/41.jpg",
        66: "https://randomuser.me/api/portraits/men/52.jpg",
        
        // Cerrajería
        67: "https://randomuser.me/api/portraits/men/25.jpg",
        68: "https://randomuser.me/api/portraits/men/38.jpg",
        69: "https://randomuser.me/api/portraits/men/43.jpg",
        70: "https://randomuser.me/api/portraits/men/31.jpg",
        71: "https://randomuser.me/api/portraits/men/47.jpg",
        72: "https://randomuser.me/api/portraits/men/54.jpg",
        73: "https://randomuser.me/api/portraits/men/36.jpg",
        
        // Gasfitería
        76: "https://randomuser.me/api/portraits/men/60.jpg",
        77: "https://randomuser.me/api/portraits/men/62.jpg",
        78: "https://randomuser.me/api/portraits/men/64.jpg",
        79: "https://randomuser.me/api/portraits/men/66.jpg",
        80: "https://randomuser.me/api/portraits/men/68.jpg",
        81: "https://randomuser.me/api/portraits/men/70.jpg",
        82: "https://randomuser.me/api/portraits/men/72.jpg",
        
        // Refrigeración
        83: "https://randomuser.me/api/portraits/men/74.jpg",
        84: "https://randomuser.me/api/portraits/men/76.jpg",
        85: "https://randomuser.me/api/portraits/men/78.jpg",
        86: "https://randomuser.me/api/portraits/men/80.jpg",
        87: "https://randomuser.me/api/portraits/men/82.jpg",
        88: "https://randomuser.me/api/portraits/men/84.jpg",
        89: "https://randomuser.me/api/portraits/men/86.jpg",
        
        // Calefón y Calderas
        90: "https://randomuser.me/api/portraits/men/80.jpg",
        91: "https://randomuser.me/api/portraits/men/81.jpg",
        92: "https://randomuser.me/api/portraits/men/82.jpg",
        93: "https://randomuser.me/api/portraits/men/83.jpg",
        94: "https://randomuser.me/api/portraits/men/84.jpg",
        95: "https://randomuser.me/api/portraits/men/85.jpg",
        96: "https://randomuser.me/api/portraits/men/86.jpg",
        
        // Contadores
        97: "https://randomuser.me/api/portraits/men/87.jpg",
        98: "https://randomuser.me/api/portraits/men/88.jpg",
        99: "https://randomuser.me/api/portraits/men/89.jpg",
        100: "https://randomuser.me/api/portraits/men/90.jpg",
        101: "https://randomuser.me/api/portraits/men/91.jpg",
        102: "https://randomuser.me/api/portraits/men/92.jpg",
        103: "https://randomuser.me/api/portraits/men/93.jpg",
        
        // Electricidad adicionales
        104: "https://randomuser.me/api/portraits/men/94.jpg",
        105: "https://randomuser.me/api/portraits/men/95.jpg",
        106: "https://randomuser.me/api/portraits/men/96.jpg",
        107: "https://randomuser.me/api/portraits/men/97.jpg",
        
        // Climatización adicionales
        108: "https://randomuser.me/api/portraits/men/98.jpg",
        109: "https://randomuser.me/api/portraits/men/99.jpg",
        110: "https://randomuser.me/api/portraits/men/100.jpg",
        111: "https://randomuser.me/api/portraits/men/101.jpg"
    };
    
    // Actualizar avatares en el array de profesionales
    professionals.forEach(professional => {
        if (avatarUpdates[professional.id]) {
            professional.avatar = avatarUpdates[professional.id];
        }
    });
    
    console.log('Avatares actualizados correctamente para', Object.keys(avatarUpdates).length, 'profesionales');
}