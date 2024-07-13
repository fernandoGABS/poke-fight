# poke-fight

## Descripción
Aplicación diseñada para consumir servicios API de la Poke API usando React. La aplicación requiere de un middleware montado en un servidor sencillo (puede ser local) como Apache.

## Requerimientos del Middleware
- PHP (cualquier versión, recomendada 7 u 8)
- Acceso a escritura de archivos

## Configuraciones previas del Middleware
1. Copiar el contenido de `/backend` en la ruta deseada donde se regirá el middleware.
2. Abrir el archivo `index.php` y modificar la definición de `POKE_FRONT_END_URL` con la URL de la aplicación React (por defecto http://localhost:3000).
3. Opcionalmente, puedes cambiar el nombre del log de operaciones y el de la base de datos.
4. No es necesario crear los archivos de base de datos ni el log, ya que son generados automáticamente.

## Documentación API (Swagger)
- Visita [Swagger de los métodos](https://deeppink-oyster-159418.hostingersite.com/pokefights/middleware/swagger.html) para más detalles sobre los métodos disponibles en el middleware.

## Requerimientos del Front End
- Node.js con npm instalado

## Configuraciones previas del Front End
1. Abrir el archivo `.env` y modificar la URL `REACT_APP_POKE_MIDDLEWARE_URL` con el valor del servidor donde se aloja el middleware.
2. Ejecutar `npm install` para instalar todas las dependencias.
3. Ejecutar `npm start` para iniciar la aplicación.

## Rutas
- `/login`: Acceder al inicio de sesión.
- `/sign-up`: Registrarse y autologuearse.
- `/pokemon-list`: Requiere autenticación. Muestra la lista de Pokémon.
- `/pokemon-fight`: Requiere autenticación. Cuando hay 2 Pokémon para pelear, se presenta la pantalla de luchas.

## Ambiente Productivo
La aplicación compilada ha sido desplegada en un servidor web productivo. Puedes visitarla en [https://deeppink-oyster-159418.hostingersite.com/](https://deeppink-oyster-159418.hostingersite.com/).
