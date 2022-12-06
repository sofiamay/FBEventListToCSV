'use strict';

const fs = require('fs');


// takes user info from user-info filt and exports to guest-list.csv file
function getUsersFromJSONFile() {
	try {
		let rawdata = fs.readFileSync('user-info.txt');
		let userInfo = JSON.parse(rawdata);
		let users = userInfo.event_connected_users_private.nodes;
		if (users.length == 0) {
			console.log("No users going to event");
			return false;
		}
		_writeToFile(users);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

function _writeToFile(users) {
	const header = "User ID,name\n";
	let file = fs.createWriteStream('guest-list.csv');
	file.write(header);

	users.forEach(function(user) {
		let id = "";
		let name = "";

		if ('id' in user) {
			id = user.id;
		}
		if ('name' in user) {
			name = user.name;
		}
		//write to file:
		file.write(`${id},${name}\n`);
	});

	file.end();
}


// RUN:
getUsersFromJSONFile();