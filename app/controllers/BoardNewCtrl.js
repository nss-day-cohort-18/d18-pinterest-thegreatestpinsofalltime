"use strict";

app.controller('BoardNewCtrl', function($scope, $location, AuthFactory, BoardFactory){
console.log("BoardNewCtrl");

	let user = AuthFactory.getUser();

	$scope.title = "New Board";
	$scope.btnText = "Submit";

	$scope.newBoard = {
		uid: user,
		title: ""
	};
    console.log("$scope.newBoard", $scope.newBoard);

	$scope.addNewBoard = function () {
        console.log("add new Board");
        BoardFactory.postNewBoard($scope.newBoard)
        .then(function(response) {
        	$location.url("boards/list");//change this url to point to the correct spot
        });
        // $scope.newBoard.id = $scope.items.length;
        console.log("you added a new item", $scope.newBoard);
        // $scope.items.push($scope.newBoard);
        $scope.newBoard = {};
    };

});