const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Album = mongoose.model('Album');

const isAuth = require('../middleware/auth');
module.exports = (app) => app.use('/', router)

router.get('/albums', isAuth, (req, res) => {
  Album.find({}).populate("Artist").populate("Category").exec((err, albums) => {
    if (err) {
      return res.status(500).send({message: 'error to do request' + err});
    }

    if(!albums) return res.status(404).send({message: 'no found albums'});
    res.status(200).send({albums});
  });
});

router.get('/album/:albumId', isAuth, (req, res) => {
  let albumId = req.params.albumId;
  Album.findById(albumId).populate("Artist").populate("Category").exec((err, albums) => {
    if (err) {
      return res.status(500).send({message: 'error to do request' + err});
    }

    if(!albums) return res.status(404).send({message: 'no found albums'});
    res.status(200).send({albums});
  });
});

router.post('/album', isAuth, (req, res) => {
  let album = new Album();
  album.title = req.body.title;
  album.description = req.body.description;
  album.year = req.body.year;
  album.image = req.body.image;
  album.artist = req.body.artist;
  album.category = req.body.category;

  album.save((err, albumSaved) => {
    if (err) {
        return res.status(500).json({
            ok: false,
            message: 'error to create a album',
            err
        });
    }
    res.status(201).json({
        ok: true,
        album: albumSaved
      });
  });
});

router.put('/album/:albumId', isAuth, (req, res) => {
  let albumId = req.params.albumId;

  Album.findByIdAndUpdate(albumId, req.body, (err, articleUpdated) => {
    if (err) {
        return res.status(500).json({
            ok: false,
            message: 'error to update a album',
            err
        });
    }
    res.status(200).json({
        ok: true,
        album: articleUpdated
      });
  });
});

router.delete('/album/:albumId', isAuth, (req, res) => {
  let albumId = req.params.albumId;

  Album.findByIdAndRemove(albumId, req.body, (err) => {
    if (err) {
        return res.status(500).json({
            ok: false,
            message: 'error to delete a album',
            err
        });
    }
    res.status(200).json({
        ok: true,
        album: {}
      });
  });
});
