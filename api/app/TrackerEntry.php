<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TrackerEntry extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tracker_label_id',
        'entry_date'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'entry_date' => 'datetime:Y-m-d'
    ];


    /**
     * All of the relationships to be touched.
     *
     * @var array
     */
    protected $touches = ['tracker'];

    public function tracker() {
        return $this->belongsTo(Tracker::class);
    }

    public function label() {
        return $this->hasOne(TrackerLabel::class, 'id', 'tracker_label_id');
    }
}
