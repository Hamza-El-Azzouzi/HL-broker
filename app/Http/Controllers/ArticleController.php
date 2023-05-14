<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $articleId = Article::insertGetId([
            'id_categorie' => $request->id_categorie,
            'id_user' => $request->id_user,
            'name_article' => $request->name_article,
            'description' => $request->description,
            'prix' => $request->prix,
            'type' => $request->type,
            'disponibilite' => $request->disponibilite,

        ]);
        foreach ($request->file('images') as $file) {
            $path = $file->store('images');

            Image::create([
                'id_article' => $articleId,
                'images' => $path

            ]);
        }

        return response()->json([
            'message' => 'Article created successfully'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        //

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
