<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Departamento;

/**
 * Class DepartamentoTransformer
 * @package namespace App\Transformers;
 */
class DepartamentoTransformer extends TransformerAbstract
{

    /**
     * Transform the \Departamento entity
     * @param \Departamento $model
     *
     * @return array
     */
    public function transform(Departamento $model)
    {
        return [
            'id'         => (int) $model->id,
            'descricao'  => $model->descricao,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
