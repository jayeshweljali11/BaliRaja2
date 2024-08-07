// models/media.js
const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  filename: String,
  path: String,
  type: String, // 'image' or 'video'
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;