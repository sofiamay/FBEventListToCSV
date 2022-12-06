# Export User Created FB Event Lists
The Facebook Graph API gives access to data for group/page/public events but not user created events. So I made this simple script to pull data from the html page and output the "Going" list to a .csv file.

## Requirements

- Node.js

## Usage 
- Save the html page for the facebook event. Override the contents of *source.html* with your html data or point the environment variable INPUT_PATH to your html file
- results will be output to *guest-list.csv* or your custom OUTPUT_PATH
- run `node get-users.js`
- Results are of the format:

| User ID | Name |  
| ----------- | ----------- |  
| 987234812 | A Person |  
| 263524184637 | Another Person |

