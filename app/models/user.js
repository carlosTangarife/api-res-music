const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  displayName: String,
  password: {
      type: String,
      select: false,
      required: true
  },
  signupDate: {
    type: Date,
    default: Date.now(),
    lastLogin: Date
}
});

UserSchema.pre("save", function(next) {
  bcrypt.genSalt(10, (err, salt) => {
    if(err){
      return next(err);
    }
    bcrypt.hash(this.password, salt, null, (err, hash) => {
      if(err){
        return next(err);
      }
      this.password = hash;
      next()
    })
  })
})


UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    callback(err, isMatch)
  })
}

mongoose.model('User', UserSchema);

