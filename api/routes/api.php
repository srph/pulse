<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->group(function() {
    Route::prefix('trackers')->group(function() {
        Route::get('/', 'TrackersController@index');
        Route::post('/', 'TrackersController@store');
        Route::get('/{tracker}', 'TrackersController@show');
        Route::put('/{tracker}', 'TrackersController@update');

        Route::post('/{tracker}/labels', 'TrackerLabelsController@store');
        Route::put('/{tracker}/labels/{tracker_label}', 'TrackerLabelsController@update');

        Route::post('/{tracker}/entries', 'TrackerEntriesController@store');
        Route::put('/{tracker}/entries/{tracker_entry}', 'TrackerEntriesController@update');
    });
});