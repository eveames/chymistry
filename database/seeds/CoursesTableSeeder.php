<?php

use Illuminate\Database\Seeder;

class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('courses')->insert([
            'name' => 'General Chemistry 1',
            'user_id' => '1',
        ]);

        DB::table('courses')->insert([
            'name' => 'Intro to Medical Chemistry',
            'user_id' => '1',
        ]);
    }
}
