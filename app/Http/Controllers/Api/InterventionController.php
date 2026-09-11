<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use Illuminate\Http\Request;

class InterventionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'statut' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('interventions', 'public');
            $validated['image'] = $path;
        }

        $intervention = Intervention::create($validated);

        return response()->json([
            'message' => 'Intervention enregistrée avec succès !',
            'data' => $intervention
        ], 201);
    }
}