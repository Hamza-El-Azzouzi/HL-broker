<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChartController extends Controller
{
    //
    public function AdminDashboard()
    {
        $acheteurCount = DB::table('users')
            ->select(DB::raw('SUM(CASE WHEN account_type = "acheteur" THEN 1 ELSE 0 END) AS nbr_acheteur'))
            ->value('nbr_acheteur');

        $vendeurCount = DB::table('users')
            ->select(DB::raw('SUM(CASE WHEN account_type = "vendeur" THEN 1 ELSE 0 END) AS nbr_vendeur'))
            ->value('nbr_vendeur');

        return response()->json([
            'acheteur' => $acheteurCount,
            'vendeur' => $vendeurCount
        ]);
    }
}
