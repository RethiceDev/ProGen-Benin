<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Projet;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProjetController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'detail' => 'nullable|string',
            'date_debut' => 'required|date', // AJOUT DE LA VALIDATION
            'date_fin' => 'required|date|after_or_equal:date_debut', // AJOUT (vérifie que la fin est après ou égale au début)
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

    public function les_projets_en_cours(){
        $aujourdhui = Carbon::today();

         $projets_en_cours = Projet::whereNotNull('date_debut') // on ignore les projets sans date
            ->whereNotNull('date_fin')
            ->whereDate('date_debut', '<=', $aujourdhui)
            ->whereDate('date_fin', '>=', $aujourdhui)
            ->orderBy('date_fin', 'asc') // les plus urgents en premier
            ->get();

            $les_projets_termine = Projet::where('date_fin','<',$aujourdhui)
            ->get();

         return view('projects',compact('projets_en_cours','les_projets_termine'));
    }

   
}