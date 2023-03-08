const express = require("express");
const { createDeluxeTopping, getDeluxeToppingSize } = require("../controllers/deluxe_topping_controller");
const app = express();

const router = express.Router();

router.route("/").post(createDeluxeTopping);
router.route("/:size").get(getDeluxeToppingSize);

module.exports = router;
