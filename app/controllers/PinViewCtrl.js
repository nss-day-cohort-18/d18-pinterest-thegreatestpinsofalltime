"use strict";

app.controller("PinViewCtrl", function ($scope, $routeParams, PinFactory, AuthFactory) {
	$scope.pins = [];
	console.log($routeParams.pinId);

	let user = AuthFactory.getUser();

	PinFactory.getPins(user)
	.then( function(pinList) {
		$scope.pins = pinList;

		$scope.selectedPin = $scope.pins.filter( function(pin) {
			return pin.id === $routeParams.pinId;
		})[0];
	});
});




