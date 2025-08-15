const Shoes = require("./../models/collectionModel");

exports.getMen = async (req, res, next) => {
  req.query.category = "men";
  next();
};
exports.getWomen = async (req, res, next) => {
  req.query.category = "women";
  next();
};
exports.getKid = async (req, res, next) => {
  req.query.category = "kids";
  next();
};

exports.getAllCategory = async (req, res) => {
  try {
    const requestCategory = req.query.category;

    const allShoes = await Shoes.find({ category: requestCategory });

    // console.log(allShoes);
    res.status(200).json({
      status: "success",
      totalCount: allShoes.length,
      requestedCategory: requestCategory,
      allShoes,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};
exports.getSearchedCategory = async (req, res) => {
  try {
    const searchQuery = req.params.searchQuery.toString();

    const allShoes = await Shoes.find({ name: new RegExp(searchQuery, "i") });

    res.status(200).json({
      status: "success",
      totalCount: allShoes.length,
      allShoes,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};

exports.getAllShoes = async (req, res) => {
  try {
    const allShoes = await Shoes.find();

    res.status(200).json({
      status: "success",
      totalCount: allShoes.length,
      allShoes,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};

exports.getShoes = async (req, res) => {
  try {
    const shoeId = req.params.shoeId;

    const shoes = await Shoes.findById(shoeId);

    if (!shoes) {
      return res.status(404).json({
        status: "failed",
        message: `No record found with the ID : ${shoeId}`,
      });
    }

    res.status(200).json({
      status: "success",
      totalCount: shoes.length,
      shoes,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};

exports.deleteShoes = async (req, res) => {
  try {
    const shoeId = req.params.shoeId;

    const shoes = await Shoes.findByIdAndDelete(shoeId);

    if (!shoes) {
      return res.status(404).json({
        status: "failed",
        message: `No record found with the ID : ${shoeId}`,
      });
    }

    res.status(200).json({
      status: "success",
      message: `Record deleted with the ID : ${shoeId}`,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};

exports.updateShoes = async (req, res) => {
  try {
    const shoeId = req.params.shoeId;

    const {
      productName,
      description,
      productPrice,
      productCategory,
      productRating,
      productStock,
    } = req.body;

    let newFileName = undefined;

    const productData = {
      name: productName,
      description: description,
      price: parseFloat(productPrice),
      ratings: parseFloat(productRating),
      category: productCategory,
      Stock: parseInt(productStock, 10),
      createdAt: new Date(),
    };

    if (req.file) {
      productData.images = req.file.filename;
    }

    const newShoes = await Shoes.findByIdAndUpdate(shoeId, productData, {
      new: true,
      runValidators: true,
    });

    if (!newShoes) {
      return res.status(404).json({
        status: "failed",
        message: `No record found with the ID : ${shoeId}`,
      });
    }

    res.status(200).json({
      status: "success",
      // newShoes,
      message: `${productData.name} successfully updated!`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};

exports.addShoes = async (req, res) => {
  try {
    const {
      newProductName,
      newProductDescription,
      newProductPrice,
      newProductCategory,
      newProductRating,
      newProductStock,
    } = req.body;

    const newFileName = req.file.filename;

    const productData = {
      name: newProductName,
      description: newProductDescription,
      price: parseFloat(newProductPrice),
      ratings: parseFloat(newProductRating),
      images: newFileName,
      category: newProductCategory,
      Stock: parseInt(newProductStock, 10),
      createdAt: new Date(),
    };

    await Shoes.create(productData);

    res.status(200).json({
      status: "success",
      message: `${productData.name} added to the ${productData.category} category.`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};
