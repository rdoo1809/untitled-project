<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    public function getData()
    {
        $data = [
            'message' => 'This is data from the backend',
            'status' => 'success',
            'data' => [
                'id' => 1,
                'name' => 'Sample Data'
            ]
        ];

        return response()->json($data);
    }

     public function registerUser(Request $request)
     {
         $attributes = request()->validate([
             'name' => ['required'],
             'email' => ['required'],
             'password' => ['required']
         ]);

         $user = User::create($attributes);
         Auth::login($user);

         return response()->json([
             'email' => $user->email,
             'name' => $user->name,
         ]);
     }
}
