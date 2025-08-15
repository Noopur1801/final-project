const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  registerUser,
  loginUser,
  isLoggedIn,
  getLoggedInUser,
  getAllUsers,
} = require("./../controllers/signUpController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/profile_pictures/");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const newFileName = `${
      file.originalname.split(".")[0]
    }_${timestamp}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

router.route("/register").post(upload.single("profilePicture"), registerUser);
router.route("/login").post(loginUser);
router.route("/isUserLoggedIn").post(isLoggedIn, getLoggedInUser);

module.exports = router;
