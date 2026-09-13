# Архитектура

```text
Next.js Web / PWA / Capacitor shell
              ↓ REST /api/v1
            NestJS
       ↙        ↓        ↘
PostgreSQL    Redis    S3-compatible storage
```

UI: `project component → shadcn component → Base UI primitive → Tailwind + CSS tokens`. `packages/contracts` хранит API contracts, `packages/types` — общие не-API типы; database models и UI view models не смешиваются.

Three.js/WebXR player будет отдельной dynamically imported feature, поэтому обычные страницы не грузят 3D runtime. PWA manifest/service worker, Capacitor, FFmpeg/media workers и CDN являются следующими этапами; нынешняя оболочка уже responsive, touch- и safe-area-aware.
