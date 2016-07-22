<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Comissao;

/**
 * Class ComissaoTransformer
 * @package namespace App\Transformers;
 */
class ComissaoTransformer extends TransformerAbstract
{

    /**
     * Transform the \Comissao entity
     * @param \Comissao $model
     *
     * @return array
     */
    public function transform(Comissao $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
