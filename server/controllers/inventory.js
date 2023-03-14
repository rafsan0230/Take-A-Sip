const { Food } = require('../models/food');
const Inventory = require('../models/inventory');

const addFood = async (req, res, next) => {
  try {
    const addedFood = await Food.create(req.body);
    res.status(200).send(addedFood);
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

const getFood = async (req, res, next) => {
  try {
    const foods = await Food.find({});
    res.status(200).send(foods);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
const getInventory = async (req, res, next) => {
  try {
    const foods = await Inventory.find({});
    res.status(200).send(foods);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const getFoodById = async (req, res) => {
  const id = req.params.id;
  try {
    const patient = await Food.findById(id);
    res.status(201);
    res.send(patient);
  }
  catch (error) {
      res.send(error);
  }
}

const updateFood = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedFood = await Food.findByIdAndUpdate(id, req.body);
    res.status(200).send(updatedFood);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const updateQuantity = async (req, res,) => {
  const id = req.body.id;
  const quantity = req.body.qty;
  console.log(id,quantity)
  try {
    const requestedItem = await Inventory.findOne({ _id: id });
    
    console.log("newrembefore", requestedItem.remaining)
    
    const latestRemaining = parseInt(requestedItem.remaining) + parseInt(quantity);
    console.log("newrem", latestRemaining)
    const filter= { _id: id };
    const update = {$set: {remaining : latestRemaining}};

    const updatedInventory = await Inventory.findOneAndUpdate(filter, update, {
      new:true
    })
    console.log(updatedInventory)

    res.status(201);
    res.send(updatedInventory);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

module.exports = { addFood, getFood, updateFood, getFoodById, getInventory, updateQuantity };
