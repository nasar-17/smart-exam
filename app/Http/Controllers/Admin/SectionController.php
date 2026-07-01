<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateLandingSectionRequest;
use App\Services\LandingContentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SectionController extends Controller
{
    public function __construct(
        private LandingContentService $landingContentService
    ) {}

    public function edit(string $section): Response
    {
        $fields = $this->landingContentService->getFieldsForEdit($section);

        return Inertia::render('Admin/SectionEditor', [
            'section' => $section,
            'fields' => $fields,
        ]);
    }

    public function update(UpdateLandingSectionRequest $request, string $section): RedirectResponse
    {
        $result = $this->landingContentService->updateSection(
            $section,
            $request->validated()['fields']
        );

        return back()->with($result['success'] ? 'success' : 'error', $result['message']);
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        $result = $this->landingContentService->uploadImage(
            $request->file('image')
        );

        return response()->json($result);
    }

    public function reorder(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'order' => 'required|array',
            'order.*' => 'required|string',
        ]);

        $result = $this->landingContentService->reorderSections($data['order']);

        return back()->with($result['success'] ? 'success' : 'error', $result['message']);
    }

    public function toggleVisibility(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'section' => 'required|string',
            'is_visible' => 'required|boolean',
        ]);

        $result = $this->landingContentService->toggleVisibility(
            $data['section'],
            $data['is_visible']
        );

        return back()->with($result['success'] ? 'success' : 'error', $result['message']);
    }
}
