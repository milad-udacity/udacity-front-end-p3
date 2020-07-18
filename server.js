// Setup empty JS object to act as endpoint for all routes
projectData = {};
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('./helpers/uuid');

const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = process.env.PORT || 3000;

//Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log(`Server Running on Port: ${port}`);
};

//GET route that returns the projectData object
app.get('/all', sendData)

function sendData(req, res) {
    res.status(200).json(projectData)
}

// POST route
app.post('/addWeatherData', addData)

function addData(req, res) {
    const { temperature, date, user_response } = req.body;
    const id = uuid();
    let newRequest = {
        id,
        temperature,
        date,
        user_response,
    }
    projectData = newRequest;
    res.status(201).json(newRequest);
}