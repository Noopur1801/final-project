const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} = require("./../controllers/orderController");

const { protect, adminProtect } = require("./../controllers/signUpController");

router.get("/getAllOrders", protect, adminProtect, getAllOrders);
router.post("/create", protect, createOrder);
router.get("/", protect, getUserOrders);
router.get("/:orderId", protect, getOrderById);
router.patch(
  "/changeStatus/:orderId",
  protect,
  adminProtect,
  updateOrderStatus
);

module.exports = router;
