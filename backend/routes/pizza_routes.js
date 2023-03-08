const express = require("express");
const { createPizza, getPizzaById, getPizzas } = require("../controllers/pizza_controller");
const app = express();

const router = express.Router();

router.route("/").post(createPizza).get(getPizzas);
router.route("/:id").get(getPizzaById);

module.exports = router;
