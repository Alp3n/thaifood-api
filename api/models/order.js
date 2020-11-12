const mongoose = require('mongoose');
// const Item = require('./item');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  favorite: { type: Boolean },
  created: { type: Date },
  // items: [Item],
});

module.exports = mongoose.model('Order', orderSchema);
