<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\DepartamentoRepository;
use App\Entities\Departamento;
use App\Validators\DepartamentoValidator;

/**
 * Class DepartamentoRepositoryEloquent
 * @package namespace App\Repositories;
 */
class DepartamentoRepositoryEloquent extends BaseRepository implements DepartamentoRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'descricao'=>'like'
    ];
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Departamento::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return DepartamentoValidator::class;
    }

    /**
    * Specify Presenter class name
    *
    * @return mixed
    */
    public function presenter()
    {
        return "App\\Presenters\\DepartamentoPresenter";
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
