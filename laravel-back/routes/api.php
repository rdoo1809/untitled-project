<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

                                //, 'auth-model:user'
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/private', [ApiController::class, 'getData'])->name('private');
});

Route::get('/public', [ApiController::class, 'getData'])->name('getData');
Route::post('/register', [ApiController::class, 'registerUser'])->name('registerUser');
Route::post('/login', [ApiController::class, 'loginUser'])->name('loginUser');



