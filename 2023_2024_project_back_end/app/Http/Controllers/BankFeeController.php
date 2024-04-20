<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BankFeeController extends Controller
{
    public function index()
    {
        // Fetch data from the bank_fee_details table
        $bankFees = DB::table('bank_fee_details')->get();

        return response()->json(['bank_fees' => $bankFees], 200);
    }
}
