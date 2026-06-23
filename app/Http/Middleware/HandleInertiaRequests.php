<?php

namespace App\Http\Middleware;

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
                'error'   => fn () => $request->session()->get('error'),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'adminSections' => $this->getAdminSections(),
        ];
    }

    /**
     * Single source of truth for admin sidebar sections.
     * Matches the landing page components order.
     */
    private function getAdminSections(): array
    {
        return [
            ['key' => 'navbar',       'label' => 'Navbar',       'icon' => 'layout',        'desc' => 'Brand name, CTA button'],
            ['key' => 'hero',         'label' => 'Hero',          'icon' => 'image',         'desc' => 'Judul, subtitle, CTA, background'],
            ['key' => 'stats',        'label' => 'Stats Bar',     'icon' => 'bar-chart-2',   'desc' => '4 angka statistik'],
            ['key' => 'about',        'label' => 'Tentang',       'icon' => 'info',          'desc' => 'Narasi perusahaan, gambar'],
            ['key' => 'features',     'label' => 'Fitur',         'icon' => 'star',          'desc' => '8 feature card'],
            ['key' => 'howitworks',   'label' => 'Cara Kerja',    'icon' => 'list-ordered',  'desc' => '4 langkah'],
            ['key' => 'pricing',      'label' => 'Harga',         'icon' => 'credit-card',   'desc' => '3 paket harga'],
            ['key' => 'testimonials', 'label' => 'Testimoni',     'icon' => 'message-square','desc' => '6 testimoni'],
            ['key' => 'cta',          'label' => 'CTA Section',   'icon' => 'zap',           'desc' => 'Judul, CTA, trust badge'],
            ['key' => 'contact',      'label' => 'Kontak',        'icon' => 'phone',         'desc' => 'Email, WA, alamat, jam'],
            ['key' => 'footer',       'label' => 'Footer',        'icon' => 'align-justify', 'desc' => 'Tagline, copyright, sosial media'],
        ];
    }
}
