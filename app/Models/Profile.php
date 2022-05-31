<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'uuid';

    protected $fillable = ['uuid', 'image', 'name', 'age', 'location'];

    public function getRouteKeyName()
    {
        return 'uuid';
    }
}
