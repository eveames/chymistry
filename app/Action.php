<?php

namespace chymistry;

use Illuminate\Database\Eloquent\Model;
use chymistry\User;

class Action extends Model
{
    //
    protected $fillable = ['type','detail', 'whichButton', 'description', 'time'];
  	public function owner() {
    	return $this->belongsTo('chymistry\User');
	}
   	
}
