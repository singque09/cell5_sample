<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Games extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'publisher' => $this->publisher,
            'rent_date' => $this->rent_date,
            'return_date' => $this->return_date,
            'days_rented' => $this->days_rented,
            'created_at' => $this->created_at->format('d/m/Y'),
            'updated_at' => $this->updated_at->format('d/m/Y'),
        ];
    }
}
