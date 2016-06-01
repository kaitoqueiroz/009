<?php

namespace App\Presenters;

use App\Transformers\DepartamentoTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class DepartamentoPresenter
 *
 * @package namespace App\Presenters;
 */
class DepartamentoPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new DepartamentoTransformer();
    }
}
