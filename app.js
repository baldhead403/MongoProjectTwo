const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const path = require('path')
let db;

app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://sandbox:sandbox1@ds141621.mlab.com:41621/quotes', (err,database)=>{
     if (err) return console.log(err)
     db = database.db('quotes')
     app.listen(3000, function () {
        console.log("Listening on port 3000")
    });   
     
})

app.get('/',function (req,res) {
    res.sendFile(__dirname + "/views/index.pug")
    
})
app.post('/quotes', (req,res) => {
    db.collection('quotes').save(req.body,(err,result)=> {
    res.redirect('/')
    })
    console.log("Saved to database")
})