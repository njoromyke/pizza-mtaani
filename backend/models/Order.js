const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  order_items: [
    {
      pizza: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pizza",
        required: true,
      },

      basic_topping: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BasicTopping",
        required: false,
      },

      deluxe_topping: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeluxeTopping",
        required: false,
      },

      quantity: {
        type: Number,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },
    },
  ],
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
