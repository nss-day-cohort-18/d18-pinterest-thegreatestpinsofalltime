"use strict";

app.controller("PinListCtrl", function($scope, PinFactory, AuthFactory, SearchTermData, $routeParams) {

	$scope.searchText = SearchTermData;
   let user = AuthFactory.getUser();

	PinFactory.getAllPins(user)
	.then( function(pinList) {
		$scope.songs = pinList;
	});

	$scope.pinDelete = function(pinId) {
      console.log("delete this song", pinId);
      PinFactory.deletePin(pinId)
      .then( function(response) {
         PinFactory.getAllPins(user).then( function(List) {
            $scope.pins = pinList;
         });
      });
   };

});
