<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAppointmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'whatsapp' => 'required|string|max:30',
            'institution' => 'required|string|max:150',
            'scheduled_at' => 'required|date',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama lengkap wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'whatsapp.required' => 'Nomor WhatsApp wajib diisi.',
            'institution.required' => 'Nama institusi wajib diisi.',
            'scheduled_at.required' => 'Jadwal demo wajib diisi.',
        ];
    }
}