// EXTERNAL MODULES //
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

// CONFIG //
var config = require('./config');

// EXPRESS //
var app = express();

app.use(express.static(__dirname + './../dist'));
app.use(bodyParser.json());

// CRON //
var cron = require('./cron/cronJob.js');
// cron.notify_cohorts();
// cron.pair_up_students();

// CONTROLLERS //
var userCtrl = require('./controllers/userCtrl');
var cohortCtrl = require('./controllers/cohortCtrl');
var pairCtrl = require('./controllers/pairCtrl');

// USER ENDPOINTS
app.get('/api/user', userCtrl.read);
app.post('/api/user', userCtrl.add);
app.put('/api/user/:id', userCtrl.update);
app.delete('/api/user/:id', userCtrl.delete);

// PAIR ENDPOINT
app.put('/api/cohort/pair', pairCtrl.pair);

// COHORT ENDPOINTS
app.get('/api/cohort', cohortCtrl.read);
app.post('/api/cohort', cohortCtrl.create);
app.put('/api/cohort/:id', cohortCtrl.update);
app.delete('/api/cohort/:id', cohortCtrl.delete);
app.get('/api/cohort/pairs', cohortCtrl.getPairs);


// CONNECTIONS //
var mongoURI = config.MONGO_URI;
var port = config.PORT;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at', mongoURI);
  app.listen(port, function() {
    console.log('Listening on port '+ port);
  });
});
