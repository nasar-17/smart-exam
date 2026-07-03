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
            ['section' => 'testimonials', 'key' => 'header_rating'],
            [
                'value' => '4.9/5 dari 500+ pengguna',
                'type' => 'text',
                'label' => 'Teks Rating',
                'order' => 2.5,
            ]
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        LandingContent::where('section', 'testimonials')->where('key', 'header_rating')->delete();
    }
};
