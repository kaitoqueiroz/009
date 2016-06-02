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

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
