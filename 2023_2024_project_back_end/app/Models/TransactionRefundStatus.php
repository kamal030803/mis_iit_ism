<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionRefundStatus extends Model
{
    use HasFactory;

    protected $table = 'transaction_refund_status';

    protected $fillable = ['order_no', 'user_id', 'remark', 'status'];

    public $timestamps = true; // Enable automatic management of created_at and updated_at timestamps

    protected $primaryKey = 'complaint_id'; // Specify the custom primary key

    // The "complaint_id" field is auto-incrementing
    protected $keyType = 'int';

    // You can set additional model properties or define relationships here if needed
}
