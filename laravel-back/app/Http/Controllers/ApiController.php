<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use mysql_xdevapi\Exception;

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

    public function loginUser()
    {
        try {
            $attributes = request()->validate([
                'email' => ['required', 'email'],
                'password' => ['required']
            ]);

            $user = User::query()->where('email', $attributes['email'])->first();
            if (!$user || !Hash::check($attributes['password'], $user->password)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }

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
            'password' => ['required', 'min:8'],
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

    public function updateUser(Request $request): JsonResponse
    {
        $request->header('Authorization');
        $attributes = request()->validate([
            'name' => ['sometimes', 'string'],
            'email' => ['sometimes', 'email']
        ]);

        $user = auth()->user();
        $user->update($attributes);

        $data = [
            'message' => 'User updated successfully!',
            'status' => 'success',
            'user' => [
                'name' => $attributes['name'],
                'email' => $attributes['email']
            ]
        ];
        return response()->json($data);
    }

    public function deleteUser(Request $request): JsonResponse
    {
        $user = auth()->user();
        $name = $user->name;
        $user->delete();

        $data = [
            'message' => "User - " . $name . " - your account has been Deleted successfully!",
            'status' => 'success',
        ];
        return response()->json($data);
    }
}
