'use strict';

angular
  .module('SlackIntegration', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl',
        css: 'login/login.css'
      })
      .when('/token', {
          templateUrl: 'token/token.html',
          controller: 'TokenCtrl',
          css: 'token/token.css'
      })
      .when('/slackActions', {
          templateUrl: 'slackActions/slackActions.html',
          controller: 'SlackActionsCtrl',
          css: 'slackActions/slackActions.css'
      })
      .otherwise({
        redirectTo: 'login'
      });

      $locationProvider.html5Mode(true);
  });
