const express = require("express");
const router = express.Router();
const {
  addProductToCart,
  deleteProductFromCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  getCartItems,
} = require("./../controllers/cartController");

const { protect } = require("./../controllers/signUpController");

router.get("/", protect, getCartItems);
router.post("/add", protect, addProductToCart);
router.delete("/delete", protect, deleteProductFromCart);
router.patch("/increase", protect, increaseProductQuantity);
router.patch("/decrease", protect, decreaseProductQuantity);

module.exports = router;
