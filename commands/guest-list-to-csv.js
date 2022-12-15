'use strict';
const  processFiles = require('../helpers/process-files');

class User {
	constructor(jsonObj) {
		this.id = jsonObj.id || null;
		this.name = jsonObj.name || null;
		this.profilePicture = jsonObj.profile_picture.uri || null;
		this.JSONObj = {
			"id": this.id,
			"name": this.name,
			"profile_picture": this.profilePicture,
		};
	}
}

class Users {
	constructor(users) {
		let self = this;
		this.users = users || [];

		// access users[index]
		return new Proxy(this, {
      get(target, prop) {
        if (Number(prop) == prop && !(prop in target)) {
          return self.users[prop];
        }
        return target[prop];
      }
    });
	}

	static fromUserList(usersInfo) {
		let userList = [];
		usersInfo.forEach((userInfo) => {
			let user = new User(userInfo);
			userList.push(user);
		});
		return new Users(userList);
	}

	get length() {
		return this.users.length;
	}

	push(user) {
		this.users.push(user);
	}

	toList() {
		let list = [];
		this.users.forEach((user) => {
			list.push(user.JSONObj);
		});
		return list;
	}


}

// required key<string>, title<string>
class Field {
  constructor(key, label) {
  	if (!key || !label) throw `Field instance is missing key or title`;
    this.key = key;
    this.label = label;
  }

  static fromArray(arr) {
  	if (arr.length != 2) throw `Field.fromObj(arr): arr must have exactly 2 items, a key followed by a label`;
  	const key = arr[0];	
  	const label = arr[1];
  	return new Field(key, label);
  }
}

// add Field to Fields with Fields.append(Field) in the order they should appear
class Fields {
  constructor() {
    this._ordered = [];
    this._fields = {}; //eg. { "name": <Field>{key: "name", label: "Name"} }
  }

  //accepts array of arrays, returns new Fields object. E.g. [["id", "User ID],["name," "Name"]]
  static fromArray(fieldList) {
  	let fields = new Fields(); 
  	fieldList.forEach((keyAndLabel, index) => {
  		if (keyAndLabel.length != 2) throw `Fields.fromMap: each field must contain 2 strings exactly, a key value pair`;
  		let key = keyAndLabel[0];
  		let label = keyAndLabel[1];
  		let field = new Field(key, label);
  		fields.push(field);
  	});
  	return fields;
  }

  push(field) {
  	if (! (field instanceof Field)) throw `Fields.push only accepts Field objects`;
  	if (!this._fields[field.key]) {
	  	this._ordered.push(field);
	  	this._fields[field.key] = field;
	  } else {
	  	console.log(`Cannot add field to Fields. Field with key ${field.key} already in Fields`);
	  }
  }

  remove(field) {
  	const index = this._ordered.indexOf(field);
		if (index > -1) { // only splice array when item is found
		  this._ordered.splice(index, 1);
		  delete this._fields[field];
		}
  }

  containsKey(key) {
  	if (!this._fields[key]) return false;
  	return true;
  }

  getField(key) {
  	return this._fields[key];
  }

  getLabelof(key) {
  	if (! this._fields[key]) {
  		console.log(`field with key ${key} doesn't exist in Fields`);
  		return null;
  	}
  	let field = this._fields[key];
  	return field.label;
  }

  length() {
  	return this._ordered.length();
  }

  // returns list of labels
  orderedLabels() {
  	let labels = [];
  	this._ordered.forEach((field, index) => {
  		labels.push(field.label);
  	});
  	return labels;
  }

  // returns list of keys
  orderedKeys() {
  	let keys = [];
  	this._ordered.forEach((field, index) => {
  		keys.push(field.key);
  	});
  	return keys;
  }
}

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

