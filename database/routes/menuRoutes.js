const express = require("express");
const Menu = require("../Schema/Menu");
const router = express.Router();

const menuController = require("../apiControl/menuControl");

// get all menu items

router.get("/", menuController.getAllMenuItems);

// post a menu item
router.post("/", menuController.postMenuItem);

// delete a menu item
router.delete("/:id", menuController.deleteMenuItem);

// get single menu item
router.get("/:id", menuController.singleMenuItem);

// update single menu item
router.patch("/:id", menuController.updateMenuItem);

module.exports = router;
