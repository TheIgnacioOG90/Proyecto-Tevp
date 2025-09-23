/* ===== TEVP - PLANTILLAS Y LAYOUTS ===== */

TEVP.templates = {
  
  // ===== PLANTILLA: NAVEGACIÓN =====
  navbar: (currentPage = '') => {
    const isActive = (page) => currentPage === page ? 'active' : '';
    
    return `
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background: var(--tevp-gradient-primary);">
        <div class="container">
          <a class="navbar-brand fw-bold" href="index.html">
            <i class="fas fa-handshake me-2"></i>TEVP
          </a>
          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <a class="nav-link ${isActive('home')}" href="index.html">
                  <i class="fas fa-home me-1"></i>Inicio
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${isActive('servicios')}" href="servicios.html">
                  <i class="fas fa-tools me-1"></i>Servicios
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${isActive('profesionales')}" href="profesionales.html">
                  <i class="fas fa-users me-1"></i>Profesionales
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${isActive('nosotros')}" href="nosotros.html">
                  <i class="fas fa-info-circle me-1"></i>Nosotros
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${isActive('blogs')}" href="blogs.html">
                  <i class="fas fa-blog me-1"></i>Blog
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${isActive('contacto')}" href="contacto.html">
                  <i class="fas fa-envelope me-1"></i>Contacto
                </a>
              </li>
            </ul>
            
            <div class="d-flex gap-2" id="navbarActions">
              <!-- Se llenará dinámicamente -->
            </div>
          </div>
        </div>
      </nav>
    `;
  },

  // ===== PLANTILLA: FOOTER =====
  footer: () => `
    <footer class="bg-dark text-light py-5 mt-auto">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-6 col-lg-3">
            <h5 class="text-primary">
              <i class="fas fa-handshake me-2"></i>TEVP
            </h5>
            <p class="small text-muted">
              Conectamos profesionales con clientes para servicios de calidad en todo Chile.
            </p>
            <div class="d-flex gap-2">
              <a href="#" class="btn btn-outline-primary btn-sm rounded-circle">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="btn btn-outline-primary btn-sm rounded-circle">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="btn btn-outline-primary btn-sm rounded-circle">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div class="col-md-6 col-lg-3">
            <h6 class="text-primary">Servicios</h6>
            <ul class="list-unstyled small">
              <li><a href="servicios.html" class="text-muted text-decoration-none">Climatización</a></li>
              <li><a href="servicios.html" class="text-muted text-decoration-none">Plomería</a></li>
              <li><a href="servicios.html" class="text-muted text-decoration-none">Electricidad</a></li>
              <li><a href="servicios.html" class="text-muted text-decoration-none">Jardinería</a></li>
            </ul>
          </div>
          
          <div class="col-md-6 col-lg-3">
            <h6 class="text-primary">Empresa</h6>
            <ul class="list-unstyled small">
              <li><a href="nosotros.html" class="text-muted text-decoration-none">Sobre Nosotros</a></li>
              <li><a href="blogs.html" class="text-muted text-decoration-none">Blog</a></li>
              <li><a href="contacto.html" class="text-muted text-decoration-none">Contacto</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Términos y Condiciones</a></li>
            </ul>
          </div>
          
          <div class="col-md-6 col-lg-3">
            <h6 class="text-primary">Contacto</h6>
            <div class="small text-muted">
              <p><i class="fas fa-phone me-2"></i>+56 9 1234 5678</p>
              <p><i class="fas fa-envelope me-2"></i>info@tevp.cl</p>
              <p><i class="fas fa-map-marker-alt me-2"></i>Santiago, Chile</p>
            </div>
          </div>
        </div>
        
        <hr class="border-secondary my-4">
        
        <div class="row align-items-center">
          <div class="col-md-6">
            <small class="text-muted">&copy; 2024 TEVP. Todos los derechos reservados.</small>
          </div>
          <div class="col-md-6 text-md-end">
            <small class="text-muted">
              Desarrollado con <i class="fas fa-heart text-danger"></i> en Chile
            </small>
          </div>
        </div>
      </div>
    </footer>
  `,

  // ===== PLANTILLA: HERO SECTION =====
  hero: (title, subtitle, buttons = []) => `
    <section class="hero-section d-flex align-items-center">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="hero-content">
              <h1 class="display-4 fw-bold text-white mb-4 animate-fade-up">
                ${title}
              </h1>
              <p class="lead text-white-50 mb-4 animate-fade-up" style="animation-delay: 0.2s;">
                ${subtitle}
              </p>
              <div class="d-flex flex-wrap gap-3 animate-fade-up" style="animation-delay: 0.4s;">
                ${buttons.map(btn => `
                  <a href="${btn.href}" class="btn btn-${btn.type} btn-lg btn-tevp">
                    <i class="${btn.icon} me-2"></i>${btn.text}
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
          <div class="col-lg-6 text-center">
            <div class="hero-image animate-fade-up" style="animation-delay: 0.6s;">
              <i class="fas fa-handshake display-1 text-white opacity-25"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,

  // ===== PLANTILLA: SECCIÓN DE STATS =====
  stats: (statistics) => `
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row g-4">
          ${statistics.map(stat => `
            <div class="col-md-3 text-center">
              <div class="stat-item">
                <i class="${stat.icon} fa-3x text-primary mb-3"></i>
                <h3 class="fw-bold text-tevp-primary counter" data-target="${stat.number}">0</h3>
                <p class="text-muted">${stat.label}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `,

  // ===== PLANTILLA: GRID DE CONTENIDO =====
  contentGrid: (items, cardType = 'default', columns = 3) => {
    const colClass = `col-md-${12/Math.min(columns, 4)} col-lg-${12/Math.min(columns, 4)}`;
    
    return `
      <div class="row g-4">
        ${items.map(item => `
          <div class="${colClass} mb-4">
            ${cardType === 'professional' ? TEVP.components.professionalCard(item) : 
              cardType === 'service' ? TEVP.components.serviceCard(item) : 
              TEVP.templates.defaultCard(item)}
          </div>
        `).join('')}
      </div>
    `;
  },

  // ===== PLANTILLA: TARJETA PREDETERMINADA =====
  defaultCard: (item) => `
    <div class="card h-100 card-hover">
      ${item.image ? `<img src="${item.image}" class="card-img-top" alt="${item.title}" style="height: 200px; object-fit: cover;">` : ''}
      <div class="card-body">
        <h5 class="card-title text-tevp-primary">${item.title}</h5>
        <p class="card-text text-muted">${item.description}</p>
        ${item.price ? `<div class="price-highlight h6">${TEVP.utils.formatPrice(item.price)}</div>` : ''}
      </div>
      ${item.action ? `
        <div class="card-footer bg-transparent">
          <button class="btn btn-primary btn-tevp w-100" onclick="${item.action}">
            ${item.actionText || 'Ver más'}
          </button>
        </div>
      ` : ''}
    </div>
  `,

  // ===== PLANTILLA: PÁGINA COMPLETA =====
  page: (config) => `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${config.title} | TEVP - Servicios Profesionales</title>
      <meta name="description" content="${config.description}">
      <meta name="cache-control" content="no-cache, no-store, must-revalidate">
      <meta name="pragma" content="no-cache">
      <meta name="expires" content="0">
      
      <!-- Bootstrap CSS -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
      
      <!-- Font Awesome -->
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
      
      <!-- CSS Optimizado -->
      <link href="css/styles-optimized.css?v=${Date.now()}" rel="stylesheet">
      
      <!-- Favicon -->
      <link rel="icon" type="image/x-icon" href="images/favicon.ico">
    </head>
    
    <body class="d-flex flex-column min-vh-100">
      ${TEVP.templates.navbar(config.currentPage)}
      
      <main class="flex-grow-1" style="margin-top: 76px;">
        ${config.hero ? TEVP.templates.hero(config.hero.title, config.hero.subtitle, config.hero.buttons) : ''}
        ${config.content}
      </main>
      
      ${TEVP.templates.footer()}
      
      <!-- Scripts -->
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
      <script src="js/core.js?v=${Date.now()}"></script>
      <script src="js/components.js?v=${Date.now()}"></script>
      ${config.scripts ? config.scripts.map(script => `<script src="${script}?v=${Date.now()}"></script>`).join('') : ''}
    </body>
    </html>
  `
};

// ===== SISTEMA DE RENDERIZADO =====
TEVP.render = {
  
  // Renderizar plantilla en un elemento
  to: (elementId, template, data = {}) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = typeof template === 'function' ? template(data) : template;
    }
  },

  // Actualizar navegación
  updateNavbar: (currentPage) => {
    const navbar = document.querySelector('nav.navbar');
    if (navbar) {
      navbar.outerHTML = TEVP.templates.navbar(currentPage);
    }
  },

  // Renderizar stats con animación
  animateStats: () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / 50;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toLocaleString('es-CL');
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString('es-CL');
        }
      }, 40);
    });
  }
};

// ===== INICIALIZACIÓN DE TEMPLATES =====
document.addEventListener('DOMContentLoaded', () => {
  // Animar contadores si existen
  if (document.querySelector('.counter')) {
    // Usar Intersection Observer para animar cuando sea visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          TEVP.render.animateStats();
          observer.disconnect();
        }
      });
    });
    
    const statsSection = document.querySelector('.counter');
    if (statsSection) {
      observer.observe(statsSection.closest('section') || statsSection);
    }
  }
});