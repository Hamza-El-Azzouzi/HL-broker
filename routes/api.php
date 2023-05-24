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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/categorie', [App\Http\Controllers\CategorieController::class, 'index']);
Route::post('/categorie', [App\Http\Controllers\CategorieController::class, 'store']);
Route::resource('/article', App\Http\Controllers\ArticleController::class);
Route::get('/getArticle', [App\Http\Controllers\ArticleController::class, 'getArticle']);
Route::get('/getArticleForHome', [App\Http\Controllers\ArticleController::class, 'getArticleForHome']);

Route::put('/disponible/{id}', [App\Http\Controllers\ArticleController::class, 'Disponible']);

Route::middleware('jwt.auth')->get('/api/protected', function () {
    return response()->json(['message' => 'Protected route']);
});

Route::get('/articles/{id}/images', [App\Http\Controllers\ArticleController::class, 'images']);


Route::post('/register', [App\Http\Controllers\UserController::class, 'register']);
Route::post('/profile', [App\Http\Controllers\UserController::class, 'profile']);
Route::post('/refresh', [App\Http\Controllers\UserController::class, 'refresh']);