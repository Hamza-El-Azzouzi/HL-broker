<?php

namespace App\Http\Controllers;

use App\Models\Avis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AvisController extends Controller
{
    public function avisstore(Request $request)
    {
        $avis = Avis::create([
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

        $avis = DB::select('SELECT * FROM avis WHERE id_article = ?', [$id]);
        // Réponse JSON avec l'avis trouvé
        return response()->json(
            $avis
        );
    }
  
}
