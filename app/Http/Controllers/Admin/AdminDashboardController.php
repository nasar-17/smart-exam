<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AppointmentService;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function __construct(
        private AppointmentService $appointmentService
    ) {}

    public function index()
    {
        $data = $this->appointmentService->getDashboardData();

        return Inertia::render('Admin/Dashboard', $data);
    }

    public function settings()
    {
        return Inertia::render('Admin/Settings');
    }
}