# TEVP - Tienda de Servicios Profesionales 🔧⚡

## 📋 Descripción del Proyecto

**TEVP (Tienda de Servicios Profesionales)** es una plataforma web completa que conecta clientes con profesionales técnicos especializados en diversos servicios del hogar y empresariales. La aplicación funciona como un marketplace donde los usuarios pueden contratar servicios de plomería, electricidad, climatización, construcción, y más.

## 🎯 Características Principales

### Para Clientes:
- **Catálogo de Servicios**: Explorar servicios organizados por categorías
- **Sistema de Carrito**: Añadir múltiples servicios antes de contratar  
- **Perfiles de Profesionales**: Ver calificaciones, experiencia y precios
- **Sistema de Autenticación**: Registro e inicio de sesión seguro
- **Interfaz Responsiva**: Optimizada para móviles, tablets y desktop

### Para Administradores:
- **Panel Administrativo Completo**: Gestión de usuarios, servicios y profesionales
- **Dashboard con Métricas**: Estadísticas de ventas y actividad
- **Gestión de Contenido**: Administrar servicios, precios y categorías
- **Sistema de Reportes**: Análisis de datos y tendencias

## 🏗️ Estructura del Proyecto

```
Proyecto-Tevp/
│
├── 📁 admin/                    # Panel de administración
│   ├── dashboard-admin.html     # Dashboard principal del admin
│   ├── productos.html          # Gestión de servicios
│   ├── usuarios.html           # Gestión de usuarios
│   └── reportes.html           # Reportes y analytics
│
├── 📁 css/                     # Hojas de estilo
│   ├── styles.css             # Estilos principales
│   └── styles-optimized.css   # Versión optimizada
│
├── 📁 js/                      # Archivos JavaScript
│   ├── main.js                # Funcionalidad principal (4800+ líneas)
│   ├── components.js          # Componentes reutilizables
│   ├── core.js               # Funciones centrales
│   └── templates.js          # Templates HTML dinámicos
│
├── 📁 images/                  # Recursos gráficos
│
├── 📄 index.html              # Página principal
├── 📄 servicios.html          # Catálogo de servicios
├── 📄 profesionales.html      # Lista de profesionales
├── 📄 nosotros.html          # Información de la empresa
├── 📄 contacto.html          # Formulario de contacto
├── 📄 login.html             # Inicio de sesión
├── 📄 registro.html          # Registro de usuarios
└── 📄 blogs.html             # Blog/Noticias
```

## 🛠️ Tecnologías Utilizadas

### Frontend:
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con variables CSS y Flexbox/Grid
- **JavaScript ES6+**: Funcionalidad interactiva y dinámica
- **Bootstrap 5.3.2**: Framework CSS para diseño responsivo
- **Font Awesome 6.4.0**: Biblioteca de iconos vectoriales

### Características Técnicas:
- **SPA (Single Page Application)**: Navegación sin recarga de página
- **LocalStorage**: Persistencia de datos del carrito y usuario
- **Responsive Design**: Adaptable a todos los dispositivos
- **Progressive Enhancement**: Funciona sin JavaScript básico

## 🚀 Funcionalidades Implementadas

### 🔐 Sistema de Autenticación
```javascript
// Ejemplo de autenticación de usuario
function authenticateUser(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('tevp-currentUser', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        return user;
    }
    return null;
}
```

### 🛒 Carrito de Compras
- Agregar/eliminar servicios
- Persistencia en localStorage
- Cálculo automático de totales
- Proceso de checkout completo

### 👥 Gestión de Profesionales
- Base de datos con 100+ profesionales
- Calificaciones y reseñas
- Especialidades por categoría
- Información detallada (certificaciones, experiencia, tarifas)

### 📊 Panel Administrativo
- Dashboard con métricas en tiempo real
- Gestión CRUD de servicios y usuarios
- Sistema de reportes
- Interfaz intuitiva con gráficos

## 📱 Diseño Responsivo

El proyecto está optimizado para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px  
- **Mobile**: 320px - 767px

```css
/* Ejemplo de media queries utilizadas */
@media (max-width: 768px) {
    .navbar-nav .nav-link {
        margin: 0.2rem 0;
        padding: 0.5rem 1rem;
        border-radius: 5px;
    }
}
```

## 🎨 Arquitectura del Código

### Patrón de Organización:
1. **Separación de Responsabilidades**: HTML (estructura), CSS (presentación), JS (comportamiento)
2. **Modularización**: Funciones específicas en archivos separados
3. **Reutilización**: Componentes y templates reutilizables
4. **Escalabilidad**: Estructura preparada para crecimiento

### Principales Archivos JavaScript:

#### `main.js` (Archivo Principal)
- Variables globales
- Datos de servicios y profesionales
- Funciones de inicialización
- Sistema de routing básico
- Gestión del carrito
- Autenticación de usuarios

#### `components.js`
- Componentes UI reutilizables
- Modales y popups
- Cards de servicios y profesionales

#### `templates.js`
- Templates HTML dinámicos
- Generación de contenido
- Plantillas de email y reportes

## 🔧 Instalación y Uso

### Requisitos:
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, pero recomendado)

### Instalación:
1. Clonar o descargar el repositorio
2. Abrir el proyecto en un servidor web local
3. Navegar a `index.html`

### Usuarios de Prueba:
```
Administrador:
- Email: admin@tevp.cl
- Password: admin123

Cliente:
- Email: cliente@tevp.cl  
- Password: cliente123
```

## 📈 Características Destacadas para Presentación

### 🎯 Funcionalidades Clave:
1. **Sistema Completo de E-commerce**: Carrito, checkout, y gestión de pedidos
2. **Panel de Control Avanzado**: Métricas, reportes y administración
3. **Base de Datos Simulada**: 100+ profesionales con datos reales
4. **Diseño Profesional**: Interfaz moderna y user-friendly
5. **Código Bien Documentado**: Comentarios explicativos en cada función

### 💼 Casos de Uso Empresariales:
- Plataforma de servicios técnicos
- Marketplace B2B/B2C
- Sistema de gestión de profesionales
- Portal de contratación de servicios

## 📞 Información de Contacto

**Proyecto Académico - TEVP**
- Email: contacto@tevp.cl
- Teléfono: +56 2 2345 6789
- Sitio Web: www.tevp.cl (demo)

---

**Developed with ❤️ for academic purposes**