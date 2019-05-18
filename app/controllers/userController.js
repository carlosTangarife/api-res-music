const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('../services/jwt.service');

const isAuth = require('../middleware/auth');
module.exports = (app) => app.use('/', router)

router.post('/user', (req, res) => {
  let user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  });

  user.save((err) => {
    if (err) {
        return res.status(500).json({
            ok: false,
            message: 'error to create a user',
            err
        });
    }
    res.status(201).json({
        ok: true,
        token: jwt.createToken(user)
      });
  });
});

router.get('/users', isAuth, (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      return res.status(500).send({message: 'error to do request' + err});
    }

    if(!users) return res.status(404).send({message: 'no found users'});

    res.status(200).send({users});
  });
});
