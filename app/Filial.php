<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Filial extends Model
{
    protected $table = 'filiais';

    protected $fillable =  ['descricao'];

    
    public function funcionarios()
    {
        return $this->belongsToMany('App\Funcionario', 'funcionario_filial');
    }
}
