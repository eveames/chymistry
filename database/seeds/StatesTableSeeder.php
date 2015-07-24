<?php

use Illuminate\Database\Seeder;

class StatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $statesList = [["user_id" => 2, "type_id" => 1, "subtype" => 'noDecimalPlace', 
        'qID' => '', 'word_id' => null, 'lastStudied' => 1437757698094, 'accuracyArray' =>
        [1,0,1], 'rtArray' => [294, 140, 500], 'priority' => 1437757798094, 'stage' => 'discover'],
        ["user_id" => 2, "type_id" => 2, "subtype" => ['wordRecall'], 
        'qID' => 'VocabBasic-all-matter-1-4', 'word_id' => 1, 'lastStudied' => 1437757699094, 'accuracyArray' =>
        [1,0], 'rtArray' => [294, 500], 'priority' => 1437757799094, 'stage' => 5]];

      	for ($i = 0 ; $i < count($statesList) ; ++$i) {
      		
      		DB::table('states')->insert([
            'type_id' => $statesList[$i]['type_id'],
            'user_id' => $statesList[$i]['user_id'],
            'qID' => $statesList[$i]['qID'],
            'word_id' => $statesList[$i]['word_id'],
            'lastStudied' => $statesList[$i]['lastStudied'],
            'subtype' => json_encode($statesList[$i]['subtype']),
            'accuracyArray' => json_encode($statesList[$i]['accuracyArray']),
            'rtArray' => json_encode($statesList[$i]['rtArray']),
            'stage' => $statesList[$i]['stage'],
            'priority' => $statesList[$i]['priority']
        ]);
      	}
    }
}
