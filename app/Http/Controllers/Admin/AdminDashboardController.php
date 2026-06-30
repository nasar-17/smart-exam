<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $startDate = now()->subDays(6)->startOfDay();
        $dailyCounts = Appointment::query()
            ->where('created_at', '>=', $startDate)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as total')
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('total', 'date');

        $chartData = collect(range(0, 6))->map(function ($day) use ($startDate, $dailyCounts) {
            $date = $startDate->copy()->addDays($day);
            $dateKey = $date->toDateString();

            return [
                'label' => $date->locale('id')->translatedFormat('d M'),
                'total' => (int) ($dailyCounts[$dateKey] ?? 0),
            ];
        })->values();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalAppointments' => Appointment::count(),
                'unreadAppointments' => Appointment::where('is_read', false)->count(),
                'todayAppointments' => Appointment::whereDate('created_at', today())->count(),
                'scheduledAppointments' => Appointment::where('scheduled_at', '>=', now())->count(),
            ],
            'chartData' => $chartData,
            'latestAppointments' => Appointment::latest()->limit(5)->get(['id', 'name', 'email', 'institution', 'scheduled_at', 'created_at']),
        ]);
    }

    public function settings()
    {
        return Inertia::render('Admin/Settings');
    }
}
