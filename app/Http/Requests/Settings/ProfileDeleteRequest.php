<?php

namespace App\Http\Requests\Settings;

use App\Concerns\PasswordValidationRules;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ProfileDeleteRequest extends FormRequest
{
    use PasswordValidationRules;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if ($this->user()->is_google_user) {
            return [
                'email' => ['required', 'email'],
            ];
        }

        return [
            'password' => $this->currentPasswordRules(),
        ];
    }

    public function withValidator($validator): void
    {
        if ($this->user()->is_google_user) {
            $validator->after(function ($validator) {
                if ($this->email !== $this->user()->email) {
                    $validator->errors()->add('email', 'O e-mail não corresponde à sua conta.');
                }
            });
        }
    }
}
