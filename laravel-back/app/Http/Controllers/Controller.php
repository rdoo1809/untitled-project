<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public function getData()
    {
        return response()->json(['message' => 'This is data from the backend']);
    }

   /* public function postData(Request $request)
    {
        $data = $request->all();
        return response()->json(['received' => $data]);
    } */
}
