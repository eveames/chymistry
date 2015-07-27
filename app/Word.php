<?php

namespace chymistry;

use Illuminate\Database\Eloquent\Model;
use chymistry\State;
use chymistry\Alternate;

class Word extends Model
{
    //
    protected $fillable = ['word', 'type_id', 'prompts'];
  	public function type() {
    	return $this->belongsTo('chymistry\Type');
	}
   	public function state(){
    	return $this->hasMany('chymistry\State');
  	}

  	public function alternates(){
    	return $this->hasMany('chymistry\Alternate');
  	}
}
