<?php

use Illuminate\Database\Seeder;

class WordsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $vocabList = [
    ['word'=> 'matter', 'prompts'=> ['the stuff everything is made of', 
    'stuff', 'anything that has mass and occupies space', 'the physical material of everything']],
    ['word'=> 'property', 'prompts'=> ['a distinguishing characteristic', 
    'something that helps us tell one material from another', 
    'a particular quality or attribute of a material']],
    ['word'=> 'element', 'prompts'=> ['the fundamental types of matter', 
    'the simplest form of substance', 'a material that has only one type of atom']],
    ['word'=> 'atom', 'prompts'=> ['the building block of everything (if you ask a chemist)',
    'tiniest chunk of an element', 'particles molecules are made of']],
    ['word'=> 'molecule', 'prompts'=> ['a small group of atoms that is strongly attached to each other',
    'the smallest bit of a compound']],
    ['word'=> 'state of matter', 
    'prompts'=> ['whether something is a solid, liquid or gas']],
    ['word'=> 'solid', 'prompts'=> ['something hard', 
    'a material in a state where the atoms or molecules are held in fixed positions next to each other',
    'a material which does not flow and cannot be compressed']],
    ['word'=> 'liquid', 'prompts'=> ['something flowy (and heavy)', 
    'a material in a state in which the atoms or molecules are strongly held together but can move around',
    'a material in a state which can flow but cannot be compressed']],
    ['word'=> 'gas', 'prompts'=> ['something airy', 
    'a material in a state in which the atoms or molecules are far apart and bouncing around rapidly',
    'a material in a state which can flow and expands to fill available space']],
    ['word'=> 'composition', 'prompts'=> ['what kind of atoms a material is made of, and in what proportion',
    'percentage of each element in a material usually by mass', 'ratio of elements in a material, pure or impure']],
    ['word'=> 'pure substance', 'prompts'=> ['has only one type of atoms or molecules',
    'a material with constant properties and composition in all samples']],
    ['word'=> 'compound', 'prompts'=> ['a pure substance that is not a pure element',
    'a substance with a distinct ratio of different elements']],
    ['word'=> 'mixture', 'prompts'=> 
    ['a combination of substances that usually has properties similar or in between compared to the properties of the pure substances',
     'a material whose composition changes from sample to sample', 'a combo of materials that is not a compound']],
     ['word'=> 'solution', 'prompts'=> 
    ['a smooth, even mixture',
     'a mixture with constant composition', 'a homogeneous mixture']],
     ['word'=> 'homogeneous', 'prompts'=> 
    ['describes a smooth mixture',
     'describes a mixture with constant composition', 'describes a solution or mixture without lumps or bubbles']],
     ['word'=> 'heterogeneous', 'prompts'=> 
    ['describes an uneven, lumpy or bubbly mixture',
     'describes a mixture that is not a solution', 'describes a mixture with distinct regions of different composition']],
     ['word'=> 'intensive', 'prompts'=> 
    ['describes a property that does not depend on the size of the sample',
     'describes a property that stays the same when the amount changes']],
     ['word'=> 'extensive', 'prompts'=> 
    ['describes a property that depends on the size of the sample',
     'describes a property that increases when the amount of sample increases']],
    ['word'=> 'law', 'prompts'=> ['a reliable mathematical description of reality',
    'a mathematical summary of many observations and experiments']],
    ['word'=> 'hypothesis', 'prompts'=> ['a prediction or proposal about what happens or why',
    'an educated guess about an experiment or its explanation']],
    ['word'=> 'theory', 'prompts'=> ['a well-supported explanation for scientific observations',
    'an accepted interpretation of scientific results']],
    ['word'=> 'density', 'prompts'=> ['how heavy a substance is relative to its volume',
    'the ratio of mass to volume']],
    ['word'=> 'precision', 'prompts'=> ['how close together the results of a repeated experiment are',
    'the number of significant figures known for a quantity']],
    ['word'=> 'accuracy', 'prompts'=> ['how close a result is to the true value',
    'how correct a value is']],
    ['word'=> 'bias', 'prompts'=> ['a consistent experimental error',
    'an experimental error that causes repeated results to be off in the same direction']],
    ['word'=> 'atomic number', 'prompts'=> ['the number of protons in an atom',
    'the property by which the periodic table is organized']],
    ['word'=> 'empirical formula', 'prompts'=> ['a symbol representing the ratio of elements in a compound',
    'a way to show the relative numbers of each type of atom in a compound']],
    ['word'=> 'proton', 'prompts'=> ['the positively-charged particle',
    'a subatomic particle with positive charge']],
    ['word'=> 'neutron', 'prompts'=> ['a nuclear particle without charge',
    'a subatomic particle that has mass but not charge']],
    ['word'=> 'electron', 'prompts'=> ['the negatively-charged particle',
    'a subatomic particle with negative charge and very little mass']],
    ['word'=> 'nucleus', 'prompts'=> ['the tiny dense lump at the center of an atom',
    'the part of an atom that holds the positive charge and most of the mass']],
    ['word'=> 'shell', 'prompts'=> ['a group of electrons at similar energies and distances from the nucleus',
    'the principal grouping of electrons into energy levels']],
    ['word'=> 'mass number', 'prompts'=> ['the number of protons and neutrons in an atom',
    'the number that specifies which isotope an atom is']],
    ['word'=> 'isotope', 'prompts'=> ['atoms of the same element with different masses',
    'atoms with the same number of protons and different numbers of neutrons']],
    ['word'=> 'valence shell', 'prompts'=> ['the outermost electron shell that is not empty',
    'the electron shell that is responsible for bonding']],
    ['word'=> 'group', 'prompts'=> ['a column in the periodic table',
    'a groups of elements with similar properties and electron arrangements']],
    ['word'=> 'period', 'prompts'=> ['a row in the periodic table',
    'a group of elements that have the same valence electron shell']],
    ['word'=> 'molecular formula', 'prompts'=> ['a symbol representing the number of atoms of each type in a molecule',
    'a way to show how many atoms of each element are in a molecule']],
    ['word'=> 'alkali metal', 'prompts'=> ['the first group in the periodic table',
    'a group of soft, light, very reactive metals that form ions with a +1 charge']],
    ['word'=> 'alkaline earth metal', 'prompts'=> ['the second group in the periodic table',
    'a group of soft, light, reactive metals that form ions with a +2 charge']],
    ['word'=> 'halogen', 'prompts'=> ['the second-to-last group in the periodic table',
    'a group of reactive non-metals that tend to form ions with a -1 charge', 'a group of elements named for their ability to form salts']],
    ['word'=> 'noble gas', 'prompts'=> ['the last group in the periodic table',
    'a group of almost unreactive gaseous elements']],

    ];

    for ($i = 0 ; $i < count($vocabList) ; ++$i) {
      		DB::table('words')->insert([
            'word' => $vocabList[$i]['word'],
            'prompts' => json_encode($vocabList[$i]['prompts']) 
        ]);
      	}
    }
}
