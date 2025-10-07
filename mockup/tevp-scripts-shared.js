// ===== TEVP MOCKUP - JAVASCRIPT COMPARTIDO FUNCIONAL =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 TEVP Mockup System - Inicializado');
    
    // Inicializar todas las funcionalidades
    initializeTEVPMockups();
});

// ===== FUNCIÓN PRINCIPAL DE INICIALIZACIÓN =====
function initializeTEVPMockups() {
    console.log('🎯 Inicializando sistema TEVP...');
    
    // Configurar efectos de hover para mockups
    setupMockupEffects();
    
    // Configurar navegación en mockups
    setupMockupNavigation();
    
    // Configurar animaciones de entrada
    setupEntranceAnimations();
    
    // Configurar contador de pantallas
    setupScreenCounter();
    
    // Configurar efectos de scroll
    setupScrollEffects();
    
    console.log('✅ Sistema TEVP completamente funcional');
}

// ===== EFECTOS PARA MOCKUPS =====
function setupMockupEffects() {
    console.log('🎨 Configurando efectos de mockups...');
    
    const mockupCards = document.querySelectorAll('.mockup-card');
    
    mockupCards.forEach((card, index) => {
        // Efecto hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.zIndex = '10';
            
            // Efecto de brillo
            const overlay = document.createElement('div');
            overlay.className = 'hover-overlay';
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                transition: left 0.6s ease;
                pointer-events: none;
                z-index: 1;
            `;
            this.appendChild(overlay);
            
            setTimeout(() => {
                overlay.style.left = '100%';
            }, 100);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
            
            // Remover overlay
            const overlay = this.querySelector('.hover-overlay');
            if (overlay) {
                overlay.remove();
            }
        });
        
        // Efecto click
        card.addEventListener('click', function() {
            const mockupNumero = this.querySelector('.mockup-numero').textContent;
            const mockupTitulo = this.querySelector('.mockup-titulo').textContent;
            
            // Efecto de pulso
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }, 100);
            
            // Mostrar información del mockup
            showMockupInfo(mockupNumero, mockupTitulo);
        });
    });
    
    console.log('✅ Efectos de mockups configurados');
}

// ===== NAVEGACIÓN EN MOCKUPS =====
function setupMockupNavigation() {
    console.log('🧭 Configurando navegación de mockups...');
    
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover active de todos
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Activar el clickeado
            this.classList.add('active');
            
            // Efecto visual
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            const navText = this.querySelector('span').textContent;
            console.log(`📱 Navegación: ${navText}`);
        });
    });
    
    console.log('✅ Navegación configurada');
}

// ===== ANIMACIONES DE ENTRADA =====
function setupEntranceAnimations() {
    console.log('🎬 Configurando animaciones...');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                entry.target.classList.add('animate-in');
                
                // Animar elementos internos
                animateInternalElements(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.mockup-card').forEach(card => {
        observer.observe(card);
    });
    
    console.log('✅ Animaciones configuradas');
}

// ===== ANIMAR ELEMENTOS INTERNOS =====
function animateInternalElements(card) {
    const mobileScreen = card.querySelector('.mobile-screen');
    if (mobileScreen) {
        mobileScreen.style.transform = 'scale(0.9)';
        mobileScreen.style.opacity = '0';
        
        setTimeout(() => {
            mobileScreen.style.transition = 'all 0.5s ease';
            mobileScreen.style.transform = 'scale(1)';
            mobileScreen.style.opacity = '1';
        }, 200);
    }
}

// ===== CONTADOR DE PANTALLAS =====
function setupScreenCounter() {
    const mockupCards = document.querySelectorAll('.mockup-card').length;
    const etapaTitle = document.querySelector('.header-etapa h1');
    
    if (etapaTitle) {
        const currentText = etapaTitle.textContent;
        if (!currentText.includes('pantallas')) {
            etapaTitle.textContent = `${currentText} (${mockupCards} pantallas)`;
        }
    }
    
    // Actualizar info en header
    const infoItems = document.querySelectorAll('.info-item');
    if (infoItems.length > 0) {
        infoItems[0].querySelector('.info-number').textContent = mockupCards;
    }
    
    console.log(`📊 Total de pantallas: ${mockupCards}`);
}

// ===== EFECTOS DE SCROLL =====
function setupScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.header-etapa');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// ===== MOSTRAR INFORMACIÓN DEL MOCKUP =====
function showMockupInfo(numero, titulo) {
    const info = `📱 INFORMACIÓN DEL MOCKUP\n\n` +
                 `Número: ${numero}\n` +
                 `Título: ${titulo}\n` +
                 `Proyecto: TEVP\n` +
                 `Estado: Mockup Funcional\n` +
                 `Tipo: Aplicación Móvil`;
    
    // Crear modal personalizado en lugar de alert
    createCustomModal(numero, titulo, info);
}

// ===== CREAR MODAL PERSONALIZADO =====
function createCustomModal(numero, titulo, info) {
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Crear modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        border-radius: 15px;
        padding: 30px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #3B82F6, #10B981); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto;">
                <span style="color: white; font-weight: bold; font-size: 18px;">${numero}</span>
            </div>
            <h3 style="color: #1E293B; margin-bottom: 15px; font-size: 20px;">${titulo}</h3>
            <p style="color: #475569; margin-bottom: 20px; line-height: 1.5;">
                Este mockup representa una pantalla funcional de la aplicación TEVP.
            </p>
            <button id="closeModal" style="background: linear-gradient(135deg, #3B82F6, #60A5FA); color: white; border: none; padding: 12px 24px; border-radius: 25px; font-weight: 600; cursor: pointer;">
                Cerrar
            </button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Animar entrada
    setTimeout(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 10);
    
    // Cerrar modal
    const closeBtn = modal.querySelector('#closeModal');
    const closeModal = () => {
        overlay.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
}

// ===== FUNCIONES AUXILIARES GLOBALES =====
window.TEVPMockups = {
    showInfo: showMockupInfo,
    animateCard: function(cardIndex) {
        const cards = document.querySelectorAll('.mockup-card');
        if (cards[cardIndex]) {
            cards[cardIndex].style.transform = 'scale(1.05)';
            setTimeout(() => {
                cards[cardIndex].style.transform = 'scale(1)';
            }, 300);
        }
    },
    getStats: function() {
        const totalMockups = document.querySelectorAll('.mockup-card').length;
        console.log(`📊 Estadísticas TEVP: ${totalMockups} mockups cargados`);
        return totalMockups;
    }
};

console.log('🎉 Sistema JavaScript TEVP cargado completamente');