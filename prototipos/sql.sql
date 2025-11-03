-- Usuarios
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Canción base
CREATE TABLE cancion (
  id SERIAL PRIMARY KEY,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Dificultad
CREATE TABLE dificultad (
  id SERIAL PRIMARY KEY,
  nombre TEXT UNIQUE NOT NULL,
  descripcion TEXT,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Información de canción
CREATE TABLE cancion_info (
  id SERIAL PRIMARY KEY,
  cancion_id INTEGER REFERENCES cancion(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  artista TEXT,
  dificultad_id INTEGER REFERENCES dificultad(id),
  tonalidad TEXT,
  artista_id INTEGER REFERENCES artista(id),
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Letra
CREATE TABLE cancion_letra (
  id SERIAL PRIMARY KEY,
  cancion_id INTEGER REFERENCES cancion(id) ON DELETE CASCADE,
  letra TEXT,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Tablatura
CREATE TABLE cancion_tablatura (
  id SERIAL PRIMARY KEY,
  cancion_id INTEGER REFERENCES cancion(id) ON DELETE CASCADE,
  contenido TEXT,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Tags
CREATE TABLE tag (
  id SERIAL PRIMARY KEY,
  nombre TEXT UNIQUE NOT NULL,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Relación canción-tag
CREATE TABLE cancion_tag (
  id SERIAL PRIMARY KEY,
  cancion_id INTEGER REFERENCES cancion(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tag(id) ON DELETE CASCADE,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Favoritos
CREATE TABLE favorito (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuario(id) ON DELETE CASCADE,
  cancion_id INTEGER REFERENCES cancion(id) ON DELETE CASCADE,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Historial
CREATE TABLE historial (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuario(id) ON DELETE CASCADE,
  cancion_id INTEGER REFERENCES cancion(id) ON DELETE CASCADE,
  fecha_acceso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Tipo de herramienta
CREATE TABLE tipo_herramienta (
  id SERIAL PRIMARY KEY,
  nombre TEXT UNIQUE NOT NULL,
  descripcion TEXT,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Herramientas
CREATE TABLE herramienta (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuario(id) ON DELETE CASCADE,
  tipo_id INTEGER REFERENCES tipo_herramienta(id),
  configuracion JSONB,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Artistas
CREATE TABLE artista (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  biografia TEXT,
  sitio_web TEXT,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Videos tutoriales
CREATE TABLE video_tutorial (
  id SERIAL PRIMARY KEY,
  cancion_id INTEGER REFERENCES cancion(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  descripcion TEXT,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Artículos
CREATE TABLE articulo_blog (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  contenido TEXT,
  autor TEXT,
  fch_publicacion TIMESTAMP,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Profesores
CREATE TABLE profesor (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuario(id),
  descripcion TEXT,
  instrumento TEXT,
  ubicacion TEXT,
  contacto TEXT,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Progreso
CREATE TABLE progreso_usuario (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuario(id),
  cancion_id INTEGER REFERENCES cancion(id),
  porcentaje NUMERIC(5,2),
  ultima_practica TIMESTAMP,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Comentarios
CREATE TABLE comentario (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuario(id),
  cancion_id INTEGER REFERENCES cancion(id),
  contenido TEXT,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Listas
CREATE TABLE lista_personal (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuario(id),
  nombre TEXT NOT NULL,
  descripcion TEXT,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Relación lista-canción
CREATE TABLE lista_cancion (
  id SERIAL PRIMARY KEY,
  lista_id INTEGER REFERENCES lista_personal(id),
  cancion_id INTEGER REFERENCES cancion(id),
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Tipo de permiso
CREATE TABLE tipo_permiso (
  id SERIAL PRIMARY KEY,
  nombre TEXT UNIQUE NOT NULL,
  descripcion TEXT,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Compartir canción
CREATE TABLE cancion_compartida (
  id SERIAL PRIMARY KEY,
  cancion_id INTEGER REFERENCES cancion(id) ON DELETE CASCADE,
  propietario_id INTEGER REFERENCES usuario(id),
  compartido_con_id INTEGER REFERENCES usuario(id),
  permiso_id INTEGER REFERENCES tipo_permiso(id),
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Versiones
CREATE TABLE cancion_version (
  id SERIAL PRIMARY KEY,
  cancion_id INTEGER REFERENCES cancion(id) ON DELETE CASCADE,
  numero_version INTEGER,
  descripcion TEXT,
  contenido JSONB,
  creado_por INTEGER REFERENCES usuario(id),
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Comentarios colaborativos
CREATE TABLE comentario_colaborativo (
  id SERIAL PRIMARY KEY,
  cancion_id INTEGER REFERENCES cancion(id),
  usuario_id INTEGER REFERENCES usuario(id),
  contenido TEXT,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Estado de sesión
CREATE TABLE estado_sesion (
  id SERIAL PRIMARY KEY,
  nombre TEXT UNIQUE NOT NULL,
  descripcion TEXT,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Sesión en vivo
CREATE TABLE sesion_en_vivo (
  id SERIAL PRIMARY KEY,
  cancion_id INTEGER REFERENCES cancion(id),
  iniciada_por INTEGER REFERENCES usuario(id),
  estado_id INTEGER REFERENCES estado_sesion(id),
  fch_inicio TIMESTAMP,
  fch_fin TIMESTAMP,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Rol de sesión
CREATE TABLE rol_sesion (
  id SERIAL PRIMARY KEY,
  nombre TEXT UNIQUE NOT NULL,
  descripcion TEXT,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);

-- Usuarios en sesión
CREATE TABLE sesion_usuario (
  id SERIAL PRIMARY KEY,
  sesion_id INTEGER REFERENCES sesion_en_vivo(id),
  usuario_id INTEGER REFERENCES usuario(id),
  rol_id INTEGER REFERENCES rol_sesion(id),
  conectado BOOLEAN DEFAULT TRUE,
  fch_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usr_ins TEXT,
  fch_upd TIMESTAMP,
  usr_upd TEXT
);



-------------------------------
-- datos --
-------------------------------
INSERT INTO usuario (nombre, email, password, usr_ins)
VALUES 
  ('Noe', 'noe@guitarraclub.com', 'hashedpass123', 'system'),
  ('Leo', 'leo@guitarraclub.com', 'hashedpass456', 'system');

INSERT INTO dificultad (nombre, descripcion, usr_ins)
VALUES 
  ('Principiante', 'Ideal para quienes recién comienzan', 'system'),
  ('Intermedio', 'Requiere conocimientos básicos de acordes', 'system'),
  ('Avanzado', 'Técnicas complejas y velocidad', 'system');

INSERT INTO tipo_herramienta (nombre, descripcion, usr_ins)
VALUES 
  ('afinador', 'Herramienta para afinar cuerdas', 'system'),
  ('metronomo', 'Herramienta para marcar el tempo', 'system');


INSERT INTO tipo_permiso (nombre, descripcion, usr_ins)
VALUES 
  ('lectura', 'Solo puede visualizar la canción', 'system'),
  ('edicion', 'Puede modificar contenido', 'system'),
  ('comentario', 'Puede dejar comentarios', 'system');

INSERT INTO estado_sesion (nombre, descripcion, usr_ins)
VALUES 
  ('activa', 'Sesión en curso', 'system'),
  ('finalizada', 'Sesión cerrada', 'system');

INSERT INTO rol_sesion (nombre, descripcion, usr_ins)
VALUES 
  ('cantante', 'Encargado de la voz principal', 'system'),
  ('guitarrista', 'Ejecuta la guitarra principal', 'system'),
  ('bajista', 'Ejecuta el bajo', 'system'),
  ('observador', 'Solo visualiza la sesión', 'system');

-- Canción base
INSERT INTO cancion (usr_ins) VALUES ('Noe');

-- Info de la canción
INSERT INTO cancion_info (cancion_id, nombre, artista, dificultad_id, tonalidad, usr_ins)
VALUES (1, 'Sweet Child O\' Mine', 'Guns N\' Roses', 2, 'D', 'Noe');

-- Letra
INSERT INTO cancion_letra (cancion_id, letra, usr_ins)
VALUES (1, 'She\'s got a smile that it seems to me...', 'Noe');

-- Tablatura
INSERT INTO cancion_tablatura (cancion_id, contenido, usr_ins)
VALUES (1, 'E|----------------|\nB|----------------|\nG|--0--2--4--2--0--|', 'Noe');

INSERT INTO tag (nombre, usr_ins)
VALUES 
  ('Rock', 'Noe'),
  ('Clásico', 'Noe');

INSERT INTO cancion_tag (cancion_id, tag_id, usr_ins)
VALUES 
  (1, 1, 'Noe'),
  (1, 2, 'Noe');

INSERT INTO favorito (usuario_id, cancion_id, usr_ins)
VALUES 
  (1, 1, 'Noe'),
  (2, 1, 'Leo');


INSERT INTO herramienta (usuario_id, tipo_id, configuracion, usr_ins)
VALUES 
  (1, 1, '{"nota_base": "E", "frecuencia": 82.41}', 'Noe'),
  (1, 2, '{"bpm": 120}', 'Noe');


INSERT INTO sesion_en_vivo (cancion_id, iniciada_por, estado_id, fch_inicio, usr_ins)
VALUES (1, 1, 1, CURRENT_TIMESTAMP, 'Noe');

INSERT INTO sesion_usuario (sesion_id, usuario_id, rol_id, conectado, usr_ins)
VALUES 
  (1, 1, 1, TRUE, 'Noe'),
  (1, 2, 2, TRUE, 'Noe');
