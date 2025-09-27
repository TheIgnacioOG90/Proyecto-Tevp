    -- =====================================================
    -- MODELO DE DATOS PARA PROYECTO TEVP
    -- (Técnicos Especializados y Venta de Productos)
    -- Para Oracle Data Modeler - Diagrama Entidad-Relación
    -- =====================================================

    -- TABLA: USUARIOS
    -- Almacena información de todos los usuarios del sistema
    CREATE TABLE usuarios (
        id_usuario NUMBER(10) PRIMARY KEY,
        run VARCHAR2(12) UNIQUE NOT NULL,
        nombre VARCHAR2(100) NOT NULL,
        apellidos VARCHAR2(150) NOT NULL,
        email VARCHAR2(150) UNIQUE NOT NULL,
        telefono VARCHAR2(20),
        fecha_nacimiento DATE,
        direccion VARCHAR2(300),
        region VARCHAR2(50),
        comuna VARCHAR2(50),
        password_hash VARCHAR2(255) NOT NULL,
        tipo_usuario VARCHAR2(20) DEFAULT 'CLIENTE' CHECK (tipo_usuario IN ('CLIENTE', 'PROFESIONAL', 'ADMIN')),
        estado VARCHAR2(20) DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO', 'INACTIVO', 'SUSPENDIDO')),
        fecha_registro DATE DEFAULT SYSDATE,
        fecha_actualizacion DATE DEFAULT SYSDATE,
        acepta_terminos CHAR(1) DEFAULT 'S' CHECK (acepta_terminos IN ('S', 'N')),
        verificado CHAR(1) DEFAULT 'N' CHECK (verificado IN ('S', 'N'))
    );

    -- TABLA: CATEGORIAS_SERVICIOS
    -- Define las categorías de servicios disponibles en TEVP
    CREATE TABLE categorias_servicios (
        id_categoria NUMBER(10) PRIMARY KEY,
        nombre VARCHAR2(100) NOT NULL UNIQUE,
        descripcion VARCHAR2(500),
        imagen_url VARCHAR2(300),
        activo CHAR(1) DEFAULT 'S' CHECK (activo IN ('S', 'N')),
        orden_display NUMBER(3) DEFAULT 1,
        fecha_creacion DATE DEFAULT SYSDATE
    );

    -- TABLA: SERVICIOS
    -- Catálogo de servicios ofrecidos por los profesionales
    CREATE TABLE servicios (
        id_servicio NUMBER(10) PRIMARY KEY,
        id_categoria NUMBER(10) NOT NULL,
        nombre VARCHAR2(200) NOT NULL,
        descripcion CLOB NOT NULL,
        precio_base NUMBER(10,2) NOT NULL,
        duracion_horas NUMBER(5,2) DEFAULT 1,
        imagen_url VARCHAR2(300),
        requiere_materiales CHAR(1) DEFAULT 'N' CHECK (requiere_materiales IN ('S', 'N')),
        activo CHAR(1) DEFAULT 'S' CHECK (activo IN ('S', 'N')),
        fecha_creacion DATE DEFAULT SYSDATE,
        fecha_actualizacion DATE DEFAULT SYSDATE,
        CONSTRAINT fk_servicio_categoria FOREIGN KEY (id_categoria) REFERENCES categorias_servicios(id_categoria)
    );

    -- TABLA: PROFESIONALES
    -- Información específica de usuarios que son profesionales
    CREATE TABLE profesionales (
        id_profesional NUMBER(10) PRIMARY KEY,
        id_usuario NUMBER(10) NOT NULL UNIQUE,
        especialidad VARCHAR2(100) NOT NULL,
        experiencia_anos NUMBER(3) DEFAULT 0,
        certificaciones VARCHAR2(500),
        precio_hora NUMBER(8,2) NOT NULL,
        radio_cobertura NUMBER(5,2) DEFAULT 10, -- en kilómetros
        calificacion_promedio NUMBER(3,2) DEFAULT 0 CHECK (calificacion_promedio >= 0 AND calificacion_promedio <= 5),
        total_trabajos NUMBER(10) DEFAULT 0,
        disponible CHAR(1) DEFAULT 'S' CHECK (disponible IN ('S', 'N')),
        fecha_registro DATE DEFAULT SYSDATE,
        CONSTRAINT fk_profesional_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
    );

    -- TABLA: SERVICIOS_PROFESIONALES
    -- Relación muchos a muchos entre profesionales y servicios que ofrecen
    CREATE TABLE servicios_profesionales (
        id_profesional NUMBER(10),
        id_servicio NUMBER(10),
        precio_personalizado NUMBER(10,2),
        activo CHAR(1) DEFAULT 'S' CHECK (activo IN ('S', 'N')),
        fecha_asignacion DATE DEFAULT SYSDATE,
        PRIMARY KEY (id_profesional, id_servicio),
        CONSTRAINT fk_sp_profesional FOREIGN KEY (id_profesional) REFERENCES profesionales(id_profesional),
        CONSTRAINT fk_sp_servicio FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio)
    );

    -- TABLA: PEDIDOS
    -- Órdenes de servicios solicitados por los clientes
    CREATE TABLE pedidos (
        id_pedido NUMBER(10) PRIMARY KEY,
        numero_pedido VARCHAR2(20) UNIQUE NOT NULL,
        id_cliente NUMBER(10) NOT NULL,
        id_profesional NUMBER(10),
        fecha_solicitud DATE DEFAULT SYSDATE,
        fecha_programada DATE,
        fecha_completado DATE,
        direccion_servicio VARCHAR2(300) NOT NULL,
        descripcion_problema CLOB,
        estado VARCHAR2(20) DEFAULT 'PENDIENTE' CHECK (estado IN ('PENDIENTE', 'CONFIRMADO', 'EN_PROCESO', 'COMPLETADO', 'CANCELADO')),
        subtotal NUMBER(12,2) DEFAULT 0,
        impuestos NUMBER(12,2) DEFAULT 0,
        total NUMBER(12,2) NOT NULL,
        metodo_pago VARCHAR2(50),
        comentarios_cliente CLOB,
        comentarios_profesional CLOB,
        fecha_creacion DATE DEFAULT SYSDATE,
        fecha_actualizacion DATE DEFAULT SYSDATE,
        CONSTRAINT fk_pedido_cliente FOREIGN KEY (id_cliente) REFERENCES usuarios(id_usuario),
        CONSTRAINT fk_pedido_profesional FOREIGN KEY (id_profesional) REFERENCES profesionales(id_profesional)
    );

    -- TABLA: DETALLE_PEDIDOS
    -- Líneas de detalle de cada pedido (servicios específicos solicitados)
    CREATE TABLE detalle_pedidos (
        id_detalle NUMBER(10) PRIMARY KEY,
        id_pedido NUMBER(10) NOT NULL,
        id_servicio NUMBER(10) NOT NULL,
        cantidad NUMBER(5,2) DEFAULT 1,
        precio_unitario NUMBER(10,2) NOT NULL,
        subtotal NUMBER(12,2) NOT NULL,
        observaciones VARCHAR2(500),
        CONSTRAINT fk_detalle_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
        CONSTRAINT fk_detalle_servicio FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio)
    );

    -- TABLA: CALIFICACIONES
    -- Sistema de calificaciones y reseñas de servicios
    CREATE TABLE calificaciones (
        id_calificacion NUMBER(10) PRIMARY KEY,
        id_pedido NUMBER(10) NOT NULL UNIQUE,
        id_cliente NUMBER(10) NOT NULL,
        id_profesional NUMBER(10) NOT NULL,
        puntuacion NUMBER(1) NOT NULL CHECK (puntuacion >= 1 AND puntuacion <= 5),
        comentario CLOB,
        fecha_calificacion DATE DEFAULT SYSDATE,
        CONSTRAINT fk_calificacion_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
        CONSTRAINT fk_calificacion_cliente FOREIGN KEY (id_cliente) REFERENCES usuarios(id_usuario),
        CONSTRAINT fk_calificacion_profesional FOREIGN KEY (id_profesional) REFERENCES profesionales(id_profesional)
    );

    -- TABLA: PAGOS
    -- Registro de pagos realizados por los clientes
    CREATE TABLE pagos (
        id_pago NUMBER(10) PRIMARY KEY,
        id_pedido NUMBER(10) NOT NULL,
        monto NUMBER(12,2) NOT NULL,
        metodo_pago VARCHAR2(50) NOT NULL,
        estado_pago VARCHAR2(20) DEFAULT 'PENDIENTE' CHECK (estado_pago IN ('PENDIENTE', 'PROCESANDO', 'APROBADO', 'RECHAZADO', 'REEMBOLSADO')),
        referencia_externa VARCHAR2(100),
        fecha_pago DATE DEFAULT SYSDATE,
        fecha_procesado DATE,
        CONSTRAINT fk_pago_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
    );

    -- TABLA: HORARIOS_PROFESIONALES
    -- Disponibilidad horaria de cada profesional
    CREATE TABLE horarios_profesionales (
        id_horario NUMBER(10) PRIMARY KEY,
        id_profesional NUMBER(10) NOT NULL,
        dia_semana NUMBER(1) NOT NULL CHECK (dia_semana >= 1 AND dia_semana <= 7), -- 1=Lunes, 7=Domingo
        hora_inicio VARCHAR2(5) NOT NULL, -- Formato HH:MM
        hora_fin VARCHAR2(5) NOT NULL,
        activo CHAR(1) DEFAULT 'S' CHECK (activo IN ('S', 'N')),
        CONSTRAINT fk_horario_profesional FOREIGN KEY (id_profesional) REFERENCES profesionales(id_profesional)
    );

    -- TABLA: MENSAJES
    -- Sistema de mensajería entre clientes y profesionales
    CREATE TABLE mensajes (
        id_mensaje NUMBER(10) PRIMARY KEY,
        id_pedido NUMBER(10),
        id_remitente NUMBER(10) NOT NULL,
        id_destinatario NUMBER(10) NOT NULL,
        asunto VARCHAR2(200),
        mensaje CLOB NOT NULL,
        leido CHAR(1) DEFAULT 'N' CHECK (leido IN ('S', 'N')),
        fecha_envio DATE DEFAULT SYSDATE,
        fecha_leido DATE,
        CONSTRAINT fk_mensaje_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
        CONSTRAINT fk_mensaje_remitente FOREIGN KEY (id_remitente) REFERENCES usuarios(id_usuario),
        CONSTRAINT fk_mensaje_destinatario FOREIGN KEY (id_destinatario) REFERENCES usuarios(id_usuario)
    );

    -- TABLA: CARRITO_COMPRAS
    -- Carrito temporal de servicios antes de generar pedido
    CREATE TABLE carrito_compras (
        id_carrito NUMBER(10) PRIMARY KEY,
        id_usuario NUMBER(10) NOT NULL,
        id_servicio NUMBER(10) NOT NULL,
        cantidad NUMBER(5,2) DEFAULT 1,
        precio_unitario NUMBER(10,2) NOT NULL,
        fecha_agregado DATE DEFAULT SYSDATE,
        CONSTRAINT fk_carrito_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
        CONSTRAINT fk_carrito_servicio FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio),
        CONSTRAINT uk_carrito_usuario_servicio UNIQUE (id_usuario, id_servicio)
    );

    -- =====================================================
    -- SECUENCIAS PARA PRIMARY KEYS (AUTO-INCREMENT)
    -- =====================================================

    CREATE SEQUENCE seq_usuarios START WITH 1 INCREMENT BY 1;
    CREATE SEQUENCE seq_categorias START WITH 1 INCREMENT BY 1;
    CREATE SEQUENCE seq_servicios START WITH 1 INCREMENT BY 1;
    CREATE SEQUENCE seq_profesionales START WITH 1 INCREMENT BY 1;
    CREATE SEQUENCE seq_pedidos START WITH 1 INCREMENT BY 1;
    CREATE SEQUENCE seq_detalle_pedidos START WITH 1 INCREMENT BY 1;
    CREATE SEQUENCE seq_calificaciones START WITH 1 INCREMENT BY 1;
    CREATE SEQUENCE seq_pagos START WITH 1 INCREMENT BY 1;
    CREATE SEQUENCE seq_horarios START WITH 1 INCREMENT BY 1;
    CREATE SEQUENCE seq_mensajes START WITH 1 INCREMENT BY 1;
    CREATE SEQUENCE seq_carrito START WITH 1 INCREMENT BY 1;

    -- =====================================================
    -- TRIGGERS PARA AUTO-INCREMENT Y AUDITORÍA
    -- =====================================================

    -- Trigger para usuarios
    CREATE OR REPLACE TRIGGER tr_usuarios_pk
        BEFORE INSERT ON usuarios
        FOR EACH ROW
    BEGIN
        IF :NEW.id_usuario IS NULL THEN
            :NEW.id_usuario := seq_usuarios.NEXTVAL;
        END IF;
    END;

    -- Trigger para actualización de fecha
    CREATE OR REPLACE TRIGGER tr_usuarios_update
        BEFORE UPDATE ON usuarios
        FOR EACH ROW
    BEGIN
        :NEW.fecha_actualizacion := SYSDATE;
    END;

    -- =====================================================
    -- ÍNDICES PARA OPTIMIZACIÓN DE CONSULTAS
    -- =====================================================

    -- Índices para búsquedas frecuentes
    CREATE INDEX idx_usuarios_email ON usuarios(email);
    CREATE INDEX idx_usuarios_run ON usuarios(run);
    CREATE INDEX idx_usuarios_tipo ON usuarios(tipo_usuario);
    CREATE INDEX idx_servicios_categoria ON servicios(id_categoria);
    CREATE INDEX idx_servicios_activo ON servicios(activo);
    CREATE INDEX idx_profesionales_especialidad ON profesionales(especialidad);
    CREATE INDEX idx_profesionales_disponible ON profesionales(disponible);
    CREATE INDEX idx_pedidos_cliente ON pedidos(id_cliente);
    CREATE INDEX idx_pedidos_profesional ON pedidos(id_profesional);
    CREATE INDEX idx_pedidos_estado ON pedidos(estado);
    CREATE INDEX idx_pedidos_fecha ON pedidos(fecha_solicitud);
    CREATE INDEX idx_calificaciones_profesional ON calificaciones(id_profesional);

    -- =====================================================
    -- DATOS DE PRUEBA (OPCIONAL)
    -- =====================================================

    -- Insertar categorías de servicios
    INSERT INTO categorias_servicios (id_categoria, nombre, descripcion, orden_display) VALUES 
    (seq_categorias.NEXTVAL, 'Plomería', 'Servicios de instalación y reparación de sistemas de agua y desagües', 1);

    INSERT INTO categorias_servicios (id_categoria, nombre, descripcion, orden_display) VALUES 
    (seq_categorias.NEXTVAL, 'Electricidad', 'Instalaciones eléctricas, reparaciones y mantenimiento', 2);

    INSERT INTO categorias_servicios (id_categoria, nombre, descripcion, orden_display) VALUES 
    (seq_categorias.NEXTVAL, 'Climatización', 'Instalación y mantención de sistemas de calefacción y aire acondicionado', 3);

    INSERT INTO categorias_servicios (id_categoria, nombre, descripcion, orden_display) VALUES 
    (seq_categorias.NEXTVAL, 'Construcción', 'Servicios de construcción, remodelación y albañilería', 4);

    INSERT INTO categorias_servicios (id_categoria, nombre, descripcion, orden_display) VALUES 
    (seq_categorias.NEXTVAL, 'Electrodomésticos', 'Reparación y mantención de electrodomésticos', 5);

    INSERT INTO categorias_servicios (id_categoria, nombre, descripcion, orden_display) VALUES 
    (seq_categorias.NEXTVAL, 'Soldadura', 'Servicios de soldadura y metalmecánica', 6);

    -- Confirmar transacciones
    COMMIT;

    -- =====================================================
    -- COMENTARIOS EN TABLAS Y COLUMNAS
    -- =====================================================

    COMMENT ON TABLE usuarios IS 'Tabla principal de usuarios del sistema TEVP (clientes, profesionales, administradores)';
    COMMENT ON TABLE categorias_servicios IS 'Catálogo de categorías de servicios disponibles';
    COMMENT ON TABLE servicios IS 'Catálogo de servicios técnicos ofrecidos en la plataforma';
    COMMENT ON TABLE profesionales IS 'Información específica de usuarios que brindan servicios técnicos';
    COMMENT ON TABLE pedidos IS 'Órdenes de servicios solicitados por clientes';
    COMMENT ON TABLE detalle_pedidos IS 'Líneas de detalle de cada pedido con servicios específicos';
    COMMENT ON TABLE calificaciones IS 'Sistema de calificaciones y reseñas de servicios completados';
    COMMENT ON TABLE pagos IS 'Registro de transacciones de pago realizadas';

    -- =====================================================
    -- FIN DEL SCRIPT DE MODELO DE DATOS TEVP
    -- Para importar en Oracle Data Modeler y generar diagrama ER
    -- =====================================================