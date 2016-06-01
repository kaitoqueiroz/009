<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Modulo;

/**
 * Class ModuloTransformer
 * @package namespace App\Transformers;
 */
class ModuloTransformer extends TransformerAbstract
{

    /**
     * Transform the \Modulo entity
     * @param \Modulo $model
     *
     * @return array
     */
    public function transform(Modulo $model)
    {
        return [
            'id' => (int) $model->id,
            'ativo' => (bool) $model->ativo,
            'descricao' => $model->descricao,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
