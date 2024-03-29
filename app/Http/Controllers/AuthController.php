<?php

namespace App\Http\Controllers;

use App\Http\Resources\LastPostResource;
use App\Http\Resources\ProfileResource;
use App\Http\Resources\FavPhotoResource;
use App\Http\Resources\FavUserResource;
use App\Models\FavPhoto;
use App\Models\FavUser;
use App\Models\Profile;
use App\Models\LastPost;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email|string|unique:users,email',
            'password' => [
                'required',
                Password::min(8)->numbers()->letters()
            ]
        ]);

        /** @var \App\Models\User */
        $user = User::create([
            'uuid' => (string) Str::uuid(),
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
        $token = $user->createToken('main')->plainTextToken;

        Profile::create([
            'uuid' => $user['uuid']
        ]);
        LastPost::create([
            'uuid' => $user['uuid']
        ]);

        return response([
            'user' => $user,
            'profile' => new ProfileResource(Profile::where('uuid', $user['uuid'])->first()),
            'lastPost' => new LastPostResource(Profile::where('uuid', $user['uuid'])->first()),
            'token' => $token
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email|string|exists:users,email',
            'password' => [
                'required',
            ],
            'remember' => 'boolean'
        ]);
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }
        $user = Auth::user();

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'profile' => new ProfileResource(Profile::where('uuid', $user['uuid'])->first()),
            'lastPost' => new LastPostResource(LastPost::where('uuid', $user['uuid'])->first()),
            'favPhotos' => FavPhotoResource::collection(FavPhoto::where('uuid', $user['uuid'])->orderBy('updated_at', 'DESC')->get()),
            'favUsers' => FavUserResource::collection(FavUser::where('uuid', $user['uuid'])->orderBy('updated_at', 'DESC')->get()),
            'token' => $token
        ]);
    }

    public function logout()
    {
        /** @var User $user */
        $user = Auth::user();
        // Revoke the token that was used to authenticate the current request...
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }

    public function deleteAccount()
    {
        /** @var User $user */
        $user = Auth::user();

        $user->currentAccessToken()->delete();

        $profile = Profile::where('uuid', $user->uuid)->first();
        $absolutePath = public_path($profile->image);
        File::delete($absolutePath);
        $profile->delete();

        LastPost::where('uuid', $user->uuid)->first()->delete();

        $photos = Photo::where('uuid', $user->uuid)->get();

        foreach ($photos as $photo) {
            $absolutePath = public_path($photo->image);
            File::delete($absolutePath);
            $photo->delete();
        }

        $user->delete();

        return response([
            'success' => true
        ]);
    }
}
