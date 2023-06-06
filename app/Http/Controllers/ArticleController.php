<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Categorie;
use App\Models\Image;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use PhpParser\JsonDecoder;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // $article = Article::where();
        $article = Article::all();
        return response()->json([
            'success' => 'greaat work',
            'data' => $article
        ]);
    }

    public function Disponible($id)
    {
        $disponible = DB::select('SELECT disponibilite FROM articles WHERE id_article = ?', [$id]);
    
        if ($disponible && $disponible[0]->disponibilite == 'true') {
            $update = [
                'disponibilite' => 'false'
            ];
            Article::where('id_article', $id)->update($update);
        } else {
            $update = [
                'disponibilite' => 'true'
            ];
            Article::where('id_article', $id)->update($update);
        }
    
        return response()->json([
            'success' => 'great work',
            'data' => $disponible
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function getArticle($id)
    {
        //
        $article =DB::select('SELECT * FROM articles WHERE id_user = ?', [$id]);
        // $article = Article::all();
        return response()->json([
            'success' => 'greaat work',
            'data' => $article
        ]);
    }
    public function getArticleForHome()
    {
        //
        $article =DB::table('articles')->distinct()->limit(11)
        ->get();

        return response()->json([
            'success' => 'greaat work',
            'data' => $article
        ]);
    }


    public function images($id)
    {
        //
        // $article = Article::where('id_article',$id);
    $images = DB::table('images')->select('images.id','images.images')->where('id_article',$id)->get();

    return response($images);
    }
    public function user($id)
    {

    $user = User::join('articles','users.id','=','articles.id_user')->where('articles.id_article',$id)->get([
        'users.name','users.email','users.image','users.id'
    ]);

    return response($user);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $files =$request->file('images');
        $articleId = Article::insertGetId([
            'id_categorie' => $request->id_categorie,
            'id_user' => $request->id_user,
            'name_article' => $request->name_article,
            'description' => $request->description,
            'image' =>$files[0]->getClientOriginalName(),
            'localisation' =>$request->localisation,
            'prix' => $request->prix,
            'type' => $request->type,
            'disponibilite' => $request->disponibilite,
            'created_at'=>Carbon::now()
        ]);
        foreach ($files as $file) {
           $file->move('images/',$file->getClientOriginalName());
            Image::create([
                'id_article' => $articleId,
                'images' => $file->getClientOriginalName()
            ]);
        }

        return response()->json([
            'message' => 'Article created successfully'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show ($id)
    {
        //
        $article =DB::select('SELECT * FROM articles WHERE id_article = ?', [$id]);
        // $article = Article::all();
        return response()->json($article);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
        $article = DB::table('articles')->where('id_article', $id)->get();
        return response()->json($article);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $update = [
            'id_categorie' => $request->categorie,
            'name_article' => $request->titre,
            'description' => $request->description,
            'prix' => $request->prix,
            'type' => $request->type,
            // 'disponibilite' => $request->disponibilite,
        ];
        Article::where('id_article',$id)->update($update);
        return response()->json([
            'message' => 'Article updated successfully'
        ], 201);

        

    }
    public function getArtcleCategorie($categorie)
    {
        //
        $id_categorie = Categorie::where('name_categorie', $categorie)->pluck('id_categorie')->first();
    //    $id_categorie = Categorie::where('name_categorie',$categorie);
        $article =Article::where('id_categorie',$id_categorie)->get();
        return response()->json($article);
    }

    public function getArticlefiltered($type , $categorie, $min,$max){
        
        $id_categorie = Categorie::where('name_categorie', $categorie)->pluck('id_categorie')->first();
            $article = DB::table('articles')
            ->where('type',$type)
            ->where('id_categorie',$id_categorie)
            ->whereBetween('prix', [$min, $max])->get();
            return response()->json($article);
        
       
       

    }
    public function search(Request $request)
    {
        $searchTerm = $request->input('searchTerm');

        $articles = Article::where('name_article', 'like', '%' . $searchTerm . '%')->get();

        return response()->json($articles);
    }

    public function getArticlesWithCategory()
    {
        $articles = Article::select('articles.*', 'categories.name_categorie as category_name', 'users.name as Nome_vendeur')
            ->join('categories', 'categories.id_categorie', '=', 'articles.id_categorie')
            ->join('users', 'users.id', '=', 'articles.id_user')
            ->get();
    
        return response()->json($articles);
    }

    public function getcountArticle($id){
        $article = DB::table('articles')->where('id_user',$id)->count();
        return response()->json($article);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request ,$id)
    {
        //
        Article::where('id_article',$id)->delete();
        return response()->json([
            'message' => 'Article deleted successfully'
        ], 201);
    }
}
