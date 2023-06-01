<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    //
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){

        $categorie = Categorie::all();
        return response()->json([
             'status'=>'success',
         'data'=>$categorie]);
    }
    public function store( Request $request){

      
        $categorie = new Categorie;
        $categorie->name_categorie = $request->name_categorie;
        $categorie->save();

    }

    
}
