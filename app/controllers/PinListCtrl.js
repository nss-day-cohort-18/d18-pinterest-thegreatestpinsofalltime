"use strict";

app.controller("PinListCtrl", function($scope, PinFactory, AuthFactory, SearchTermData, $routeParams) {

	$scope.searchText = SearchTermData;
   let user = AuthFactory.getUser();

//calling getPins here gives you the pins tied to your uid, calling getAllPins gives you all the pins
	PinFactory.getAllPins(user)
	.then( function(pinList) {
		$scope.pins = pinList;
	});

	$scope.pinDelete = function(pinId) {
      console.log("delete this song", pinId);
      PinFactory.deletePin(pinId)
      .then( function(response) {
         PinFactory.getAllPins().then( function(pinList) {
            $scope.pins = pinList;
         });
      });
   };


});
