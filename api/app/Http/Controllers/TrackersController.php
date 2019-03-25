<?php

namespace App\Http\Controllers;

use App\Tracker;
use Illuminate\Http\Request;

class TrackersController extends Controller
{
    public function index() {
        $trackers = Tracker::all();

        return response()->json($trackers);
    }

    public function store(\App\Http\Requests\StoreTracker $request) {
        $payload = $request->only([
            'title',
            'description'
        ]);

        $tracker = $request->user()->trackers()->save($payload);

        $labels = [
            [
                'name' => 'No Fap',
                'color' => 'Relapsed'
            ],
            [
                'name' => 'Muntik Lang',
                'color' => 'Eut'
            ],
            [
                'name' => '#2186EB',
                'color' => '#eb5757'
            ],
            [
                'name' => '#d5dde5',
                'color' => '#27AE60'
            ],
        ];

        foreach($labels as $label) {
            $tracker->labels()->save($label);
        }

        return response()->json($tracker);
    }

    public function show(Tracker $tracker) {
        $tracker->load(['labels', 'entries']);
        return response()->json($tracker);
    }

    public function update(Tracker $tracker, \App\Http\Requests\UpdateTracker $request) {
        $payload = $request->only([
            'title',
            'description'
        ]);

        $tracker->load(['labels', 'entries']);
        $tracker->fill($payload);
        return response()->json($tracker);
    }
}
