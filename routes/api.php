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

Route::resource('/panier', App\Http\Controllers\PanierController::class);


Route::delete('/panier/{id_user}/article/{id_article}', [App\Http\Controllers\PanierController::class,'deleteArticle']);

Route::get('/getArticle/{id}', [App\Http\Controllers\ArticleController::class, 'getArticle']);

Route::get('/getArtcleCategorie/{categorie}', [App\Http\Controllers\ArticleController::class, 'getArtcleCategorie']);
Route::get('/getArticleForHome', [App\Http\Controllers\ArticleController::class, 'getArticleForHome']);

Route::put('/disponible/{id}', [App\Http\Controllers\ArticleController::class, 'Disponible']);

Route::middleware('jwt.auth')->get('/api/protected', function () {
    return response()->json(['message' => 'Protected route']);
});

Route::get('/articles/{id}/images', [App\Http\Controllers\ArticleController::class, 'images']);

Route::get('/getArticlefiltered/{type?}/{categorie?}/{min?}/{max?}', [App\Http\Controllers\ArticleController::class, 'getArticlefiltered']);

Route::get('/articles/{id}/user', [App\Http\Controllers\ArticleController::class, 'User']);
Route::post('/sendVerificationCode', [App\Http\Controllers\UserController::class, 'sendVerificationCode']);
// Route::post('/verifyCode', [App\Http\Controllers\UserController::class, 'sendVerificationCode']);
Route::post('/verifyCode', [App\Http\Controllers\UserController::class, 'verifyCode']);


Route::put('/update/{id}',[App\Http\Controllers\UserController::class, 'update']);
Route::post('/register', [App\Http\Controllers\UserController::class, 'register']);
Route::post('/login', [App\Http\Controllers\UserController::class, 'login']);

Route::post('/banned/{id}', [App\Http\Controllers\UserController::class, 'Banned']);
Route::post('/SignUp', [App\Http\Controllers\AdminController::class, 'register']);



Route::get('/profile/{id}', [App\Http\Controllers\UserController::class, 'profile']);
Route::get('/userProfile', [App\Http\Controllers\UserController::class, 'userProfile']);
Route::put('/EmailVerify/{id}', [App\Http\Controllers\UserController::class, 'EmailVerification']);
Route::post('/logout', [App\Http\Controllers\UserController::class, 'logout']);



Route::post('/avisstore', [App\Http\Controllers\AvisController::class, 'avisstore']);
Route::get('/avisshow/{id}', [App\Http\Controllers\AvisController::class, 'avisshow']);
Route::get('/articles/search', [App\Http\Controllers\ArticleController::class, 'search']);
Route::get('/demandes/{userId}', [App\Http\Controllers\DemandeController::class , 'showDemande']); 
Route::post('/demandes', [App\Http\Controllers\DemandeController::class , 'AjoutDemande']);
Route::delete('/demandes/{demandeId}', [App\Http\Controllers\DemandeController::class, 'deleteDemande']);

Route::get('/users', [App\Http\Controllers\UserController::class, 'showUsers']);
Route::get('/articles', [App\Http\Controllers\ArticleController::class, 'getArticlesWithCategory']);


Route::post('/report', [App\Http\Controllers\ReportController::class, 'sendType']);
Route::get('/report', [App\Http\Controllers\ReportController::class, 'getComplain']);
Route::get('/type', [App\Http\Controllers\ReportController::class, 'getType']);
Route::get('/totalReports', [App\Http\Controllers\ReportController::class, 'getTotalSignale']);
Route::get('/totalUser', [App\Http\Controllers\UserController::class, 'getTotalUser']);
Route::get('/totalDemade', [App\Http\Controllers\DemandeController::class, 'getTotalDemande']);


Route::get('/dashboard/{id}', [App\Http\Controllers\DashboardController::class, 'ArticleDashboard']);


Route::get('/count', [App\Http\Controllers\ChartController::class, 'AdminDashboard']);