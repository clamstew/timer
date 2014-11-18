'use strict';

(function(app) {

  app.directive('permissionsTab', [ function() {

    var link = function(scope, element, attrs){
      scope.checkPermission = function() {
        if (!window.Notification) return;
        if (Notification.permission) {
          scope.result = Notification.permission;
        } else {
          scope.result = (new Notification("check")).permission;
        }
      };

      scope.requestPermission = function() {
        if (!window.Notification) return;
        Notification.requestPermission();
      };

      // color the text of the permission result appropriately
      scope.permissionResultClass = function(){
        if (scope.result === 'granted') return 'text-success';
        if (scope.result === 'default') return 'text-warning';
        if (scope.result === 'denied') return 'text-danger';
        return '';
      };
    };

    return {
      restrict: 'A',
      link: link,
      templateUrl: '/angular/views/permissions-directive.html'
    };

  }]);

})(timer.app);