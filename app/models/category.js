const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  name:{
    type: String,
    default: null,
    required: true,
    unique: true
  }
});

mongoose.model('Category', CategoriesSchema);

