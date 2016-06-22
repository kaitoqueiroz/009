<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Distribuidor extends Model
{
    protected $table = "distribuidores";
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
