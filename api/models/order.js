const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  favorite: { type: Boolean },
  created: { type: Date },
  items: mongoose.Schema.Types.Array,
});

module.exports = mongoose.model('Order', orderSchema);
