'use strict';

(function(app) {

  var app = angular.module('timer', []);

  app.controller('MainCtlr', ['$scope','$timeout', function($scope,$timeout) {

    var showNotif = function() {
      var notification;
      notification = new Notification($("[name=title]").val(), {
        tag: $("[name=tag]").val(),
        body: $("[name=body]").val(),
        iconUrl: $("[name=icon]").val(),
        icon: $("[name=icon]").val()
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

    $scope.time;

    $scope.startTimer = function() {
      $timeout(function() {
        showNotif();
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
      if(minutes >= 0) timeString += (minutes > 1) ? (minutes + " minutes ") : (minutes + " minute ");
      return timeString;
    }
  });

})(angular);