"use strict";

app.controller('BoardViewCtrl', function($scope, $routeParams, BoardFactory, AuthFactory){
	$scope.boards = [];
	console.log($routeParams.title);
	console.log("test1");

	let user = AuthFactory.getUser();
	BoardFactory.getBoardList()
	.then( function(boardList) {
		$scope.boards = boardList;

		$scope.selectedBoard = $scope.boards.filter( function(boards) {
			return boards.id === $routeParams.boardId;
		})[1];
	});

});