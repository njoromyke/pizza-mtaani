const Pizza = require("../models/Pizza");
const asyncHandler = require("express-async-handler");

// @desc    Get all pizzas
// @route   GET /api/pizzas
// @access  Public

const getPizzas = asyncHandler(async (req, res) => {
  const pizzas = await Pizza.find({});
  res.json(pizzas);
});

// @desc    Get a single pizza
// @route   GET /api/pizzas/:id
// @access  Public

const getPizzaById = asyncHandler(async (req, res) => {
  const pizza = await Pizza.findById(req.params.id);
  if (pizza) {
    res.json(pizza);
  } else {
    res.status(404);
    throw new Error("Pizza not found");
  }
});

// @desc    Create a pizza
// @route   POST /api/pizzas
// @access  Public

const createPizza = asyncHandler(async (req, res) => {
  const { name, price, size, basic_topping, deluxe_topping } = req.body;

  const pizza = Pizza.create({
    name,
    price,
    size,
    basic_topping,
    deluxe_topping,
  });

  if (pizza) {
    res.status(201).json({
      pizza,
      message: "Pizza created successfully",
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("Invalid pizza data");
  }
});

module.exports = { getPizzas, getPizzaById, createPizza };
