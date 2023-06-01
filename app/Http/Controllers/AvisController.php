<?php

namespace App\Http\Controllers;

use App\Models\Avis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AvisController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function avisstore(Request $request)
     {
         // Validation des données de la requête
        //  $data = $request->validate([
        //      'id_user' => 'required',
        //      'id_article' => 'required',
        //      'nbr_etoile' => 'required',
        //      'avis' => 'required',
        //  ]);
 
         
         $avis = Avis::create( [ 
         'id_user' => $request->id_user,
         'id_article' => $request->id_article,
         'nbr_etoile' => $request->nbr_etoile,
         'avis' => $request->avis
         ]);

 
         return response()->json([
             'message' => 'Avis créé avec succès',
             'avis' => $avis
         ], 201);
     }
 
     public function avisshow($id)
     {
         // Recherche de l'avis par ID
        //  $avis = Avis::where('id_avis',$id);
    

 $avis=DB::select('SELECT * FROM avis WHERE id_article = ?', [$id]);
         // Réponse JSON avec l'avis trouvé
         return response()->json(
        $avis
        );
     }




    // public function index()
    // {
    //     //
    // }

    // /**
    //  * Show the form for creating a new resource.
    //  */
    // public function create()
    // {
    //     //
    // }

    // /**
    //  * Store a newly created resource in storage.
    //  */
    // public function store(Request $request)
    // {
    //     //
    // }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(Request $request)
    // {
    //     //
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(Request $request)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request)
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(Request $request)
    // {
    //     //
    // }
}
