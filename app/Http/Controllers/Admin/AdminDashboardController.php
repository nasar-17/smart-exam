<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AppointmentService;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function __construct(
        private AppointmentService $appointmentService
    ) {}

    public function index(): Response
    {
        $data = $this->appointmentService->getDashboardData();

        return Inertia::render('Admin/Dashboard', $data);
    }

    public function settings(): Response
    {
        return Inertia::render('Admin/Settings');
    }
}
