'use strict';
const fs = require('fs');

// Extracts users attending a facebook event and exports them to a CSV file. 
// Save the facebook event page to INPUT_PATH or replace source.html with the fb event page
// results are saved to OUTPUT_PATH or "guest-list.csv"
// and are in the format "User Id, name"


function convertToCSV(inputPath = "source.html") {
	try {
		const html = fs.readFileSync(inputPath).toString();
		const regex = /"event_connected_users_private.+]},"event_connected_emails_going"/;
		const found = html.match(regex);
		if (found.length != 1) {
			console.log("Cannot find list of attendees within html file");
			return false;
		}
		let match = found[0];
		// remove next JSON opbject from match string
		match = match.replace(`,"event_connected_emails_going"`, "");
		// enclose match in {} to make valid JSON string
		const data = "{" + match + "}";
		return getUsers(data);
	} catch (error) {
		console.log(error);
		return false;
	}
}

// takes user info string and exports to csv file
function getUsers(data) {
	let userInfo = JSON.parse(data);
	let users = userInfo.event_connected_users_private.nodes;
	if (users.length == 0) {
		console.log("No users going to event");
		return false;
	}
	_writeToFile(users);
	console.log("Success");
	return true;
}

// takes a JSON list of users and outputs their info into OUTPUT_PATh csv file
function _writeToFile(users) {
	const header = "User ID,Name\n";
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

module.exports = { convertToCSV: convertToCSV };


// RUN:
// getUsersFromHTML();
