<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contacter;
use Illuminate\Http\Request;

class ContactFormulaire extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|string',
            'sujet' => 'required|string',
            'message' => 'required|string',
        ]);

        

        $contacter = Contacter::create($validated);

        return redirect()->back()->with('success','Message envoyer. Le reste du processus ce fera par mail. Merci !');
    }

    /*public function benevoles(){
        $benevoles = Benevole :: all();
        
        return response()->json([
            'message' => 'Listes des candidature benevoles',
            'benevoles' => $benevoles
        ], 201);
    }*/
}