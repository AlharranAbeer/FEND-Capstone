// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

/* Dependencies */
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware */
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// POST route
app.post('/add', add);

function add(request, response) {
    projectData['temp'] = request.body.temp;
    projectData['date'] = request.body.date;
    projectData['content'] = request.body.content;
    response.send(projectData);
}
//GET route that returns the projectData object
app.get('/all', sendData);

function sendData (request, response) {
    response.send(projectData);
    console.log('server running');
    console.log(`running on localhost: ${port}`);
    console.log(`Temperature : ${projectData['temp']}`);
    console.log(`Date : ${projectData['date']}`);
    console.log(`Content : ${projectData['content']}`);
};
// Setup Server
/*  callback to debug */
const port = 8080;
const server = app.listen(port, listening);
function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
    console.log(`Temperature : ${projectData['temp']}`);
    console.log(`Date : ${projectData['date']}`);
    console.log(`Content : ${projectData['content']}`);
};