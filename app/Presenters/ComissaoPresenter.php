<?php

namespace App\Presenters;

use App\Transformers\ComissaoTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class ComissaoPresenter
 *
 * @package namespace App\Presenters;
 */
class ComissaoPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new ComissaoTransformer();
    }
}
