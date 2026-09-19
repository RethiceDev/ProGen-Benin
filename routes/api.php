<?php
use App\Http\Controllers\Api\EquipeController;
use App\Http\Controllers\Api\InterventionController;
use App\Http\Controllers\Api\ProjetController;
use App\Http\Controllers\Api\BenevoleController;

// Route pour l'équipe (le lien cliquable apparaîtra correctement dans VS Code)
Route::post('/equipes', [EquipeController::class, 'store']);
Route::post('/interventions', [InterventionController::class, 'store']);
Route::post('/projets', [ProjetController::class, 'store']);
Route::get('/projets', [ProjetController::class, 'listes']);
Route::get('/intervention', [InterventionController::class, 'listes']);
Route::get('/equipes', [EquipeController::class, 'listes_equipes']);
Route::get('/benevoles', [BenevoleController::class, 'listes_benevoles']);

