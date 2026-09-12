<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\InterventionController;
use App\Http\Controllers\Api\ProjetController;
use App\Http\Controllers\Api\EquipeController;

/*Route::get('/', function () {
    return view('index');
});*/


Route::get('/index', [InterventionController::class, 'les_interventions']);

Route::get('/contact', function () {
    return view('contact');
});

Route::get('/partner', function () {
    return view('partner');
});

Route::get('/projects', [ProjetController::class, 'les_projets_en_cours']);


Route::get('/support', function () {
    return view('support');
});

Route::get('/team',[EquipeController::class, 'menbres']);

Route::get('/news', function () {
    return view('news');
});

Route::get('/about', function () {
    return view('about');
});

Route::get('/detail', function () {
    return view('detail');
});

Route::get('/administrateur', function () {
    return view('admin/admin');
});