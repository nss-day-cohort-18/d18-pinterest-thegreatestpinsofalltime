"use strict";


app.factory("BoardFactory", ($q, $http, FBCreds, AuthFactory) => {
	
	let getBoardList = () => {
		let boardObj = [];
		let user = AuthFactory.getUser();

		// ?orderBy="uid"&equalTo="${user}"

		console.log("BoardFactory");
		return $q((resolve, reject) => {
			// console.log("list url", `${FBCreds.databaseURL}/items.json?orderBy="uid"&equalTo="${user}"`);
			$http.get(`${FBCreds.databaseURL}/boards.json`)
			.then((boardObject) => {
				let boardCollection = boardObject.data;
				console.log("boardCollection", boardCollection);
				Object.keys(boardCollection).forEach((key) => {
					boardObj.push(boardCollection[key]);
				});
				resolve(boardObj);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let postNewBoard = (newBoard) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/boards.json`,
				JSON.stringify(newBoard))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			})
			.catch((error) => {
				reject(error);
			});
		});

	};

	let deleteBoard = (boardId) => {
		console.log("delete in factory", boardId);
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/boards/${boardId}.json`)
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			});
		});

	};

	let getSingleBoard = (boardId) => {
		return $q(function(resolve, reject){
			$http.get(`${FBCreds.databaseURL}/boards/${boardId}.json`)
			.then(function (boardObject) {
				resolve(boardObject.data);
			})
			.catch(function(error){
				reject(error);
			});
		});
	};

	let updateBoard = (boardId, editedBoard) => {
		return $q(function(resolve, reject){
			$http.patch(`${FBCreds.databaseURL}/boards/${boardId}.json`, 
				angular.toJson(editedBoard))
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