const { model, Schema } = require('mongoose');

const inventorySchema = new Schema({
  foodName: {
    type: String,
    required: true
  },
//   foodFlavor: {
//     type: String
//   },
  quantity: {
    type: Number,
    default: 10
  }
})

const Inventory = model('Inventory', inventorySchema);

module.exports = { Inventory };