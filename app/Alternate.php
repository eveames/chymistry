<?php

namespace chymistry;

use Illuminate\Database\Eloquent\Model;
use chymistry\Word;

class Alternate extends Model
{
    //
    protected $fillable = ['alt','correct', 'message', 'MCprompt'];

  	public function word() {
    	return $this->belongsTo('chymistry\Word');
	}
}
