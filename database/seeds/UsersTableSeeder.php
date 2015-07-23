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
            'name' => 'eveames',
            'email' => 'eveames.chem15@gmail.com',
            'password' => bcrypt('2039803485'),
            'isAdmin' => true,
            'type' => 'admin'
        ]);

        DB::table('users')->insert([
            'name' => 'student',
            'email' => 'student@example.com',
            'password' => bcrypt('stuff1'),
            'isAdmin' => false,
            'type' => 'student'
        ]);
    }
}
