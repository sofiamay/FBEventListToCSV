'use strict';
const  processFiles = require('../helpers/process-files');
// Data Models  based on graph API
const User = require('../models/users').User, Users = require('../models/users').Users;
const Field = require('../models/fields').Field, Fields = require('../models/fields').Fields;

/*
Extracts users attending a facebook event and exports them to a CSV file. 
Save the facebook event page to INPUT_PATH or replace source.html with the fb event page
results are saved to OUTPUT_PATH or "guest-list.csv"
and are in the format "User Id, name"
Returns bool: true on success, false on failure
*/

function convertToCSV(inputPath = "source.html", outputPath = "guest-list.csv", deleteSource = false, fieldList = []) {
	try {
		// -- ERROR CHECKING: --
		// 1)  files must be in correct format
		if (!inputPath.endsWith(".html")) {
			throw "input file must be an html source ending with '.html'";
		}
		if (!outputPath.endsWith(".csv")) {
			throw "output file must ends with .csv";
		}
		// 2) fields must contain at least name and id fields
		if (Object.keys(fieldList).length === 0) {
			console.log("no fields");
			throw `Missing required fields for csv format`;
		}

		// -- MAIN --
		const html = processFiles.readFileAsString(inputPath);
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

		// Convert data to JSON object 
		let userJSON= JSON.parse(data);
		let users = new Users();
		userJSON.event_connected_users_private.nodes.forEach((userInfo) => {
			let user = new User(userInfo);
			users.push(user);
		});
		if (users.length == 0) {
			console.log("No users going to event");
			return false;
		}
		let fields = Fields.fromArray(fieldList);
		let usersData = users.toList();
		processFiles.writeToFile(usersData, outputPath, fields);
		if (deleteSource) {
			processFiles.deleteFile(inputPath);
			console.log(`- ${inputPath} deleted`);
		}
		console.log(`Success: Guest list exported to ${outputPath}`);
		return true;

	// CATCH ERRORS
	} catch (error) {
		console.log(error);
		return false;
	}
}

module.exports = { convertToCSV: convertToCSV };

