const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Song = mongoose.model('Song');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  Song.find((err, songs) => {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      songs: songs
    });
  });
});

router.get('/songs', (req, res, next) => {
  Song.find({}).populate("Artist").populate("Album").exec((err, songs) => {
    if (err) {
      return res.status(500).send({message: 'error to do request' + err});
    }

    if(!songs) return res.status(404).send({message: 'no found songs'});
    res.status(200).send({songs});
  });
});

router.get('/song/:songId', (req, res, next) => {
  let songId = req.params.songId;
  Song.findById(songId).populate("Artist").populate("Album").exec((err, songs) => {
    if (err) {
      return res.status(500).send({message: 'error to do request' + err});
    }

    if(!songs) return res.status(404).send({message: 'no found songs'});
    res.status(200).send({songs});
  });
});

router.post('/song', (req, res, next) => {
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

router.put('/song/:songId', (req, res, next) => {
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

router.delete('/song/:songId', (req, res, next) => {
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
