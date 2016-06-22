<?php

namespace App\Presenters;

use App\Transformers\LancamentoTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class LancamentoPresenter
 *
 * @package namespace App\Presenters;
 */
class LancamentoPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new LancamentoTransformer();
    }
}
