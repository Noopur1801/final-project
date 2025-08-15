const express = require("express");
const router = express.Router();
const {
  paymentCall,
  paymentStatus,
  paymentCallback,
  paymentCallbackServer,
} = require("./../controllers/paymentController");

const { protect } = require("./../controllers/signUpController");

router.get("/pay", protect, paymentCall);

router.get("/status", protect, paymentStatus);

router.post("/redirect", paymentCallback, paymentStatus);
router.post("/callback", paymentCallbackServer, paymentStatus);

module.exports = router;
