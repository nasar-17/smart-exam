<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LandingContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SectionController extends Controller
{
    private array $validSections = [
        'navbar', 'hero', 'stats', 'about', 'features',
        'howitworks', 'pricing', 'testimonials', 'cta', 'contact', 'footer',
    ];

    public function edit(string $section)
    {
        abort_unless(in_array($section, $this->validSections), 404);

        $fields = LandingContent::where('section', $section)
            ->orderBy('order')
            ->get()
            ->map(fn ($item) => [
                'key'   => $item->key,
                'value' => $item->type === 'json'
                    ? json_decode($item->value, true)
                    : $item->value,
                'type'  => $item->type,
                'label' => $item->label,
                'order' => $item->order,
            ]);

        return Inertia::render('Admin/SectionEditor', [
            'section' => $section,
            'fields'  => $fields,
        ]);
    }

    public function update(Request $request, string $section)
    {
        abort_unless(in_array($section, $this->validSections), 404);

        $data = $request->validate([
            'fields'         => 'required|array',
            'fields.*.key'   => 'required|string',
            'fields.*.value' => 'nullable',
        ]);

        foreach ($data['fields'] as $field) {
            $existing = LandingContent::where('section', $section)
                ->where('key', $field['key'])
                ->first();

            if (! $existing) {
                continue;
            }

            $value = is_array($field['value'])
                ? json_encode($field['value'])
                : $field['value'];

            $existing->update(['value' => $value]);
        }

        return back()->with('success', "Section '{$section}' berhasil disimpan.");
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        $path = $request->file('image')->store('landing', 'public');
        $url  = Storage::url($path);

        return response()->json(['url' => $url]);
    }
}
