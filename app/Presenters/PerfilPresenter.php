<?php

namespace App\Presenters;

use App\Transformers\PerfilTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class PerfilPresenter
 *
 * @package namespace App\Presenters;
 */
class PerfilPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new PerfilTransformer();
    }
}
