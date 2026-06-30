<?php

use App\Http\Controllers\Admin\AdminDashboardController;
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

        Route::get('/appointments', [App\Http\Controllers\Admin\AppointmentController::class, 'index'])
            ->name('appointments.index');
        Route::delete('/appointments/{id}', [App\Http\Controllers\Admin\AppointmentController::class, 'destroy'])
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
    });

require __DIR__.'/settings.php';
