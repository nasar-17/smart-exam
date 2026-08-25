<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminSettingsController;
use App\Http\Controllers\Admin\AppointmentController as AdminAppointmentController;
use App\Http\Controllers\Admin\SectionController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;

// ── LANDING PAGE (publik) ────────────────────────────
Route::get('/', [LandingController::class, 'index'])->name('home');
Route::post('/contact', [LandingController::class, 'contact'])->name('contact.send');
Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments.store');

// ── ADMIN PANEL (protected) ──────────────────────────
Route::prefix('admin')
    ->middleware(['auth', 'admin'])
    ->name('admin.')
    ->group(function () {
        Route::get('/', [AdminDashboardController::class, 'index'])
            ->name('dashboard');

        Route::get('/settings', [AdminDashboardController::class, 'settings'])
            ->name('settings');

        Route::get('/appointments', [AdminAppointmentController::class, 'index'])
            ->name('appointments.index');
        Route::get('/appointments/export', [AdminAppointmentController::class, 'export'])
            ->name('appointments.export');
        Route::delete('/appointments/{id}', [AdminAppointmentController::class, 'destroy'])
            ->name('appointments.destroy');

        Route::get('/sections/{section}', [SectionController::class, 'edit'])
            ->name('sections.edit');

        Route::post('/sections/{section}', [SectionController::class, 'update'])
            ->name('sections.update');

        Route::post('/sections-reorder', [SectionController::class, 'reorder'])
            ->name('sections.reorder');

        Route::post('/sections-toggle-visibility', [SectionController::class, 'toggleVisibility'])
            ->name('sections.toggle-visibility');

        Route::post('/upload-image', [SectionController::class, 'uploadImage'])
            ->name('upload.image');

        Route::get('/settings-akun', [AdminSettingsController::class, 'edit'])
            ->name('settings-akun.edit');
        Route::patch('/settings-akun/profile', [AdminSettingsController::class, 'updateProfile'])
            ->name('settings-akun.profile');
        Route::put('/settings-akun/password', [AdminSettingsController::class, 'updatePassword'])
            ->name('settings-akun.password');
    });

require __DIR__.'/settings.php';
