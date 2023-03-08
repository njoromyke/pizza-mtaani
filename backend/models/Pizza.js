const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },

  size: {
    type: String,
    required: true,
  },
});

const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
