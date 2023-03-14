const Order = require('../models/order');
const Inventory = require('../models/inventory');

async function getOrders(req, res) {
  try {
    // console.log(req.user);
    if (req.user && req.user.usertype === 'admin') {
      const orders = await Order.find({});

      const clientOrders = orders.filter(
        (order) => order.orderfor === 'CLIENT'
      );
      const selfOrders = orders.filter((order) => order.orderfor === 'SELF');

      res.status(200);
      res.send([...clientOrders, ...selfOrders]);
    } else {
      res.status(403).send('You are not authorized.');
    }
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

async function postOrder(req, res) {
  try {
    console.log("fulln biody", req.body)
    const foodName = req.body.foods[0].name;
    const flavour = req.body.foods[0].selectedFlavor;
    const quantity = req.body.foods[0].qty;
    console.log(foodName, flavour, quantity);
    
    const orderedFood = await Inventory.find({ name: foodName , selectedFlavor :  flavour });


    const latestRemaining = orderedFood.remaining - quantity;
    const filter= {name: foodName , selectedFlavor :  flavour};
    const update = {$set: {remaining : latestRemaining}};

    const newInventoryData = await Inventory.findOneAndUpdate(filter, update, {
      new:true
    })

    const order = await Order.create(req.body);

    res.status(201);
    res.send(order, newInventoryData);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

async function updateOrderStatus(req, res) {
  try {
    if (req.user && req.user.usertype === 'admin') { 
      const { id, status } = req.params;
      const qty = req.body.qty;
      const remainingQty = req.body.remaining - qty;
      const result = await Order.findByIdAndUpdate(id, {
        $set: { status: status, remaining: remainingQty },
      });
      res.status(200);
      res.send(result);
    } else {
      res.status(403).send('You are not authorized.');
    }
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

async function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    const result = await Order.findByIdAndDelete(id);
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

module.exports = { getOrders, postOrder, updateOrderStatus, deleteOrder };
