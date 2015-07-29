<?php

namespace chymistry\Http\Controllers;

use Illuminate\Http\Request;

use chymistry\Http\Requests;
use chymistry\Http\Controllers\Controller;

class MainController extends Controller
{
    //

    public function index() {
    	//if (Auth::check()) {
    	//	return redirect('/');
    	//}
    	return view('welcome');
    }

    public function about() {
    	return view('about');
    }

    public function home() {
    	//check for role? currently a placeholder
    	return view('main');
    }

    public function demo() {
        return view('demo');
    }
}
