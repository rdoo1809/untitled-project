<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        //query for email to make sure its an account

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? back()->with(['status' => __($status),
                            'email' => $request['email']])
            : back()->withErrors(['email' => __($status)]);
    }

    public function redirectBack(string $token, string $email)
    {
        $email='blank';
        return redirect("http://localhost:3000/reset-password?token=$token?email=$email");
    }

    public function resetPassword(Request $request)
    {
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
    }
}
