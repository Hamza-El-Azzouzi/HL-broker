<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    //

    public function ArticleDashboard($id)
    {
        $aLouerCount = DB::table('articles')->where('type' , 'Louer')->where('id_user', $id)->count();

        $aVendreCount = DB::table('articles')->where('type' , 'Vendre')->where('id_user', $id)->count();
           
        return response()->json([
            'Louer' => $aLouerCount,
            'Vendre' => $aVendreCount
        ]);
    }
}
