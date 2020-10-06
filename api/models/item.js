const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  names: mongoose.Schema.Types.Mixed,
  desc: { type: String, required: true },
  type: { type: String, required: true },
  meats: mongoose.Schema.Types.Array,
  allergens: mongoose.Schema.Types.Array,
  spicy: { type: Boolean, required: true },
  egg: { type: Boolean, required: true },
  image: { type: String },
  ingredients: mongoose.Schema.Types.Array,
});

module.exports = mongoose.model('Item', dishSchema);
