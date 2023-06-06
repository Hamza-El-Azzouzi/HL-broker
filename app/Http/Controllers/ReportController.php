<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    //
    public function getType()
    {
        $type = DB::select('SELECT * FROM report_types');
        return response()->json($type);
    }
    public function sendType(Request $request)
    {
        Report::create([
            'id_user' => $request->id_user,
            'id_article' => $request->id_article,
            'id_type' => $request->id_type,
            'complaint' => $request->complaint
        ]);
        return response()->json([
            'message' => 'Complaint created successfully'
        ], 201);
    }

    public function getComplain()
    {
        $report =  DB::table('reports')
        ->join('report_types', 'reports.id_type', '=', 'report_types.id_type')
        ->join('users' , 'reports.id_user', '=' ,'users.id')->get();
        return response()->json($report);
    }


    public function getTotalSignale(){
        $total = DB::table('reports')->count();
        return response()->json( $total );
     }
}
