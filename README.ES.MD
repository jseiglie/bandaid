# Ejemplo de una aplicación de React servida por Express

Este ejemplo está pensado para que empieces a trabajar, no tiene un entorno de producción, solo dev (aún así, se puede agregar).

>Recuerda que para que las actualizaciones de la aplicación de React se sirvan en la aplicación Express, debes hacer un **BUILD a la aplicación de React**. Si estás ejecutando `npm run dev` y realizas cambios en el cliente, **NO se actualizará** ya que el **BUILD**  es el que se entrega.
Puedes realizar todos los cambios usando `npm run start` desde la **carpeta CLIENT** y, una vez que hayas terminado, compila tu aplicación de React y sírvela con Express usando `npm run dev` desde la **carpeta ROOT**

## Scripts disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm run dev`

Ejecuta el servidor Express con nodemon (`nodemon index.js`).

### `npm run start`

Inicia el servidor de desarrollo **SOLO REACT**, puedes realizar las modificaciones que quieras y añadir tantos elementos como necesites en el front antes de compilar el proyecto para servirlo con express

### `npm run build`

Compila la aplicación de React para servirla en la subcarpeta `build` de la carpeta `client`

## Pasos para iniciar la aplicación:

- Clona este repositorio `https://github.com/jseiglie/express-serving-react` o fork
- Inicia VSCode o usa un editor en línea de tu preferencia (Codespaces/GitPod) y carga el repositorio.
- Accede a la carpeta client (`cd client/`)
- Compila la aplicación de React (`npm run build`)
- Regresa a la carpeta raíz (`cd ..`)
- Inicia el servidor de desarrollo de Express (`npm run dev`)

¡Gracias y sigue así!
@JavierSeiglie