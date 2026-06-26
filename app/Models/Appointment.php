<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = ['name', 'email', 'whatsapp', 'institution', 'scheduled_at', 'is_read'];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'is_read' => 'boolean',
    ];
}
