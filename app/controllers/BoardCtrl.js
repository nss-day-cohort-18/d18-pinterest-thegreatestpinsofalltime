"use strict";

app.controller('BoardCtrl', function($scope, $location, AuthFactory, BoardFactory){

	let user = AuthFactory.getUser();

	$scope.title = "New Board";
	$scope.btnText = "Submit";

	$scope.newBoard = {
		uid: user,
		title: ""
	};

	$scope.addNewBoard = function () {
        console.log("add new Board");
        BoardFactory.postNewBoard($scope.newBoard)
        .then(function(response) {
        	$location.url("items/list");//change this url to point to the correct spot
        });
        // $scope.newBoard.id = $scope.items.length;
        console.log("you added a new item", $scope.newBoard);
        // $scope.items.push($scope.newBoard);
        $scope.newBoard = {};
    };

})