## Overview
The SmartExam Web Application uses a modern, dual-stack build system leveraging **Composer** for PHP dependency management and **Vite** (via npm) for frontend asset compilation. Continuous Integration is handled by **GitHub Actions**, enforcing code quality and running tests across multiple PHP versions.

## Key Tools & Frameworks
- **Backend**: Laravel 13.x (PHP 8.3+)
- **Frontend**: React 19.x with TypeScript, compiled via Vite 8.x
- **Styling**: Tailwind CSS 4.x
- **Testing**: PHPUnit 12.x
- **Code Quality**: Laravel Pint (PHP), ESLint/Prettier (JS/TS), PHPStan (Static Analysis)
- **CI/CD**: GitHub Actions

## Build & Development Scripts
### Composer Scripts (`composer.json`)
- `composer setup`: Installs dependencies, generates `.env`, runs migrations, installs npm packages, and builds assets.
- `composer dev`: Starts the local development environment using `concurrently` to run the PHP server, queue listener, log tailer, and Vite dev server simultaneously.
- `composer test`: Runs configuration clearing, linting, type checking, and PHPUnit tests.
- `composer ci:check`: A comprehensive check for CI environments, including frontend linting, formatting, and type checks.

### NPM Scripts (`package.json`)
- `npm run build`: Compiles production-ready assets using Vite.
- `npm run dev`: Starts the Vite development server with HMR.
- `npm run lint` / `npm run format`: Enforces code style for TypeScript and React components.

## Continuous Integration (GitHub Actions)
The project utilizes two primary workflows located in `.github/workflows/`:

1. **`tests.yml`**: 
   - Triggers on push/PR to `main`, `develop`, and `master`.
   - Runs a matrix strategy across PHP versions **8.3, 8.4, and 8.5**.
   - Steps include: Checkout -> Setup PHP/Node -> Install Dependencies -> Generate App Key -> Build Assets -> Run Type Analysis (PHPStan) -> Run PHPUnit.

2. **`lint.yml`**:
   - Ensures code style consistency for both backend (Pint) and frontend (Prettier/ESLint).
   - Currently configured to check styles but has commented-out steps for auto-committing fixes.

## Architecture & Conventions
- **Asset Pipeline**: Uses `laravel-vite-plugin` to integrate Vite with Laravel's Blade templating and Inertia.js.
- **Type Safety**: Strict TypeScript checking is enforced via `tsc --noEmit` in the CI pipeline.
- **Database**: Uses SQLite for local development and testing (in-memory for tests), with migrations managed via `artisan migrate`.
- **Environment**: Relies on `.env` files, with `.env.example` serving as the template for new installations.

## Developer Rules
- **Local Development**: Use `composer dev` to start all required services. Do not run `php artisan serve` and `npm run dev` in separate terminals manually unless necessary for debugging.
- **Pre-Commit**: Ensure `composer lint` and `npm run lint` pass before pushing. The CI will fail if code style or type checks are violated.
- **Testing**: All new features must include corresponding Feature or Unit tests in the `tests/` directory. Run `composer test` locally to verify.