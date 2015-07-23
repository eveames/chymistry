<?php

namespace chymistry;

use Illuminate\Database\Eloquent\Model;
use chymistry\Course;

// refers to the same type as used in js
// roughly, the group of facts or PLFactory
class Type extends Model
{
    //protected $table = 'types';
    protected $fillable = ['name','course', 'type','factory', 'level', 
    'selected', 'subtypes', 'sequenceByID', 'priorityCalcAlgorithm'];
  	public function course() {
    	return $this->belongsTo('chymistry\Course');
	}
   	public function words(){
    	return $this->hasMany('chymistry\Word');
  	}

  	public function states() {
  		return $this->hasMany('chymistry\State');
  	}
}
