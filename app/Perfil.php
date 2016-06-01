<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
{
    protected $table = 'perfis';

    public function funcionalidades()
    {
        return $this->belongsToMany('App\Funcionalidade', 'perfil_funcionalidade');
    }

    public function funcionarios()
    {
        return $this->belongsToMany('App\Funcionario', 'funcionario_perfil');
    }
}
