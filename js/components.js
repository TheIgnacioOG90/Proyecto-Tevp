/* ===== TEVP - COMPONENTES UI ===== */

TEVP.components = {
  
  // ===== COMPONENTE: TARJETA DE PROFESIONAL =====
  professionalCard: (professional) => {
    const { id, nombre, especialidad, experiencia, calificacion, totalReseñas, 
            tarifaPorHora, avatar, biografia, servicios, disponibilidad, 
            tareasRealizadas, reseñas } = professional;
    
    return `
      <div class="col-md-6 col-lg-4 mb-4 fade-in-up">
        <div class="card professional-card card-hover h-100">
          <div class="card-header text-center bg-white">
            <img src="${avatar}" alt="${nombre}" 
                 class="rounded-circle mb-3" 
                 style="width: 80px; height: 80px; object-fit: cover;">
            <h5 class="card-title mb-1 text-tevp-primary">${nombre}</h5>
            <span class="badge bg-tevp-secondary mb-2">${especialidad}</span>
            <div class="rating mb-2">
              ${TEVP.ui.generateStarRating(calificacion)}
              <small class="ms-1 text-muted">${calificacion} (${totalReseñas} reseñas)</small>
            </div>
          </div>
          
          <div class="card-body p-3">
            <div class="row g-2 mb-3">
              <div class="col-6">
                <small class="text-muted">Experiencia</small>
                <div class="fw-bold">${experiencia} años</div>
              </div>
              <div class="col-6">
                <small class="text-muted">Trabajos</small>
                <div class="fw-bold text-success">${tareasRealizadas}</div>
              </div>
            </div>
            
            <div class="mb-3 text-center">
              <div class="price-highlight h5 mb-1">${TEVP.utils.formatPrice(tarifaPorHora)}/hora</div>
            </div>
            
            <p class="card-text small text-muted">${biografia.substring(0, 100)}...</p>
            
            <div class="mb-2">
              ${servicios.slice(0, 3).map(s => `<span class="badge bg-light text-dark me-1 mb-1 small">${s}</span>`).join('')}
              ${servicios.length > 3 ? `<span class="badge bg-secondary">+${servicios.length - 3}</span>` : ''}
            </div>
          </div>
          
          <div class="card-footer bg-transparent">
            <div class="d-grid gap-2">
              <button class="btn btn-outline-primary btn-sm btn-tevp" 
                      onclick="TEVP.components.showProfessionalDetails(${id})">
                <i class="fas fa-info-circle me-1"></i>Ver Detalles
              </button>
              <button class="btn btn-success btn-tevp" 
                      onclick="TEVP.components.hireProfessional(${id})">
                <i class="fas fa-handshake me-1"></i>Solicitar Servicio
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ===== COMPONENTE: TARJETA DE SERVICIO =====
  serviceCard: (service) => {
    const { id, nombre, descripcion, precio, categoria, imagen, profesionales } = service;
    
    return `
      <div class="col-md-6 col-lg-4 mb-4 fade-in-up">
        <div class="card service-card card-hover h-100">
          <img src="${imagen}" class="card-img-top" alt="${nombre}" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title text-tevp-primary">${nombre}</h5>
              <span class="badge bg-tevp-secondary">${categoria}</span>
            </div>
            <p class="card-text text-muted small">${descripcion}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="price-highlight h6">${TEVP.utils.formatPrice(precio)}</span>
              <small class="text-muted">${profesionales} profesionales</small>
            </div>
          </div>
          <div class="card-footer bg-transparent">
            <button class="btn btn-primary btn-tevp w-100" onclick="TEVP.components.selectService(${id})">
              <i class="fas fa-plus me-1"></i>Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // ===== COMPONENTE: FILTROS =====
  filterControls: (categories, onFilterChange) => `
    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-3">
            <label class="form-label small fw-bold">Categoría</label>
            <select class="form-select form-select-sm" id="filter-category" onchange="${onFilterChange}()">
              <option value="">Todas las categorías</option>
              ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label small fw-bold">Calificación mín.</label>
            <select class="form-select form-select-sm" id="filter-rating" onchange="${onFilterChange}()">
              <option value="0">Cualquiera</option>
              <option value="4">4+ estrellas</option>
              <option value="4.5">4.5+ estrellas</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label small fw-bold">Precio máx.</label>
            <select class="form-select form-select-sm" id="filter-price" onchange="${onFilterChange}()">
              <option value="999999">Sin límite</option>
              <option value="30000">Hasta $30.000</option>
              <option value="50000">Hasta $50.000</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label small fw-bold">Experiencia</label>
            <select class="form-select form-select-sm" id="filter-experience" onchange="${onFilterChange}()">
              <option value="0">Cualquiera</option>
              <option value="5">5+ años</option>
              <option value="10">10+ años</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `,

  // ===== FUNCIONES DE COMPONENTES =====
  showProfessionalDetails: (professionalId) => {
    const professional = TEVP.data.findProfessional(professionalId);
    if (!professional) return;

    const modalBody = `
      <div class="row">
        <div class="col-md-4 text-center">
          <img src="${professional.avatar}" alt="${professional.nombre}" 
               class="rounded-circle mb-3" style="width: 120px; height: 120px; object-fit: cover;">
          <h5 class="text-tevp-primary">${professional.nombre}</h5>
          <p class="text-muted">${professional.especialidad}</p>
        </div>
        <div class="col-md-8">
          <div class="row g-3">
            <div class="col-6">
              <strong class="text-tevp-primary">Experiencia:</strong>
              <div>${professional.experiencia} años</div>
            </div>
            <div class="col-6">
              <strong class="text-tevp-primary">Trabajos:</strong>
              <div>${professional.tareasRealizadas}</div>
            </div>
            <div class="col-6">
              <strong class="text-tevp-primary">Calificación:</strong>
              <div>${TEVP.ui.generateStarRating(professional.calificacion)} ${professional.calificacion}/5</div>
            </div>
            <div class="col-6">
              <strong class="text-tevp-primary">Tarifa:</strong>
              <div class="price-highlight">${TEVP.utils.formatPrice(professional.tarifaPorHora)}/hora</div>
            </div>
          </div>
        </div>
      </div>
      
      <hr>
      
      <div class="row">
        <div class="col-12">
          <h6 class="text-tevp-primary"><i class="fas fa-user me-2"></i>Biografía</h6>
          <p class="text-muted">${professional.biografia}</p>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-6">
          <h6 class="text-tevp-primary"><i class="fas fa-tools me-2"></i>Servicios</h6>
          <div>
            ${professional.servicios.map(s => `<span class="badge bg-primary me-1 mb-1">${s}</span>`).join('')}
          </div>
        </div>
        <div class="col-md-6">
          <h6 class="text-tevp-primary"><i class="fas fa-clock me-2"></i>Disponibilidad</h6>
          <p class="text-muted">${professional.disponibilidad}</p>
        </div>
      </div>
      
      ${professional.reseñas && professional.reseñas.length > 0 ? `
        <hr>
        <h6 class="text-tevp-primary"><i class="fas fa-comments me-2"></i>Reseñas Recientes</h6>
        ${professional.reseñas.slice(0, 2).map(review => `
          <div class="border-start border-3 border-primary ps-3 mb-2">
            <div class="d-flex justify-content-between">
              <strong>${review.cliente}</strong>
              ${TEVP.ui.generateStarRating(review.calificacion, 'sm')}
            </div>
            <p class="mb-0 fst-italic text-muted">"${review.comentario}"</p>
          </div>
        `).join('')}
      ` : ''}
    `;

    const footer = `
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      <button type="button" class="btn btn-success btn-tevp" 
              onclick="TEVP.components.hireProfessional(${professionalId})" data-bs-dismiss="modal">
        <i class="fas fa-handshake me-1"></i>Solicitar Servicio
      </button>
    `;

    const modal = TEVP.ui.createModal(
      'professionalDetailsModal',
      `<i class="fas fa-user-graduate me-2"></i>${professional.nombre}`,
      modalBody,
      footer
    );
    
    modal.show();
  },

  hireProfessional: (professionalId) => {
    const professional = TEVP.data.findProfessional(professionalId);
    if (!professional) return;
    
    TEVP.utils.showAlert(
      `¡Solicitud enviada! Te contactaremos pronto para coordinar con ${professional.nombre}`,
      'success'
    );
  },

  selectService: (serviceId) => {
    TEVP.utils.showAlert('Servicio agregado al carrito', 'success');
  }
};

// ===== FUNCIONES GLOBALES PARA COMPATIBILIDAD =====
window.showProfessionalDetails = TEVP.components.showProfessionalDetails;
window.hireProfessional = TEVP.components.hireProfessional;