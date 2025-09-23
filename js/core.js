/* ===== TEVP - JAVASCRIPT CORE OPTIMIZADO ===== */

// ===== CONFIGURACIÓN GLOBAL =====
const TEVP = {
  config: {
    serverUrl: 'http://localhost:8080',
    version: '2.0',
    debug: true
  },
  
  // Cache para datos
  cache: new Map(),
  
  // Estado global
  state: {
    currentUser: JSON.parse(localStorage.getItem('tevp-currentUser')) || null,
    cart: [],
    services: [],
    professionals: []
  },

  // Utilidades
  utils: {
    log: (message, type = 'info') => {
      if (TEVP.config.debug) console[type](`[TEVP] ${message}`);
    },
    
    debounce: (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    formatPrice: (price) => `$${price.toLocaleString()}`,
    
    sanitizeHtml: (str) => {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    },

    showAlert: (message, type = 'info', duration = 3000) => {
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
      alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 400px;';
      alertDiv.innerHTML = `
        ${TEVP.utils.sanitizeHtml(message)}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      document.body.appendChild(alertDiv);
      setTimeout(() => alertDiv?.remove(), duration);
    }
  },

  // Gestión de autenticación
  auth: {
    isLoggedIn: () => localStorage.getItem('isLoggedIn') === 'true',
    
    login: (userData) => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userEmail', userData.email);
      TEVP.state.currentUser = userData;
      TEVP.ui.updateAuthInterface();
      TEVP.utils.log(`Usuario ${userData.name} logueado`);
    },

    logout: () => {
      ['isLoggedIn', 'userName', 'userEmail', 'userRole'].forEach(key => 
        localStorage.removeItem(key)
      );
      TEVP.state.currentUser = null;
      TEVP.ui.updateAuthInterface();
      TEVP.utils.showAlert('Sesión cerrada correctamente', 'success');
      setTimeout(() => window.location.href = 'index.html', 1500);
    }
  },

  // Gestión de UI
  ui: {
    updateAuthInterface: () => {
      const isLoggedIn = TEVP.auth.isLoggedIn();
      const userName = localStorage.getItem('userName');
      
      // Elementos del DOM
      const elements = {
        userInfo: document.getElementById('user-info'),
        authRegister: document.getElementById('auth-link-register'),
        authLogin: document.getElementById('auth-link-login'),
        authLinks: document.getElementById('auth-links'), // Compatibilidad
        userNameElement: document.getElementById('user-name')
      };

      if (isLoggedIn && userName) {
        // Usuario logueado
        elements.userInfo?.classList.remove('d-none');
        if (elements.userInfo) elements.userInfo.style.display = 'block';
        
        // Ocultar enlaces de auth
        [elements.authRegister, elements.authLogin, elements.authLinks].forEach(el => {
          if (el) el.style.display = 'none';
        });
        
        if (elements.userNameElement) {
          elements.userNameElement.textContent = userName;
        }
      } else {
        // Usuario no logueado
        elements.userInfo?.classList.add('d-none');
        if (elements.userInfo) elements.userInfo.style.display = 'none';
        
        // Mostrar enlaces de auth
        [elements.authRegister, elements.authLogin, elements.authLinks].forEach(el => {
          if (el) el.style.display = 'block';
        });
      }
    },

    generateStarRating: (rating, size = '') => {
      const stars = Math.round(rating);
      const starClass = size ? `fa-star fa-${size}` : 'fa-star';
      return Array.from({length: 5}, (_, i) => 
        `<i class="fas ${starClass} ${i < stars ? 'text-warning' : 'text-muted'}"></i>`
      ).join('');
    },

    createModal: (id, title, body, footer = '') => {
      const existingModal = document.getElementById(id);
      if (existingModal) existingModal.remove();

      const modalHTML = `
        <div class="modal fade" id="${id}" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-primary text-white">
                <h5 class="modal-title">${title}</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">${body}</div>
              ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
            </div>
          </div>
        </div>
      `;
      
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      return new bootstrap.Modal(document.getElementById(id));
    }
  },

  // Gestión de datos
  data: {
    loadServices: () => {
      if (TEVP.cache.has('services')) {
        TEVP.state.services = TEVP.cache.get('services');
        return Promise.resolve(TEVP.state.services);
      }
      
      // Aquí cargarías desde una API real
      return new Promise(resolve => {
        setTimeout(() => {
          TEVP.state.services = window.services || [];
          TEVP.cache.set('services', TEVP.state.services);
          resolve(TEVP.state.services);
        }, 100);
      });
    },

    loadProfessionals: () => {
      if (TEVP.cache.has('professionals')) {
        TEVP.state.professionals = TEVP.cache.get('professionals');
        return Promise.resolve(TEVP.state.professionals);
      }
      
      return new Promise(resolve => {
        setTimeout(() => {
          TEVP.state.professionals = window.professionals || [];
          TEVP.cache.set('professionals', TEVP.state.professionals);
          resolve(TEVP.state.professionals);
        }, 100);
      });
    },

    findProfessional: (id) => TEVP.state.professionals.find(p => p.id === parseInt(id))
  },

  // Inicialización
  init: () => {
    TEVP.utils.log('Inicializando TEVP v' + TEVP.config.version);
    
    // Configurar eventos globales
    document.addEventListener('DOMContentLoaded', () => {
      TEVP.ui.updateAuthInterface();
      TEVP.data.loadServices();
      TEVP.data.loadProfessionals();
    });

    // Hacer funciones globales para compatibilidad
    window.logout = TEVP.auth.logout;
    window.showUserProfile = () => {
      const user = localStorage.getItem('userName');
      const email = localStorage.getItem('userEmail');
      TEVP.utils.showAlert(`Perfil:\\nNombre: ${user}\\nEmail: ${email}`, 'info');
    };
    window.showUserOrders = () => {
      TEVP.utils.showAlert('No tienes pedidos actualmente', 'info');
    };
  }
};

// ===== AUTO-INICIALIZACIÓN =====
TEVP.init();

// ===== EXPORT PARA MÓDULOS =====
window.TEVP = TEVP;