#! /usr/bin/env node

const yargs = require("yargs");
const guestList = require('./guest-list-to-csv.js');

const usage = "\nUsage: 'fbevents <optional source html file path>' to convert a guest list to .csv file";
const options = yargs  
      .usage(usage)                                                                                                   
      .help(true)  
      .argv;

// RUN:
let sourcePath = "source.html";
if (yargs.argv._[0]) sourcePath = yargs.argv._[0];
guestList.convertToCSV(sourcePath);
