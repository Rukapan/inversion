<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::delete('/user/deleteAccount', [\App\Http\Controllers\AuthController::class, 'deleteAccount']);

    Route::resource('/profile', \App\Http\Controllers\ProfileController::class);
    Route::get('/profile/edit', [\App\Http\Controllers\ProfileController::class, 'update']);
    Route::resource('/photo', \App\Http\Controllers\PhotoController::class);
    Route::get('/getFavPhotos', [\App\Http\Controllers\PhotoController::class, 'indexFavPhotos']);
    Route::resource('/favPhotos', \App\Http\Controllers\FavPhotoController::class);
    Route::resource('/favUsers', \App\Http\Controllers\FavUserController::class);
    Route::get('/getFavUsers', [\App\Http\Controllers\FavUserController::class, 'indexProfile']);
});

Route::get('/userAlbum/{uuid}', [\App\Http\Controllers\PhotoController::class, 'indexUserAlbum']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
