<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;
use App\Models\LastPost;
use App\Http\Requests\UpdatePhotoRequest;
use App\Http\Requests\StorePhotoRequest;
use App\Http\Resources\PhotoResource;
use App\Http\Resources\LastPostResource;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class PhotoController extends Controller
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

        return PhotoResource::collection(Photo::orderBy('updated_at', 'DESC')->paginate(20));
    }

    /**
     * @param  Request  $request
     * @param  string  $uuid
     * @return Response
     */
    public function indexUserAlbum($uuid)
    {
        return PhotoResource::collection(Photo::where('uuid', $uuid)->orderBy('updated_at', 'DESC')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePhotoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePhotoRequest $request)
    {
        $data = $request->validated();

        $user = $this->request->user();

        $relativePath  = $this->saveImage($data['image']);
        $data['image'] = $relativePath;

        $photo = Photo::create([
            'uuid' => $user['uuid'],
            'image' => $data['image'],
            'title' => $data['title'],
        ]);

        LastPost::where('uuid', $user['uuid'])->first()->update([
            'photo_id' => $photo['id'],
            'image' => $data['image'],
            'title' => $data['title'],
            'date' => date('Y-m-d')
        ]);

        return new LastPostResource(LastPost::where('uuid', $user['uuid'])->first());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePhotoRequest  $request
     * @param  \App\Models\Photo $photo
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePhotoRequest $request, Photo $photo)
    {
        $data = $request->validated();

        $user = $this->request->user();

        // Check if image was given and save on local file system
        $relativePath = $this->saveImage($data['image']);
        $data['image'] = $relativePath;

        // Delete Old Image
        $absolutePath = public_path($photo->image);
        File::delete($absolutePath);

        $photo->update($data);

        LastPost::where('uuid', $user['uuid'])->first()->update([
            'photo_id' => $photo['id'],
            'image' => $data['image'],
            'title' => $data['title'],
            'date' => date('Y-m-d')
        ]);

        return new LastPostResource(LastPost::where('uuid', $user['uuid'])->first());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function show(Photo $photo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Photo $photo)
    {
        $absolutePath = public_path($photo->image);
        File::delete($absolutePath);

        $photo->delete();

        return response([
            'success' => true
        ]);
    }

    private function saveImage($image)
    {
        // Check if image is valid base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            // Take out the base64 encoded text without mime type
            $image = substr($image, strpos($image, ',') + 1);
            // Get file extension
            $type = strtolower($type[1]); // jpg, png, gif

            // Check if file is an image
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }
}
