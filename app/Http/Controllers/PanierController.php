<?php

namespace App\Http\Controllers;

use App\Models\Article_Panier;
use App\Models\Panier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PanierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // 

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function getArticlePanier($id)
    {
        $article = DB::select('SELECT articles.* , paniers.* FROM paniers , articles JOIN article_panier ON articles.id_article = article_panier.id_article WHERE paniers.id_user = ?', [$id]);

        // DB::table('articles,paniers')
        // ->join('article_panier' , 'articles.id_article' ,'=', 'article_panier.id_article')
        // ->join('paniers' , 'paniers.id_panier' ,'=' ,'article_panier.id_panier')
        // ->where( 'paniers.id_user' ,'=' ,$id)->get('*','paniers.id_panier');
        // dd($article);

        return response()->json([
            'message' => 'article saved successfully',
            'result' => $article
        ], 201);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $panierResults = DB::select('SELECT id_panier FROM paniers where id_user=? limit 1', [$request->id_user]);
        if (!empty($panierResults)) {
            $articleResults = DB::select('SELECT id_article FROM article_panier where id_article=? limit 1', [$request->id_article]);
            if (empty($articleResults)) {
                $panier = $panierResults[0]->id_panier; // Access the first element and retrieve the id_panier value
                Article_Panier::create([
                    'id_panier' => $panier,
                    'id_article' => $request->id_article
                ]);
                return response()->json([
                    'message' => 'article saved successfully'
                ], 201);
            } else {
                return response()->json([
                    'message' => 'already saved'
                ], 201);
            }
        } else {

            $panierId = Panier::insertGetId([
                'id_user' => $request->id_user
            ]);
            Article_Panier::create([
                'id_panier' => $panierId,
                'id_article' => $request->id_article
            ]);
            return response()->json([
                'message' => 'panier created successfully',
            ], 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        //
        $article =

            DB::table('articles')
            ->join('article_panier', 'articles.id_article', '=', 'article_panier.id_article')
            ->join('paniers', 'paniers.id_panier', '=', 'article_panier.id_panier')
            ->where('paniers.id_user', '=', $id)->get('articles.*');
        // dd($article);

        return response()->json([
            'message' => 'loaded successfully',
            'result' => $article
        ], 201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteArticle($id_user, $id_article)
    {
        //DB::select(' SELECT *FROM paniers where id_user = ?' ,[ $id_user]);

        // $panierID = Panier::where('id_user' , $id_user)->get('id_panier');
        // Article_Panier::where('id_panier',$panierID)->where('id_article',$id_article)->delete();
        $panierID = Panier::where('id_user', $id_user)->pluck('id_panier')->first();
        Article_Panier::where('id_panier', $panierID)->where('id_article', $id_article)->delete();
        return response()->json([
            'message' => 'deleted succesfully',
            'panier' => $panierID
        ]);
    }
}
