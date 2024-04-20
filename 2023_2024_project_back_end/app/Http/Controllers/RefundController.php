<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TransactionRefundStatus;
use App\Models\ListOfRefunds;

class RefundController extends Controller
{
    public function editRefundStatus(Request $request)
    {
        // Validate request data
        $request->validate([
            'complaint_id' => 'required|exists:transaction_refund_status,complaint_id',
            'remark' => 'nullable|string',
            'status' => 'nullable|',
        ]);

        // Find the refund record by complaint_id
        $refund = TransactionRefundStatus::where('complaint_id', $request->complaint_id)->first();

        // Update the remark and status fields if provided in the request
        if ($request->has('remark')) {
            $refund->remark = $request->remark;
        }
        if ($request->has('status')) {
            $refund->status = $request->status;
        }

        // Save the changes to the database
        $refund->save();

        // Return a success response
        return response()->json(['message' => 'Refund status updated successfully']);
    }
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'ifsc_code' => 'nullable|string|max:50',
            'account_number' => 'nullable|string|max:50',
            'complaint_id' => 'required|integer',
            'date_of_payment' => 'required|date',
            'date_of_request' => 'required|date',
            'user_id' => 'required|string|max:50',
            'session' => 'required|string|max:50',
            'remark' => 'nullable|string|max:255',
            'order_id' => 'required|string|max:50',
            'amount' => 'required|numeric',
        ]);

        // Create a new entry in the list_of_refunds table
        $refund = ListOfRefunds::create([
            'ifsc_code' => $request->ifsc_code,
            'account_number' => $request->account_number,
            'complaint_id' => $request->complaint_id,
            'date_of_payment' => $request->date_of_payment,
            'date_of_request' => $request->date_of_request,
            'user_id' => $request->user_id,
            'session' => $request->session,
            'remark' => $request->remark,
            'order_id' => $request->order_id,
            'amount' => $request->amount,
        ]);

        // Return a success response
        return response()->json(['message' => 'Refund added successfully', 'data' => $refund], 201);
    }
    public function update(Request $request, $complaint_id)
    {
        // Validate the incoming request data
        $request->validate([
            'ifsc_code' => 'required|string|max:50',
            'account_number' => 'required|string|max:50',
        ]);

        // Find the refund entry by its complaint_id
        $refund = ListOfRefunds::where('complaint_id', $complaint_id)->firstOrFail();

        // Update the attributes of the refund entry
        $refund->update([
            'ifsc_code' => $request->ifsc_code,
            'account_number' => $request->account_number,
        ]);

        $r_status = TransactionRefundStatus::where('complaint_id', $complaint_id)->firstOrFail();
        $r_status->status = 3;
        $r_status->save();
        // Return a success response
        return response()->json(['message' => 'Refund updated successfully and status of refund as well', 'data' => $refund]);
    }
    public function allRefunds()
    {
        $refunds = ListOfRefunds::all();

        // Return the fetched data as JSON response
        return response()->json(['data' => $refunds]);
    }
}

