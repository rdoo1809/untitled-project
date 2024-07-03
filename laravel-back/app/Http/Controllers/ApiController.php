<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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

     public function registerUser(Request $request): JsonResponse
     {
         $data = $request->all();
         return response()->json(['received' => $data]);
     }
}
