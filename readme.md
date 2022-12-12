# CLI Tool: fbevents

The Facebook Graph API gives access to data for group/page/public events but not user created events. So I made this simple script to pull data from the html page and output the "Going" list to a .csv file.

Example:
`fbevents -o new-guest-list.csv`

## Requirements

- Node.js

## Installation

`npm install -g`

In a browser navigate to the fb event. Save the source to an html file.

## Usage

In terminal:

    fbevents
    - s | --source (optional): path to the .html file of the fb event page
    - o | --output (optional): path to the .csv output file


Results are of the format:

| User ID | Name |  
| ----------- | ----------- |  
| 987234812 | A Person |  
| 263524184637 | Another Person |

