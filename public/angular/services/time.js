'use strict';

(function(app) {

  app.service('time', ['$rootScope', function($rootScope) {
    var o = {};

    // set a default of 5 seconds for duration
    o.duration = 5000;

    o.getDuration = function() {
      return this.duration;
    };

    return o;
  }]);

})(timer.app);