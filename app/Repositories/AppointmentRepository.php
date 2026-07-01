<?php

namespace App\Repositories;

use App\Models\Appointment;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Collection;

class AppointmentRepository
{
    public function create(array $data): Appointment
    {
        return Appointment::create($data);
    }

    public function findById(int $id): ?Appointment
    {
        return Appointment::find($id);
    }

    public function getAll(): Collection
    {
        return Appointment::orderBy('scheduled_at', 'desc')->get();
    }

    public function getLatest(int $limit = 5): Collection
    {
        return Appointment::latest()->limit($limit)->get(['id', 'name', 'email', 'institution', 'scheduled_at', 'created_at']);
    }

    public function getUnreadCount(): int
    {
        return Appointment::where('is_read', false)->count();
    }

    public function getTodayCount(): int
    {
        return Appointment::whereDate('created_at', today())->count();
    }

    public function getScheduledCount(): int
    {
        return Appointment::where('scheduled_at', '>=', now())->count();
    }

    public function getCount(): int
    {
        return Appointment::count();
    }

    public function markAllAsRead(): void
    {
        Appointment::where('is_read', false)->update(['is_read' => true]);
    }

    public function delete(int $id): bool
    {
        $appointment = $this->findById($id);

        if (! $appointment) {
            return false;
        }

        return $appointment->delete();
    }

    public function getDailyCountsSince(CarbonInterface $startDate): \Illuminate\Support\Collection
    {
        return Appointment::query()
            ->where('created_at', '>=', $startDate)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as total')
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('total', 'date');
    }
}
