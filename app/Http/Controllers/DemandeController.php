<?php

namespace App\Http\Controllers;

use App\Models\Demande;
use App\Models\User;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class DemandeController extends Controller
{

    public function showDemande($userId)
{
    // Vérifier si l'utilisateur existe
    $user = User::find($userId);
    if (!$user) {
        return response()->json(['message' => 'Utilisateur non trouvé'], 404);
    }

    // Vérifier si l'utilisateur est un acheteur
    if ($user->account_type === 'acheteur') {
        $demandes = Demande::join('articles', 'articles.id_article', '=', 'demandes.id_article')
            ->where('demandes.id_user', $userId)
            ->select('demandes.id_demande', 'articles.name_article', 'articles.prix', 'articles.image')
            ->get();

        return response()->json($demandes);
    }
    // Vérifier si l'utilisateur est un vendeur
    elseif ($user->account_type === 'vendeur') {
        $demandes = Demande::join('articles', 'articles.id_article', '=', 'demandes.id_article')
            ->join('users', 'users.id', '=', 'demandes.id_user')
            ->where('articles.id_user', $userId)
            ->select('demandes.id_demande', 'users.name', 'users.email', 'users.tel', 'articles.name_article', 'articles.prix')
            ->get();

        return response()->json($demandes);
    }
    
    // Si l'utilisateur n'est ni un acheteur ni un vendeur, renvoyer une réponse indiquant qu'il n'est pas autorisé
    return response()->json(['message' => 'Non autorisé'], 401);
}

public function deleteDemande($demandeId)
{
    // Execute a raw SQL query to delete the demande
    $result = DB::delete('DELETE FROM demandes WHERE id_demande = ?', [$demandeId]);

    // Check if the deletion was successful
    if ($result) {
        return response()->json(['message' => 'Demande supprimée avec succès']);
    } else {
        return response()->json(['message' => 'Échec de la suppression de la demande'], 500);
    }
}


    // public function showDemande($userId)
    // {
    //     // Vérifier si l'utilisateur existe
    //     $user = User::find($userId);
    //     if (!$user) {
    //         return response()->json(['message' => 'Utilisateur non trouvé'], 404);
    //     }
    
    //     // Vérifier si l'utilisateur est un acheteur
    //     if ($user->account_type === 'acheteur') {
    //         $demandes = Demande::join('articles', 'articles.id_article', '=', 'demandes.id_article')
    //             ->where('demandes.id_user', $userId)
    //             ->select('demandes.id_demande', 'articles.name_article', 'articles.prix')
    //             ->get();
    
    //         return response()->json($demandes);
    //     }
        
    //     // Si l'utilisateur n'est pas un acheteur, renvoyer une réponse indiquant qu'il n'est pas autorisé
    //     return response()->json(['message' => 'Non autorisé'], 401);
    // }
   
       

    public function AjoutDemande(Request $request)
    {
        // Récupérez les données de la demande à partir de la requête $request
        $data = $request->only(['id_user', 'id_article']);

        // Créez une nouvelle demande en utilisant les données récupérées
        $demande = Demande::create($data);

        return response()->json($demande, 201);
    }






    /**
     * Display a listing of the resource.
     * 
     
     */
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
