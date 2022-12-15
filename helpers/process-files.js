const fs = require('fs');

// takes a list of JSON Objs and outputs their info matching fields into OUTPUT_PATh csv file
function writeToFile(JSONObj, outputPath, fields) {
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

function readFileAsString(inputPath) {
	return fs.readFileSync(inputPath).toString();
}

function deleteFile(inputPath) {
	return fs.unlinkSync(inputPath);
}

module.exports = {
	writeToFile: writeToFile,
	readFileAsString: readFileAsString,
	deleteFile: deleteFile,
};