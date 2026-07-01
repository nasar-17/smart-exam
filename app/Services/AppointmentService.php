<?php

namespace App\Services;

use App\Events\AppointmentCreated;
use App\Repositories\AppointmentRepository;
use Illuminate\Support\Facades\Event;

class AppointmentService
{
    public function __construct(
        private AppointmentRepository $appointmentRepository
    ) {}

    public function create(array $data): array
    {
        $appointment = $this->appointmentRepository->create($data);

        Event::dispatch(new AppointmentCreated($appointment));

        return [
            'success' => true,
            'message' => 'Demo jadwal aplikasi berhasil disimpan. Kami akan segera menghubungi Anda!',
        ];
    }

    public function getAllForAdmin(): array
    {
        return [
            'appointments' => $this->appointmentRepository->getAll(),
        ];
    }

    public function markAllAsRead(): void
    {
        $this->appointmentRepository->markAllAsRead();
    }

    public function delete(int $id): array
    {
        $deleted = $this->appointmentRepository->delete($id);

        if (! $deleted) {
            return [
                'success' => false,
                'message' => 'Jadwal demo tidak ditemukan.',
            ];
        }

        return [
            'success' => true,
            'message' => 'Jadwal demo berhasil dihapus.',
        ];
    }

    public function getDashboardStats(): array
    {
        return [
            'totalAppointments' => $this->appointmentRepository->getCount(),
            'unreadAppointments' => $this->appointmentRepository->getUnreadCount(),
            'todayAppointments' => $this->appointmentRepository->getTodayCount(),
            'scheduledAppointments' => $this->appointmentRepository->getScheduledCount(),
        ];
    }

    public function getChartData(): array
    {
        $startDate = now()->subDays(6)->startOfDay();
        $dailyCounts = $this->appointmentRepository->getDailyCountsSince($startDate);

        return collect(range(0, 6))->map(function ($day) use ($startDate, $dailyCounts) {
            $date = $startDate->copy()->addDays($day);
            $dateKey = $date->toDateString();

            return [
                'label' => $date->locale('id')->translatedFormat('d M'),
                'total' => (int) ($dailyCounts[$dateKey] ?? 0),
            ];
        })->values()->toArray();
    }

    public function getLatestAppointments(int $limit = 5): array
    {
        return $this->appointmentRepository->getLatest($limit)->toArray();
    }

    public function getDashboardData(): array
    {
        return [
            'stats' => $this->getDashboardStats(),
            'chartData' => $this->getChartData(),
            'latestAppointments' => $this->getLatestAppointments(),
        ];
    }
}
