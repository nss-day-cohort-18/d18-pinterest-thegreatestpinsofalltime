'use strict';

app.controller("PinEditCtrl", function($scope, $location, $routeParams, PinFactory){
  $scope.title = "Edit Pin";
  $scope.btnText = "Update";
  $scope.newPin = {};

  PinFactory.getSinglePin($routeParams.pinId)
  .then(function successCallback(response){
     console.log("getSinglePinresponse", response);
      $scope.newPin = response;
  });

  $scope.addNewPin = function(){
    PinFactory.updatePin($routeParams.pinId, $scope.newPin)
    .then(function successCallback(response) {
      console.log(response);
      $location.url("/pins/list");
    });
  };
});
