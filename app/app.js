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
   when('/pins/:itemId', {
      templateUrl: "partials/pin-details.html",
      controller: "PinViewCtrl",
      resolve: {isAuth}
   }).
   when('/pins/:pinId/edit', {
      templateUrl: "partials/item-form.html",
      controller: "PinEditCtrl",
      resolve: {isAuth}
   }).
   otherwise('/'); // Send to blank page as fallback (like an 'else' stmt)
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



