<?php

namespace App\Presenters;

use App\Transformers\FuncionarioTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class FuncionarioPresenter
 *
 * @package namespace App\Presenters;
 */
class FuncionarioPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new FuncionarioTransformer();
    }
}
