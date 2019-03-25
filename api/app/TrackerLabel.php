<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TrackerLabel extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'color'
    ];

    public function tracker() {
        return $this->belongsTo(Tracker::class);
    }
}
