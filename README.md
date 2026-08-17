# 🍄 Xital — Frontend

SPA del e-commerce de tinturas de hongos adaptógenos **Xital**. Consume la API REST de
`xital_backend` y cubre el flujo completo de compra: catálogo, detalle de producto, registro y
login, carrito, checkout con dirección y método de pago, y confirmación de orden.

- **Producción:** https://xital.onrender.com
- **API:** https://xital-backend.onrender.com/api (repositorio `xital_backend`)

---

## 1. Descripción

Xital vende tinturas de doble extracción de cuatro hongos —Reishi, Cola de pavo, Melena de León
y Cordyceps— en presentaciones de 30, 50 y 100 ml. Este repositorio es únicamente la interfaz:
no tiene base de datos ni lógica de servidor, todo el estado persistente vive en la API.

Qué hace la app:

| Área | Alcance |
|---|---|
| Catálogo | Listado paginado, búsqueda y detalle de producto con galería de imágenes |
| Sesión | Registro y login con JWT, sesión restaurada desde `localStorage` |
| Carrito | Agregar, actualizar cantidad, eliminar y vaciar, sincronizado con la API |
| Checkout | Selección de dirección y método de pago, alta de ambos desde el mismo flujo |
| Órdenes | Creación de la orden y pantalla de confirmación |
| Errores | Error boundaries por zona y registro de eventos en el backend |

Rutas de la SPA (`src/components/App/App.jsx`):

| Ruta | Página | Protegida |
|---|---|---|
| `/` | Home | no |
| `/products` | Catálogo | no |
| `/products/:productId` | Detalle de producto | no |
| `/login` | Login | no |
| `/register` | Registro | no |
| `/cart` | Carrito | sí |
| `/checkout` | Checkout | sí |
| `/order-confirmation/:id` | Confirmación de orden | sí |
| `*` | Ruta no encontrada | no |

---

## 2. Instalación

### Requisitos previos

- Node.js 18 o superior
- npm
- El backend corriendo (local en `http://localhost:4000` o desplegado)

### Pasos

```bash
git clone https://github.com/tu-usuario/xital_frontend.git
cd xital_frontend
npm install
cp .env.example .env
```

### Variables de entorno

Una sola, y es obligatoria:

| Variable | Obligatoria | Valor local | Descripción |
|---|:---:|---|---|
| `VITE_API_URL` | Sí | `http://localhost:4000/api` | Base de la API, **con el `/api` incluido** |

`src/services/apiClient.js` la usa tal cual como `baseURL`, sin concatenar nada, y **sin valor de
reserva**: si falta, lanza `Falta configurar VITE_API_URL. Revisa .env.example` al importarse el
módulo. Eso ocurre antes de que React monte, así que el error se ve en la consola del navegador y
no lo captura el error boundary global.

> Todo lo que lleva el prefijo `VITE_` queda embebido en el bundle y es legible por cualquiera que
> abra el sitio. **Aquí no van secretos**: ni claves de API, ni credenciales, ni tokens.

El `.env` real no se versiona; la plantilla es `.env.example`.

---

## 3. Cómo correr

```bash
npm run dev       # Servidor de desarrollo con HMR → http://localhost:5173
npm run build     # Bundle de producción en dist/
npm run preview   # Sirve dist/ localmente para verificar el build
npm run lint      # ESLint sobre todo el repo
```

`npm run dev` levanta Vite en el puerto 5173. Ese origen tiene que estar en
`CORS_ALLOWED_ORIGINS` del backend o todas las peticiones fallarán por CORS.

---

## 4. Arquitectura

### Stack

| Herramienta | Versión | Uso |
|---|---|---|
| React | ^19.2.6 | Librería de UI |
| Vite | ^8.0.12 | Build tool y servidor de desarrollo |
| React Router DOM | ^7.17.0 | Enrutamiento del lado del cliente |
| axios | ^1.17.0 | Cliente HTTP |
| lucide-react | ^1.18.0 | Iconografía |
| prop-types | ^15.8.1 | Validación de props |
| ESLint | ^10.3.0 | Linting |

El proyecto es ESM puro (`"type": "module"`). No usa TypeScript.

### Estructura

```
src/
├── main.jsx                createRoot + StrictMode → <App />
├── index.css               design system en variables CSS (:root)
├── components/
│   ├── App/                BrowserRouter > ErrorBoundary > AuthProvider > CartProvider > Layout
│   ├── ErrorBoundary/      ErrorBoundary.jsx + ErrorFallbacks.jsx
│   ├── atoms/              Badge, Button, Divider, ErrorMessage, Icon, Input, Loading
│   ├── molecules/          AccountDropdown, HeaderLayoutCarousel, ProductCard,
│   │                       ProductImageGallery, RegisterErrorMessage
│   └── organism/           AddressForm, AddressManager, BannerCarousel, CartView, LoginForm,
│                           PaymentMethodForm, PaymentMethodManager, ProductDetails,
│                           ProductList, ProductsCatalog, RegisterForm
├── context/                AuthContext.jsx, CartContext.jsx
├── hooks/                  useAddresses.jsx, usePaymentMethods.jsx
├── layout/                 Layout.jsx, Header/, Footer/
├── pages/                  Home, ProductsPage, Product, Login, Register, Cart,
│                           Checkout/, OrderConfirmation, ProtectedRoute
├── services/               apiClient.js + un servicio por recurso
└── utils/                  auth.js
```

### Atomic design

Los componentes se organizan en tres niveles, cada uno en su carpeta junto a su `.css`:

- **Atoms** — piezas sin lógica de negocio: `Button`, `Input`, `Badge`, `Icon`, `Loading`,
  `Divider`, `ErrorMessage`. Reciben props explícitas y no conocen la API.
- **Molecules** — composiciones pequeñas con estado propio acotado: `ProductCard`,
  `AccountDropdown`, `ProductImageGallery`.
- **Organism** — bloques completos que sí hablan con los servicios: `ProductsCatalog`,
  `CartView`, `LoginForm`, `AddressManager`, `PaymentMethodManager`.

Las páginas de `pages/` componen organismos y resuelven el enrutamiento; el layout común
(`Header`) envuelve todas las rutas. `Footer.jsx` existe pero está vacío y `Layout` no lo
renderiza.

### Capa de datos

Ningún componente llama a `axios` o `fetch` directamente. `src/services/apiClient.js` es la única
instancia de axios y concentra tres cosas:

1. **`baseURL`** desde `VITE_API_URL`, con `timeout: 10000`.
2. **Interceptor de request:** inyecta `Authorization: Bearer <token>` si hay token guardado.
3. **Interceptor de response:** pasa todo error por `classifyError` y rechaza con un objeto
   normalizado `{ kind, status?, fields?, original }`.

Sobre él se apoya un servicio por recurso (`authService`, `productsService`, `cartService`,
`addressService`, `paymentMethodService`, `orderService`, `logService`), y cada función lleva
encima el método y el path que consume.

### Estado global

Dos contexts, ambos montados en `App.jsx`:

- **`AuthContext`** — decodifica el JWT y expone `{ id, name, role }`, además de `login` y
  `logout`. El token vive en `localStorage` bajo la clave `authToken`.
- **`CartContext`** — carrito sincronizado con la API, con acciones de agregar, actualizar,
  eliminar y vaciar.

Las rutas privadas se envuelven en `<ProtectedRoute>`, que acepta `redirectTo` y `allowedRoles`.

---

## 5. Decisiones técnicas

### `VITE_API_URL` sin fallback

`apiClient.js` lanza si la variable no está, en vez de caer a `http://localhost:4000/api`. Un
fallback silencioso escondería una configuración incorrecta hasta que la app estuviera en
producción hablándole a un backend que no existe. Falla al arrancar, en desarrollo, donde el
error es barato.

La variable incluye el `/api` en lugar de que el código lo concatene: así no hay riesgo de
generar `/api/api` ni de que cada servicio recuerde añadirlo.

### Errores clasificados en un solo lugar

`classifyError` traduce cualquier fallo de axios a un `kind` estable antes de que llegue a la UI:

| `kind` | Origen |
|---|---|
| `CANCELED` | Petición abortada con `AbortController` |
| `NOT FOUND` | 404 |
| `UNAUTHORIZED` | 401 |
| `FORBIDDEN` | 403 |
| `VALIDATION` | 422 (incluye `fields` con los errores por campo) |
| `SERVER_ERROR` | 500 |
| `CLIENT_ERROR` | Cualquier otro status |
| `TIMEOUT` | `ECONNABORTED` |
| `NETWORK_ERROR` | No hubo respuesta |
| `UNKNOWN` | Todo lo demás |

Los componentes nunca leen `error.response.status`: leen `error.kind`. El día que cambie el
cliente HTTP, la UI no se entera.

### Error boundaries por zona, no uno global

`ErrorBoundary` es el único componente de clase del proyecto: React exige una clase porque
`getDerivedStateFromError` y `componentDidCatch` no tienen equivalente con hooks. Se monta cuatro
veces, con un fallback distinto según lo que esté en juego:

| Boundary | Dónde | Qué dice el fallback |
|---|---|---|
| `global` | `App.jsx`, dentro del router | Ofrece recargar la página |
| `catalog` | `Home`, `ProductsPage` | El header sigue vivo, link al inicio |
| `cart` | `Cart` | **"Tus productos siguen guardados"** |
| `checkout` | `Checkout` | **"Tu compra no se cobró"** |

El global va *dentro* de `BrowserRouter` para que los fallbacks puedan usar `<Link>`. La
granularidad importa: si revienta el catálogo no tiene por qué caerse el header, y en checkout hay
dinero de por medio, así que el mensaje lo dice explícito.

### Logging al backend con `logEvent`

`src/services/logService.js` expone `logEvent(level, event, message, context)`, que hace
`POST /api/logs` con `source: "frontend"` y añade `url` y `userAgent` al contexto. El endpoint es
público, así que también captura errores de usuarios sin sesión; si hay token válido, el backend
atribuye el log al usuario.

Su `catch` está **vacío a propósito**: si el logging falla, la app sigue funcionando, y ahí dentro
no se puede volver a llamar a `logEvent` porque con el backend caído sería un bucle infinito de
peticiones.

Eventos que se registran hoy:

| Evento | Dónde se dispara |
|---|---|
| `react_error_boundary` | Cualquier boundary que capture |
| `load_products_failed` | `ProductsCatalog`, `ProductList` |
| `load_product_failed` | `ProductDetails` |
| `load_cart_failed`, `add_to_cart_failed`, `update_cart_failed`, `remove_from_cart_failed`, `clear_cart_failed` | `CartContext` |
| `create_order_failed` | `Checkout` |
| `load_order_failed` | `OrderConfirmation` |
| `load_addresses_failed` | `useAddresses` |
| `load_payment_methods_failed` | `usePaymentMethods` |
| `auth_session_restore_failed` | `AuthContext` |

### Sesión en `localStorage`, no en cookie

El JWT se guarda en `localStorage` bajo `authToken` y viaja en el header `Authorization`. No hay
cookies de sesión, así que no hace falta configurar `sameSite`, `secure` ni `domain` para que la
sesión funcione entre los dos dominios de Render.

### CSS propio, sin framework

El design system vive en variables CSS en `:root` (`src/index.css`) y cada componente tiene su
`.css` al lado, con clases en kebab-case derivadas del nombre del componente. No hay Tailwind ni
librería de componentes: el catálogo de átomos cubre lo que la app necesita.

---

## 6. Testing

**Estado actual: este repositorio no tiene suite de tests.** No hay script `test` en
`package.json` ni librerías de testing instaladas, y los tests automatizados del proyecto viven
hoy solo en el backend (68 tests de esquemas Mongoose con Vitest).

El único check ejecutable aquí es el linter:

```bash
npm run lint
```

La verificación funcional se hace a mano contra la app corriendo, recorriendo los criterios de
aceptación de cada cambio.

### Cómo se cubriría

Cuando se implemente, estas decisiones ya están tomadas:

- La API se intercepta **a nivel de red**, nunca mockeando `axios` ni los módulos de `services/`,
  y los handlers apuntan al valor de `VITE_API_URL` del entorno de pruebas.
- Los asserts son sobre **lo que ve el usuario** (rol, etiqueta, texto), no sobre clases CSS,
  estructura del DOM ni número de renders.
- Los componentes que usan `useAuth`, `useCart`, `Link`, `useNavigate` o `useParams` se renderizan
  envueltos en router y providers.
- Prioridad alta: `AuthContext`, `ProtectedRoute`, `utils/auth.js` y la función `validate` de
  `RegisterForm`. Prioridad baja: carruseles, layout e iconografía.

Nada de esto se instala sin un plan de pruebas revisado y aprobado.

---

## 7. Deployment

Desplegado en **Render** como *Static Site*, independiente del backend (son dos repos y dos
servicios separados).

| Campo | Valor |
|---|---|
| Tipo | Static Site |
| Root Directory | *(vacío — la raíz del repo)* |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |
| Variables | `VITE_API_URL=https://xital-backend.onrender.com/api` |
| URL | https://xital.onrender.com |

### Rewrite rule obligatoria

Al ser una SPA con React Router, hay que añadir una regla en Render o las rutas profundas
(`/products/:id`, `/checkout`) devolverán 404 al recargar:

```
Source: /*    Destination: /index.html    Action: Rewrite
```

### `VITE_API_URL` se congela en el build

Vite la sustituye por su valor literal al compilar; **no se lee en tiempo de ejecución**. Si
cambia la URL del backend no basta con editar la variable en Render: hay que **volver a construir
y desplegar** el frontend.

### Orden de despliegue

1. Desplegar el backend y anotar su URL (`https://xital-backend.onrender.com`).
2. Desplegar este frontend con `VITE_API_URL=https://xital-backend.onrender.com/api`.
3. Volver al backend y poner `CORS_ALLOWED_ORIGINS=https://xital.onrender.com`.

Si se omite el paso 3, el sitio carga pero **todas las peticiones fallan por CORS**. El detalle
completo está en `docs/render-deployment.md` del repositorio del backend.

---

## Autora

**María G. Serna Domínguez**
Bióloga Molecular | Yogini | Desarrolladora en formación

## Licencia

Proyecto desarrollado con fines académicos.
