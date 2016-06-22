<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Lancamento;

/**
 * Class LancamentoTransformer
 * @package namespace App\Transformers;
 */
class LancamentoTransformer extends TransformerAbstract
{
    /**
     * Transform the \Lancamento entity
     * @param \Lancamento $model
     *
     * @return array
     */
    public function transform(Lancamento $model)
    {
        return [
            'id'         => (int) $model->id
        ];
    }
}
