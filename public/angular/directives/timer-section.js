'use strict';

(function(app) {

  app.directive('timerSection', ['notifications', '$timeout', 'time',
    function(notifications, $timeout, time) {

    var link = function(scope, element, attrs){

      var angularTimer = element.find('timer')[0];

      var init = (function() {
        scope.notificationArgs = notifications.initNotification();
        scope.time = time.getDuration();
        scope.startTimerBtnTxt = "Start Timer";
        scope.timerStarted = false;
      })();

      // Used to Disable Start Timer button when timer is running
      var updateTimerState = function() {
        scope.timerStarted = !scope.timerStarted;
      };

      // used as model for input for user picked time
      // also used in the $timeout as timeout time
      scope.startTimer = function() {
        updateTimerState();
        scope.startTimerBtnTxt = "Timer is Running ...";
        angularTimer.start();
        $timeout(function() {
          notifications.showNotif(scope.notificationArgs);
          updateTimerState();
          scope.startTimerBtnTxt = "Start Timer";
        }, scope.time);
      };

      // update notification settings when it is updated in
      // customize menu
      scope.$on('notifications:updateNotif', function(event, data) {
        scope.notificationArgs = data;
      });

      scope.$watch('time', function() {
        scope.$broadcast('timer-set-countdown-seconds', scope.time / 1000);
      });

    };

    return {
      restrict: 'A',
      link: link,
      templateUrl: '/angular/views/timer-section.html'
    };

  }]);

})(timer.app);