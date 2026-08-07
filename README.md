<p align="center">
  <img width="530" height="200" src="public/images/naro_logo.svg" /><br>
  <img width="530" height="200" src="public/images/frontend.svg" />
</p>

> NARO es una plataforma de compra y venta de productos donde vendedores independientes y empresas pueden publicar artículos, y compradores pueden buscarlos, adquirirlos y recibir confirmaciones automáticas.

## Arquitectura general

NARO está dividido en dos repositorios independientes que se comunican a través de una REST API:

<p align="center">
<img width="820" height="520" alt="image" src="https://github.com/user-attachments/assets/0a35f1ee-bdba-4200-b65a-62b83a10b184" />

<img width="820" height="520" alt="image" src="https://github.com/user-attachments/assets/07824689-244d-4411-832c-6a5586fa714b" />
</p>


## Stack

| Herramienta | Uso |
|------------|-----|
| Next.js 16 | Framework React con App Router |
| React 19 | Librería de UI |
| TypeScript | Tipado estático |
| CSS Modules | Estilos encapsulados por componente |

Actualmente no hay ninguna librería de estado global (Zustand, Redux, etc.) ni de formularios/validación (React Hook Form, Zod) instalada — la sesión se maneja server-side vía cookies HTTP-only.

### Flujo de autenticación

```
Usuario completa form de login
          │
          ▼
   Server Action (app/actions/auth.ts) → naro-api (via Gateway)
          │
          ▼
   Gateway valida y enruta a MS Usuarios
          │
          ▼
   Spring devuelve JWT (access_token + refresh_token)
          │
          ▼
   Server Action reenvía las cookies Set-Cookie (HTTP-only) al browser
          │
          ▼
   middleware.ts valida el JWT en cada request y refresca vía
   app/api/auth/refresh (Route Handler) cuando expiró
```

### Flujo de datos general

```
Componente React
      │
      │  llama a
      ▼
  Server Action / Route Handler   ← app/actions/*, app/api/**
      │
      │  HTTP Request + cookies (access_token / refresh_token)
      ▼
  Spring Cloud Gateway    ← valida JWT, aplica circuit breaker
      │
      │  enruta al microservicio correspondiente
      ▼
  naro-api (microservicio) ← procesa y responde
      │
      │  JSON Response + Set-Cookie
      ▼
  Componente React         ← renderiza los datos
```

## Estructura del proyecto

```
naro-web/
│
├── app/            # Rutas y páginas — cada carpeta es una URL
│   ├── actions/    # Server Actions (login, register, logout, refresh)
│   └── api/        # Route Handlers (ej. api/auth/refresh)
├── components/     # Componentes React reutilizables
├── lib/            # Funciones y utilidades (auth: config, cookies, token)
├── styles/         # Variables CSS globales (colores, tipografía)
├── middleware.ts   # Validación de sesión / redirecciones (Edge runtime)
└── public/         # Assets estáticos (imágenes, íconos)
```

---

## Sistema de diseño

Todos los tokens de diseño están centralizados en `styles/variables.css` como custom properties CSS disponibles en toda la app.

### Paleta de colores

| Variable | Valor | Uso |
|----------|-------|-----|
| `--color-primary` | `#e85d26` | Naranja — botones, links, acentos |
| `--color-bg` | `#f7f6f2` | Fondo general |
| `--color-white` | `#ffffff` | Fondos de cards |
| `--color-text` | `#1a1a1a` | Texto principal |
| `--color-text-muted` | `#888888` | Texto secundario |
| `--color-border` | `#e8e6e0` | Bordes de cards e inputs |

### Tipografía

**Plus Jakarta Sans** — Google Fonts

| Variable | Valor |
|----------|-------|
| `--font-xs` | 11px |
| `--font-sm` | 13px |
| `--font-md` | 15px |
| `--font-lg` | 18px |
| `--font-xl` | 22px |
| `--font-2xl` | 28px |

---

## Cómo correr el proyecto

### Requisitos

- Node.js 18+
- npm

### Instalación

```bash
git clone https://github.com/naro/naro-web.git
cd naro-web
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en tu navegador.

### Estructura de componentes

Cada componente vive en su propia carpeta con tres archivos:

```
ComponentName/
├── ComponentName.tsx        # Lógica y JSX
├── ComponentName.module.css # Estilos del componente
└── index.ts                 # Re-exportación limpia
```
---

## Estado actual de pantallas

| Pantalla | Ruta | Estado |
|----------|------|--------|
| Homepage | `/` | ✅ Completa |
| Login | `/login` | ✅ Completa |
| Registro | `/register` | ✅ Completa |
| Página de producto | `/productos/:slug` | 🔄 En progreso |
| Carrito | `/carrito` | 🔄 En progreso |
| Mis compras | `/cuenta/compras` | 🔄 En progreso |
| Panel vendedor | `/cuenta/vendedor` | ⏳ Pendiente |
| Checkout | `/checkout` | ⏳ Pendiente |

## Nota sobre el stack tecnológico

Este frontend está construido con **Next.js 16**, y sí utiliza las capacidades de servidor del framework: **Server Actions** (`app/actions/auth.ts`) y un **Route Handler** (`app/api/auth/refresh/route.ts`) son el mecanismo central de autenticación (login, registro, logout y refresh de tokens contra cookies HTTP-only). Toda la lógica de negocio y persistencia de datos, sin embargo, vive en **naro-api**: Next.js no accede a ninguna base de datos directamente, solo orquesta auth y hace de capa de UI con React. Esta decisión responde a una restricción del TP: el backend debe desarrollarse obligatoriamente con **Java + Spring Boot**.
