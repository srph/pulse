<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetTracker extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->id === $this->route('tracker')->user_id;
    }
}
