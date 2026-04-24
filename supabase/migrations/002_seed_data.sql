-- ============================================
-- OFICIOS ARGENTINA - Seed Data
-- Categorías de oficios + Ubicaciones argentinas
-- ============================================

-- ============================================
-- CATEGORÍAS DE OFICIOS
-- ============================================
INSERT INTO categories (name, slug, icon, description, sort_order) VALUES
('Gasista', 'gasista', 'Flame', 'Instalación, reparación y mantenimiento de sistemas de gas', 1),
('Plomero/a', 'plomero', 'Droplets', 'Servicios de plomería, destapaciones y sanitarios', 2),
('Electricista', 'electricista', 'Zap', 'Instalaciones eléctricas, reparaciones y mantenimiento', 3),
('Albañil', 'albanil', 'Brick', 'Construcción, reformas, mampostería y revoques', 4),
('Pintor/a', 'pintor', 'Paintbrush', 'Pintura interior, exterior, decorativa y revestimientos', 5),
('Carpintero/a', 'carpintero', 'Hammer', 'Muebles a medida, placares, pisos de madera', 6),
('Herrero/a', 'herrero', 'Shield', 'Rejas, portones, estructuras metálicas y soldadura', 7),
('Cerrajero/a', 'cerrajero', 'Key', 'Apertura de puertas, cambio de cerraduras, llaves', 8),
('Techista', 'techista', 'Home', 'Techos de chapa, tejas, membrana y reparación de filtraciones', 9),
('Aire Acondicionado', 'aire-acondicionado', 'Wind', 'Instalación, mantenimiento y reparación de equipos de aire', 10),
('Refrigeración', 'refrigeracion', 'Thermometer', 'Reparación de heladeras, freezers y cámaras frigoríficas', 11),
('Técnico/a en PC', 'tecnico-pc', 'Monitor', 'Reparación de computadoras, redes y cámaras de seguridad', 12),
('Jardinero/a', 'jardinero', 'Trees', 'Mantenimiento de jardines, poda, parquización y riego', 13),
('Maestro Mayor de Obras', 'maestro-mayor-de-obras', 'HardHat', 'Dirección de obra, planos, trámites y construcción', 14),
('Limpieza', 'limpieza', 'Sparkles', 'Limpieza de hogares, oficinas, post-obra y fumigación', 15),
('Mudanzas', 'mudanzas', 'Truck', 'Mudanzas residenciales y comerciales, fletes y embalaje', 16),
('Vidriero/a', 'vidriero', 'Square', 'Vidrios, espejos, mamparas y cerramientos de aluminio', 17),
('Durlock / Yeso', 'durlock', 'Layers', 'Cielorrasos, tabiques, revestimientos y aislación', 18),
('Piletero/a', 'piletero', 'Waves', 'Construcción, mantenimiento y reparación de piletas', 19),
('Fumigador/a', 'fumigador', 'Bug', 'Control de plagas, desinfección y fumigación', 20),
('Impermeabilizador/a', 'impermeabilizador', 'Umbrella', 'Impermeabilización de techos, terrazas y subsuelos', 21),
('Electrodomésticos', 'electrodomesticos', 'Wrench', 'Reparación de lavarropas, hornos, microondas y más', 22),
('Cortinas y Toldos', 'cortinas', 'Blinds', 'Cortinas roller, blackout, toldos y persianas', 23),
('Tapicero/a', 'tapicero', 'Armchair', 'Tapizado de sillones, sillas y restauración', 24);

-- SUBCATEGORÍAS (usando parent_id)
-- Gasista
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
('Instalación de artefactos', 'gasista-instalacion', (SELECT id FROM categories WHERE slug='gasista'), 1),
('Reparación de calefones', 'gasista-calefones', (SELECT id FROM categories WHERE slug='gasista'), 2),
('Detección de fugas', 'gasista-fugas', (SELECT id FROM categories WHERE slug='gasista'), 3),
('Habilitación de gas', 'gasista-habilitacion', (SELECT id FROM categories WHERE slug='gasista'), 4);

-- Plomero
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
('Destapaciones', 'plomero-destapaciones', (SELECT id FROM categories WHERE slug='plomero'), 1),
('Instalación de sanitarios', 'plomero-sanitarios', (SELECT id FROM categories WHERE slug='plomero'), 2),
('Reparación de cañerías', 'plomero-canerias', (SELECT id FROM categories WHERE slug='plomero'), 3),
('Termotanques', 'plomero-termotanques', (SELECT id FROM categories WHERE slug='plomero'), 4);

-- Electricista
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
('Instalación domiciliaria', 'electricista-domiciliaria', (SELECT id FROM categories WHERE slug='electricista'), 1),
('Tableros y térmicas', 'electricista-tableros', (SELECT id FROM categories WHERE slug='electricista'), 2),
('Iluminación', 'electricista-iluminacion', (SELECT id FROM categories WHERE slug='electricista'), 3),
('Puesta a tierra', 'electricista-puesta-tierra', (SELECT id FROM categories WHERE slug='electricista'), 4);

-- Albañil
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
('Reformas y remodelaciones', 'albanil-reformas', (SELECT id FROM categories WHERE slug='albanil'), 1),
('Colocación de cerámicos', 'albanil-ceramicos', (SELECT id FROM categories WHERE slug='albanil'), 2),
('Revoques y enlucidos', 'albanil-revoques', (SELECT id FROM categories WHERE slug='albanil'), 3),
('Construcción general', 'albanil-construccion', (SELECT id FROM categories WHERE slug='albanil'), 4);

-- Pintor
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
('Pintura interior', 'pintor-interior', (SELECT id FROM categories WHERE slug='pintor'), 1),
('Pintura exterior', 'pintor-exterior', (SELECT id FROM categories WHERE slug='pintor'), 2),
('Pintura decorativa', 'pintor-decorativa', (SELECT id FROM categories WHERE slug='pintor'), 3),
('Impermeabilización', 'pintor-impermeabilizacion', (SELECT id FROM categories WHERE slug='pintor'), 4);

-- Carpintero
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
('Muebles a medida', 'carpintero-muebles', (SELECT id FROM categories WHERE slug='carpintero'), 1),
('Placares y vestidores', 'carpintero-placares', (SELECT id FROM categories WHERE slug='carpintero'), 2),
('Pisos de madera', 'carpintero-pisos', (SELECT id FROM categories WHERE slug='carpintero'), 3),
('Puertas y ventanas', 'carpintero-puertas', (SELECT id FROM categories WHERE slug='carpintero'), 4);

-- ============================================
-- UBICACIONES ARGENTINAS
-- ============================================

-- CABA
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Ciudad Autónoma de Buenos Aires', 'Buenos Aires', 'caba', 1);

-- Buenos Aires (provincia)
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Buenos Aires', 'La Plata', 'la-plata', 1),
('Buenos Aires', 'Mar del Plata', 'mar-del-plata', 2),
('Buenos Aires', 'Bahía Blanca', 'bahia-blanca', 3),
('Buenos Aires', 'Quilmes', 'quilmes', 4),
('Buenos Aires', 'Lanús', 'lanus', 5),
('Buenos Aires', 'Avellaneda', 'avellaneda', 6),
('Buenos Aires', 'Lomas de Zamora', 'lomas-de-zamora', 7),
('Buenos Aires', 'Morón', 'moron', 8),
('Buenos Aires', 'San Isidro', 'san-isidro', 9),
('Buenos Aires', 'Vicente López', 'vicente-lopez', 10),
('Buenos Aires', 'Tigre', 'tigre', 11),
('Buenos Aires', 'San Martín', 'san-martin', 12),
('Buenos Aires', 'Moreno', 'moreno', 13),
('Buenos Aires', 'Merlo', 'merlo', 14),
('Buenos Aires', 'Florencio Varela', 'florencio-varela', 15),
('Buenos Aires', 'Pilar', 'pilar', 16),
('Buenos Aires', 'Tandil', 'tandil', 17),
('Buenos Aires', 'San Nicolás', 'san-nicolas', 18),
('Buenos Aires', 'Junín', 'junin', 19),
('Buenos Aires', 'Pergamino', 'pergamino', 20),
('Buenos Aires', 'Zona Norte GBA', 'zona-norte', 21),
('Buenos Aires', 'Zona Sur GBA', 'zona-sur', 22),
('Buenos Aires', 'Zona Oeste GBA', 'zona-oeste', 23);

-- Córdoba
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Córdoba', 'Córdoba Capital', 'cordoba', 1),
('Córdoba', 'Villa Carlos Paz', 'carlos-paz', 2),
('Córdoba', 'Río Cuarto', 'rio-cuarto', 3),
('Córdoba', 'Villa María', 'villa-maria', 4),
('Córdoba', 'San Francisco', 'san-francisco-cba', 5),
('Córdoba', 'Alta Gracia', 'alta-gracia', 6);

-- Santa Fe
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Santa Fe', 'Rosario', 'rosario', 1),
('Santa Fe', 'Santa Fe Capital', 'santa-fe', 2),
('Santa Fe', 'Rafaela', 'rafaela', 3),
('Santa Fe', 'Venado Tuerto', 'venado-tuerto', 4),
('Santa Fe', 'Reconquista', 'reconquista', 5);

-- Mendoza
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Mendoza', 'Mendoza Capital', 'mendoza', 1),
('Mendoza', 'San Rafael', 'san-rafael', 2),
('Mendoza', 'Godoy Cruz', 'godoy-cruz', 3),
('Mendoza', 'Guaymallén', 'guaymallen', 4);

-- Tucumán
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Tucumán', 'San Miguel de Tucumán', 'tucuman', 1),
('Tucumán', 'Yerba Buena', 'yerba-buena', 2),
('Tucumán', 'Tafí Viejo', 'tafi-viejo', 3);

-- Entre Ríos
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Entre Ríos', 'Paraná', 'parana', 1),
('Entre Ríos', 'Concordia', 'concordia', 2),
('Entre Ríos', 'Gualeguaychú', 'gualeguaychu', 3);

-- Salta
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Salta', 'Salta Capital', 'salta', 1),
('Salta', 'Tartagal', 'tartagal', 2),
('Salta', 'Orán', 'oran', 3);

-- Misiones
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Misiones', 'Posadas', 'posadas', 1),
('Misiones', 'Oberá', 'obera', 2),
('Misiones', 'Eldorado', 'eldorado', 3);

-- Corrientes
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Corrientes', 'Corrientes Capital', 'corrientes', 1),
('Corrientes', 'Goya', 'goya', 2);

-- Chaco
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Chaco', 'Resistencia', 'resistencia', 1),
('Chaco', 'Sáenz Peña', 'saenz-pena', 2);

-- Santiago del Estero
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Santiago del Estero', 'Santiago del Estero Capital', 'santiago-del-estero', 1),
('Santiago del Estero', 'La Banda', 'la-banda', 2);

-- San Juan
INSERT INTO locations (province, city, slug, sort_order) VALUES
('San Juan', 'San Juan Capital', 'san-juan', 1),
('San Juan', 'Rawson', 'rawson-sj', 2);

-- Jujuy
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Jujuy', 'San Salvador de Jujuy', 'jujuy', 1),
('Jujuy', 'Palpalá', 'palpala', 2);

-- Río Negro
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Río Negro', 'Bariloche', 'bariloche', 1),
('Río Negro', 'General Roca', 'general-roca', 2),
('Río Negro', 'Cipolletti', 'cipolletti', 3),
('Río Negro', 'Viedma', 'viedma', 4);

-- Neuquén
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Neuquén', 'Neuquén Capital', 'neuquen', 1),
('Neuquén', 'San Martín de los Andes', 'san-martin-andes', 2),
('Neuquén', 'Centenario', 'centenario', 3);

-- Chubut
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Chubut', 'Comodoro Rivadavia', 'comodoro-rivadavia', 1),
('Chubut', 'Trelew', 'trelew', 2),
('Chubut', 'Puerto Madryn', 'puerto-madryn', 3);

-- Formosa
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Formosa', 'Formosa Capital', 'formosa', 1);

-- San Luis
INSERT INTO locations (province, city, slug, sort_order) VALUES
('San Luis', 'San Luis Capital', 'san-luis', 1),
('San Luis', 'Villa Mercedes', 'villa-mercedes', 2);

-- La Pampa
INSERT INTO locations (province, city, slug, sort_order) VALUES
('La Pampa', 'Santa Rosa', 'santa-rosa', 1),
('La Pampa', 'General Pico', 'general-pico', 2);

-- Catamarca
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Catamarca', 'San Fernando del Valle de Catamarca', 'catamarca', 1);

-- La Rioja
INSERT INTO locations (province, city, slug, sort_order) VALUES
('La Rioja', 'La Rioja Capital', 'la-rioja', 1),
('La Rioja', 'Chilecito', 'chilecito', 2);

-- Santa Cruz
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Santa Cruz', 'Río Gallegos', 'rio-gallegos', 1),
('Santa Cruz', 'Caleta Olivia', 'caleta-olivia', 2),
('Santa Cruz', 'El Calafate', 'el-calafate', 3);

-- Tierra del Fuego
INSERT INTO locations (province, city, slug, sort_order) VALUES
('Tierra del Fuego', 'Ushuaia', 'ushuaia', 1),
('Tierra del Fuego', 'Río Grande', 'rio-grande-tdf', 2);

-- ============================================
-- PLANES FUTUROS (inactivos)
-- ============================================
INSERT INTO plans (name, slug, description, price_ars, features, is_active) VALUES
('Destacado', 'destacado', 'Aparecé primero en los resultados de búsqueda de tu zona', 5000.00, '{"featured": true, "badge": "destacado", "priority_listing": true}', false),
('Verificado', 'verificado', 'Badge de profesional verificado con identidad confirmada', 8000.00, '{"verified": true, "badge": "verificado", "trust_score": true}', false),
('Premium', 'premium', 'Galería ampliada, analytics avanzados y prioridad en resultados', 10000.00, '{"max_photos": 30, "analytics": true, "priority_listing": true, "badge": "premium"}', false);
