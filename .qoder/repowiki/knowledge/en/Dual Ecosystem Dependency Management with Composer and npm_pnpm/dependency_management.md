## Overview

This Laravel + React application uses a dual dependency management system: **Composer** for PHP backend dependencies and **npm/pnpm** for JavaScript/TypeScript frontend dependencies. Both ecosystems employ lockfiles for deterministic builds and automated update tooling via Dependabot.

## PHP Dependencies (Composer)

### Package Manager
- **Tool**: Composer (`composer.json`, `composer.lock`)
- **PHP Version Constraint**: `^8.3`
- **Strategy**: Stable releases preferred (`"prefer-stable": true`, `"minimum-stability": "stable"`)

### Key Production Dependencies
- `laravel/framework` (^13.7) — Core framework
- `inertiajs/inertia-laravel` (^3.0) — Server-side Inertia adapter
- `laravel/fortify` (^1.37.2) — Authentication scaffolding
- `laravel/chisel` (^0.1.0) — Laravel feature installer
- `laravel/wayfinder` (^0.1.14) — Route/type generation

### Development Dependencies
- Testing: `phpunit/phpunit` (^12.5.23), `mockery/mockery` (^1.6)
- Static Analysis: `larastan/larastan` (^3.9)
- Code Style: `laravel/pint` (^1.27)
- Local Dev: `laravel/sail` (^1.53), `laravel/pail` (^1.2.5)

### Autoloading Convention
PSR-4 autoloading maps:
- `App\` → `app/`
- `Database\Factories\` → `database/factories/`
- `Database\Seeders\` → `database/seeders/`
- `Tests\` → `tests/` (dev only)

### Plugin Allowlist
Only two Composer plugins are permitted:
- `pestphp/pest-plugin`
- `php-http/discovery`

This is a security measure to prevent arbitrary plugin execution.

### Post-Install Hooks
- `post-autoload-dump`: Discovers Laravel packages automatically
- `post-update-cmd`: Runs feature installation (`install:features`) and publishes Laravel assets
- `post-create-project-cmd`: Generates app key, creates SQLite database, runs migrations

## JavaScript/TypeScript Dependencies (npm/pnpm)

### Package Manager
- **Primary Tool**: npm (`package.json`, `package-lock.json`)
- **Workspace Support**: pnpm workspace configured (`pnpm-workspace.yaml`) with single root package (`.`)
- **Security Setting**: `.npmrc` sets `ignore-scripts=true` to prevent arbitrary post-install script execution

### Key Production Dependencies
- **Framework Integration**: `@inertiajs/react` (^3.0.0), `@inertiajs/vite` (^3.0.0)
- **UI Components**: Radix UI primitives (avatar, checkbox, dialog, dropdown-menu, etc.)
- **Styling**: `tailwindcss` (^4.0.0), `@tailwindcss/vite` (^4.1.11)
- **Build Tooling**: `vite` (^8.0.0), `@vitejs/plugin-react` (^5.2.0)
- **Laravel Integration**: `laravel-vite-plugin` (^3.0.0), `@laravel/passkeys` (^0.2.0), `@laravel/vite-plugin-wayfinder` (^0.1.3)
- **Utilities**: `lucide-react` (^0.475.0), `class-variance-authority`, `clsx`, `tailwind-merge`

### Development Dependencies
- Linting: `eslint` (^9.17.0) with TypeScript, React, and import plugins
- Formatting: `prettier` (^3.4.2) with Tailwind plugin
- Type Checking: `typescript` (^5.7.2)

### Optional Platform-Specific Dependencies
Native binary packages for Linux and Windows are declared as optional dependencies for performance optimization:
- Rollup native bindings
- Tailwind Oxide native bindings
- LightningCSS native bindings

### Component Library Configuration
`components.json` configures shadcn/ui with:
- Style: "new-york"
- TypeScript enabled
- Path aliases: `@/components`, `@/lib`, `@/hooks`
- Icon library: Lucide

### pnpm Workspace Hoisting
`pnpm-workspace.yaml` hoists `@inertiajs/core` to the root level, ensuring a single shared instance across any potential workspace packages.

## Automated Dependency Updates

### Dependabot Configuration
`.github/dependabot.yml` configures automated updates for:
- **Ecosystem**: GitHub Actions workflows only
- **Schedule**: Weekly checks
- **Cooldown**: 5 days between PRs
- **Grouping**: All GitHub Actions updates grouped into a single PR

**Notable gap**: Dependabot does not currently monitor Composer or npm dependencies. Only GitHub Actions are covered. Teams should consider adding `composer` and `npm` ecosystem entries to ensure all dependencies receive automated security and version updates.

## Build and Development Scripts

### Composer Scripts
- `setup`: Full project initialization (install deps, create .env, generate key, migrate, install JS deps, build)
- `dev`: Concurrently runs PHP server, queue worker, log tail, and Vite dev server
- `test`: Runs full CI check suite (lint, types, PHPUnit)
- `ci:check`: Frontend-only checks (lint, format, types, tests)

### npm Scripts
- `build` / `build:ssr`: Vite production builds (client-only and SSR)
- `dev`: Vite development server
- `lint` / `lint:check`: ESLint with auto-fix or check mode
- `format` / `format:check`: Prettier formatting
- `types:check`: TypeScript type checking without emission

## Vendor Strategy

- **PHP**: Dependencies installed to `vendor/` directory (standard Composer behavior). The `vendor/` directory is gitignored.
- **JavaScript**: Dependencies installed to `node_modules/` (standard npm/pnpm behavior). The `node_modules/` directory is gitignored.
- No vendoring of third-party code into the repository itself.
- Lockfiles (`composer.lock`, `package-lock.json`) are committed to ensure reproducible builds across environments.

## Developer Conventions

1. **Always commit lockfiles**: Both `composer.lock` and `package-lock.json` must be committed to maintain deterministic builds.
2. **Use provided scripts**: Run `composer run setup` for fresh installs, `composer run dev` for local development.
3. **Security posture**: npm scripts are disabled via `.npmrc`; only allowlisted Composer plugins may execute.
4. **Version constraints**: Caret ranges (`^`) are used throughout, allowing minor/patch updates while preventing breaking changes.
5. **Platform binaries**: Optional native dependencies improve build performance but are not required for functionality.