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
        //["type" => 'Vocab2', "factory" => 'VocabFactory', "subtypes" => 
      //['wordRecall'], "level" => 2.1, "name" => 'Vocab Unit 2', "selected" => true, 
      //"sequenceByID" => true, "priorityCalcAlgorithm" => 'fact', 'course' => 1]

      //'nameSymbol', 'whereInTable'

        $typesList = 
        [["type" => 'SigFig', "factory" => 'SigFigPLFactory', "listService" => "", "level" => 1, 
    	"name" => 'Recognizing sig figs', "selected" => true, "subtypes" => 
      ['noDecimalPlace', 'decimalPlace', 'allAfterPoint', 'decimalPointNoPlaces'], 
      "sequenceByID" => false, "sequenceBySubtype" => true, "priorityCalcAlgorithm" => 'PL', 'course' => 1],
      ["type" => 'VocabBasic', "factory" => 'VocabFactory', "listService" => "VocabListService", "subtypes" => 
      ['wordRecall'], "level" => 1.1, "name" => 'Basic Vocab', "selected" => true, 
      "sequenceByID" => true, "sequenceBySubtype" => false, "priorityCalcAlgorithm" => 'fact', 'course' => 1],
      ["type" => 'IntroElements', "factory" => 'IntroElementsFactory', "listService" => "ElementsListService", "level" => 2.2, 
      "name" => 'Intro to Common Elements', "selected" => true,
      "subtypes" => ['nameSymbol', 'whereInTable','charge', 'family'], 
      "sequenceByID" => true, "sequenceBySubtype" => true, "priorityCalcAlgorithm" => 'fact', 'course' => 1],
      ["type" => 'LewisAtom', "factory" => 'LewisAtomFactory', "listService" => "ElementsListService", "level" => 2.3, 
      "name" => 'Lewis structures for single atoms and ions', "selected" => true,
      "subtypes" => ['atom', 'ion'], 
      "sequenceByID" => false, "sequenceBySubtype" => false, "priorityCalcAlgorithm" => 'PL', 'course' => 1],
      ["type" => 'Nomenclature', "factory" => 'NomenclatureFactory', "listService" => "IonListService", "level" => 2.4, 
      "name" => 'Common ion and molecule nomenclature (long list)', "selected" => true,
      "subtypes" => ['ion', 'molecule', 'acid'], 
      "sequenceByID" => true, "sequenceBySubtype" => true, "priorityCalcAlgorithm" => 'fact', 'course' => 1],
      ["type" => 'Nomenclature', "factory" => 'NomenclatureFactory', "listService" => "IonListService", "level" => 2.4, 
      "name" => 'Common ion and molecule nomenclature (short list)', "selected" => true,
      "subtypes" => ['ion', 'molecule', 'acid'], 
      "sequenceByID" => true, "sequenceBySubtype" => true, "priorityCalcAlgorithm" => 'fact', 'course' => 2],
      ["type" => 'IonicFormulas', "factory" => 'IonicFormulaFactory', "listService" => "IonListService", "level" => 2.5, 
      "name" => 'Formulas and names of ionic compounds and acids (short list)', "selected" => true,
      "subtypes" => ['acid', 'single salt', 'poly salt'], 
      "sequenceByID" => false, "sequenceBySubtype" => true, "priorityCalcAlgorithm" => 'PL', 'course' => 2],
      ["type" => 'IonicFormulas', "factory" => 'IonicFormulaFactory', "listService" => "IonListService", "level" => 2.5, 
      "name" => 'Formulas and names of ionic compounds and acids (long list)', "selected" => true,
      "subtypes" => ['acid', 'single salt', 'poly salt'], 
      "sequenceByID" => false, "sequenceBySubtype" => true, "priorityCalcAlgorithm" => 'PL', 'course' => 1],
      ["type" => 'DimensionalAnalysis', "factory" => 'DimensionalAnalysisFactory', "listService" => "", "level" => 0.5, 
      "name" => 'Dimensional Analysis', "selected" => true,
      "subtypes" => ['metricPrefixes'], 
      "sequenceByID" => false, "sequenceBySubtype" => true, "priorityCalcAlgorithm" => 'PL', 'course' => 1]

      ];

      	for ($i = 0 ; $i < count($typesList) ; ++$i) {
      		DB::table('types')->insert([
            'type' => $typesList[$i]['type'],
            'factory' => $typesList[$i]['factory'],
            'listService' => $typesList[$i]['listService'],
            'level' => $typesList[$i]['level'],
            'name' => $typesList[$i]['name'],
            'selected' => $typesList[$i]['selected'],
            'subtypes' => json_encode($typesList[$i]['subtypes']),
            'sequenceByID' => $typesList[$i]['sequenceByID'],
            'sequenceBySubtype' => $typesList[$i]['sequenceBySubtype'],
            'priorityCalcAlgorithm' => $typesList[$i]['priorityCalcAlgorithm'],
            'course_id' => $typesList[$i]['course']
        ]);
      	}
        
    }
}
