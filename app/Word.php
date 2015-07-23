<?php

namespace chymistry;

use Illuminate\Database\Eloquent\Model;
use chymistry\State;

class Word extends Model
{
    //
    protected $fillable = ['word', 'type', 'prompts', 'alternates'];
  	public function type() {
    	return $this->belongsTo('chymistry\Type');
	}
   	public function state(){
    	return $this->hasMany('chymistry\State');
  	}
}
