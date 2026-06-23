## Overview

This application uses Laravel's standard configuration system, which loads settings from PHP files in the `config/` directory. Each config file returns an associative array of key-value pairs. Values are sourced from environment variables (via `.env` file) using Laravel's `env()` helper, with sensible defaults provided as fallbacks.

## Core Architecture

### Configuration Loading Flow

1. **Bootstrap entry point** (`bootstrap/app.php`): Uses `Application::configure()` to initialize the application with base path, routing, middleware, and exception handling.
2. **Service providers** (`bootstrap/providers.php`): Registers `AppServiceProvider` and `FortifyServiceProvider`, which may load additional configuration during boot.
3. **Config files** (`config/*.php`): Each file is auto-loaded by Laravel's configuration repository. Values reference `env()` calls that read from the `.env` file.
4. **Environment file** (`.env`): Contains runtime-specific values (database credentials, API keys, feature flags). The `.env.example` file serves as a template for new installations.

### Key Configuration Files

| File | Purpose |
|------|---------|
| `config/app.php` | Application name, environment, debug mode, URL, locale, encryption key, maintenance mode |
| `config/database.php` | Database connections (SQLite default, MySQL, PostgreSQL, SQL Server), Redis cache settings |
| `config/fortify.php` | Authentication features (registration, email verification, 2FA, passkeys), rate limiting, password reset |
| `config/inertia.php` | Inertia.js SSR settings, page component paths, testing configuration |
| `config/services.php` | Third-party service credentials (Postmark, Resend, AWS SES, Slack) |
| `config/auth.php` | Authentication guards and password brokers |
| `config/cache.php` | Cache store configuration |
| `config/session.php` | Session driver, lifetime, encryption settings |
| `config/filesystems.php` | File storage disks (local, public, S3) |
| `config/logging.php` | Log channels and levels |
| `config/mail.php` | Mailer configuration |
| `config/queue.php` | Queue connection settings |

### Environment Variable Pattern

All config files follow the convention:
```php
'key' => env('ENV_VAR_NAME', 'default_value'),
```

This provides a two-layer configuration system:
- **Layer 1**: `.env` file for environment-specific secrets and overrides
- **Layer 2**: Config file defaults for safe fallback values

The `.env.example` file documents all required environment variables and their expected formats.

## Feature Toggling via Chisel

The application includes a **Chisel-based feature selection system** (`chisel.php`) that allows developers to enable/disable authentication features at install time:

- Email verification
- User registration
- Two-factor authentication (2FA)
- Passkeys (WebAuthn)
- Password confirmation

The `chisel.php` script modifies `config/fortify.php` and other files by adding/removing sections marked with special comments like `/* @chisel-2fa */` and `/* @end-chisel-2fa */`. After feature selection, the chisel files themselves are deleted, leaving a clean codebase with only the selected features.

## Security Considerations

- **Encryption key**: `APP_KEY` in `.env` is required for encrypting cookies and sessions. Must be a random 32-character string.
- **Cookie encryption**: `bootstrap/app.php` configures cookie encryption with exceptions for `appearance` and `sidebar_state` cookies (used for UI state).
- **Secrets management**: All sensitive credentials (database passwords, API keys, Redis passwords) are loaded exclusively from environment variables — never hardcoded in config files.
- **Passkey configuration**: The `passkeys.user_handle_secret` in `config/fortify.php` falls back to `APP_KEY` if `PASSKEYS_USER_HANDLE_SECRET` is not set.

## Developer Conventions

1. **Never commit `.env`**: The `.env` file is gitignored. Use `.env.example` as the template for team members.
2. **Use `env()` only in config files**: Access configuration values via `config('app.name')` in application code, not `env('APP_NAME')` directly. This ensures config caching works correctly.
3. **Add new config files to `config/`**: Follow the existing pattern — return an array with documented sections using Laravel-style comment blocks.
4. **Provide sensible defaults**: Every `env()` call should include a fallback value to prevent runtime errors when the variable is missing.
5. **Feature toggles use Chisel markers**: When adding optional features, wrap configurable sections with `/* @chisel-feature-name */` markers so they can be selectively removed during installation.
6. **Third-party credentials go in `config/services.php`**: Keep external API keys and tokens centralized in this file rather than scattering them across multiple configs.
