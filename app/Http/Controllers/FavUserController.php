<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfileResource;
use App\Http\Resources\FavUserResource;
use App\Models\FavUser;
use App\Models\Profile;
use Illuminate\Http\Request;

class FavUserController extends Controller
{
    public function __construct(private Request $request)
    {
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = $this->request->user();

        return FavUserResource::collection(FavUser::where('uuid', $user['uuid'])->orderBy('updated_at', 'DESC')->get());
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexProfile()
    {
        $user = $this->request->user();

        $favUsers = FavUser::where('uuid', $user->uuid)->orderBy('updated_at', 'DESC')->get();

        $user_ids = array();
        foreach ($favUsers as $favUser) {
            $user_ids[] = $favUser->user_id;
        }

        return ProfileResource::collection(Profile::whereIn('uuid', $user_ids)->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $this->request->user();
        FavUser::create([
            'uuid' => $user->uuid,
            'user_id' => $request->user_id
        ]);

        return FavUserResource::collection(FavUser::where('uuid', $user['uuid'])->orderBy('updated_at', 'DESC')->get());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FavUser  $favUser
     * @return \Illuminate\Http\Response
     */
    public function destroy(FavUser $favUser)
    {
        $favUser->delete();

        $user = $this->request->user();

        $favUsers = FavUser::where('uuid', $user->uuid)->orderBy('updated_at', 'DESC')->get();

        $user_ids = array();
        foreach ($favUsers as $favUser) {
            $user_ids[] = $favUser->user_id;
        }

        return FavUserResource::collection(FavUser::where('uuid', $user['uuid'])->orderBy('updated_at', 'DESC')->get());
    }
}
