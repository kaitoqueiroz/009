<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Modulo;
use DB;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\ModuloCreateRequest;
use App\Http\Requests\ModuloUpdateRequest;
use App\Repositories\ModuloRepository;
use App\Validators\ModuloValidator;


class ModulosController extends Controller
{

    /**
     * @var ModuloRepository
     */
    protected $repository;

    /**
     * @var ModuloValidator
     */
    protected $validator;


    public function __construct(ModuloRepository $repository, ModuloValidator $validator)
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
        $modulos = $this->repository->orderBy('id','desc')
            ->paginate(null,['id','descricao','ativo']);

        return response()->json([
            'data' => $modulos,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        return view('modulos.create');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  ModuloCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(ModuloCreateRequest $request)
    {
        try {
            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $modulo = $this->repository->create($request->all());
            $modulo = Modulo::find($modulo['data']['id']);
            foreach ($request->input('funcionalidades') as $funcionalidade) {
                $funcionalidade['modulo_id'] = $modulo->id;
                $modulo->funcionalidades()->create($funcionalidade);
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
        $modulo = Modulo::find($id);

        $modulo['funcionalidades'] = $modulo->funcionalidades()
            ->where('modulo_id', $id)->get();

        return response()->json($modulo);
    }

    public function modulos_funcionalidades(){

        $modulos = Modulo::with('funcionalidades')->where('ativo', 1)->get();
        return response()->json([
            'data' => $modulos,
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

        $modulo = $this->repository->find($id);

        return view('modulos.edit', compact('modulo'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ModuloUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(ModuloUpdateRequest $request, $id)
    {
        try {
            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $modulo = $this->repository->update($request->all(), $id);

            if(is_array($request->input('funcionalidades'))){

                DB::table('funcionalidades')->where('modulo_id', '=', $modulo['data']['id'])
                    ->delete();
                $modulo = Modulo::find($modulo['data']['id']);
                foreach ($request->input('funcionalidades') as $funcionalidade) {
                    $funcionalidade['modulo_id'] = $modulo->id;
                    $modulo->funcionalidades()->create($funcionalidade);
                }
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
                'message' => 'Modulo deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'Modulo deleted.');
    }
}
