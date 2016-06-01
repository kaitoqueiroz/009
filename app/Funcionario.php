<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    protected $fillable = [
        'ativo',
        'login',
        'nome',
        'cod_vendedor'
    ];

    public function perfis()
    {
        return $this->belongsToMany('App\Perfil', 'funcionario_perfil');
    }

    public function departamentos()
    {
        return $this->belongsToMany('App\Departamento', 'funcionario_departamento');
    }

    public function filiais()
    {
        return $this->belongsToMany('App\Filial', 'funcionario_filial');
    }
}
