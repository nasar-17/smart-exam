<?php

namespace App\Http\Middleware;

use App\Models\Appointment;
use App\Models\LandingContent;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'adminSections' => $this->getAdminSections(),
            'appointmentCount' => $request->user() ? Appointment::where('is_read', false)->count() : 0,
        ];
    }

    private function getAdminSections(): array
    {
        // Default sections and details
        $defaultSections = [
            'navbar' => ['label' => 'Navbar',       'icon' => 'layout',        'desc' => 'Brand name, CTA button', 'default_order' => 1],
            'hero' => ['label' => 'Hero',          'icon' => 'image',         'desc' => 'Judul, subtitle, CTA, background', 'default_order' => 2],
            'stats' => ['label' => 'Stats Bar',     'icon' => 'bar-chart-2',   'desc' => '4 angka statistik', 'default_order' => 3],
            'about' => ['label' => 'Tentang',       'icon' => 'info',          'desc' => 'Narasi perusahaan, gambar', 'default_order' => 4],
            'features' => ['label' => 'Fitur',         'icon' => 'star',          'desc' => '8 feature card', 'default_order' => 5],
            'howitworks' => ['label' => 'Cara Kerja',    'icon' => 'list-ordered',  'desc' => '4 langkah', 'default_order' => 6],
            'pricing' => ['label' => 'Harga',         'icon' => 'credit-card',   'desc' => '3 paket harga', 'default_order' => 7],
            'testimonials' => ['label' => 'Testimoni',     'icon' => 'message-square', 'desc' => '6 testimoni', 'default_order' => 8],
            'cta' => ['label' => 'CTA Section',   'icon' => 'zap',           'desc' => 'Judul, CTA, trust badge', 'default_order' => 9],
            'contact' => ['label' => 'Kontak',        'icon' => 'phone',         'desc' => 'Email, WA, alamat, jam', 'default_order' => 10],
            'footer' => ['label' => 'Footer',        'icon' => 'align-justify', 'desc' => 'Tagline, copyright, sosial media', 'default_order' => 11],
        ];

        // Fetch custom order and visibility from DB
        $dbMeta = LandingContent::select('section', 'section_order', 'is_visible')
            ->get()
            ->groupBy('section')
            ->map(function ($items) {
                $first = $items->first();

                return [
                    'section_order' => (int) ($first->section_order ?? 0),
                    'is_visible' => (bool) ($first->is_visible ?? true),
                ];
            })
            ->toArray();

        $sections = [];
        foreach ($defaultSections as $key => $info) {
            $meta = $dbMeta[$key] ?? [];
            $order = isset($meta['section_order']) && $meta['section_order'] > 0 ? $meta['section_order'] : $info['default_order'];
            $visible = isset($meta['is_visible']) ? $meta['is_visible'] : true;

            $sections[] = [
                'key' => $key,
                'label' => $info['label'],
                'icon' => $info['icon'],
                'desc' => $info['desc'],
                'order' => $order,
                'is_visible' => $visible,
            ];
        }

        // Sort by order ascending
        usort($sections, fn ($a, $b) => $a['order'] <=> $b['order']);

        return $sections;
    }
}
