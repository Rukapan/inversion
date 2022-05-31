<?php

namespace App\Http\Controllers;

use App\Models\FavPhoto;
use Illuminate\Http\Request;

class FavPhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\FavPhoto  $favPhoto
     * @return \Illuminate\Http\Response
     */
    public function show(FavPhoto $favPhoto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\FavPhoto  $favPhoto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FavPhoto $favPhoto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FavPhoto  $favPhoto
     * @return \Illuminate\Http\Response
     */
    public function destroy(FavPhoto $favPhoto)
    {
        //
    }
}
