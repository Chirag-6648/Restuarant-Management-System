const express = require("express");
const router = express.Router();

const userController = require("../apiControl/userControl");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.delete("/:id", verifyToken, verifyAdmin, userController.deleteUser);
router.get("/admin/:email", verifyToken, verifyAdmin, userController.getAdmin);
router.patch("/admin/:id", verifyToken, verifyAdmin, userController.makeAdmin);

module.exports = router;
