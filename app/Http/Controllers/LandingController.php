<?php

namespace App\Http\Controllers;

use App\Http\Middleware\HandleInertiaRequests;
use App\Models\LandingContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $content = LandingContent::getAllGrouped();

        // Get single source of truth sections order and visibility config
        $sections = app(HandleInertiaRequests::class)->share(request())['adminSections'] ?? [];

        return Inertia::render('welcome', [
            'content' => $content,
            'sections' => $sections,
        ]);
    }

    public function contact(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email',
            'institution' => 'required|string|max:100',
            'whatsapp' => 'required|string|max:20',
            'message' => 'nullable|string|max:1000',
        ]);

        // TODO: kirim email / simpan ke DB
        return back()->with('success', 'Pesan Anda berhasil dikirim!');
    }
}
