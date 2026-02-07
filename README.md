# Walletrack

Walletrack es una app de finanzas personales creada como proyecto de aprendizaje con Next.js (frontend) y Express (backend). Permite registrar presupuestos, administrar gastos y manejar todo el flujo de autenticacion de usuarios con confirmacion por email y recuperacion de contrasena.

## Demo rapida de lo que hace

- Registro, confirmacion de cuenta y login con JWT.
- Recuperacion de contrasena via email y validacion de token.
- CRUD de presupuestos.
- CRUD de gastos dentro de un presupuesto.
- Dashboard con resumen de presupuesto, disponible y gastado.
- Perfil de usuario: actualizar datos y cambiar contrasena.
- Validaciones en frontend (Zod) y backend (express-validator).
- Proteccion de rutas con cookies HttpOnly en el frontend y middleware JWT en el backend.

## Stack tecnico

Frontend

- Next.js 16 (App Router, Server Actions)
- React 19
- Tailwind CSS v4
- Headless UI, Heroicons
- Zod, React Toastify

Backend

- Express 5
- Sequelize + Postgres
- JWT (jsonwebtoken)
- Nodemailer + Handlebars (emails de confirmacion y reset)
- Express Rate Limit
- Jest + Supertest (tests)

## Arquitectura

- Frontend en `frontend/` consume la API REST del backend.
- Backend en `backend/` expone `/api/auth` y `/api/budgets`.
- Autenticacion basada en JWT.
- Sesion en frontend guardada en cookie HttpOnly `WALLETRACK_TOKEN`.
- Emails transaccionales con plantillas Handlebars.

## Requisitos

- Node.js 20+ (recomendado)
- pnpm 10+
- Postgres

## Variables de entorno

Backend (`backend/.env`):

```env
PORT=4000
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DBNAME
JWT_SECRET=super-secret
EMAIL_HOST=smtp.example.com
EMAIL_PORT=2525
EMAIL_USER=user
EMAIL_PASSWORD=pass
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

Frontend (`frontend/.env.local`):

```env
API_URL=http://localhost:4000/api
NEXT_PUBLIC_URL=http://localhost:3000
```

## Instalacion

1. Instala dependencias en ambos proyectos.

```bash
cd backend
pnpm install

cd ../frontend
pnpm install
```

2. Levanta el backend.

```bash
cd backend
pnpm dev
```

3. Levanta el frontend.

```bash
cd frontend
pnpm dev
```

La app quedara disponible en `http://localhost:3000`.

## Scripts utiles

Backend (`backend/package.json`)

- `pnpm dev` - servidor con nodemon + ts-node
- `pnpm build` - compila TypeScript
- `pnpm start` - inicia desde `dist/`
- `pnpm test` - tests
- `pnpm test:coverage` - cobertura

Frontend (`frontend/package.json`)

- `pnpm dev` - servidor de desarrollo
- `pnpm build` - build de produccion
- `pnpm start` - server de produccion
- `pnpm lint` - lint

## Endpoints principales (backend)

Auth

- `POST /api/auth/create-account`
- `POST /api/auth/confirm-account`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/validate-token`
- `POST /api/auth/reset-password/:token`
- `GET /api/auth/user`
- `POST /api/auth/update-password`
- `POST /api/auth/check-password`
- `PUT /api/auth/user`

Budgets + Expenses (protegidos)

- `GET /api/budgets`
- `POST /api/budgets`
- `GET /api/budgets/:budgetId`
- `PUT /api/budgets/:budgetId`
- `DELETE /api/budgets/:budgetId`
- `POST /api/budgets/:budgetId/expenses`
- `GET /api/budgets/:budgetId/expenses/:expenseId`
- `PUT /api/budgets/:budgetId/expenses/:expenseId`
- `DELETE /api/budgets/:budgetId/expenses/:expenseId`

## Estructura del proyecto

- `backend/` API REST con Express + Sequelize
- `frontend/` App Next.js (App Router)
- `frontend/actions/` Server Actions para autenticacion y CRUD
- `frontend/src/schemas/` Validaciones con Zod
- `backend/src/emails/` Plantillas de email

## Notas

- La base de datos se inicializa con `sequelize.sync()` al arrancar el backend.
- El rate limit se ajusta segun `NODE_ENV`.

## Autor

Proyecto personal de aprendizaje con Next.js + Express. Edward Ojeda
