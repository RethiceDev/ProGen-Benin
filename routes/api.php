<?php
use App\Http\Controllers\Api\EquipeController;
use App\Http\Controllers\Api\InterventionController;
use App\Http\Controllers\Api\ProjetController;

// Route pour l'équipe (le lien cliquable apparaîtra correctement dans VS Code)
Route::post('/equipes', [EquipeController::class, 'store']);
Route::post('/interventions', [InterventionController::class, 'store']);
Route::post('/projets', [ProjetController::class, 'store']);
