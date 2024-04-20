<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionListController extends Controller
{
    public function getTransactions($user_id, $session)
    {
        // Step 1: Select transactions with 'multiple payment' description and exclude entries present in 'bank_fee_details' table
        $multiplePaymentTransactions = DB::select("
    SELECT 
        payment.order_no,
        payment.user_id,
        payment.session,
        payment.session_year,
        payment.date_of_payment AS payment_date,
        payment.total_to_be_paid AS amount,
        'multiple payment' AS description
    FROM 
        payment_multiple_main_table_payment_log AS payment
    JOIN 
        sbi_final_settlement_data AS sbi ON payment.order_no_log = sbi.merchant_order_number
    LEFT JOIN 
        bank_fee_details AS bank ON payment.order_no = bank.order_number
    WHERE 
        payment.user_id = :user_id
        AND payment.session = :session
        AND bank.order_number IS NULL
    ", ['user_id' => $user_id, 'session' => $session]);




        // Step 2: Select transactions with 'failed' description
        $failedTransactions = DB::select("
            SELECT 
                payment.order_no,
                payment.user_id,
                payment.session,
                payment.session_year,
                payment.date_of_payment AS payment_date,
                payment.total_to_be_paid AS amount,
                'failed' AS description
            FROM 
                payment_multiple_main_table_payment_log AS payment
            LEFT JOIN 
                sbi_final_settlement_data AS sbi ON payment.order_no_log = sbi.merchant_order_number
            WHERE 
                payment.user_id = :user_id
                AND payment.session = :session
                AND sbi.merchant_order_number IS NULL
        ", ['user_id' => $user_id, 'session' => $session]);
        // Step 3: Select transactions from 'paid_and_settled' table
        $paidAndSettledTransactions = DB::select("
        SELECT 
            payment.order_no,
            payment.user_id,
            payment.session,
            payment.session_year,
            payment.date_of_payment AS payment_date,
            payment.total_to_be_paid AS amount,
            'paid and settled transactions' AS description
        FROM 
            payment_multiple_main_table_payment_log AS payment
        JOIN 
            bank_fee_details AS bank ON payment.order_no = bank.order_number
        WHERE 
            payment.user_id = :user_id
            AND payment.session = :session
        ", ['user_id' => $user_id, 'session' => $session]);

        // Combine the results
        $transactions = array_merge($multiplePaymentTransactions, $failedTransactions, $paidAndSettledTransactions);

        // Sort the transactions by payment_date in ascending order
        usort($transactions, function ($a, $b) {
            return strtotime($a->payment_date) - strtotime($b->payment_date);
        });

        // Return the transactions as JSON response
        return response()->json(['transactions' => $transactions], 200);
    }

}
