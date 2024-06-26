<?php

use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Route;

Route::get('/get', [ApiController::class, 'getData'])->name('getData');
