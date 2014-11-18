'use strict';

(function(app) {

  app.directive('customizeNotif', ['notifications', function(notifications) {

    var link = function(scope, element, attrs){

      scope.notificationArgs = notifications.initNotification();

      scope.testNotification = function() {
        if (!window.Notification) return;
        notifications.showNotif(scope.notificationArgs);
      };

      scope.updateNotification = function() {
        notifications.updateNotif(scope.notificationArgs);
      };

    };

    return {
      restrict: 'A',
      link: link,
      templateUrl: '/angular/views/customize-notif.html'
    };

  }]);

})(timer.app);