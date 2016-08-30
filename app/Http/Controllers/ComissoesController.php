<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Distribuidor;
use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\ComissaoCreateRequest;
use App\Http\Requests\ComissaoUpdateRequest;
use App\Repositories\ComissaoRepository;
use App\Validators\ComissaoValidator;


class ComissoesController extends Controller
{

    /**
     * @var ComissaoRepository
     */
    protected $repository;

    /**
     * @var ComissaoValidator
     */
    protected $validator;


    public function __construct(ComissaoRepository $repository, ComissaoValidator $validator)
    {
        $this->repository = $repository;
        $this->validator  = $validator;
    }
    
    public function pontos(Request $request)
    {
        $request = $request->all();
        $filtros = array();
        if(isset($request["search"])){
            $filtros = explode(";",str_replace(":","='",$request["search"]."'"));
        }
        $qb = \DB::table("distribuidores")
        ->leftJoin("lancamentos","distribuidores.id","=","lancamentos.distribuidor_id")
        ->leftJoin("comissoes","distribuidores.id","=","comissoes.destino")
        ->addSelect("distribuidores.*")
        ->addSelect(\DB::raw("sum(case when (tipo='credito' or tipo='pagamento') then lancamentos.valor else 0 end) -
                sum(case when (tipo!='credito' and tipo!='pagamento') then lancamentos.valor else 0 end) as valor"))
        ->addSelect(\DB::raw("floor(coalesce(sum(lancamentos.pontos),0) + coalesce(sum(comissoes.pontos),0)) as pontos"))
        ->groupBy("distribuidores.id");
        
        foreach($filtros as $filtro){
            $qb = $qb->whereRaw($filtro);
        }
        
        $dados = $qb->get();
        return response()->json([
            'data' => $dados
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $filtros = array();
        foreach(explode(";", $request->input('search')) as $key=>$val){
            if($val){
                $arr = explode(":", $val);
                $filtros[$arr[0]] = $arr[1];
            }
        }
        $comissoes = $this->repository->orderBy('data','desc');
        $comissoes = $comissoes->paginate();
        foreach($comissoes as $k=>$value){
            $value->distribuidor = Distribuidor::find($value->destino);
            $value->origem = Distribuidor::find($value->origem);
            
            if(isset($filtros["de"]) || isset($filtros["ate"])){
                $data = strtotime($value->data);
                if(isset($filtros["de"])){
                    $de = strtotime($filtros["de"]);
                }else{
                    $de = strtotime(date("Y-m-d"));
                }
                if(isset($filtros["ate"])){
                    $ate = strtotime($filtros["ate"]);
                }else{
                    $ate = strtotime(date("Y-m-d"));
                }
                if(!($data > $de && $data < $ate)) {
                    unset($comissoes[$k]);
                }
                
            }elseif(isset($filtros["uf"])){
                if(!($value->distribuidor->uf == $filtros["uf"])){
                    unset($comissoes[$k]);
                }
            }
        }
        $saldo_total = 0;
        foreach($comissoes as $i=>$comissao){
            $saldo_total+=$comissao["valor"];
        }
        $comissoes->saldo_total = $saldo_total;
        //dd($comissoes);
        return response()->json([
            'data' => $comissoes,
            'saldo_total' => $saldo_total
        ]);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  ComissaoCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(ComissaoCreateRequest $request)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $comissao = $this->repository->create($request->all());

            $response = [
                'message' => 'Comissao created.',
                'data'    => $comissao->toArray(),
            ];

            if ($request->wantsJson()) {

                return response()->json($response);
            }

            return redirect()->back()->with('message', $response['message']);
        } catch (ValidatorException $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'error'   => true,
                    'message' => $e->getMessageBag()
                ]);
            }

            return redirect()->back()->withErrors($e->getMessageBag())->withInput();
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
        $comissao = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $comissao,
            ]);
        }

        return view('comissoes.show', compact('comissao'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ComissaoUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(ComissaoUpdateRequest $request, $id)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $comissao = $this->repository->update($request->all(), $id);

            $response = [
                'message' => 'Comissao updated.',
                'data'    => $comissao->toArray(),
            ];

            if ($request->wantsJson()) {

                return response()->json($response);
            }

            return redirect()->back()->with('message', $response['message']);
        } catch (ValidatorException $e) {

            if ($request->wantsJson()) {

                return response()->json([
                    'error'   => true,
                    'message' => $e->getMessageBag()
                ]);
            }

            return redirect()->back()->withErrors($e->getMessageBag())->withInput();
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
                'message' => 'Comissao deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'Comissao deleted.');
    }
}
