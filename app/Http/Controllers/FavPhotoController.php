<?php

namespace App\Http\Controllers;

use App\Http\Resources\FavPhotoResource;
use App\Models\FavPhoto;
use Illuminate\Http\Request;

class FavPhotoController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        FavPhoto::create([
            'uuid' => $request->uuid,
            'photo_id' => $request->photo_id
        ]);

        return FavPhotoResource::collection(FavPhoto::where('uuid', $request->uuid)->orderBy('updated_at', 'DESC')->get());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FavPhoto  $favPhoto
     * @return \Illuminate\Http\Response
     */
    public function destroy(FavPhoto $favPhoto)
    {
        $favPhoto->delete();

        return FavPhotoResource::collection(FavPhoto::where('uuid', $favPhoto->uuid)->orderBy('updated_at', 'DESC')->get());
    }
}
