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
    
    protected $fieldSearchable = [
        "id",
        "nome"=>'like',
        "fantasia"=>'like',
        "pai",
        "tipo_pessoa"=>'like',
        "cpf_cnpj"=>'like',
        "rg",
        "cep",
        "municipio",
        "uf"=>'like',
        "endereco",
        "numero",
        "complemento",
        "bairro",
        "fone",
        "celular",
        "email"
    ];
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
    * Specify Presenter class name
    *
    * @return mixed
    */
    public function presenter()
    {
        return "App\\Presenters\\DistribuidorPresenter";
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
