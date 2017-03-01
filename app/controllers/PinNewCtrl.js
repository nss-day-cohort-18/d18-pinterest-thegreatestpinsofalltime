"use strict";

console.log("PinNewCtrl");
app.controller('PinNewCtrl', function($scope, $location, AuthFactory, PinFactory){

	let user = AuthFactory.getUser();

	$scope.title = "New Pin";
	$scope.btnText = "Submit";
	
	$scope.newPin = {
		boardid: "",
		contenturl: "",
		imageurl: "",
		title: "",
		uid: user
	};

	//PinFactory is linking to the factory that will hold Firebase interaction functions.  The relevant factory is called PinFactory 

	 $scope.addNewItem = function () {
        console.log("add new Item");
        PinFactory.postNewItem($scope.newPin)
        .then(function(response) {
        	$location.url("items/list");
        });
        // $scope.newPin.id = $scope.items.length;
        console.log("you added a new item", $scope.newPin);
        // $scope.items.push($scope.newPin);
        $scope.newPin = {};
    };

});