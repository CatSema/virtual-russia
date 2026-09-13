# AGENT.md

## 1. Назначение файла

Этот файл содержит постоянные инструкции для любых AI-агентов и разработчиков, работающих с проектом.

Перед внесением изменений в кодовую базу необходимо:

1. прочитать этот файл полностью;
2. изучить существующую структуру проекта;
3. не ломать уже принятые архитектурные решения без явной причины;
4. не реализовывать функциональность будущих этапов без задачи;
5. сохранять совместимость проекта с Web, PWA, Android, iOS и WebXR-направлением.

Если конкретная задача противоречит этому файлу, приоритет имеет явно сформулированная задача пользователя/владельца проекта, но архитектурные последствия должны быть указаны до или после внесения изменений.

---

# 2. Описание проекта

Проект представляет собой кроссплатформенную платформу интерактивных виртуальных туров по России, ориентированную преимущественно на иностранную аудиторию.

Основная идея:

- виртуальные туры по регионам, городам и достопримечательностям России;
- 360° фотографии;
- 360° видео;
- интерактивные сцены;
- hotspots;
- переходы между сценами;
- исторические справки;
- изображения и дополнительный медиаконтент;
- аудиогид;
- субтитры;
- викторины;
- интерактивный сторителлинг;
- мультиязычная локализация;
- персонализация;
- рекомендации;
- платный доступ к турам и пакетам;
- личный кабинет;
- прогресс прохождения;
- избранное;
- история;
- PWA;
- Android/iOS через Capacitor;
- WebXR на поддерживаемых устройствах;
- административная CMS;
- визуальный конструктор виртуальных туров;
- API для будущих B2B-интеграций.

Главная ставка проекта — Web-first архитектура.

Один React/Next.js frontend должен обслуживать:

- Desktop Web;
- Tablet Web;
- Mobile Web;
- PWA;
- Android через Capacitor;
- iOS через Capacitor.

Отдельные независимые frontend-кодовые базы для Web, Android и iOS не планируются.

---

# 3. Основные архитектурные принципы

## 3.1. Web-first

Первичным клиентом является полноценное web application.

Порядок развития:

```text
Web Application
      ↓
PWA
      ↓
Capacitor
 ┌────┴────┐
Android   iOS
```

Не создавать отдельные:

```text
web frontend
android frontend
ios frontend
```

если задача прямо не требует нативного функционала, который невозможно разумно реализовать иначе.

---

## 3.2. Один backend

Все клиенты используют единый API.

```text
Web / PWA / Android / iOS
           │
           ▼
         API
           │
           ▼
        NestJS
```

Нельзя создавать отдельный backend под мобильные приложения.

---

## 3.3. API-first

Frontend не обращается напрямую к PostgreSQL, Redis или внутренним backend services.

Правильно:

```text
Frontend
   ↓
REST API
   ↓
NestJS
   ↓
PostgreSQL / Redis / S3
```

Неправильно:

```text
Frontend
   ↓
Database
```

---

## 3.4. Контент не должен зависеть от программиста

После реализации CMS и Tour Builder новый виртуальный тур должен создаваться контент-менеджером без изменения программного кода.

Нельзя создавать архитектуру, где:

```text
новый тур
↓
нужно менять React-код
↓
нужно делать новый deploy
```

Данные тура должны храниться как контент и конфигурация.

---

# 4. Основной технологический стек

## Frontend

Использовать:

- Next.js;
- React;
- TypeScript;
- Next.js App Router;
- TypeScript strict mode;
- shadcn/ui;
- Base UI;
- Tailwind CSS;
- CSS variables;
- Lucide Icons.

Планируемые технологии следующих этапов:

- Three.js;
- WebXR;
- HLS;
- PWA;
- Capacitor.

---

## Backend

Использовать:

- NestJS;
- TypeScript;
- REST API;
- Swagger / OpenAPI;
- Prisma ORM;
- PostgreSQL;
- Redis;
- S3-compatible Object Storage;
- structured logging.

---

## Infrastructure

Предпочтительно:

- Docker Compose;
- PostgreSQL;
- Redis;
- MinIO в development;
- S3-compatible storage в production;
- FFmpeg для media pipeline;
- CDN для delivery тяжёлого контента;
- Prometheus;
- Grafana.

---

## Package manager

Использовать:

```text
pnpm
```

Проект должен использовать:

```text
pnpm workspaces
```

---

# 5. Monorepo

Предпочтительная структура:

```text
virtual-russia/
│
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── ui/
│   ├── contracts/
│   ├── types/
│   ├── eslint-config/
│   └── tsconfig/
│
├── infrastructure/
├── docs/
├── .github/
├── docker-compose.yml
├── pnpm-workspace.yaml
├── package.json
├── .env.example
└── AGENT.md
```

Структуру можно расширять по мере роста проекта.

Не создавать каталоги и пустые модули «на будущее» без реального использования.

---

# 6. UI stack

Основной UI stack:

```text
shadcn/ui
    ↓
Base UI
    ↓
Tailwind CSS
    ↓
CSS variables / Design Tokens
```

## Правила

- shadcn/ui — основной слой UI-компонентов;
- Base UI — основной headless primitive layer;
- Tailwind CSS — основная система стилизации;
- CSS variables — основа design tokens;
- Lucide — стандартная библиотека UI-иконок.

Для нового кода не использовать Radix UI как альтернативный foundation без явной причины.

Не смешивать хаотично:

```text
Base UI
Radix UI
Material UI
Chakra
Ant Design
Mantine
Bootstrap
```

---

# 7. shadcn/ui

shadcn/ui должен быть настроен с Base UI implementation.

Компоненты должны храниться централизованно в:

```text
packages/ui
```

или эквивалентном общем UI package.

Пример:

```text
packages/ui/src/components/ui/
├── button.tsx
├── badge.tsx
├── card.tsx
├── dialog.tsx
├── sheet.tsx
├── dropdown-menu.tsx
├── tooltip.tsx
└── ...
```

Не устанавливать весь каталог shadcn заранее.

Добавлять только реально используемые компоненты.

---

# 8. Base UI

Base UI преимущественно используется через shadcn/ui.

Прямое использование Base UI допустимо, если:

- нужного компонента нет в shadcn;
- требуется собственный primitive;
- нужен специализированный контрол;
- требуется поведение, которое лучше реализовать поверх Base UI напрямую.

В таком случае primitive должен быть обёрнут в общий UI layer.

Не размазывать прямые импорты Base UI по feature-коду без необходимости.

---

# 9. UI architecture

Предпочтительная зависимость:

```text
Base UI
   ↓
shadcn component
   ↓
Project UI component
   ↓
Feature component
   ↓
Page
```

UI primitives не должны знать о бизнес-сущностях.

Например:

```text
Button
Dialog
Sheet
Select
Tabs
Card
Badge
```

не должны содержать бизнес-логику Tours, Users, Payments и т.д.

---

# 10. Design Tokens

Цвета, радиусы и основные стили должны задаваться централизованно.

Предпочтительно через CSS variables:

```text
--background
--foreground

--card
--card-foreground

--popover
--popover-foreground

--primary
--primary-foreground

--secondary
--secondary-foreground

--muted
--muted-foreground

--accent
--accent-foreground

--destructive

--border
--input
--ring

--radius

--success
--warning
--info
```

Не хардкодить brand colors по всему приложению.

Плохо:

```tsx
className="bg-[#0066ff] text-[#ffffff]"
```

Хорошо:

```tsx
className="bg-primary text-primary-foreground"
```

---

# 11. Responsive design — обязательное правило

Адаптация под устройства является частью архитектуры проекта, а не финальной доработкой.

Использовать:

```text
mobile-first
```

Каждый пользовательский компонент должен проектироваться сразу для:

- смартфона;
- большого смартфона;
- планшета;
- ноутбука;
- desktop;
- wide desktop.

Нельзя сначала делать desktop-only интерфейс и откладывать mobile adaptation.

---

# 12. Responsive Tailwind

Использовать стандартные responsive modifiers Tailwind там, где возможно.

Пример:

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" />
```

Не создавать множество ручных media queries, если задача решается Tailwind.

---

# 13. Целевые размеры интерфейса

Интерфейс регулярно проверять минимум на:

```text
375 × 812
430 × 932
768 × 1024
1024 × 768
1440 × 900
1920 × 1080
```

Проверять также:

```text
portrait
landscape
```

особенно на mobile/tablet.

---

# 14. Touch-friendly design

Все основные interactive controls должны быть удобны для пальца.

Ориентир для основных элементов:

```text
~44 × 44 px
```

Не создавать критические контролы, доступные только по hover.

---

# 15. Mobile navigation

Desktop navigation и mobile navigation могут визуально отличаться.

Для mobile использовать доступный overlay/drawer, предпочтительно shadcn/ui + Base UI Sheet или подходящий equivalent.

Mobile menu должно поддерживать:

- touch;
- keyboard;
- Escape;
- focus management;
- screen reader.

---

# 16. Safe Areas

Учитывать будущий запуск в Capacitor.

При необходимости использовать:

```css
env(safe-area-inset-top)
env(safe-area-inset-right)
env(safe-area-inset-bottom)
env(safe-area-inset-left)
```

Особенно для:

- Header;
- fullscreen player;
- нижних controls;
- mobile overlays.

---

# 17. Viewport

Для fullscreen mobile UI предпочитать современные units:

```text
dvh
svh
```

Не полагаться исключительно на:

```text
100vh
```

---

# 18. Fullscreen 360° Player

Будущий Tour Player должен иметь возможность занимать:

```text
100vw × 100dvh
```

Поэтому глобальный App layout не должен принудительно ограничивать всё содержимое стандартным max-width container.

Должны существовать разные layout patterns:

```text
StandardLayout
TourPlayerLayout
```

---

# 19. Accessibility

Accessibility является обязательной характеристикой UI.

Использовать:

- semantic HTML;
- keyboard navigation;
- focus-visible;
- accessible overlays;
- корректные buttons;
- корректные links;
- labels;
- достаточный contrast;
- `prefers-reduced-motion`.

Нельзя использовать `<div>` как кнопку.

Не отключать глобально outline.

---

# 20. Internationalization

Проект изначально мультиязычный.

Базовые языки:

```text
ru
en
```

В будущем:

```text
zh
fr
ar
```

Предпочтительный frontend solution:

```text
next-intl
```

если текущая архитектура не обосновывает другое решение.

---

# 21. Locale routing

Предпочтительный вариант:

```text
/ru/...
/en/...
```

Будущее:

```text
/zh/...
/fr/...
/ar/...
```

Пользовательские строки не должны хаотично хардкодиться внутри компонентов.

---

# 22. RTL readiness

Арабский язык должен быть возможен без полной переделки UI.

Предпочитать logical direction concepts:

```text
start
end
inline
```

вместо жёсткой зависимости от:

```text
left
right
```

Не строить layout, который принципиально работает только в LTR.

---

# 23. Next.js

Использовать:

```text
App Router
```

Не использовать Pages Router в новом коде.

---

# 24. Server / Client Components

Не добавлять:

```tsx
"use client"
```

во все компоненты без необходимости.

Server Components использовать там, где это рационально.

Client Components нужны для:

- interactive Base UI components;
- browser APIs;
- state;
- forms;
- Three.js;
- WebXR;
- Capacitor API;
- user interactions.

Сохранять преимущества:

- SSR;
- SEO;
- streaming;
- server metadata.

---

# 25. Three.js

Three.js используется для будущего Tour Player.

Не подключать Three.js к обычным страницам каталога, профиля и т.п.

Tour Player должен загружаться отдельно через:

```text
dynamic import
```

или аналогичный механизм.

Обычный пользователь не должен скачивать 3D runtime до открытия 360°-тура.

---

# 26. Будущая архитектура Tour Player

Ориентировочная структура:

```text
TourPlayer
│
├── Renderer
├── Camera
├── PanoramaRenderer
├── Video360Renderer
├── HotspotLayer
├── AudioController
├── SubtitleController
├── NavigationController
├── ProgressController
└── WebXRController
```

Не создавать эти модули до соответствующего этапа только ради структуры.

---

# 27. 360° media

Будущие форматы:

- equirectangular 360° photo;
- equirectangular 360° video;
- HLS adaptive video.

360° video нельзя проектировать как обычный огромный MP4, который целиком отдаётся пользователю.

---

# 28. Media pipeline

Планируемая архитектура:

```text
Original 4K/8K
      ↓
    FFmpeg
      ↓
несколько профилей
      ↓
     HLS
      ↓
Object Storage
      ↓
     CDN
      ↓
 Tour Player
```

---

# 29. Media upload

Не передавать тяжёлые media-файлы через NestJS.

Будущая схема:

```text
Frontend
   │
   │ request signed upload URL
   ▼
NestJS
   │
   │ signed URL
   ▼
Frontend
   │
   └────────────► S3
```

NestJS управляет авторизацией и выдачей signed URLs, а не проксирует многогигабайтные файлы.

---

# 30. WebXR

WebXR является дополнительным режимом Tour Player.

Обычный Tour Player обязан работать без WebXR.

Пример архитектуры:

```text
TourPlayer
│
├── DesktopController
├── TouchController
├── GyroscopeController
└── WebXRController
```

Если WebXR недоступен, стандартный 360° режим должен продолжать работать.

---

# 31. PWA

PWA является частью основной продуктовой стратегии.

В дальнейшем должны поддерживаться:

- manifest;
- installability;
- service worker;
- offline application shell;
- разумное caching;
- app icons.

Нельзя автоматически кэшировать многогигабайтный 4K/8K контент.

Offline tour downloads — отдельная функция и должна реализовываться явно.

---

# 32. Capacitor

После готовности web/PWA приложение должно быть адаптировано через Capacitor.

План:

```text
Web/PWA
   ↓
Capacitor
 ┌─┴─┐
Android
iOS
```

Не создавать отдельный React Native / Flutter / Swift / Kotlin UI без отдельного решения.

---

# 33. Capacitor native functions

В будущем native layer может использоваться для:

- push notifications;
- share;
- deep links;
- secure storage;
- haptics;
- status bar;
- splash screen;
- orientation;
- platform-specific integrations.

Web UI остаётся общей основой.

---

# 34. Backend architecture

Backend:

```text
NestJS
TypeScript
REST
OpenAPI
```

Архитектуру разделять по доменным модулям.

В будущем ориентировочно:

```text
auth
users
roles
interests

destinations
tours
scenes
hotspots
media

quizzes
progress
favorites

products
orders
payments
entitlements

recommendations
reviews
analytics

admin
```

Не создавать эти модули раньше необходимости.

---

# 35. PostgreSQL

Использовать PostgreSQL.

ORM:

```text
Prisma
```

Frontend никогда не должен импортировать Prisma models.

---

# 36. Идентификаторы

Для основных публичных сущностей использовать UUID или иной непоследовательный идентификатор, если нет аргументированной причины.

Предпочтительно для:

- User;
- Tour;
- Scene;
- MediaAsset;
- Order;
- Payment.

---

# 37. Redis

Redis использовать там, где он реально нужен:

- cache;
- queues;
- rate limiting;
- ephemeral data;
- synchronization;
- realtime features.

Не хранить основную бизнес-информацию только в Redis.

PostgreSQL остаётся source of truth для структурированных бизнес-данных.

---

# 38. S3 abstraction

Backend должен работать через S3-compatible abstraction.

Development:

```text
MinIO
```

Production:

```text
любой S3-compatible provider
```

Нельзя жёстко привязывать бизнес-код к MinIO-specific API.

---

# 39. API versioning

Использовать последовательный versioning.

Предпочтительно:

```text
/api/v1/...
```

Не создавать часть endpoints с `/v1`, а часть без versioning без обоснования.

---

# 40. API contracts

API contract не равен Database model.

Правило:

```text
Database Model
≠
API DTO / Contract
≠
Frontend View Model
```

Общие контракты можно держать в:

```text
packages/contracts
```

Не импортировать Prisma model во frontend.

---

# 41. API Client

Frontend должен иметь централизованный API client.

Нельзя размазывать:

```tsx
fetch("http://localhost:...")
```

по компонентам.

Предпочтительная зона:

```text
apps/web/src/lib/api/
```

или архитектурно эквивалентное место.

---

# 42. Error handling

Backend должен возвращать единообразные ошибки.

Пример:

```json
{
  "statusCode": 400,
  "code": "VALIDATION_ERROR",
  "message": "Request validation failed",
  "details": []
}
```

Frontend должен корректно обрабатывать:

- loading;
- success;
- error;
- empty state.

Runtime exception не является пользовательским error state.

---

# 43. Security baseline

Backend должен использовать:

- Helmet;
- DTO validation;
- whitelist;
- sanitization там, где нужно;
- request limits;
- secure CORS;
- production-safe errors;
- rate limiting там, где нужно.

Не возвращать production stack traces пользователю.

---

# 44. Secrets

Нельзя хранить в repository:

- passwords;
- API keys;
- access tokens;
- refresh tokens;
- production URLs с credentials;
- secret keys.

Использовать environment variables.

---

# 45. Environment configuration

Должен существовать:

```text
.env.example
```

Все обязательные environment variables должны валидироваться при старте приложения.

Приложение должно завершаться понятной ошибкой при отсутствии обязательной конфигурации.

---

# 46. CORS

CORS должен быть настроен явно.

Не использовать `*` как production default.

Allowed origins должны задаваться configuration/environment.

---

# 47. Logging

Использовать structured logging.

Минимально:

```text
timestamp
level
requestId
method
path
statusCode
responseTime
```

Не логировать:

- passwords;
- tokens;
- cookies;
- secret keys;
- sensitive payment information.

---

# 48. Request ID

Каждый HTTP request желательно связывать с уникальным:

```text
requestId
```

для диагностики.

---

# 49. Swagger / OpenAPI

Backend API должен документироваться через OpenAPI.

Development environment должен предоставлять Swagger UI.

Новые API endpoints должны сопровождаться корректным описанием контрактов.

---

# 50. Auth — будущее правило

Планируется:

- email/password;
- access token;
- refresh token;
- email verification;
- password reset.

В будущем можно добавить:

- Google;
- Apple;
- другие providers.

Auth не должен быть жёстко связан с одной конкретной UI-платформой.

---

# 51. Roles

Планируемые роли:

```text
USER
CONTENT_MANAGER
EDITOR
ADMIN
```

В будущем возможны B2B roles.

Не использовать разбросанные по проекту проверки уровня:

```ts
if (user.role === "admin")
```

если есть возможность централизованного RBAC.

---

# 52. Tour model — концептуально

Tour должен быть data-driven.

Ориентировочно:

```text
Tour
├── metadata
├── translations
├── media
├── scenes
├── pricing
└── publication state
```

---

# 53. Scene model — концептуально

Пример:

```text
Scene
├── id
├── tourId
├── type
│   ├── panorama
│   └── video360
├── media
├── initialYaw
├── initialPitch
└── hotspots[]
```

---

# 54. Hotspots — концептуально

Hotspot должен быть универсальным.

Типы могут включать:

```text
info
scene
image
audio
video
quiz
external
```

Координаты:

```text
yaw
pitch
```

Нельзя создавать отдельный React component в коде для каждого hotspot конкретного тура.

---

# 55. CMS / Tour Builder

CMS является ключевой частью проекта.

Контент-менеджер должен уметь:

- создать Tour;
- создать Scene;
- загрузить media;
- просмотреть 360° сцену;
- поставить hotspot кликом;
- выбрать тип hotspot;
- указать target;
- добавить тексты;
- добавить переводы;
- добавить аудио;
- добавить subtitles;
- добавить quiz;
- изменить порядок;
- preview;
- publish/unpublish.

---

# 56. Локализация контента

Нужно различать:

1. localization UI;
2. localization tour content.

Каждая сущность контента должна быть рассчитана на несколько языковых версий.

Не хранить английский перевод в отдельном случайном JSON, если модель предусматривает полноценные translations.

---

# 57. Аудио и субтитры

Архитектура должна поддерживать несколько аудиодорожек и subtitle tracks на разных языках.

Предпочтительно использовать стандартные subtitle formats, например WebVTT, если это соответствует задаче.

---

# 58. Recommendations

На раннем этапе не требуется ML.

Начинать с rule-based ranking:

```text
interests
category match
history
popularity
language availability
```

ML/AI добавлять только тогда, когда появится достаточное количество данных.

---

# 59. Payments

Разделять:

```text
Product
Order
Payment
Entitlement
```

Payment не должен напрямую означать доступ.

---

# 60. Entitlement

Именно entitlement определяет право пользователя на просмотр контента.

Источники доступа в будущем:

```text
WEB
APPLE
GOOGLE
PROMOCODE
ADMIN
PARTNER
```

Это позволяет отделить бизнес-доступ от конкретного payment provider.

---

# 61. App Store / Google Play

Не закладывать в бизнес-логику предположение, что все цифровые покупки всегда проходят только через web payment provider.

Мобильные stores могут иметь собственные требования.

Backend должен уметь нормализовать разные payment sources в единый entitlement layer.

---

# 62. Analytics

Все важные пользовательские действия в будущем должны иметь события.

Примеры:

```text
user_registered
tour_opened
scene_opened
hotspot_clicked
video_started
video_completed
quiz_started
quiz_completed
tour_completed
product_viewed
checkout_started
payment_completed
```

Названия событий должны быть стабильными.

---

# 63. Monitoring

Production infrastructure должна быть наблюдаемой.

Предпочтительно:

```text
Prometheus
Grafana
```

Метрики:

- availability;
- response time;
- error rate;
- PostgreSQL;
- Redis;
- storage;
- media queue;
- FFmpeg failures;
- system resources.

---

# 64. Health endpoint

Health endpoint должен реально проверять сервисы.

Пример:

```json
{
  "status": "ok",
  "services": {
    "api": "up",
    "database": "up",
    "redis": "up",
    "storage": "up"
  }
}
```

Нельзя возвращать статический hardcoded `up`.

---

# 65. Testing

Не писать тесты ради coverage.

Тестировать критичное поведение.

Минимальные слои:

- unit;
- API/e2e;
- frontend component;
- ключевые flows.

По мере развития проекта добавить end-to-end пользовательские сценарии.

---

# 66. TypeScript

Всегда использовать:

```text
strict mode
```

Не отключать строгую типизацию ради удобства.

Минимизировать:

```ts
any
```

Если `any` действительно нужен, причина должна быть понятна из контекста или комментария.

---

# 67. Lint / Format / Typecheck

Проект должен иметь рабочие команды:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm format
```

Перед завершением крупной задачи необходимо запускать соответствующие проверки.

---

# 68. CI

CI должен минимум выполнять:

```text
install
lint
typecheck
test
build
```

Не считать задачу полностью завершённой, если production build не проходит.

---

# 69. Docker

Docker Compose используется для development infrastructure.

Минимально:

```text
postgres
redis
minio
```

Frontend/backend разрешено запускать локально через pnpm, если это удобнее для development.

---

# 70. Persistent Data

`docker compose down` не должен удалять данные PostgreSQL/MinIO.

Для этого использовать named volumes.

Удаление persistent data должно происходить только явно.

---

# 71. Документация

Документация должна обновляться вместе с архитектурными изменениями.

Минимально:

```text
README.md
AGENT.md

docs/
├── architecture.md
├── development.md
├── ui.md
└── api.md
```

Если код и документация расходятся, это считается техническим долгом.

---

# 72. README

README должен позволять новому разработчику запустить проект без устных инструкций.

Минимально описать:

- назначение;
- stack;
- requirements;
- install;
- Docker;
- env;
- dev;
- build;
- tests;
- migrations;
- API docs.

---

# 73. Не создавать premature abstractions

Не создавать:

```text
AIService
BlockchainService
PaymentService
TourService
```

с пустой реализацией «на будущее».

Создавать abstraction, когда появилась реальная задача.

Документирование будущей архитектуры лучше пустого production-кода.

---

# 74. Не оставлять незавершённый код текущего этапа

Если функциональность входит в текущую задачу, не оставлять:

```text
TODO implement
FIXME later
mock for now
```

без необходимости.

Если задача объективно не может быть завершена полностью, явно описать остаток и причину.

---

# 75. Не делать лишнего

AI-агент не должен самостоятельно начинать реализацию следующего большого этапа только потому, что «это будет полезно».

Например, если задача касается инфраструктуры, не надо заодно реализовывать:

- auth;
- tours;
- payments;
- AI;
- WebXR.

Следовать scope задачи.

---

# 76. Не ломать совместимость

При изменении архитектуры проверять последствия для:

- responsive web;
- PWA;
- Capacitor Android;
- Capacitor iOS;
- WebXR;
- localization;
- RTL;
- accessibility.

---

# 77. Зависимости

Перед добавлением новой dependency проверить:

1. действительно ли она нужна;
2. нет ли решения уже в текущем stack;
3. поддерживается ли библиотека;
4. насколько она увеличивает bundle;
5. совместима ли с Next.js/React;
6. не дублирует ли shadcn/Base UI;
7. не создаёт ли platform lock-in.

---

# 78. UI dependency policy

Для обычного UI действовать в порядке:

```text
1. shadcn/ui
2. Base UI
3. небольшой собственный wrapper
4. специализированная библиотека
```

Не подключать крупный UI framework ради одного компонента.

---

# 79. Performance

Особое внимание:

- lazy loading;
- dynamic imports;
- image optimization;
- не загружать Three.js вне Tour Player;
- не загружать тяжёлый media до необходимости;
- server rendering там, где полезно;
- CDN для media;
- HLS для video.

---

# 80. SEO

Публичная часть платформы должна быть SEO-friendly.

Next.js должен использоваться с сохранением:

- server metadata;
- localized URLs;
- localized metadata;
- OpenGraph;
- canonical URLs;
- hreflang в будущем.

Не превращать весь проект в purely client-side SPA без причины.

---

# 81. International SEO

В будущем должны поддерживаться:

```text
hreflang
localized metadata
localized URLs
localized OpenGraph
```

Структура маршрутов не должна препятствовать этому.

---

# 82. Security платного контента

Нельзя считать скрытый frontend URL защитой платного media.

Будущие private media должны использовать:

- authorization;
- entitlement checks;
- signed URLs;
- CDN tokens;
- short-lived access.

---

# 83. Source of truth

Для основной бизнес-информации:

```text
PostgreSQL = source of truth
```

Для бинарных media:

```text
S3 = source of truth
```

Redis не является долгосрочным source of truth.

---

# 84. Production readiness

Перед production release необходимо проверить:

- secrets;
- CORS;
- logging;
- backups;
- migrations;
- health checks;
- monitoring;
- storage;
- HTTPS;
- rate limiting;
- error handling;
- restore procedure.

---

# 85. Git

Коммиты должны быть логичными и небольшими.

Не смешивать в одном изменении:

- инфраструктурный refactor;
- UI redesign;
- database migration;
- новую feature;

если это можно разумно разделить.

Не коммитить:

- `.env`;
- build artifacts;
- IDE files;
- temporary media;
- secrets.

---

# 86. Работа AI-агента перед изменением кода

Перед изменением:

1. изучить relevant files;
2. определить existing conventions;
3. проверить текущую архитектуру;
4. определить scope;
5. не дублировать существующие utilities/components;
6. проверить dependencies;
7. учитывать AGENT.md.

---

# 87. Работа AI-агента после изменения кода

После изменения:

1. проверить TypeScript;
2. проверить lint;
3. запустить relevant tests;
4. выполнить build, если изменение существенное;
5. проверить responsive UI, если затронут frontend;
6. обновить docs, если изменена architecture;
7. перечислить изменённые файлы;
8. описать известные ограничения.

---

# 88. Frontend Definition of Done

Frontend feature считается готовой, если:

- работает;
- typed;
- responsive;
- keyboard accessible;
- touch-friendly;
- localization-ready;
- не ломает RTL architecture;
- нет horizontal overflow;
- loading/error/empty states предусмотрены, если применимо;
- нет desktop-only assumptions;
- production build проходит.

---

# 89. Backend Definition of Done

Backend feature считается готовой, если:

- API contract определён;
- validation есть;
- errors единообразны;
- authorization есть, если требуется;
- logging не раскрывает secrets;
- Swagger актуален;
- migration есть, если менялась БД;
- relevant tests проходят;
- production build проходит.

---

# 90. Database migrations

Любое изменение database schema должно оформляться migration.

Не редактировать production database вручную вместо migration.

Migration должна быть повторяемой и понятной.

---

# 91. UI Review Checklist

Для любого нового экрана проверить:

```text
375px
430px
768px
1024px
1440px
1920px
```

Также проверить:

- portrait;
- landscape;
- keyboard;
- touch;
- long translations;
- loading;
- error;
- empty content.

---

# 92. Long translations

Иностранные строки могут быть существенно длиннее русских.

Нельзя строить UI, который работает только для короткого текста.

Кнопки, tabs, cards и navigation должны нормально переживать более длинные labels.

---

# 93. Arabic / RTL future

Особенно проверять:

- directional icons;
- breadcrumbs;
- arrows;
- drawers;
- margins;
- text alignment;
- flex/grid order.

Не нужно реализовывать полноценный Arabic UI раньше этапа локализации, но архитектура не должна его блокировать.

---

# 94. Tour Player UI

Tour Player — специальный интерфейс.

Его controls должны учитывать:

- desktop mouse;
- touch;
- mobile landscape;
- fullscreen;
- WebXR;
- accessibility;
- subtitles;
- audio;
- hotspots.

Не переносить обычный dashboard UI напрямую в immersive mode.

---

# 95. CMS

CMS может использовать ту же UI-систему:

```text
shadcn/ui + Base UI + Tailwind
```

Но пользовательская часть и admin UI могут иметь разные layouts.

Нельзя создавать второй несовместимый UI framework специально для CMS без причины.

---

# 96. Media processing

FFmpeg pipeline должен быть отдельной background-задачей/worker-процессом, а не блокировать HTTP request.

Ориентир:

```text
Upload
  ↓
Job
  ↓
Queue
  ↓
Media Worker
  ↓
FFmpeg
  ↓
S3
```

Очередь может использовать Redis-based solution, когда этап media pipeline будет реализовываться.

---

# 97. Большие задачи

Для больших задач сначала определить:

- цель;
- scope;
- affected modules;
- migrations;
- API changes;
- UI changes;
- compatibility;
- tests;
- acceptance criteria.

После этого реализовывать.

---

# 98. Этапность проекта

Ориентировочная последовательность:

```text
M0 — ТЗ и архитектура

M1 — Технический фундамент

M2 — Предметная модель, пользователи, роли,
     авторизация, локализация

M3 — Каталог + базовая CMS

M4 — 360° panorama

M5 — 360° video + HLS

M6 — Hotspots + переходы

M7 — Визуальный Tour Builder

M8 — Audio + subtitles + quizzes

M9 — Личный кабинет + progress + favorites

M10 — Products + Payments + Entitlements

M11 — Recommendations

M12 — PWA

M13 — WebXR

M14 — Capacitor Android/iOS

M15 — Analytics + Monitoring

M16 — Пилотные туры

M17 — Production Release
```

Этапы могут уточняться, но AI-агент не должен произвольно перескакивать вперёд.

---

# 99. Текущий UI принцип

Весь пользовательский интерфейс строится на:

```text
shadcn/ui
+
Base UI
+
Tailwind CSS
```

Это долгосрочное архитектурное решение проекта.

---

# 100. Ключевой принцип проекта

Проект должен развиваться как **масштабируемая платформа**, а не как набор вручную созданных виртуальных страниц.

Главная долгосрочная архитектура:

```text
                   USERS
                     │
        ┌────────────┼────────────┐
        │            │            │
      Web          Android       iOS
       │          Capacitor    Capacitor
       └────────────┼────────────┘
                    │
             Next.js / React
                    │
       shadcn/ui + Base UI
             Tailwind CSS
                    │
             Three.js / WebXR
                    │
                 REST API
                    │
                  NestJS
                    │
       ┌────────────┼────────────┐
       │            │            │
 PostgreSQL       Redis       S3 Storage
                                  │
                                  ▼
                              CDN / HLS
```

Административная часть:

```text
CMS / Tour Builder
        │
        ▼
      NestJS
        │
 ┌──────┼─────────┐
 │      │         │
Tours Scenes   Media
 │      │         │
 └──────┴────┬────┘
             │
             ▼
        Media Worker
             │
           FFmpeg
             │
             ▼
             S3
```

---

# 101. Приоритеты при принятии решений

Если существует несколько вариантов реализации, выбирать в следующем порядке:

1. архитектурная простота;
2. поддерживаемость;
3. переиспользование;
4. доступность интерфейса;
5. responsive/mobile compatibility;
6. performance;
7. отсутствие vendor lock-in;
8. безопасность;
9. testability;
10. соответствие текущему stack.

Не усложнять систему только ради использования «модной» технологии.

---

# 102. Что считается плохим решением

Избегать:

- второго frontend framework;
- второго UI framework;
- отдельного mobile UI;
- бизнес-логики в UI primitives;
- hardcoded localization;
- direct DB access from frontend;
- тяжёлого media через NestJS;
- огромного 8K MP4 без adaptive streaming;
- hardcoded entitlement по payment provider;
- ML без данных;
- преждевременного Kubernetes;
- пустых abstraction layers;
- `any` everywhere;
- глобального `"use client"`;
- desktop-first UI с поздней мобильной адаптацией;
- Radix/Base UI mix без причины;
- ручного написания доступного Dialog/Sheet при наличии Base UI.

---

# 103. Что считается хорошим решением

Предпочитать:

- один frontend;
- один backend;
- data-driven tours;
- shared UI;
- responsive-first;
- TypeScript strict;
- accessible primitives;
- API contracts;
- S3 direct upload;
- async media jobs;
- HLS;
- entitlement layer;
- localization from the start;
- lazy loading;
- observability;
- clear docs;
- incremental architecture.

---

# 104. Финальное правило для AI-агента

Перед завершением любой задачи ответить себе на вопросы:

```text
Работает ли это на mobile?

Работает ли это на desktop?

Не ломает ли это будущий Capacitor?

Не ломает ли это PWA?

Не ломает ли это локализацию?

Не ломает ли это RTL?

Не тащит ли это Three.js туда, где он не нужен?

Не дублирует ли это shadcn/Base UI?

Не привязали ли мы business logic к конкретному UI?

Не привязали ли мы backend к конкретному client?

Есть ли validation?

Есть ли error handling?

Есть ли документация, если архитектура изменилась?

Проходят ли lint/typecheck/tests/build?
```

Если ответ на существенный вопрос отрицательный, задача не должна считаться полностью завершённой без явного объяснения причины.

---

# 105. Definition of Done для всего проекта

Проект в конечной форме должен представлять собой единую масштабируемую платформу, где:

- пользователь может открыть сервис в браузере;
- интерфейс адаптируется под ПК, планшет и телефон;
- сервис устанавливается как PWA;
- тот же frontend может быть опубликован через Capacitor для Android/iOS;
- виртуальные туры создаются через CMS;
- 360° media доставляется эффективно;
- WebXR включается на поддерживаемых устройствах;
- весь пользовательский контент локализуем;
- доступ к платным турам определяется entitlement layer;
- инфраструктура наблюдаема;
- новые регионы и туры можно добавлять без переписывания приложения.

Это является основным архитектурным ориентиром всех будущих изменений.
