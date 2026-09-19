<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\InterventionController;
use App\Http\Controllers\Api\ProjetController;
use App\Http\Controllers\Api\EquipeController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\PartenaireController;
use App\Http\Controllers\Api\BenevoleController;
use App\Http\Controllers\Api\ContactFormulaire;



/*/Route::get('/', function () {
    return view('index');
});*/


Route::get('/', [InterventionController::class, 'les_interventions']);

Route::get('/contact', function () {
    return view('contact');
});

Route::get('/partner', function () {
    return view('partner');
});
Route::post('/contacter', [ContactFormulaire::class, 'store']);


Route::post('/partenariat', [PartenaireController::class, 'store']);

Route::get('/projects', [ProjetController::class, 'les_projets_en_cours']);


Route::get('/support', function () {
    return view('support');
});

Route::post('/benevole',[BenevoleController::class, 'store']);

Route::get('/team',[EquipeController::class, 'menbres']);

Route::get('/news', [NewsController::class, 'les_projets_en_cours']);

Route::get('/about', function () {
    return view('about');
});

/*Route::get('/detail', function () {
    return view('detail');
});*/

Route::get('/detail/{id}', [NewsController::class, 'details']);

Route::get('/administrateur', function () {
    return view('admin/admin');
});