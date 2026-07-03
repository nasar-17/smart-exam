<?php

use App\Models\LandingContent;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        LandingContent::updateOrCreate(
            ['section' => 'cta', 'key' => 'btn_text'],
            [
                'value' => 'Jadwalkan Demo',
                'type' => 'text',
                'label' => 'Teks Tombol CTA',
                'order' => 2.5,
            ]
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        LandingContent::where('section', 'cta')->where('key', 'btn_text')->delete();
    }
};
