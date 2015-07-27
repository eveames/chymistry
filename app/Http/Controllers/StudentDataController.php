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
use Debugbar;

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

    public function updateFullState(Request $request) {
    	//updates states table
        try {
            //Debugbar::info($request);
            $j = count($request);
            //Debugbar::info('length of array'.$j);
            $i = 0;
            while (isset($request[$i]['priority'])) {
                
                
                if (isset($request[$i]['states_id'])) {
                    //Debugbar::info($request[$i]);
                    $id = $request[$i]['states_id'];
                    $state = Auth::user()->states()->find($id);
                    $state->lastStudied = $request[$i]['lastStudied'];
                    $state->accuracyArray = json_encode($request[$i]['accuracyArray']);
                    $state->rtArray = json_encode($request[$i]['rtArray']);
                    $state->stage = $request[$i]['stage'];
                    $state->priority = $request[$i]['priority'];
                    //Debugbar::info('state w/ id '. $state);
                    $state->save();
                }

                else {
                    $state = new State();
                    $state->type_id = $request[$i]['type_id'];
                    if (isset($request[$i]['word_id'])) $state->word_id = $request[$i]['word_id'];
                    if (isset($request[$i]['qID'])) $state->qID = $request[$i]['qID'];
                    $state->lastStudied = $request[$i]['lastStudied'];
                    $state->priority = $request[$i]['priority'];
                    $state->stage = $request[$i]['stage'];
                    //Debugbar::info('state w/o id '.$state);
                    $state->accuracyArray = json_encode($request[$i]['accuracyArray']);
                    $state->rtArray = json_encode($request[$i]['rtArray']);
                    $state->subtype = json_encode($request[$i]['subtype']);
                    Auth::user()->states()->save($state);
                }
                ++$i;
            }
            return "Data saved successfully";
        }
        catch (Exception $e) {
            $errorMessage = 'Caught exception: ' . $e->getMessage();

            return $errorMessage;
        }
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
            return [$request->qID, $action->type];
        }
        catch(Exception $e) {
            $errorMessage = 'Caught exception: ' . $e->getMessage();

            return $errorMessage;
        }


    }

}
