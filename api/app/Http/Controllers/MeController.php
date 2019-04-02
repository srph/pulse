<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class MeController extends Controller
{
    public function register(\App\Http\Requests\RegisterUser $request) {
        $user = new User([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => $request->get('password'),
        ]);
        $user->save();

        return response()->json($user);
    }

    public function me(Request $request) {
        return response()->json(
            $request->user()
        );
    }
}
