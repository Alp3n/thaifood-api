const mongoose = require('mongoose');

exports.itemName = new mongoose.Schema({
  en: { type: String, required: true },
  th: { type: String, required: true },
  pron: { type: String, required: true },
});

exports.itemMeat = mongoose.Schema({
  en: { type: String, required: true },
  th: { type: String, required: true },
  pron: { type: String, required: true },
});

exports.itemNoodle = mongoose.Schema({
  en: { type: String, required: true },
  th: { type: String, required: true },
  pron: { type: String, required: true },
});

exports.itemAllergen = mongoose.Schema({
  allergen: { type: String },
});

exports.itemIngredient = mongoose.Scheme({
  ingredient: { type: String },
});
