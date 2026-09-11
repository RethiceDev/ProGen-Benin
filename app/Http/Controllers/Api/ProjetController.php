<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Projet;
use Illuminate\Http\Request;

class ProjetController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'detail' => 'nullable|string',
            'date_debut' => 'nullable|date', // AJOUT DE LA VALIDATION
            'date_fin' => 'nullable|date|after_or_equal:date_debut', // AJOUT (vérifie que la fin est après ou égale au début)
            'statut' => 'required|string',
            'media' => 'nullable|image|mimes:jpeg,png,jpg,webp,mp4|max:10240',
        ]);

        if ($request->hasFile('media')) {
            $path = $request->file('media')->store('projets', 'public');
            $validated['media'] = $path;
        }

        $projet = Projet::create($validated);

        return response()->json([
            'message' => 'Projet créé avec succès',
            'projet' => $projet
        ], 201);
    }
}