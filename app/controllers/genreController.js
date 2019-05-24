const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Genre = mongoose.model('Genre');

const isAuth = require('../middleware/auth');
module.exports = (app) => app.use('/', router)


router.get('/genres', isAuth, (req, res) => {
  Genre.find((err, genres) => {
    if (err) {
      return res.status(500).send({message: 'error to do request' + err});
    }

    if(!genres) return res.status(404).send({message: 'no found genres'});

    res.status(200).send({genres});
  });
});

router.get('/genre/:genreId', isAuth, (req, res) => {
  let genreId = req.params.genreId;
  Genre.findById(genreId, (err, genre) => {
    if (err) {
      return res.status(500).send({message: 'error to do request' + err});
    }

    if(!genre) return res.status(404).send({message: 'no found genre'});

    res.status(200).send({genre});
  });
});

router.post('/genre', isAuth, (req, res) => {
  let genre = new Genre();
  genre.name = req.body.name;

  genre.save((err, genreSaved) => {
    if (err) {
        return res.status(500).json({
            ok: false,
            message: 'error to create a genre',
            err
        });
    }
    res.status(201).json({
        ok: true,
        genre: genreSaved
      });
  });
});

router.put('/genre/:genreId', isAuth, (req, res) => {
  let genreId = req.params.genreId;

  Genre.findByIdAndUpdate(genreId, req.body, (err, articleUpdated) => {
    if (err) {
        return res.status(500).json({
            ok: false,
            message: 'error to update a genre',
            err
        });
    }
    res.status(200).json({
        ok: true,
        genre: articleUpdated
      });
  });
});

router.delete('/genre/:genreId', isAuth, (req, res) => {
  let genreId = req.params.genreId;

  Genre.findByIdAndRemove(genreId, req.body, (err) => {
    if (err) {
        return res.status(500).json({
            ok: false,
            message: 'error to delete a genre',
            err
        });
    }
    res.status(200).json({
        ok: true,
        genre: {}
      });
  });
});
