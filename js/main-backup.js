// ===== VARIABLES GLOBALES =====
let services = [];
let professionals = [];
let cart = JSON.parse(localStorage.getItem('tevp-cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('tevp-currentUser')) || null;
let users = JSON.parse(localStorage.getItem('tevp-users')) || [];

// ===== DATOS INICIALES - SERVICIOS PROFESIONALES EXPANDIDO =====

// Categorías de servicios disponibles (EXPANDIDO)
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

// Profesionales por categoría (EXPANDIDO - 5+ por categoría)
const initialProfessionals = [
    // ===== PLOMERÍA (5 profesionales) =====
    {
        id: 1,
        nombre: "Carlos Mendoza Rivera",
        especialidad: "Plomería",
        experiencia: 8,
        calificacion: 4.8,
        totalReseñas: 156,
        tarifaPorHora: 32000,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        certificado: "Técnico en Instalaciones Sanitarias DUOC UC, Certificación SEC",
        biografia: "Técnico especializado en sistemas hidráulicos residenciales e industriales con 8 años de experiencia. Experto en reparaciones complejas, instalaciones nuevas y sistemas de alta presión. Trabajo con materiales de primera calidad y ofrezco garantía en todos mis servicios. He realizado más de 300 instalaciones exitosas.",
        servicios: ["Reparación filtraciones", "Cambio de cañerías", "Instalación sanitarios", "Sistemas de riego"],
        tareasRealizadas: 342,
        disponibilidad: "Lun-Vie 8:00-18:00, Sáb 9:00-14:00",
        preciosAprox: {
            "Reparación básica": "$25.000 - $35.000",
            "Cambio de cañería": "$45.000 - $80.000",
            "Instalación completa": "$120.000 - $200.000",
            "Servicio de emergencia": "$40.000 - $60.000"
        },
        reseñas: [
            { cliente: "María S.", comentario: "Excelente trabajo, muy profesional y limpio", calificacion: 5 },
            { cliente: "Juan P.", comentario: "Rápido y eficiente, solucionó todo en una visita", calificacion: 5 },
            { cliente: "Ana M.", comentario: "Muy buen precio y calidad, lo recomiendo", calificacion: 4 }
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
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        certificado: "Maestro Plomero Certificado SEC, Especialista en Calefacción",
        biografia: "Maestro plomero con más de 12 años de experiencia en proyectos residenciales y comerciales. Especialista en sistemas de calefacción central, agua caliente y emergencias. Reconocido por la Cámara de la Construcción por excelencia en servicios. Disponible 24/7 para emergencias críticas.",
        servicios: ["Sistemas calefacción", "Agua caliente", "Emergencias 24/7", "Proyectos comerciales"],
        tareasRealizadas: 567,
        disponibilidad: "24/7 Emergencias",
        preciosAprox: {
            "Emergencia nocturna": "$50.000 - $70.000",
            "Sistema calefacción": "$200.000 - $400.000",
            "Mantención preventiva": "$30.000 - $45.000",
            "Proyecto comercial": "$300.000+"
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
        avatar: "https://randomuser.me/api/portraits/men/28.jpg",
        certificado: "Técnico en Gasfitería CFT, Curso SENCE Actualizado",
        biografia: "Técnico joven y dinámico, especializado en reparaciones rápidas y eficientes. Excelente atención al cliente y precios competitivos. Me enfoco en soluciones duraderas y trabajo con garantía extendida. Especialista en destapes y mantenciones preventivas.",
        servicios: ["Destapes", "Llaves de paso", "Mantención general", "Instalaciones menores"],
        tareasRealizadas: 178,
        disponibilidad: "Lun-Sáb 9:00-19:00",
        preciosAprox: {
            "Destape cañería": "$20.000 - $40.000",
            "Cambio llave": "$15.000 - $25.000",
            "Visita técnica": "$12.000",
            "Mantención anual": "$80.000 - $120.000"
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
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
        certificado: "Maestro Mayor Plomero, Instructor DUOC UC, Certificación Internacional",
        biografia: "Maestro plomero con 15 años de experiencia y más de 500 proyectos completados. Instructor en DUOC UC y consultor técnico. Especialista en proyectos complejos, edificios, condominios y reparaciones de alta complejidad. Garantía extendida en todos los trabajos.",
        servicios: ["Proyectos complejos", "Edificios", "Consultorías técnicas", "Supervisión obras"],
        tareasRealizadas: 523,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Consultoría técnica": "$60.000 - $80.000",
            "Proyecto edificio": "$500.000+",
            "Supervisión obra": "$100.000/día",
            "Reparación compleja": "$80.000 - $150.000"
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
        avatar: "https://randomuser.me/api/portraits/men/38.jpg",
        certificado: "Técnico Plomero Especialista, Certificación en Piscinas y Spas",
        biografia: "Especialista en sistemas de piscinas, spas y sistemas de agua especializados. 9 años de experiencia en proyectos residenciales exclusivos. Trabajo con bombas, filtros, sistemas de calentamiento y automatización. Mantención especializada y reparaciones de equipos importados.",
        servicios: ["Piscinas y spas", "Sistemas de bombeo", "Automatización", "Equipos importados"],
        tareasRealizadas: 245,
        disponibilidad: "Lun-Vie 9:00-18:00, Sáb morning",
        preciosAprox: {
            "Mantención piscina": "$45.000 - $65.000",
            "Reparación bomba": "$35.000 - $80.000",
            "Instalación spa": "$200.000 - $350.000",
            "Sistema automatizado": "$400.000+"
        },
        reseñas: [
            { cliente: "Villa del Mar", comentario: "Experto en piscinas, muy recomendable", calificacion: 5 },
            { cliente: "Gonzalo T.", comentario: "Arregló mi spa cuando nadie más pudo", calificacion: 4 }
        ]
    },

    // ===== GASFITERÍA (5 profesionales) =====
    {
        id: 6,
        nombre: "Alberto Vásquez Ruiz",
        especialidad: "Gasfitería",
        experiencia: 11,
        calificacion: 4.8,
        totalReseñas: 167,
        tarifaPorHora: 36000,
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
        certificado: "Gasfiter Autorizado SEC Clase A, Instalador Certificado Gas",
        biografia: "Gasfiter certificado con 11 años de experiencia en instalaciones de gas domiciliario e industrial. Especialista en conexiones, reparaciones de emergencia y certificaciones SEC. Amplio conocimiento en normativas de seguridad y sistemas de gas licuado y natural.",
        servicios: ["Instalaciones gas", "Certificaciones SEC", "Emergencias gas", "Conexiones industriales"],
        tareasRealizadas: 389,
        disponibilidad: "Lun-Vie 8:00-18:00, Emergencias 24/7",
        preciosAprox: {
            "Instalación gas": "$80.000 - $150.000",
            "Certificación SEC": "$45.000 - $60.000",
            "Emergencia gas": "$60.000 - $90.000",
            "Revisión técnica": "$25.000 - $35.000"
        },
        reseñas: [
            { cliente: "Panadería Central", comentario: "Profesional serio, cumple normativas", calificacion: 5 },
            { cliente: "Rosa P.", comentario: "Rápido en emergencia, muy seguro", calificacion: 5 }
        ]
    },
    {
        id: 7,
        nombre: "Eduardo Morales Castro",
        especialidad: "Gasfitería",
        experiencia: 7,
        calificacion: 4.6,
        totalReseñas: 98,
        tarifaPorHora: 32000,
        avatar: "https://randomuser.me/api/portraits/men/33.jpg",
        certificado: "Técnico Gasfiter INACAP, Especialista Redes Domiciliarias",
        biografia: "Técnico especializado en redes domiciliarias de gas y conexiones residenciales. Experiencia en proyectos habitacionales y reparaciones de cañerías de gas. Enfoque en seguridad y cumplimiento de normas técnicas vigentes.",
        servicios: ["Redes domiciliarias", "Conexiones residenciales", "Mantención preventiva", "Detección fugas"],
        tareasRealizadas: 156,
        disponibilidad: "Lun-Sáb 9:00-17:00",
        preciosAprox: {
            "Red domiciliaria": "$120.000 - $200.000",
            "Conexión residencial": "$60.000 - $100.000",
            "Detección fuga": "$30.000 - $45.000",
            "Mantención anual": "$40.000 - $60.000"
        },
        reseñas: [
            { cliente: "Condominio Sur", comentario: "Buen trabajo en nuestro proyecto", calificacion: 4 },
            { cliente: "Mario L.", comentario: "Encontró y solucionó la fuga rápido", calificacion: 5 }
        ]
    },
    {
        id: 8,
        nombre: "Patricio Díaz Herrera",
        especialidad: "Gasfitería",
        experiencia: 13,
        calificacion: 4.9,
        totalReseñas: 201,
        tarifaPorHora: 39000,
        avatar: "https://randomuser.me/api/portraits/men/47.jpg",
        certificado: "Maestro Gasfiter SEC, Instructor Técnico, Especialista Industrial",
        biografia: "Maestro gasfiter con 13 años de experiencia en proyectos industriales y comerciales. Instructor técnico y consultor en normativas de gas. Especialista en instalaciones de gran envergadura, restaurantes, panaderías y proyectos comerciales complejos.",
        servicios: ["Proyectos industriales", "Instalaciones comerciales", "Consultorías normativas", "Capacitaciones"],
        tareasRealizadas: 445,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Proyecto industrial": "$500.000+",
            "Instalación comercial": "$200.000 - $400.000",
            "Consultoría": "$80.000 - $120.000",
            "Capacitación": "$150.000/día"
        },
        reseñas: [
            { cliente: "Restaurante Gourmet", comentario: "Excelente trabajo, muy profesional", calificacion: 5 },
            { cliente: "Fábrica Norte", comentario: "Cumple tiempos y normativas", calificacion: 5 }
        ]
    },
    {
        id: 9,
        nombre: "Raúl González Pérez",
        especialidad: "Gasfitería",
        experiencia: 5,
        calificacion: 4.5,
        totalReseñas: 67,
        tarifaPorHora: 29000,
        avatar: "https://randomuser.me/api/portraits/men/29.jpg",
        certificado: "Gasfiter Técnico CFT, Certificación Básica SEC",
        biografia: "Gasfiter joven con sólida formación técnica y 5 años de experiencia práctica. Especialista en instalaciones domiciliarias y reparaciones menores. Precios competitivos y atención personalizada. Enfocado en calidad y cumplimiento de plazos.",
        servicios: ["Instalaciones domiciliarias", "Reparaciones menores", "Mantención básica", "Conexiones simples"],
        tareasRealizadas: 89,
        disponibilidad: "Lun-Vie 9:00-18:00, Sáb mañana",
        preciosAprox: {
            "Instalación domiciliaria": "$50.000 - $90.000",
            "Reparación menor": "$20.000 - $40.000",
            "Conexión simple": "$30.000 - $50.000",
            "Mantención": "$25.000 - $35.000"
        },
        reseñas: [
            { cliente: "Felipe S.", comentario: "Buen precio y trabajo prolijo", calificacion: 4 },
            { cliente: "Andrea M.", comentario: "Joven pero muy responsable", calificacion: 5 }
        ]
    },
    {
        id: 10,
        nombre: "Cristián Vega Soto",
        especialidad: "Gasfitería",
        experiencia: 9,
        calificacion: 4.7,
        totalReseñas: 143,
        tarifaPorHora: 34000,
        avatar: "https://randomuser.me/api/portraits/men/36.jpg",
        certificado: "Gasfiter Especialista, Técnico en Seguridad Gas, Curso Actualización",
        biografia: "Especialista en seguridad de instalaciones de gas con 9 años de experiencia. Certificado en detección de fugas, instalaciones seguras y mantención preventiva. Experiencia en condominios, edificios y casas particulares con enfoque en prevención.",
        servicios: ["Seguridad instalaciones", "Detección fugas avanzada", "Mantención edificios", "Auditorías gas"],
        tareasRealizadas: 278,
        disponibilidad: "Lun-Vie 8:30-17:30",
        preciosAprox: {
            "Auditoría completa": "$60.000 - $100.000",
            "Detección fuga": "$35.000 - $55.000",
            "Mantención edificio": "$80.000 - $150.000",
            "Instalación segura": "$90.000 - $140.000"
        },
        reseñas: [
            { cliente: "Edificio Las Condes", comentario: "Muy meticuloso y seguro", calificacion: 5 },
            { cliente: "Carmen R.", comentario: "Encontró problema que otros no vieron", calificacion: 4 }
        ]
    },

    // ===== ELECTRICIDAD (5 profesionales) =====
    {
        id: 11,
        nombre: "José Luis Ramírez",
        especialidad: "Electricidad",
        experiencia: 10,
        calificacion: 4.8,
        totalReseñas: 178,
        tarifaPorHora: 35000,
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
        certificado: "Electricista Autorizado SEC Clase A, Especialista Domiciliaria",
        biografia: "Electricista certificado con 10 años de experiencia en instalaciones domiciliarias y comerciales. Especialista en automatización del hogar, iluminación LED y sistemas inteligentes. Trabajo con materiales certificados y ofrezco garantía extendida en todas las instalaciones.",
        servicios: ["Instalaciones domiciliarias", "Automatización hogar", "Iluminación LED", "Sistemas inteligentes"],
        tareasRealizadas: 412,
        disponibilidad: "Lun-Vie 8:00-18:00, Sáb mañana",
        preciosAprox: {
            "Instalación completa": "$150.000 - $300.000",
            "Automatización": "$200.000 - $500.000",
            "Iluminación LED": "$80.000 - $150.000",
            "Reparación básica": "$25.000 - $45.000"
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
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        certificado: "Electricista Industrial DUOC UC, Especialista Motores",
        biografia: "Electricista industrial con 8 años de experiencia en motores, tableros y sistemas de potencia. Una de las pocas mujeres especialistas en el área, con amplio reconocimiento por su profesionalismo y conocimiento técnico avanzado.",
        servicios: ["Motores industriales", "Tableros eléctricos", "Sistemas potencia", "Mantención industrial"],
        tareasRealizadas: 267,
        disponibilidad: "Lun-Vie 7:00-16:00",
        preciosAprox: {
            "Tablero eléctrico": "$200.000 - $400.000",
            "Motor industrial": "$150.000 - $350.000",
            "Mantención": "$80.000 - $120.000",
            "Diagnóstico": "$40.000 - $60.000"
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
        avatar: "https://randomuser.me/api/portraits/men/48.jpg",
        certificado: "Maestro Electricista SEC, Especialista Alta Tensión, Instructor",
        biografia: "Maestro electricista con 14 años de experiencia en alta y baja tensión. Instructor técnico y consultor en proyectos eléctricos complejos. Especialista en edificios, condominios y proyectos comerciales de gran envergadura.",
        servicios: ["Alta tensión", "Proyectos complejos", "Edificios comerciales", "Consultorías"],
        tareasRealizadas: 567,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Proyecto edificio": "$800.000+",
            "Alta tensión": "$300.000 - $600.000",
            "Consultoría": "$100.000 - $150.000",
            "Supervisión": "$120.000/día"
        },
        reseñas: [
            { cliente: "Constructora Prime", comentario: "El mejor electricista que hemos contratado", calificacion: 5 },
            { cliente: "Centro Comercial", comentario: "Maneja proyectos grandes perfectamente", calificacion: 5 }
        ]
    },
    {
        id: 14,
        nombre: "Diego Castillo Vargas",
        especialidad: "Electricidad",
        experiencia: 6,
        calificacion: 4.6,
        totalReseñas: 89,
        tarifaPorHora: 30000,
        avatar: "https://randomuser.me/api/portraits/men/31.jpg",
        certificado: "Técnico Electricista CFT, Especialista Seguridad Eléctrica",
        biografia: "Técnico electricista especializado en seguridad eléctrica y prevención de riesgos. 6 años de experiencia en instalaciones seguras, puesta a tierra y sistemas de protección. Enfoque en normativas vigentes y instalaciones certificadas.",
        servicios: ["Seguridad eléctrica", "Puesta a tierra", "Protecciones", "Certificaciones"],
        tareasRealizadas: 145,
        disponibilidad: "Lun-Vie 9:00-17:00",
        preciosAprox: {
            "Puesta a tierra": "$80.000 - $150.000",
            "Sistema protección": "$100.000 - $200.000",
            "Certificación": "$50.000 - $80.000",
            "Instalación segura": "$120.000 - $180.000"
        },
        reseñas: [
            { cliente: "Oficina Legal", comentario: "Muy detallista y seguro", calificacion: 5 },
            { cliente: "Clínica Dental", comentario: "Excelente trabajo en seguridad", calificacion: 4 }
        ]
    },
    {
        id: 15,
        nombre: "Mauricio Álvarez Torres",
        especialidad: "Electricidad",
        experiencia: 12,
        calificacion: 4.8,
        totalReseñas: 189,
        tarifaPorHora: 37000,
        avatar: "https://randomuser.me/api/portraits/men/44.jpg",
        certificado: "Electricista Especialista, Técnico Paneles Solares, Energías Renovables",
        biografia: "Especialista en energías renovables y paneles solares con 12 años de experiencia. Pionero en instalaciones fotovoltaicas residenciales en Chile. Amplio conocimiento en sistemas de respaldo, baterías y conexión a red eléctrica.",
        servicios: ["Paneles solares", "Energías renovables", "Sistemas respaldo", "Baterías"],
        tareasRealizadas: 298,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Panel solar residencial": "$400.000 - $800.000",
            "Sistema completo": "$1.200.000+",
            "Batería respaldo": "$300.000 - $600.000",
            "Mantención solar": "$60.000 - $100.000"
        },
        reseñas: [
            { cliente: "Casa Ecológica", comentario: "Experto en paneles solares, recomendado", calificacion: 5 },
            { cliente: "Empresa Verde", comentario: "Profesional innovador y actualizado", calificacion: 5 }
        ]
    },

    // ===== CLIMATIZACIÓN (5 profesionales) =====
    {
        id: 16,
        nombre: "Sebastián Rojas Morales",
        especialidad: "Climatización",
        experiencia: 9,
        calificacion: 4.8,
        totalReseñas: 145,
        tarifaPorHora: 36000,
        avatar: "https://randomuser.me/api/portraits/men/39.jpg",
        certificado: "Técnico Climatización INACAP, Especialista Aire Acondicionado",
        biografia: "Técnico especializado en sistemas de climatización residencial y comercial. 9 años de experiencia en instalación, mantención y reparación de equipos de aire acondicionado de todas las marcas. Trabajo con equipos split, centrales y VRF.",
        servicios: ["Aire acondicionado", "Sistemas centrales", "Mantención AC", "Instalaciones comerciales"],
        tareasRealizadas: 287,
        disponibilidad: "Lun-Sáb 8:00-18:00",
        preciosAprox: {
            "Instalación split": "$120.000 - $200.000",
            "Sistema central": "$400.000 - $800.000",
            "Mantención": "$35.000 - $55.000",
            "Reparación": "$40.000 - $120.000"
        },
        reseñas: [
            { cliente: "Hotel Boutique", comentario: "Excelente trabajo en nuestros 20 equipos", calificacion: 5 },
            { cliente: "María José", comentario: "Rápido y eficiente, lo recomiendo", calificacion: 5 }
        ]
    },
    {
        id: 17,
        nombre: "Carolina Espinoza Ruiz",
        especialidad: "Climatización",
        experiencia: 7,
        calificacion: 4.7,
        totalReseñas: 98,
        tarifaPorHora: 33000,
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        certificado: "Técnico Refrigeración DUOC UC, Especialista Equipos Industriales",
        biografia: "Técnica especializada en sistemas de refrigeración industrial y comercial. 7 años de experiencia en cámaras de frío, equipos de supermercados, restaurantes y procesadoras de alimentos. Conocimiento avanzado en gases refrigerantes y normativas ambientales.",
        servicios: ["Refrigeración industrial", "Cámaras de frío", "Equipos comerciales", "Gases refrigerantes"],
        tareasRealizadas: 167,
        disponibilidad: "Lun-Vie 8:00-17:00, Emergencias",
        preciosAprox: {
            "Cámara de frío": "$200.000 - $500.000",
            "Equipo comercial": "$150.000 - $300.000",
            "Carga gas": "$60.000 - $120.000",
            "Emergencia": "$80.000 - $150.000"
        },
        reseñas: [
            { cliente: "Supermercado Central", comentario: "Muy competente, maneja equipos grandes", calificacion: 5 },
            { cliente: "Restaurante Mariscos", comentario: "Solucionó emergencia rápidamente", calificacion: 4 }
        ]
    },
    {
        id: 18,
        nombre: "Fernando Lagos Hernández",
        especialidad: "Climatización",
        experiencia: 11,
        calificacion: 4.9,
        totalReseñas: 176,
        tarifaPorHora: 38000,
        avatar: "https://randomuser.me/api/portraits/men/43.jpg",
        certificado: "Maestro Climatización, Especialista VRF, Instructor Técnico",
        biografia: "Maestro en climatización con 11 años de experiencia en sistemas VRF, chillers y equipos de gran tonelaje. Instructor técnico y consultor en proyectos de climatización complejos. Especialista en eficiencia energética y automatización de sistemas.",
        servicios: ["Sistemas VRF", "Chillers", "Automatización", "Eficiencia energética"],
        tareasRealizadas: 398,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Sistema VRF": "$800.000+",
            "Chiller": "$1.200.000+",
            "Automatización": "$300.000 - $600.000",
            "Consultoría": "$120.000 - $180.000"
        },
        reseñas: [
            { cliente: "Edificio Corporativo", comentario: "El mejor en sistemas complejos", calificacion: 5 },
            { cliente: "Hospital Regional", comentario: "Profesional de primer nivel", calificacion: 5 }
        ]
    },
    {
        id: 19,
        nombre: "Rodrigo Sáez Figueroa",
        especialidad: "Climatización",
        experiencia: 6,
        calificacion: 4.5,
        totalReseñas: 76,
        tarifaPorHora: 31000,
        avatar: "https://randomuser.me/api/portraits/men/34.jpg",
        certificado: "Técnico Climatización CFT, Especialista Mantención Preventiva",
        biografia: "Técnico especializado en mantención preventiva y reparación de equipos de climatización. 6 años de experiencia en contratos de mantención, limpieza de equipos y optimización de consumo energético. Enfoque en prolongar vida útil de equipos.",
        servicios: ["Mantención preventiva", "Limpieza equipos", "Optimización consumo", "Contratos mantención"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Vie 9:00-17:00",
        preciosAprox: {
            "Mantención anual": "$180.000 - $300.000",
            "Limpieza profunda": "$45.000 - $80.000",
            "Optimización": "$60.000 - $100.000",
            "Contrato anual": "$200.000 - $400.000"
        },
        reseñas: [
            { cliente: "Oficina Contable", comentario: "Muy ordenado y puntual", calificacion: 4 },
            { cliente: "Clínica Estética", comentario: "Mantiene nuestros equipos perfectos", calificacion: 5 }
        ]
    },
    {
        id: 20,
        nombre: "Gabriel Contreras Ramos",
        especialidad: "Climatización",
        experiencia: 13,
        calificacion: 4.8,
        totalReseñas: 201,
        tarifaPorHora: 39000,
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
        certificado: "Especialista Calefacción Central, Técnico Calderas, Certificación Europea",
        biografia: "Especialista en sistemas de calefacción central y calderas con 13 años de experiencia. Certificación europea en calderas de condensación y sistemas radiantes. Amplio conocimiento en eficiencia térmica y sistemas de distribución de calor.",
        servicios: ["Calefacción central", "Calderas", "Sistemas radiantes", "Eficiencia térmica"],
        tareasRealizadas: 356,
        disponibilidad: "Lun-Vie 8:00-17:00, Invierno extendido",
        preciosAprox: {
            "Calefacción central": "$600.000 - $1.200.000",
            "Caldera nueva": "$400.000 - $800.000",
            "Sistema radiante": "$300.000 - $600.000",
            "Mantención caldera": "$80.000 - $120.000"
        },
        reseñas: [
            { cliente: "Casa Las Condes", comentario: "Excelente calefacción, muy eficiente", calificacion: 5 },
            { cliente: "Condominio Norte", comentario: "Profesional serio, cumple plazos", calificacion: 5 }
        ]
    }

    // Continuará con más categorías...

    // ===== REFRIGERACIÓN (5 profesionales) =====
    {
        id: 21,
        nombre: "Patricia Vega Soto",
        especialidad: "Refrigeración",
        experiencia: 10,
        calificacion: 4.8,
        totalReseñas: 167,
        tarifaPorHora: 34000,
        avatar: "https://randomuser.me/api/portraits/women/35.jpg",
        certificado: "Técnico Refrigeración Industrial, Especialista Equipos Comerciales",
        biografia: "Técnica especializada en refrigeración comercial e industrial con 10 años de experiencia. Experta en cámaras de frío, vitrinas refrigeradas, equipos de supermercados y restaurantes. Certificada en manejo de gases refrigerantes y normativas ambientales.",
        servicios: ["Refrigeradores comerciales", "Cámaras de frío", "Vitrinas", "Equipos supermercado"],
        tareasRealizadas: 298,
        disponibilidad: "Lun-Vie 8:00-17:00, Emergencias sábado",
        preciosAprox: {
            "Reparación refrigerador": "$35.000 - $120.000",
            "Cámara de frío": "$200.000 - $500.000",
            "Vitrina comercial": "$80.000 - $180.000",
            "Carga gas refrigerante": "$60.000 - $100.000"
        },
        reseñas: [
            { cliente: "Supermercado Central", comentario: "Muy profesional, arregló todos nuestros equipos", calificacion: 5 },
            { cliente: "Carnicería Don Juan", comentario: "Rápida y eficiente, recomendable", calificacion: 5 },
            { cliente: "Hotel Plaza", comentario: "Excelente servicio técnico", calificacion: 4 }
        ]
    },
    {
        id: 22,
        nombre: "Manuel Espinoza Rivera",
        especialidad: "Refrigeración",
        experiencia: 8,
        calificacion: 4.6,
        totalReseñas: 134,
        tarifaPorHora: 32000,
        avatar: "https://randomuser.me/api/portraits/men/40.jpg",
        certificado: "Técnico Electrodomésticos DUOC UC, Especialista Línea Blanca",
        biografia: "Técnico especializado en reparación de electrodomésticos de línea blanca con énfasis en refrigeración doméstica. 8 años de experiencia reparando refrigeradores, freezers y equipos residenciales de todas las marcas.",
        servicios: ["Refrigeradores domésticos", "Freezers", "Neveras", "Mantención preventiva"],
        tareasRealizadas: 245,
        disponibilidad: "Lun-Sáb 9:00-18:00",
        preciosAprox: {
            "Reparación refrigerador": "$30.000 - $100.000",
            "Cambio compresor": "$120.000 - $200.000",
            "Mantención": "$25.000 - $40.000",
            "Visita técnica": "$15.000"
        },
        reseñas: [
            { cliente: "María José S.", comentario: "Arregló mi refrigerador cuando nadie más pudo", calificacion: 5 },
            { cliente: "Carlos P.", comentario: "Buen precio y trabajo garantizado", calificacion: 4 }
        ]
    },
    {
        id: 23,
        nombre: "Ricardo Moreno Valdés",
        especialidad: "Refrigeración",
        experiencia: 12,
        calificacion: 4.9,
        totalReseñas: 189,
        tarifaPorHora: 36000,
        avatar: "https://randomuser.me/api/portraits/men/49.jpg",
        certificado: "Maestro Refrigeración, Especialista Equipos Industriales, Certificación Internacional",
        biografia: "Maestro en refrigeración con 12 años de experiencia en equipos industriales y sistemas complejos. Especialista en plantas procesadoras, equipos farmacéuticos y sistemas de refrigeración de gran tonelaje. Certificación internacional en nuevas tecnologías.",
        servicios: ["Refrigeración industrial", "Plantas procesadoras", "Equipos farmacéuticos", "Sistemas complejos"],
        tareasRealizadas: 423,
        disponibilidad: "Lun-Vie 7:00-16:00",
        preciosAprox: {
            "Sistema industrial": "$400.000+",
            "Planta procesadora": "$800.000+",
            "Equipo farmacéutico": "$300.000 - $600.000",
            "Consultoría técnica": "$100.000 - $150.000"
        },
        reseñas: [
            { cliente: "Procesadora Sur", comentario: "El mejor técnico industrial que hemos tenido", calificacion: 5 },
            { cliente: "Laboratorio Médico", comentario: "Muy profesional y confiable", calificacion: 5 }
        ]
    },
    {
        id: 24,
        nombre: "Alejandra Silva Castro",
        especialidad: "Refrigeración",
        experiencia: 6,
        calificacion: 4.7,
        totalReseñas: 98,
        tarifaPorHora: 30000,
        avatar: "https://randomuser.me/api/portraits/women/31.jpg",
        certificado: "Técnico Refrigeración CFT, Especialista Mantención Preventiva",
        biografia: "Técnica especializada en mantención preventiva de equipos de refrigeración. 6 años de experiencia en contratos de mantención, optimización de consumo energético y prolongación de vida útil de equipos. Enfoque en eficiencia y ahorro.",
        servicios: ["Mantención preventiva", "Optimización energética", "Contratos mantención", "Diagnosis técnica"],
        tareasRealizadas: 178,
        disponibilidad: "Lun-Vie 9:00-17:00",
        preciosAprox: {
            "Mantención anual": "$150.000 - $300.000",
            "Optimización": "$80.000 - $150.000",
            "Contrato empresarial": "$200.000 - $500.000",
            "Diagnosis": "$40.000 - $60.000"
        },
        reseñas: [
            { cliente: "Restaurante Gourmet", comentario: "Mantiene nuestros equipos funcionando perfecto", calificacion: 5 },
            { cliente: "Panadería Artesanal", comentario: "Muy organizada y puntual", calificacion: 4 }
        ]
    },
    {
        id: 25,
        nombre: "Jorge Herrera Mendoza",
        especialidad: "Refrigeración",
        experiencia: 14,
        calificacion: 4.8,
        totalReseñas: 201,
        tarifaPorHora: 38000,
        avatar: "https://randomuser.me/api/portraits/men/51.jpg",
        certificado: "Especialista Refrigeración Comercial, Instructor SENCE, Consultor Técnico",
        biografia: "Especialista en refrigeración comercial con 14 años de experiencia y más de 400 proyectos realizados. Instructor SENCE y consultor técnico. Experto en diseño de sistemas de refrigeración para centros comerciales, supermercados y cadenas de restaurantes.",
        servicios: ["Diseño sistemas", "Proyectos comerciales", "Centros comerciales", "Consultorías especializadas"],
        tareasRealizadas: 456,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Proyecto comercial": "$600.000+",
            "Diseño sistema": "$400.000 - $800.000",
            "Consultoría": "$120.000 - $180.000",
            "Supervisión proyecto": "$150.000/día"
        },
        reseñas: [
            { cliente: "Mall del Norte", comentario: "Diseñó todo el sistema de refrigeración perfectamente", calificacion: 5 },
            { cliente: "Cadena Supermercados", comentario: "Profesional de primera categoría", calificacion: 5 }
        ]
    },

    // ===== ELECTRODOMÉSTICOS (5 profesionales) =====
    {
        id: 26,
        nombre: "Carolina Jiménez López",
        especialidad: "Electrodomésticos",
        experiencia: 9,
        calificacion: 4.7,
        totalReseñas: 145,
        tarifaPorHora: 33000,
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        certificado: "Técnico Electrodomésticos INACAP, Especialista Línea Blanca y Gris",
        biografia: "Técnica especializada en reparación de electrodomésticos de línea blanca y gris con 9 años de experiencia. Experta en lavadoras, secadoras, lavavajillas, microondas y pequeños electrodomésticos. Trabajo con todas las marcas y repuestos originales.",
        servicios: ["Lavadoras", "Lavavajillas", "Microondas", "Pequeños electrodomésticos"],
        tareasRealizadas: 287,
        disponibilidad: "Lun-Vie 9:00-18:00, Sáb mañana",
        preciosAprox: {
            "Reparación lavadora": "$40.000 - $120.000",
            "Lavavajillas": "$35.000 - $100.000",
            "Microondas": "$25.000 - $80.000",
            "Pequeños electrodomésticos": "$15.000 - $45.000"
        },
        reseñas: [
            { cliente: "Rosa M.", comentario: "Arregló mi lavadora que tenía 10 años", calificacion: 5 },
            { cliente: "Pedro L.", comentario: "Muy profesional y precios justos", calificacion: 4 }
        ]
    },
    {
        id: 27,
        nombre: "Andrés Castillo Vargas",
        especialidad: "Electrodomésticos",
        experiencia: 11,
        calificacion: 4.8,
        totalReseñas: 167,
        tarifaPorHora: 35000,
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        certificado: "Maestro Reparador, Especialista Marcas Premium, Certificación Samsung/LG",
        biografia: "Maestro reparador con 11 años de experiencia especializado en marcas premium y equipos de alta gama. Certificado por Samsung, LG y otras marcas reconocidas. Experto en tecnologías modernas, electrodomésticos inteligentes y sistemas conectados.",
        servicios: ["Marcas premium", "Electrodomésticos inteligentes", "Tecnología moderna", "Equipos conectados"],
        tareasRealizadas: 345,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Equipo premium": "$80.000 - $200.000",
            "Electrodoméstico inteligente": "$100.000 - $250.000",
            "Diagnosis avanzada": "$50.000 - $80.000",
            "Configuración smart": "$40.000 - $70.000"
        },
        reseñas: [
            { cliente: "Casa Las Condes", comentario: "Único que pudo arreglar mi lavadora importada", calificacion: 5 },
            { cliente: "Departamento Providencia", comentario: "Experto en tecnología moderna", calificacion: 5 }
        ]
    },
    {
        id: 28,
        nombre: "Luis Morales Herrera",
        especialidad: "Electrodomésticos",
        experiencia: 7,
        calificacion: 4.5,
        totalReseñas: 98,
        tarifaPorHora: 29000,
        avatar: "https://randomuser.me/api/portraits/men/37.jpg",
        certificado: "Técnico Electrodomésticos CFT, Especialista Reparación Económica",
        biografia: "Técnico especializado en reparaciones económicas y eficientes con 7 años de experiencia. Enfocado en soluciones costo-efectivas y reparaciones que prolonguen la vida útil de los equipos. Especialista en electrodomésticos de gama media y popular.",
        servicios: ["Reparaciones económicas", "Electrodomésticos populares", "Soluciones costo-efectivas", "Mantención básica"],
        tareasRealizadas: 198,
        disponibilidad: "Lun-Sáb 9:00-19:00",
        preciosAprox: {
            "Reparación básica": "$20.000 - $60.000",
            "Mantención": "$25.000 - $45.000",
            "Diagnosis": "$15.000 - $25.000",
            "Reparación menor": "$15.000 - $40.000"
        },
        reseñas: [
            { cliente: "Ana S.", comentario: "Muy buen precio y trabajo honesto", calificacion: 4 },
            { cliente: "Roberto P.", comentario: "Solucionó mi problema sin cambiar piezas caras", calificacion: 5 }
        ]
    },
    {
        id: 29,
        nombre: "Valentina Soto Ramírez",
        especialidad: "Electrodomésticos",
        experiencia: 5,
        calificacion: 4.6,
        totalReseñas: 76,
        tarifaPorHora: 28000,
        avatar: "https://randomuser.me/api/portraits/women/29.jpg",
        certificado: "Técnico Joven DUOC UC, Especialista Electrodomésticos Modernos",
        biografia: "Técnica joven especializada en electrodomésticos modernos y nuevas tecnologías. 5 años de experiencia con enfoque en equipos de última generación, aplicaciones móviles y conectividad. Actualizada en las últimas tendencias del mercado.",
        servicios: ["Electrodomésticos modernos", "Apps móviles", "Conectividad WiFi", "Nuevas tecnologías"],
        tareasRealizadas: 134,
        disponibilidad: "Lun-Vie 10:00-19:00",
        preciosAprox: {
            "Configuración WiFi": "$30.000 - $50.000",
            "App móvil": "$25.000 - $40.000",
            "Electrodoméstico moderno": "$40.000 - $100.000",
            "Actualización software": "$20.000 - $35.000"
        },
        reseñas: [
            { cliente: "Joven Profesional", comentario: "Entiende perfectamente la tecnología nueva", calificacion: 5 },
            { cliente: "Familia Tech", comentario: "Muy actualizada y competente", calificacion: 4 }
        ]
    },
    {
        id: 30,
        nombre: "Ernesto Vásquez Díaz",
        especialidad: "Electrodomésticos",
        experiencia: 13,
        calificacion: 4.9,
        totalReseñas: 189,
        tarifaPorHora: 37000,
        avatar: "https://randomuser.me/api/portraits/men/50.jpg",
        certificado: "Maestro Reparador Certificado, Instructor Técnico, Especialista Industrial",
        biografia: "Maestro reparador con 13 años de experiencia en equipos domésticos e industriales. Instructor técnico y especialista en equipos de cocinas industriales, lavanderías comerciales y equipamiento hotelero. Amplia experiencia en proyectos grandes.",
        servicios: ["Equipos industriales", "Cocinas comerciales", "Lavanderías", "Equipamiento hotelero"],
        tareasRealizadas: 467,
        disponibilidad: "Lun-Vie 7:00-16:00",
        preciosAprox: {
            "Equipo industrial": "$150.000 - $400.000",
            "Cocina comercial": "$200.000 - $500.000",
            "Lavandería": "$180.000 - $350.000",
            "Proyecto hotelero": "$300.000+"
        },
        reseñas: [
            { cliente: "Hotel 5 Estrellas", comentario: "Mantiene todos nuestros equipos funcionando", calificacion: 5 },
            { cliente: "Restaurante Gourmet", comentario: "Profesional serio y muy capaz", calificacion: 5 }
        ]
    },

    // ===== CALEFÓN Y CALDERAS (5 profesionales) =====
    {
        id: 31,
        nombre: "Marcelo Fuentes Rojas",
        especialidad: "Calefón y Calderas",
        experiencia: 12,
        calificacion: 4.9,
        totalReseñas: 178,
        tarifaPorHora: 38000,
        avatar: "https://randomuser.me/api/portraits/men/47.jpg",
        certificado: "Especialista Calefones y Calderas SEC, Técnico Gas Certificado",
        biografia: "Especialista certificado en calefones y calderas con 12 años de experiencia. Experto en instalación, mantención y reparación de todos los tipos de calefones (a gas, eléctricos) y calderas residenciales e industriales. Certificado SEC para trabajos con gas.",
        servicios: ["Calefones a gas", "Calefones eléctricos", "Calderas residenciales", "Calderas industriales"],
        tareasRealizadas: 356,
        disponibilidad: "Lun-Vie 8:00-18:00, Emergencias 24/7",
        preciosAprox: {
            "Instalación calefón": "$80.000 - $150.000",
            "Reparación caldera": "$60.000 - $200.000",
            "Mantención anual": "$45.000 - $80.000",
            "Emergencia": "$70.000 - $120.000"
        },
        reseñas: [
            { cliente: "Familia González", comentario: "Instaló nuestro calefón perfecto, muy profesional", calificacion: 5 },
            { cliente: "Edificio Centro", comentario: "Mantiene nuestra caldera central excelente", calificacion: 5 },
            { cliente: "Pedro M.", comentario: "Rápido en emergencia, muy confiable", calificacion: 5 }
        ]
    },
    {
        id: 32,
        nombre: "Isabel Mendoza Torres",
        especialidad: "Calefón y Calderas", 
        experiencia: 8,
        calificacion: 4.7,
        totalReseñas: 134,
        tarifaPorHora: 34000,
        avatar: "https://randomuser.me/api/portraits/women/36.jpg",
        certificado: "Técnico Termodinámico DUOC UC, Especialista Eficiencia Energética",
        biografia: "Técnica especializada en sistemas térmicos con 8 años de experiencia. Experta en optimización de consumo, eficiencia energética y nuevas tecnologías en calefacción. Especialista en calefones de condensación y sistemas de alta eficiencia.",
        servicios: ["Sistemas eficientes", "Calefones condensación", "Optimización consumo", "Nuevas tecnologías"],
        tareasRealizadas: 245,
        disponibilidad: "Lun-Vie 9:00-17:00",
        preciosAprox: {
            "Calefón eficiente": "$200.000 - $400.000",
            "Optimización": "$80.000 - $150.000", 
            "Consultoría energética": "$60.000 - $100.000",
            "Sistema condensación": "$300.000 - $600.000"
        },
        reseñas: [
            { cliente: "Casa Ecológica", comentario: "Redujo nuestro consumo en 40%", calificacion: 5 },
            { cliente: "Oficina Verde", comentario: "Muy profesional y actualizada", calificacion: 4 }
        ]
    },
    {
        id: 33,
        nombre: "Roberto Silva Castillo",
        especialidad: "Calefón y Calderas",
        experiencia: 15,
        calificacion: 4.8,
        totalReseñas: 201,
        tarifaPorHora: 40000,
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
        certificado: "Maestro Instalador Gas, Instructor SEC, Especialista Industrial",
        biografia: "Maestro con 15 años de experiencia en instalaciones industriales y comerciales. Instructor SEC y consultor en normativas de gas. Especialista en calderas de gran tonelaje, sistemas centralizados y proyectos de calefacción complejos.",
        servicios: ["Calderas industriales", "Sistemas centralizados", "Proyectos complejos", "Consultorías normativas"],
        tareasRealizadas: 489,
        disponibilidad: "Lun-Vie 7:00-16:00",
        preciosAprox: {
            "Caldera industrial": "$800.000+",
            "Sistema centralizado": "$500.000 - $1.200.000",
            "Consultoría": "$120.000 - $200.000",
            "Proyecto complejo": "$400.000+"
        },
        reseñas: [
            { cliente: "Fábrica Textil", comentario: "Instaló todo el sistema de calefacción", calificacion: 5 },
            { cliente: "Hospital Regional", comentario: "Muy profesional y cumple normativas", calificacion: 5 }
        ]
    },
    {
        id: 34,
        nombre: "Diego Álvarez Pérez",
        especialidad: "Calefón y Calderas",
        experiencia: 6,
        calificacion: 4.5,
        totalReseñas: 89,
        tarifaPorHora: 31000,
        avatar: "https://randomuser.me/api/portraits/men/33.jpg",
        certificado: "Técnico Instalaciones Térmicas CFT, Gasfiter Básico",
        biografia: "Técnico joven especializado en instalaciones domiciliarias de calefones y sistemas básicos de calefacción. 6 años de experiencia en reparaciones menores, cambios de calefones y mantención básica. Precios competitivos y atención personalizada.",
        servicios: ["Calefones domiciliarios", "Instalaciones básicas", "Reparaciones menores", "Mantención básica"],
        tareasRealizadas: 167,
        disponibilidad: "Lun-Sáb 9:00-18:00",
        preciosAprox: {
            "Calefón domiciliario": "$60.000 - $120.000",
            "Instalación básica": "$50.000 - $90.000",
            "Reparación menor": "$25.000 - $60.000",
            "Mantención": "$30.000 - $50.000"
        },
        reseñas: [
            { cliente: "Carmen L.", comentario: "Buen precio y trabajo prolijo", calificacion: 4 },
            { cliente: "Luis R.", comentario: "Joven pero muy responsable", calificacion: 5 }
        ]
    },
    {
        id: 35,
        nombre: "Patricia Vega Morales",
        especialidad: "Calefón y Calderas",
        experiencia: 10,
        calificacion: 4.8,
        totalReseñas: 156,
        tarifaPorHora: 36000,
        avatar: "https://randomuser.me/api/portraits/women/38.jpg",
        certificado: "Especialista Mantención Preventiva, Técnico Seguridad Térmica",
        biografia: "Especialista en mantención preventiva de calefones y calderas con 10 años de experiencia. Experta en prolongar vida útil de equipos, prevención de fallas y seguridad en instalaciones térmicas. Contratos de mantención para condominios y empresas.",
        servicios: ["Mantención preventiva", "Contratos mantención", "Seguridad térmica", "Prevención fallas"],
        tareasRealizadas: 298,
        disponibilidad: "Lun-Vie 8:30-17:30",
        preciosAprox: {
            "Mantención anual": "$180.000 - $350.000",
            "Contrato condominio": "$400.000 - $800.000",
            "Revisión seguridad": "$50.000 - $80.000",
            "Prevención fallas": "$60.000 - $100.000"
        },
        reseñas: [
            { cliente: "Condominio Sur", comentario: "Mantiene perfectos todos los calefones", calificacion: 5 },
            { cliente: "Empresa Logística", comentario: "Muy organizada y puntual", calificacion: 5 }
        ]
    },

    // ===== CARPINTERÍA (5 profesionales) =====
    {
        id: 36,
        nombre: "Carlos Herrera Soto",
        especialidad: "Carpintería",
        experiencia: 14,
        calificacion: 4.9,
        totalReseñas: 189,
        tarifaPorHora: 35000,
        avatar: "https://randomuser.me/api/portraits/men/48.jpg",
        certificado: "Maestro Carpintero, Especialista Muebles Finos, Instructor SENCE",
        biografia: "Maestro carpintero con 14 años de experiencia en muebles finos y carpintería de alta calidad. Especialista en madera nativa, restauración de muebles antiguos y proyectos de carpintería exclusiva. Instructor SENCE y artesano reconocido.",
        servicios: ["Muebles finos", "Madera nativa", "Restauración", "Carpintería exclusiva"],
        tareasRealizadas: 456,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Mueble fino": "$300.000 - $800.000",
            "Restauración": "$150.000 - $400.000",
            "Proyecto exclusivo": "$500.000+",
            "Reparación": "$50.000 - $150.000"
        },
        reseñas: [
            { cliente: "Casa Patrimonial", comentario: "Restauró nuestros muebles antiguos perfectamente", calificacion: 5 },
            { cliente: "Oficina Ejecutiva", comentario: "Muebles de calidad excepcional", calificacion: 5 }
        ]
    },
    {
        id: 37,
        nombre: "Andrea Morales Silva",
        especialidad: "Carpintería",
        experiencia: 9,
        calificacion: 4.7,
        totalReseñas: 134,
        tarifaPorHora: 32000,
        avatar: "https://randomuser.me/api/portraits/women/34.jpg",
        certificado: "Carpintera Ebanista DUOC UC, Especialista Diseño Moderno",
        biografia: "Carpintera ebanista con 9 años de experiencia en diseño moderno y funcional. Especialista en optimización de espacios, muebles modulares y carpintería contemporánea. Una de las pocas mujeres en el rubro con amplio reconocimiento.",
        servicios: ["Diseño moderno", "Muebles modulares", "Optimización espacios", "Carpintería contemporánea"],
        tareasRealizadas: 267,
        disponibilidad: "Lun-Vie 9:00-17:00",
        preciosAprox: {
            "Mueble modular": "$200.000 - $500.000",
            "Optimización espacio": "$300.000 - $700.000",
            "Diseño contemporáneo": "$250.000 - $600.000",
            "Consultoría diseño": "$80.000 - $120.000"
        },
        reseñas: [
            { cliente: "Departamento Moderno", comentario: "Optimizó perfectamente nuestro espacio", calificacion: 5 },
            { cliente: "Oficina Creativa", comentario: "Diseños innovadores y funcionales", calificacion: 4 }
        ]
    },
    {
        id: 38,
        nombre: "Francisco Lagos Herrera",
        especialidad: "Carpintería",
        experiencia: 11,
        calificacion: 4.8,
        totalReseñas: 156,
        tarifaPorHora: 33000,
        avatar: "https://randomuser.me/api/portraits/men/44.jpg",
        certificado: "Carpintero Constructor, Especialista Estructuras Madera",
        biografia: "Carpintero constructor con 11 años de experiencia en estructuras de madera y carpintería gruesa. Especialista en techos, escaleras, pérgolas y estructuras exteriores. Amplio conocimiento en maderas tratadas y construcción sustentable.",
        servicios: ["Estructuras madera", "Techos", "Escaleras", "Pérgolas"],
        tareasRealizadas: 345,
        disponibilidad: "Lun-Sáb 8:00-17:00",
        preciosAprox: {
            "Estructura techo": "$400.000 - $1.000.000",
            "Escalera madera": "$300.000 - $600.000",
            "Pérgola": "$200.000 - $500.000",
            "Reparación estructura": "$100.000 - $300.000"
        },
        reseñas: [
            { cliente: "Casa de Campo", comentario: "Construyó una pérgola hermosa", calificacion: 5 },
            { cliente: "Restaurante Campestre", comentario: "Excelente trabajo en la estructura", calificacion: 5 }
        ]
    },
    {
        id: 39,
        nombre: "Miguel Contreras Díaz",
        especialidad: "Carpintería",
        experiencia: 7,
        calificacion: 4.6,
        totalReseñas: 98,
        tarifaPorHora: 29000,
        avatar: "https://randomuser.me/api/portraits/men/36.jpg",
        certificado: "Carpintero General CFT, Especialista Reparaciones",
        biografia: "Carpintero general con 7 años de experiencia en reparaciones y mantención de muebles y estructuras. Especialista en arreglos rápidos, mantención preventiva y pequeños proyectos de carpintería. Precios accesibles y trabajo garantizado.",
        servicios: ["Reparaciones", "Mantención muebles", "Proyectos pequeños", "Arreglos rápidos"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Sáb 9:00-18:00",
        preciosAprox: {
            "Reparación mueble": "$30.000 - $100.000",
            "Mantención": "$25.000 - $60.000",
            "Proyecto pequeño": "$80.000 - $200.000",
            "Arreglo rápido": "$20.000 - $50.000"
        },
        reseñas: [
            { cliente: "Oficina Contable", comentario: "Arregló nuestros muebles rápido", calificacion: 4 },
            { cliente: "María José", comentario: "Buen precio y trabajo prolijo", calificacion: 5 }
        ]
    },
    {
        id: 40,
        nombre: "Rodrigo Espinoza Vega",
        especialidad: "Carpintería",
        experiencia: 13,
        calificacion: 4.8,
        totalReseñas: 167,
        tarifaPorHora: 34000,
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
        certificado: "Carpintero Especialista, Técnico Cocinas y Closets",
        biografia: "Carpintero especialista en cocinas integrales y closets con 13 años de experiencia. Experto en optimización de espacios, herrajes modernos y acabados de alta calidad. Trabajo con marcas premium y materiales importados.",
        servicios: ["Cocinas integrales", "Closets", "Optimización espacios", "Herrajes modernos"],
        tareasRealizadas: 389,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Cocina integral": "$800.000 - $2.000.000",
            "Closet completo": "$400.000 - $1.000.000",
            "Remodelación": "$300.000 - $800.000",
            "Herrajes premium": "$150.000 - $300.000"
        },
        reseñas: [
            { cliente: "Casa Las Condes", comentario: "Cocina espectacular, muy profesional", calificacion: 5 },
            { cliente: "Departamento Premium", comentario: "Closet perfecto, aprovechó todo el espacio", calificacion: 5 }
        ]
    },

    // ===== CONSTRUCCIÓN (5 profesionales) =====
    {
        id: 41,
        nombre: "Eduardo Ramírez Torres",
        especialidad: "Construcción",
        experiencia: 16,
        calificacion: 4.9,
        totalReseñas: 234,
        tarifaPorHora: 40000,
        avatar: "https://randomuser.me/api/portraits/men/53.jpg",
        certificado: "Maestro Constructor, Jefe de Obra Certificado, Instructor Construcción",
        biografia: "Maestro constructor con 16 años de experiencia en obras residenciales y comerciales. Jefe de obra certificado e instructor en construcción. Especialista en remodelaciones integrales, ampliaciones y proyectos de construcción completos.",
        servicios: ["Remodelaciones integrales", "Ampliaciones", "Obra nueva", "Jefatura de obra"],
        tareasRealizadas: 567,
        disponibilidad: "Lun-Vie 7:00-16:00",
        preciosAprox: {
            "Remodelación integral": "$2.000.000+",
            "Ampliación": "$1.500.000 - $5.000.000",
            "Obra nueva": "$3.000.000+",
            "Jefatura obra": "$200.000/día"
        },
        reseñas: [
            { cliente: "Casa Providencia", comentario: "Remodelación perfecta, muy profesional", calificacion: 5 },
            { cliente: "Empresa Constructora", comentario: "Excelente jefe de obra", calificacion: 5 }
        ]
    },
    {
        id: 42,
        nombre: "Carmen Silva Morales",
        especialidad: "Construcción",
        experiencia: 10,
        calificacion: 4.7,
        totalReseñas: 145,
        tarifaPorHora: 35000,
        avatar: "https://randomuser.me/api/portraits/women/37.jpg",
        certificado: "Constructora Civil USACH, Especialista Acabados Finos",
        biografia: "Constructora civil con 10 años de experiencia especializada en acabados finos y detalles de construcción. Experta en estucos, pinturas especiales, pisos decorativos y terminaciones de alta calidad. Reconocida por su atención al detalle.",
        servicios: ["Acabados finos", "Estucos decorativos", "Pinturas especiales", "Pisos decorativos"],
        tareasRealizadas: 298,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Acabados finos": "$150.000 - $400.000/habitación",
            "Estuco decorativo": "$80.000 - $150.000/m²",
            "Pintura especial": "$60.000 - $120.000/habitación",
            "Piso decorativo": "$100.000 - $250.000/m²"
        },
        reseñas: [
            { cliente: "Casa Premium", comentario: "Acabados perfectos, muy detallista", calificacion: 5 },
            { cliente: "Restaurante Gourmet", comentario: "Trabajo artístico excepcional", calificacion: 5 }
        ]
    },
    {
        id: 43,
        nombre: "Antonio Vásquez López",
        especialidad: "Construcción",
        experiencia: 12,
        calificacion: 4.8,
        totalReseñas: 178,
        tarifaPorHora: 37000,
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        certificado: "Albañil Especialista, Técnico Hormigón, Certificación Estructural",
        biografia: "Albañil especialista con 12 años de experiencia en trabajos estructurales y hormigón. Certificado en técnicas de construcción moderna, hormigón armado y estructuras antisísmicas. Especialista en cimientos, muros y elementos estructurales.",
        servicios: ["Trabajos estructurales", "Hormigón armado", "Cimientos", "Muros estructurales"],
        tareasRealizadas: 456,
        disponibilidad: "Lun-Sáb 7:00-16:00",
        preciosAprox: {
            "Cimientos": "$800.000 - $2.000.000",
            "Muro estructural": "$200.000 - $500.000/m²",
            "Losa hormigón": "$150.000 - $300.000/m²",
            "Refuerzo estructural": "$300.000 - $800.000"
        },
        reseñas: [
            { cliente: "Constructora Norte", comentario: "Excelente en trabajos estructurales", calificacion: 5 },
            { cliente: "Casa Antisísmica", comentario: "Muy profesional y seguro", calificacion: 5 }
        ]
    },
    {
        id: 44,
        nombre: "Rosa Herrera Díaz",
        especialidad: "Construcción",
        experiencia: 8,
        calificacion: 4.6,
        totalReseñas: 112,
        tarifaPorHora: 32000,
        avatar: "https://randomuser.me/api/portraits/women/35.jpg",
        certificado: "Técnico Construcción CFT, Especialista Remodelaciones Menores",
        biografia: "Técnica en construcción con 8 años de experiencia especializada en remodelaciones menores y arreglos domiciliarios. Experta en baños, cocinas, tabiquería y pequeñas obras de albañilería. Trabajo prolijo y precios competitivos.",
        servicios: ["Remodelaciones menores", "Baños", "Cocinas", "Tabiquería"],
        tareasRealizadas: 234,
        disponibilidad: "Lun-Vie 9:00-17:00",
        preciosAprox: {
            "Remodelación baño": "$400.000 - $1.200.000",
            "Remodelación cocina": "$600.000 - $1.800.000",
            "Tabique": "$50.000 - $120.000/m²",
            "Arreglos menores": "$80.000 - $200.000"
        },
        reseñas: [
            { cliente: "Departamento Centro", comentario: "Remodelación de baño perfecta", calificacion: 5 },
            { cliente: "Casa Familiar", comentario: "Muy prolija y ordenada", calificacion: 4 }
        ]
    },
    {
        id: 45,
        nombre: "Gabriel Moreno Castillo",
        especialidad: "Construcción",
        experiencia: 14,
        calificacion: 4.8,
        totalReseñas: 189,
        tarifaPorHora: 38000,
        avatar: "https://randomuser.me/api/portraits/men/49.jpg",
        certificado: "Especialista Exteriores, Técnico Paisajismo, Constructor Piscinas",
        biografia: "Especialista en construcciones exteriores con 14 años de experiencia. Experto en quincho, piscinas, jardines, terrazas y obras exteriores. Conocimiento en paisajismo y construcción sustentable. Especialista en espacios de recreación.",
        servicios: ["Quinchos", "Piscinas", "Terrazas", "Obras exteriores"],
        tareasRealizadas: 378,
        disponibilidad: "Lun-Sáb 8:00-17:00",
        preciosAprox: {
            "Quincho completo": "$1.500.000 - $4.000.000",
            "Piscina": "$3.000.000 - $8.000.000",
            "Terraza": "$800.000 - $2.500.000",
            "Paisajismo": "$200.000 - $600.000"
        },
        reseñas: [
            { cliente: "Casa de Campo", comentario: "Quincho espectacular, superó expectativas", calificacion: 5 },
            { cliente: "Villa Premium", comentario: "Piscina y jardín perfectos", calificacion: 5 }
        ]
    },

    // ===== CONTADORES (5 profesionales) =====
    {
        id: 46,
        nombre: "María José Contreras",
        especialidad: "Contadores",
        experiencia: 12,
        calificacion: 4.9,
        totalReseñas: 189,
        tarifaPorHora: 45000,
        avatar: "https://randomuser.me/api/portraits/women/39.jpg",
        certificado: "Contador Auditor UChile, Especialista Tributario, Consultor Empresarial",
        biografia: "Contador Auditor con 12 años de experiencia en asesoría tributaria y contable para empresas y personas naturales. Especialista en optimización tributaria, reorganizaciones empresariales y cumplimiento normativo. Amplia experiencia en PYMES y startups.",
        servicios: ["Asesoría tributaria", "Contabilidad empresarial", "Auditorías", "Consultorías"],
        tareasRealizadas: 456,
        disponibilidad: "Lun-Vie 9:00-18:00",
        preciosAprox: {
            "Asesoría tributaria": "$80.000 - $150.000",
            "Contabilidad mensual": "$200.000 - $500.000",
            "Auditoría": "$400.000 - $1.200.000",
            "Consultoría": "$120.000 - $200.000/hora"
        },
        reseñas: [
            { cliente: "Startup Tech", comentario: "Excelente asesoría, nos ahorró mucho dinero", calificacion: 5 },
            { cliente: "PYME Familiar", comentario: "Muy profesional y clara en explicaciones", calificacion: 5 }
        ]
    },
    {
        id: 47,
        nombre: "Jorge Sánchez Herrera",
        especialidad: "Contadores",
        experiencia: 15,
        calificacion: 4.8,
        totalReseñas: 234,
        tarifaPorHora: 50000,
        avatar: "https://randomuser.me/api/portraits/men/48.jpg",
        certificado: "Contador Auditor PUC, Master Tributario, Consultor Senior",
        biografia: "Contador Auditor con 15 años de experiencia y Master en Tributación. Consultor senior especializado en grandes empresas, reestructuraciones societarias y planificación tributaria avanzada. Ex-socio de firma auditora reconocida.",
        servicios: ["Empresas grandes", "Reestructuraciones", "Planificación tributaria", "Consultoría senior"],
        tareasRealizadas: 567,
        disponibilidad: "Lun-Vie 8:00-17:00",
        preciosAprox: {
            "Consultoría senior": "$150.000 - $250.000/hora",
            "Reestructuración": "$2.000.000+",
            "Planificación tributaria": "$800.000 - $2.000.000",
            "Auditoría grande": "$1.500.000+"
        },
        reseñas: [
            { cliente: "Corporación Internacional", comentario: "Asesoría de primer nivel", calificacion: 5 },
            { cliente: "Holding Empresarial", comentario: "Muy profesional y estratégico", calificacion: 5 }
        ]
    },
    {
        id: 48,
        nombre: "Carolina López Vega",
        especialidad: "Contadores",
        experiencia: 8,
        calificacion: 4.7,
        totalReseñas: 123,
        tarifaPorHora: 35000,
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        certificado: "Contador Auditor USACH, Especialista PYMES, Certificación Digital",
        biografia: "Contador Auditor especializada en PYMES y emprendimientos con 8 años de experiencia. Experta en digitalización contable, facturación electrónica y cumplimiento normativo para pequeñas y medianas empresas. Enfoque en simplificar procesos.",
        servicios: ["PYMES", "Emprendimientos", "Digitalización", "Facturación electrónica"],
        tareasRealizadas: 289,
        disponibilidad: "Lun-Vie 9:00-18:00, Sáb mañana",
        preciosAprox: {
            "Contabilidad PYME": "$150.000 - $350.000/mes",
            "Emprendimiento": "$80.000 - $200.000/mes",
            "Digitalización": "$200.000 - $500.000",
            "Asesoría": "$60.000 - $100.000/hora"
        },
        reseñas: [
            { cliente: "Emprendedor Digital", comentario: "Me ayudó a formalizar mi negocio", calificacion: 5 },
            { cliente: "PYME Comercial", comentario: "Muy eficiente y moderna", calificacion: 4 }
        ]
    },
    {
        id: 49,
        nombre: "Ricardo Fuentes Díaz",
        especialidad: "Contadores",
        experiencia: 10,
        calificacion: 4.6,
        totalReseñas: 156,
        tarifaPorHora: 40000,
        avatar: "https://randomuser.me/api/portraits/men/43.jpg",
        certificado: "Contador Auditor UAI, Especialista Personas Naturales, Consultor Independiente",
        biografia: "Contador Auditor con 10 años de experiencia especializado en personas naturales con actividades independientes. Experto en boletas de honorarios, declaración de renta y optimización tributaria personal. Atención personalizada y precios accesibles.",
        servicios: ["Personas naturales", "Boletas honorarios", "Declaración renta", "Actividades independientes"],
        tareasRealizadas: 378,
        disponibilidad: "Lun-Vie 9:00-17:00, March-April extendido",
        preciosAprox: {
            "Declaración renta": "$50.000 - $120.000",
            "Boletas honorarios": "$80.000 - $150.000/mes",
            "Asesoría personal": "$60.000 - $100.000/hora",
            "Planificación personal": "$150.000 - $300.000"
        },
        reseñas: [
            { cliente: "Profesional Independiente", comentario: "Muy claro y eficiente", calificacion: 4 },
            { cliente: "Freelancer", comentario: "Me ahorró mucho tiempo y dinero", calificacion: 5 }
        ]
    },
    {
        id: 50,
        nombre: "Alejandra Torres Silva",
        especialidad: "Contadores",
        experiencia: 6,
        calificacion: 4.5,
        totalReseñas: 89,
        tarifaPorHora: 32000,
        avatar: "https://randomuser.me/api/portraits/women/30.jpg",
        certificado: "Contador Auditor UNAB, Especialista Comercio Electrónico, Certificación FinTech",
        biografia: "Contador joven especializada en comercio electrónico y nuevas tecnologías financieras. 6 años de experiencia con empresas digitales, marketplaces y fintech. Experta en contabilidad digital, criptomonedas y modelos de negocio innovadores.",
        servicios: ["Comercio electrónico", "Empresas digitales", "FinTech", "Criptomonedas"],
        tareasRealizadas: 167,
        disponibilidad: "Lun-Vie 10:00-19:00",
        preciosAprox: {
            "E-commerce": "$200.000 - $400.000/mes",
            "Empresa digital": "$150.000 - $350.000/mes",
            "FinTech": "$300.000 - $600.000/mes",
            "Criptomonedas": "$100.000 - $200.000/consulta"
        },
        reseñas: [
            { cliente: "Tienda Online", comentario: "Entiende perfectamente el negocio digital", calificacion: 5 },
            { cliente: "Startup FinTech", comentario: "Muy actualizada y competente", calificacion: 4 }
        ]
    }
];

// Servicios disponibles con precios detallados
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
        profesionalesDisponibles: 5,
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
        profesionalesDisponibles: 5,
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
        profesionalesDisponibles: 5,
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
        profesionalesDisponibles: 5,
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
        profesionalesDisponibles: 3,
        tiempoRespuesta: "2 - 5 hrs"
    }
    // Más servicios serán agregados...
];

// ===== FUNCIONES PRINCIPALES =====

// Función para inicializar la aplicación
function initApp() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Cargar datos iniciales
    loadInitialData();
    
    // Verificar autenticación
    checkAuthStatus();
    
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
        case 'admin/home.html':
            initAdminDashboard();
            break;
        default:
            console.log('Página no reconocida:', currentPage);
    }
}

// Cargar datos iniciales
function loadInitialData() {
    // Cargar profesionales si no existen en localStorage
    if (!localStorage.getItem('tevp-professionals')) {
        localStorage.setItem('tevp-professionals', JSON.stringify(initialProfessionals));
    }
    
    // Cargar servicios si no existen
    if (!localStorage.getItem('tevp-services')) {
        localStorage.setItem('tevp-services', JSON.stringify(initialServices));
    }
    
    // Cargar desde localStorage
    professionals = JSON.parse(localStorage.getItem('tevp-professionals')) || initialProfessionals;
    services = JSON.parse(localStorage.getItem('tevp-services')) || initialServices;
}

// Verificar estado de autenticación
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    
    updateAuthUI(isLoggedIn, userRole, userName);
}

// Actualizar UI de autenticación
function updateAuthUI(isLoggedIn, userRole, userName) {
    const loginBtn = document.getElementById('login-btn');
    const userInfo = document.getElementById('user-info');
    
    if (loginBtn && userInfo) {
        if (isLoggedIn) {
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
                            '<li><a class="dropdown-item" href="admin/home.html"><i class="fas fa-tachometer-alt me-2"></i>Panel de Control</a></li>' : ''
                        }
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Cerrar Sesión</a></li>
                    </ul>
                </div>
            `;
        } else {
            loginBtn.style.display = 'block';
            userInfo.style.display = 'none';
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
    const container = document.getElementById('featured-services');
    if (!container) return;
    
    const featuredServices = services.slice(0, 6);
    
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
    if (!container) return;
    
    // Ordenar por calificación y mostrar top 6
    const topProfessionals = professionals
        .sort((a, b) => b.calificacion - a.calificacion)
        .slice(0, 6);
    
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

// ===== FUNCIONES DE AUTENTICACIÓN =====

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
        }, 'admin/dashboard-vendedor.html');
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
    showAlert(`¡Bienvenido ${userData.name}!`, 'success');
    
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 1500);
}

// Resto de funciones de autenticación y utilidades...
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

// Funciones de utilidades
function showAlert(message, type = 'info') {
    // Implementación básica de alerta
    alert(message);
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

function validateEmail() {
    const emailInput = document.getElementById('email');
    if (!emailInput) return true;
    
    const email = emailInput.value.trim();
    
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
    
    return true;
}

function validatePassword() {
    const passwordInput = document.getElementById('password');
    if (!passwordInput) return true;
    
    const password = passwordInput.value;
    
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

function showFieldError(input, message) {
    // Implementación básica
    input.classList.add('is-invalid');
}

function clearFieldError(input) {
    if (input.target) input = input.target;
    input.classList.remove('is-invalid');
}

function clearAllErrors() {
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
}

function initLoginPage() {
    console.log('Iniciando página de login');
}

function initAdminDashboard() {
    console.log('Iniciando dashboard admin');
}

function initProductsPage() {
    console.log('Iniciando página de productos/servicios');
}

function initProfessionalsPage() {
    console.log('Iniciando página de profesionales');
}

function viewServiceDetails(serviceId) {
    console.log('Ver detalles del servicio:', serviceId);
}

function viewProfessionalDetail(professionalId) {
    console.log('Ver detalle del profesional:', professionalId);
}

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);