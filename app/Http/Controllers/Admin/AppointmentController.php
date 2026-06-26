<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
        // Mark all unread appointments as read when entering this page
        Appointment::where('is_read', false)->update(['is_read' => true]);

        $appointments = Appointment::orderBy('scheduled_at', 'desc')->get();

        return Inertia::render('Admin/Appointments', [
            'appointments' => $appointments,
        ]);
    }

    public function destroy($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();

        return back()->with('success', 'Jadwal demo berhasil dihapus.');
    }
}
