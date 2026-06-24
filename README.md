# SmartExam Web Application

Aplikasi web SmartExam menggunakan framework **Laravel** dengan **Inertia.js**, **React**, **TypeScript**, dan **Tailwind CSS v4**.

---

## Prasyarat (Prerequisites)

Sebelum memulai pemasangan, pastikan perangkat Anda telah terinstal:
- **PHP** >= 8.3
- **Composer** (untuk dependensi PHP)
- **Node.js** (rekomendasi versi LTS terbaru) & **NPM** (untuk dependensi frontend)
- Database (SQLite didukung secara default, atau MySQL/PostgreSQL jika diperlukan)

---

## Langkah-Langkah Pemasangan (Installation Guide)

Ikuti langkah-langkah di bawah ini untuk memasang project di lingkungan lokal Anda:

### 1. Clone Repository
Unduh project ke komputer lokal Anda:
```bash
git clone <url-repository>
cd smartexam-web
```

### 2. Konfigurasi Environment File
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
*Catatan: Secara default, koneksi database menggunakan SQLite (`DB_CONNECTION=sqlite`). Jika Anda menggunakan SQLite, pastikan file database SQLite dibuat atau biarkan Laravel membuatnya secara otomatis saat proses setup.*

Jika Anda ingin menggunakan database MySQL atau lainnya, silakan sesuaikan variabel lingkungan berikut pada file `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database_anda
DB_USERNAME=username_database
DB_PASSWORD=password_database
```

### 3. Setup Project Otomatis
Project ini menyediakan perintah shortcut setup yang menggabungkan seluruh proses instalasi (install composer, generate key, migrasi database, install npm, dan build asset).

Jalankan perintah berikut pada terminal Anda:
```bash
composer run setup
```

Perintah di atas akan melakukan:
1. `composer install` — Mengunduh dependensi PHP.
2. Membuat file `.env` (jika belum ada).
3. `php artisan key:generate` — Menghasilkan kunci enkripsi aplikasi.
4. `php artisan migrate --force` — Menjalankan migrasi database.
5. `npm install` — Mengunduh dependensi frontend.
6. `npm run build` — Melakukan build asset untuk frontend.

---

## Menjalankan Aplikasi di Lingkungan Pengembangan

Setelah setup berhasil dilakukan, Anda dapat menjalankan server lokal dengan satu perintah berikut:

```bash
composer run dev
```

Perintah di atas akan menjalankan beberapa proses secara bersamaan (*concurrently*):
- **Server Laravel** (`php artisan serve` di `localhost:8000`)
- **Queue Listener** (`php artisan queue:listen`)
- **Pail Logs** (`php artisan pail`)
- **Vite Dev Server** (`npm run dev`)

> Catatan: Pada Windows, `php artisan pail` tidak dapat dijalankan karena ekstensi PHP `pcntl` tidak tersedia. Perintah `composer run dev` akan melewati pail secara otomatis pada sistem Windows.

Buka browser Anda dan akses aplikasi melalui [http://localhost:8000](http://localhost:8000).

---

## Perintah Tambahan yang Berguna

### Linting & Formatting
- **Cek PHP Code Style (Laravel Pint):**
  ```bash
  composer run lint:check
  ```
- **Perbaiki PHP Code Style otomatis:**
  ```bash
  composer run lint
  ```
- **Cek TypeScript Types:**
  ```bash
  npm run types:check
  ```
- **Cek Linting Frontend (ESLint):**
  ```bash
  npm run lint:check
  ```
- **Perbaiki Linting Frontend otomatis:**
  ```bash
  npm run lint
  ```
- **Cek Formatting Frontend (Prettier):**
  ```bash
  npm run format:check
  ```
- **Format Code Frontend (Prettier):**
  ```bash
  npm run format
  ```

### Menjalankan Pengujian (Testing)
```bash
composer run test
```
