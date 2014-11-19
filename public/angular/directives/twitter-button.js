'use strict';

(function(app) {

  app.directive('twitterBtn', [function() {
    var link = function() {
      !function(d,s,id){
        var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
        if(!d.getElementById(id)){
          js=d.createElement(s);
          js.id=id;
          js.src=p+'://platform.twitter.com/widgets.js';
          fjs.parentNode.insertBefore(js,fjs);
        }
      }(document, 'script', 'twitter-wjs');
    };
    return {
      restrict: 'A',
      link: link,
      templateUrl: '/angular/views/twitter-button.html'
    };

  }]);

})(timer.app);