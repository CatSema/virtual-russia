# API

Все endpoints имеют prefix `/api/v1`. `GET /api/v1/health` возвращает `ok` или `degraded` и реально проверяет PostgreSQL, Redis и S3-compatible storage. API продолжает запускаться при временной недоступности зависимостей, поэтому health endpoint остаётся диагностическим.

Успешные API contracts находятся в `@virtual-russia/contracts`; Prisma models никогда не экспортируются на frontend. Ошибки имеют форму `statusCode`, `code`, `message`, `details`, `requestId`. `requestId` также передаётся в response header и структурированных access logs.

Swagger доступен в development на `/api/docs` и выключен в production. CORS берёт разрешённые origins только из `CORS_ALLOWED_ORIGINS`; wildcard не используется. Body ограничен 1 MB. Будущие медиа загружаются браузером напрямую в S3 по signed URL, а не через NestJS.
