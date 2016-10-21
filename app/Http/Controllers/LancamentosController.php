<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Lancamento;
use App\Distribuidor;
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
        $lancamentosAll = $this->repository->orderBy('data','desc')->all();
        $count = 30;
        if(isset($filtros["de"]) || isset($filtros["ate"])){
            $count = count($lancamentosAll);
            $lancamentosAll = $this->repository->orderBy('data','desc')->paginate($count);
        }
        $lancamentos = $this->repository->orderBy('data','desc')->paginate($count);
        foreach($lancamentos as $k=>$value){
            $value->distribuidor = Distribuidor::find($value->distribuidor_id);
            if(isset($value->distribuidor->pai)){
                $value->distribuidor->pai = Distribuidor::find($value->distribuidor->pai);
            }
            
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
                    unset($lancamentos[$k]);
                }
                
            }elseif(isset($filtros["uf"])){
                if(!($value->distribuidor->uf == $filtros["uf"])){
                    unset($lancamentos[$k]);
                }
            }
        }
        $saldo_total = 0;

        if(isset($filtros["de"]) || isset($filtros["ate"])){
            $lancamentosAll = $lancamentos;
        }
        foreach($lancamentosAll as $i=>$lancamento){
            if($lancamento["tipo"] == "credito" || 
                $lancamento["tipo"] == "pagamento" || 
                $lancamento["tipo"] == "comissao"){
                $saldo_total+=($lancamento["valor"] + $lancamento["frete"]);
            }else{
                $saldo_total-=($lancamento["valor"] + $lancamento["frete"]); 
            }
        }
        $lancamentos->saldo_total = $saldo_total;
        if($request->input('download')){
            return $this->pdf_saldo($lancamentos,$saldo_total);
        }
        return response()->json([
            'data' => $lancamentos,
            'saldo_total' => $saldo_total
        ]);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function saldo(Request $request)
    {
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $filtros = array();
        foreach(explode(";", $request->input('search')) as $key=>$val){
            if($val){
                $arr = explode(":", $val);
                $filtros[$arr[0]] = $arr[1];
            }
        }
        $repo = $this->repository;
        if(!$request->input('comissao')){
            // $repo = $repo->where("tipo","!=","comissao");
        }
        // dd($repo->toSql());
        
        $lancamentosAll = $repo->all();
        $count = 30;
        if(isset($filtros["de"]) || isset($filtros["ate"])){
            $count = count($lancamentosAll);
        }
        $lancamentos = $repo->orderBy('data','desc')->paginate($count);
        foreach($lancamentos as $k=>$value){
            $value->distribuidor = Distribuidor::find($value->distribuidor_id);
            if(isset($value->distribuidor->pai)){
                $value->distribuidor->pai = Distribuidor::find($value->distribuidor->pai);
            }
            
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
                    unset($lancamentos[$k]);
                }
                
            }elseif(isset($filtros["uf"])){
                if(!($value->distribuidor->uf == $filtros["uf"])){
                    unset($lancamentos[$k]);
                }
            }
        }
        $saldo_total = 0;

        if(isset($filtros["de"]) || isset($filtros["ate"])){
            $lancamentosAll = $lancamentos;
        }
        foreach($lancamentosAll as $i=>$lancamento){
            if($lancamento["tipo"] == "credito" || 
                $lancamento["tipo"] == "pagamento" || 
                $lancamento["tipo"] == "comissao"){
                $saldo_total+=($lancamento["valor"] + $lancamento["frete"]);
            }else{
                $saldo_total-=($lancamento["valor"] + $lancamento["frete"]);
            }
        }
        $lancamentos->saldo_total = $saldo_total;
        if($request->input('download')){
            return $this->pdf_saldo($lancamentos,$saldo_total);
        }
        return response()->json([
            'data' => $lancamentos,
            'saldo_total' => $saldo_total
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
            
            $dados = $request->all();
            $config = \App\Config::find(1);
            if($dados["tipo"] == 'debito'){
                $dados["pontos"] = round($dados["valor"]/($config->valor_ponto),2);
            }
            $lancamento = $this->repository->create($dados);
            
            if($dados["tipo"] == 'debito'){
                $distribuidor = \App\Distribuidor::find($lancamento->distribuidor_id);
                if($distribuidor->pai){
                    $nivel_1 = \App\Distribuidor::find($distribuidor->pai);
                    $comissao = new \App\Comissao();
                    $comissao->nivel = 1;
                    $comissao->data = $lancamento->data;
                    $comissao->origem = $lancamento->distribuidor_id;
                    $comissao->destino = $distribuidor->pai;
                    $comissao->valor = ($lancamento->valor/100) * $config->comissao_filho;
                    $comissao->pontos = $lancamento->valor/($config->valor_ponto*2);
                    $comissao->save();
                    
                    $lancamento_comissao = new Lancamento();
                    $lancamento_comissao->tipo = 'comissao';
                    $lancamento_comissao->valor = $comissao->valor;
                    $lancamento_comissao->observacao = "Comissão gerada automaticamente.";
                    $lancamento_comissao->data = $comissao->data;
                    $lancamento_comissao->distribuidor_id = $comissao->destino;
                    $lancamento_comissao->save();
                    if($nivel_1->pai){
                        $nivel_2 = \App\Distribuidor::find($nivel_1->pai);
                        $comissao = new \App\Comissao();
                        $comissao->nivel = 2;
                        $comissao->data = $lancamento->data;
                        $comissao->origem = $lancamento->distribuidor_id;
                        $comissao->destino = $nivel_1->pai;
                        $comissao->valor = ($lancamento->valor/100) * $config->comissao_neto;
                        $comissao->pontos = $lancamento->valor/($config->valor_ponto*3);
                        $comissao->save();
                    
                        $lancamento_comissao = new Lancamento();
                        $lancamento_comissao->tipo = 'comissao';
                        $lancamento_comissao->valor = $comissao->valor;
                        $lancamento_comissao->observacao = "Comissão gerada automaticamente.";
                        $lancamento_comissao->data = $comissao->data;
                        $lancamento_comissao->distribuidor_id = $comissao->destino;
                        $lancamento_comissao->save();
                        if($nivel_2->pai){
                            $nivel_3 = \App\Distribuidor::find($nivel_2->pai);
                            $comissao = new \App\Comissao();
                            $comissao->nivel = 3;
                            $comissao->data = $lancamento->data;
                            $comissao->origem = $lancamento->distribuidor_id;
                            $comissao->destino = $nivel_2->pai;
                            $comissao->valor = ($lancamento->valor/100) * $config->comissao_bisneto;
                            $comissao->pontos = $lancamento->valor/($config->valor_ponto*4);
                            $comissao->save();
                    
                            $lancamento_comissao = new Lancamento();
                            $lancamento_comissao->tipo = 'comissao';
                            $lancamento_comissao->valor = $comissao->valor;
                            $lancamento_comissao->observacao = "Comissão gerada automaticamente.";
                            $lancamento_comissao->data = $comissao->data;
                            $lancamento_comissao->distribuidor_id = $comissao->destino;
                            $lancamento_comissao->save();
                        }
                    }
                }
            }
            

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
    
    public function pdf_saldo($dados, $saldo_total)
    {
        $pdf = \App::make('dompdf.wrapper');
        $html = '
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
            }
            
            th, td {
                text-align: left;
                padding: 8px;
            }
            
            tr:nth-child(even){background-color: #f2f2f2}
        </style>
        <center><h1>Relatório de Saldo</h1></center>
        <table>
            <tr>
                <th> Distribuidor </th>
                <th> Pai </th>
                <th> Data </th>
                <th> Estado </th>
                <th> Tipo de Lançamento </th>
                <th> Saldo </th>
            </tr>
            ';
        foreach($dados as $dado){
            $html.= '
                <tr>
                    <td> '.$dado->distribuidor["nome"].' </td>
                    <td> '.(($dado->distribuidor["pai"])?$dado->distribuidor["pai"]["nome"]:'').' </td>
                    <td> '.$dado->data.' </td>
                    <td> '.$dado->distribuidor["uf"].' </td>
                    <td> '.$dado->tipo.' </td>
                    <td> '.number_format($dado->valor + $dado->frete, 2, ',', '.').' </td>
                </tr>
            ';
        }
        $html.= '
            <tr>
                <td colspan="6">  </td>
            </tr>
            <tr>
                <td>  </td>
                <td>  </td>
                <td>  </td>
                <td>  </td>
                <td> Saldo Total: </td>
                <td> '.number_format($saldo_total, 2, ',', '.').' </td>
            </tr>
        ';
        $html.='</table>';
        
        $pdf->loadHTML($html);
        
        return $pdf->stream();
    }
}
