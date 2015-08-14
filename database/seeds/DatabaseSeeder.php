<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        DB::table('users')->insert([
            'name' => 'eveames',
            'email' => 'eveames.chem15@gmail.com',
            'password' => bcrypt('2039803485'),
            'isAdmin' => true,
            'type' => 'admin'
        ]);
        
        $this->call(CoursesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(TypesTableSeeder::class);
        $this->call(WordsTableSeeder::class);
        $this->call(StatesTableSeeder::class);
        $this->call(AlternatesTableSeeder::class);
        $this->call(TypeWordTableSeeder::class);
        //$this->call(CourseOwnerTableSeeder::class);

        Model::reguard();
    }
}
