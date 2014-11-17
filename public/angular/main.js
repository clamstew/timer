'use strict';

(function(app) {

  var app = angular.module('timer', ['ui.bootstrap']);

  app.controller('MainCtlr', ['$scope','$timeout', function($scope,$timeout) {
    /*
    *
    * Permissions
    *
    */
    $scope.checkPermission = function() {
      if (!window.Notification) return;
      if (Notification.permission) {
        $scope.result = Notification.permission;
      } else {
        $scope.result = (new Notification("check")).permission;
      }
    };

    $scope.requestPermission = function() {
      if (!window.Notification) return;
      Notification.requestPermission();
    };

    // color the text of the permission result appropriately
    $scope.permissionResultClass = function(){
      if ($scope.result === 'granted') return 'text-success';
      if ($scope.result === 'default') return 'text-warning';
      if ($scope.result === 'denied') return 'text-danger';
      return '';
    };

    /*
    *
    * Notification
    *
    */

    $scope.testNotification = function() {
      if (!window.Notification) return;
      showNotif();
    };

    var showNotif = function() {
      // console.log('$scope.title', $scope.title);
      var notification;
      notification = new Notification($scope.title, {
        tag: $scope.tag,
        body: $scope.body,
        iconUrl: $scope.icon,
        icon: $scope.icon
      });

      return notification.onclick = function() {
        // closes the notification
        notification.close();
        // briefly opens and closes a pop-up about:blank window
        window.open().close();
        // then that other window being open for a millisecond
        // allows you to refocus on the tab that the notification came from
        return window.focus();
      };
    };

    // DOM Attr
    $scope.startTimerBtnTxt = "Start Timer";

    // Notification Attritubes
    $scope.title = "Time is Up!";
    $scope.tag = "timer";
    $scope.icon = "timer15.png";
    // wierd multiline string hack js
    // http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    $scope.body = (function () {/*http://timer-notif.herokuapp.com
Start: (time)
Stop: (time)
Duration: (timer)*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

    /*
    *
    * Timer
    *
    */

    $scope.timerStarted = false;
    var updateTimerState = function() {
      $scope.timerStarted = !$scope.timerStarted;
    };
    // used as model for input for user picked time
    // also used in the $timeout as timeout time
    $scope.time = 0;
    $scope.startTimer = function() {
      updateTimerState();
      $scope.startTimerBtnTxt = "Timer is Running ...";
      $timeout(function() {
        showNotif();
        updateTimerState();
        $scope.startTimerBtnTxt = "Start Timer";
      }, $scope.time);
    };
  }]);

  app.filter('millSecondsToTimeString', function() {
    return function(millseconds) {
      var seconds = Math.floor(millseconds / 1000);
      var days = Math.floor(seconds / 86400);
      var hours = Math.floor((seconds % 86400) / 3600);
      var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
      var timeString = '';
      if(days > 0) timeString += (days > 1) ? (days + " days ") : (days + " day ");
      if(hours > 0) timeString += (hours > 1) ? (hours + " hours ") : (hours + " hour ");
      if(minutes > 0) timeString += (minutes > 1) ? (minutes + " minutes ") : (minutes + " minute ");
      // @TODO: Add seconds to make timer display more accurate
      if(seconds >= 0 && seconds < 60) timeString += (seconds > 1) ? (seconds + " seconds ") : (seconds + " seconds ");
      return timeString;
    }
  });

})(angular);