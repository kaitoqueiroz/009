<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Distribuidor extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'distribuidores';
    protected $fillable = [
        "id",
        "nome",
        "fantasia",
        "pai",
        "tipo_pessoa",
        "cpf_cnpj",
        "rg",
        "cep",
        "municipio",
        "uf",
        "endereco",
        "numero",
        "complemento",
        "bairro",
        "fone",
        "celular",
        "email"
    ];
    
    public function setPaiAttribute($value) {
        $this->attributes['pai'] = $value ?: null;
    }
}
