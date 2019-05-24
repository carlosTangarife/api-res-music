const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Artist = mongoose.model('Artist');
const Genre = mongoose.model('Genre');

const isAuth = require('../middleware/auth');
module.exports = (app) => app.use('/', router)

router.get('/artists', isAuth, (req, res) => {
  Artist.find((err, artists) => {
    if (err) {
      return res.status(500).send({message: 'error to do request' + err});
    }
    if(!artists) return res.status(404).send({message: 'no found artists'});
    Genre.populate(artists, {path: 'genre'}, function (err, genres) {
      if (err) {
        return res.status(500).send({message: 'error to do request' + err});
      }
      res.status(200).send({artists});
    })

  });
});

router.get('/artist/:artistId', isAuth, (req, res) => {
  let artistId = req.params.artistId;
  Artist.findById(artistId, (err, artist) => {
    if (err) {
      return res.status(500).send({message: 'error to do request' + err});
    }

    if(!artist) return res.status(404).send({message: 'no found artist'});
    Genre.populate(artist, {path: 'genre'}, function (err) {
      if (err) {
        return res.status(500).send({message: 'error to do request' + err});
      }
      res.status(200).send({artist});
    })
  });
});

router.post('/artist', isAuth, (req, res) => {
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

router.put('/artist/:artistId', isAuth, (req, res) => {
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

router.delete('/artist/:artistId', isAuth, (req, res) => {
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
