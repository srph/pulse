<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTrackerEntry extends FormRequest
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
        return [
            'tracker_label_id' => 'required|exists:tracker_labels,id',
            // #YOLO - As long as it's between tomorrow and today, it's okay.
            'entry_date' => 'required|date|before_or_equal:tomorrow'
        ];
    }
}
