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
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    /**
     * Display a listing of the resource.
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Authentication passed
            $user = Auth::user();
            $token = JWTAuth::fromUser($user);

            return response()->json([
                'token' => $token,
                'user' => $user,
            ], 200);
        }

        // Authentication failed
        return response()->json(['error' => 'Invalid Email or Password'], 401);
    }

    public function register(Request $request)
    {


        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'tel' => 'required|string|max:20|unique:users',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }


        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'tel' => $request->tel,
            'account_type'=>$request->type,
            'image' => null
        ]);
        $token = JWTAuth::fromUser($user);
        
        return response()->json([
            'message' => 'User registered succes',
            'User' => $user,
            'token' => $token
        ],200);
    }

    public function logout()

    {
        //
        Auth::logout();
    }

    public function userProfile()
    {
        return response()->json(auth()->user());
    }



    protected function createNewToken($token)
    {
        //     return response()->json([
        //         'access_token' => $token,
        //         'token_type' => 'bearer',
        //         // 'expires_in' => auth()->factory()->getTTL() * 60,
        //         'user' => auth()->user()
        //     ]);
    }
}
