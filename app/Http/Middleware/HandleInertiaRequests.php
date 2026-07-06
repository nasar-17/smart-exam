<?php

namespace App\Http\Middleware;

use App\Repositories\AppointmentRepository;
use App\Services\LandingContentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

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
            'adminSections' => app(LandingContentService::class)->getAdminSections(),
            'appointmentCount' => $request->user() ? app(AppointmentRepository::class)->getUnreadCount() : 0,
            'contentUpdatedAt' => Cache::get('content_updated_at', 0),
        ];
    }
}
