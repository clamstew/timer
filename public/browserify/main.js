// Compile with:
// browserify public/browserify/main.js > public/browserify/compressed.js

'use strict';

module.exports = function() {
  // vendor libraries
  require('../../bower_components/angular/angular');
  require('../../bower_components/moment/min/moment.min');
  require('../../bower_components/angular-bootstrap/ui-bootstrap-tpls.min');

  // my angular
  // app
  require('../../public/angular/main');
  // filters
  require('../../public/angular/filters/ms-to-time-string');
  // services
  require('../../public/angular/services/notifications');
  // directives
  require('../../public/angular/directives/timer-section');
  require('../../public/angular/directives/customize-notif');
  require('../../public/angular/directives/permissions-directive');
  // controllers
  require('../../public/angular/controllers/main-controller');

};