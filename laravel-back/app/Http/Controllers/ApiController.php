<?php

namespace App\Http\Controllers;

use App\Models\User;
use http\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use mysql_xdevapi\Exception;
use function Laravel\Prompts\error;

class ApiController extends Controller
{
    public function getData()
    {
        $data = [
            'message' => 'This is data from the backend',
            'status' => 'success',
            'user' => [
                'id' => 1,
                'name' => 'Sample Data'
            ]
        ];

        return response()->json($data);
    }


    public function loginUser(Request $request)
    {
        try {
            $attributes = request()->validate([
                'email' => ['required'],
                'password' => ['required']
            ]);

            $user = User::query()->where('email', $attributes['email'])->first();
            $userToken = $user->createToken('auth-token');
            Auth::login($user);

        } catch (Exception $e) {
            return response()->json([$e->getMessage()]);
        }

        return response()->json([
            'email' => $user->email,
            'name' => $user->name,
            'token' => $userToken->plainTextToken,
        ]);
    }

    public function registerUser(Request $request)
    {
        $attributes = request()->validate([
            'name' => ['required'],
            'email' => ['required'],
            'password' => ['required'],
        ]);

        $user = User::create($attributes);
        $userToken = $user->createToken('auth-token');

        Auth::login($user);

        return response()->json([
            'email' => $user->email,
            'name' => $user->name,
            'token' => $userToken->plainTextToken,
        ]);
    }

    public function getUserSettings(Request $request): JsonResponse
    {
        $request->header('Authorization');
//        $attributes = request()->validate([
//            'Email' => ['required'],
//        ]);

        //retrieve the current user
        //$user = User::query()->where('email', $attributes['email'])->first();

//        $data = [
//            'message' => 'Here is your user data...',
//            'status' => 'success',
//            'user' => [
//                'name' => $user->name,
//                'email' => $user->email,
//                'password' => $user->password,
//            ]
//        ];

        return response()->json($request);
    }

}
