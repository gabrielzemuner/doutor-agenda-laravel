<?php

use App\Models\Clinic;
use App\Models\User;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $clinic = Clinic::create(['name' => 'Clínica Teste']);
    $clinic->users()->attach($user->id);
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});
