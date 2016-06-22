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

Route::post('api/login', ['middleware' => ['cors'], 'uses' => 'Auth\AuthController@login']);
Route::get('sessions/logout', function(Request $request){
    return \Response::json([]);
});
Route::get('sessions', ['middleware' => ['auth','cors'], function()
{
    return \Response::json(['message'=>'success']);
}]);

Route::resource('api/distribuidores', 'DistribuidoresController');
Route::resource('api/lancamentos', 'LancamentosController');