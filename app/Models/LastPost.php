<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LastPost extends Model
{
    use HasFactory;

    protected $fillable = ['uuid', 'photo_id', 'image', 'title', 'date'];

    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'uuid';

    public function getRouteKeyName()
    {
        return 'uuid';
    }
}
