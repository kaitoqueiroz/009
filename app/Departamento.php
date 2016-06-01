<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    protected $fillable =  ['descricao'];

    public function funcionarios()
    {
        return $this->belongsToMany('App\Funcionario', 'funcionario_departamento');
    }
}
