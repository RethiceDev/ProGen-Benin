<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Projet;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SIteController extends Controller
{
   
    public function site(){
            return response()->json(
                Projet :: latest()->get()
            );
            

    }

    

   
}