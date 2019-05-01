const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Genre = require('../models/genre');

const ArtistsSchema = new Schema({
  name:{
    type: String,
    default: null,
    required: true
  },
  description: String,
  image: String,
  genre: {
    type: Schema.Types.ObjectId,
    ref: Genre,
    required: true
  }
});

mongoose.model('Artist', ArtistsSchema);

