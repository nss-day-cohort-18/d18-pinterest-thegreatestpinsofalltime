"use strict";

app.controller("PinAllCtrl", function($scope, PinFactory, AuthFactory, SearchTermData, $routeParams) {

   
   
	$scope.searchText = SearchTermData;
   let user = AuthFactory.getUser();


	PinFactory.getAllPins()
	.then( function(pinList) {
		$scope.pins = pinList;
	});


});