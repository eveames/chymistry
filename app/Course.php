<?php

namespace chymistry;

use Illuminate\Database\Eloquent\Model;
use chymistry\User;
use chymistry\Type;

class Course extends Model
{
    //
    protected $table = 'courses';
    protected $fillable = ['name'];
  	public function owner() {
    	return $this->belongsTo('chymistry\User');
	}
   	public function questions(){
    	return $this->hasMany('chymistry\Type');
  	}
  }

