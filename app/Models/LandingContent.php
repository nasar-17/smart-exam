<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LandingContent extends Model
{
    protected $fillable = ['section', 'key', 'value', 'type', 'label', 'order'];

    /**
     * Get all content grouped by section.
     * Return: ['hero' => ['title' => '...', 'subtitle' => '...'], ...]
     */
    public static function getAllGrouped(): array
    {
        return self::all()
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
    }

    /**
     * Get content for a single section.
     */
    public static function getSection(string $section): array
    {
        return self::where('section', $section)
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

    /**
     * Set or update a single key.
     */
    public static function set(string $section, string $key, mixed $value): void
    {
        $isJson = is_array($value);
        self::updateOrCreate(
            ['section' => $section, 'key' => $key],
            ['value' => $isJson ? json_encode($value) : $value]
        );
    }
}
