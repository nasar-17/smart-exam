<?php

namespace Database\Seeders;

use App\Models\LandingContent;
use Illuminate\Database\Seeder;

class LandingContentSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            // ── NAVBAR ──────────────────────────────────────
            ['section' => 'navbar', 'key' => 'brand_name', 'value' => 'Smart Exam', 'type' => 'text', 'label' => 'Nama Brand', 'order' => 1],
            ['section' => 'navbar', 'key' => 'cta_text', 'value' => 'Coba Gratis', 'type' => 'text', 'label' => 'Teks Tombol CTA', 'order' => 2],
            ['section' => 'navbar', 'key' => 'cta_link', 'value' => '#pricing', 'type' => 'text', 'label' => 'Link Tombol CTA', 'order' => 3],
            ['section' => 'navbar', 'key' => 'nav_links', 'type' => 'json', 'label' => 'Daftar Menu Navigasi (JSON)', 'order' => 4, 'value' => json_encode([
                ['href' => '#hero', 'label' => 'Beranda'],
                ['href' => '#about', 'label' => 'Tentang'],
                ['href' => '#features', 'label' => 'Fitur'],
                ['href' => '#howitworks', 'label' => 'Cara Kerja'],
                ['href' => '#pricing', 'label' => 'Harga'],
                ['href' => '#testimonials', 'label' => 'Testimoni'],
                ['href' => '#contact', 'label' => 'Kontak'],
            ])],

            // ── HERO ────────────────────────────────────────
            ['section' => 'hero', 'key' => 'badge_text',      'value' => '500+ Institusi Aktif',                                                                   'type' => 'text',     'label' => 'Badge Text (kiri atas)',          'order' => 1],
            ['section' => 'hero', 'key' => 'badge_link',      'value' => '#testimonials',                                                                          'type' => 'text',     'label' => 'Badge Link',                      'order' => 2],
            ['section' => 'hero', 'key' => 'title',           'value' => 'Platform Ujian',                                                                         'type' => 'text',     'label' => 'Judul Baris 1',                   'order' => 3],
            ['section' => 'hero', 'key' => 'title_accent',    'value' => 'Digital Modern, Aman & Adil, Praktis & Akurat',                                          'type' => 'text',     'label' => 'Judul Baris 2 (Looping teks animasi, pisahkan dengan koma)', 'order' => 4],
            ['section' => 'hero', 'key' => 'subtitle',        'value' => 'Kelola soal, pantau peserta, dan analisis hasil — semua dalam satu platform yang cerdas, aman, dan efisien.', 'type' => 'textarea', 'label' => 'Subjudul',                        'order' => 5],
            ['section' => 'hero', 'key' => 'social_proof_text', 'value' => 'Digunakan oleh 10.000+ guru',                                                          'type' => 'text',     'label' => 'Social Proof Teks',               'order' => 6],
            ['section' => 'hero', 'key' => 'social_proof_sub',  'value' => '/ ★ 4.9 Rating',                                                                       'type' => 'text',     'label' => 'Social Proof Sub (rating)',        'order' => 7],
            ['section' => 'hero', 'key' => 'cta_primary_text',  'value' => 'Mulai Gratis Sekarang',                                                                 'type' => 'text',     'label' => 'Teks CTA Primer',                 'order' => 8],
            ['section' => 'hero', 'key' => 'cta_primary_link',  'value' => '#pricing',                                                                              'type' => 'text',     'label' => 'Link CTA Primer',                 'order' => 9],
            ['section' => 'hero', 'key' => 'cta_secondary_text','value' => 'Lihat Demo',                                                                            'type' => 'text',     'label' => 'Teks CTA Sekunder',               'order' => 10],
            ['section' => 'hero', 'key' => 'cta_secondary_link','value' => '#howitworks',                                                                           'type' => 'text',     'label' => 'Link CTA Sekunder',               'order' => 11],
            ['section' => 'hero', 'key' => 'hero_image',      'value' => '',                                                                                        'type' => 'image',    'label' => 'Gambar Hero (kanan, opsional)',    'order' => 12],
            ['section' => 'hero', 'key' => 'stat_pct',        'value' => '98%',                                                                                     'type' => 'text',     'label' => 'Angka Statistik (badge kanan)',    'order' => 13],
            ['section' => 'hero', 'key' => 'stat_label',      'value' => "Tingkat\nKepuasan",                                                                       'type' => 'text',     'label' => 'Label Statistik Badge',           'order' => 14],
            ['section' => 'hero', 'key' => 'float_q1',        'value' => 'Ujian Aman & Anti-Kecurangan?',                                                           'type' => 'text',     'label' => 'Floating Tag 1 (di atas gambar)', 'order' => 15],
            ['section' => 'hero', 'key' => 'float_q2',        'value' => 'Laporan Otomatis Tersedia?',                                                              'type' => 'text',     'label' => 'Floating Tag 2 (di bawah tag 1)', 'order' => 16],
            ['section' => 'hero', 'key' => 'card_title',      'value' => 'Smart Exam',                                                                              'type' => 'text',     'label' => 'Kartu Mini — Nama Produk',        'order' => 17],
            ['section' => 'hero', 'key' => 'card_sub',        'value' => 'Ujian Digital',                                                                           'type' => 'text',     'label' => 'Kartu Mini — Sub Teks',           'order' => 18],
            ['section' => 'hero', 'key' => 'card_price',      'value' => 'Gratis Trial',                                                                            'type' => 'text',     'label' => 'Kartu Mini — Harga/CTA',         'order' => 19],
            ['section' => 'hero', 'key' => 'card_rating',     'value' => '4.9',                                                                                     'type' => 'text',     'label' => 'Kartu Mini — Rating',             'order' => 20],

            // ── STATS ───────────────────────────────────────
            ['section' => 'stats', 'key' => 'stat_1_value', 'value' => '500', 'type' => 'text', 'label' => 'Angka Stat 1', 'order' => 1],
            ['section' => 'stats', 'key' => 'stat_1_suffix', 'value' => '+', 'type' => 'text', 'label' => 'Suffix Stat 1', 'order' => 2],
            ['section' => 'stats', 'key' => 'stat_1_label', 'value' => 'Sekolah & Institusi', 'type' => 'text', 'label' => 'Label Stat 1', 'order' => 3],
            ['section' => 'stats', 'key' => 'stat_2_value', 'value' => '1', 'type' => 'text', 'label' => 'Angka Stat 2', 'order' => 4],
            ['section' => 'stats', 'key' => 'stat_2_suffix', 'value' => ' Juta+', 'type' => 'text', 'label' => 'Suffix Stat 2', 'order' => 5],
            ['section' => 'stats', 'key' => 'stat_2_label', 'value' => 'Ujian Diselenggarakan', 'type' => 'text', 'label' => 'Label Stat 2', 'order' => 6],
            ['section' => 'stats', 'key' => 'stat_3_value', 'value' => '98', 'type' => 'text', 'label' => 'Angka Stat 3', 'order' => 7],
            ['section' => 'stats', 'key' => 'stat_3_suffix', 'value' => '%', 'type' => 'text', 'label' => 'Suffix Stat 3', 'order' => 8],
            ['section' => 'stats', 'key' => 'stat_3_label', 'value' => 'Tingkat Kepuasan', 'type' => 'text', 'label' => 'Label Stat 3', 'order' => 9],
            ['section' => 'stats', 'key' => 'stat_4_value', 'value' => '3', 'type' => 'text', 'label' => 'Angka Stat 4', 'order' => 10],
            ['section' => 'stats', 'key' => 'stat_4_suffix', 'value' => ' Menit', 'type' => 'text', 'label' => 'Suffix Stat 4', 'order' => 11],
            ['section' => 'stats', 'key' => 'stat_4_label', 'value' => 'Setup Pertama', 'type' => 'text', 'label' => 'Label Stat 4', 'order' => 12],

            // ── ABOUT ───────────────────────────────────────
            ['section' => 'about', 'key' => 'title', 'value' => 'Kami Percaya Teknologi Bisa Membuat', 'type' => 'text', 'label' => 'Judul (baris 1)', 'order' => 1],
            ['section' => 'about', 'key' => 'title_highlight', 'value' => 'Pendidikan Lebih Adil', 'type' => 'text', 'label' => 'Judul (highlight gradient)', 'order' => 2],
            ['section' => 'about', 'key' => 'paragraph_1', 'value' => 'Smart Exam dikembangkan oleh tim Smart Inovasi — startup teknologi pendidikan dari Makassar, Indonesia. Kami memahami tantangan nyata yang dihadapi institusi pendidikan dalam menyelenggarakan ujian: kecurangan, biaya cetak soal, dan keterbatasan waktu koreksi.', 'type' => 'textarea', 'label' => 'Paragraf 1', 'order' => 3],
            ['section' => 'about', 'key' => 'paragraph_2', 'value' => 'Dengan Smart Exam, kami menghadirkan platform ujian digital yang tidak hanya mudah digunakan, tapi juga aman, terjangkau, dan bisa diakses dari mana saja.', 'type' => 'textarea', 'label' => 'Paragraf 2', 'order' => 4],
            ['section' => 'about', 'key' => 'image_url', 'value' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80', 'type' => 'image', 'label' => 'URL Gambar', 'order' => 5],
            ['section' => 'about', 'key' => 'visi_title', 'value' => 'Visi Kami', 'type' => 'text', 'label' => 'Visi - Judul', 'order' => 6],
            ['section' => 'about', 'key' => 'visi_text', 'value' => 'Menjadi platform ujian digital terdepan di Indonesia yang berdedikasi menciptakan akses evaluasi pendidikan yang adil, aman, dan inklusif bagi seluruh lapisan masyarakat.', 'type' => 'textarea', 'label' => 'Visi - Deskripsi', 'order' => 7],
            ['section' => 'about', 'key' => 'misi_title', 'value' => 'Misi Kami', 'type' => 'text', 'label' => 'Misi - Judul', 'order' => 8],
            ['section' => 'about', 'key' => 'misi_items', 'type' => 'json', 'label' => 'Misi - Daftar Poin (JSON)', 'order' => 9, 'value' => json_encode([
                'Menyediakan teknologi anti-kecurangan mutakhir demi menjaga kejujuran proses akademik.',
                'Menyederhanakan administrasi ujian guna menekan beban biaya operasional kertas dan cetak.',
                'Menyajikan analisis hasil instan dan detail untuk mempermudah evaluasi performa belajar.'
            ])],
            ['section' => 'about', 'key' => 'image_2_url', 'value' => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80', 'type' => 'image', 'label' => 'URL Gambar Kedua', 'order' => 10],
            ['section' => 'about', 'key' => 'institutions', 'type' => 'json', 'label' => 'Daftar Institusi (JSON)', 'order' => 11, 'value' => json_encode([
                'UH|Universitas Hasanuddin',
                'SM|STMIK Makassar',
                'S5|SMA Negeri 5',
                'LP|LSP Nasional',
                'PU|Politeknik Ujung',
                'AT|Akademi Teknologi'
            ])],

            // ── FEATURES ────────────────────────────────────
            ['section' => 'features', 'key' => 'header_badge', 'value' => 'Fitur Unggulan', 'type' => 'text', 'label' => 'Badge Header', 'order' => 1],
            ['section' => 'features', 'key' => 'header_title', 'value' => 'Semua yang Kamu Butuhkan untuk', 'type' => 'text', 'label' => 'Judul (baris 1)', 'order' => 2],
            ['section' => 'features', 'key' => 'header_title_highlight', 'value' => 'Ujian Digital', 'type' => 'text', 'label' => 'Judul (highlight)', 'order' => 3],
            ['section' => 'features', 'key' => 'header_subtitle', 'value' => 'Dari pembuatan soal hingga laporan hasil — Smart Exam menangani semuanya.', 'type' => 'textarea', 'label' => 'Subjudul', 'order' => 4],
            ['section' => 'features', 'key' => 'items', 'type' => 'json', 'label' => 'Daftar Fitur (JSON)', 'order' => 5, 'value' => json_encode([
                ['icon' => 'lucide:library', 'title' => 'Bank Soal Cerdas', 'description' => 'Kelola ribuan soal dengan kategori, tag, dan tingkat kesulitan secara terstruktur.', 'bg' => '#EDE9F8', 'dark' => false],
                ['icon' => 'lucide:shield-check', 'title' => 'Anti-Kecurangan', 'description' => 'Deteksi tab switching, fullscreen lock, dan randomisasi soal otomatis setiap peserta.', 'bg' => '#ffffff', 'dark' => false],
                ['icon' => 'lucide:clock', 'title' => 'Timer Otomatis', 'description' => 'Atur durasi ujian per sesi dengan countdown real-time dan auto-submit saat waktu habis.', 'bg' => '#ffffff', 'dark' => false],
                ['icon' => 'lucide:bar-chart-3', 'title' => 'Laporan Instan', 'description' => 'Hasil ujian tersedia segera setelah selesai — lengkap dengan analisis per soal dan per siswa.', 'bg' => 'gradient', 'dark' => true],
                ['icon' => 'lucide:users-2', 'title' => 'Manajemen Peserta', 'description' => 'Import peserta via Excel, bagi ke dalam grup kelas, dan pantau status ujian secara live.', 'bg' => '#ffffff', 'dark' => false],
                ['icon' => 'lucide:monitor-smartphone', 'title' => 'Akses Multi-Device', 'description' => 'Ujian bisa diikuti dari laptop, tablet, atau smartphone tanpa install aplikasi tambahan.', 'bg' => '#f8f7ff', 'dark' => false],
                ['icon' => 'lucide:upload', 'title' => 'Import Soal Mudah', 'description' => 'Upload soal dari file Word atau Excel — konversi otomatis ke format ujian digital.', 'bg' => '#ffffff', 'dark' => false],
                ['icon' => 'lucide:bell-ring', 'title' => 'Notifikasi Real-Time', 'description' => 'Pengajar mendapat notifikasi live saat peserta mulai, selesai, atau terdeteksi mencurigakan.', 'bg' => '#ffffff', 'dark' => false],
            ])],

            // ── HOW IT WORKS ────────────────────────────────
            ['section' => 'howitworks', 'key' => 'title', 'value' => 'Mulai Ujian Digital dalam', 'type' => 'text', 'label' => 'Judul (baris 1)', 'order' => 1],
            ['section' => 'howitworks', 'key' => 'title_highlight', 'value' => '4 Langkah Mudah', 'type' => 'text', 'label' => 'Judul (highlight)', 'order' => 2],
            ['section' => 'howitworks', 'key' => 'header_subtitle', 'value' => 'Proses integrasi yang cepat dan sederhana untuk mentransformasi sistem ujian di institusi Anda.', 'type' => 'textarea', 'label' => 'Subjudul', 'order' => 3],
            ['section' => 'howitworks', 'key' => 'items', 'type' => 'json', 'label' => 'Daftar Langkah (JSON)', 'order' => 4, 'value' => json_encode([
                ['number' => '01', 'icon' => 'lucide:user-plus', 'title' => 'Daftarkan Institusi', 'description' => 'Buat akun institusi Anda dalam 2 menit. Tidak perlu kartu kredit untuk memulai.'],
                ['number' => '02', 'icon' => 'lucide:library', 'title' => 'Buat Bank Soal', 'description' => 'Tambahkan soal secara manual, import dari Word/Excel, atau gunakan template kami.'],
                ['number' => '03', 'icon' => 'lucide:rocket', 'title' => 'Jadwalkan Ujian', 'description' => 'Atur sesi ujian: pilih peserta, tentukan waktu, aktifkan fitur pengamanan.'],
                ['number' => '04', 'icon' => 'lucide:bar-chart-3', 'title' => 'Analisis Hasil', 'description' => 'Laporan lengkap otomatis tersedia setelah ujian selesai. Export ke PDF atau Excel.'],
            ])],

            // ── PRICING ─────────────────────────────────────
            ['section' => 'pricing', 'key' => 'header_badge', 'value' => 'Harga', 'type' => 'text', 'label' => 'Badge Header', 'order' => 1],
            ['section' => 'pricing', 'key' => 'header_title', 'value' => 'Paket yang Sesuai untuk Setiap Institusi', 'type' => 'text', 'label' => 'Judul', 'order' => 2],
            ['section' => 'pricing', 'key' => 'header_subtitle', 'value' => 'Mulai gratis, upgrade kapan saja.', 'type' => 'text', 'label' => 'Subjudul', 'order' => 3],
            ['section' => 'pricing', 'key' => 'plans', 'type' => 'json', 'label' => 'Paket Harga (JSON)', 'order' => 4, 'value' => json_encode([
                ['id' => 'starter', 'name' => 'Starter', 'price_monthly' => 'Gratis', 'price_yearly' => 'Gratis', 'description' => 'Untuk institusi kecil / coba-coba', 'featured' => false, 'features' => ['1 admin akun', 'Bank soal hingga 100 soal', '5 sesi ujian/bulan', 'Laporan dasar', 'Support via email'], 'cta_text' => 'Mulai Gratis', 'cta_style' => 'outline'],
                ['id' => 'pro', 'name' => 'Pro', 'price_monthly' => 'Rp 299.000', 'price_yearly' => 'Rp 239.000', 'description' => 'Untuk sekolah menengah & pondok pesantren', 'featured' => true, 'features' => ['5 admin akun', 'Bank soal tak terbatas', 'Sesi ujian tak terbatas', 'Anti-kecurangan lengkap', 'Laporan detail + export PDF/Excel', 'Import soal dari Word/Excel', 'Support prioritas via WhatsApp'], 'cta_text' => 'Mulai Uji Coba 14 Hari', 'cta_style' => 'primary'],
                ['id' => 'enterprise', 'name' => 'Enterprise', 'price_monthly' => 'Custom', 'price_yearly' => 'Custom', 'description' => 'Untuk universitas, dinas pendidikan, lembaga besar', 'featured' => false, 'features' => ['Admin tak terbatas', 'Dedicated server / on-premise', 'Integrasi SSO & API custom', 'White-label / custom domain', 'SLA 99.9% uptime', 'Onboarding & training tim', 'Account manager dedicated'], 'cta_text' => 'Hubungi Sales', 'cta_style' => 'white'],
            ])],

            // ── TESTIMONIALS ────────────────────────────────
            ['section' => 'testimonials', 'key' => 'header_badge', 'value' => 'Testimoni', 'type' => 'text', 'label' => 'Badge Header', 'order' => 1],
            ['section' => 'testimonials', 'key' => 'header_title', 'value' => 'Apa Kata Mereka yang Sudah Menggunakan Smart Exam?', 'type' => 'text', 'label' => 'Judul', 'order' => 2],
            ['section' => 'testimonials', 'key' => 'items', 'type' => 'json', 'label' => 'Daftar Testimoni (JSON)', 'order' => 3, 'value' => json_encode([
                ['initial' => 'N', 'name' => 'Dra. Hj. Nuraini, M.Pd.', 'role' => 'Kepala Sekolah, SMA Negeri 5 Makassar', 'quote' => 'Smart Exam benar-benar mengubah cara kami menyelenggarakan ujian semester. Tidak ada lagi drama fotokopi soal tengah malam!', 'rating' => 5],
                ['initial' => 'A', 'name' => 'Bpk. Ahmad Fauzi, S.Pd.', 'role' => 'Guru Matematika, MTs Al-Ikhlas Bone', 'quote' => 'Fitur anti-cheating-nya sangat membantu. Siswa tidak bisa buka tab lain, dan saya bisa pantau mereka secara real-time dari ruang guru.', 'rating' => 5],
                ['initial' => 'R', 'name' => 'Ir. Rahmat Hidayat', 'role' => 'Kepala IT, Universitas Bosowa', 'quote' => 'Setup awal hanya butuh 15 menit. Tim Smart Inovasi juga sangat responsif membantu kami saat onboarding.', 'rating' => 5],
                ['initial' => 'S', 'name' => 'Siti Aisyah, S.Pd., M.Si.', 'role' => 'Dosen, Politeknik Negeri Ujung Pandang', 'quote' => 'Laporan hasilnya detail banget — bisa lihat per soal mana yang banyak salah. Sangat membantu evaluasi pengajaran saya.', 'rating' => 5],
                ['initial' => 'H', 'name' => 'H. Syamsul Bahri, M.M.', 'role' => 'Wakasek Kurikulum, SMK Kesehatan Amanah', 'quote' => 'Kami punya 1.200 siswa dan Smart Exam menanganinya tanpa masalah. Tidak ada server down, bahkan di hari ujian nasional simulasi.', 'rating' => 5],
                ['initial' => 'M', 'name' => 'Andi Maulana, S.Kom.', 'role' => 'Operator IT, Dinas Pendidikan Kab. Gowa', 'quote' => 'Harganya sangat terjangkau dibanding solusi lain yang pernah kami coba. Worth it sekali untuk fitur yang ditawarkan.', 'rating' => 5],
            ])],

            // ── CTA ─────────────────────────────────────────
            ['section' => 'cta', 'key' => 'title', 'value' => 'Siap Membawa Ujian di Institusimu ke Level Berikutnya?', 'type' => 'text', 'label' => 'Judul', 'order' => 1],
            ['section' => 'cta', 'key' => 'subtitle', 'value' => 'Bergabunglah bersama 500+ institusi pendidikan yang sudah mempercayakan ujian digital mereka ke Smart Exam.', 'type' => 'textarea', 'label' => 'Subjudul', 'order' => 2],
            ['section' => 'cta', 'key' => 'primary_cta_text', 'value' => 'Mulai Gratis', 'type' => 'text', 'label' => 'Teks CTA Primer', 'order' => 3],
            ['section' => 'cta', 'key' => 'primary_cta_link', 'value' => '#pricing', 'type' => 'text', 'label' => 'Link CTA Primer', 'order' => 4],
            ['section' => 'cta', 'key' => 'secondary_cta_text', 'value' => 'Jadwalkan Demo', 'type' => 'text', 'label' => 'Teks CTA Sekunder', 'order' => 5],
            ['section' => 'cta', 'key' => 'secondary_cta_link', 'value' => '#contact', 'type' => 'text', 'label' => 'Link CTA Sekunder', 'order' => 6],
            ['section' => 'cta', 'key' => 'badge_1', 'value' => 'Data Aman & Terenkripsi', 'type' => 'text', 'label' => 'Trust Badge 1', 'order' => 7],
            ['section' => 'cta', 'key' => 'badge_2', 'value' => 'Setup 3 Menit', 'type' => 'text', 'label' => 'Trust Badge 2', 'order' => 8],
            ['section' => 'cta', 'key' => 'badge_3', 'value' => 'Gratis 14 Hari Tanpa Syarat', 'type' => 'text', 'label' => 'Trust Badge 3', 'order' => 9],

            // ── CONTACT ─────────────────────────────────────
            ['section' => 'contact', 'key' => 'title', 'value' => 'Ada Pertanyaan? Kami Siap Membantu', 'type' => 'text', 'label' => 'Judul', 'order' => 1],
            ['section' => 'contact', 'key' => 'subtitle', 'value' => 'Isi form di bawah dan kami akan menghubungi Anda dalam 1x24 jam.', 'type' => 'textarea', 'label' => 'Subjudul', 'order' => 2],
            ['section' => 'contact', 'key' => 'email', 'value' => 'hello@smartexam.id', 'type' => 'text', 'label' => 'Email', 'order' => 3],
            ['section' => 'contact', 'key' => 'whatsapp', 'value' => '+62 812-xxxx-xxxx', 'type' => 'text', 'label' => 'WhatsApp', 'order' => 4],
            ['section' => 'contact', 'key' => 'address', 'value' => 'Jl. A.P. Pettarani, Makassar, Sulawesi Selatan', 'type' => 'textarea', 'label' => 'Alamat', 'order' => 5],
            ['section' => 'contact', 'key' => 'hours', 'value' => 'Senin–Jumat, 08.00–17.00 WITA', 'type' => 'text', 'label' => 'Jam Operasional', 'order' => 6],

            // ── FOOTER ──────────────────────────────────────
            ['section' => 'footer', 'key' => 'tagline', 'value' => 'Platform ujian digital terpercaya untuk institusi pendidikan modern Indonesia.', 'type' => 'textarea', 'label' => 'Tagline', 'order' => 1],
            ['section' => 'footer', 'key' => 'copyright', 'value' => '© 2026 Smart Exam oleh Smart Inovasi. Hak cipta dilindungi.', 'type' => 'text', 'label' => 'Copyright', 'order' => 2],
            ['section' => 'footer', 'key' => 'social_instagram', 'value' => '#', 'type' => 'text', 'label' => 'Link Instagram', 'order' => 3],
            ['section' => 'footer', 'key' => 'social_twitter', 'value' => '#', 'type' => 'text', 'label' => 'Link Twitter/X', 'order' => 4],
            ['section' => 'footer', 'key' => 'social_linkedin', 'value' => '#', 'type' => 'text', 'label' => 'Link LinkedIn', 'order' => 5],
            ['section' => 'footer', 'key' => 'social_youtube', 'value' => '#', 'type' => 'text', 'label' => 'Link YouTube', 'order' => 6],
        ];

        foreach ($data as $item) {
            LandingContent::updateOrCreate(
                ['section' => $item['section'], 'key' => $item['key']],
                $item
            );
        }
    }
}
