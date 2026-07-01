<?php

use App\Models\LandingContent;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        LandingContent::where('section', 'hero')
            ->where('key', 'badge_text')
            ->delete();
    }

    public function down(): void
    {
        // Tidak perlu rollback
    }
};
