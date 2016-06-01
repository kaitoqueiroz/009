<?php

namespace App\Presenters;

use App\Transformers\FilialTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class FilialPresenter
 *
 * @package namespace App\Presenters;
 */
class FilialPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new FilialTransformer();
    }
}
