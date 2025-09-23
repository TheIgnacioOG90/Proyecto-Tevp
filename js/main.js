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
    { id: 2, nombre: "Gasfitería", icono: "fas fa-faucet", color: "info" },
    { id: 3, nombre: "Electricidad", icono: "fas fa-bolt", color: "warning" },
    { id: 4, nombre: "Climatización", icono: "fas fa-snowflake", color: "info" },
    { id: 5, nombre: "Refrigeración", icono: "fas fa-thermometer-empty", color: "primary" },
    { id: 6, nombre: "Electrodomésticos", icono: "fas fa-tv", color: "success" },
    { id: 7, nombre: "Calefón y Calderas", icono: "fas fa-fire", color: "danger" },
    { id: 8, nombre: "Carpintería", icono: "fas fa-hammer", color: "dark" },
    { id: 9, nombre: "Construcción", icono: "fas fa-hard-hat", color: "secondary" },
    { id: 10, nombre: "Contadores", icono: "fas fa-calculator", color: "info" }
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
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
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
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
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
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
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
        avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
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
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c6e19067?w=150&h=150&fit=crop&crop=face",
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
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
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
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
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
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
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
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face",
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
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
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
    }
    // Continuar con más profesionales para completar las 10 categorías...
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
        imagen: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&h=300&fit=crop",
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
    
    // Cargar profesionales si no existen en localStorage
    if (!localStorage.getItem('tevp-professionals')) {
        localStorage.setItem('tevp-professionals', JSON.stringify(initialProfessionals));
        console.log('Profesionales guardados en localStorage');
    }
    
    // Cargar servicios si no existen
    if (!localStorage.getItem('tevp-services')) {
        localStorage.setItem('tevp-services', JSON.stringify(initialServices));
        console.log('Servicios guardados en localStorage');
    }
    
    // Cargar desde localStorage
    professionals = JSON.parse(localStorage.getItem('tevp-professionals')) || initialProfessionals;
    services = JSON.parse(localStorage.getItem('tevp-services')) || initialServices;
    
    // Actualizar variables globales
    window.professionals = professionals;
    window.services = services;
    window.cart = cart;
    
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
                <img src="${service.imagen}" class="card-img-top" alt="${service.nombre}" style="height: 200px; object-fit: cover;">
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
                <img src="${service.imagen}" class="card-img-top" alt="${service.nombre}" style="height: 200px; object-fit: cover;">
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
                <img src="${service.imagen}" class="card-img-top" alt="${service.nombre}" style="height: 200px; object-fit: cover;">
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
    const authLinks = document.getElementById('auth-links');
    const userNameElement = document.getElementById('user-name');
    
    console.log('Actualizando interfaz de usuario:', { isLoggedIn, userName });
    
    if (isLoggedIn && userName && userInfo && authLinks) {
        // Mostrar información del usuario
        userInfo.classList.remove('d-none');
        authLinks.style.display = 'none';
        
        if (userNameElement) {
            userNameElement.textContent = userName;
        }
    } else if (userInfo && authLinks) {
        // Mostrar enlaces de login/registro
        userInfo.classList.add('d-none');
        authLinks.style.display = 'block';
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
    initApp();
    updateUserInterface(); // Actualizar interfaz de usuario al cargar la página
});