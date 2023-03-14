const { model, Schema } = require('mongoose');
const flavorSchema = require('./flavors');

const foodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageUrls: [String],
  flavors: [flavorSchema],
  selectedFlavor: {
    type: String
  },
  qty: {
    type: Number,
    default: 1
  },
  note: {
    type: String,
    default: ''
  }
})

const Food = model('FoodType', foodSchema);

module.exports = { Food, foodSchema}; 