<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/get', [ApiController::class, 'getData'])->name('getData');

Route::post('/register', [ApiController::class, 'registerUser'])->name('registerUser');


