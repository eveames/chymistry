@extends('layouts.master')

@section('content')
<h1>About Chemiatria</h1>
<div class="container"><section>
	<h3>Overview</h3>
	<p>Welcome! This is a program in progress intended to help you learn chemistry thoroughly, painlessly and forever. I hope you find it useful. If you are a student, please report your impressions, suggestions and corrections as you use it using the appropriate buttons. Chemiatria will always be completely free for individual students to use. I may sometime institute a small fee for teachers to get student data.</p>
	<p>If you are a teacher, feel free to contact me! I'd love to hear how this is or isn't working for you and your students. You are also welcome to get the source code and play with it (not for commercial purposes).</p>
	<p>If you are an experienced coder and want to contribute your expertise, that would be great! I'm a novice coder, as you may have noticed. Please contact me. I'd like this to be an open source collaborative thing someday. Ideally, it might turn into a user-friendly tool any teacher could use to create their own teaching programs.</p>
</section>
<section>
	<h3>Author</h3>
	<p>This was written by Emily V Eames. Emily has a PhD in Chemistry from Harvard. After graduating, she taught at Sogang University in Seoul, South Korea for a few semesters. Now she teaches at City College of San Francisco and College of Alameda.</p>
</section>
<section>
	<h3>The Project Name</h3>
	<p>Chemiatria is an old word for medicinal chemistry. Back in the Middle Ages, alchemy was supposed to produce wonderful modern cure-all medicines. It didn't, but I use the name to suggest a modern cure for the old disease of chemical ignorance. I hope that this automated, personalized, cognitive science-inspired tool helps you!</p>
	<p>My use of this name was inspired by a wonderful book about alchemy: <em>The Secrets of Alchemy</em> by Laurence Principe. He actually tries the recipes and gets some amazing results!</p>
</section>
<section>
	<h3>Concept/Philosophy</h3>
	<p>This teaching program is based on my understanding of the science of learning. First, you don't learn a subject like chemistry by reading, you learn by practicing: making independent judgments about chemical problems. Reading textbooks can be a passive experience, especially for students with weak study skills. Computerized "textbooks" can force students to interact and make choices.</p>
	<p>Second, many aspects of chemistry require perceptual learning: essentially, learning to perceive and recognize patterns. This happens best when people see lots of examples, make choices, and get feedback. This can occur slowly over years, or very quickly with a computer program. Basically, you want the simple stuff to become automatic, just like seeing a word or a letter and knowing instantly what it is, so you can save your mental energy for the interesting stuff. A few simple modules to develop key perception skills are my first implementation priority for Chemiatria.</p>
	<p>Third, learning simple facts works best and most efficiently with spaced repetition studying. Essentially, it's most efficient to review a fact just as you are about to forget it. Recalling the fact when you have almost forgotten it helps set it solidly in your memory. The more times you recall the fact right before it disappears, the longer it takes for you to forget it. Thus, you should review it shortly after first seeing it (maybe 1-2 minutes), then after a bit longer (maybe 10 minutes), and so on. Chemiatria will attempt to use a spaced repetition algorithm to help you learn words and skills forever.</p>
	<p>Fourth, one of the main difficulties students encounter with chemistry is recognizing when a situation is simpler than they expect and when it is more complicated. They also have trouble putting ideas together, and recognizing what to do when a question is asked in a new way, even if it deals with ideas they supposedly know. To help with this, it's best to study in a way that requires students to continuously make non-trivial decisions about what approach to take. For example, working 10 problems with identical format, followed by 10 problems in a different format, is much less helpful than randomly mixing all the problems. When they are mixed, the student has to decide which format the question is, rather than following a rote procedure. Chemiatria will try to mix formats in ways that require students to think and assess. It will also try to mix formats and topics in ways that bring out the deep connections between problems and concepts.</p>
</section></div>
@endsection
