'use strict';

app.controller("PinsByBoardCtrl", function ($scope, $routeParams, PinFactory, BoardFactory, AuthFactory, $location) {
	$scope.pins = [];
	console.log('RouteParams for board ID: ', $routeParams.boardId);

  let user = AuthFactory.getUser();
  let board = $routeParams.boardId;
  console.log('is this same as routeParams above?', board);
  

  BoardFactory.getBoardList(user)
   .then( function(boardList) {
      $scope.boards = boardList;
      console.log('boardList', boardList);
   });

   $scope.heading = "Your Board";


	PinFactory.getBoardPins(board)
	.then( function(pinList) {
		$scope.pins = pinList;

		$scope.selectedPin = $scope.pins.filter( function(pin) {
			return pin.boardId === $routeParams.boardId;
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
