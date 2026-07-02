<?php

namespace App\Repositories;

use App\Models\LandingContent;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

class LandingContentRepository
{
    private array $validSections = [
        'navbar', 'hero', 'stats', 'about', 'features',
        'howitworks', 'pricing', 'testimonials', 'cta', 'contact', 'footer',
    ];

    public function getFieldsBySection(string $section): Collection
    {
        return LandingContent::where('section', $section)
            ->orderBy('order')
            ->get();
    }

    public function updateField(string $section, string $key, mixed $value): bool
    {
        $field = LandingContent::where('section', $section)
            ->where('key', $key)
            ->first();

        if (! $field) {
            return false;
        }

        $encodedValue = is_array($value) ? json_encode($value) : $value;

        return $field->update(['value' => $encodedValue]);
    }

    public function updateMultipleFields(string $section, array $fields): void
    {
        foreach ($fields as $field) {
            $this->updateField($section, $field['key'], $field['value']);
        }
    }

    public function updateVisibility(string $section, bool $isVisible): int
    {
        return LandingContent::where('section', $section)->update([
            'is_visible' => $isVisible,
        ]);
    }

    public function reorderSections(array $order): void
    {
        foreach ($order as $idx => $sectionKey) {
            LandingContent::where('section', $sectionKey)->update([
                'section_order' => $idx + 1,
            ]);
        }
    }

    public function getAllGrouped(): array
    {
        return Cache::rememberForever('landing_content_grouped', function () {
            return LandingContent::all()
                ->groupBy('section')
                ->map(function ($items) {
                    return $items->mapWithKeys(function ($item) {
                        $value = $item->type === 'json'
                            ? json_decode($item->value, true)
                            : $item->value;

                        return [$item->key => $value];
                    });
                })
                ->toArray();
        });
    }

    public function flushCache(): void
    {
        Cache::forget('landing_content_grouped');
    }

    public function getSection(string $section): array
    {
        return LandingContent::where('section', $section)
            ->orderBy('order')
            ->get()
            ->mapWithKeys(function ($item) {
                $value = $item->type === 'json'
                    ? json_decode($item->value, true)
                    : $item->value;

                return [$item->key => $value];
            })
            ->toArray();
    }

    public function set(string $section, string $key, mixed $value): void
    {
        $isJson = is_array($value);
        LandingContent::updateOrCreate(
            ['section' => $section, 'key' => $key],
            ['value' => $isJson ? json_encode($value) : $value]
        );
    }

    public function isValidSection(string $section): bool
    {
        return in_array($section, $this->validSections);
    }
}
