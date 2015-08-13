<?php

namespace chymistry\Http\Controllers\Reg;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use chymistry\Http\Requests;
use chymistry\Http\Controllers\Controller;
use chymistry\AuthTraits\RedirectsUsers;
use chymistry\User;
use Validator;

class RegistrationController extends Controller
{

    use RedirectsUsers;

    protected $redirectTo = '/home';

    public function __construct()
    {
        $this->middleware('guest', ['except' => 'getLogout']);
    }

    public function register()
    {

        return view('reg.register');

    }

    public function postRegister(Request $request)
    {
        $validator = $this->validator($request->all());

        if ($validator->fails()) {
            $this->throwValidationException(
                $request, $validator
            );
        }

        Auth::login($this->create($request->all()));

        return redirect($this->redirectPath());
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
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
            'course_id' => 'required'
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
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'course_id' => $data['course_id']
        ]);
    }

}