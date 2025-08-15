const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getAdminDashboard,
} = require("./../controllers/adminController");

const { protect, adminProtect } = require("./../controllers/signUpController");

router.route("/getAllUsers").get(protect, adminProtect, getAllUsers);
router.route("/dashboard/:adminJWT").get(getAdminDashboard);

module.exports = router;
