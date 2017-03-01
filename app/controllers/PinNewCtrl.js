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

	 $scope.addNewPin = function () {
        console.log("add new Pin");
        PinFactory.postNewPin($scope.newPin)
        .then(function(response) {

        	$location.url("pins/list");
        });
        console.log("you added a new pin", $scope.newPin);
        $scope.newPin = {};
    };

});