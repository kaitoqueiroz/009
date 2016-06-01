<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\ModuloRepository;
use App\Entities\Modulo;
use App\Validators\ModuloValidator;

/**
 * Class ModuloRepositoryEloquent
 * @package namespace App\Repositories;
 */
class ModuloRepositoryEloquent extends BaseRepository implements ModuloRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'descricao'=>'like',
        'ativo'
    ];
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Modulo::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return ModuloValidator::class;
    }

    /**
    * Specify Presenter class name
    *
    * @return mixed
    */
    public function presenter()
    {
        return "App\\Presenters\\ModuloPresenter";
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
