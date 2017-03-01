"use strict";

app.controller("PinViewCtrl", function($scope, PinFactory, $routeParams){
    PinFactory.getAllPins()
    .then(function(allPins){
        $scope.allPins = allPins;
  });

  
	    
});