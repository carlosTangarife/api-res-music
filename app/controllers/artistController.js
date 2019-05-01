const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Artist = mongoose.model('Artist');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  Artist.find((err, artists) => {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      artists: artists
    });
  });
});

router.get('/artists', (req, res, next) => {
  Artist.find({}).populate("Genre").exec((err, artists) => {
    if (err) {
      return res.status(500).send({message: 'error to do request' + err});
    }

    if(!artists) return res.status(404).send({message: 'no found artists'});
    res.status(200).send({artists});
  });
});

router.get('/artist/:artistId', (req, res, next) => {
  let artistId = req.params.artistId;
  Artist.findById(artistId, (err, artist) => {
    if (err) {
      return res.status(500).send({message: 'error to do request' + err});
    }

    if(!artist) return res.status(404).send({message: 'no found artist'});

    res.status(200).send({artist});
  });
});

router.post('/artist', (req, res, next) => {
  let artist = new Artist();
  artist.name = req.body.name;
  artist.description = req.body.description;
  artist.image = req.body.image;
  artist.genre = req.body.genre;

  artist.save((err, artistSaved) => {
    if (err) {
        return res.status(500).json({
            ok: false,
            message: 'error to create a artist',
            err
        });
    }
    res.status(201).json({
        ok: true,
        artist: artistSaved
      });
  });
});

router.put('/artist/:artistId', (req, res, next) => {
  let artistId = req.params.artistId;

  Artist.findByIdAndUpdate(artistId, req.body, (err, articleUpdated) => {
    if (err) {
        return res.status(500).json({
            ok: false,
            message: 'error to update a artist',
            err
        });
    }
    res.status(200).json({
        ok: true,
        artist: articleUpdated
      });
  });
});

router.delete('/artist/:artistId', (req, res, next) => {
  let artistId = req.params.artistId;

  Artist.findByIdAndRemove(artistId, req.body, (err) => {
    if (err) {
        return res.status(500).json({
            ok: false,
            message: 'error to delete a artist',
            err
        });
    }
    res.status(200).json({
        ok: true,
        artist: {}
      });
  });
});
