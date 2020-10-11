const express = require('express');
const router = express.Router();
const multer = require('multer');
const ItemsController = require('../controllers/items.controller');
const checkAuth = require('../middleware/check-auth');

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

router.get('/', ItemsController.items_get_all);

router.post(
  '/',
  checkAuth,
  upload.single('productImage'),
  ItemsController.items_create_item
);

router.get('/:itemId', ItemsController.items_get_item);

router.patch('/:itemId', ItemsController.items_update_item);

router.delete('/:itemId', ItemsController.items_delete_item);

module.exports = router;
