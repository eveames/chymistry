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
    	return $this->belongsTo('chymistry\User', 'user_id', 'id');
	}
   	public function questions(){
    	return $this->hasMany('chymistry\Type');
  	}
    public function members() {
      return $this->hasMany('chymistry\User');
    }
  }

