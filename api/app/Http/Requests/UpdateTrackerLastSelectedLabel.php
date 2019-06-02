<?php

namespace App\Http\Requests;

use App\Tracker;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTrackerLastSelectedLabel extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        // $tracker_id = $this->route('tracker');

        return [
            // For some reason I couldn't make a more specific validation work,
            // so we'll just assume it exists in good faith it's for the tracker lol.
            // 'last_selected_label_id' => [
            //     Rule::exists('tracker_labels', 'id')->where(function ($query) use ($tracker_id) {
            //         $query->where('tracker_id', $tracker_id);
            //     })
            // ]
            
            'last_selected_label_id' => 'exists:tracker_labels,id'
        ];
    }
}
