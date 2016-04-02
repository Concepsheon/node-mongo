var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var hostname = 'localhost';
var port = 3000;

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://localhost:27017/movies', function(err, db){
  assert.equal(null, err);
  console.log('Successfully connected to Mongo server');
  
  app.get('/', function(req, res){
    db.collection('upcoming').find().toArray(function(err, docs){
      assert.equal(null, err);
      res.render('list', {'movies': docs});
    });
  });
});

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
