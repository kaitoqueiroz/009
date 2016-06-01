<?php
use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('sessions', ['middleware' => ['auth','cors'], function()
{
    return \Response::json(['message'=>'success']);
}]);
Route::get('sessions/logout', function(Request $request){
    return \Response::json($request->session()->flush());
});
Route::post('api/login', ['middleware' => ['cors'], 'uses' => 'Auth\AuthController@login']);

Route::get('api/modulos_funcionalidades', ['middleware' => ['cors'], 'uses' => 'ModulosController@modulos_funcionalidades']);

Route::resource('api/modulos', 'ModulosController');
Route::resource('api/perfis', 'PerfisController');
Route::resource('api/departamentos', 'DepartamentosController');
Route::resource('api/filiais', 'FiliaisController');
Route::resource('api/funcionarios', 'FuncionariosController');