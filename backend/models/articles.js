const mongoose = require('mongoose');

const articlesSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('articles', articlesSchema);