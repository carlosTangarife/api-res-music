const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = mongoose.model('Category');

const isAuth = require('../middleware/auth');
module.exports = (app) => app.use('/', router)


router.get('/categories', isAuth, (req, res) => {
  Category.find((err, categories) => {
    if (err) {
      return res.status(500).send({message: 'error to do request' + err});
    }

    if(!categories) return res.status(404).send({message: 'no found categories'});

    res.status(200).send({categories});
  });
});

router.get('/category/:categoryId', isAuth, (req, res) => {
  let categoryId = req.params.categoryId;
  Category.findById(categoryId, (err, category) => {
    if (err) {
      return res.status(500).send({message: 'error to do request' + err});
    }

    if(!category) return res.status(404).send({message: 'no found category'});

    res.status(200).send({category});
  });
});

router.post('/category', isAuth, (req, res) => {
  let category = new Category();
  category.name = req.body.name;

  category.save((err, categorySaved) => {
    if (err) {
        return res.status(500).json({
            ok: false,
            message: 'error to create a category',
            err
        });
    }
    res.status(201).json({
        ok: true,
        category: categorySaved
      });
  });
});

router.put('/category/:categoryId', isAuth, (req, res) => {
  let categoryId = req.params.categoryId;

  Category.findByIdAndUpdate(categoryId, req.body, (err, articleUpdated) => {
    if (err) {
        return res.status(500).json({
            ok: false,
            message: 'error to update a category',
            err
        });
    }
    res.status(200).json({
        ok: true,
        category: articleUpdated
      });
  });
});

router.delete('/category/:categoryId', isAuth, (req, res) => {
  let categoryId = req.params.categoryId;

  Category.findByIdAndRemove(categoryId, req.body, (err) => {
    if (err) {
        return res.status(500).json({
            ok: false,
            message: 'error to delete a category',
            err
        });
    }
    res.status(200).json({
        ok: true,
        category: {}
      });
  });
});
