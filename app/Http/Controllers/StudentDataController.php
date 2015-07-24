<?php

namespace chymistry\Http\Controllers;

use Illuminate\Http\Request;

use chymistry\Http\Requests;
use chymistry\Http\Controllers\Controller;
use chymistry\Type;
use chymistry\Word;
use chymistry\User;
use Auth;

class StudentDataController extends Controller
{
    //controls API used by angular
    public function getVocabList($type_id) {
    	//returns json object:  {{word: word, prompts: [], alternates: []}, {}, etc}
    	$type = Type::find($type_id);
    	$vocabList = $type->words;
    	return $vocabList;
    }

    public function getFullVocabList() {
    	//returns json object:  {{word: word, prompts: [], alternates: []}, {}, etc}
    	$vocabList = Word::orderBy('type_id')->get();
    	return $vocabList;
    }

    public function getTypesList() {
    	//returns json object list all available topics
    	//maybe someday sorts them by course, student progress?
    	$typesList = Type::all();
    	return $typesList;
    }

    public function getStatesList() {
    	//returns full list of states for all items in study array, by user
    	$user = Auth::user();
    	$states = $user->states;
    	return $states;
    }

    public function updateState() {
    	//updates states table
    }

    public function postAction() {
    	//posts action to actions table
    }

}
