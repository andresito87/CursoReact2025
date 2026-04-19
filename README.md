# React de Cero a Experto (React 19 + TypeScript)

Repositorio personal con ejercicios, prácticas y proyectos desarrollados durante el curso de **Udemy**  
**"React: de Cero a Experto (Hooks, TypeScript, MERN, Testing, AI, etc.)"**.

Este repositorio reúne un recorrido técnico y académico por fundamentos del ecosistema frontend, construcción de interfaces con React, manejo de estado, consumo de APIs, testing, routing, autenticación y despliegue.

---

## Propósito del repositorio

- Consolidar fundamentos de **JavaScript**, **TypeScript** y **React**.
- Aplicar buenas prácticas en organización de componentes, separación de responsabilidades y escalabilidad.
- Construir aplicaciones reales con **routing**, **formularios**, **estado global**, **testing** y **consumo de APIs**.
- Integrar frontend y backend en proyectos completos.
- Documentar el progreso del curso de forma ordenada y reutilizable como material de estudio.

---

## Estructura del curso en el repositorio

### `01-reforzamiento/`
Bloque de nivelación orientado a reforzar la base técnica necesaria antes de trabajar con React.

**Contenidos principales:**
- JavaScript moderno
- TypeScript básico
- tipado de funciones, objetos y arreglos
- desestructuración
- imports y exports
- fundamentos previos al modelo de componentes

### `02-first-steps/`
Primera aproximación práctica a React.

**Contenidos principales:**
- JSX
- componentes funcionales
- props
- estado local
- eventos
- renderizado condicional
- pruebas iniciales de componentes

### `03-gifs-app/`
Proyecto orientado al consumo de APIs y composición de interfaces.

**Contenidos principales:**
- búsquedas dinámicas
- renderizado de listas
- manejo de formularios
- peticiones HTTP
- organización modular de componentes
- primeras prácticas de testing aplicado

### `04-hooks-app/`
Sección centrada en hooks y patrones de reutilización de lógica.

**Contenidos principales:**
- `useState`
- `useEffect`
- `useMemo`
- `useCallback`
- `useRef`
- `useReducer`
- custom hooks
- memoización y performance

### `05-heroes-app/`
Proyecto completo orientado a navegación, protección de rutas y testing.

**Contenidos principales:**
- React Router
- layouts
- rutas públicas y privadas
- filtros y búsquedas
- pruebas unitarias e integración
- mocks, spies y snapshots
- despliegue del frontend a producción

### `06-nest-heroes-backend/`
Backend desarrollado con NestJS para complementar el enfoque full stack.

**Contenidos principales:**
- arquitectura modular
- controladores y servicios
- endpoints REST
- configuración de entorno backend
- soporte para despliegue en producción

### `07-teslo-shop/`
Proyecto final del curso, dividido en frontend y backend.

#### `07-teslo-shop/teslo-shop/`
Aplicación frontend del e-commerce y panel administrativo.

**Contenidos principales:**
- catálogo de productos
- filtros y paginación
- vistas públicas y administrativas
- autenticación de usuarios
- formularios de creación y edición
- sincronización de datos con API
- componentes reutilizables y UI moderna

#### `07-teslo-shop/backend-teslo-shop/`
Backend del proyecto final construido con NestJS.

**Contenidos principales:**
- autenticación con JWT
- gestión de usuarios y roles
- CRUD de productos
- subida de archivos
- seed de datos
- documentación con Swagger
- base de datos relacional con TypeORM

---

## Competencias y tecnologías trabajadas

### Desarrollo frontend
- **React 19**
- **TypeScript**
- **Vite**
- **React Router**
- **TanStack Query / React Query**
- **React Hook Form**
- **Zustand**
- **Context API**
- **Redux Toolkit**
- **Tailwind CSS**
- **shadcn/ui**
- **Radix UI**
- **MUI** y Bootstrap en distintos ejercicios

### Desarrollo backend y full stack
- **NestJS**
- **Node.js**
- **TypeORM**
- **PostgreSQL**
- **JWT**
- **bcrypt**
- **WebSockets**
- **Swagger**
- carga de archivos
- seed de base de datos

### Testing y calidad de software
- **Vitest**
- **React Testing Library**
- pruebas unitarias
- pruebas de integración
- snapshots
- mocks y spies
- ESLint

### Flujo de trabajo y despliegue
- **Git** y **GitHub**
- **GitHub Pages**
- **Render**
- variables de entorno
- automatización de despliegues

---

## Síntesis académica del recorrido

A lo largo del curso se trabajó una progresión pedagógica clara:

1. **Fundamentos del lenguaje y tipado** para construir una base sólida.
2. **Introducción a React** mediante componentes, props y estado.
3. **Consumo de APIs y composición de interfaces** en proyectos intermedios.
4. **Profundización en hooks y reutilización de lógica** con custom hooks y reducers.
5. **Navegación, testing y protección de rutas** en aplicaciones más completas.
6. **Desarrollo full stack** con NestJS para integrar frontend y backend.
7. **Proyecto final integral** con e-commerce, autenticación, panel admin y despliegue.

Este enfoque permitió trabajar tanto la dimensión conceptual como la práctica profesional del desarrollo moderno con React.

---

## Proyecto final: Teslo Shop

El proyecto final representa la etapa de integración de los contenidos del curso.

### Frontend
En el frontend se desarrolló una aplicación moderna con enfoque de e-commerce y administración, incluyendo:

- catálogo de productos
- navegación por categorías y género
- filtros y paginación
- panel administrativo
- autenticación y registro
- formularios complejos
- componentes reutilizables
- consumo de API y sincronización de estado servidor

### Backend
En el backend se trabajó una API estructurada con NestJS, incluyendo:

- autenticación con JWT
- control de acceso por roles
- endpoints para productos y usuarios
- carga de archivos
- seed inicial de datos
- persistencia con TypeORM
- documentación y soporte para entorno productivo

---

## Ejecución de los proyectos

### Proyectos frontend
Dentro de la carpeta correspondiente:

```bash
npm install
npm run dev
```

### Proyectos backend con NestJS
Dentro del backend correspondiente:

```bash
npm install
npm run start:dev
```

Si el proyecto utiliza Docker para base de datos:

```bash
docker compose up -d
```

---

## Variables de entorno

### `05-heroes-app`
Puede requerir configuración específica de build y base path según el entorno de despliegue.

### `07-teslo-shop/teslo-shop`
Crear un archivo `.env` con una variable similar a:

```bash
VITE_API_URL=http://localhost:3000/api
```

### `07-teslo-shop/backend-teslo-shop`
Tomar como referencia el archivo `.env.template` y completar las variables necesarias para el entorno local o productivo.

---

## Despliegues actuales

### Heroes App
- **Frontend:** [GitHub Pages](https://andresito87.github.io/CursoReact2025/)
- **Backend:** [Render](https://heroes-app-backend-2xm8.onrender.com/)

---

## Teslo Shop — enlace de despliegue final

Se deja esta sección preparada para añadir el enlace definitivo del proyecto final:

- **Frontend:** [Teslo Shop](https://teslo-shop-frontend-react.netlify.app/)
- **Backend:** [Render](https://teslo-shop-backend-mtln.onrender.com/api/products)
- **Notas adicionales:** plataforma de despliegue, observaciones técnicas o credenciales de demo si corresponde.

---

## Valor formativo del repositorio

Este repositorio funciona como evidencia de aprendizaje en áreas clave del desarrollo frontend y full stack:

- construcción de interfaces con React
- manejo de estado local y global
- testing de componentes y flujos
- integración con APIs
- autenticación y autorización
- organización escalable del código
- despliegue de aplicaciones reales

Además, documenta el progreso académico de forma ordenada, permitiendo revisar conceptos, prácticas y proyectos desarrollados a lo largo del curso. Es un recurso valioso para repasar fundamentos, consultar ejemplos prácticos y seguir el camino de aprendizaje en React y tecnologías relacionadas.

---


