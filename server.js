// COMP 4537 Lab 3
// Tanner Parkes
// A01401176, Set D
// 
// Simple HTTP server with three endpoints:
// 1. /COMP4537/labs/3/getDate?name=YourName
//    - Returns an HTML page with the current date and a greeting to YourName.  
// 2. /COMP4537/labs/3/writeFile?text=YourText
//    - Appends YourText to a file named file.txt and returns a success message.
// 3. /COMP4537/labs/3/readFile
//    - Reads the contents of file.txt and returns it in the response.
// 
// AI Attribution:
// The comments were partially autofilled from co-pilot suggestions.

const http = require('http');
const fs = require('fs');
const url = require("url");
const path = require("path");
const { getDate } = require('./modules/utils');

const textFile = path.join(__dirname, 'file.txt');
const PORT = process.env.PORT || 8080;

// Server
http.createServer(function (req, res) {
    const q = url.parse(req.url, true);
    const qData = q.query;


    // Endpoint for the date with a greeting
    if (q.pathname === "/COMP4537/labs/3/getDate/") {
        const name = qData.name;
        const html = getDate(name);
        res.writeHead(200, {'Content-type':'text/html'});
        res.end(html);
    }

    // Endpoint to write to a file
    else if (q.pathname === "/COMP4537/labs/3/writeFile/") {
        const text = qData.text;

        fs.appendFile(textFile, text, (err) => {
            if (err) {
                console.error('Error writing file: ', err);
                return res.end("Error writing file");
            }
            console.log('File written successfully');
            res.writeHead(200, {'Content-type':'text/html'});
            res.end("File written successfully");
        });
    }

    // Endpoint to read from a file
    else if (q.pathname === "/COMP4537/labs/3/readFile") {
        fs.readFile(textFile, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file: ', err);
                // Error handling for file not found
                if (err.code === 'ENOENT') {
                    return res.end("File does not exist");
                }
                return res.end("Error reading file");
            }
            console.log('File read successfully');
            res.writeHead(200, {'Content-type':'text/html'});
            res.end(data);
        });
    }
    // Handle 404 routes not defined
    else {
        res.writeHead(404, {'Content-type':'text/html'});
        res.end("404 Not Found");
    }

    }).listen(PORT|| 8080);
