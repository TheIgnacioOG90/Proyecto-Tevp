/**
 * ===== TEVP - JAVASCRIPT CORE OPTIMIZADO =====
 * Este archivo contiene las funciones centrales y utilidades principales
 * que son utilizadas por toda la aplicación TEVP
 */

// ===== CONFIGURACIÓN GLOBAL DE LA APLICACIÓN =====
/**
 * Objeto TEVP: Namespace principal que contiene toda la configuración
 * y funcionalidades centrales de la aplicación
 */
const TEVP = {
  /**
   * CONFIGURACIÓN: Parámetros centrales de la aplicación
   */
  config: {
    serverUrl: 'http://localhost:8080',  // URL del servidor backend (para futuras implementaciones)
    version: '2.0',                      // Versión actual de la aplicación
    debug: true                          // Modo debug activado para mostrar logs en consola
  },
  
  /**
   * CACHE: Sistema de almacenamiento temporal en memoria
   * Usa Map() para mejor rendimiento que objetos normales
   * Evita recalcular datos que no cambian frecuentemente
   */
  cache: new Map(),
  
  /**
   * ESTADO GLOBAL: Variables que mantienen el estado actual de la aplicación
   * Centraliza datos importantes que necesitan ser accesibles desde múltiples lugares
   */
  state: {
    // Usuario actualmente logueado (null si no hay usuario)
    // Se obtiene del localStorage para persistir entre sesiones
    currentUser: JSON.parse(localStorage.getItem('tevp-currentUser')) || null,
    
    cart: [],         // Array del carrito de compras (inicialmente vacío)
    services: [],     // Array de todos los servicios disponibles
    professionals: [] // Array de todos los profesionales registrados
  },

  /**
   * UTILIDADES: Funciones helper reutilizables en toda la aplicación
   */
  utils: {
    /**
     * LOG: Sistema de logging personalizado
     * @param {string} message - Mensaje a mostrar en consola
     * @param {string} type - Tipo de log ('info', 'warn', 'error')
     * FUNCIÓN: Solo muestra logs si debug está activado, evita spam en producción
     */
    log: (message, type = 'info') => {
      if (TEVP.config.debug) console[type](`[TEVP] ${message}`);
    },
    
    /**
     * DEBOUNCE: Optimización para eventos que se ejecutan muy frecuentemente
     * @param {function} func - Función a ejecutar
     * @param {number} wait - Milisegundos a esperar antes de ejecutar
     * FUNCIÓN: Evita que una función se ejecute demasiadas veces seguidas
     * EJEMPLO: búsquedas en tiempo real, resize de ventana, scroll
     */
    debounce: (func, wait) => {
      let timeout; // Variable para almacenar el temporizador
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout); // Limpiar temporizador anterior
          func(...args);         // Ejecutar la función original con sus argumentos
        };
        clearTimeout(timeout);           // Cancelar ejecución anterior si existe
        timeout = setTimeout(later, wait); // Programar nueva ejecución
      };
    },

    /**
     * FORMATEO DE PRECIOS: Convierte números a formato monetario chileno
     * @param {number} price - Precio numérico
     * @returns {string} - Precio formateado con $ y separadores de miles
     * EJEMPLO: 25000 → "$25.000"
     */
    formatPrice: (price) => `$${price.toLocaleString()}`,
    
    /**
     * SANITIZACIÓN HTML: Previene inyección de código malicioso
     * @param {string} str - Cadena de texto potencialmente peligrosa
     * @returns {string} - Texto seguro sin código HTML ejecutable
     * FUNCIÓN: Convierte caracteres especiales en entidades HTML seguras
     */
    sanitizeHtml: (str) => {
      const div = document.createElement('div'); // Crear elemento temporal
      div.textContent = str;                     // Asignar texto (auto-escape)
      return div.innerHTML;                      // Obtener HTML seguro
    },

    /**
     * SISTEMA DE ALERTAS: Muestra notificaciones temporales al usuario
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo de alerta ('info', 'success', 'warning', 'danger')
     * @param {number} duration - Duración en milisegundos antes de auto-ocultar
     * FUNCIÓN: Crea y muestra alertas Bootstrap dinámicamente
     */
    showAlert: (message, type = 'info', duration = 3000) => {
      // Crear elemento div para la alerta
      const alertDiv = document.createElement('div');
      // Asignar clases Bootstrap para estilo y posicionamiento
      alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
      // Posicionar alerta en la esquina superior derecha
      alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 400px;';
      
      // Contenido HTML de la alerta con botón de cierre
      alertDiv.innerHTML = `
        ${TEVP.utils.sanitizeHtml(message)}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      
      // Añadir alerta al DOM (body)
      document.body.appendChild(alertDiv);
      
      // Auto-remover alerta después del tiempo especificado
      setTimeout(() => alertDiv?.remove(), duration);
    }
  },

  /**
   * GESTIÓN DE AUTENTICACIÓN: Manejo completo del sistema de login/logout
   */
  auth: {
    /**
     * VERIFICAR ESTADO DE LOGIN: Comprueba si hay usuario activo
     * @returns {boolean} - true si está logueado, false si no
     * FUNCIÓN: Lee el localStorage para determinar estado de autenticación
     */
    isLoggedIn: () => localStorage.getItem('isLoggedIn') === 'true',
    
    /**
     * PROCESO DE LOGIN: Autentica usuario y guarda datos
     * @param {object} userData - Datos del usuario (name, email, role, etc.)
     * FUNCIÓN: Almacena credenciales, actualiza estado global y UI
     */
    login: (userData) => {
      // Guardar datos de autenticación en localStorage
      localStorage.setItem('isLoggedIn', 'true');      // Estado de login
      localStorage.setItem('userName', userData.name);  // Nombre para mostrar
      localStorage.setItem('userEmail', userData.email); // Email de identificación
      
      // Actualizar estado global de la aplicación
      TEVP.state.currentUser = userData;
      
      // Actualizar interfaz de usuario (mostrar/ocultar elementos)
      TEVP.ui.updateAuthInterface();
      
      // Log para debugging
      TEVP.utils.log(`Usuario ${userData.name} logueado`);
    },

    /**
     * PROCESO DE LOGOUT: Cierra sesión y limpia datos
     * FUNCIÓN: Elimina datos de localStorage, resetea estado, redirige a inicio
     */
    logout: () => {
      // Limpiar todos los datos de autenticación del localStorage
      ['isLoggedIn', 'userName', 'userEmail', 'userRole'].forEach(key => 
        localStorage.removeItem(key) // Remover cada clave del storage
      );
      
      // Resetear estado global
      TEVP.state.currentUser = null;
      
      // Actualizar interfaz (ocultar menú de usuario, mostrar login)
      TEVP.ui.updateAuthInterface();
      
      // Mostrar confirmación al usuario
      TEVP.utils.showAlert('Sesión cerrada correctamente', 'success');
      
      // Redirigir a página principal después de 1.5 segundos
      setTimeout(() => window.location.href = 'index.html', 1500);
    }
  },

  /**
   * GESTIÓN DE INTERFAZ DE USUARIO: Actualización dinámica de elementos visuales
   */
  ui: {
    /**
     * ACTUALIZAR INTERFAZ DE AUTENTICACIÓN: Modifica elementos según estado de login
     * FUNCIÓN: Muestra/oculta botones de login y menú de usuario según corresponda
     */
    updateAuthInterface: () => {
      // Obtener estado actual de autenticación
      const isLoggedIn = TEVP.auth.isLoggedIn();        // ¿Está logueado?
      const userName = localStorage.getItem('userName'); // ¿Cuál es su nombre?
      
      // Obtener referencias a elementos del DOM que necesitamos modificar
      const elements = {
        userInfo: document.getElementById('user-info'),          // Menú desplegable del usuario
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