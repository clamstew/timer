'use strict';

(function(app) {

  app.service('notifications', ['$rootScope', function($rootScope) {
    var o = {};
    o.defaults = {
      title: 'Time is Up!',
      tag: 'timer',
      icon: '/images/timer15.png',
      // wierd multiline string hack js
      // http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
      body: (function () {/*http://timer-notif.herokuapp.com
Start: (time)
Stop: (time)
Duration: (timer)*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1]
    };
    o.notificationArgs = {};

    o.initNotification = function() {
      return this.notificationArgs = {
        title: this.defaults.title,
        tag: this.defaults.tag,
        body: this.defaults.body,
        icon: this.defaults.icon
      };
    };

    o.showNotif = function(args) {
      // console.log('$scope.title', $scope.title);
      var notification;
      notification = new Notification(args.title, {
        tag: args.tag,
        body: args.body,
        iconUrl: args.icon,
        icon: args.icon
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

    o.updateNotif = function(args) {
      this.notificationArgs = {
        title: args.title,
        tag: args.tag,
        body: args.body,
        icon: args.icon
      };
      $rootScope.$broadcast('notifications:updateNotif', this.notificationArgs);
    };


    return o;
  }]);

})(timer.app);