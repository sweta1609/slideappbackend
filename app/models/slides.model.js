// models/Slide.js
const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  jsonData: {
    type: Object,
    default: {} 
  },
  presentation_id:{
    type: String,
  },
});

const Slide = mongoose.model('Slide', slideSchema);

module.exports = Slide;
