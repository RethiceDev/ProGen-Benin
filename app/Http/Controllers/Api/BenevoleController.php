<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Benevole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail; 
use App\Mail\ContactMail; 

class BenevoleController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string',
            'telephone' => 'required|string',
            'domaine' => 'required|string',
            'fichier' => 'required|file|mimes:pdf,doc,docx|max:5120',
        ]);

        if ($request->hasFile('fichier')) {
            $path = $request->file('fichier')->store('fichier', 'public');
            $validated['fichier'] = $path;
        }

        $benevole = Benevole::create($validated);

         Mail::to($request->email)->send(
            new ContactMail($path)
        );

        return redirect()->back()->with('success','Demande de Benevolat envoyer avec success. Le reste du processus ce fera par mail. Merci !');
    }

    public function benevoles(){
        $benevoles = Benevole :: all();
        
        return response()->json([
            'message' => 'Listes des candidature benevoles',
            'benevoles' => $benevoles
        ], 201);
    }

    public function listes_benevoles(){
            return response()->json(
                Benevole :: latest()->get()
            );
            

    }
}