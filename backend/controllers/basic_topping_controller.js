const BasicTopping = require("../models/DeluxeTopping");
const asyncHandler = require("express-async-handler");

// @desc    Create a basic topping
// @route   POST /api/basic_toppings
// @access  Public

const createBasicTopping = asyncHandler(async (req, res) => {
  const { name, price, size } = req.body;

  const basicTopping = await BasicTopping.create({
    name,
    price,
    size,
  });

  if (basicTopping) {
    res.status(201).json({
      deluxeTopping: basicTopping,
      message: "Basic topping created successfully",
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("Invalid basic topping data");
  }
});

// @desc    Get basic topping size
// @route   GET /api/basic_toppings/size
// @access  Public

const getBasicToppingSize = asyncHandler(async (req, res) => {
  const size = req.params.size;

  const deluxeTopping = await BasicTopping.find({}).where("size").equals(size);
  if (deluxeTopping) {
    res.json(deluxeTopping);
  } else {
    res.status(404);
    throw new Error("Basic topping not found");
  }
});

module.exports = { createBasicTopping, getBasicToppingSize };
