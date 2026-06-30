<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLandingSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'fields' => 'required|array',
            'fields.*.key' => 'required|string',
            'fields.*.value' => 'nullable',
        ];
    }
}