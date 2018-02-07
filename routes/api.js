const express = require('express');
const router = express.Router();
const People = require('../models/people');

// get a list of people from database
//insted of app.get()
router.get('/people', function(req,res,next){
  People.aggregate().near({
   near: {
    'type': 'Point',
    'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
   },
   maxDistance: 100000,
   spherical: true,
   distanceField: "dis"
 })﻿;
});

//Adding new people
router.post('/people', function(req,res,next){
  People.create(req.body)
  .then(function(people){
    res.send(people);
  })
  .catch(next);
});

//Update a people information in database
router.put('/people/:id', function(req,res,next){
  People.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    People.findOne({_id:req.params.id}).then(function(people){
      res.send(people);
    });
  });
});

//delete people from DB
router.delete('/people/:id', function(req,res,next){
  People.findByIdAndRemove({_id: req.params.id}).then(function(people){
    res.send(people);
  });
});


module.exports = router;
