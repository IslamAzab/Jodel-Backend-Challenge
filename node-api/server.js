// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

// DATABASE SETUP
var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/jodel'); // connect to our database

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

// Jodel models lives here
var Jodel     = require('./app/models/jodel');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' }); 
});

// on routes that end in /jodels
// ----------------------------------------------------
router.route('/jodels')

  // create a jodel (accessed at POST http://localhost:8080/jodels)
  .post(function(req, res) {

    var jodel = new Jodel();    // create a new instance of the Jodel model
    jodel.name = req.body.name;  // set the jodels name (comes from the request)
    jodel.score = req.body.score;  // set the jodels score (comes from the request)

    jodel.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Jodel created!' });
    });
  })

  // get all the jodels (accessed at GET http://localhost:8080/api/jodels)
  .get(function(req, res) {
    var page = req.query.page || 1;
    var limit = parseInt(req.query.limit) || 1;

    Jodel.paginate({}, { page: page, limit: limit }, function(err, jodels) {
      if (err)
        res.send(err);

      res.json(jodels);
    });
  });

// on routes that end in /jodels/:jodel_id
// ----------------------------------------------------
router.route('/jodels/:jodel_id')

  // get the jodel with that id
  .get(function(req, res) {
    Jodel.findById(req.params.jodel_id, function(err, jodel) {
      if (err)
        res.send(err);
      res.json(jodel);
    });
  })

  // update the jodel with this id
  .put(function(req, res) {
    Jodel.findById(req.params.jodel_id, function(err, jodel) {

      if (err)
        res.send(err);

      jodel.name = req.body.name;
      jodel.score = req.body.score;
      jodel.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Jodel updated!' });
      });

    });
  })

  // delete the jodel with this id
  .delete(function(req, res) {
    Jodel.remove({
      _id: req.params.jodel_id
    }, function(err, jodel) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
