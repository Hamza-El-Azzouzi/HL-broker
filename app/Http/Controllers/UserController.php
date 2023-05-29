<?php

namespace App\Http\Controllers;
// use Illuminate\Validation\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
 
 
        //  $validator = Validator::make($request->all(), [
        //      'name' => 'required|string|max:255|unique:users',
        //      'email' => 'required|string|email|max:255|unique:users',
        //      'password' => 'required|string|min:6',
        //      'tel' => 'required|string|max:20|unique:users',
        //      'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        //  ]);
 
        //  if ($validator->fails()) {
        //      return response()->json($validator->errors(), 400);
        //  }
 
 
         $user = User::create([
             'name' => $request->name,
             'email' => $request->email,
             'password' => Hash::make($request->password),
             'tel' => $request->tel,
             'account_type' => $request->type,
             'image' => null,
             "adress" => null,
             "city" => null,
             "pays" => null,
             "urlfacebook" => null,
             "urlyoutube" => null,
             "urlinstegram" => null,
             "description" => null,
             "codezip" => null
         ]);
         $token = JWTAuth::fromUser($user);
 
         return response()->json([
             'message' => 'User registered succes',
             'User' => $user,
             'token' => $token
         ], 200);
     }
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

    
    


    public function profileupdate(Request $request, $id)
    {
      
    
        
        
    
     
    
        if ($request->hasFile('image')) {
            // Store the new image file
            $imagePath = $request->file('image');
            $imagePath->move('images/',$imagePath->getClientOriginalName());
            // $update['image'] =$imagePath->getClientOriginalName();
            // array_push($update,$imagePath->getClientOriginalName());
            // Delete the previous image file, if any
            // if ($user->image) {
            //     Storage::delete($user->image);
            // }
        }
        $update = [
            
            "adress" => $request->adress,
            "description" => $request->description,
            "urlfacebook" => $request->urlfacebook,
            "urlinstegram" => $request->urlinstegram,
            "urlyoutube" => $request->urlyoutube,
            "city" => $request->city,
            "pays" => $request->pays,
            "codezip" => $request->codezip,
            "image"=> $request->file('image')
        ];
        $user = User::where('id',$id)->update($update);;
       
    
        return response()->json([
            'status' => 200,
            'message' => 'User updated successfully',
            'resultat' => $update
        ], 200);
    }
    
   






//     public function profileupdateimage(Request $request, $id)
// {
//     $request->validate([
//         'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:42666600000',
//     ]);

//     if ($request->hasFile('image')) {
//         $image = $request->file('image');

//         // Vérifier l'extension du fichier
//         $extension = $image->getClientOriginalExtension();
//         $allowedExtensions = ['jpeg', 'png', 'jpg', 'gif', 'svg'];
//         if (!in_array($extension, $allowedExtensions)) {
//             return response()->json([
//                 'status' => 400,
//                 'message' => 'Invalid image format. Allowed formats: jpeg, png, jpg, gif, svg',
//             ], 400);
//         }

//         // Vérifier la taille du fichier
//         $maxSize = 42666600000; // En octets
//         if ($image->getSize() > $maxSize) {
//             return response()->json([
//                 'status' => 400,
//                 'message' => 'Image size exceeds the maximum allowed size.',
//             ], 400);
//         }

//         $imageName = $image->getClientOriginalName();
//         $image->move(public_path('images'), $imageName);

//         $update = [
//             'image' => 'images/' . $imageName,
//         ];

//         User::where('id', $id)->update($update);

//         return response()->json([
//             'status' => 200,
//             'message' => 'User image updated successfully',
//             'image' => $update['image'],
//         ], 200);
//     }
// }






    
}
