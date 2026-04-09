# Desarrollo Backend con Node

-El flujo con el servidor es request <-> response

- En las peticiones tenemos:
  - Type
  - Initiatior -> quien hace la peticion
  - Status (200, 300, 400, 500)
- Las peticiones se ejecutan en cascada hasta que se realizan todas
- El cliente es quien se encarga de hacer las peticiones
- El servidor gestiona estas peticiones, dando el contenido de la respuesta y el status

## Intro NodeJS

- Es un interprete de JS
- Inicialmente diseñado para servidor
- Orientado a eventos -> trabaja con una pila de eventos (asincrona). Cada acción del servidor genera un evento
- Con servidor de aplicación -> a diferencia de php que necesita Apache, por ejemplo
- Basado en motor V8
- Se rige por un sistema de versiones
  - Unstable
  - Maintenance
  - Active
  - Current
- Ventajas:
  - Asincronía (APIs, servicios tiempo real, etc.)
  - Aplicaciones con clientes escritos en JS

### nvm

- nvm es el gestor de versiones de node
- Para proyectos específicos se pueden requerir versiones específicas
- Podemos guardar versiones de node en archivos con: `node -v > .nvmrc`
- Con `nvm use default` usamos la versión guardada para una carpeta en concreto

### npm

- Node Package Manager
- Repositorio de dependencias
- Con `npm init` inicializamos el proyecto con un `package.json`
- Con **scripts**, podemos definir acciones que queremos ejecutar fácil:
  - `"example:hello": "node examples/01-hola-node/index.js"`
  - Si tenemos varios scripts y que queremos englobar, usamos : (example:hello)
  - con el comando `npm run example:hello`, ejecutamos el script
- El Contexto Global no es Window, ya que no estamos en un navegador
- Cuando instalamos dependencias, se crea el package-lock, donde se encuentran las dependencias y sus respectivas dependencias
- Con `npm install --save-dev <dependencia>` se instala dependencia de desarrollo
- Con `npm install` instalamos todas las dependencias del package.json

- En http hay peticiones idempotentes, se asume por convencion que son peticiones que no van a generar cambios en el servidor, son read-only. Por lo tanto, el navegador puede realizarla varias veces.
- Las peticiones GET son idempotentes, siempre son de lectura
- NPM gestiona dos tipos de contexto:
  - Local: en una carpeta de proyecto donde se encuentre el package.json
  - Global: en una carpeta de usuario para todos los proyectos
  - Paquetes como nodemon, puede ser recomendable instalarlo de manera global (-g)

#### npx

- Permite ejecutar paquetes remotos que no estan instalados, instalándolos temporalmente
- En una peticion GET, pasamos informacion en query params

## HTTP

- Es un protocolo de comunicación para la web
- Sigue el esquema tradicional de cliente-servidor
- Existen verbos/metodos HTTP:
  - GET -> Obtener datos o recursos
  - POST -> Enviar datos para crear
  - PUT -> Reemplazar un recurso (actualizar perfil)
  - PATCH -> Modificar parcialmente (cambiar solo email)
  - DELETE -> Eliminar un recurso
- En el navegador solo usamos GET
- GET se considera idempotente (puede ser llamado varias veces). Por esto nunca debería haber acciones de escritura
- Existen tambien códigos de estado
  - 1xx -> Información (raros)
  - 2xx -> Éxito
  - 3xx -> Redirecciones
  - 4xx -> Errores de cliente (petición incorrecta)
  - 5xx -> Errores de servidor

## Express.js

- Es una herramienta que permite generar servicios de forma más cómoda
- Lo mas habitual es separar la aplicacion de express en dos partes
  - Servidor -> recibe peticiones -> bin/www.js
  - Aplicacion -> gestiona peticiones -> app.js
