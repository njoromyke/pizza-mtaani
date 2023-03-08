const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  pizza: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
    },
  ],

  basic_topping: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BasicTopping",
      required: true,
    },
  ],

  deluxe_topping: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeluxeTopping",
      required: true,
    },
  ],

  quantity: {
    type: Number,
    required: true,
  },

  tax: {
    type: Number,
    required: true,
  },

  subtotal: {
    type: Number,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
