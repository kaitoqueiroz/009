<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Filial;

/**
 * Class FilialTransformer
 * @package namespace App\Transformers;
 */
class FilialTransformer extends TransformerAbstract
{

    /**
     * Transform the \Filial entity
     * @param \Filial $model
     *
     * @return array
     */
    public function transform(Filial $model)
    {
        return [
            'id'         => (int) $model->id,
            'descricao'  => $model->descricao,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
