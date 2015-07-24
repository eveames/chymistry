<?php

namespace chymistry;

use Illuminate\Database\Eloquent\Model;
use chymistry\User;
use chymistry\Type;
use chymistry\Word;

class State extends Model
{
    //
    protected $fillable = ['type_id','subtype', 'qID','word_id', 'lastStudied', 
    'accuracyArray', 'rtArray', 'stage', 'priority'];
  	public function type() {
    	return $this->belongsTo('chymistry\Type');
	}

	public function user() {
		return $this->belongsTo('chymistry\User');
	}

   	public function word(){
    	if ($this->word) {
    		return $this->belongsTo('chymistry\Word');
    	}
    	else return null;
  	}
}
