'use strict';

app.controller("PinNewCtrl", function($scope, PinFactory, $location, AuthFactory, BoardFactory) {

  let user = AuthFactory.getUser();
  let profileName = AuthFactory.getName();
  console.log('User Name Display Name is: ', profileName);

  $scope.title = "Add A New Pin";
  $scope.btnText = "Add New Pin";
  $scope.newPin = {
    boardId: "",
    img: "",
    title: "",
    uid: user,
    url: "",
    pinner: profileName,
    description: ""
  };


  $scope.addNewPin = function() {
    console.log("add new pin");
    PinFactory.postNewPin($scope.newPin)
    .then(function(response) {
      $location.url("/pins/list");
    });
    console.log("you added a new Pin:", $scope.newPin);
    $scope.newPin = {};
  };

  BoardFactory.getBoardList(user)
	.then( function(boardList) {
		$scope.boards = boardList;
  });

});
