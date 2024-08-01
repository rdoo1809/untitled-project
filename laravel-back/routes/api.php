<?php

use App\Http\Controllers\ApiController;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/private', [ApiController::class, 'getData'])->name('private');
    Route::patch('/update-user', [ApiController::class, 'updateUser'])->name('update-user');
    Route::delete('/delete-user', [ApiController::class, 'deleteUser'])->name('delete-user');
});

Route::get('/public', [ApiController::class, 'getData'])->name('getData');
Route::post('/register', [ApiController::class, 'registerUser'])->name('registerUser');
Route::post('/login', [ApiController::class, 'loginUser'])->name('loginUser');


//called by click of forgot password link - #1
//vals email and sends reset link
Route::post('/forgot-password', function (Request $request) {
    $request->validate(['email' => 'required|email']);
    $status = Password::sendResetLink(
        $request->only('email')
    );

    return $status === Password::RESET_LINK_SENT
        ? back()->with(['status' => __($status)])
        : back()->withErrors(['email' => __($status)]);
})->middleware('guest')->name('password.email');

#2 - recieve email lnk

//email link route with token
Route::get('/reset-password/{token}', function (string $token) {

    return redirect("http://localhost:3000/reset-password?token=$token");

    //return view('auth.reset-password', ['token' => $token]);
})->middleware('guest')->name('password.reset');

//#4 - handles submission of reset form
Route::post('/reset-password', function (Request $request) {
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:8',     //|confirmed
    ]);

    $status = Password::reset(
        $request->only('email', 'password', 'password', 'token'),

        function (User $user, string $password) {
            $user->forceFill([
                'password' => Hash::make($password)
            ])->setRememberToken(Str::random(60));

            $user->save();

            event(new PasswordReset($user));
        }
    );

    return $status === Password::PASSWORD_RESET
        ? redirect()->route('http://localhost:3000/login')->with('status', __($status))
        : back()->withErrors(['email' => [__($status)]]);
})->middleware('guest')->name('password.update');


