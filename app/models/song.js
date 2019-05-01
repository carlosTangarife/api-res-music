const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Album = require('./album');

const SongsSchema = new Schema({
  number: {
    type: Number,
    default: null,
    required: true,
    unique: true
  },
  name: {
      type: String,
      default: null,
      required: true,
      unique: true
  },
  duration: {
      type: String,
      default: null,
      required: true
  },
  file: String,
  album: {
      type: Schema.Types.ObjectId,
      ref: Album,
      required: true
  }
});

mongoose.model('Song', SongsSchema);

