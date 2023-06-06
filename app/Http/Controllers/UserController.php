<?php

namespace App\Http\Controllers;
// use Illuminate\Validation\Validator;

use App\Mail\BanneEmail;
use App\Mail\UnBanneEmail;
use App\Mail\verficationEmail;
use App\Mail\VerificationCodeMail;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
// use Illuminate\Session\Store;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    /**
     * Display a listing of the resource.
     */
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
            'account_type' => $request->type,
            'image' => 'img_avatar.png'
        ]);

        // $verificationUrl = 'http://localhost:8000/api/EmailVerify/'.$user->id;
        Mail::to($request->email)->send(new verficationEmail($user->id));
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'You’re almost done! Verify you email',
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function profile($id)
    {
        $user = User::find($id);
        if ($user) {
            return response()->json(['status' => 200, 'user' => $user], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'User not found'
            ], 404);
        }
    }





    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        // $verificationCode = mt_rand(100000, 999999);
        $verificationCode = mt_rand(100000, 999999);

        if (Auth::attempt($credentials)) {
            if (Auth::check()) {
                $user = Auth::user();

                $token = JWTAuth::fromUser($user);
                    if($user->account_type === 'admin'){
                        return response()->json([
                            'token' => $token,
                            'user' => $user,
                        ], 200);
                    }else{
                        if($user->banned === 'true'){
                            return response()->json([
                               
                                'banne' => 'Your Account Was Suspended'
    
                            ], 200);
                        }else{
                            Mail::to($request->email)->send(new VerificationCodeMail($verificationCode));
                        $response = new Response('Login Successful');
                        $response->cookie('verification_code', $verificationCode, 60);
                        return response()->json([
                            'token' => $token,
                            'user' => $user,
                            'login' => $verificationCode

                        ], 200);
                        }
                        
                    }
            }
            return response()->json(['error' => 'Unauthenticated'], 400);
        }
        // Authentication failed
        return response()->json(['error' => 'Invalid Email or Password'], 400);
    }

    public function update(Request $request, $id)
    {

        $update = [
            'adresse' => $request->input('adresse'),
            'city' => $request->input('city'),
            'pays' => $request->input('pays'),
            'codezip' => $request->input('codezip'),
            'urlFb' => $request->input('urlFb'),
            'urlYtb' => $request->input('urlYtb'),
            'urlInsta' => $request->input('urlInsta'),
            'description' => $request->input('description'),



        ];
        User::where('id', $id)->update($update);
        return response()->json([
            'message' => 'Updated succefully',
            'result' => $update
        ]);
    }


    public function userProfile()
    {
        return response()->json(auth()->user());
    }




    public function verifyCode(Request $request)
    {
        $enteredCode = $request->cookie('verification_code');

        if ($enteredCode === $enteredCode) {
            return response()->json(['message' => 'Verification successful'], 200);
        } else {
            // Verification code is incorrect
            return response()->json(['error' => 'Incorrect verification code', "code" => $request->cookie('verification_code')], 401);
        }
    }
    public function EmailVerification($id)
    {
        $update = [
            'email_isVerified' => "true"
        ];
        User::where('id', $id)->update($update);

        return response()->json([
            'message' => 'verified successfully',

        ]);
    }

    public function showUsers()
    {
        // User::where('account_type','acheteur')->where('account_type','vendeur');
        $users = DB::table('users')->where('account_type','vendeur')->orWhere('account_type','acheteur')->get();
        return response()->json($users);
    }

    public function Banned($id)
    {
        $Banned =User::where('id',$id)->pluck('banned')->first();
    $user = User::where('id',$id)->get();
        if ( $Banned == 'false') {
            $update = [
                'banned' => 'true'
            ];
            User::where('id', $id)->update($update);
            Mail::to($user[0]->email)->send(new BanneEmail($user[0]->name));
        } else{
            $update = [
                'banned' => 'false'
            ];
            User::where('id', $id)->update($update);
            Mail::to($user[0]->email)->send(new UnBanneEmail($user[0]->name));
        }
    
        return response()->json([
            'success' => 'great work',
            'data' => $Banned
        ]);
    }

    public function getTotalUser(){
        $total = DB::table('users')->where('account_type','vendeur')->orWhere('account_type','acheteur')->count();
        return response()->json( $total );
     }

    public function logout()
    {
        auth()->logout();
    }
}
