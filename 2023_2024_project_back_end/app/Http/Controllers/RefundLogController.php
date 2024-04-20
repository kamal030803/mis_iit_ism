<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TransactionRefundStatus;

class RefundLogController extends Controller
{
    public function getRefundLogsByUserId($user_id)
    {
        // Fetch all refund logs for the given user_id
        $refundLogs = TransactionRefundStatus::where('user_id', $user_id)->get();

        // Return the refund logs as JSON response
        return response()->json($refundLogs);
    }
}
