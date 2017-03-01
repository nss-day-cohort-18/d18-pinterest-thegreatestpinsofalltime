"use strict";

app.controller('BoardViewCtrl', function($scope, $routeParams, AuthFactory, BoardFactory){
	$scope.boards = [];
	console.log($routeParams.boardId);

	let user = AuthFactory.getUser();

	BoardFactory.getAllBoards()
	.then( function(boardList) {
		$scope.boards = boardList;

		$scope.selectedBoard = $scope.boards.filter( function(boards) {
			return boards.id === $routeParams.boardId;
		})[0];
	});

});