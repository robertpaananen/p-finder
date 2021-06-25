var express = require("express");
var path = require('path')
const bodyParser = require('body-parser');
const fs = require('fs')
//use the application off of express.
var app = express();
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({extended: true}))
app.post('/location', (req, res) => {
    fs.readFile(__dirname +'/personer/personer.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            const personer = JSON.parse(jsonString)
            personer.personer[0].position = JSON.parse(req.body.location)
            const saveString = JSON.stringify(personer)
            fs.writeFile(__dirname +'/personer/personer.json', saveString, err => {
                if (err) {
                    console.log('Error writing file', err)
                } else {
                    console.log('Successfully wrote file')
                }
            })
    } catch(err) {
            console.log('Error parsing JSON string:', err)
            
        }
    })
  });

var htmlPath = path.join(__dirname, "views")
app.use(express.static(htmlPath))
//define the route for "/"
var server = app.listen(3000, '192.168.1.240', function () {
    var host = '192.168.1.240';
    var port = server.address().port;
    console.log('listening on http://'+host+':'+port+'/');
});
app.post