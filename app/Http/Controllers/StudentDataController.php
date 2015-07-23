<?php

namespace chymistry\Http\Controllers;

use Illuminate\Http\Request;

use chymistry\Http\Requests;
use chymistry\Http\Controllers\Controller;
use chymistry\Type;

class StudentDataController extends Controller
{
    //controls API used by angular
    public function getVocabList($typesList) {
    	//returns json object: {{type: type, list: {word: word, prompts: [], alternates: []}}, {type, list} }
    }

    public function getTypesList() {
    	//returns json object list all available topics
    	//maybe someday sorts them by course, student progress?
    	$typesList = Type::all();
    	return $typesList;
    }

    public function getStatesList($studyArray) {
    	//returns full list of states for all items in study array, by user
    }

    public function updateState() {
    	//updates states table
    }

    public function postAction() {
    	//posts action to actions table
    }

}
