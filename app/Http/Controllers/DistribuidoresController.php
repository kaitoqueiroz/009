<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\DistribuidorCreateRequest;
use App\Http\Requests\DistribuidorUpdateRequest;
use App\Repositories\DistribuidorRepository;
use App\Validators\DistribuidorValidator;


class DistribuidoresController extends Controller
{

    /**
     * @var DistribuidorRepository
     */
    protected $repository;

    /**
     * @var DistribuidorValidator
     */
    protected $validator;


    public function __construct(DistribuidorRepository $repository, DistribuidorValidator $validator)
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
        $distribuidores = $this->repository->orderBy('id','desc')
            ->paginate();

        return response()->json([
            'data' => $distribuidores,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        return view('distribuidores.create');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  DistribuidorCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(DistribuidorCreateRequest $request)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $this->repository->create($request->all());

            return response()->json(['message' => 'Distribuidor created.']);
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
        $distribuidor = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $distribuidor,
            ]);
        }

        return view('distribuidores.show', compact('distribuidor'));
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

        $distribuidor = $this->repository->find($id);

        return view('distribuidores.edit', compact('distribuidor'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  DistribuidorUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(DistribuidorUpdateRequest $request, $id)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $this->repository->update($request->all(), $id);

            return response()->json(['message' => 'Distribuidor updated.']);
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
                'message' => 'Distribuidor deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'Distribuidor deleted.');
    }
}
