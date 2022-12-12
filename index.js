#! /usr/bin/env node

const yargs = require("yargs");
const guestList = require('./commands/guest-list-to-csv.js');

//-- CONSTANTS --
const DEFAULTSOURCEPATH = "source.html";
const DEFAULTOUTPUTPATH = "guest-list.csv";

// -- DEFINE CLI TOOL --

const usage = "\nUsage: 'fbevents -s source-path-string -o output-path-string' to convert a guest list to .csv file";
const args = yargs
			.scriptName("fbevents") 
      .usage(usage)
      .example(
      	"fbevents -s eventpage.html",
      	"extracts data from 'eventpage.html' and 'guest-list.csv' containing the ids and names of guests attending the events"
      )                                                                                                  
      .help(true)
      .option("s", {
		    alias: "source",
		    describe: "the source html file that corresponds to the fb event page",
		    type: "string",
		    nargs: 1,
		  })
		  .option("o", {
		    alias: "output",
		    describe: "path to the .csv file",
		    type: "string",
		    nargs: 1,
		  })   
      .argv;

// -- MAIN --
let sourcePath = args.source ?? DEFAULTSOURCEPATH;
let outputPath = args.output ?? DEFAULTOUTPUTPATH;

// Run main funtion:
guestList.convertToCSV(sourcePath, outputPath);