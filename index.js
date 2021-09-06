var express = require('express');
var app = express();

var mongoose = require('mongoose');

var body_parser = require('body-parser');

let response = {
    "message": "Failure",
    "result": "no data"
}

let arr = [
    {
        id: 1,
        name: "express",
        age: 12,
        subject: "maths"
    },
    {
        id: 2,
        name: "mongo",
        age: 12,
        subject: "maths"
    },
    {
        id: 3,
        name: "mongoose",
        age: 12,
        subject: "maths"
    },
]

app.use(express.json());

app.get('/', (req, res)=>{
    res.status(400).json(arr);
})

app.get('/:id', (req, res)=>{
    let getOneData = arr.filter(e => e.id == req.params.id);
    res.status(200).json(getOneData);
})

app.get('/about', (req, res)=>{
    res.status(200).json("About page");
})


// listen is used to specify the port number
app.listen("2000", (error)=>{
    console.log("app is listening at port 2000")
})



mongoose.connect("mongodb://localhost:27017/Person", (err)=>{
    if(err){
        console.log("DB not connected");
    }
    else{
        console.log("DB Connected");
    }
})