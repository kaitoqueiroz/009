<?php

namespace App\Presenters;

use App\Transformers\DistribuidorTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class DistribuidorPresenter
 *
 * @package namespace App\Presenters;
 */
class DistribuidorPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new DistribuidorTransformer();
    }
}
