<?php

use Illuminate\Database\Seeder;

class TypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $typesList = 
        [["type" => 'SigFigPL', "factory" => 'SigFigPLFactory', "level" => 1, 
    	"name" => 'Recognizing sig figs', "selected" => true,
    	"subtypes" => ['noDecimalPlace', 'decimalPlace', 'allAfterPoint', 'decimalPointNoPlaces'], 
    	"sequenceByID" => false, "priorityCalcAlgorithm" => 'PL', 'course' => 1],
      ["type" => 'VocabBasic', "factory" => 'VocabFactory', "subtypes" => 
      ['wordRecall'], "level" => 1.1, "name" => 'Basic Vocab', "selected" => true, 
      "sequenceByID" => true, "priorityCalcAlgorithm" => 'fact', 'course' => 1],
      ["type" => 'Vocab2', "factory" => 'VocabFactory', "subtypes" => 
      ['wordRecall'], "level" => 2.1, "name" => 'Vocab Unit 2', "selected" => true, 
      "sequenceByID" => true, "priorityCalcAlgorithm" => 'fact', 'course' => 1]];

      	for ($i = 0 ; $i < count($typesList) ; ++$i) {
      		DB::table('types')->insert([
            'type' => $typesList[$i]['type'],
            'factory' => $typesList[$i]['factory'],
            'level' => $typesList[$i]['level'],
            'name' => $typesList[$i]['name'],
            'selected' => $typesList[$i]['selected'],
            'subtypes' => json_encode($typesList[$i]['subtypes']),
            'sequenceByID' => $typesList[$i]['sequenceByID'],
            'priorityCalcAlgorithm' => $typesList[$i]['priorityCalcAlgorithm'],
            'course' => $typesList[$i]['course']
        ]);
      	}
        
    }
}
