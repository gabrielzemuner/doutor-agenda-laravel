<?php

namespace App\Http\Controllers;

use App\Models\Clinic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClinicController extends Controller
{
    public function create()
    {
        return Inertia::render('clinics/create');
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|min:1']);

        $clinic = Clinic::create(['name' => $request->name]);
        $clinic->users()->attach(Auth::id());

        return redirect()->route('dashboard');
    }
}
