const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  size: {
    type: String,
    required: true,
  },

  basic_topping: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BasicTopping",
    required: true,
  },

  deluxe_topping: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeluxeTopping",
    required: true,
  },
});

const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
