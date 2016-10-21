<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\LancamentoRepository;
use App\Entities\Lancamento;
use App\Validators\LancamentoValidator;

/**
 * Class LancamentoRepositoryEloquent
 * @package namespace App\Repositories;
 */
class LancamentoRepositoryEloquent extends BaseRepository implements LancamentoRepository
{
    
    protected $fieldSearchable = [
        "id",
        "tipo",
        "valor",
        "frete",
        "observacao",
        "data",
        "pontos",
        "distribuidor_id"
    ];
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Lancamento::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return LancamentoValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
