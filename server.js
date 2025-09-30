
const http = require('http');
const fs = require('fs');
const url = require("url");
const path = require("path");
const { getDate } = require('./modules/utils');

const textFile = path.join(__dirname, 'file.txt');

http.createServer(function (req, res) {
    const q = url.parse(req.url, true);
    const qData = q.query;
  
    if (q.pathname === "/COMP4537/labs/3/getDate/") {
        const name = qData.name;
        const html = getDate(name);
        res.writeHead(200, {'Content-type':'text/html'});
        res.end(html);
    }

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

    else if (q.pathname === "/COMP4537/labs/3/readFile") {
        fs.readFile(textFile, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file: ', err);
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
    else {
        res.writeHead(404, {'Content-type':'text/html'});
        res.end("404 Not Found");
    }

    }).listen(8080);
