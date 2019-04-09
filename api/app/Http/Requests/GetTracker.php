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
        dd($this->user()->id, $this->route('tracker')->user_id);
        return $this->user()->id === $this->route('tracker')->user_id;
    }
}
