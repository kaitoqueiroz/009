<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Funcionario;

/**
 * Class FuncionarioTransformer
 * @package namespace App\Transformers;
 */
class FuncionarioTransformer extends TransformerAbstract
{

    /**
     * Transform the \Funcionario entity
     * @param \Funcionario $model
     *
     * @return array
     */
    public function transform(Funcionario $model)
    {
        return [
            'id'         => (int) $model->id,
            'ativo'  => (bool) $model->ativo,
            'nome'  => $model->nome,
            'login'  => $model->login,
            'cod_vendedor'  => $model->cod_vendedor
        ];
    }
}
