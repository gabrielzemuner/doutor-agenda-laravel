<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpsertDoctorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:1',
            'specialty' => 'required|string|min:1',
            'appointment_price_in_cents' => 'required|integer|min:1',
            'available_from_week_day' => 'required|integer|min:0|max:6',
            'available_to_week_day' => 'required|integer|min:0|max:6',
            'available_from_time' => 'required|date_format:H:i:s',
            'available_to_time' => 'required|date_format:H:i:s|after:available_from_time',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nome é obrigatório.',
            'specialty.required' => 'Especialidade é obrigatória.',
            'appointment_price_in_cents.required' => 'Preço da consulta é obrigatório.',
            'available_to_time.after' => 'O horário de início não pode ser anterior ao horário de término.',
        ];
    }
}
