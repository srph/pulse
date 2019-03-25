<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tracker extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function labels() {
        return $this->hasMany(TrackerLabel::class);
    }

    public function entries() {
        return $this->hasMany(TrackerEntry::class);
    }
}
