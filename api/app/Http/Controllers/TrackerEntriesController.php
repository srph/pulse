<?php

namespace App\Http\Controllers;

use App\Tracker;
use App\TrackerEntry;
use Illuminate\Http\Request;

class TrackerEntriesController extends Controller
{
    public function store(Tracker $tracker, \App\Http\Requests\StoreTrackerEntry $request) {
        $payload = $request->only([
            'tracker_label_id',
            'entry_date',
        ]);
        
        $entry = $tracker->entries()
            ->where('entry_date', $payload['entry_date'])
            ->firstOrCreate($payload);

        if ($entry->entry_date->isAfter($tracker->most_recent_entry_at)) {
            $tracker->fill([
                'most_recent_entry_at' => $payload['entry_date']
            ])->save();
        }

        return response()->json($entry);
    }

    public function destroy(Tracker $tracker, TrackerEntry $entry) {
        $tracker->entries()->where('tracker_label_id', $label->id)->destroy();
        $entry->destroy();
        return response()->json(['success' => true]);
    }
}
