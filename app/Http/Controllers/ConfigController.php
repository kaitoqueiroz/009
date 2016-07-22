<?php

namespace App\Http\Controllers;

use App\Config;
use Illuminate\Http\Request;

use App\Http\Requests;

class ConfigController extends Controller
{
    public function mudar_senha(Request $request, $id)
    {
        $config = Config::find($request->input('id'));
        $config->usuario = $request->input('usuario');
        $config->senha = $request->input('nova_senha');
        $config->save();
        
        return response()->json(['message' => 'updated.']);
    }
    public function update(Request $request, $id)
    {
        $config = Config::find($request->input('id'));
        $config->comissao_filho = $request->input('comissao_filho');
        $config->comissao_neto = $request->input('comissao_neto');
        $config->comissao_bisneto = $request->input('comissao_bisneto');
        $config->save();
        
        return response()->json(['message' => 'updated.']);
    }
    public function store(Request $request)
    {
        $config = new Config();
        $config->comissao_filho = $request->input('comissao_filho');
        $config->comissao_neto = $request->input('comissao_neto');
        $config->comissao_bisneto = $request->input('comissao_bisneto');
        $config->save();
        return response()->json(['message' => 'updated.']);
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
        $config = Config::find($id);
        return response()->json($config);
    }
}
