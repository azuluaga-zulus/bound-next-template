# Bound Next Template

Base de front-end para **Bound**, plataforma de agentes de IA para ventas.  
Stack: **Next.js 15**, **React 19**, **TypeScript**, **Tailwind v4**, **pnpm**.

## 🚀 Quickstart

### Codespaces (recomendado)

1. Abrir el Codespace del repo.
2. Instalar deps (si hace falta): `pnpm install`
3. Dev server: `pnpm dev` → http://localhost:3000

### Local (opcional)

- Node 20+, pnpm 8+.
- `pnpm install` → `pnpm dev`.

## 📦 Scripts útiles

- `pnpm dev` — arranca el dev server.
- `pnpm build` — compila producción (Next build).
- `pnpm start` — sirve la build.
- `pnpm lint` — ESLint sobre `src`.
- `pnpm format` — Prettier sobre el repo.
- `pnpm typecheck` — TypeScript sin emitir (`tsc --noEmit`).

## 🪝 Git Hooks (Husky)

- **pre-commit** → `lint-staged`
  - TS/TSX: `eslint --fix` y luego `prettier --write`.
  - Otros (json/css/md): `prettier --write`.
  - **Bloquea** el commit si quedan errores no corregibles.
- **pre-push** → `pnpm typecheck && pnpm build`
  - **Bloquea** el push si fallan los tipos o la compilación.

> Si algo falla y solo quieres arreglar el hook:  
> `pnpm exec lint-staged --debug` o `HUSKY_DEBUG=1 git commit -m "debug"`.  
> **No** ignores Husky en el día a día; solo como último recurso: `HUSKY=0 git commit ...`.

## 🧩 Convenciones de commit (recomendado)

Usamos **Conventional Commits**:

- `feat(scope): descripción`
- `fix(scope): descripción`
- `chore|docs|refactor|test(scope): descripción`

Ejemplos:

- `feat(onboarding): crear paso de ICP`
- `fix(ui): corregir contraste de botones`

> (Opcional/pending) **commitlint** para validar mensajes automáticamente.

## 📁 Estructura propuesta

src/
app/ # App Router de Next
(routes)/ # grupos de rutas
api/ # route handlers
components/ # UI compartida
features/ # módulos funcionales (onboarding, campaigns, etc.)
lib/ # utils puros (sin efectos)
services/ # integraciones (Supabase, n8n, etc.)
styles/ # estilos globales si aplica

markdown
Copy
Edit

## ⚖️ Server vs Browser (Next.js)

- **Server Components por defecto**. Añade `"use client"` solo si hay estado, efectos, eventos o APIs de navegador.
- **Prohibido en server**: `window`, `document`, `localStorage`, `navigator`, etc.
- Utils como `src/lib/generateUUID.ts` deben ser **puros**.  
  Si necesitas navegador, crea una variante cliente o un wrapper que chequee `typeof window !== 'undefined'`.

## 🛣️ Paths de TypeScript

- Alias recomendado: `@/*` → `src/*`.  
  (Se confirmará/activará en el paso de _TS paths_ del plan.)

## 🔐 Entornos y secretos

- Archivos: `.env.local`, `.env.staging`, `.env.production` (no se commitean).
- Variables públicas: `NEXT_PUBLIC_*`. Variables de servidor: **sin** ese prefijo.
- Secrets gestionados en GitHub/Vercel/DO según entorno.

## 🧪 Testing (mínimo, en el plan)

- **Type-safety** en CI: `tsc --noEmit`.
- **Unit** (Vitest) para utils clave (UUID, formatters).
- **E2E** (Playwright) smoke: `/`, `/login`, `/onboarding` (headless en CI).

## 🧱 Reglas del equipo

Consulta **.claude-rules.md** para normas de ingeniería y PRs.
