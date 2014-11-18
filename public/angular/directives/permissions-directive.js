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
        switch (scope.result) {
          case 'granted': return 'text-success'; break;
          case 'default': return 'text-warning'; break;
          case 'denied' : return 'text-danger' ; break;
          default: return '';
        }
      };
    };

    return {
      restrict: 'A',
      link: link,
      templateUrl: '/angular/views/permissions-directive.html'
    };

  }]);

})(timer.app);