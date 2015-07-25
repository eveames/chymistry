<?php

namespace chymistry\Http\Controllers;

use Illuminate\Http\Request;

use chymistry\Http\Requests;
use chymistry\Http\Controllers\Controller;
use chymistry\Type;
use chymistry\Word;
use chymistry\User;
use chymistry\State;
use chymistry\Action;
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
    	$states = $user->states->sortBy('type_id');
    	return $states;
    }

    public function updateFullState() {
    	//updates states table
    }

    public function updateState(Request $request, $id) {
        //updates states table
        //$update = $request->all();
        $state = Auth::user()->states()->find($id);
        $state->lastStudied = $request->lastStudied;
        $state->accuracyArray = json_encode($request->accuracyArray);
        $state->rtArray = json_encode($request->rtArray);
        $state->stage = $request->stage;
        $state->priority = $request->priority;

        $state->save();
        


    }

    public function newState(Request $request) {
        //add to states table
        try {
            $index = $request->indexInStudyArray;
            
            $state = new State($request->all());
            $state->accuracyArray = json_encode($state->accuracyArray);
            $state->rtArray = json_encode($state->rtArray);
            $state->subtype = json_encode($state->subtype);
            Auth::user()->states()->save($state);
            return [$state->id, $index];
        }
        catch(Exception $e) {
            $errorMessage = 'Caught exception: ' . $e->getMessage();

            return $errorMessage;
        }
        

        
    }

    public function postAction(Request $request) {
    	//posts action to actions table
        try {
            $action = new Action($request->all());
            Auth::user()->actions()->save($action);
            return Auth::user()->name;
        }
        catch(Exception $e) {
            $errorMessage = 'Caught exception: ' . $e->getMessage();

            return $errorMessage;
        }


    }

}
