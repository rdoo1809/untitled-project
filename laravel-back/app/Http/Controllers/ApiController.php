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

    public function loginUser()
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
            'message' => "User - " . $name .  " - your account has been Deleted successfully!",
            'status' => 'success',
        ];
        return response()->json($data);
    }
}
