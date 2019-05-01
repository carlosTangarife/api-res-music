const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Artist = require('../models/artist');
const Category = require('../models/category');

const AlbumsSchema = new Schema({
  title: {
    type: String,
    default: null,
    required: true,
    unique: true
  },
  description: String,
  year: Number,
  image: String,
  artist: {
      type: Schema.Types.ObjectId,
      ref: Artist,
      required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: Category,
    required: true
}
});

mongoose.model('Album', AlbumsSchema);

