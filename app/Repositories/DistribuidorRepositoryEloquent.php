<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\DistribuidorRepository;
use App\Entities\Distribuidor;
use App\Validators\DistribuidorValidator;

/**
 * Class DistribuidorRepositoryEloquent
 * @package namespace App\Repositories;
 */
class DistribuidorRepositoryEloquent extends BaseRepository implements DistribuidorRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Distribuidor::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return DistribuidorValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
