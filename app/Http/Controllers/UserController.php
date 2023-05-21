<?php

namespace App\Http\Controllers;
// use Illuminate\Validation\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
     public function __construct()
        {
            $this->middleware('auth:api', ['except' => ['register']]);
        }
//
public function register(Request $request){


 $validator= Validator::make($request->all(),[
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:6',
        'tel' => 'required|string|max:20',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    if($validator->fails()){
        return response()->json($validator->errors(),400);
    }

    $imagePath = null;
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $imagePath = $image->storeAs('images', $imageName, 'public');
    }

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'tel' => $request->tel,
        'image' => $imagePath
    ]);
     return response()->json([
        'message'=>'User registered succes',
        'User'=>$user
     ]);
}
}
