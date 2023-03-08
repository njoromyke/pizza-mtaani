const DeluxeTopping = require("../models/DeluxeTopping");
const asyncHandler = require("express-async-handler");

// @desc    Create a deluxe topping
// @route   POST /api/deluxe_toppings
// @access  Public

const createDeluxeTopping = asyncHandler(async (req, res) => {
  const { name, price, size } = req.body;

  const deluxeTopping = await DeluxeTopping.create({
    name,
    price,
    size,
  });

  if (deluxeTopping) {
    res.status(201).json({
      deluxeTopping,
      message: "Deluxe topping created successfully",
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("Invalid deluxe topping data");
  }
});

// @desc    Get deluxe topping size
// @route   GET /api/deluxe_toppings/size
// @access  Public

const getDeluxeToppingSize = asyncHandler(async (req, res) => {
  const size = req.params.size;

  const deluxeTopping = await DeluxeTopping.find({}).where("size").equals(size);
  if (deluxeTopping) {
    res.json(deluxeTopping);
  } else {
    res.status(404);
    throw new Error("Deluxe topping not found");
  }
});

module.exports = { createDeluxeTopping, getDeluxeToppingSize };
