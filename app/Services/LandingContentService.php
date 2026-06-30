<?php

namespace App\Services;

use App\Repositories\LandingContentRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class LandingContentService
{
    public function __construct(
        private LandingContentRepository $landingContentRepository
    ) {}

    public function getFieldsForEdit(string $section): array
    {
        abort_unless(
            $this->landingContentRepository->isValidSection($section),
            404
        );

        $fields = $this->landingContentRepository->getFieldsBySection($section);

        return $fields->map(fn ($item) => [
            'key' => $item->key,
            'value' => $item->type === 'json'
                ? json_decode($item->value, true)
                : $item->value,
            'type' => $item->type,
            'label' => $item->label,
            'order' => $item->order,
        ])->toArray();
    }

    public function updateSection(string $section, array $fields): array
    {
        abort_unless(
            $this->landingContentRepository->isValidSection($section),
            404
        );

        $this->landingContentRepository->updateMultipleFields($section, $fields);

        return [
            'success' => true,
            'message' => "Section '{$section}' berhasil disimpan.",
        ];
    }

    public function uploadImage(UploadedFile $image): array
    {
        $path = $image->store('landing', 'public');
        $url = Storage::url($path);

        return [
            'url' => $url,
        ];
    }

    public function reorderSections(array $order): array
    {
        $this->landingContentRepository->reorderSections($order);

        return [
            'success' => true,
            'message' => 'Urutan section berhasil diperbarui.',
        ];
    }

    public function toggleVisibility(string $section, bool $isVisible): array
    {
        $this->landingContentRepository->updateVisibility($section, $isVisible);

        $status = $isVisible ? 'ditampilkan' : 'disembunyikan';

        return [
            'success' => true,
            'message' => "Section '{$section}' berhasil {$status}.",
        ];
    }
}