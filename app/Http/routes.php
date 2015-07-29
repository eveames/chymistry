<?php

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
// '/' needs to redirect if authenticated to home
Route::get('/', 'MainController@index');
Route::get('about', 'MainController@about');
Route::get('home', ['middleware' => 'auth', 'uses' => 'MainController@home']);

//for testing
Route::get('/demo', 'MainController@demo');


Route::get('reg', 'Reg\RegistrationController@register');
Route::post('reg', 'Reg\RegistrationController@postRegister');
Route::get('login', 'Login\LoginController@login');
Route::post('login', 'Login\LoginController@postLogin');
Route::get('logout', 'Login\LoginController@logout');

Route::group(['middleware' => 'auth', 'prefix' => 'api/student'], function () {
	Route::get('vocabList/', 'StudentDataController@getFullVocabList');
    Route::get('vocabList/{type_id}', 'StudentDataController@getVocabList');
    Route::get('typesList', 'StudentDataController@getTypesList');
    Route::get('states', 'StudentDataController@getStatesList');
    Route::post('states', 'StudentDataController@updateFullState');
    Route::post('states/new', 'StudentDataController@newState');
    Route::post('states/{id}', 'StudentDataController@updateState');
    Route::post('actions', 'StudentDataController@postAction');
});

Route::controllers([
   'password' => 'Auth\PasswordController',
]);