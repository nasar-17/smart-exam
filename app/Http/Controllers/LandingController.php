<?php

namespace App\Http\Controllers;

use App\Models\LandingContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $content = LandingContent::getAllGrouped();

        return Inertia::render('welcome', [
            'content' => $content,
        ]);
    }

    public function contact(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:100',
            'email'       => 'required|email',
            'institution' => 'required|string|max:100',
            'whatsapp'    => 'required|string|max:20',
            'message'     => 'nullable|string|max:1000',
        ]);

        // TODO: kirim email / simpan ke DB
        return back()->with('success', 'Pesan Anda berhasil dikirim!');
    }
}
