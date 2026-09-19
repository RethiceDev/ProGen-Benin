<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Partenaire;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PartenaireController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'nullable|string',
            'telephone' => 'required|string', 
            'bio' => 'required|string', 
            'objet' => 'required|string',
            'fichier' => 'nullable|image|mimes:jpeg,png,jpg,webp,mp4|max:10240',
        ]);

        if ($request->hasFile('fichier')) {
            $path = $request->file('fichier')->store('partenaire', 'public');
            $validated['fichier'] = $path;
        }

        $partenaire = Partenaire::create($validated);

        return redirect()->back()->with('success','Votre demande de partenariat a ete envoyer');
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

    public function partenaires(){
        $partenaires = Partenaire :: all();
        
        return response()->json([
            'message' => 'Listes des partenaires',
            'partenaires' => $partenaires
        ], 201);
    }

    
}