const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");

// @desc    Create an order
// @route   POST /api/orders
// @access  Public

const createOrder = asyncHandler(async (req, res) => {
  const { order_items } = req.body;
  const tax = 0.16 * order_items.reduce((acc, item) => acc + item.price, 0);
  const subtotal = order_items.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal + tax;

  try {
    const order = await Order.create({
      order_items,
      tax,
      subtotal,
      total,
    });

    if (order) {
      res.status(201).json({
        order,
        message: "Order created successfully",
        success: true,
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Public

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("pizza").populate("deluxe_topping").populate("basic_topping");
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

module.exports = { createOrder, getOrderById };
