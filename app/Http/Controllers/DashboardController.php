<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    //

    public function ArticleDashboard($id)
    {
        $article = DB::select('SELECT  MONTH(SUBSTR(created_at, 1, 10)) AS month_number, COUNT(*) AS num_records FROM articles WHERE SUBSTR(created_at, 1, 10) and id_user =?  GROUP BY MONTH(SUBSTR(created_at, 1, 10)) order by month_number asc;', [$id]);

        $Months = array(
            1 => 'Janvier',
            2 => 'Fevrier',
            3 => 'Mars',
            4 => 'Avril',
            5 => 'Mai',
            6 => 'Juin',
            7 => 'Juillet',
            8 => 'Aout',
            9 => 'Septembre',
            10 => 'Octobre',
            11 => 'Novembre',
            12 => 'December'
        );

        return response()->json([
            'articles' => $article,
            'month'=>$Months
        ]);
    }
}
