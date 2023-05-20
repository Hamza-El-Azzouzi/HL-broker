<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Image;
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
        $article = Article::all();
        // $article = Article::all();
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

    public function getArticle()
    {
        //
        $article =DB::table('articles')
        ->leftJoin('images', 'articles.id_article', '=', 'images.id_article')
        ->select('articles.*', 'images.images', 'images.id')->distinct()
        ->get();
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
            'localisation' =>"taza",
            'prix' => $request->prix,
            'type' => $request->type,
            'disponibilite' => $request->disponibilite,
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
