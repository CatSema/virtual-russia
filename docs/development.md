# Development

## Prerequisites

Node.js 22+, pnpm 11+ и Docker Compose. Скопируйте `.env.example` в `.env`; production credentials никогда не должны попадать в репозиторий.

## Startup

Выполните `pnpm install`, `docker compose up -d`, `pnpm db:generate`, `pnpm db:migrate`, затем `pnpm dev`. Docker использует named volumes: `docker compose down` не удаляет данные. Для полного локального сброса используйте осознанно `docker compose down -v`.

## Quality gates

Перед PR обязательны `pnpm lint`, `pnpm typecheck`, `pnpm test` и `pnpm build`. Команда `pnpm format` применяет единый Prettier-стиль. CI повторяет те же проверки на push и pull request.

## Responsive QA

Проверьте главную страницу и mobile menu в portrait/landscape при 375×812, 430×932, 768×1024, 1024×768, 1440×900 и 1920×1080. Убедитесь в отсутствии горизонтального overflow, доступности menu с клавиатуры, видимом focus, закрытии Escape и корректной safe area.
