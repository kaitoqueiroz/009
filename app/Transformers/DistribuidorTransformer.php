<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Distribuidor;

/**
 * Class DistribuidorTransformer
 * @package namespace App\Transformers;
 */
class DistribuidorTransformer extends TransformerAbstract
{

    /**
     * Transform the \Distribuidor entity
     * @param \Distribuidor $model
     *
     * @return array
     */
    public function transform(Distribuidor $model)
    {
        return [
            'id'         => (int) $model->id,
            'nome'       => $model->nome,
            'fantasia'   => $model->fantasia,
            'pai'        => (int) $model->pai,
            'tipo_pessoa'=> $model->tipo_pessoa,
            'cpf_cnpj'   => $model->cpf_cnpj,
            'rg'         => $model->rg,
            'cep'         => $model->cep,
            'municipio'         => $model->municipio,
            'uf'         => $model->uf,
            'endereco'         => $model->endereco,
            'numero'         => $model->numero,
            'complemento'         => $model->complemento,
            'bairro'         => $model->bairro,
            'fone'         => $model->fone,
            'celular'         => $model->celular,
            'email'         => $model->email
        ];
    }
}
