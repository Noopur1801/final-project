const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  getAllShoes,
  getShoes,
  addShoes,
  deleteShoes,
  updateShoes,
  getMen,
  getAllCategory,
  getWomen,
  getKid,
  getSearchedCategory,
} = require("./../controllers/collectionController");

const { protect, adminProtect } = require("./../controllers/signUpController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/images/");
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

router
  .route("/")
  .get(getAllShoes)
  .post(protect, adminProtect, upload.single("newProductImage"), addShoes);

// router.route("/men").get(protect, getMen, getAllCategory);
router.route("/men").get(getMen, getAllCategory);
router.route("/women").get(getWomen, getAllCategory);
router.route("/kids").get(getKid, getAllCategory);
router.route("/search/:searchQuery").get(getSearchedCategory);

router
  .route("/:shoeId")
  .get(getShoes)
  .delete(protect, adminProtect, deleteShoes)
  .patch(protect, adminProtect, upload.single("productImage"), updateShoes);

module.exports = router;
