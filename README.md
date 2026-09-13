# Virtual Russia

Технический фундамент кроссплатформенной платформы интерактивных виртуальных туров по России. Этап 1 реализует инфраструктуру, локализацию, адаптивную оболочку и health API — без бизнес-функций туров.

## Stack and architecture

pnpm workspaces, Next.js App Router, React, strict TypeScript, Tailwind CSS, shadcn/ui + Base UI, NestJS, PostgreSQL/Prisma, Redis, MinIO/S3, Swagger. Схема: Web → REST API → PostgreSQL/Redis/S3. Подробности — в `docs/architecture.md`.

## Quick start

`cp .env.example .env`, затем `pnpm install`, `docker compose up -d`, `pnpm db:generate`, `pnpm db:migrate`, `pnpm dev`.

Web: http://localhost:3000/ru; API: http://localhost:3001/api/v1/health; Swagger (development): http://localhost:3001/api/docs; MinIO console: http://localhost:9001.

## Commands

`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm format`. Prisma: `pnpm db:generate`, `pnpm db:migrate`. Docker uses persistent named volumes.

## UI and contribution

Общие UI components находятся в `packages/ui` и импортируются как `@virtual-russia/ui/button`. Добавляя shadcn component, направляйте CLI в этот пакет, сохраняйте `primitive: base-ui`, добавляйте export и тест. Radix не является частью UI foundation. Полные правила: `docs/ui.md`; настройка окружения: `docs/development.md`; API: `docs/api.md`.
