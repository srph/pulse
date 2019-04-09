<?php

namespace App\Http\Controllers;

use App\Tracker;
use App\Support\Helper;
use Illuminate\Http\Request;

class TrackersController extends Controller
{
    public function index(Request $request) {
        $trackers = $request->user()->trackers()->orderBy('updated_at', 'desc');

        return response()->json($trackers);
    }

    public function store(\App\Http\Requests\StoreTracker $request) {
        $payload = $request->only([
            'name',
            'description'
        ]);

        $tracker = tap(
            $request->user()->trackers()->create($payload)
        )->save();

        $labels = [
            [
                'name' => 'No Fap',
                'color' => '#2186EB'
            ],
            [
                'name' => 'Relapsed',
                'color' => '#eb5757'
            ],
            [
                'name' => 'Muntik Lang',
                'color' => '#d5dde5'
            ],
            [
                'name' => 'Eut',
                'color' => '#27AE60'
            ],
        ];

        foreach($labels as $label) {
            $tracker->labels()->create($label)->save();
        }

        return response()->json($tracker);
    }

    public function show(Tracker $tracker, \App\Http\Requests\GetTracker $request) {
        $tracker = $tracker->load(['labels', 'entries', 'entries.label'])->toArray();
        $tracker['entries'] = Helper::toPropertyKeys($tracker['entries'], 'entry_date');
        return response()->json($tracker);
    }

    public function update(Tracker $tracker, \App\Http\Requests\UpdateTracker $request) {
        $payload = $request->only([
            'title',
            'description'
        ]);

        $tracker->fill($payload)->save();
        $tracker = $tracker->load(['labels', 'entries', 'entries.label'])->toArray();
        $tracker['entries'] = Helper::toPropertyKeys($tracker['entries'], 'entry_date');
        return response()->json($tracker);
    }
}
