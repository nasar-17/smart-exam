<?php

use App\Models\LandingContent;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        // Gabung value + suffix jadi satu
        $combined = [
            1 => ['value' => '500+',   'suffix' => '+'],
            2 => ['value' => '1 Juta+', 'suffix' => ' Juta+'],
            3 => ['value' => '98%',     'suffix' => '%'],
            4 => ['value' => '3 Menit', 'suffix' => ' Menit'],
        ];

        foreach ($combined as $i => $parts) {
            // Update value record with combined string
            LandingContent::where('section', 'stats')
                ->where('key', "stat_{$i}_value")
                ->update(['value' => $parts['value']]);

            // Delete suffix record
            LandingContent::where('section', 'stats')
                ->where('key', "stat_{$i}_suffix")
                ->delete();
        }
    }

    public function down(): void
    {
        // Tidak perlu rollback
    }
};
