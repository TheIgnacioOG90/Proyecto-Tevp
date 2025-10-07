// ===== TEVP MOCKUP - SISTEMA JAVASCRIPT PROFESIONAL =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 TEVP Mockup Profesional - Sistema Iniciado');
    
    // Inicializar todas las funcionalidades
    initializeTEVPMockup();
});

// ===== FUNCIÓN PRINCIPAL DE INICIALIZACIÓN =====
function initializeTEVPMockup() {
    console.log('🎯 Inicializando sistema TEVP...');
    
    // Configurar navegación entre etapas
    setupStageNavigation();
    
    // Configurar efectos visuales
    setupVisualEffects();
    
    // Configurar animaciones de entrada
    setupAnimations();
    
    // Inicializar primera etapa por defecto
    initializeDefaultStage();
    
    // Configurar contador de pantallas
    setupScreenCounter();
    
    console.log('✅ Sistema TEVP completamente inicializado');
}

// ===== NAVEGACIÓN PRINCIPAL ENTRE ETAPAS =====
function setupStageNavigation() {
    console.log('🔧 Configurando navegación de etapas...');
    
    const stageButtons = document.querySelectorAll('.stage-btn');
    const stageContents = document.querySelectorAll('.stage-content');
    
    if (stageButtons.length === 0) {
        console.warn('⚠️ No se encontraron botones de etapa');
        return;
    }
    
    stageButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const targetStage = this.getAttribute('data-stage');
            
            console.log(`📱 Cambiando a etapa: ${targetStage}`);
            
            // Desactivar todas las etapas con animación
            hideAllStages(stageContents);
            
            // Desactivar todos los botones
            deactivateAllButtons(stageButtons);
            
            // Activar botón clickeado
            this.classList.add('active');
            
            // Mostrar etapa seleccionada con retraso para animación
            setTimeout(() => {
                showStage(targetStage);
            }, 200);
        });
        
        // Agregar efecto hover
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    console.log('✅ Navegación de etapas configurada');
}

// ===== FUNCIÓN PARA OCULTAR TODAS LAS ETAPAS =====
function hideAllStages(stageContents) {
    stageContents.forEach(content => {
        content.classList.remove('active');
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            content.style.display = 'none';
        }, 150);
    });
}

// ===== FUNCIÓN PARA DESACTIVAR TODOS LOS BOTONES =====
function deactivateAllButtons(stageButtons) {
    stageButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.transform = 'translateY(0) scale(1)';
    });
}

// ===== FUNCIÓN PARA MOSTRAR UNA ETAPA ESPECÍFICA =====
function showStage(targetStage) {
    const targetContent = document.getElementById(targetStage);
    
    if (targetContent) {
        // Mostrar el contenedor
        targetContent.style.display = 'block';
        
        // Aplicar animación de entrada
        setTimeout(() => {
            targetContent.classList.add('active');
            targetContent.style.opacity = '1';
            targetContent.style.transform = 'translateY(0)';
        }, 50);
        
        // Actualizar contador de pantallas
        updateScreenCounter(targetContent);
        
        // Animar pantallas individualmente
        animateScreenCards(targetContent);
        
        console.log(`✅ Etapa ${targetStage} mostrada exitosamente`);
    } else {
        console.error(`❌ No se encontró la etapa: ${targetStage}`);
    }
}

// ===== FUNCIÓN PARA CONTAR Y MOSTRAR PANTALLAS =====
function updateScreenCounter(stageContent) {
    const screens = stageContent.querySelectorAll('.screen-card');
    const counter = document.querySelector('.screen-counter');
    
    if (counter) {
        const stageNumber = stageContent.id.replace('stage', '');
        counter.textContent = `Etapa ${stageNumber}: ${screens.length} pantallas`;
        
        // Efecto de actualización del contador
        counter.style.transform = 'scale(1.1)';
        setTimeout(() => {
            counter.style.transform = 'scale(1)';
        }, 200);
    }
    
    console.log(`📊 Etapa activa tiene ${screens.length} pantallas`);
}

// ===== FUNCIÓN PARA CONFIGURAR CONTADOR DE PANTALLAS =====
function setupScreenCounter() {
    const counter = document.querySelector('.screen-counter');
    
    if (counter) {
        counter.addEventListener('click', function() {
            // Mostrar información detallada al hacer clic
            showStageInfo();
        });
        
        // Efecto hover
        counter.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        counter.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// ===== FUNCIÓN PARA MOSTRAR INFORMACIÓN DE ETAPAS =====
function showStageInfo() {
    const stages = [
        { id: 'stage1', name: 'Acceso General', desc: 'Pantallas para usuarios no logueados' },
        { id: 'stage2', name: 'Cliente Logueado', desc: 'Experiencia completa del cliente' },
        { id: 'stage3', name: 'Profesional Logueado', desc: 'Panel del profesional de servicios' }
    ];
    
    let info = '📱 INFORMACIÓN DE ETAPAS TEVP:\n\n';
    
    stages.forEach((stage, index) => {
        const stageElement = document.getElementById(stage.id);
        const screenCount = stageElement ? stageElement.querySelectorAll('.screen-card').length : 0;
        info += `${index + 1}. ${stage.name}\n   ${stage.desc}\n   Pantallas: ${screenCount}\n\n`;
    });
    
    alert(info);
}

// ===== FUNCIÓN PARA EFECTOS VISUALES =====
function setupVisualEffects() {
    console.log('🎨 Configurando efectos visuales...');
    
    const screenCards = document.querySelectorAll('.screen-card');
    
    screenCards.forEach((card, index) => {
        // Efecto hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
        
        // Efecto click en imágenes
        const img = card.querySelector('img');
        if (img) {
            img.addEventListener('click', function() {
                // Efecto de zoom temporal
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
                
                // Mostrar información de la pantalla
                showScreenInfo(card);
            });
        }
        
        // Efecto click en títulos
        const title = card.querySelector('h3');
        if (title) {
            title.addEventListener('click', function() {
                showScreenDetails(card);
            });
        }
    });
    
    console.log('✅ Efectos visuales configurados');
}

// ===== FUNCIÓN PARA MOSTRAR INFORMACIÓN DE PANTALLA =====
function showScreenInfo(card) {
    const title = card.querySelector('h3').textContent;
    const screenData = card.getAttribute('data-screen');
    
    console.log(`📱 Pantalla seleccionada: ${title} (${screenData})`);
    
    // Efecto visual de selección
    card.style.borderColor = '#F59E0B';
    setTimeout(() => {
        card.style.borderColor = '';
    }, 1000);
}

// ===== FUNCIÓN PARA MOSTRAR DETALLES DE PANTALLA =====
function showScreenDetails(card) {
    const title = card.querySelector('h3').textContent;
    const screenData = card.getAttribute('data-screen');
    
    const details = `📱 DETALLES DE PANTALLA\n\n` +
                   `Título: ${title}\n` +
                   `Código: ${screenData}\n` +
                   `Tipo: Mockup TEVP\n` +
                   `Estado: Activo`;
    
    alert(details);
}

// ===== FUNCIÓN PARA ANIMACIONES DE ENTRADA =====
function setupAnimations() {
    console.log('🎬 Configurando animaciones...');
    
    // Configurar observer para animaciones de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = Math.random() * 0.5;
                entry.target.style.animationDelay = `${delay}s`;
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar todas las pantallas
    document.querySelectorAll('.screen-card').forEach(card => {
        observer.observe(card);
    });
    
    console.log('✅ Animaciones configuradas');
}

// ===== FUNCIÓN PARA ANIMAR PANTALLAS INDIVIDUALMENTE =====
function animateScreenCards(stageContent) {
    const screenCards = stageContent.querySelectorAll('.screen-card');
    
    screenCards.forEach((card, index) => {
        // Resetear animación
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        // Aplicar animación con retraso
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ===== FUNCIÓN PARA INICIALIZAR PRIMERA ETAPA =====
function initializeDefaultStage() {
    console.log('🎯 Inicializando etapa por defecto...');
    
    // Buscar el primer botón de etapa
    const firstStageBtn = document.querySelector('.stage-btn[data-stage="stage1"]');
    const firstStageContent = document.getElementById('stage1');
    
    if (firstStageBtn && firstStageContent) {
        // Activar primer botón
        firstStageBtn.classList.add('active');
        
        // Mostrar primer contenido
        firstStageContent.style.display = 'block';
        setTimeout(() => {
            firstStageContent.classList.add('active');
            firstStageContent.style.opacity = '1';
            firstStageContent.style.transform = 'translateY(0)';
        }, 100);
        
        // Actualizar contador
        updateScreenCounter(firstStageContent);
        
        // Animar pantallas
        animateScreenCards(firstStageContent);
        
        console.log('✅ Etapa 1 inicializada por defecto');
    } else {
        console.warn('⚠️ No se pudo inicializar la etapa por defecto');
    }
}

// ===== FUNCIÓN DE BÚSQUEDA DE PANTALLAS =====
function searchScreens(searchTerm) {
    console.log(`🔍 Buscando: ${searchTerm}`);
    
    const allScreens = document.querySelectorAll('.screen-card');
    let foundCount = 0;
    
    allScreens.forEach(screen => {
        const title = screen.querySelector('h3').textContent.toLowerCase();
        const screenData = screen.getAttribute('data-screen').toLowerCase();
        
        const match = title.includes(searchTerm.toLowerCase()) || 
                     screenData.includes(searchTerm.toLowerCase());
        
        if (match) {
            screen.style.opacity = '1';
            screen.style.transform = 'scale(1)';
            foundCount++;
        } else {
            screen.style.opacity = '0.3';
            screen.style.transform = 'scale(0.95)';
        }
    });
    
    console.log(`✅ Encontradas ${foundCount} pantallas`);
    return foundCount;
}

// ===== FUNCIÓN PARA RESETEAR BÚSQUEDA =====
function resetSearch() {
    const allScreens = document.querySelectorAll('.screen-card');
    
    allScreens.forEach(screen => {
        screen.style.opacity = '1';
        screen.style.transform = 'scale(1)';
    });
    
    console.log('🔄 Búsqueda reseteada');
}

// ===== FUNCIÓN DE ESTADÍSTICAS =====
function getStageStatistics() {
    const stages = ['stage1', 'stage2', 'stage3'];
    const stats = {};
    
    stages.forEach(stageId => {
        const stageElement = document.getElementById(stageId);
        if (stageElement) {
            const screenCount = stageElement.querySelectorAll('.screen-card').length;
            stats[stageId] = screenCount;
        }
    });
    
    console.log('📊 Estadísticas TEVP:', stats);
    return stats;
}

// ===== FUNCIONES AUXILIARES GLOBALES =====
window.TEVPMockup = {
    searchScreens: searchScreens,
    resetSearch: resetSearch,
    getStatistics: getStageStatistics,
    showStageInfo: showStageInfo
};

console.log('🎉 Sistema JavaScript TEVP cargado completamente');