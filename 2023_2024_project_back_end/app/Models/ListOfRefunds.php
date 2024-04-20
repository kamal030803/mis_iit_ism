<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListOfRefunds extends Model
{
    use HasFactory;

    protected $fillable = [
        'ifsc_code',
        'account_number',
        'complaint_id',
        'date_of_payment',
        'date_of_request',
        'user_id',
        'session',
        'remark',
        'order_id',
        'amount',        
    ];

    protected $dates = [
        'date_of_payment',
        'date_of_request',
        'created_at',
        'updated_at',
    ];

    // Add any additional custom logic or relationships here
}
