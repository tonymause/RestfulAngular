
// BASE SETUP
// =============================================================================
var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Monkey = require('./app/models/Monkey');

// mongoose.connect('mongodb://username:password@jello.modulusmongo.net:27017/rIdo5tyv',
mongoose.connect('mongodb://127.0.0.1:27017/test',
  function(err){
    if (err) {
      console.log('Connection err: '+ err);
    } else {
      console.log('Connection successfully.');
    }
  });

// configure app to use bodyParser
// this will let us to get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set port
var port = process.env.PORT || 8081;

// ROUTE FOR API
// =============================================================================
// get an instance of the express Router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// define the home page route
router.get('/', function(req, res){
  res.send('Some birds flying...');
});

router.get('/users', function(req, res){
  fs.readFile(__dirname+"/"+"users.json",'utf8', function(err, data){
    console.log('get users');
    res.send(data);
  });
});

// model:monkey route
router.route('/monkeys')
  .get(function(req, res){
    Monkey.find(function(err, monkeys){
      if (err) {
        res.send(err);
      }
      res.json(monkeys);
    })
  })
  .post(function(req, res){
    var monkey = new Monkey();
    monkey.name=req.body.name;

    monkey.save(function(err){
      if (err)
        res.send(err);
      res.json({ message: 'Monkey created!' });
    });
  })

router.route('/monkeys/:id')
  .get(function(req, res){
    Monkey.findById(req.params.id, function(err, monkey){
      if (err)
        res.send(err);
      res.json(monkey);
    });
  })
  .put(function(req, res){
    Monkey.findByIdAndUpdate(req.params.id,
      {name: req.body.name},
      function(err){
        if (err)
          res.send(err);
        res.json({message: 'Updated!'});
    });
  })
  .delete(function(req, res){
    Monkey.findByIdAndRemove(req.params.id,
      function(err){
        if (err)
          res.send(err);
        res.json({message: 'Removed'});
      })
  })


// REGISTER the routes
app.use('/api', router);

// START THE SERVER
// =============================================================================
var server = app.listen(port, function(){
  console.log("Running at port: " + port);
});
