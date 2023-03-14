const { model, Schema } = require('mongoose');

const inventorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  selectedFlavor: {
    type: String
  },
  remaining: {
    type: Number,
    default: 10
  }
})

const Inventory = model('Inventory', inventorySchema);

module.exports = Inventory;