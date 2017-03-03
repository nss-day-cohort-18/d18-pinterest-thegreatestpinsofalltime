"use strict";

app.controller("PinListCtrl", function($scope, PinFactory, BoardFactory, AuthFactory, SearchTermData, $routeParams) {


   $scope.heading = "My Pins";
   $scope.isLoggedIn = false;
	 $scope.searchText = SearchTermData;
   let user = AuthFactory.getUser();

	PinFactory.getPins(user)
	.then( function(pinList) {
		$scope.pins = pinList;
	});

   BoardFactory.getBoardList(user)
   .then( function(boardList) {
      $scope.boards = boardList;
      console.log('boardList', boardList);
   });


	$scope.pinDelete = function(pinId) {
      console.log("delete this pin", pinId);
      PinFactory.deletePin(pinId)
      .then( function(response) {
         PinFactory.getPins(user).then( function(pinList) {
            $scope.pins = pinList;
         });
      });
   };

});
