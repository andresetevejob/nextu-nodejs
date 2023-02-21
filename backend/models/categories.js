const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('categories', categoriesSchema);