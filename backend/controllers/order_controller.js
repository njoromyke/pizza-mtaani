const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");

// @desc    Create an order
// @route   POST /api/orders
// @access  Public

const createOrder = asyncHandler(async (req, res) => {
  const { pizza, deluxe_topping, basic_topping, quantity, total, sub: sub_total } = req.body;

  const tax = parseFloat(sub_total) * parseFloat(0.16);

  const order = await Order.create({
    pizza,
    deluxe_topping,
    basic_topping,
    quantity,
    total,
    sub_total,
    tax,
  });

  if (order) {
    res.status(201).json({
      order,
      message: "Order created successfully",
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("Invalid order data");
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