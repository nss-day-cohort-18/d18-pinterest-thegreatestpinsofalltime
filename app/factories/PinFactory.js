"use strict";

app.factory("PinFactory", ($q, $http, FBCreds) => {
console.log("hello from pinfactory");

	let getAllPins = () => {
		let allPins = [];
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/pins.json`)
			.then((pinObject) => {
				let pinList = pinObject.data;
				// console.log(pinList);
				Object.keys(pinList).forEach((key) => {
					pinList[key].id = key;
					allPins.push(pinList[key]);
				});
				resolve(allPins);
			})
			.catch((error) => {
				reject(error);
			});
		});

	};

	let getPins = (user) => {
		let userPins = [];
		return $q((resolve, reject) => {
			console.log("user at getPins", user);
			$http.get(`${FBCreds.databaseURL}/pins.json?orderBy="uid"&equalTo="${user}"`)
			.then((userPinObject) => {
				let userPinList = userPinObject.data;
				Object.keys(userPinList).forEach((key) => {
					userPinList[key].id = key;
					userPins.push(userPinList[key]);
					console.log(userPins);
				});
				resolve(userPins);
			})
			//success and error are used in previous versions of angular. now then and catch
			.catch((error) => {
				reject(error);
			});
		});
	};


	let postNewPin = (newPin) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/pins.json`,
				JSON.stringify(newPin))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			})
			.catch((error) => {
				reject(error);
			});
		});

	};

	let deletePin = (pinId) => {
		console.log("delete in factory", pinId);
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/pins/${pinId}.json`)
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let getSinglePin = (pinId) => {
		return $q(function(resolve, reject) {
			$http.get(`${FBCreds.databaseURL}/pins/${pinId}.json`)
			.then(function(pinObject){
				resolve(pinObject.data);
			})
			.catch(function(error){
				reject(error);
			});
		});
	};

	let updatePin = (pinId, editedPin) => {
		//properties with leading $$ characters will be stripped since Angular uses that notaton internally
	console.log("angularJSON", angular.toJson(editedPin));
	console.log("JSON.stringify", JSON.stringify(editedPin));
		return $q(function(resolve, reject) {
			//pass the item we're adjusting and then the actual item
			$http.patch(`${FBCreds.databaseURL}/pins/${pinId}.json`,
				angular.toJson(editedPin))
			.then(function(ObjectFromFirebase) {
				resolve(ObjectFromFirebase);
			})
			.catch((error) => {
				reject(error);
			});

		});
	};

	let getBoardPins = (boardId) => {
		let boardPins = [];
		return $q((resolve, reject) => {
			console.log("board at getPins", boardId);
			$http.get(`${FBCreds.databaseURL}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
			.then((boardPinObject) => {
				let boardPinList = boardPinObject.data;
				console.log('Board Pin List: ', boardPinList);
				Object.keys(boardPinList).forEach((key) => {
					boardPinList[key].id = key;
					boardPins.push(boardPinList[key]);
					console.log(boardPins);
				});
				resolve(boardPins);
			})
			//success and error are used in previous versions of angular. now then and catch
			.catch((error) => {
				reject(error);
			});
		});
	};

	//return so that they can become part of ItemStorage


	return {getAllPins, getPins, postNewPin, deletePin, getSinglePin, updatePin, getBoardPins};


	});
