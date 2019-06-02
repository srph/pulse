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
        'last_label_id',
        'most_recent_entry_at',
        'name',
        'description'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'most_recent_entry_at' => 'datetime:Y-m-d'
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
