<?php

namespace App\Presenters;

use App\Transformers\ModuloTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class ModuloPresenter
 *
 * @package namespace App\Presenters;
 */
class ModuloPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new ModuloTransformer();
    }
}
