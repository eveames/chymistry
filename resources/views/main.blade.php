@extends('layouts.main')

@section('content')

<div class="container no-js" ng-app="chemiatriaApp" ng-controller="MainCtrl as ctrl">
  <div ng-hide="session"><h4>Welcome to Chemiatria!</h4><p> The initial page load can be a little slow, 
    please be patient. Once everything loads, you won't have to wait.</p>
    <p>While you wait, please note that I may sometimes use slightly different settings 
      to compare which seem to work better (like, changing how long between seeing a particular
      word). Technically, this might be considered doing social science experiments on you, so by 
      using the site, I assume you consent. I will never do anything intended to make you feel bad
      or otherwise cause you harm. I'll always be choosing between settings that seem reasonable to 
      see which seems to cause the best learning and least frustration.</p>
    <p>Right now, things will work best if you stay connected to the web the whole time, so your 
      progress is saved. Reload the page when you want to start a new session to make sure you get all 
      the available questions and start up where you left off.</p>
  </div>
  <div ng-show="session">
    <p>How to use the site: It's ok if you don't know an answer: just guess or (if the instructions suggest it)
    enter 0 (zero) to indicate that you don't know. <strong>Don't look up answers you aren't sure of</strong>, because this will confuse 
    the algorithm and make the site less helpful for you. 
    If you have any feedback, if it's too hard or too easy, don't be shy! 
    Use the "bug report" or "I'm frustrated" buttons and tell me all about it!<p>
  </div>

  <div ng-hide="loaded" class="alert" role="alert" ng-class="dataLoaded">
    <span>Question data loaded? <span ng-bind="questionsNotLoaded"></span><br>
      Study history loaded? <span ng-bind="historyNotLoaded"></span></span>
  </div>

  <div ng-cloak ng-show="!session && !noQuestion" class="form-group">
    <form>
      <p>@{{dataSaved}}</p>
      <button class="btn btn-block btn-warning" ng-click="resendProgress()">Resend Progress</button>
    </form>
  </div> 


  <div ng-cloak ng-hide="session">
    <form ng-submit="startSession()" name="sessionStartForm">
      <p>Please choose the topics you want to study today. You can order them according to your priorities.
    	The site works best if you leave all the topics you've already studied checked. That way,
    	you will review them as necessary. If you can't see newly added topics you expect, reload the page. 
      (If you don't see a list of topics, the page is still loading. Wait for it!)</p>
      <div ui-sortable ng-model="topicsList">
        <p class="input-group" ng-repeat="topic in topicsList" style="padding:5px 10px; cursor: move;"> 
          <input type="checkbox" ng-model="topic.selected">
          @{{topic.name}}
        </p>
      </div>
    <input type="submit" value="start session" ng-disabled="sessionStartForm.$invalid" class="btn">
    </form>
  </div>

  <div class="row">

    

    <div class="col-md-7">
      <div ng-cloak>
        <span ng-cloak ng-show="currentQ.showBackgroundText">@{{currentQ.qBackgroundText}}</span>
      </div>

      <div ng-cloak ng-hide="noQuestion">
        <div class="panel panel-default" ng-show="currentQ.instructions">
          <div class="panel-body">@{{currentQ.instructions}}</div>
        </div><br>
        <div class="alert" role="alert" ng-show="answerDetail.messageSent" ng-class="responseType">
          @{{answerDetail.messageSent}}
        </div><br>
        <div class="panel panel-default" ng-show="showHint">
          <div class="panel-body">@{{currentQ.qHint[currentHint]}}</div>
        </div>
        <div>@{{currentQ.qText}}</div>
        <form ng-switch="currentQ.qAnswerFormat" role="form" ng-submit="handleAnswer()">
          <div class="form-group">
              <input type="text" ng-model="field.answer" placeholder="" autofocus>
              <span class="">
                <input type="submit" class="btn btn-primary" value="Answer">
              </span>
          </div>
          <div>
            @include('answer.ptable')
          </div> 
        </form>
      </div>
      <br><br>
      <div ng-cloak ng-show="showStats">
        <h4>Here's a summary of your progress.</h4>
        <p>You answered @{{questionsAnswered}} questions so far in this session.</p>
        <table ng-model="stats" class="table table-bordered table-compact table-hover">
          <tr><th>Question</th><th>Score (%)</th><th>Average response time (s)</th><th>Status</th></tr>
          <tr class="" ng-repeat="topic in stats"> 
            <td>@{{topic.label}}</td>
            <td>@{{topic.score | number: 0}}</td>
            <td>@{{topic.time | number: 1}}</td>
            <td>@{{topic.comment}}</td>
          </tr>
        </table>
      </div>
      <br><br>
    </div>

    <div class="col-md-4">
      <div ng-cloak ng-show="session">
        <button class="btn" ng-click="imFrustrated()">I'm frustrated</button>
        <button class="btn" ng-click="reportBug(false)">Report a bug</button>
        <button class="btn" ng-click="endSession()">End Session</button>
      </div>
      <br><br>
      <div ng-cloak ng-show="isFrustrated" class="form-group">
        <form>
          <p>I'm sorry you're frustrated! Please choose:</p>
          <button class="btn btn-block" ng-click="giveHint()">I need a hint</button>
          <br>
          <div class="form-group">
            <button class="btn btn-block" ng-click="describeFrustration()">I don't need a hint, I just want to express myself</button>
            <textarea class="form-control" rows="7" ng-model="frustrationDescription" placeholder="Go for it!"></textarea>
          </div>
          <button class="btn btn-block" ng-click="reportBug(true)">I think there's something wrong with the site</button>
        </form>
      </div>

      <div ng-cloak ng-show="bugToReport">
        <p>I'm sorry things don't seem to be working! Please describe the problem and I'll try to fix it.</p>
        <div class="form-group">
          <textarea rows="10" ng-model="bugDescription" placeholder="Tell me about it!" class="form-control"></textarea>
          <button class="btn btn-block btn-primary" ng-click="describeBug()">Submit description</button>
          <button class="btn btn-block" ng-click="cancelDescribeBug()">Oops, never mind</button>
        </div>
      </div>

      <div ng-cloak ng-show="showResponseToFeedback">
        @{{responseToFeedback}}
        <button class="btn" ng-click="feedbackDone()">Ok</button>
      </div>

    </div>
  </div>
  
  
</div>
@endsection