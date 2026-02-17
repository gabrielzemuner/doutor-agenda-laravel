<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertDoctorRequest;
use App\Models\Doctor;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DoctorController extends Controller
{
    public function index()
    {
        $doctors = Auth::user()->clinic->doctors()->latest()->get();

        return Inertia::render('doctors/index', [
            'doctors' => $doctors,
        ]);
    }

    public function store(UpsertDoctorRequest $request)
    {
        $data = $request->validated();
        $data['clinic_id'] = Auth::user()->clinic->id;

        Doctor::create($data);

        return back()->with('success', 'Médico adicionado com sucesso.');
    }

    public function update(UpsertDoctorRequest $request, Doctor $doctor)
    {
        // Garantir que o doctor pertence à clínica do user
        abort_unless($doctor->clinic_id === Auth::user()->clinic->id, 403);

        $data = $request->validated();

        $doctor->update($data);

        return back()->with('success', 'Médico atualizado com sucesso.');
    }

    public function destroy(Doctor $doctor)
    {
        abort_unless($doctor->clinic_id === Auth::user()->clinic->id, 403);

        $doctor->delete();

        return back()->with('success', 'Médico apagado com sucesso.');
    }
}
