const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//geo Schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    //it expects array of numebrs
    type: [Number],
    index: "2dsphere"
  }
});


//create people chema and model
const PeopleSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  rank: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema

});

const People = mongoose.model('people', PeopleSchema);

module.exports = People;
