<?php

use App\Models\LandingContent;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        // Ambil data legacy
        $instagram = LandingContent::where('section', 'footer')->where('key', 'social_instagram')->value('value') ?? '#';
        $twitter = LandingContent::where('section', 'footer')->where('key', 'social_twitter')->value('value') ?? '#';
        $linkedin = LandingContent::where('section', 'footer')->where('key', 'social_linkedin')->value('value') ?? '#';
        $youtube = LandingContent::where('section', 'footer')->where('key', 'social_youtube')->value('value') ?? '#';

        // Hapus field legacy
        LandingContent::where('section', 'footer')
            ->whereIn('key', ['social_instagram', 'social_twitter', 'social_linkedin', 'social_youtube'])
            ->delete();

        // Buat field JSON baru
        LandingContent::updateOrCreate(
            ['section' => 'footer', 'key' => 'links_social'],
            [
                'value' => json_encode([
                    ['icon' => 'lucide:youtube', 'href' => $youtube],
                    ['icon' => 'lucide:twitter', 'href' => $twitter],
                    ['icon' => 'lucide:instagram', 'href' => $instagram],
                    ['icon' => 'lucide:linkedin', 'href' => $linkedin],
                ]),
                'type' => 'json',
                'label' => 'Link Media Sosial (icon + URL)',
                'order' => 3,
            ]
        );
    }

    public function down(): void
    {
        //
    }
};
