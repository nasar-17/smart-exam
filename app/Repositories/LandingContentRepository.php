<?php

namespace App\Repositories;

use App\Models\LandingContent;
use Illuminate\Database\Eloquent\Collection;

class LandingContentRepository
{
    private array $validSections = [
        'navbar', 'hero', 'stats', 'about', 'features',
        'howitworks', 'pricing', 'testimonials', 'cta', 'contact', 'footer',
    ];

    public function getFieldsBySection(string $section): Collection
    {
        $query = LandingContent::where('section', $section);

        if ($section === 'hero') {
            $query->whereNotIn('key', ['cta_secondary_text', 'cta_secondary_link', 'hero_bg_image']);
        }

        return $query->orderBy('order')->get();
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

    public function isValidSection(string $section): bool
    {
        return in_array($section, $this->validSections);
    }
}