#! /usr/bin/env node

const yargs = require("yargs");
const guestList = require('./commands/guest-list-to-csv.js');

//-- CONSTANTS --
const DEFAULTSOURCEPATH = "source.html";
const DEFAULTOUTPUTPATH = "guest-list.csv";
// fields take the form [jsonKey: csv label]
const DEFAULTFIELDS = [
	["id", "User ID"],
	["name", "Name"],
];
const PHOTOFIELD = ["profile_picture", "Profile Picture"];

// -- DEFINE CLI TOOL --

const usage = `\nUsage: 'fbevents myeventpage.html -o output-path-string' to convert a guest list to .csv file.
	The input file is a requird argument, unless replaced with the -s flag`;
const fbevents = yargs
			.scriptName("fbevents") 
      .usage(usage)
      .example(
      	"fbevents -s eventpage.html",
      	"extracts data from 'eventpage.html' and 'guest-list.csv' containing the ids and names of guests attending the events"
      )                                                                                                  
      .help(true)
      .option("s", {
		    alias: "source",
		    describe: "use the default path of 'source.html' for the input file",
		    type: "string",
		    nargs: 1,
		  })
		  .option("o", {
		    alias: "output",
		    describe: "path to the .csv file",
		    type: "string",
		    nargs: 1,
		  })
		  .option("r", {
		    alias: "rm-source",
		    describe: "delete html file after executing",
		    type: "boolean",
		    nargs: 0,
		  })
		  .option("p", {
		    alias: "include-photo",
		    describe: "include profile photo",
		    type: "boolean",
		    nargs: 0,
		  })  
      .argv;

// -- MAIN --
let args = fbevents._;
if ((args.length >= 2) || (fbevents.source && args.length > 0)) throw `Incorrect number of arguments`;
// only arg should be input file
let sourcePath = args[0] ?? DEFAULTSOURCEPATH;
let outputPath = fbevents.output ?? DEFAULTOUTPUTPATH;
let deleteSource = fbevents.rmSource ?? false;
let includePhoto = fbevents.includePhoto ?? false;
let fields = DEFAULTFIELDS;
if (fbevents.includePhoto) fields.push(PHOTOFIELD);


// Run main funtion:
guestList.convertToCSV(sourcePath, outputPath, deleteSource, fields);