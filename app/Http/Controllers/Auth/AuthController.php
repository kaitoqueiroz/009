<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware($this->guestMiddleware(), ['except' => 'logout']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'username' => 'required|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'username' => $data['username'],
            'password' => bcrypt($data['password']),
        ]);
    }

    public function login(Request $request){
        $request->session()->put('user', $request->input('username'));
        return \Response::json(['message'=>'success']);



        
        $config = config('adldap_auth');
        $provider = new \Adldap\Connections\Provider($config["server_config"]);

        $ad = new \Adldap\Adldap();
        $ad->addProvider('default', $provider);

        $return = null;
        // Try connecting to the provider.
        try {
            // Connect using the providers name.
            $ad->connect('default');

            try {
                if ($provider->auth()->attempt($request->input('username'),$request->input('password'),true)) {
                    $request->session()->put('user', $request->input('username'));
                    $return = \Response::json(['message'=>'success']);
                } else {
                    $return = \Response::json([ 'error' => 401, 'message' => 'Usuário e/ou senha incorreto(s)' ],401);
                }
            } catch (\Adldap\Exceptions\Auth\UsernameRequiredException $e) {
                $return = \Response::json([ 'error' => 401, 'message' => 'Campo Usuário é obrigatório.' ],401);
            } catch (\Adldap\Exceptions\Auth\PasswordRequiredException $e) {
                $return = \Response::json([ 'error' => 401, 'message' => 'Campo Senha é obrigatório.' ],401);
            }
        } catch (\Adldap\Exceptions\Auth\BindException $e) {
            $return = \Response::json([ 'error' => 500, 'message' => 'Não foi possível se conectar ao LDAP.' ],500);

        } catch (\Adldap\Exceptions\ConnectionException $e) {
            $return = \Response::json([ 'error' => 500, 'message' => 'Não foi possível se conectar ao LDAP.' ],500);
        }
        return $return;
    }
}
