<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AppointmentService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AppointmentController extends Controller
{
    public function __construct(
        private AppointmentService $appointmentService
    ) {}

    public function index(): Response
    {
        $this->appointmentService->markAllAsRead();
        $data = $this->appointmentService->getAllForAdmin();

        return Inertia::render('Admin/Appointments', $data);
    }

    public function destroy(int $id): RedirectResponse
    {
        $result = $this->appointmentService->delete($id);

        return back()->with($result['success'] ? 'success' : 'error', $result['message']);
    }
}
