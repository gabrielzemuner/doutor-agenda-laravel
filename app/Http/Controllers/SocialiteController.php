<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Socialite;
use Pest\Support\Str;

class SocialiteController extends Controller
{
    public function redirect()
    {
        /** @var \Laravel\Socialite\Two\GoogleProvider $driver */
        $driver = Socialite::driver('google');
        return $driver->stateless()->redirect();
    }

    public function callback()
    {
        try {
            /** @var \Laravel\Socialite\Two\GoogleProvider $driver */
            $driver = Socialite::driver('google');
            $googleUser = $driver->stateless()->user();
            // dd($googleUser);
        } catch (\Exception $e) {
            return redirect()->route('login')->withErrors(['google' => 'Erro ao autenticar com Google.']);
            // return redirect()->route('login')->with('status', 'Erro ao autenticar com Google.');
        }

        $user = User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'password' => bcrypt(Str::random(24)),
                'avatar_url' => $googleUser->getAvatar(),
                'is_google_user' => true,
            ]
        );

        Auth::login($user);
        return redirect()->route('dashboard');
    }
}
