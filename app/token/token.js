'use strict';
angular
  .module('SlackIntegration')
  .controller('TokenCtrl', function($rootScope, $location, $routeParams) {
    var code = $routeParams.code;
    var urlToken = "https://slack.com/api/oauth.access?client_id=56418117617.56422375186&client_secret=27065242c1ff1459614d828f994e5878&code="+code;

    fetch(urlToken)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            // console.log(data);
            // console.log(data.access_token);
            localStorage.slackIntegrationToken = data.access_token;
            $rootScope.$apply(function() {
                $location.url($location.path());
                $location.path("/slackActions");
            });
        });

});
