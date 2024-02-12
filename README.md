# "Proyecto recibos API"
*Evaluación ténica de ingreso R&D para Axosnet.*

## Descrición:
Evaluación técnica para Axosnet, proyecto administración de recibos.

Este es un proyecto API que apoya a un usuario con la administración de sus recibos (utilizando un CRUD).

## Desarrollado por:
Ing. Alan Eduardo Aguilar Guerrero (Desarrollador Jr.)

## Fecha:
Lunes 12 de Febrero del 2024

## Principales tecnologías:
* node js v20.9.0
* express v4.18.2
* sequelize v6.36.0
* jsonwebtoken v9.0.2
* postgreSQL v8.2

## Instrucciones para instalación de proyecto API:
1. Descargue este proyecto instalando la herramient "Git" y utilizando el comando `git clone https://github.com/Nekromorfo20/proyecto-recibos-api.git` en una terminal desde su computadora y mientras se encuentre en el directorio donde guste colocar el proyecto. Tambien puede descargar el proyecto como archivo ".zip" seleccionando el botón "<> Code" y seleccionando la opción "Download ZIP".

![alt text](img/image1.png)

2. Abra una terminal en su computadora y coloque la dirección del directorio donde el proyecto fue descargado, coloquese a nivel raíz del proyecto (donde pueda visualizar el archivo "package.json") y una vez ubicado ejecute el comando `npm install` para instalar todas las dependencias.

![alt text](img/image2.png)

3. Una vez instaladas las dependencias ejecute el comando `npm start` para iniciar el proyecto.

## Instrucciones para generar base de datos en PostgreSQL:
1. Primero debe abrir el archivo "recibos.sql" en un editor de código, este se encuentra en la carpeta "/db/recibos.sql" dentro de este proyecto.
2. Instale PostgreSQL desde la página oficial, se recomiendo utilizar la versión 8.2.
3. Abra pgAdmin4 y seleccione "Databases > Create > Database".

![alt text](img/image3.png)

4. Proporcione el nombre de la base de datos como "recibos" y selecciones "Save"

![alt text](img/image4.png)

5. De clic derecho sobre la base de datos creada (recibos) y selecciones la opcion "Query tool", esto le abrirá un editor de SQL en el cual ejecutará todos los comandos del archivo "recibos.sql" para generar las tablas, relaciones y datos por defecto.

![alt text](img/image5.png)

![alt text](img/image6.png)

## Usuarios de prueba:
Usuario: alan  
Contraseña: admin123

Usuario: juan  
Contraseña: admin123