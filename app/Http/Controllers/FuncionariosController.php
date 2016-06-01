<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Funcionario;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\FuncionarioCreateRequest;
use App\Http\Requests\FuncionarioUpdateRequest;
use App\Repositories\FuncionarioRepository;
use App\Validators\FuncionarioValidator;


class FuncionariosController extends Controller
{

    /**
     * @var FuncionarioRepository
     */
    protected $repository;

    /**
     * @var FuncionarioValidator
     */
    protected $validator;


    public function __construct(FuncionarioRepository $repository, FuncionarioValidator $validator)
    {
        $this->middleware(['auth','cors']);
        $this->repository = $repository;
        $this->validator  = $validator;
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $funcionarios = $this->repository->orderBy('id','desc')
            ->paginate(null,['id','nome','ativo']);

        return response()->json([
            'data' => $funcionarios,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        return view('funcionarios.create');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  FuncionarioCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(FuncionarioCreateRequest $request)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $funcionario = $this->repository->create($request->all());
            $funcionario = Funcionario::find($funcionario['data']['id']);

            if(is_array($request->input('perfis'))){
                $funcionario->perfis()->sync($request->input('perfis'));
            }
            if(is_array($request->input('departamentos'))){
                $funcionario->departamentos()->sync($request->input('departamentos'));
            }
            if(is_array($request->input('filiais'))){
                $funcionario->filiais()->sync($request->input('filiais'));
            }

            $response = [
                'message' => 'Funcionario created.'
            ];

            return response()->json($response);
        } catch (ValidatorException $e) {
            return response()->json([
                'error'   => true,
                'message' => $e->getMessageBag()
            ]);
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $funcionario = Funcionario::find($id);

        $funcionario['perfis'] = $funcionario->perfis()
            ->where('funcionario_id', $id)->get();

        $funcionario['departamentos'] = $funcionario->departamentos()
            ->where('funcionario_id', $id)->get();

        $funcionario['filiais'] = $funcionario->filiais()
            ->where('funcionario_id', $id)->get();

        return response()->json([
            'data' => $funcionario,
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $funcionario = $this->repository->find($id);

        return view('funcionarios.edit', compact('funcionario'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  FuncionarioUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(FuncionarioUpdateRequest $request, $id)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $funcionario = $this->repository->update($request->all(), $id);
            $funcionario = Funcionario::find($funcionario['data']['id']);

            if(is_array($request->input('perfis'))){
                $funcionario->perfis()->sync($request->input('perfis'));
            }
            if(is_array($request->input('departamentos'))){
                $funcionario->departamentos()->sync($request->input('departamentos'));
            }
            if(is_array($request->input('filiais'))){
                $funcionario->filiais()->sync($request->input('filiais'));
            }

            $response = [
                'message' => 'Funcionario updated.'
            ];

            return response()->json($response);
        } catch (ValidatorException $e) {
            return response()->json([
                'error'   => true,
                'message' => $e->getMessageBag()
            ]);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleted = $this->repository->delete($id);

        if (request()->wantsJson()) {

            return response()->json([
                'message' => 'Funcionario deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'Funcionario deleted.');
    }
}
