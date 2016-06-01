<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Perfil;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\PerfilCreateRequest;
use App\Http\Requests\PerfilUpdateRequest;
use App\Repositories\PerfilRepository;
use App\Validators\PerfilValidator;


class PerfisController extends Controller
{

    /**
     * @var PerfilRepository
     */
    protected $repository;

    /**
     * @var PerfilValidator
     */
    protected $validator;


    public function __construct(PerfilRepository $repository, PerfilValidator $validator)
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
        $perfis = $this->repository->orderBy('id','desc')
            ->paginate(null,['id','descricao','nivel_privilegio','ativo']);
        return response()->json([
            'data' => $perfis,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        return view('perfis.create');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  PerfilCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(PerfilCreateRequest $request)
    {
        try {
            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);
            $perfil = $this->repository->create($request->all());
            $perfil = Perfil::find($perfil['data']['id']);
            if(is_array($request->input('funcionalidades'))){
                $perfil->funcionalidades()->sync($request->input('funcionalidades'));
            }

            return response()->json(['message' => 'success']);
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
        $perfil = Perfil::find($id);

        $perfil['funcionalidades'] = $perfil->funcionalidades()
            ->where('perfil_id', $id)->get();

        return response()->json($perfil);
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

        $perfil = $this->repository->find($id);

        return view('perfis.edit', compact('perfil'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  PerfilUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(PerfilUpdateRequest $request, $id)
    {
        try {
            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $perfil = $this->repository->update($request->all(), $id);
            $perfil = Perfil::find($perfil['data']['id']);

            if(is_array($request->input('funcionalidades'))){
                $perfil->funcionalidades()->sync($request->input('funcionalidades'));
            }

            $response = [
                'message' => 'success'
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
                'message' => 'Perfil deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'Perfil deleted.');
    }
}
