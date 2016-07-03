'use strict';
angular
  .module('PitchEvaluator')
  .controller('SlackActionsCtrl', function($scope, $location) {
    $scope.channels = null;
    $scope.message = null;
    $scope.error = null;
    $scope.showError = false;
    $scope.success = null;
    $scope.showSuccess = false;
    $scope.hideMsg = {};
    $scope.msg = {};

    $scope.logout = function() {
        localStorage.removeItem('slackIntegrationToken');
        $location.path('login');
    }

    $scope.expand = function(id) {
        $scope.hideMsg[id] = false;
    }

    $scope.sendMsg = function(id, name) {
        var message = $scope.msg[id];
        if (message=="") {
            $scope.error = "Cannot send an empty message";
            $scope.showError = true;
            return;
        }
        $scope.showError = false;
        // console.log("message =", message);
        $scope.msg[id] = "";

        var urlPostMessage = "https://slack.com/api/chat.postMessage?"
        urlPostMessage += "token="+token;
        urlPostMessage += "&channel="+id;
        urlPostMessage += "&text="+message;
        urlPostMessage += "&username="+"SlackIntegrationVizir";
        // console.log("urlPostMessage=",urlPostMessage);
        fetch(urlPostMessage)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
        //         console.log(data);
                $scope.$apply(function() {
                    if (data.ok) {
                        $scope.success = "Message sent successfuly to " + name;
                        $scope.showSuccess = true;
                        return;
                    }
                    else {
                        $scope.error = "Ups, something went wrong. Message not sent";
                        $scope.showError = true;
                        return;
                    }
                })

            });
    }

    if (localStorage.slackIntegrationToken) {
        var token = localStorage.slackIntegrationToken;
        // console.log(token);
        var urlChannels = "https://slack.com/api/channels.list?token="+token;

        fetch(urlChannels)
            .then(function(response){
                // console.log(response);
                return response.json();
            })
            .then(function(data){
                // console.log(data);
                $scope.$apply(function() {
                    $scope.channels = data.channels;
                    for (var channel of $scope.channels) {
                        $scope.hideMsg[channel.id] = true;
                        $scope.msg[channel.id] = "";
                    }
                });
            });
    }
    else {
        console.log("Token not present");
        $location.path('login');
    }


});
