<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Perfil;

/**
 * Class PerfilTransformer
 * @package namespace App\Transformers;
 */
class PerfilTransformer extends TransformerAbstract
{

    /**
     * Transform the \Perfil entity
     * @param \Perfil $model
     *
     * @return array
     */
    public function transform(Perfil $model)
    {
        return [
            'id' => (int) $model->id,
            'ativo' => (bool) $model->ativo,
            'descricao' => $model->descricao,
            'nivel_privilegio' => $model->nivel_privilegio,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
