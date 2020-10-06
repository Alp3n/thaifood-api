const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../auth/check-auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './assets/photos/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//limits check in documentation
const upload = multer({ storage: storage });

const Item = require('../models/item');

router.get('/', (req, res) => {
  Item.find()
    .select('-__v')
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        items: docs.map((doc) => {
          return {
            _id: doc._id,
            names: doc.names,
            desc: doc.desc,
            type: doc.type,
            meats: doc.meats,
            allergens: doc.allergens,
            spicy: doc.spicy,
            egg: doc.egg,
            image: doc.image,
            ingredients: doc.ingredients,
            META: {
              type: 'GET',
              url: 'http://localhost:3000/items/' + doc._id,
            },
          };
        }),
      };
      // if (docs.length > 0) {
      res.status(200).json(response);
      // } else {
      //   res.status(204).json();
      // }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post('/', checkAuth, upload.single('itemImage'), (req, res) => {
  console.log(req.file);
  const item = new Item({
    _id: new mongoose.Types.ObjectId(),
    names: req.body.names,
    desc: req.body.desc,
    type: req.body.type,
    meats: req.body.meats,
    allergens: req.body.allergens,
    spicy: req.body.spicy,
    egg: req.body.egg,
    image: req.file.path,
    ingredients: req.body.ingredients,
  });
  item
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Item successfuly added',
        createdItem: {
          _id: result._id,
          names: result.names,
          desc: result.desc,
          type: result.type,
          meats: result.meats,
          allergens: result.allergens,
          spicy: result.spicy,
          egg: result.egg,
          image: result.image,
          ingredients: result.ingredients,
          META: {
            type: 'GET',
            url: 'http://localhost:3000/items/' + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get('/:itemId', (req, res) => {
  const id = req.params.itemId;
  Item.findById(id)
    .select('-__v')
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          item: doc,
          META: {
            type: 'GET',
            desc: 'GET_ALL_ITEMS',
            url: 'http://localhost:3000/items/',
          },
        });
      } else {
        res.status(404).json({ message: 'No valid data for entered ID' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch('/:itemId', checkAuth, (req, res) => {
  const id = req.params.itemId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Item.updateOne(
    { _id: id },
    {
      $set: updateOps,
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Item updated',
        META: {
          type: 'GET',
          desc: 'GET_UPDATED_ITEM',
          url: 'http://localhost:3000/items/' + result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete('/:itemId', checkAuth, (req, res) => {
  const id = req.params.itemId;
  Item.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(204).json({
        message: 'Item deleted',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
