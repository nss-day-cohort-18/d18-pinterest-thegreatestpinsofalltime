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
			console.log("newObj", allPins);
		});

	};

	// let getPin = (user) => {
	// 	let items = [];
	// 	return $q((resolve, reject) => {
	// 		$http.get(`${FBCreds.databaseURL}/pins.json?orderBy="uid"&equalTo="${pinId}"`)
	// 		.then((itemObject) => {
	// 			let itemCollection = itemObject.data;
	// 			Object.keys(itemCollection).forEach((key) => {
	// 				itemCollection[key].id = key;
	// 				items.push(itemCollection[key]);
	// 				console.log("array", items);
	// 			});
	// 			resolve(items);
	// 		})
	// 		//success and error are used in previous versions of angular. now then and catch
	// 		.catch((error) => {
	// 			reject(error);
	// 		});
	// 	}); 
	// };

	let postPin = (newItem) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/items.json`,
				JSON.stringify(newItem))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			})
			.catch((error) => {
				reject(error);
			});
		});

	};

	// let deletePin = (itemId) => {
	// 	console.log("delete in factory", itemId);
	// 	return $q((resolve, reject) => {
	// 		$http.delete(`${FBCreds.databaseURL}/items/${itemId}.json`)
	// 		.then((ObjectFromFirebase) => {
	// 			resolve(ObjectFromFirebase);
	// 		})
	// 		.catch((error) => {
	// 			reject(error);
	// 		});
	// 	});
	// };

	// // let getSingleItem = (itemId) => {
	// // 	return $q(function(resolve, reject) {
	// // 		$http.get(`${FBCreds.databaseURL}/items/${itemId}.json`)
	// // 		.then(function(itemObject){
	// // 			resolve(itemObject.data);
	// // 		})
	// // 		.catch(function(error){ 
	// // 			reject(error);
	// // 		});
	// // 	});
	// // };

	// let updatePin = (itemId, editedItem) => {
	// 	//properties with leading $$ characters will be stripped since Angular uses that notaton internally
	// console.log("angularJSON", angular.toJson(editedItem));
	// console.log("JSON.stringify", JSON.stringify(editedItem));
	// 	return $q(function(resolve, reject) {
	// 		//pass the item we're adjusting and then the actual item
	// 		$http.patch(`${FBCreds.databaseURL}/items/${itemId}.json`,
	// 			angular.toJson(editedItem))
	// 		.then(function(ObjectFromFirebase) {
	// 			resolve(ObjectFromFirebase);
	// 		})
	// 		.catch(function(error) {
	// 			reject(error);
	// 		});

	// 	});
	// };

	//return so that they can become part of ItemStorage

	return {getAllPins};

	});


