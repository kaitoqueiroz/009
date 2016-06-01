<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\FilialCreateRequest;
use App\Http\Requests\FilialUpdateRequest;
use App\Repositories\FilialRepository;
use App\Validators\FilialValidator;


class FiliaisController extends Controller
{

    /**
     * @var FilialRepository
     */
    protected $repository;

    /**
     * @var FilialValidator
     */
    protected $validator;


    public function __construct(FilialRepository $repository, FilialValidator $validator)
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
        $filiais = $this->repository->orderBy('id','desc')
            ->paginate(null,['id','descricao']);

        return response()->json([
            'data' => $filiais,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        return view('filiais.create');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  FilialCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(FilialCreateRequest $request)
    {

        try {
            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $this->repository->create($request->all());

            return response()->json(['message' => 'Filial created.']);
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
        $filial = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $filial,
            ]);
        }

        return view('filiais.show', compact('filial'));
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

        $filial = $this->repository->find($id);

        return view('filiais.edit', compact('filial'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  FilialUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(FilialUpdateRequest $request, $id)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $this->repository->update($request->all(), $id);

            return response()->json(['message' => 'Filial updated.']);
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
                'message' => 'Filial deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'Filial deleted.');
    }
}
