<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'whatsapp' => 'required|string|max:30',
            'institution' => 'required|string|max:150',
            'scheduled_at' => 'required|date',
        ]);

        $appointment = Appointment::create($data);

        event(new \App\Events\AppointmentCreated($appointment));

        return back()->with('success', 'Demo jadwal aplikasi berhasil disimpan. Kami akan segera menghubungi Anda!');
    }
}
