const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");

// @desc    Create an order
// @route   POST /api/orders
// @access  Public

const createOrder = asyncHandler(async (req, res) => {
  const { order_items, sub_total, total } = req.body;

  const tax = parseFloat((sub_total * 0.13).toFixed(2));

  try {
    const order = await Order.create({
      order_items,
      tax,
      sub_total,
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
  const order = await Order.findById(req.params.id)
    .populate("order_items.pizza")
    .populate("order_items.deluxe_topping")
    .populate("order_items.basic_topping");

  if (order) {
    res.json({
      order,
      success: true,
      message: "Order found",
    });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

module.exports = { createOrder, getOrderById };
