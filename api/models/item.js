const mongoose = require('mongoose');
const { itemLanguageOpt } = require('./itemValidation');

// const itemSchema = mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   names: { type: [itemName], required: true },
//   desc: { type: String, required: true },
//   type: { type: String, required: true },
//   ingredients: { type: [itemIngredient], required: true },
//   allergens: { type: [itemAllergen], required: true },
//   meats: { type: [itemMeat] },
//   noodles: { type: [itemNoodle] },
//   spicy: { type: Boolean },
//   sweet: { type: Boolean },
//   egg: { type: Boolean },
//   image: { type: String },
// });

// Old Schema
const itemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  names: { type: itemLanguageOpt, required: true },
  desc: { type: String, required: true },
  type: { type: String, required: true },
  meats: [itemLanguageOpt],
  noodles: [itemLanguageOpt],
  allergens: { type: [String], required: true },
  spicy: { type: Boolean },
  sweet: { type: Boolean },
  egg: { type: Boolean },
  image: { type: String },
  ingredients: { type: [String] },
});

module.exports = mongoose.model('Item', itemSchema);
