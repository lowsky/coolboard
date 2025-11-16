# CONTINUE Project Guide

> This file is automatically loaded by Continue when working in this repository. It provides a concise, developer‑friendly overview of the project and guides contributors through common tasks.

---

## 1. Project Overview
- **Purpose** – A Next.js application named *coolboard* that serves as a dashboard for monitoring and interacting with data stored in a Neon (PostgreSQL) database.
- **Key technologies** –
  - Next.js 15 (App Router)
  - React 19 + Chakra‑UI, Lucide, Inter‑UI
  - Apollo Client & GraphQL Yoga server (Pothos + Prisma)
  - Clerk for authentication, Vercel Analytics & OTEL
  - Prisma + Neon (serverless PostgreSQL)
- **High‑level architecture** –
  - *Frontend*: Next.js pages & React components in `src/`.
  - *GraphQL API*: Built with Pothos, powered by Prisma; exposed at `/api/graphql`.
  - *Database*: Neon serverless PostgreSQL accessed via Prisma client.
  - *Auth*: Clerk SDK integrated into Next.js (middleware in `middleware.ts`).

## 2. Getting Started
```bash
# Install dependencies (Node 22 required)
yarn install
```
- **Prerequisites** – Node 22.x, Yarn 4.
- **Environment variables** – Copy `.env.example` to `.env.local` and fill:
  - `DATABASE_URL`
  - `NEXTAUTH_SECRET`, `CLERK_PUBLISHABLE_KEY`, etc.
- **Run locally** –
```bash
# Development server (uses Clerk auth)
yarn start
```
- **Run tests** –
```bash
# Run Cypress e2e (Electron)
yarn smoketest
```
- **Build for production** –
```bash
# Generates Prisma client, builds Next.js app, and runs smoke tests
yarn build
```

## 3. Project Structure
- `src/` – Main application source.
  - `components/`, `hooks/`, `layouts/`
  - `lib/` – Utility functions (e.g., GraphQL client setup).
- `pages/api/graphql.ts` – Pothos GraphQL server.
- `middleware.ts` – Clerk auth middleware.
- `prisma/` – Prisma schema and migration files.
- `.continue/` – Continue configuration (rules, templates).
- `smoketest/` – Cypress e2e tests.
- Configuration files: `next.config.js`, `tsconfig.json`, `.eslintrc.*`, `.prettierrc`.

## 4. Development Workflow
- **Coding standards** – ESLint + Prettier, TypeScript strict mode.
- **Component style** – Chakra‑UI components with Emotion styling; keep UI logic in hooks.
- **Testing** – Cypress for e2e, Jest (if added) for unit tests.
- **Build** – `yarn build` compiles Next.js and Prisma client.
- **Deployment** – Vercel (via `vercel.json`).
- **Contribution guidelines** – Create feature branches, run tests locally, submit PR with lint pass.

## 5. Key Concepts
- **Auth Flow** – Clerk provides `useClerk`, `clerkClient` and Next.js middleware.
- **GraphQL** – Pothos schema, Prisma resolvers; query caching via Apollo Client.
- **Prisma** – `prisma/client` auto‑generated, migrations via `prisma migrate deploy`.
- **OTEL** – Automatic instrumentation for Express, GraphQL, HTTP, and Web.

## 6. Common Tasks
| Task | Command / Steps |
|------|-----------------|
| Migrate DB | `yarn prisma:migrate` |
| Generate Prisma client | `yarn prisma:generate` |
| Run smoke tests | `yarn smoketest` |
| Generate GraphQL types | `yarn codegen` |

## 7. Troubleshooting
- **Database connection errors** – Verify `DATABASE_URL` and Neon status.
- **Clerk auth issues** – Ensure Clerk environment vars are set; check middleware in `middleware.ts`.
- **GraphQL errors** – Run `yarn codegen` to sync types; inspect `/api/graphql` logs.
- **Build failures** – Check Node version, clear `node_modules`, run `yarn clean && yarn install`.

## 8. References
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Clerk Auth Docs](https://docs.clerk.dev/nextjs/overview)
- [Pothos GraphQL Docs](https://pothosgraphql.com/docs/intro)
- [Vercel Deployments](https://vercel.com/docs)

---
> **Note**: Some sections (e.g., environment variable names, exact auth flow) may need verification. Feel free to edit and expand.
