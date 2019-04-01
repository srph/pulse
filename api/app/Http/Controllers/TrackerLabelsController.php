<?php

namespace App\Http\Controllers;

use App\Tracker;
use App\TrackerLabel;
use Illuminate\Http\Request;

class TrackerLabelsController extends Controller
{
    public function store(Tracker $tracker, \App\Http\Requests\StoreTrackerLabel $request) {
        $payload = $request->only([
            'name',
            'color'
        ]);
        $label = $tracker->labels()->create($payload);
        return response()->json($label);
    }

    public function update(Tracker $tracker, TrackerLabel $label, \App\Http\Requests\UpdateTrackerLabel $request) {
        $payload = $request->only([
            'name',
            'color'
        ]);
        $label->fill($payload)->save();
        return response()->json($label);
    }

    public function destroy(Tracker $tracker, TrackerLabel $label) {
        $tracker->entries()->where('tracker_label_id', $label->id)->delete();
        $label->delete();
        return response()->json(['success' => true]);
    }
}
