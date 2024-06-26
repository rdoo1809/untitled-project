<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiController extends Controller
{

    public function getData() : string
    {
        $data = [
            'message' => 'This is data from the backend',
            'status' => 'success',
            'data' => [
                'id' => 1,
                'name' => 'Sample Data'
            ]
        ];

        return '<div>hello</div>';

        //return response()->json($data);
    }

    /* public function postData(Request $request)
     {
         $data = $request->all();
         return response()->json(['received' => $data]);
     } */
}
