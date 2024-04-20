<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

//exx
use App\Http\Controllers\BankFeeController;

Route::get('/bank-fees', [BankFeeController::class, 'index']);

use App\Http\Controllers\PaymentLogController;

Route::get('/payment-logs', [PaymentLogController::class, 'index']);

use App\Http\Controllers\SbiFinalSettlementDataController;

Route::get('/sbi-settlement-data/{session}/{userId}', [SbiFinalSettlementDataController::class, 'index']);

use App\Http\Controllers\TransactionController;

Route::get('/transactions/{user_id}/{session}', [TransactionController::class, 'getTransactions']);

use App\Http\Controllers\TransactionListController;

Route::get('/transactionsList/{user_id}/{session}', [TransactionListController::class, 'getTransactions']);

use App\Http\Controllers\TransactionRefundStatusController;

Route::post('/refund/{user_id}/{order_no}', [TransactionRefundStatusController::class, 'createRefundEntry']);

use App\Http\Controllers\RefundLogController;

Route::get('/refund-logs/{user_id}/', [RefundLogController::class, 'getRefundLogsByUserId']);

use App\Http\Controllers\RequestDetailsController;

Route::get('/request-details', [RequestDetailsController::class, 'getRequestDetails']);

use App\Http\Controllers\RefundController;

Route::post('/refund/edit', [RefundController::class, 'editRefundStatus']);


Route::post('/refund-ac/add', [RefundController::class, 'store']);

Route::post('/refund-ac/update/{complaint_id}', [RefundController::class, 'update']);
Route::get('/refund-ac/list', [RefundController::class, 'allRefunds']);
//exx

/*
|--------------------------------------------------------------------------
| API Routes by @bhijeet
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::fallback(function () {
    return response()->json([
        'status' => false,
        'message' => 'Invalid Route !!',
    ], 200);
});

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('validateuser', 'validateUser');

    Route::post('login_api', 'login_api');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::get('refresh', 'refresh');
    Route::post('update_password', 'UpdatePassword');
    Route::post('un-block-user', 'unBlockUser');
    Route::get('TokenError', 'TokenError')->name('TokenError');
    Route::get('get-unread-notification', 'getUnReadNotification');
    Route::get('get-read-notification', 'getReadNotification');
    Route::post('mark-read-notification', 'markReadNotification');
    Route::post('GetBiometicAttendance', 'GetBiometicAttendance');
});

// here add routes Module wise

include ('adminRoutes.php');
include ('userRoutes.php');
