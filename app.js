// const http = require('http');
// const fs = require('fs');s
// const hostname = '127.0.0.1';
//const port = 3000;

var uri = 'mongodb://techart:techart@ds245347.mlab.com:45347/heroku_9np9gjjq';
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
var mongodb = require('mongodb');
var db = mongojs(uri, ['items']);
var ObjectId = mongojs.ObjectId;
var cool = require('cool-ascii-faces');
var app = express();

app.set('port', (process.env.PORT || 5000));

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static path
app.use(express.static(path.join(__dirname, 'public')));

//Connect to Mongo Database via field 'uri'
mongodb.MongoClient.connect(uri, function(err,db){
    if(err){
        throw err;
        console.log(err);
    }
    else{
        console.log("connected");
    }
});

// '/' redirects to /list, for now
app.get('/', function(req, res){
    res.redirect('/list');
});

// '/cool' === PUSH LOCAL CHANGES TEST -- Remove 
app.get('/cool', function(req, res){
    res.send(cool());
});

//LIST : post
app.post('/list', function(req, res){
    var item = req.body.itemToAdd;
    if(item != ''){
        var newItem = {itemNumber: 4, item: item};
        db.items.insert(newItem, function(err, result){
            if(err){
                console.log(err);
            }
            else{
                res.redirect('/list');
            }
        });
    }
});

//LIST: get
app.get('/list', function(req, res){
    db.items.find(function(err,docs){
        res.render('list', {
            items: docs
        });
    });
});

//LIST/DELETE : delete
app.delete('/list/delete/:id', function (req, res) {
    console.log(req.params.id);
    db.items.remove({ _id: ObjectId(req.params.id) },
        function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect('/');
            }
        });
});

app.listen(app.get('port'), function(){
    console.log('Server started on port ' + app.get('port'));
});

