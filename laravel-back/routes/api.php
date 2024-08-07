<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


Route::middleware(['guest'])->group(function (){
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->name('password.email');
    Route::get('/reset-password/{token}/{email}', [AuthController::class, 'redirectBack'])->name('password.reset');
    Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.update');
    //
    Route::post('/register', [ApiController::class, 'registerUser'])->name('registerUser');
    Route::post('/login', [ApiController::class, 'loginUser'])->name('loginUser');
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/private', [ApiController::class, 'getData'])->name('private');
    Route::patch('/update-user', [ApiController::class, 'updateUser'])->name('update-user');
    Route::delete('/delete-user', [ApiController::class, 'deleteUser'])->name('delete-user');
});

Route::get('/public', [ApiController::class, 'getData'])->name('getData');


