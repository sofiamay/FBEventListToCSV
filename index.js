#! /usr/bin/env node

const yargs = require("yargs");
const guestList = require('./guest-list-to-csv.js');

//-- CONSTANTS --
const DEFAULTSOURCEPATH = "source.html";
const DEFAULTOUTPUTPATH = "guest-list.csv";

// -- DEFINE CLI TOOL --

const usage = "\nUsage: 'fbevents <optional source html file path> <optional output file path>' to convert a guest list to .csv file";
const options = yargs  
      .usage(usage)                                                                                                   
      .help(true)  
      .argv;

// -- MAIN --
let sourcePath = DEFAULTSOURCEPATH;
let outputPath = DEFAULTOUTPUTPATH;
if (yargs.argv._[0]) sourcePath = yargs.argv._[0];
if (yargs.argv._[1]) outputPath = yargs.argv._[1];
// Run main funtion:
guestList.convertToCSV(sourcePath, outputPath);