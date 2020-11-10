const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  names: { type: mongoose.Schema.Types.Mixed, required: true },
  desc: { type: String, required: true },
  type: { type: String, required: true },
  meats: mongoose.Schema.Types.Array,
  allergens: { type: mongoose.Schema.Types.Array, required: true },
  spicy: { type: Boolean },
  sweet: { type: Boolean },
  egg: { type: Boolean },
  image: { type: String },
  ingredients: mongoose.Schema.Types.Array,
});

module.exports = mongoose.model('Item', itemSchema);
