<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\LancamentoCreateRequest;
use App\Http\Requests\LancamentoUpdateRequest;
use App\Repositories\LancamentoRepository;
use App\Validators\LancamentoValidator;


class LancamentosController extends Controller
{

    /**
     * @var LancamentoRepository
     */
    protected $repository;

    /**
     * @var LancamentoValidator
     */
    protected $validator;


    public function __construct(LancamentoRepository $repository, LancamentoValidator $validator)
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
        $lancamentos = $this->repository->orderBy('id','desc')
            ->paginate();

        return response()->json([
            'data' => $lancamentos,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        return view('lancamentos.create');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  LancamentoCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(LancamentoCreateRequest $request)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $this->repository->create($request->all());

            return response()->json(['message' => 'Lancamento created.']);
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
        $lancamento = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $lancamento,
            ]);
        }

        return view('lancamentos.show', compact('lancamento'));
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

        $lancamento = $this->repository->find($id);

        return view('lancamentos.edit', compact('lancamento'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  LancamentoUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(LancamentoUpdateRequest $request, $id)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $this->repository->update($request->all(), $id);

            return response()->json(['message' => 'Lancamento updated.']);
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
                'message' => 'Lancamento deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'Lancamento deleted.');
    }
}
