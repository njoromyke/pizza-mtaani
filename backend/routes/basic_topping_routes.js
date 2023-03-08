const express = require("express");
const { createBasicTopping, getBasicToppingSize } = require("../controllers/basic_topping_controller");
const app = express();

const router = express.Router();

router.route("/").post(createBasicTopping);
router.route("/:size").get(getBasicToppingSize);

module.exports = router;
