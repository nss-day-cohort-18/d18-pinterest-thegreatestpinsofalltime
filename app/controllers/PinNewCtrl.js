'use strict';

app.controller("PinNewCtrl", function($scope, PinFactory, BoardFactory, $location, AuthFactory) {

  let user = AuthFactory.getUser();
  // let board = ??????

  $scope.title = "Add A New Pin";
  $scope.btnText = "Add New Pin";
  $scope.newPin = {
    contentURL: "",
    photoURL: "",
    pinName: "",
    description: "",
    //boardId: board,
    uid: user
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
});
