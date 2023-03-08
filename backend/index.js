const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { CONFIG } = require("./utils/constants");
const { notFound, errorHandler } = require("./middleware/error");

dotenv.config();

const pizzaRoutes = require("./routes/pizza_routes");
const basicToppingRoutes = require("./routes/basic_topping_routes");
const deluxeToppingRoutes = require("./routes/deluxe_topping");
const orderRoutes = require("./routes/order_routes");

app.use(express.json());
app.use(cors());
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/basic_toppings", basicToppingRoutes);
app.use("/api/deluxe_toppings", deluxeToppingRoutes);
app.use("/api/orders", orderRoutes);

const PORT = CONFIG.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
