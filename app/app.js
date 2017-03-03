"use strict";

var app = angular.module("PinterProApp", ["ngRoute","ngMaterial"]);

let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  // console.log("running isAuth");
    AuthFactory.isAuthenticated()
    .then ( (userExists) => {
    console.log("userExists", userExists);
        if (userExists){
      console.log("Authenticated, go ahead.");
            resolve();
        }else {
      console.log("Authentication rejected, go away.");
            reject();
        }
    });
});

app.config( function($routeProvider) {
   $routeProvider.
   when('/', {
      templateUrl: 'partials/login.html',
      controller: "UserCtrl"
   }).
   when('/login', {
      templateUrl: 'partials/login.html',
      controller: "UserCtrl"
   }).
   when('/logout', {
      templateUrl: 'partials/login.html',
      controller: "UserCtrl"
   }).
   when('/pins/all', {
      templateUrl: 'partials/pin-list.html',
      controller: "PinViewCtrl"
   }).
   when('/boards/new', {
      templateUrl: 'partials/board-form.html',
      controller: "BoardNewCtrl",
      resolve: {isAuth}
   }).
   when('/boards/list', {
      templateUrl: 'partials/board-list.html',
      controller: "BoardViewCtrl",
      resolve: {isAuth}
   }).
   when('/boards/list/:boardId', {
      templateUrl: 'partials/pin-list.html',
      controller: "PinsByBoardCtrl",
      resolve: {isAuth}
   }).
   when('/pins/list', {
      templateUrl: "partials/pin-list.html",
      controller: "PinListCtrl",
      resolve: {isAuth}
   }).
   when('/pins/new', {
      templateUrl: "partials/pin-form.html",
      controller: "PinNewCtrl",
      resolve: {isAuth}
   }).
   when('/pins/:pinId', {
      templateUrl: "partials/pin-details.html",
      controller: "PinViewCtrl",
      resolve: {isAuth}
   }).
   when('/pins/:pinId/edit', {
      templateUrl: "partials/pin-form.html",
      controller: "PinEditCtrl",
      resolve: {isAuth}
   }).

   otherwise('/login', {}); 
});

//run when the app loads
app.run(($location, FBCreds) => {
   let creds = FBCreds;
   let authConfig = {
      apiKey: creds.apiKey,
      authDomain: creds.authDomain,
      databaseURL: creds.databaseURL
   };

   firebase.initializeApp(authConfig);
});
