/* Crear tabla usuario */
CREATE TABLE "usuario" (
    id SERIAL,
	nombre VARCHAR(255) NOT NULL,
	contrasena TEXT NOT NULL,
	"fechaCreacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"fechaEdicion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "pkUsuario" PRIMARY KEY (id)
);

/* Crear tabla recibo */
CREATE TABLE "recibo" (
    id SERIAL,
	proveedor VARCHAR(255) NOT NULL,
	monto NUMERIC(6,2),
	moneda VARCHAR(255),
	fecha DATE,
	comentario TEXT,
	"fechaCreacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"fechaEdicion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "pkRecibo" PRIMARY KEY (id)
);

/* Crear tabla relacional usuarioRecibo */
CREATE TABLE "usuarioRecibo" (
    id SERIAL,
	"usuarioId" INT NOT NULL,
	"reciboId" INT NOT NULL,
	"fechaCreacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"fechaEdicion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "pkUsuarioRecibo" PRIMARY KEY (id),
	CONSTRAINT "fkUsuarioId" FOREIGN KEY("usuarioId") REFERENCES "usuario"(id),
	CONSTRAINT "fkReciboId" FOREIGN KEY("reciboId") REFERENCES "recibo"(id)
);

/* Inserar un usuario por defecto en tabla "usuario" */
INSERT INTO "usuario"("id", "nombre", "contrasena", "fechaCreacion", "fechaEdicion") VALUES (DEFAULT, 'alan', '$2b$10$kfw5HIf2YVle4luVlmNaWuruDXFnQof7L8.FUhSUg8I8EE0MnY91a', DEFAULT, DEFAULT);
INSERT INTO "usuario"("id", "nombre", "contrasena", "fechaCreacion", "fechaEdicion") VALUES (DEFAULT, 'juan', '$2b$10$kfw5HIf2YVle4luVlmNaWuruDXFnQof7L8.FUhSUg8I8EE0MnY91a', DEFAULT, DEFAULT);

/* Inserar 3 recibos por defecto en tabla "recibo" */
INSERT INTO "recibo"("id", "proveedor", "monto", "moneda", "fecha", "comentario", "fechaCreacion", "fechaEdicion")
VALUES (DEFAULT, 'OXXO', 120, 'MXN', '2024-02-10', 'Compra de viveres en OXXO', DEFAULT, DEFAULT);
INSERT INTO "recibo"("id", "proveedor", "monto", "moneda", "fecha", "comentario", "fechaCreacion", "fechaEdicion")
VALUES (DEFAULT, 'CocaCola', 200, 'MXN', '2024-02-10', 'Compra caja de refresco envase vidrio', DEFAULT, DEFAULT);
INSERT INTO "recibo"("id", "proveedor", "monto", "moneda", "fecha", "comentario", "fechaCreacion", "fechaEdicion")
VALUES (DEFAULT, 'Bimbo', 300, 'MXN', '2024-02-10', 'Compra caja de pan blanco', DEFAULT, DEFAULT);
INSERT INTO "recibo"("id", "proveedor", "monto", "moneda", "fecha", "comentario", "fechaCreacion", "fechaEdicion")
VALUES (DEFAULT, 'Farmacias Similares', 150, 'MXN', '2024-02-10', 'Compra de medicamentos', DEFAULT, DEFAULT);

/* Insertar las relaciones entre los recibos y el usuario tabla "usuarioRecibo" */
INSERT INTO "usuarioRecibo"("id", "usuarioId", "reciboId", "fechaCreacion", "fechaEdicion") VALUES (DEFAULT, 1, 1, DEFAULT, DEFAULT);
INSERT INTO "usuarioRecibo"("id", "usuarioId", "reciboId", "fechaCreacion", "fechaEdicion") VALUES (DEFAULT, 1, 2, DEFAULT, DEFAULT);
INSERT INTO "usuarioRecibo"("id", "usuarioId", "reciboId", "fechaCreacion", "fechaEdicion") VALUES (DEFAULT, 1, 3, DEFAULT, DEFAULT);
INSERT INTO "usuarioRecibo"("id", "usuarioId", "reciboId", "fechaCreacion", "fechaEdicion") VALUES (DEFAULT, 2, 4, DEFAULT, DEFAULT);
