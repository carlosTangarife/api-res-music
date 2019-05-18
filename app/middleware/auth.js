'use strict'
const jwt = require('../services/jwt.service')

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'You do not have authorization' })
  }

  const POSITION_TOKEN = 1;
  const token = req.headers.authorization.split(' ')[POSITION_TOKEN]
  jwt.decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response => {
      res.status(response.status)
    })
}
module.exports = isAuth
