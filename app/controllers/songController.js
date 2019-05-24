const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Song = mongoose.model('Song');
const Album = mongoose.model('Album');

const isAuth = require('../middleware/auth');
module.exports = (app) => app.use('/', router)


router.get('/songs', isAuth, (req, res) => {
  Song.find((err, songs) => {
    if (err) {
      return res.status(500).send({message: 'error to do request' + err});
    }

    if(!songs) return res.status(404).send({message: 'no found songs'});
    Album.populate(songs, {path: 'album'}, function (err) {
      if (err) {
        return res.status(500).send({message: 'error to do request' + err});
      }
      res.status(200).send({songs});
    })
  });
});

router.get('/song/:songId', isAuth, (req, res) => {
  let songId = req.params.songId;
  Song.findById(songId,(err, song) => {
    if (err) {
      return res.status(500).send({message: 'error to do request' + err});
    }

    if(!song) return res.status(404).send({message: 'no found song'});
    Album.populate(song, {path: 'album'}, function (err) {
      if (err) {
        return res.status(500).send({message: 'error to do request' + err});
      }
      res.status(200).send({song});
    })
  });
});

router.post('/song', isAuth, (req, res) => {
  let song = new Song();
  song.number = req.body.number;
  song.name = req.body.name;
  song.duration = req.body.duration;
  song.file = req.body.file;
  song.album = req.body.album;

  song.save((err, songSaved) => {
    if (err) {
        return res.status(500).json({
            ok: false,
            message: 'error to create a song',
            err
        });
    }
    res.status(201).json({
        ok: true,
        song: songSaved
      });
  });
});

router.put('/song/:songId', isAuth, (req, res) => {
  let songId = req.params.songId;

  Song.findByIdAndUpdate(songId, req.body, (err, articleUpdated) => {
    if (err) {
        return res.status(500).json({
            ok: false,
            message: 'error to update a song',
            err
        });
    }
    res.status(200).json({
        ok: true,
        song: articleUpdated
      });
  });
});

router.delete('/song/:songId', isAuth, (req, res) => {
  let songId = req.params.songId;

  Song.findByIdAndRemove(songId, req.body, (err) => {
    if (err) {
        return res.status(500).json({
            ok: false,
            message: 'error to delete a song',
            err
        });
    }
    res.status(200).json({
        ok: true,
        song: {}
      });
  });
});
