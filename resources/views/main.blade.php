@extends('layouts.main')

@section('content')

<div class="container" ng-controller="MainCtrl as ctrl">
  <h1>Chemiatria: Learn Chemistry</h1>
  <div ng-hide="session"><p>Welcome to Chemiatria! The initial page load can be a little slow, 
    please be patient. Once everything loads, you won't have to wait.</p>
    <p>While you wait, please note that I may sometimes use slightly different settings 
      to compare which seem to work better (like, changing how long between seeing a particular
      word). Technically, this might be considered doing social science experiments on you, so by 
      using the site, I assume you consent. I will never do anything intended to make you feel bad
      or otherwise cause you harm. I'll always be choosing between settings that seem reasonable to 
      see which seems to cause the best learning and least frustration.</p>
    <p>You can also review the site use instructions while things load.</p>
  </div>
  <p ng-show="session">
    How to use the site: Don't look up answers if you don't know them, this will confuse the algorithm. 
    If you have any feedback, if it's too hard or too easy, don't be shy! 
    Use the "bug report" or "I'm frustrated" buttons and tell me all about it!<br>
    <span ng-cloak ng-show="currentQ.showBackgroundText">@{{currentQ.qBackgroundText}}</span>
  </p>
  <div ng-hide="session">
    <span>Question data loaded? @{{questionsNotLoaded}}<br>
      Study history loaded? @{{historyNotLoaded}}</span>
      <br><br>
  </div>
  <div ng-cloak ng-hide="noQuestion">
    <div>@{{currentQ.instructions}}</div><br>
    <div>@{{answerDetail.messageSent}}</div><br>
    <div>@{{currentQ.qText}}</div>
    <form role="form" ng-submit="handleAnswer()">
      <div class="row">
       <div class="input-group">
          <input type="text" ng-model="answer" placeholder="">
          <span class="input-group-btn">
            <input type="submit" class="btn btn-primary" value="Answer">
          </span>
        </div>
      </div>
    </form>
</div>

<div ng-cloak ng-hide="session">
  <form ng-submit="startSession()" name="sessionStartForm">

    <p>Please choose the topics you want to study today. You can order them according to your priorities.
    	The site works best if you leave all the topics you've already studied checked. That way,
    	you will review them as necessary. </p>
    <div ng-cloak ui-sortable ng-model="topicsList">
      <p class="input-group" ng-repeat="topic in topicsList" style="padding:5px 10px; cursor: move;"> 
        <input type="checkbox" ng-model="topic.selected">
        @{{topic.name}}
      </p>
    </div>
    <input type="submit" value="start session" ng-disabled="sessionStartForm.$invalid" class="btn">
  </form>

  <div ng-cloak ng-show="showStats">
    @{{stats | json}}
  </div>

</div>

<div>
<br>
<br>
</div>

<div ng-cloak ng-show="isFrustrated">
  <p>I'm sorry you're frustrated! Please choose:</p>
  <button class="btn" ng-click="giveHint()">I need a hint</button>
  <div class="input-group">
    <span class="input-group-btn">
      <button class="btn" ng-click="describeFrustration()">I don't need a hint, I just want to express myself</button>
    </span>
    <textarea cols="75" rows="10" ng-model="frustrationDescription" placeholder="Go for it!"></textarea>
  </div>
  <button class="btn" ng-click="reportBug(true)">I think there's something wrong with the site</button>
</div>

<div ng-cloak ng-show="bugToReport">
  <p>I'm sorry things don't seem to be working! Please describe the problem and I'll try to fix it.</p>
  <div class="input-group">
    <textarea cols="75" rows="10" ng-model="bugDescription" placeholder="Tell me about it!"></textarea>
    <span class="input-group-btn">
      <button class="btn" ng-click="describeBug()">Submit description</button>
      <button class="btn" ng-click="cancelDescribeBug()">Oops, never mind</button>
    </span>
  </div>
</div>

<div ng-cloak ng-show="showResponseToFeedback">
  @{{responseToFeedback}}
  <button class="btn" ng-click="feedbackDone()">Ok</button>
</div>
<div>
<br>
<br>
</div>

<div ng-cloak class="">
  <button class="btn" ng-click="imFrustrated()">I'm frustrated</button>
  <button class="btn" ng-click="reportBug(false)">Report a bug</button>
  <button class="btn" ng-click="endSession()">End Session</button>
</div>
@endsection