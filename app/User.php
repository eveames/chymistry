<?php

namespace chymistry;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use chymistry\Course;
use chymistry\State;
use chymistry\Action;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'email', 'password'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];
    public function courses(){
        return $this->hasMany('chymistry\Course');
    }
    public function ownsCourse(Course $course) {
        return $this->id == $course->owner;
    }
    public function isAdmin() {
        return $this->isAdmin;
    }
    public function isTeacher() {
        $type = $this->getAttribute('type');
        if ($type == 'teacher' || $type == 'admin') return true;
        else return false;
    }
    public function isStudent() {
        $type = $this->getAttribute('type');
        if ($type == 'student') return true;
        else return false;
    }
    public function actions() {
        return $this->hasMany('chymistry\Action');
    }
    public function states() {
        return $this->hasMany('chymistry\State');
    }
}
