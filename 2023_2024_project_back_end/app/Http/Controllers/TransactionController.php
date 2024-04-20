<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function getTransactions($user_id, $session)
    {
        // Fetch transactions present in both tables
        // Fetch transactions present in both tables
        $transactions = DB::table('payment_multiple_main_table_payment_log AS payment')
            ->join('sbi_final_settlement_data AS sbi', 'payment.order_no_log', '=', 'sbi.merchant_order_number')
            ->where('payment.user_id', $user_id)
            ->where('payment.session', $session)
            ->select(
                'payment.user_id',
                'payment.session',
                'payment.order_no',
                'sbi.settlement_amount', // Renamed amount to settlement_amount
                'sbi.settlement_date', // Changed date_of_payment to settlement_date
                'payment.remark as payment_remark', // Alias for remark in payment table
            )
            ->get();

        return response()->json(['transactions' => $transactions], 200);
    }
}
