<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Modulo extends Model
{
    public function funcionalidades()
    {
        return $this->hasMany('App\Funcionalidade');
    }
}
