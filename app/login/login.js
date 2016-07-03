'use strict';
angular
  .module('PitchEvaluator')
  .controller('LoginCtrl', function($location) {
    if (localStorage.slackIntegrationToken) {
        var token = localStorage.slackIntegrationToken;
        // console.log(token);
        $location.path('slackActions');
    }
    else {
        console.log("Token not present");
    }


});
