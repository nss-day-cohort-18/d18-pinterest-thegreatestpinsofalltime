"use strict";

app.controller("PinViewCtrl", function ($scope, $routeParams, PinFactory, AuthFactory) {
	$scope.songs = [];
	console.log($routeParams.pinId);

	let user = AuthFactory.getUser();

	PinFactory.getAllPins()
	.then( function(pinList) {
		$scope.pins = pinList;

		$scope.selectedPin = $scope.pins.filter( function(pin) {
			return pin.id === $routeParams.pinId;
		})[0];
	});
});

