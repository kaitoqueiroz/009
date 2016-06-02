<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Distribuidor extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'distribuidores';
    protected $fillable = [];

}
