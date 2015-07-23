@extends('layouts.master')

@section('content')

<div class="container-fluid">
<div class="row">
<div class="col-md-8 col-md-offset-2">
<div class="panel panel-default">
<div class="panel-heading">Register</div>
<div class="panel-body">

    @include('errors.errors')
<h3>Important Warning: Do not give me any sensitive information!</h3>
<p>Because I haven't yet bought a certificate and set up https (and I'm not a pro at this regardless), 
	any data you give me could be stolen in transit. 
This is probably fine, as long as you don't give me username/password combinations you use for things you care about,
like banking, email, and Facebook. If you are concerned, choose a non-identifying username and throwaway email address. 
<strong>No matter what, don't give me a password you use for important things!</strong> Choose a different password and 
record it somewhere convenient: after all, there's not much security on this site anyway, so who cares if someone finds it?</p>
<p>I won't sell your email or send you messages except password resets (or maybe, someday, I might respond via email if you 
send me feedback). However, as I mentioned, I don't promise that the site is perfectly secure, so feel free to use 
an email address you don't care about too much, in case the spambots get it.</p>

<form class="form-horizontal" role="form" method="POST" action="/reg">
<input type="hidden" name="_token" value="{{ csrf_token() }}">

<div class="form-group">
<label class="col-md-4 control-label">Username</label>
<div class="col-md-6">
<input type="text" class="form-control" name="name" value="{{ old('name') }}">
</div>
</div>
		
<div class="form-control">E-Mail Address</label>
<div class="col-md-6">
<input type="email" class="form-control" name="email" value="{{ old('email') }}">
</div>
</div>

<div class="form-group">
<label class="col-md-4 control-label">Password</label>
<div class="col-md-6">
<input type="password" class="form-control" name="password">
</div>
</div>

<div class="form-group">
<label class="col-md-4 control-label">Confirm Password</label>
<div class="col-md-6">
<input type="password" class="form-control" name="password_confirmation">
</div>
</div>
{{-- later, add type selector --}}

<div class="form-group">
<div class="col-md-6 col-md-offset-4">
<button type="submit" class="btn btn-primary">
Register
</button>
							
</div>
</div>
</form>

</div>
</div>
</div>
</div>
</div>

@endsection


