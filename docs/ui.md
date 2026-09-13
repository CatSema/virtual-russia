# UI guide

UI mobile-first; компоненты — в `packages/ui` и импортируются как `@virtual-russia/ui/button`. Используйте semantic HTML, touch targets не менее 44px, `focus-visible`, reduced motion и logical direction utilities. Цвета берите из tokens (`bg-primary`), не из случайных hex-значений. CSS variables поддерживают light/dark тему.

Цепочка компонентов: project component → shadcn component → Base UI primitive → Tailwind/tokens. Для нового стандартного компонента сначала используйте shadcn с `primitive: base-ui` и направляйте результат в `packages/ui`; затем добавьте package export и тест. Прямой Base UI допускается только внутри UI package, когда shadcn не предоставляет нужный primitive. Radix не используется и не добавляется «для одного компонента».

Локализуемый текст храните в `apps/web/src/messages`; URL начинаются с locale (`/ru`, `/en`). Не используйте left/right для directional layout: применяйте `start/end`, чтобы добавить RTL-языки без замены UI stack.
