const express = require("express");
const Carts = require("../Schema/Cart");
const router = express.Router();

const cartController = require("../apiControl/cartControl");

router.get("/", cartController.getCartByEmail);
router.post("/", cartController.addToCart);
router.delete("/:id", cartController.deleteCart);
router.put("/:id", cartController.updateCart);
router.get("/:id", cartController.getSingleCart);

module.exports = router;
