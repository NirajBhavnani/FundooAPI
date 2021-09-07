// Importing packages
const express = require('express');
const mongoose = require('mongoose');
const logger = require('./Logger/logger');
require('dotenv/config');
const cors = require('cors'); //For external API

// Declaration/Execution
const app = express();
const db = mongoose.connection; //it is used for some events to run when our database is connected

// Import router
const usersRoute = require('./Router/router');

// Middlewares : Executes everytime we enter the given route
app.use(cors());
app.use(express.json()); //Replaced body-parser with default express parser

app.use('/users', usersRoute);


// ROUTES
app.get('/', (req, res)=>{
    res.send('We are on Home Page');
});

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true});

// When there's a problem connecting to the DB
db.on('error', (error)=>{
    logger.error(error);
});

// This code will execute only once whenever we are connected to the DB
db.once('open', ()=>{
    logger.info('Connected to the Database');
});

// Boot up/Listen to the server
app.listen(2000, ()=>{
    logger.info("Server Started") //Add the port number as an argument
});