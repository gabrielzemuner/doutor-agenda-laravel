<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $fillable = [
        'clinic_id',
        'name',
        'avatar_image_url',
        'available_from_week_day',
        'available_to_week_day',
        'available_from_time',
        'available_to_time',
        'specialty',
        'appointment_price_in_cents',
    ];

    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
