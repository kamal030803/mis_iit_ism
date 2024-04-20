<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentLogController extends Controller
{
    public function index()
    {
        // Fetch data from the payment_multiple_main_table_payment_log table
        $paymentLogs = DB::table('payment_multiple_main_table_payment_log')->get();

        return response()->json(['payment_logs' => $paymentLogs], 200);
    }
}
