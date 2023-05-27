<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/categorie', [App\Http\Controllers\CategorieController::class, 'index']);
Route::post('/categorie', [App\Http\Controllers\CategorieController::class, 'store']);
Route::resource('/article', App\Http\Controllers\ArticleController::class);
Route::get('/getArticle/{id}', [App\Http\Controllers\ArticleController::class, 'getArticle']);
Route::get('/getArticleForHome', [App\Http\Controllers\ArticleController::class, 'getArticleForHome']);

Route::put('/disponible/{id}', [App\Http\Controllers\ArticleController::class, 'Disponible']);

Route::middleware('jwt.auth')->get('/api/protected', function () {
    return response()->json(['message' => 'Protected route']);
});

Route::get('/articles/{id}/images', [App\Http\Controllers\ArticleController::class, 'images']);
Route::post('/sendVerificationCode', [App\Http\Controllers\UserController::class, 'sendVerificationCode']);
// Route::post('/verifyCode', [App\Http\Controllers\UserController::class, 'sendVerificationCode']);
Route::post('/verifyCode', [App\Http\Controllers\UserController::class, 'verifyCode']);


// Route::group([
//     'middleware' => 'api',
//     'prefix' => 'auth'
// ], function ($router) {
//     Route::post('/login', [App\Http\Controllers\UserController::class, 'login']);
//     Route::post('/register', [App\Http\Controllers\UserController::class, 'register']);
//     Route::post('/logout', [App\Http\Controllers\UserController::class, 'logout']);
//     Route::post('/refresh', [App\Http\Controllers\UserController::class, 'refresh']);
//     Route::get('/user-profile', [App\Http\Controllers\UserController::class, 'userProfile']);    
// });
Route::post('/register', [App\Http\Controllers\UserController::class, 'register']);
Route::post('/login', [App\Http\Controllers\UserController::class, 'login']);
Route::get('/userProfile', [App\Http\Controllers\UserController::class, 'userProfile']);
Route::put('/EmailVerify/{id}', [App\Http\Controllers\UserController::class, 'EmailVerification']);
Route::post('/logout', [App\Http\Controllers\UserController::class, 'logout']);


