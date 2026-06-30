<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAppointmentRequest;
use App\Services\AppointmentService;

class AppointmentController extends Controller
{
    public function __construct(
        private AppointmentService $appointmentService
    ) {}

    public function store(StoreAppointmentRequest $request)
    {
        $result = $this->appointmentService->create($request->validated());

        return back()->with('success', $result['message']);
    }
}