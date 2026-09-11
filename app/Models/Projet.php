<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'detail',
        'date_debut', // AJOUT
        'date_fin',   // AJOUT
        'statut',
        'media',
    ];
}
