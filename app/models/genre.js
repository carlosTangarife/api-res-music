const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenresSchema = new Schema({
  name:{
    type: String,
    default: null,
    required: true
  }
});

mongoose.model('Genre', GenresSchema);

