<?php

namespace App\Http\Controllers;

use App\Mail\NewDemandeEmail;
use App\Models\Article;
use App\Models\Demande;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class DemandeController extends Controller
{
    public function showDemande($userId)
    {

        $user = User::find($userId);
       
        if ($user->account_type === 'acheteur') {
            $demandes = Demande::join('articles', 'articles.id_article', '=', 'demandes.id_article')
                ->where('demandes.id_user', $userId)
                ->select('demandes.id_demande', 'articles.name_article', 'articles.prix', 'articles.image')
                ->get();
    
            return response()->json($demandes);
        }

        elseif ($user->account_type === 'vendeur') {
            $demandes = Demande::join('articles', 'articles.id_article', '=', 'demandes.id_article')
                ->join('users', 'users.id', '=', 'demandes.id_user')
                ->where('articles.id_user', $userId)
                ->select('demandes.id_demande', 'users.name', 'users.email', 'users.tel', 'articles.name_article', 'articles.prix')
                ->get();
    
            return response()->json($demandes);
        }
        
       
        return response()->json(['message' => 'Non autorisé'], 401);
    }
    
  
        public function AjoutDemande(Request $request)
        {
            // Récupérez les données de la demande à partir de la requête $request
            $data = $request->only(['id_user', 'id_article']);
            $Id_article = intVal($data['id_article']);
            $Id_user = Article::where('id_article', $Id_article)->pluck('id_user')->first();
            $user = User::where('id',$Id_user)->get();
            // Créez une nouvelle demande en utilisant les données récupérées
            $demande = Demande::create($data);
            Mail::to($user[0]->email)->send(new NewDemandeEmail($user[0]->name));
            return response()->json([
            'message'=>'Demander avec Succès',
            'data'=>  $demande,
            'error1'=>$user  
            ], 201);
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

     public function getTotalDemande(){
        $total = DB::table('demandes')->count();
        return response()->json( $total );
     }
     public function getTotalDemandeForVendeur($userId){

        $user = User::find($userId);
       
if ($user->account_type === 'vendeur') {
    $demandes = Demande::join('articles', 'articles.id_article', '=', 'demandes.id_article')
            ->where('articles.id_user', $userId)
           
            ->count();

    return response()->json($demandes);
}
     }
}
