<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        DB::table('users')->insert([
            'name' => 'student',
            'email' => 'student@example.com',
            'password' => bcrypt('stuff1'),
            'isAdmin' => false,
            'type' => 'student',
            'course_id' => 1
        ]);

        DB::table('users')->insert([
            'name' => 'student32',
            'email' => 'student32@example.com',
            'password' => bcrypt('stuff1'),
            'isAdmin' => false,
            'type' => 'student',
            'course_id' => 2
        ]);
    }
}
