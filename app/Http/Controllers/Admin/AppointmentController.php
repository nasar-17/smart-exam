<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AppointmentService;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function __construct(
        private AppointmentService $appointmentService
    ) {}

    public function index()
    {
        $data = $this->appointmentService->getAllForAdmin();

        return Inertia::render('Admin/Appointments', $data);
    }

    public function destroy($id)
    {
        $result = $this->appointmentService->delete($id);

        return back()->with($result['success'] ? 'success' : 'error', $result['message']);
    }
}