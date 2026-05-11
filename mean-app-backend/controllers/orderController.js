const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.createOrder = async (req, res, next) => {
  try {
    const { address, paymentMethod } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    // Compute total (assumes front-end passed correct total)
    const total = req.body.total;
    const order = new Order({
      user: req.user.id,
      items: cart.items,
      total,
      status: "Pending",
      address,
      paymentMethod,
    });
    await order.save();
    // Clear cart after ordering
    cart.items = [];
    await cart.save();
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort("-createdAt");
    res.json(orders);
  } catch (err) {
    next(err);
  }
};
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort("-createdAt").populate("user");
    res.json(orders);
  } catch (err) {
    next(err);
  }
};