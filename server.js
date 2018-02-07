const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express expressApp
const app = express();

// connect to MONGODB
mongoose.connect('mongodb://localhost/people');
mongoose.Promise = global.Promise;

app.use(express.static('public'));


app.use(bodyParser.json());


//initializing routes
app.use('/api',routes);

//error handling middleware
app.use(function(err,req,res,next){
  //console.log(err);
  res.send({error: err.message})
});


app.listen(process.env.port || 3000, function(){
  console.log('express on port 3000');
});
