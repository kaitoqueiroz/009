<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\DepartamentoCreateRequest;
use App\Http\Requests\DepartamentoUpdateRequest;
use App\Repositories\DepartamentoRepository;
use App\Validators\DepartamentoValidator;


class DepartamentosController extends Controller
{

    /**
     * @var DepartamentoRepository
     */
    protected $repository;

    /**
     * @var DepartamentoValidator
     */
    protected $validator;


    public function __construct(DepartamentoRepository $repository, DepartamentoValidator $validator)
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
        $departamentos = $this->repository->orderBy('id','desc')
            ->paginate(null,['id','descricao']);

        return response()->json([
            'data' => $departamentos,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        return view('departamentos.create');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  DepartamentoCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(DepartamentoCreateRequest $request)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $this->repository->create($request->all());

            return response()->json(['message' => 'Departamento created.']);
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
        $departamento = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $departamento,
            ]);
        }

        return view('departamentos.show', compact('departamento'));
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

        $departamento = $this->repository->find($id);

        return view('departamentos.edit', compact('departamento'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  DepartamentoUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(DepartamentoUpdateRequest $request, $id)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $this->repository->update($request->all(), $id);

            return response()->json(['message' => 'Departamento updated.']);
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
                'message' => 'Departamento deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'Departamento deleted.');
    }
}
