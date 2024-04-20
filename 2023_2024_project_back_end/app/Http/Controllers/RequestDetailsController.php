<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PaymentMultipleMainTablePaymentLog;
use App\Models\TransactionRefundStatus;

class RequestDetailsController extends Controller
{
    public function getRequestDetails()
    {
        // Fetch all details from transaction_refund_status table
        $refundDetails = TransactionRefundStatus::all();

        // Add additional fields from payment_multiple_main_table_payment_log using order_no
        foreach ($refundDetails as $refundDetail) {
            // Fetch payment details using order_no
            $paymentDetails = PaymentMultipleMainTablePaymentLog::where('order_no', $refundDetail->order_no)
                ->select('date_of_payment', 'payment_gateway', 'pay_code', 'amount_to_be_paid as amount', 'session_year', 'branch','session')
                ->first();

            // Merge payment details with refund details
            $refundDetail->date_of_payment = $paymentDetails->date_of_payment;
            $refundDetail->payment_gateway = $paymentDetails->payment_gateway;
            $refundDetail->pay_code = $paymentDetails->pay_code;
            $refundDetail->amount = $paymentDetails->amount;
            $refundDetail->session_year = $paymentDetails->session_year;
            $refundDetail->branch = $paymentDetails->branch;
            $refundDetail->session = $paymentDetails->session;
        }

        // Return the combined details as JSON response
        return response()->json($refundDetails);
    }
}
