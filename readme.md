# CLI Tool: fbevents

The Facebook Graph API gives access to data for group/page/public events but not private user created events. So I made this simple script to pull data from the html page and output the "Going" list to a .csv file.

Example:
`fbevents my-event-page.html -o new-guest-list.csv`

## Requirements

- Node.js

## Installation

`npm install -g`

In a browser navigate to the fb event. Save the source to an html file.

## Usage

In terminal:

    fbevents <htmlfile>
    - s | --source (optional): Use 'source.html' as import file and omit <htmlfile>.
    - o | --output (optional): path to the .csv output file
    - r | --rm-source (optional): remove .html file after execution. Defaults to false.
    - p | --photo (optional): Add a link to guest profile as a field in the csv file.

Results are of the format:

| User ID | Name | (Profile Photo) | 
| ----------- | ----------- | ----------- |
| 987234812 | A Person | https://a-link-to-a-photo.jpg | 
| 263524184637 | Another Person | https://a-link-to-another-photo.jpg |


Profile photo is an optional field provided by the -p flag

