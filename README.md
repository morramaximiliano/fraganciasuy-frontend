# FraganciasUY Frontend

Aplicacion frontend de e-commerce para fragancias, desarrollada con React y Vite.

Incluye flujo completo de compra (catalogo, carrito, checkout), autenticacion de usuarios, panel administrativo y estados de pago con Mercado Pago.

## Demo del proyecto

- Frontend: pendiente de deploy
- Backend/API: requiere backend propio compatible con los endpoints documentados abajo

## Funcionalidades principales

- Catalogo de productos con vista detallada por modal.
- Seleccion de SKU por presentacion (ml), precio y stock.
- Carrito con persistencia local y sincronizacion contra backend para usuarios autenticados.
- Registro e inicio de sesion con validacion de formularios.
- Rutas protegidas para administracion por rol de usuario.
- Dashboard admin con CRUD de productos, SKUs, categorias y marcas.
- Checkout con integracion de Mercado Pago (creacion de preferencia y wallet).
- Paginas de estado de pago: success, pending y failure.
- Pagina 404 para rutas inexistentes.
- Feedback visual con toasts, modales y animaciones.

## Tecnologias utilizadas

### Core

- React 19
- React DOM 19
- Vite 8
- React Router DOM 7
- JavaScript ES Modules

### UI, estilos y animaciones

- Tailwind CSS 4
- Flowbite React
- Framer Motion
- tw-animate-css
- @fontsource-variable/geist
- react-bootstrap-icons
- lucide-react
- @base-ui/react
- class-variance-authority

### Estado, formularios y validaciones

- Context API (Auth y Cart)
- react-hook-form
- zod
- @hookform/resolvers

### Comunicacion y pagos

- axios (instancia custom con interceptor de token)
- @mercadopago/sdk-react

### Alertas y notificaciones

- react-toastify
- sweetalert2

### Calidad y tooling

- ESLint 10
- @eslint/js
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- @vitejs/plugin-react
- @tailwindcss/vite

## Arquitectura del frontend

- src/components: vistas de usuario (home, productos, carrito, checkout, estados de pago, 404).
- src/components/admin: dashboard admin, tablas, sidebar, formularios y esquemas.
- src/context: estado global de autenticacion y carrito.
- src/api: cliente HTTP con configuracion base e interceptor de autorizacion.

## Requisitos

- Node.js 20 o superior recomendado
- npm 10 o superior recomendado
- Backend disponible en http://localhost:3000/api/v1 (o la URL que configures)

## Instalacion y ejecucion

1. Clonar el repositorio.
2. Instalar dependencias:

   npm install

3. Ejecutar en modo desarrollo:

   npm run dev

4. Abrir la URL local indicada por Vite.

## Scripts disponibles

- npm run dev: inicia entorno de desarrollo con hot reload.
- npm run build: genera build de produccion.
- npm run preview: sirve localmente el build generado.
- npm run lint: ejecuta ESLint.

## Configuracion de entorno

Actualmente el cliente Axios usa baseURL fija en codigo:

- http://localhost:3000/api/v1

Para una version mas portable, se recomienda mover esto a variables de entorno (VITE_API_URL) y leerla desde la instancia de Axios.

## Flujo de autenticacion

- El token y el rol se guardan en localStorage.
- AuthContext valida sesion con el endpoint /auth/me.
- Las rutas de administracion verifican token + rol admin.

## Integracion de pagos

- Se inicializa Mercado Pago en el frontend.
- El checkout crea una orden en backend.
- Luego solicita una preferencia de pago y renderiza el componente Wallet.

Nota: para produccion, se recomienda configurar la public key mediante variable de entorno y no hardcodearla.

## Endpoints esperados del backend

El frontend consume endpoints REST con prefijo /api/v1, entre ellos:

- /auth/register
- /auth/login
- /auth/me
- /products
- /products/:id
- /categories
- /categories/:id
- /brands
- /skus
- /cart
- /cart/sync
- /orders
- /payments/create-preference

## Estado actual del proyecto

Proyecto orientado a portfolio y aprendizaje avanzado de frontend. No esta planteado como producto final para produccion, pero si demuestra:

- Integracion real con backend.
- Manejo de estado y sesiones.
- CRUD administrativo.
- Flujo de compra y pagos.
- Buen nivel de UI/UX para nivel trainee-junior.

## Autor

Desarrollado por Maximiliano Morra como proyecto de portfolio.
