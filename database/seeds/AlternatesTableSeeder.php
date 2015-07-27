<?php

use Illuminate\Database\Seeder;

class AlternatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $altList = [['word_id' => '1', 'alt' => 'stuff', 'correct' => 'close', 'message' => 'Close, but give the technical term!'],
        ['word_id' => '2', 'alt' => 'characteristic', 'correct' => 'close', 'message' => 'Close, but give the word usually used in the context of chemistry!'],
        ['word_id' => '2', 'alt' => 'trait', 'correct' => 'close', 'message' => 'Close, but give the word usually used in the context of chemistry!'],
        ['word_id' => '2', 'alt' => 'properties', 'correct' => 'correct', 'message' => ''],
        ['word_id' => '3', 'alt' => 'elements', 'correct' => 'correct', 'message' => ''],
        ['word_id' => '4', 'alt' => 'atoms', 'correct' => 'correct', 'message' => ''],
        ['word_id' => '5', 'alt' => 'molecules', 'correct' => 'correct', 'message' => ''],
        ['word_id' => '6', 'alt' => 'phase', 'correct' => 'correct', 'message' => 'Alternately, you could say "state of matter" or "physical state."'],
        ['word_id' => '6', 'alt' => 'phase of matter', 'correct' => 'correct', 'message' => 'Alternately, you could say "state of matter" or "physical state."'],
        ['word_id' => '6', 'alt' => 'physical state', 'correct' => 'correct', 'message' => 'Alternately, you could say "state of matter" or "phase."'],
        ['word_id' => '7', 'alt' => 'solids', 'correct' => 'correct', 'message' => ''],
        ['word_id' => '8', 'alt' => 'liquids', 'correct' => 'correct', 'message' => ''],
        ['word_id' => '8', 'alt' => 'fluid', 'correct' => 'close', 'message' => 'Not quite: fluid includes gases and any phase that flows.'],
        ['word_id' => '9', 'alt' => 'gases', 'correct' => 'correct', 'message' => ''],
        ['word_id' => '9', 'alt' => 'vapor', 'correct' => 'correct', 'message' => 'Or gas.'],
        ['word_id' => '9', 'alt' => 'vapors', 'correct' => 'correct', 'message' => 'Or gas.'],
        ['word_id' => '9', 'alt' => 'vapour', 'correct' => 'correct', 'message' => 'Or gas.'],
        ['word_id' => '9', 'alt' => 'vapours', 'correct' => 'correct', 'message' => 'Or gas.'],
        ['word_id' => '10', 'alt' => 'formula', 'correct' => 'close', 'message' => 'Close, but give the word when it\'s reported as percentages.'],
        ['word_id' => '10', 'alt' => 'empirical formula', 'correct' => 'close', 'message' => 'Close, but give the word when it\'s reported as percentages.'],
        ['word_id' => '11', 'alt' => 'pure substances', 'correct' => 'correct', 'message' => ''],
        ['word_id' => '11', 'alt' => 'substance', 'correct' => 'close', 'message' => 'Close, but be more specific and make it a phrase.'],
        ['word_id' => '11', 'alt' => 'substances', 'correct' => 'close', 'message' => 'Close, but be more specific and make it a phrase.'],
        ['word_id' => '12', 'alt' => 'compounds', 'correct' => 'correct', 'message' => ''],
        ['word_id' => '13', 'alt' => 'mixtures', 'correct' => 'correct', 'message' => ''],
        ['word_id' => '13', 'alt' => 'mix', 'correct' => 'close', 'message' => 'Close, but use the full technical term.'],
        ['word_id' => '13', 'alt' => 'mixes', 'correct' => 'close', 'message' => 'Close, but use the full technical term.'],
        ];

        for ($i = 0 ; $i < count($altList) ; ++$i) {
      		DB::table('alternates')->insert([
            'word_id' => $altList[$i]['word_id'],
            'alt' => $altList[$i]['alt'],
            'correct' => $altList[$i]['correct'],
            'message' => $altList[$i]['message']
        ]);
      	}
    }
    
}
