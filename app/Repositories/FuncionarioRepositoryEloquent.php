<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\FuncionarioRepository;
use App\Entities\Funcionario;
use App\Validators\FuncionarioValidator;

/**
 * Class FuncionarioRepositoryEloquent
 * @package namespace App\Repositories;
 */
class FuncionarioRepositoryEloquent extends BaseRepository implements FuncionarioRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'ativo',
        'login'=>'like',
        'nome'=>'like',
        'cod_vendedor'=>'like'
    ];
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Funcionario::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return FuncionarioValidator::class;
    }

    /**
    * Specify Presenter class name
    *
    * @return mixed
    */
    public function presenter()
    {
        return "App\\Presenters\\FuncionarioPresenter";
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
