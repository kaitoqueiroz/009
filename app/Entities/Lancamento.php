<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Lancamento extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = ['tipo','observacao','valor','pontos','data','distribuidor_id'];

}
