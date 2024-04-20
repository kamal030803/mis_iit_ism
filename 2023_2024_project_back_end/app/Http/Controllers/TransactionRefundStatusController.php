<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TransactionRefundStatus;

class TransactionRefundStatusController extends Controller
{
    public function createRefundEntry(Request $request, $user_id, $order_no)
    {
        // Create a new entry in the transaction_refund_status table
        $refundEntry = new TransactionRefundStatus();
        $refundEntry->order_no = $order_no;
        $refundEntry->user_id = $user_id;
        $refundEntry->status = 1;
        $refundEntry->remark = 'requested for refund';
        $refundEntry->save();

        // Return a success response
        return response()->json([
            'message' => 'Refund entry added successfully',
            'data' => $refundEntry
        ], 201);
    }
}
