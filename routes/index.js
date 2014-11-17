'use strict';

module.exports = function(router) {

  // main single page homepage route
  router.get('/', function(req, res) {
    console.log('rendering the homepage ..');
    res.render('index');
  });

};