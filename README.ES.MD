
# Proyecto BandAid

BandAid es una aplicación web full-stack diseñada para ayudar a las bandas a gestionar sus miembros, listas de canciones (setlists), eventos en vivo y mucho más. El backend está construido con Express.js y Sequelize, mientras que el frontend está desarrollado usando React y Vite.

</br>

## Descripción del Proyecto

BandAid proporciona una plataforma para que las bandas puedan:
- Gestionar los miembros de la banda y sus roles.
- Crear y administrar listas de canciones para presentaciones.
- Programar y organizar eventos en vivo.
- Mantener perfiles de músicos con enlaces a redes sociales.
- Llevar un seguimiento del calendario de actuaciones de la banda y mostrar su trabajo.
- Gestionar tus canciones y tener un catálogo musical detallado.

</br>

## Documentación

El proyecto incluye un archivo `doc` que describe cómo funciona cada parte de la aplicación con los tipos de datos y los parámetros recibidos. Se recomienda leerlo si tiene alguna duda sobre el uso de las clases, controladores o servicios disponibles en la aplicación.


## Comenzando

### Requisitos Previos

- Debes tener instalado Node.js y npm en tu sistema.
- Se recomienda estar familiarizado con React, Express.js y Sequelize.
- Debes tener instalada y configurada una base de datos SQL (nosotros usamos MariaDB).

</br>

### Configuración de la Base de Datos

1. Instala MariaDB (u otra base de datos SQL compatible con Sequelize).
2. Actualiza o crea el archivo `config/database.js` con los detalles de conexión a tu base de datos (esta carpeta `config` debe estar en la raíz del proyecto).

</br>

```javascript
require('dotenv').config()

let db = {
    host: <tu-host>,
    dialect: 'mariadb', // el dialecto que usa tu base de datos
    port: <puerto-db>,
    user: <tu-usuario-db>,
    pass: <tu-contraseña-db>,
    database:'bandaid'
}
if (process.env.ENV=='dev'){
    db.user=<tu-usuario-db>
    db.pass=<tu-contraseña-db>
    db.database='bandaid'
}

module.exports = db
```

Una vez que esté todo configurado, puedes ejecutar la app y la base de datos se creará automáticamente.

</br>

### Poblar la Base de Datos (Seeding)

Es importante tener las tablas de la base de datos creadas antes de ejecutar el script de seed (explicado en la sección de configuración de la base de datos).

Para poblar la base de datos con datos de ejemplo, ejecuta el siguiente comando:

```bash
npm run seed
```

Este script generará datos de muestra para propósitos de prueba.

</br>

### Ejecutar la Aplicación

</br>

### Instalación

1. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/yourusername/bandaid.git
   cd bandaid
   ```

2. **Instalar Dependencias del Backend:**
    ```bash
    npm install
    ```

3. **Instalar Dependencias del Frontend:**
    ```bash
    cd client
    npm install
    cd ..
    ```

</br>

### Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

- `npm run dev`  
  Ejecuta el servidor Express con nodemon para desarrollo. El servidor se reiniciará automáticamente si haces cambios.

- `npm run start`  
  Inicia el servidor de desarrollo de React. Úsalo para trabajar en el frontend de manera independiente.

- `npm run build`  
  Construye la aplicación React para producción en la carpeta `build`. Optimiza la app para mejor rendimiento en producción.

- `npm run seed`  
  Población (seeding) de la base de datos con datos iniciales. Asegúrate de haber configurado y creado la base de datos antes de ejecutar este script.

- `npm run migrate`  
  Ejecuta las migraciones de Sequelize para actualizar el esquema de la base de datos.

</br>

### Ejecutar la Aplicación

Para poner en marcha la aplicación, sigue estos pasos:

1. **Construir la Aplicación React:**
    ```bash
    cd client
    npm run build
    cd ..
    ```

2. **Iniciar el Servidor Express:**
    ```bash
    npm run dev
    ```

3. **Acceder a la Aplicación:**

Abre tu navegador y navega a http://localhost:3000 para ver la aplicación.

</br>

### Variables de Entorno

Para usar BandAid, necesitarás configurar variables de entorno. Estas variables se usan para proteger información sensible y configurar la aplicación.

- **Crea un archivo `.env`:**

Crea un archivo `.env` en el directorio raíz para definir las variables de entorno.

- **Ejemplo:**

Aquí tienes algunas variables que deberías definir en tu archivo `.env`:

```
VITE_APP_API_URL=tu-api-url
JWT_SECRET=tu-clave-jwt
JWT_EXPIRATION=tiempo-deseado-en-segundos
PRODUCTION=0 //o 1 (usa 1 para producción)
```

</br>

### Contribuciones

¡Las contribuciones son bienvenidas! Por favor, haz un fork del repositorio y utiliza una rama para cada funcionalidad. Los pull requests son muy apreciados.

</br>

### Solicitud de Funcionalidades

No dudes en abrir una *issue* si tienes ideas para nuevas funcionalidades o si encuentras errores. Trabajaremos juntos para solucionarlos.

</br>

### Agradecimientos

Gracias a todos los colaboradores y a la comunidad de código abierto por su apoyo e inspiración.
