"use strict";

app.controller("PinViewCtrl", function ($scope, $routeParams, PinFactory, AuthFactory, $location) {
	$scope.pins = [];
	console.log($routeParams.pinId);

	let user = AuthFactory.getUser();

	PinFactory.getAllPins()
	.then( function(pinList) {
		$scope.pins = pinList;

		$scope.selectedPin = $scope.pins.filter( function(pin) {
			return pin.id === $routeParams.pinId;
		})[0];

		if (user === $scope.selectedPin.uid) {
			$scope.isPinned = true;
		} else {
			$scope.isPinned = false;
		}

		$scope.isPinned	= user === $scope.selectedPin.uid;
	});

	$scope.addPin = function(){
		let newPin = $scope.selectedPin;

		newPin.uid = user;
		newPin.id = undefined;
		PinFactory.postNewPin(newPin);
	};

	$scope.editPin = function(){
		$location.url("/pins/:pinId/edit");
	};

});
