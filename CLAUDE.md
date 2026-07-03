# SmartExam — Dokumentasi Lengkap Project

## Ringkasan

SmartExam adalah aplikasi web manajemen ujian digital dengan **Laravel 13** + **Inertia.js v3** + **React 19** + **TypeScript** + **Tailwind CSS v4**. Mencakup landing page publik, admin panel untuk mengelola konten landing page dan appointment, serta sistem autentikasi multi-factor.

---

## Table of Contents

1. [Arsitektur & Stack](#1-arsitektur--stack)
2. [Database / Models](#2-database--models)
3. [Autentikasi (Fortify + Inertia)](#3-autentikasi)
4. [Landing Page Publik](#4-landing-page-publik)
5. [Admin Panel](#5-admin-panel)
6. [Section Editor & Live Preview](#6-section-editor--live-preview)
7. [Appointment (Booking Demo)](#7-appointment-booking-demo)
8. [Realtime Notifikasi](#8-realtime-notifikasi)
9. [Settings (Profile, Security, Appearance)](#9-settings)
10. [Utilitas & Hooks](#10-utilitas--hooks)
11. [Caching & Performance](#11-caching--performance)
12. [Routes Lengkap](#12-routes-lengkap)

---

## 1. Arsitektur & Stack

### Stack

| Layer | Teknologi |
|-------|-----------|
| Backend | Laravel 13, PHP 8.3+ |
| Database | SQLite (default) |
| Frontend | React 19, Inertia.js 3, TypeScript |
| Styling | Tailwind CSS 4, Radix UI primitives |
| Icons | Lucide React |
| Realtime | Laravel Reverb + Laravel Echo (Pusher) |
| Build | Vite 8 + `@vitejs/plugin-react` + babel-plugin-react-compiler |
| Image Processing | Intervention Image 4 (resize/compress) |

### Pattern Arsitektur

**Repository → Service → Controller** (konsisten):

```
Controller (validasi request via FormRequest)
  → Service (business logic)
    → Repository (query Eloquent)
      → Model
```

### Layout Resolution (Inertia)

File: `resources/js/app.tsx`

| Route Prefix | Layout |
|-------------|--------|
| `welcome` | `null` (tanpa layout) |
| `Admin/*` | `AdminLayout` |
| `auth/*` | `AuthLayout` |
| `settings/*` | `AppLayout` + `SettingsLayout` |
| lainnya | `AppLayout` |

---

## 2. Database / Models

### `users`

| Field | Type | Notes |
|-------|------|-------|
| id | bigint AI | |
| name | string | |
| email | string | unique |
| email_verified_at | timestamp | nullable |
| password | string (hashed) | |
| is_admin | bool | default false |
| two_factor_secret | text | nullable |
| two_factor_recovery_codes | text | nullable |
| two_factor_confirmed_at | timestamp | nullable |
| remember_token | string | nullable |

Model: `app/Models/User.php` — implements `PasskeyUser`, uses `TwoFactorAuthenticatable`.

### `appointments`

| Field | Type | Notes |
|-------|------|-------|
| id | bigint AI | |
| name | string | Nama pemohon demo |
| email | string | |
| whatsapp | string | |
| institution | string | Institusi |
| scheduled_at | datetime | Jadwal demo |
| is_read | bool | Flag untuk admin |
| created_at | timestamp | |
| updated_at | timestamp | |

Model: `app/Models/Appointment.php`

### `landing_content`

| Field | Type | Notes |
|-------|------|-------|
| id | bigint AI | |
| section | string | Contoh: `hero`, `features`, `footer` |
| key | string | Contoh: `title`, `items`, `brand_name` |
| value | text | Nilai field (plain text atau JSON) |
| type | string | `text`, `textarea`, `image`, `json` |
| label | string | Label untuk admin panel |
| order | integer | Urutan field |
| section_order | integer | Urutan section (untuk reorder) |
| is_visible | bool | Visibilitas section |
| created_at | timestamp | |
| updated_at | timestamp | |

Model: `app/Models/LandingContent.php`

---

## 3. Autentikasi

Menggunakan **Laravel Fortify** + Inertia. Semua halaman auth ada di `resources/js/pages/auth/`.

### Fitur

| Fitur | File / Controller | Endpoint |
|-------|------------------|----------|
| Register | `app/Actions/Fortify/CreateNewUser.php` | `POST /register` |
| Login | Fortify bawaan | `POST /login` |
| Logout | Fortify bawaan | `POST /logout` |
| Forgot Password | Fortify bawaan | `POST /forgot-password` |
| Reset Password | `app/Actions/Fortify/ResetUserPassword.php` | `POST /reset-password` |
| Email Verification | Fortify bawaan | `GET /email/verify/{id}/{hash}` |
| 2FA Setup | `Settings/ProfileController::edit()` | Lihat Settings |
| 2FA Confirm | `Settings/SecurityController::edit()` | Lihat Settings |
| Passkeys | Fortify PasskeyAuthenticatable | Lihat Settings |

### Login Page

File: `resources/js/pages/auth/login.tsx`
- Form dengan username/password
- Link ke register, forgot password
- Styling neumorphism shadow

### Register Page

File: `resources/js/pages/auth/register.tsx`
- Validasi: name, email, password, password_confirmation
- Minimal password: 8 karakter (dev) / 12 karakter mixed-case (production)

### Forgot Password

File: `resources/js/pages/auth/forgot-password.tsx`
- Input email → kirim link reset

### Reset Password

File: `resources/js/pages/auth/reset-password.tsx`
- Input email, password, password_confirmation + token dari URL

### Verify Email

File: `resources/js/pages/auth/verify-email.tsx`
- Pesan "cek email" + tombol resend verification

### Confirm Password

File: `resources/js/pages/auth/confirm-password.tsx`
- Input password untuk akses area sensitif

### Two Factor Challenge

File: `resources/js/pages/auth/two-factor-challenge.tsx`
- Input kode 2FA atau recovery code
- Menggunakan komponen `InputOtp` untuk input kode

### Middleware

| Middleware | File | Fungsi |
|-----------|------|--------|
| `EnsureUserIsAdmin` | `app/Http/Middleware/EnsureUserIsAdmin.php` | Cek `auth()->user()->is_admin` |
| `HandleInertiaRequests` | `app/Http/Middleware/HandleInertiaRequests.php` | Share global props ke Inertia |
| `HandleAppearance` | `app/Http/Middleware/HandleAppearance.php` | Set theme (light/dark/system) |

### Provider Fortify

File: `app/Providers/FortifyServiceProvider.php`
- Register action class untuk create/update/reset user
- Configure rate limiter login
- Configure 2FA, passkeys

---

## 4. Landing Page Publik

### Welcome Page

File: `resources/js/pages/welcome.tsx`
Endpoint: `GET /` — `LandingController::index()`

**Flow:**
1. `LandingController::index()` mengambil content via `LandingContentRepository::getAllGrouped()`
2. Data dikirim ke Inertia sebagai `content` + `sections`
3. Rendering berdasarkan visibilitas dan urutan dari `sections`

**Daftar Section Landing:**

| Section | Komponen | File |
|---------|---------|------|
| `navbar` | `Navbar` | `resources/js/components/landing/navbar.tsx` |
| `hero` | `Hero` | `resources/js/components/landing/hero.tsx` |
| `stats` | `Stats` | `resources/js/components/landing/stats.tsx` |
| `about` | `About` | `resources/js/components/landing/about.tsx` |
| `features` | `Features` | `resources/js/components/landing/features.tsx` |
| `howitworks` | `HowItWorks` | `resources/js/components/landing/how-it-works.tsx` |
| `pricing` | `Pricing` | `resources/js/components/landing/pricing.tsx` |
| `testimonials` | `Testimonials` | `resources/js/components/landing/testimonials.tsx` |
| `cta` | `CTA` | `resources/js/components/landing/cta.tsx` |
| `contact` | `Contact` | `resources/js/components/landing/contact.tsx` |
| `footer` | `Footer` | `resources/js/components/landing/footer.tsx` |

### Navbar

File: `components/landing/navbar.tsx`
- Navigasi scroll spy (IntersectionObserver)
- Theme toggle (light/dark)
- Mobile responsive dengan hamburger menu
- Deteksi scroll untuk styling

### Hero

File: `components/landing/hero.tsx`
- Typewriter effect untuk title accent (multi-word cycling)
- Background image + overlay
- Social proof section
- CTA button
- Floating card badges (product info, rating, stat)
- Animated floating elements

### Stats

File: `components/landing/stats.tsx`
- 4 stat counter dengan animasi counting (IntersectionObserver trigger)
- Easing cubic-out animation via `requestAnimationFrame`

### About

File: `components/landing/about.tsx`
- Gambar + teks paragraf
- Visi & Misi
- Institution logos infinite scroll (framer-motion)

### Features

File: `components/landing/features.tsx`
- 2-column grid cards
- Icon badges with DynamicLucideIcon

### HowItWorks

File: `components/landing/how-it-works.tsx`
- Timeline dengan animasi growing center line (scroll-based)
- 4 step cards alternating layout
- Responsive mobile layout

### Pricing

File: `components/landing/pricing.tsx`
- 3 paket: Starter, Standard, Premium
- Featured paket (Standard) dengan scale highlight
- Monthly/yearly toggle

### Testimonials

File: `components/landing/testimonials.tsx`
- Infinite scrolling carousel (framer-motion)
- Item duplikasi untuk seamless loop
- Avatar gradient backgrounds

### CTA

File: `components/landing/cta.tsx`
- Call-to-action dengan title + subtitle
- Trust badges (3 badge)
- Dialog modal untuk jadwalkan demo (form appointment)

### Contact

File: `components/landing/contact.tsx`
- Contact form: name, email, institution, whatsapp, message
- Info blocks (email, whatsapp, alamat, jam operasional)

### Footer

File: `components/landing/footer.tsx`
- Brand + tagline
- Social media links
- 3 kolom link (Produk, Perusahaan, Dukungan)
- Copyright

### Landing Form (Contact)

File: `app/Http/Controllers/LandingController.php`, `app/Http/Requests/ContactRequest.php`
Endpoint: `POST /contact`

**Flow:**
1. `LandingController::contact(ContactRequest $request)`
2. Validasi via `ContactRequest` (name, email, institution, whatsapp, message)
3. Return `back()->with('success', ...)`

### Cursor Glow (Landing Page Only)

File: `components/cursor-glow.tsx`
- Radial gradient dot following cursor
- Smooth trailing effect via `requestAnimationFrame`
- Hanya muncul di landing page (di-render di `welcome.tsx`)

---

## 5. Admin Panel

### Layout Admin

File: `components/admin/AdminLayout.tsx`
- Layout fixed: sidebar (280px) + main content
- Sidebar: menu navigasi (Dashboard, Appointments, Sections, Settings)
- Section menu collapsible dengan dropdown
- Badge count appointment unread (real-time dari Echo)
- Theme toggle (light/dark)
- User profile dropdown

### Admin Dashboard

File: `pages/Admin/Dashboard.tsx`
Endpoint: `GET /admin` — `AdminDashboardController::index()`

**Data yang ditampilkan:**
- **Stats cards** (4 card): total appointments, unread, today, scheduled
- **Chart**: 7-day appointment bar chart (Daily counts)
- **Latest appointments**: tabel 5 appointment terbaru

**Flow data:**
1. `AdminDashboardController::index()`
2. `AppointmentService::getDashboardData()` → `Cache::remember('admin_dashboard_stats', 300, ...)`
3. Stats via `AppointmentRepository::getDashboardStats()` (1 query aggregate)
4. Chart via `getDailyCountsSince()`
5. Latest via `getLatest()`

### Admin Appointments

File: `pages/Admin/Appointments.tsx`
Endpoint: `GET /admin/appointments` — `Admin\AppointmentController::index()`
Delete: `DELETE /admin/appointments/{id}` — `Admin\AppointmentController::destroy()`

**Flow:**
1. `index()` → `markAllAsRead()` (side effect, tandai semua sudah dibaca)
2. Kirim semua appointments ke view
3. Di frontend: tabel daftar appointment, bisa hapus via konfirmasi

### Admin Settings (Sections Order)

File: `pages/Admin/Settings.tsx`
Endpoint: `GET /admin/settings` — `AdminDashboardController::settings()`

**Fitur:**
- **Reorder sections**: drag-and-drop (manual via tombol up/down)
- **Toggle visibility**: show/hide section
- Data dikirim ke backend via router.post

---

## 6. Section Editor & Live Preview

Ini adalah fitur paling kompleks — editor visual untuk semua konten landing page.

### Komponen Editor

| Komponen | File | Fungsi |
|----------|------|--------|
| `SectionEditor` | `pages/Admin/SectionEditor.tsx` | Halaman utama editor |
| `FieldRenderer` | `components/admin/section-fields/FieldRenderer.tsx` | Render field berdasarkan tipe |
| `TextField` | `components/admin/section-fields/TextField.tsx` | Input/textarea |
| `ImageField` | `components/admin/section-fields/ImageField.tsx` | URL input + upload button |
| `ImageCropModal` | `components/admin/section-fields/ImageCropModal.tsx` | Crop & zoom modal |
| `JsonField` | `components/admin/section-fields/JsonField.tsx` | List items (drag-reorder) |
| `JsonItemModal` | `components/admin/section-fields/JsonItemModal.tsx` | Modal edit item JSON |
| `LucideIconPicker` | `components/lucide-icon-picker.tsx` | Icon picker popover |
| `DynamicLucideIcon` | `components/dynamic-lucide-icon.tsx` | Dynamic icon renderer |
| `PreviewPanel` | `components/admin/PreviewPanel.tsx` | Live preview iframe |
| `SaveStatusBar` | `components/admin/SaveStatusBar.tsx` | Save button + status |

### Typed Hooks Editor

| Hook | File | Fungsi |
|------|------|--------|
| `useSectionEditor` | `hooks/useSectionEditor.ts` | State fields, dirty tracking, save |
| `useJsonFieldManager` | `hooks/useJsonFieldManager.ts` | CRUD items JSON + modal state |
| `usePreviewCommunication` | `hooks/usePreviewCommunication.ts` | postMessage ke iframe preview |

### Flow Editor

```
SectionController::edit()
  → LandingContentService::getFieldsForEdit()
    → LandingContentRepository::getFieldsBySection()
      → LandingContent::where('section', $section)
```

**Save flow:**
```
SectionEditor (React) → router.post()
  → SectionController::update(UpdateLandingSectionRequest)
    → LandingContentService::updateSection()
      → LandingContentRepository::updateMultipleFields()
        → LandingContent::updateOrCreate() per field
      → LandingContentRepository::flushCache()
```

### Image Upload Flow

File: `app/Http/Controllers/Admin/SectionController.php:uploadImage()`
File: `app/Services/LandingContentService.php:uploadImage()`
Endpoint: `POST /admin/upload-image`

**Flow:**
1. Validasi: `image|max:10240|mimes:jpg,jpeg,png,webp`
2. Jika ada `current_url` → hapus file lama dari storage
3. Simpan file ke `storage/app/public/landing/`
4. Resize: max 1200px width, pertahankan aspect ratio, quality 80 (via Intervention Image)
5. Return JSON `{ url: "/storage/landing/..." }`
6. Frontend: loading indicator + rollback state jika gagal

### Live Preview System

Komunikasi antara SectionEditor dan iframe landing page via `postMessage`:

| Message Type | Arah | Fungsi |
|-------------|------|--------|
| `smartexam-preview` | Editor → iframe | Kirim data content terbaru |
| `smartexam-focus-field` | Editor → iframe | Highlight field di preview |
| `smartexam-blur-field` | Editor → iframe | Remove highlight |

**Highlight styling:**
```css
.preview-highlight-active {
    outline: 3px solid rgba(59,130,246,1);
    box-shadow: 0 0 20px rgba(59,130,246,0.6), 0 0 40px rgba(59,130,246,0.3);
    animation: preview-glow-pulse 1s ease-in-out infinite;
}
```

**Preview mode:** Welcome page render via `?preview_section={section}` untuk render satu section spesifik.

---

## 7. Appointment (Booking Demo)

### Public Submit

File: `app/Http/Controllers/AppointmentController.php`
File: `app/Services/AppointmentService.php`
File: `app/Http/Requests/StoreAppointmentRequest.php`
Endpoint: `POST /appointments`

**Flow:**
1. `AppointmentController::store(StoreAppointmentRequest $request)` — validasi
2. `AppointmentService::create($data)` → simpan ke DB
3. `Event::dispatch(new AppointmentCreated($appointment))` → broadcast ke channel `appointments`
4. Flush dashboard cache
5. Return success message

### Admin View

File: `app/Http/Controllers/Admin/AppointmentController.php`
Endpoint: `GET /admin/appointments` | `DELETE /admin/appointments/{id}`

**Flow index:**
1. `markAllAsRead()` — tandai semua appointment sebagai sudah dibaca
2. `getAllForAdmin()` — ambil semua appointment
3. Render `Admin/Appointments`

### Realtime Notification

File: `resources/js/echo.ts` + `AdminLayout.tsx`

**Setup:**
1. `initEcho()` dipanggil di `app.tsx` → inisialisasi Laravel Echo dengan Reverb
2. Di `AdminLayout.tsx`:
```typescript
window.Echo.channel('appointments')
    .listen('.appointment.created', (e) => {
        setLocalCount((prev) => prev + 1);
        toast.success('Ada yang mendaftar demo baru!', {
            description: `${e.appointment.name} (${e.appointment.institution})`,
        });
    });
```

---

## 8. Realtime Notifikasi

### Backend

File: `app/Events/AppointmentCreated.php`
- Implements `ShouldBroadcastNow` (sync broadcast)
- Broadcast channel: `appointments`
- Broadcast as: `appointment.created`

### Frontend

File: `resources/js/echo.ts` — `initEcho()`
File: `app/Http/Middleware/HandleInertiaRequests.php` — `appointmentCount`

**Channel:** `routes/channels.php` — hanya mendefinisikan channel model (private), appointment menggunakan public channel.

---

## 9. Settings

### Profile Settings

File: `pages/settings/profile.tsx`
Controller: `App\Http\Controllers\Settings\ProfileController`
Endpoint: `GET /settings/profile` | `PUT /settings/profile`

**Fitur:**
- Update name, email
- Verifikasi email (resend verification)
- Delete account

### Security Settings

File: `pages/settings/security.tsx`
Controller: `App\Http\Controllers\Settings\SecurityController`
Endpoint: `GET /settings/security` | `PUT /settings/password`

**Fitur:**
- Update password
- **2FA (Two Factor Authentication)**:
  - Enable/disable 2FA
  - QR code setup (SVG)
  - Recovery codes display
  - Komponen: `components/manage-two-factor.tsx`
  - Hook: `hooks/use-two-factor-auth.ts`
- **Passkeys**:
  - Daftar passkeys
  - Tambah/hapus passkey
  - Komponen: `components/manage-passkeys.tsx`

### Appearance Settings

File: `pages/settings/appearance.tsx`
Hook: `hooks/use-appearance.ts`
Endpoint: `GET /settings/appearance`

**Fitur:**
- Theme: Light / Dark / System
- Disimpan di cookie `theme`
- CSS variables: `--lp-*` untuk landing page theming

---

## 10. Utilitas & Hooks

### Shared Library

| File | Fungsi |
|------|--------|
| `lib/utils.ts` | `cn()` — Tailwind merge class; `toUrl()`; `isBooleanValue()` |
| `lib/formatters.ts` | `formatDate()`, `formatDateShort()`, `formatTime()` (locale id-ID) |
| `lib/section-icons.ts` | `iconMap` — mapping string icon → Lucide component; `Section` type |

### Custom Hooks

| Hook | File | Fungsi |
|------|------|--------|
| `useAppearance` | `hooks/use-appearance.ts` | Theme management (light/dark/system) |
| `useScrollReveal` | `hooks/use-scroll-reveal.ts` | IntersectionObserver reveal animation |
| `useStatsCounter` | `hooks/use-scroll-reveal.ts` | Animated stat counters |
| `useClipboard` | `hooks/use-clipboard.ts` | Copy text to clipboard |
| `useCurrentUrl` | `hooks/use-current-url.ts` | Track current URL |
| `useFlashToast` | `hooks/use-flash-toast.ts` | Show flash messages as toast |
| `useMobileNavigation` | `hooks/use-mobile-navigation.ts` | Mobile nav state |
| `useTwoFactorAuth` | `hooks/use-two-factor-auth.ts` | 2FA enable/disable/confirm |
| `usePreviewListener` | `hooks/usePreviewListener.ts` | postMessage listener di Welcome page |
| `useSectionEditor` | `hooks/useSectionEditor.ts` | State & save section editor fields |
| `useJsonFieldManager` | `hooks/useJsonFieldManager.ts` | CRUD items JSON + modal state |
| `usePreviewCommunication` | `hooks/usePreviewCommunication.ts` | postMessage ke iframe preview |

### UI Components (Radix + shadcn)

Terdiri dari ~30 komponen UI di `resources/js/components/ui/` termasuk: `button`, `input`, `dialog`, `card`, `badge`, `avatar`, `skeleton`, `tooltip`, `dropdown-menu`, `sheet`, `sidebar`, `navigation-menu`, `spinner`, `sonner`, `breadcrumb`, `collapsible`, `separator`, `toggle`, `toggle-group`, `select`, `label`, `checkbox`, `input-otp`, `alert`, `placeholder-pattern`, `icon`.

### ErrorBoundary

File: `components/ui/ErrorBoundary.tsx`
- Class component untuk catch React errors
- Fallback UI dengan tombol "Coba Lagi"

---

## 11. Caching & Performance

### Landing Content Cache

**Cache key:** `landing_content_grouped`
**TTL:** Forever (sampai di-invalidate manual)
**Invalidate:** Saat update section, reorder, atau toggle visibility

**Cache flow:**
```php
// LandingContentRepository::getAllGrouped()
return Cache::rememberForever('landing_content_grouped', function () {
    return LandingContent::select('section', 'key', 'value', 'type')
        ->get()
        ->groupBy('section')
        ->mapWithKeys(...)
        ->toArray();
});

// LandingContentService flush setelah update
$this->landingContentRepository->flushCache();
```

### Dashboard Admin Cache

**Cache key:** `admin_dashboard_stats`
**TTL:** 300 detik (5 menit)
**Invalidate:** Saat ada create/delete appointment baru

### Image Upload

- Resize max 1200px width via Intervention Image
- Quality JPEG 80%
- Hapus file lama saat upload baru
- Format terbatas: jpg, jpeg, png, webp
- Max file size: 10MB

### Typewriter Optimization

- Menggunakan `useRef` untuk mutable state (word index, char index, deleting flag)
- Hanya `words` sebagai dependency useEffect
- Re-render minimal per karakter

### Debounced ResizeObserver

- PreviewPanel ResizeObserver menggunakan `requestAnimationFrame` debounce
- Mencegah re-render cascade saat user resize panel

---

## 12. Routes Lengkap

### Web Routes (routes/web.php)

| Method | URI | Name | Controller |
|--------|-----|------|------------|
| GET | `/` | `home` | `LandingController::index()` |
| POST | `/contact` | `contact.send` | `LandingController::contact()` |
| POST | `/appointments` | `appointments.store` | `AppointmentController::store()` |

### Admin Routes (prefix: /admin)

| Method | URI | Name | Controller |
|--------|-----|------|------------|
| GET | `/admin` | `admin.dashboard` | `AdminDashboardController::index()` |
| GET | `/admin/settings` | `admin.settings` | `AdminDashboardController::settings()` |
| GET | `/admin/appointments` | `admin.appointments.index` | `Admin\AppointmentController::index()` |
| DELETE | `/admin/appointments/{id}` | `admin.appointments.destroy` | `Admin\AppointmentController::destroy()` |
| GET | `/admin/sections/{section}` | `admin.sections.edit` | `SectionController::edit()` |
| POST | `/admin/sections/{section}` | `admin.sections.update` | `SectionController::update()` |
| POST | `/admin/sections-reorder` | `admin.sections.reorder` | `SectionController::reorder()` |
| POST | `/admin/sections-toggle-visibility` | `admin.sections.toggle-visibility` | `SectionController::toggleVisibility()` |
| POST | `/admin/upload-image` | `admin.upload.image` | `SectionController::uploadImage()` |

### Settings Routes (routes/settings.php)

| Method | URI | Name | Controller |
|--------|-----|------|------------|
| GET | `/settings/profile` | `settings.profile` | `Settings\ProfileController::edit()` |
| PUT | `/settings/profile` | `settings.profile.update` | `Settings\ProfileController::update()` |
| DELETE | `/settings/profile` | `settings.profile.destroy` | `Settings\ProfileController::destroy()` |
| GET | `/settings/security` | `settings.security` | `Settings\SecurityController::edit()` |
| PUT | `/settings/password` | `settings.password.update` | `Settings\SecurityController::update()` |

### Auth Routes (Fortify auto-generated)

| Method | URI |
|--------|-----|
| POST | `/login` |
| POST | `/register` |
| POST | `/logout` |
| POST | `/forgot-password` |
| POST | `/reset-password` |
| GET | `/reset-password/{token}` |
| GET | `/email/verify/{id}/{hash}` |
| POST | `/email/verification-notification` |
| POST | `/two-factor-challenge` |
| POST | `/user/confirmed-two-factor-authentication` |
| POST | `/user/two-factor-authentication` |
| DELETE | `/user/two-factor-authentication` |
| GET | `/user/two-factor-qr-code` |
| GET | `/user/two-factor-recovery-codes` |
| POST | `/user/two-factor-recovery-codes` |
| POST | `/user/passkeys` |
| DELETE | `/user/passkeys/{id}` |

### Console Routes (routes/console.php)

| Command | Fungsi |
|---------|--------|
| `php artisan app:install-features` | Install landing content default |

### Channel Routes (routes/channels.php)

| Channel | Type |
|---------|------|
| `App.Models.User.{id}` | Private (auth check) |
| `appointments` | Public (untuk broadcast event AppointmentCreated) |
