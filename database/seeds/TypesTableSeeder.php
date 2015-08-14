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
      ["type" => 'GenChemVocab1', "factory" => 'VocabFactory', "listService" => "VocabListService", "subtypes" => 
      ['wordRecall'], "level" => 1.1, "name" => 'Vocab 1', "selected" => true, 
      "sequenceByID" => true, "sequenceBySubtype" => false, "priorityCalcAlgorithm" => 'fact', 'course' => 1],
      ["type" => 'MedChemVocab1', "factory" => 'VocabFactory', "listService" => "VocabListService", "subtypes" => 
      ['wordRecall'], "level" => 1.1, "name" => 'Vocab 1', "selected" => true, 
      "sequenceByID" => true, "sequenceBySubtype" => false, "priorityCalcAlgorithm" => 'fact', 'course' => 2],
      ["type" => 'GenChemIntroElements', "factory" => 'IntroElementsFactory', "listService" => "ElementsListService", "level" => 2.2, 
      "name" => 'Intro to Common Elements', "selected" => true,
      "subtypes" => ['nameSymbol', 'whereInTable','charge', 'family'], 
      "sequenceByID" => true, "sequenceBySubtype" => true, "priorityCalcAlgorithm" => 'fact', 'course' => 1],
      ["type" => 'MedChemIntroElements', "factory" => 'IntroElementsFactory', "listService" => "ElementsListService", "level" => 2.2, 
      "name" => 'Intro to Common Elements', "selected" => true,
      "subtypes" => ['nameSymbol', 'whereInTable','charge', 'family'], 
      "sequenceByID" => true, "sequenceBySubtype" => true, "priorityCalcAlgorithm" => 'fact', 'course' => 2],
      ["type" => 'GenChemLewisAtom', "factory" => 'LewisAtomFactory', "listService" => "ElementsListService", "level" => 2.3, 
      "name" => 'Lewis structures for single atoms and ions', "selected" => true,
      "subtypes" => ['atom', 'ion'], 
      "sequenceByID" => false, "sequenceBySubtype" => false, "priorityCalcAlgorithm" => 'PL', 'course' => 1],
      ["type" => 'MedChemLewisAtom', "factory" => 'LewisAtomFactory', "listService" => "ElementsListService", "level" => 2.3, 
      "name" => 'Lewis structures for single atoms and ions', "selected" => true,
      "subtypes" => ['atom', 'ion'], 
      "sequenceByID" => false, "sequenceBySubtype" => false, "priorityCalcAlgorithm" => 'PL', 'course' => 2],
      ["type" => 'GenChemNomenclature', "factory" => 'NomenclatureFactory', "listService" => "IonListService", "level" => 2.4, 
      "name" => 'Common ion and molecule nomenclature', "selected" => true,
      "subtypes" => ['ion', 'molecule', 'acid'], 
      "sequenceByID" => true, "sequenceBySubtype" => true, "priorityCalcAlgorithm" => 'fact', 'course' => 1],
      ["type" => 'MedChemNomenclature', "factory" => 'NomenclatureFactory', "listService" => "IonListService", "level" => 2.4, 
      "name" => 'Common ion and molecule nomenclature', "selected" => true,
      "subtypes" => ['ion', 'molecule', 'acid'], 
      "sequenceByID" => true, "sequenceBySubtype" => true, "priorityCalcAlgorithm" => 'fact', 'course' => 2],
      ["type" => 'MedChemIonicFormulas', "factory" => 'IonicFormulaFactory', "listService" => "IonListService", "level" => 2.5, 
      "name" => 'Formulas and names of ionic compounds and acids', "selected" => true,
      "subtypes" => ['acid', 'single salt', 'poly salt'], 
      "sequenceByID" => false, "sequenceBySubtype" => true, "priorityCalcAlgorithm" => 'PL', 'course' => 2],
      ["type" => 'GenChemIonicFormulas', "factory" => 'IonicFormulaFactory', "listService" => "IonListService", "level" => 2.5, 
      "name" => 'Formulas and names of ionic compounds and acids', "selected" => true,
      "subtypes" => ['acid', 'single salt', 'poly salt'], 
      "sequenceByID" => false, "sequenceBySubtype" => true, "priorityCalcAlgorithm" => 'PL', 'course' => 1],
      ["type" => 'GenChemDimensionalAnalysis', "factory" => 'DimensionalAnalysisFactory', "listService" => "", "level" => 0.5, 
      "name" => 'Dimensional Analysis', "selected" => true,
      "subtypes" => ['metricPrefixes', 'Type1F', 'Type1'], 
      "sequenceByID" => false, "sequenceBySubtype" => true, "priorityCalcAlgorithm" => 'PL', 'course' => 1],
      ["type" => 'MedChemDimensionalAnalysis', "factory" => 'DimensionalAnalysisFactory', "listService" => "", "level" => 0.5, 
      "name" => 'Dimensional Analysis', "selected" => true,
      "subtypes" => ['metricPrefixes', 'Type1F', 'Type1'], 
      "sequenceByID" => false, "sequenceBySubtype" => true, "priorityCalcAlgorithm" => 'PL', 'course' => 2],
      ["type" => 'GenChemVocab2', "factory" => 'VocabFactory', "listService" => "VocabListService", "subtypes" => 
      ['wordRecall'], "level" => 2.1, "name" => 'Vocab 2', "selected" => true, 
      "sequenceByID" => true, "sequenceBySubtype" => false, "priorityCalcAlgorithm" => 'fact', 'course' => 1],
      ["type" => 'MedChemVocab2', "factory" => 'VocabFactory', "listService" => "VocabListService", "subtypes" => 
      ['wordRecall'], "level" => 2.1, "name" => 'Vocab 2', "selected" => true, 
      "sequenceByID" => true, "sequenceBySubtype" => false, "priorityCalcAlgorithm" => 'fact', 'course' => 2],
      ["type" => 'GenChemVocab3', "factory" => 'VocabFactory', "listService" => "VocabListService", "subtypes" => 
      ['wordRecall'], "level" => 3.1, "name" => 'Vocab 3', "selected" => true, 
      "sequenceByID" => true, "sequenceBySubtype" => false, "priorityCalcAlgorithm" => 'fact', 'course' => 1],
      ["type" => 'MedChemVocab3', "factory" => 'VocabFactory', "listService" => "VocabListService", "subtypes" => 
      ['wordRecall'], "level" => 3.1, "name" => 'Vocab 3', "selected" => true, 
      "sequenceByID" => true, "sequenceBySubtype" => false, "priorityCalcAlgorithm" => 'fact', 'course' => 2],
      ["type" => 'GenChemVocab4', "factory" => 'VocabFactory', "listService" => "VocabListService", "subtypes" => 
      ['wordRecall'], "level" => 4.1, "name" => 'Vocab 4', "selected" => true, 
      "sequenceByID" => true, "sequenceBySubtype" => false, "priorityCalcAlgorithm" => 'fact', 'course' => 1],
      ["type" => 'MedChemVocab4', "factory" => 'VocabFactory', "listService" => "VocabListService", "subtypes" => 
      ['wordRecall'], "level" => 4.1, "name" => 'Vocab 4', "selected" => true, 
      "sequenceByID" => true, "sequenceBySubtype" => false, "priorityCalcAlgorithm" => 'fact', 'course' => 2],

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
