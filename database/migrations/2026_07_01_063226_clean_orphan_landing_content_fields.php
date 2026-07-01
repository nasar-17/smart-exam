<?php

use App\Models\LandingContent;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Hapus orphan fields yang tidak terhubung ke komponen landing page
        LandingContent::whereIn('key', [
            // Hero — tidak ada elemen visual atau tidak dipakai komponen
            'badge_link',          // hanya href, tidak ada teks visual
            'support_text',        // "Teks Pendukung" — tidak ada di komponen hero
            'bg_image_url',        // legacy fallback untuk hero_bg_image
            'cta_secondary_text',  // orphan
            'cta_secondary_link',  // orphan

            // Navbar — hanya href
            'cta_link',            // hanya href, tidak ada teks visual

            // CTA — tidak dipakai komponen
            'primary_cta_text',    // orphan
            'primary_cta_link',    // orphan
            'secondary_cta_text',  // orphan
            'secondary_cta_link',  // orphan
        ])->delete();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Tidak perlu rollback — data hanya dihapus, bukan schema change
    }
};
