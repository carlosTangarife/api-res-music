const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Genre = mongoose.model('Genre');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  Genre.find((err, genres) => {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      genres: genres
    });
  });
});

router.get('/genres', (req, res, next) => {
  Genre.find((err, genres) => {
    if (err) {
      return res.status(500).send({message: 'error to do request' + err});
    }

    if(!genres) return res.status(404).send({message: 'no found genres'});

    res.status(200).send({genres});
  });
});

router.get('/genre/:genreId', (req, res, next) => {
  let genreId = req.params.genreId;
  Genre.findById(genreId, (err, genre) => {
    if (err) {
      return res.status(500).send({message: 'error to do request' + err});
    }

    if(!genre) return res.status(404).send({message: 'no found genre'});

    res.status(200).send({genre});
  });
});

router.post('/genre', (req, res, next) => {
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

router.put('/genre/:genreId', (req, res, next) => {
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

router.delete('/genre/:genreId', (req, res, next) => {
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
