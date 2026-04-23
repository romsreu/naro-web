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
| Next.js 15 | Framework React con App Router |
| TypeScript | Tipado estático |
| CSS Modules | Estilos encapsulados por componente |
| Zustand | Estado global — carrito y sesión del usuario |
| React Hook Form | Manejo de formularios |
| Zod | Validación de datos en el cliente |

### Flujo de autenticación

```
Usuario completa form de login
          │
          ▼
   Zod valida en el cliente
          │
          ▼
   fetch POST → naro-api (via Gateway)
          │
          ▼
   Gateway valida y enruta a MS Usuarios
          │
          ▼
   Spring devuelve JWT token
          │
          ▼
   Zustand guarda el token
          │
          ▼
   Redirige al home 
```

### Flujo de datos general

```
Componente React
      │
      │  llama a
      ▼
  lib/api.ts              ← funciones fetch centralizadas
      │
      │  HTTP Request + Authorization: Bearer <JWT>
      ▼
  Spring Cloud Gateway    ← valida JWT, aplica circuit breaker
      │
      │  enruta al microservicio correspondiente
      ▼
  naro-api (microservicio) ← procesa y responde
      │
      │  JSON Response
      ▼
  Componente React         ← renderiza los datos
```

## Estructura del proyecto

```
naro-web/
│
├── app/          # Rutas y páginas — cada carpeta es una URL
├── components/   # Componentes React reutilizables
├── lib/          # Funciones y utilidades (fetch, helpers)
├── store/        # Estado global con Zustand
├── types/        # Tipos TypeScript compartidos
├── styles/       # Variables CSS globales (colores, tipografía)
└── public/       # Assets estáticos (imágenes, íconos)
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

Este frontend está construido con **Next.js 15**, pero **no utiliza las capacidades de servidor del framework** (API Routes, Server Actions, SSR con acceso a base de datos). Toda la lógica de negocio, autenticación y persistencia vive en **naro-api**. Esta decisión responde a una restricción del TP: el backend debe desarrollarse obligatoriamente con **Java + Spring Boot**. Next.js se usa exclusivamente como framework de UI con React.
