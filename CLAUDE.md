# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SmartExam — aplikasi web manajemen ujian digital menggunakan **Laravel 13** + **Inertia.js v3** + **React 19** + **TypeScript** + **Tailwind CSS v4**. Berisi landing page publik, admin panel (section editor live-preview, manajemen appointment), dan sistem autentikasi multi-factor via Laravel Fortify + Passkeys.

## Commands

```bash
# Development (menjalankan semua proses secara concurrent)
composer run dev          # Laravel serve + queue + Vite dev server

# Setup project baru
composer run setup        # Install PHP/JS deps, migrate, build

# Linting & Type Checking
npm run lint              # ESLint fix
npm run lint:check        # ESLint check
npm run format            # Prettier write resources/
npm run types:check       # tsc --noEmit
composer run lint         # Laravel Pint
composer run lint:check   # Laravel Pint test

# Testing
composer run test         # Pint + PHPStan + PHPUnit

# Static Analysis
composer run types:check  # PHPStan
```

## Architecture

### Stack
- **Backend**: Laravel 13, PHP 8.3+, SQLite (default)
- **Frontend**: React 19, Inertia.js 3, TypeScript, Tailwind CSS 4
- **Auth**: Laravel Fortify (login/register/2FA/passkeys/reset password)
- **UI Library**: Radix UI primitives via `@radix-ui/react-*`
- **Icons**: Lucide React
- **Realtime**: Laravel Reverb + Laravel Echo (Pusher) untuk notifikasi appointment realtime
- **Build**: Vite 8 + `@vitejs/plugin-react` + babel-plugin-react-compiler

### Directory Structure

```
app/
├── Actions/Fortify/         # CreateNewUser, ResetUserPassword
├── Console/Commands/        # InstallFeaturesCommand (artisan)
├── Concerns/                # PasswordValidationRules, ProfileValidationRules
├── Events/                  # AppointmentCreated (broadcast ke channel 'appointments')
├── Http/
│   ├── Controllers/
│   │   ├── Admin/           # AdminDashboardController, AppointmentController, SectionController
│   │   ├── Settings/        # ProfileController, SecurityController
│   │   ├── AppointmentController.php  # Public store()
│   │   └── LandingController.php     # Public index() + contact()
│   ├── Middleware/           # EnsureUserIsAdmin, HandleInertiaRequests, HandleAppearance
│   └── Requests/            # StoreAppointmentRequest, UpdateLandingSectionRequest, Settings/*
├── Models/                  # User, LandingContent, Appointment
├── Providers/               # AppServiceProvider, FortifyServiceProvider
├── Repositories/            # LandingContentRepository, AppointmentRepository
└── Services/                # LandingContentService, AppointmentService

resources/js/
├── actions/                 # Wayfinder-generated route helpers
├── components/
│   ├── admin/
│   │   ├── AdminLayout.tsx       # Layout admin panel (sidebar, top bar)
│   │   └── section-fields/       # Field editors untuk SectionEditor
│   │       ├── TextField.tsx     # Input/textarea
│   │       ├── ImageField.tsx    # URL + upload
│   │       ├── JsonField.tsx     # List item (drag-reorder, add/edit/delete)
│   │       └── JsonItemModal.tsx # Modal untuk edit JSON item (icon picker, boolean, text)
│   ├── landing/              # Landing page sections (hero, about, features, dll.)
│   ├── ui/                   # Radix UI primitives + shadcn-style components
│   ├── cursor-glow.tsx
│   ├── dynamic-lucide-icon.tsx
│   └── lucide-icon-picker.tsx
├── hooks/                    # use-clipboard, use-appearance, use-scroll-reveal, dll.
├── layouts/                  # app-layout, auth-layout, settings/layout
├── lib/utils.ts              # Tailwind merge + clsx utility
├── pages/
│   ├── auth/                 # Login, register, forgot/reset password, 2FA, verify email
│   ├── settings/             # Profile, security, appearance
│   ├── Admin/                # Dashboard, Appointments, SectionEditor, Settings
│   ├── dashboard.tsx         # User dashboard
│   └── welcome.tsx           # Landing page (menerima shared `content` + `sections`)
├── types/                    # Global TypeScript type definitions
└── echo.ts                   # Laravel Echo / Reverb setup

routes/
├── web.php                   # Landing (/) + admin group (/admin/*)
├── settings.php              # Profile, security, appearance settings
├── console.php
└── channels.php
```

### Data Flow Pattern

**Repository → Service → Controller pattern** digunakan secara konsisten:

```
Controller (validasi request)
  → Service (business logic)
    → Repository (query Eloquent)
      → Model
```

**Section Editor flow:**
```
SectionController::edit()
  → LandingContentService::getFieldsForEdit()
    → LandingContentRepository::getFieldsBySection()
      → LandingContent::where('section', $section)

SectionEditor.tsx (React)
  → Edit fields → preview via postMessage ke iframe landing page
  → Save → router.post() → SectionController::update()
```

**Appointment flow:**
```
Landing page user submit form
  → AppointmentController::store()
    → AppointmentService::create()
      → AppointmentRepository::create()
    → Event::dispatch(AppointmentCreated) → broadcast via Reverb

AdminLayout listen Echo channel:
  → window.Echo.channel('appointments').listen('.appointment.created')
  → toast + update badge count
```

### Shared Inertia Data (via HandleInertiaRequests)
- `auth.user` — user login
- `flash.success` / `flash.error` — flash messages
- `adminSections` — array of section definitions (key, label, icon, desc, order, is_visible)
- `appointmentCount` — jumlah appointment unread

### Admin Panel Routing
Prefix `/admin` — middleware `auth` + `admin`. Landing page sections editor:
- `GET /admin/sections/{section}` → SectionEditor.tsx (fields + section name)
- `POST /admin/sections/{section}` → update section fields
- `POST /admin/sections-reorder` → reorder sections
- `POST /admin/sections-toggle-visibility` → hide/show section
- `POST /admin/upload-image` → upload image, return URL

### Landing Page Preview System
SectionEditor memiliki panel live preview kanan yang me-render landing section dalam iframe. Komunikasi via `postMessage`:
- `smartexam-preview` → kirim data content ke iframe
- `smartexam-focus-field` → highlight field di preview
- `smartexam-blur-field` → remove highlight

Welcome page menerima query param `?preview_section={section}` untuk render section tertentu saja.
