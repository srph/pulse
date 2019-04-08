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

    public function password(\App\Http\Requests\UpdateUserPassword $request) {
        $user = $request->user();
        $user->password = $request->get('new_password');
        $user->save();
        return response()->json($user);
    }

    public function avatar(\App\Http\Requests\UpdateUserAvatar $request) {
        $user = $request->user();
        $user->avatar = $request->get('avatar');
        $user->save();
        return response()->json($user);
    }

    public function update(\App\Http\Requests\UpdateUserProfile $request) {
        $user = $request->user();
        $user->email = $request->get('email');
        $user->name = $request->get('name');
        $user->save();
        return response()->json($user);
    }

    public function me(Request $request) {
        return response()->json(
            $request->user()
        );
    }
}
