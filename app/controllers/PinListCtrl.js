"use strict";

app.controller("PinListCtrl", function($scope, PinFactory, AuthFactory, SearchTermData, $routeParams) {

	$scope.searchText = SearchTermData;
   let user = AuthFactory.getUser();


	PinFactory.getPins(user)
	.then( function(pinList) {
		$scope.pins = pinList;
	});

	$scope.pinDelete = function(pinId) {
      console.log("delete this song", pinId);
      PinFactory.deletePin(pinId)
      .then( function(response) {
         PinFactory.getPins(user).then( function(pinList) {
            $scope.pins = pinList;
         });
      });
   };


});
