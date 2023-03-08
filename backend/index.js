require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { CONFIG } = require("./utils/constants");
const { notFound, errorHandler } = require("./middleware/error");
const pizzaRoutes = require("./routes/pizza_routes");
const basicToppingRoutes = require("./routes/basic_topping_routes");
const deluxeToppingRoutes = require("./routes/deluxe_topping");
const orderRoutes = require("./routes/order_routes");
const { connectDb } = require("./database/db");

connectDb();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/basic_toppings", basicToppingRoutes);
app.use("/api/deluxe_toppings", deluxeToppingRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = CONFIG.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
