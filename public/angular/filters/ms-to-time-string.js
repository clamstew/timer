'use strict';

(function(app) {

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

})(timer.app);