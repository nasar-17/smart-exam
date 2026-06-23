## System Overview

The SmartExam web application uses **Tailwind CSS v4** as its primary CSS framework, paired with the **shadcn/ui** component library (New York style variant) for pre-built React UI components. The styling architecture is built on CSS custom properties (design tokens) using the **OKLCH color space**, enabling consistent theming across light and dark modes.

### Core Technologies

- **CSS Framework**: Tailwind CSS v4 (`tailwindcss` package)
- **Component Library**: shadcn/ui (configured via `components.json`)
- **Animation Library**: `tw-animate-css` for utility-first animations
- **Icon Library**: Lucide React (`lucide-react`)
- **Utility Functions**: `clsx`, `tailwind-merge`, `class-variance-authority` (CVA)
- **Build Tool**: Vite with `@tailwindcss/vite` plugin

## Key Files and Packages

| File | Purpose |
|------|---------|
| `resources/css/app.css` | Central stylesheet: Tailwind imports, theme configuration, design tokens (OKLCH), landing page custom styles |
| `components.json` | shadcn/ui configuration: style variant, aliases, icon library |
| `package.json` | Dependency declarations for all styling packages |
| `resources/js/lib/utils.ts` | `cn()` utility combining clsx + tailwind-merge for class composition |
| `resources/js/components/ui/*` | ~25 shadcn/ui primitive components (button, card, input, dialog, etc.) |
| `resources/js/hooks/use-appearance.tsx` | Theme management hook (light/dark/system) with localStorage + cookie persistence |
| `resources/js/components/appearance-tabs.tsx` | UI control for toggling appearance mode |

## Architecture and Conventions

### Design Token System (OKLCH)

All colors are defined as CSS custom properties in `app.css` using the OKLCH color space. This provides perceptually uniform color transitions between light and dark themes. The token structure follows shadcn/ui conventions:

- **Semantic tokens**: `--background`, `--foreground`, `--card`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`
- **Chart tokens**: `--chart-1` through `--chart-5` for data visualization
- **Sidebar tokens**: Dedicated sidebar color palette (`--sidebar`, `--sidebar-primary`, etc.)
- **Radius tokens**: `--radius` base value with derived `--radius-lg`, `--radius-md`, `--radius-sm`

Light and dark theme values are scoped under `:root` and `.dark` selectors respectively. The `@custom-variant dark (&:is(.dark *))` directive enables Tailwind's `dark:` modifier.

### Font Stack

Two font families are configured:
- **Primary (sans)**: Satoshi (Fontshare) with fallbacks to Instrument Sans, system-ui
- **Display (Sora)**: Google Fonts Sora for headings/hero sections

Fonts are declared in the `@theme` block as `--font-sans` and `--font-sora`.

### Component Styling Pattern

UI components use the **CVA (class-variance-authority)** pattern for variant-based styling:

```tsx
const buttonVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", destructive: "...", outline: "..." },
    size: { default: "...", sm: "...", lg: "...", icon: "..." }
  },
  defaultVariants: { variant: "default", size: "default" }
})
```

Components compose classes via the `cn()` utility which merges Tailwind classes intelligently (avoiding conflicts via `tailwind-merge`) and supports conditional classes (via `clsx`).

### Theme Switching Mechanism

The `useAppearance` hook manages three modes: `light`, `dark`, `system`. It:
1. Persists user preference to `localStorage` and a cookie (for SSR)
2. Toggles the `.dark` class on `<html>` element
3. Sets `color-scheme` CSS property for native browser theming
4. Listens to system preference changes via `matchMedia`

The `HandleAppearance` middleware (Laravel) reads the cookie server-side for initial render consistency.

### Landing Page Custom Styles

The landing page (Blade templates in `resources/views/`) uses custom CSS classes defined in `app.css` beyond the Tailwind/shadcn system:
- Scroll-aware navbar (`.navbar-landing.scrolled`)
- Hero background with overlay gradients (`.hero-bg-image`, `.hero-bg-overlay`)
- Fade-up animations (`.fade-up-1` through `.fade-up-4`)
- Feature/pricing/testimonial card hover effects
- Gradient text utility (`.gradient-text`)
- Scroll reveal animation (`.reveal.visible`)

These are hand-crafted CSS rules targeting specific landing page elements, separate from the component-driven app UI.

## Rules Developers Should Follow

1. **Use the `cn()` utility** for composing conditional classes — never concatenate class strings manually
2. **Reference design tokens** via Tailwind utilities (e.g., `bg-background`, `text-foreground`, `border-border`) rather than hardcoding colors
3. **Add new UI primitives** via shadcn/cli (`npx shadcn@latest add <component>`) to maintain consistency
4. **Use CVA for variant-based components** when creating new reusable components with multiple visual states
5. **Prefer semantic color tokens** (`--primary`, `--muted`, etc.) over direct OKLCH values in component code
6. **Dark mode support**: Test all new components in both light and dark themes; use `dark:` Tailwind modifiers where needed
7. **Landing page styles**: Keep custom landing page CSS isolated in the designated section of `app.css`; do not mix with component library styles
8. **Icon usage**: Use Lucide icons exclusively (`lucide-react`); avoid other icon libraries
9. **Border radius**: Use the predefined radius scale (`rounded-md`, `rounded-lg`, etc.) mapped to `--radius` token
10. **Focus states**: All interactive elements should include `focus-visible:border-ring focus-visible:ring-ring/50` patterns for accessibility
