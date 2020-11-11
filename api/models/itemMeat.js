const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  en: { type: String, required: true },
  th: { type: String, required: true },
  pron: { type: String, required: true },
});
