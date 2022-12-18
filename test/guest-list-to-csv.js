var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;
var chaiFiles = require('chai-files');
chai.use(chaiFiles);
var file = chaiFiles.file;
const fs = require('fs');

// Files to test:
const guestList = require("../commands/guest-list-to-csv.js");

// Constants
const INPUTPATH = "./test/test-example.html";
const OUTPUTPATH = "./test/test-guest-list.csv";
const FIELDS = [
  ["id", "User ID"],
  ["name", "Name"],
];

// ---- TESTS ----

describe("GuestListToCSV Function", () => {
  it("Outputs CSV from HTML file", () => {
    const deleteSource = false;
    guestList.convertToCSV(INPUTPATH, OUTPUTPATH, deleteSource, FIELDS);
    let resultFile = OUTPUTPATH;
    expect(file(resultFile)).to.exist;
    expect(file(resultFile)).to.contain("Maddie Fried");
  });
});