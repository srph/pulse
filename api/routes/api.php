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

Route::post('/register', 'MeController@register');

Route::middleware('auth:api')->group(function() {
    Route::get('/me', 'MeController@me');
    Route::put('/me', 'MeController@update');
    Route::put('/me/password', 'MeController@password');
    Route::put('/me/avatar', 'MeController@avatar');
    
    Route::prefix('trackers')->group(function() {
        Route::get('/', 'TrackersController@index');
        Route::post('/', 'TrackersController@store');
        Route::get('/{tracker}', 'TrackersController@show');
        Route::put('/{tracker}', 'TrackersController@update');
        Route::put('/{tracker}/last-selected-label', 'TrackersController@updateLastSelectedLabel');
        Route::delete('/{tracker}', 'TrackersController@destroy');
        Route::put('/{tracker}/unarchive', 'TrackersController@unarchive');

        Route::post('/{tracker}/labels', 'TrackerLabelsController@store');
        Route::put('/{tracker}/labels/{tracker_label}', 'TrackerLabelsController@update');
        Route::delete('/{tracker}/labels/{tracker_label}', 'TrackerLabelsController@destroy');

        Route::post('/{tracker}/entries', 'TrackerEntriesController@store');
        Route::put('/{tracker}/entries/{tracker_entry}', 'TrackerEntriesController@update');
    });
});