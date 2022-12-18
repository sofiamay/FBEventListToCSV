const fs = require('fs');
// Data Models
const Field = require('../models/fields').Field, Fields = require('../models/fields').Fields;

// --- takes a list of JSON Objs and outputs their info matching fields into OUTPUT_PATH csv file ---
// (object, string, Fields) --> void
function writeToFile(JSONObj, outputPath, fields) {
	// ERROR CHECKING FOR TYPE:
	if (! fields instanceof Fields) {
		throw `Type Error: writeToFile 3rd argument must be of type Field`;
	};
	// MAIN:
	let header = fields.orderedLabels().toString() + "\n";

	let file = fs.createWriteStream(outputPath);
	file.write(header);

	JSONObj.forEach(function(obj) {
		let line = [];
		fields.orderedKeys().forEach((key) => {
			let value = "null";
			if (key in obj) {
				value = obj[key];
			}
			line.push(value);
		});
		line = line.toString()+"\n";
		file.write(line);
	});

	file.end();
}

// (string) --> string
function readFileAsString(inputPath) {
	return fs.readFileSync(inputPath).toString();
}

// (string) --> string
function deleteFile(inputPath) {
	return fs.unlinkSync(inputPath);
}

module.exports = {
	writeToFile: writeToFile,
	readFileAsString: readFileAsString,
	deleteFile: deleteFile,
};