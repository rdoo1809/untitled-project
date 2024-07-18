<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/private', [ApiController::class, 'getData'])->name('private');
    Route::get('/user-settings', [ApiController::class, 'getUserSettings'])->name('user-settings');
});

Route::get('/public', [ApiController::class, 'getData'])->name('getData');
Route::post('/register', [ApiController::class, 'registerUser'])->name('registerUser');
Route::post('/login', [ApiController::class, 'loginUser'])->name('loginUser');




