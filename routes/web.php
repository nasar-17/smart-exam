<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\SectionController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;

// ── LANDING PAGE (publik) ────────────────────────────
Route::get('/', [LandingController::class, 'index'])->name('home');
Route::post('/contact', [LandingController::class, 'contact'])->name('contact.send');

// ── ADMIN PANEL (protected) ──────────────────────────
Route::prefix('admin')
    ->middleware(['auth', 'admin'])
    ->name('admin.')
    ->group(function () {
        Route::get('/', [AdminDashboardController::class, 'index'])
            ->name('dashboard');

        Route::get('/sections/{section}', [SectionController::class, 'edit'])
            ->name('sections.edit');

        Route::post('/sections/{section}', [SectionController::class, 'update'])
            ->name('sections.update');

        Route::post('/upload-image', [SectionController::class, 'uploadImage'])
            ->name('upload.image');
    });

require __DIR__.'/settings.php';
