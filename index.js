// Importing packages
const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

// Declaration/Execution
const app = express();

// Middlewares : Executes everytime we enter the given route
// app.use('/users', ()=>{
//     console.log('This is middleware');
// });

// ROUTES
app.get('/', (req, res)=>{
    res.send('We are on Home Page');
});

app.get('/users', (req, res)=>{
    res.send('We are on Users Page');
});

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, ()=>{
    console.log("Connected to the database");
});

// Boot up/Listen to the server
app.listen(2000); //Add the port number as an argument