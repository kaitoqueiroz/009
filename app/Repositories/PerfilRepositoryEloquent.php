<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\PerfilRepository;
use App\Entities\Perfil;
use App\Validators\PerfilValidator;

/**
 * Class PerfilRepositoryEloquent
 * @package namespace App\Repositories;
 */
class PerfilRepositoryEloquent extends BaseRepository implements PerfilRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'descricao'=>'like',
        'nivel_privilegio'=>'like',
        'ativo'
    ];
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Perfil::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return PerfilValidator::class;
    }

    /**
    * Specify Presenter class name
    *
    * @return mixed
    */
    public function presenter()
    {
        return "App\\Presenters\\PerfilPresenter";
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
