<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SbiFinalSettlementDataController extends Controller
{
    public function index($session, $userId)
    {
        // Fetch data from the sbi_final_settlement_data table for the specified session and user ID
        $sbiSettlementData = DB::table('sbi_final_settlement_data')
            ->where('session', $session)
            ->where('user_id', $userId)
            ->get();

        return response()->json(['sbi_settlement_data' => $sbiSettlementData], 200);
    }
}
