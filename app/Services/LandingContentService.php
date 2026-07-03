<?php

namespace App\Services;

use App\Models\LandingContent;
use App\Repositories\LandingContentRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

class LandingContentService
{
    public function __construct(
        private LandingContentRepository $landingContentRepository
    ) {}

    public function getAdminSections(): array
    {
        // Default sections and details
        $defaultSections = [
            'navbar' => ['label' => 'Navbar',       'icon' => 'layout',        'desc' => 'Brand name, CTA button', 'default_order' => 1],
            'hero' => ['label' => 'Hero',          'icon' => 'image',         'desc' => 'Judul, subtitle, CTA, background', 'default_order' => 2],
            'stats' => ['label' => 'Stats Bar',     'icon' => 'bar-chart-2',   'desc' => '4 angka statistik', 'default_order' => 3],
            'about' => ['label' => 'Tentang',       'icon' => 'info',          'desc' => 'Narasi perusahaan, gambar', 'default_order' => 4],
            'features' => ['label' => 'Fitur',         'icon' => 'star',          'desc' => '8 feature card', 'default_order' => 5],
            'howitworks' => ['label' => 'Cara Kerja',    'icon' => 'list-ordered',  'desc' => '4 langkah', 'default_order' => 6],
            'pricing' => ['label' => 'Harga',         'icon' => 'credit-card',   'desc' => '3 paket harga', 'default_order' => 7],
            'testimonials' => ['label' => 'Testimoni',     'icon' => 'message-square', 'desc' => '6 testimoni', 'default_order' => 8],
            'cta' => ['label' => 'CTA Section',   'icon' => 'zap',           'desc' => 'Judul, CTA, trust badge', 'default_order' => 9],
            'contact' => ['label' => 'Kontak',        'icon' => 'phone',         'desc' => 'Email, WA, alamat, jam', 'default_order' => 10],
            'footer' => ['label' => 'Footer',        'icon' => 'align-justify', 'desc' => 'Tagline, copyright, sosial media', 'default_order' => 11],
        ];

        // Fetch custom order and visibility from DB
        $dbMeta = LandingContent::select('section', 'section_order', 'is_visible')
            ->get()
            ->groupBy('section')
            ->map(function ($items) {
                $first = $items->first();

                return [
                    'section_order' => (int) ($first->section_order ?? 0),
                    'is_visible' => (bool) ($first->is_visible ?? true),
                ];
            })
            ->toArray();

        $sections = [];
        foreach ($defaultSections as $key => $info) {
            $meta = $dbMeta[$key] ?? [];
            $order = isset($meta['section_order']) && $meta['section_order'] > 0 ? $meta['section_order'] : $info['default_order'];
            $visible = isset($meta['is_visible']) ? $meta['is_visible'] : true;

            $sections[] = [
                'key' => $key,
                'label' => $info['label'],
                'icon' => $info['icon'],
                'desc' => $info['desc'],
                'order' => $order,
                'is_visible' => $visible,
            ];
        }

        // Sort by order ascending
        usort($sections, fn ($a, $b) => $a['order'] <=> $b['order']);

        return $sections;
    }

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
        $this->landingContentRepository->flushCache();

        return [
            'success' => true,
            'message' => "Section '{$section}' berhasil disimpan.",
        ];
    }

    public function uploadImage(UploadedFile $image, ?string $oldImageUrl = null): array
    {
        // Hapus file lama jika ada
        if ($oldImageUrl) {
            $oldPath = str_replace(Storage::url(''), '', $oldImageUrl);
            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
        }

        // Simpan file sementara
        $path = $image->store('landing', 'public');
        $fullPath = Storage::disk('public')->path($path);

        // Resize gambar — max 2560px lebar (covers 4K), quality 92
        try {
            $img = Image::decodePath($fullPath);
            $img->scaleDown(width: 2560);
            $img->save(null, ['quality' => 92]);
        } catch (\Exception $e) {
            report($e);
        }

        $url = Storage::url($path);

        return [
            'url' => $url,
        ];
    }

    public function reorderSections(array $order): array
    {
        $this->landingContentRepository->reorderSections($order);
        $this->landingContentRepository->flushCache();

        return [
            'success' => true,
            'message' => 'Urutan section berhasil diperbarui.',
        ];
    }

    public function toggleVisibility(string $section, bool $isVisible): array
    {
        $this->landingContentRepository->updateVisibility($section, $isVisible);
        $this->landingContentRepository->flushCache();

        $status = $isVisible ? 'ditampilkan' : 'disembunyikan';

        return [
            'success' => true,
            'message' => "Section '{$section}' berhasil {$status}.",
        ];
    }
}
