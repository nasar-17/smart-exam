<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Repositories\LandingContentRepository;
use App\Services\LandingContentService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function __construct(
        private LandingContentRepository $landingContentRepository,
        private LandingContentService $landingContentService,
    ) {}

    public function index(): Response
    {
        $content = $this->landingContentRepository->getAllGrouped();
        $sections = $this->landingContentService->getAdminSections();

        return Inertia::render('welcome', [
            'content' => $content,
            'sections' => $sections,
        ]);
    }

    public function contact(ContactRequest $request): RedirectResponse
    {
        // TODO: kirim email / simpan ke DB
        return back()->with('success', 'Pesan Anda berhasil dikirim!');
    }
}
