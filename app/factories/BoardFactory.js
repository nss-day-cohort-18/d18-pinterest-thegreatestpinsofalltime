"use strict";


app.factory("ItemStorage", ($q, $http, FBCreds, AuthFactory) => {
	

	let getBoardList = () => {
		let boardObj = [];
		let user = AuthFactory.getUser();

		return $q((resolve, reject) => {
			// console.log("list url", `${FBCreds.databaseURL}/items.json?orderBy="uid"&equalTo="${user}"`);
			$http.get(`${FBCreds.databaseURL}/boards.json?orderBy="uid"&equalTo="${user}"`)
			.then((itemObject) => {
				let itemCollection = itemObject.data;
				Object.keys(itemCollection).forEach((key) => {
					itemCollection[key].id = key;
					boardObj.push(itemCollection[key]);
				});
				resolve(boardObj);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let postNewBoard = (newItem) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/boards.json`,
				JSON.stringify(newItem))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			})
			.catch((error) => {
				reject(error);
			});
		});

	};

	let deleteBoard = (itemId) => {
		console.log("delete in factory", itemId);
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/items/${itemId}.json`)
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			});
		});

	};

	let getSingleBoard = (itemId) => {
		return $q(function(resolve, reject){
			$http.get(`${FBCreds.databaseURL}/items/${itemId}.json`)
			.then(function (itemObject) {
				resolve(itemObject.data);
			})
			.catch(function(error){
				reject(error);
			});
		});
	};

	let updateBoard = (itemId, editedItem) => {
		return $q(function(resolve, reject){
			$http.patch(`${FBCreds.databaseURL}/items/${itemId}.json`, 
				angular.toJson(editedItem))
			.then(function(ObjectFromFirebase) {
				resolve(ObjectFromFirebase);
			})
			.catch(function(error){
				reject(error);
			});
		});
	};






	return {getBoardList, postNewBoard, deleteBoard, getSingleBoard, updateBoard};
});