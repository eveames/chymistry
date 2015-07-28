<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Chemiatria: Learn Chemistry</title>

	<link href="{{ asset('/css/app.css') }}" rel="stylesheet">

	<!-- Fonts -->
	<link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'>

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
</head>
<body>
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle Navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="/">Chemiatria</a>
			</div>

			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<li><a href="{{ url('/') }}">Home</a></li>
					<li><a href="{{ url('about') }}">About Chemiatria</a></li>
					<li><a href="www.graylark.com/eve/">My online chemistry "text"</a></li>
				</ul>

				<ul class="nav navbar-nav navbar-right">
					@if (Auth::guest())
						<li><a href="{{ url('/login') }}">Login</a></li>
						<li><a href="{{ url('/reg') }}">Register</a></li>
					@else
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{ Auth::user()->name }} <span class="caret"></span></a>
							<ul class="dropdown-menu" role="menu">
								<li><a href="{{ url('/logout') }}">Logout</a></li>
							</ul>
						</li>
					@endif
				</ul>
			</div>
		</div>
	</nav>

	<div>
	@yield('content')
	</div>

	<footer class="footer navbar-fixed-bottom">
      <div class="container-fluid">
        <p><span class="glyphicon glyphicon-heart"></span> Chemiatria, by Emily V Eames, is provided 
        	free and open source, under a Creative Commons Attribution Noncommercial license. 
        	The code is available on <a href="http://github.com/eveames/chymistry">Github</a> with an MIT license.</p>
      </div>
    </footer>

	<!-- Scripts : may need to add bower components here? and others? for now hope elixir does it-->
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/js/bootstrap.min.js"></script>
	<!-- build:js(.) scripts/vendor.js -->
    <!-- bower:js -->
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    
    <script src="bower_components/angular-aria/angular-aria.js"></script>
    <script src="bower_components/angular-cookies/angular-cookies.js"></script>
    <script src="bower_components/angular-messages/angular-messages.js"></script>
    <script src="bower_components/angular-resource/angular-resource.js"></script>
    <script src="bower_components/angular-route/angular-route.js"></script>
    <script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
    <script src="bower_components/angular-touch/angular-touch.js"></script>
    <script src="bower_components/jquery-ui/jquery-ui.js"></script>
    <script src="bower_components/angular-ui-sortable/sortable.js"></script>
    <script src="bower_components/ng-autofocus/dist/ng-autofocus.min.js"></script>
    <!-- endbower -->
    <!-- endbuild -->

        <!-- build:js({.tmp,app}) scripts/scripts.js -->
        <script src="scripts/app.js"></script>
        <script src="scripts/controllers/main.js"></script>
        <script src="scripts/controllers/about.js"></script>
        <script src="scripts/services/sessionlog.js"></script>
        <script src="scripts/services/sessionmanagerservice.js"></script>
        <script src="scripts/services/questionfactory.js"></script>
        <script src="scripts/services/sigfigplfactory.js"></script>
        <script src="scripts/services/randomfactory.js"></script>
        <script src="scripts/services/topicsservice.js"></script>
        <script src="scripts/services/vocabfactory.js"></script>
        <script src="scripts/services/qidservice.js"></script>
        <script src="scripts/services/vocablistservice.js"></script>
        <script src="scripts/services/elementslistservice.js"></script>
        <script src="scripts/services/studyarrayservice.js"></script>
        <script src="scripts/services/plpriorityservice.js"></script>
        <script src="scripts/services/factpriorityservice.js"></script>
        <script src="scripts/services/metricsservice.js"></script>
        <script src="scripts/services/introelementsfactory.js"></script>
        <script src="scripts/directives/autofocus.js"></script>
        
        <!-- endbuild -->
	<!--<script type="text/javascript" src="app.js"></script>-->
</body>
</html>