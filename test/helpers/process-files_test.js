var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;
var chaiFiles = require('chai-files');
chai.use(chaiFiles);
var file = chaiFiles.file;
const fs = require('fs');

// Files to test:
const Field = require("../../models/fields.js").Field;
const Fields = require("../../models/fields.js").Fields;

// Files to test:
const processFiles = require("../../helpers/process-files.js");
const writeToFile = processFiles.writeToFile;
const readFileAsString = processFiles.readFileAsString;
const deleteFile = processFiles.deleteFile;


//Constants:
const EXAMPLE_FILE = "./test/test-example-file.txt";
const OUTPUT_FILE = "./test/test-guest-list.csv";

// ---- TESTS ----

describe("File Processing", () => {
  beforeEach(function () {
    // Create an example file to test
    fs.writeFileSync(EXAMPLE_FILE, "");
  });
  it("readFileAsString(inputPath) should return file contents", () => {
  	let data = "Adding this data to file";
  	fs.writeFileSync(EXAMPLE_FILE, data);
  	let fileContent = readFileAsString(EXAMPLE_FILE);
  	expect(fileContent).to.contain(data);
  });
  it("deleteFile(inputPath) should delete a file", () => {
  	let toDelete = EXAMPLE_FILE;
  	deleteFile(toDelete);
  	expect(file(toDelete)).to.not.exist;
  });
  it("writeToFile(JSONObj, outputPath, fields)", () => {
  	const obj1 = {
  		"name": "John",
  		"id": "12345"
  	};
  	const obj2 = {
  		"name": "Claire",
  		"id": "987654",
  		"profile_picture": "https://a-url-to-a-photo.jpg"
  	};
  	const obj3 = {
  		"name": "Jessica",
  		"id": "1928384"
  	};
  	const fieldsData = [
  		["id", "ID"],
  		["name", "Name"],
  	];
  	const data = [obj1, obj2, obj3];
  	const fields = Fields.fromArray(fieldsData);

  	writeToFile(data, OUTPUT_FILE, fields).then( (res) => {
  		expect(res.bytesWritten).to.equal(49);
  		let resultContents = fs.readFileSync(inputPath).toString();
  		expect(resultContents).to.contain("12345,John");
  		done();
  	});
  });
  afterEach(function () {
    // Delete example file if it exists
    if (fs.existsSync(EXAMPLE_FILE)) {
    	fs.unlinkSync(EXAMPLE_FILE);
    }
    if (fs.existsSync(OUTPUT_FILE)) {
    	fs.unlinkSync(OUTPUT_FILE);
    }
  });
});