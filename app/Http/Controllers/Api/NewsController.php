<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Projet;
use Carbon\Carbon;
use Illuminate\Http\Request;

class NewsController extends Controller
{

    public function les_projets_en_cours(){
        $aujourdhui = Carbon::today();

         $projets_en_cours = Projet::whereNotNull('date_debut') // on ignore les projets sans date
            ->whereNotNull('date_fin')
            ->whereDate('date_debut', '<=', $aujourdhui)
            ->whereDate('date_fin', '>=', $aujourdhui)
            ->orderBy('date_fin', 'asc') // les plus urgents en premier
            ->get();

            /*$les_projets_termine = Projet::where('date_fin','<',$aujourdhui)
            ->get();*/

         return view('news',compact('projets_en_cours'));
         
    }
    public function details($id){
        $details = Projet::find($id);
        return view('detail',compact('details'));
    }
   
}