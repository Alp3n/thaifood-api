const mongoose = require('mongoose');

const Order = require('../models/order');
const User = require('../models/user');

exports.orders_get_all = (req, res) => {
  Order.find()
    .populate('user', 'email')
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_create_order = (req, res) => {
  User.findById(req.body.user)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        user: req.body.user,
        favourite: req.body.favourite,
        created: new Date(),
        items: req.body.items,
      });
      return order.save();
    })
    .then((result) => {
      if (res.statusCode === 404) {
        return res;
      }
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_get_order = (req, res) => {
  Order.findById(req.params.orderId)
    .exec()
    .then((order) => {
      res.status(200).json({
        order: order,
        request: {
          type: 'GET',
          url: 'http//localhost:9000/orders',
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_delete_order = (req, res) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: 'Order not found',
        });
      }
      res.status(200).json({
        message: 'Order deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:9000/orders',
        },
      });
    })
    .catch();
};
