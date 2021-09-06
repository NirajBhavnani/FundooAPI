// Importing packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

// Declaration/Execution
const app = express();

// Import router
const usersRoute = require('./Router/router');

// Middlewares : Executes everytime we enter the given route
app.use(bodyParser.json());

app.use('/users', usersRoute);
// app.use('/users', ()=>{
//     console.log('This is middleware');
// });

// ROUTES
app.get('/', (req, res)=>{
    res.send('We are on Home Page');
});

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, ()=>{
    console.log("Connected to the database");
});

// Boot up/Listen to the server
app.listen(2000); //Add the port number as an argument