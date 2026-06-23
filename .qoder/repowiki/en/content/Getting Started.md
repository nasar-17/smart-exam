# Getting Started

<cite>
**Referenced Files in This Document**
- [composer.json](file://composer.json)
- [package.json](file://package.json)
- [vite.config.ts](file://vite.config.ts)
- [config/app.php](file://config/app.php)
- [config/database.php](file://config/database.php)
- [config/fortify.php](file://config/fortify.php)
- [bootstrap/app.php](file://bootstrap/app.php)
- [routes/web.php](file://routes/web.php)
- [app/Console/Commands/InstallFeaturesCommand.php](file://app/Console/Commands/InstallFeaturesCommand.php)
- [database/migrations/0001_01_01_000000_create_users_table.php](file://database/migrations/0001_01_01_000000_create_users_table.php)
- [database/seeders/DatabaseSeeder.php](file://database/seeders/DatabaseSeeder.php)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Development Setup](#development-setup)
5. [First-Time Setup](#first-time-setup)
6. [Basic Configuration](#basic-configuration)
7. [Verification](#verification)
8. [Troubleshooting](#troubleshooting)
9. [Conclusion](#conclusion)

## Introduction
This guide helps you install and run the SmartExam web application locally. It covers prerequisites, installation steps, environment configuration, database setup, development server startup, first-time setup, and verification procedures. The project uses Laravel 13 with React via Inertia, Vite for asset bundling, and supports SQLite by default with optional MySQL/MariaDB/PostgreSQL/SQL Server connections.

## Prerequisites
- PHP runtime
  - Version requirement: PHP ^8.3
  - Required extensions: pdo_sqlite (and pdo_mysql if using MySQL/MariaDB)
- Node.js and package manager
  - Node.js LTS recommended
  - Either npm or pnpm can be used; the project includes a pnpm workspace configuration
- Database
  - SQLite is enabled by default and requires no additional setup
  - Optional: MySQL/MariaDB, PostgreSQL, or SQL Server with appropriate credentials
- Operating system
  - Windows, macOS, or Linux

**Section sources**
- [composer.json:11-19](file://composer.json#L11-L19)
- [config/database.php:33-115](file://config/database.php#L33-L115)

## Installation
Follow these steps to prepare your environment and install dependencies:

1. Clone the repository and navigate to the project directory.
2. Install PHP dependencies using Composer.
3. Copy the environment example to .env if it does not exist.
4. Generate the application key.
5. Run database migrations.
6. Install JavaScript dependencies using npm or pnpm.
7. Build frontend assets.

Key Composer scripts that automate these tasks:
- setup: installs Composer dependencies, prepares .env, generates APP_KEY, runs migrations, installs npm dependencies, and builds assets.
- post-create-project-cmd: ensures a local SQLite database exists and performs initial migrations during project scaffolding.

Notes:
- The project uses a SQLite database by default. If you prefer MySQL/MariaDB/PostgreSQL/SQL Server, configure the database connection in the environment file and ensure the corresponding PHP extensions are enabled.

**Section sources**
- [composer.json:43-96](file://composer.json#L43-L96)
- [config/database.php:20](file://config/database.php#L20)
- [config/database.php:35-45](file://config/database.php#L35-L45)

## Development Setup
Two primary approaches are supported for local development:

- Laravel Sail (Docker-based)
  - Use Sail to run the application and database containers.
  - Recommended for consistent environments across team members.
- Local environment
  - Use your installed PHP and Node.js to run the application directly.

Environment configuration:
- Application name, environment, debug mode, URL, timezone, locale, and encryption key are managed via configuration files and environment variables.
- Default database connection is SQLite; switch to MySQL/MariaDB/PostgreSQL/SQL Server by setting DB_CONNECTION and related variables.

Vite integration:
- Vite is configured for React and Inertia with Tailwind CSS and Laravel-specific plugins.
- Development scripts include building assets and running the dev server.

**Section sources**
- [config/app.php:16-100](file://config/app.php#L16-L100)
- [config/database.php:20](file://config/database.php#L20)
- [vite.config.ts:1-32](file://vite.config.ts#L1-L32)
- [package.json:5-14](file://package.json#L5-L14)

## First-Time Setup
Complete these steps after installation to initialize the application:

1. Create an initial user account
   - Use the built-in seeder to create a default test user.
   - Alternatively, register via the application’s registration flow if enabled.

2. Configure authentication features
   - Fortify controls authentication features such as registration, password resets, email verification, two-factor authentication, and passkeys.
   - Adjust feature toggles in the Fortify configuration according to your needs.

3. Verify routes and middleware
   - The application bootstraps routing and middleware for web requests, including Inertia and appearance handling.
   - Routes include a landing page, contact form, and a protected dashboard route.

4. Asset compilation
   - Build frontend assets using Vite to ensure UI components render correctly.

**Section sources**
- [database/seeders/DatabaseSeeder.php:16-24](file://database/seeders/DatabaseSeeder.php#L16-L24)
- [config/fortify.php:169-189](file://config/fortify.php#L169-L189)
- [bootstrap/app.php:11-30](file://bootstrap/app.php#L11-L30)
- [routes/web.php:1-29](file://routes/web.php#L1-L29)
- [vite.config.ts:10-30](file://vite.config.ts#L10-L30)

## Basic Configuration
Configure the application by editing environment variables and settings:

- Application settings
  - APP_NAME, APP_ENV, APP_DEBUG, APP_URL, timezone, locales, and encryption key.
- Database settings
  - DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, charset/collation, and SSL options for MySQL/MariaDB.
  - For PostgreSQL, configure DB_CONNECTION=pgsql and set host/port/database/username/password.
  - For SQL Server, configure DB_CONNECTION=sqlsrv.
  - For SQLite, ensure the database path resolves correctly (default is database/database.sqlite).
- Redis settings (optional)
  - REDIS_CLIENT, REDIS_CLUSTER, REDIS_PREFIX, REDIS_URL, host, port, database indices, and retry/backoff options.
- Fortify features
  - Toggle registration, password reset, email verification, two-factor authentication, and passkeys.

**Section sources**
- [config/app.php:16-126](file://config/app.php#L16-L126)
- [config/database.php:20-182](file://config/database.php#L20-L182)
- [config/fortify.php:18-191](file://config/fortify.php#L18-L191)

## Verification
After completing installation and configuration, verify the setup:

1. Confirm the database connection
   - Ensure the chosen database is reachable and migrations have been applied.
   - The users table schema is defined in the initial migration.

2. Access the application
   - Visit the configured APP_URL in your browser.
   - The home route serves a landing page; authenticated users can access the dashboard.

3. Test authentication
   - Log in with the seeded user credentials (if used) or register a new user.
   - Verify password reset and email verification flows if enabled.

4. Build and refresh assets
   - Confirm Vite builds successfully and assets are served without errors.

5. Run tests
   - Execute unit and feature tests to validate core functionality.

**Section sources**
- [database/migrations/0001_01_01_000000_create_users_table.php:7-48](file://database/migrations/0001_01_01_000000_create_users_table.php#L7-L48)
- [routes/web.php:5-26](file://routes/web.php#L5-L26)
- [config/fortify.php:169-189](file://config/fortify.php#L169-L189)

## Troubleshooting
Common issues and resolutions:

- PHP version mismatch
  - Ensure PHP ^8.3 is installed. Lower versions will fail Composer or runtime checks.
- Missing PHP extensions
  - For SQLite: enable pdo_sqlite.
  - For MySQL/MariaDB: enable pdo_mysql.
- Database connectivity
  - Verify DB_CONNECTION and credentials. For SQLite, ensure the database file path exists and is writable.
  - For MySQL/MariaDB, confirm host, port, and SSL CA settings if applicable.
- Port conflicts
  - Change APP_URL or development server ports if conflicts occur.
- Asset build failures
  - Reinstall Node dependencies and rebuild assets using npm run build or equivalent.
- Permission errors
  - Ensure write permissions for storage/, bootstrap/cache/, and the database file (SQLite).
- Authentication not working
  - Confirm APP_URL matches the origin used by passkeys and that email verification is configured if enabled.

**Section sources**
- [composer.json:11-19](file://composer.json#L11-L19)
- [config/database.php:35-115](file://config/database.php#L35-L115)
- [config/fortify.php:150-155](file://config/fortify.php#L150-L155)

## Conclusion
You now have the SmartExam application installed and configured for local development. Use the provided scripts and configurations to streamline setup, customize authentication and database options, and verify functionality. For team collaboration, consider Docker-based development via Laravel Sail to maintain consistent environments.