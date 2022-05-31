<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;
use App\Models\Profile;

class PhotoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public $preserveKeys = true;

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'image' => URL::to($this->image),
            'title' => $this->title,
            'date' => (new \DateTime($this->created_at))->format('Y/m/d'),
            'user' => new ProfileResource(Profile::where('uuid', $this->uuid)->first())
        ];
    }
}
