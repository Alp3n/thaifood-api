const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(422).json({
          message: 'Duplicated email',
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              isAdmin: req.body.isAdmin,
              jwt: req.body.jwt,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: 'User created',
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                  message: err.message,
                });
              });
          }
        });
      }
    })
    .catch();
};

exports.user_signin = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 0) {
        return res.status(401).json({
          message: 'Authorization failed',
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Authorization failed',
          });
        }
        if (result) {
          const jwtToken = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h',
            }
          );
          return res.status(200).json({
            message: 'Authorization succeded',
            token: jwtToken,
          });
        }
        res.status(401).json({
          message: 'Authorization failed',
        });
      });
    })
    .catch((err) => {
      res.status(401).json({
        error: err,
      });
    });
};

exports.user_delete = (req, res) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'User deleted',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};
