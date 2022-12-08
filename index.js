#! /usr/bin/env node

const guestList = require('./guest-list-to-csv.js')

// RUN:
guestList.convertToCSV();
console.log("Hello World!");