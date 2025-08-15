const Cart = require("./../models/cartModel");

exports.getCartItems = async (req, res) => {
  try {
    const userId = res.locals.user._id;

    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      select: "name price images",
    });

    if (!cart) {
      return res.status(404).json({
        status: "failed",
        message: "No cart found for this user",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.addProductToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = res.locals.user._id;
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).json({
      status: "success",
      message: "Product added to cart successfully",
      cart,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.deleteProductFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = res.locals.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        status: "failed",
        message: "Cart not found",
      });
    }

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      status: "success",
      message: "Product removed from cart successfully",
      cart,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.increaseProductQuantity = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = res.locals.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        status: "failed",
        message: "Cart not found",
      });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += 1;
      await cart.save();
      res.status(200).json({
        status: "success",
        message: "Product quantity increased successfully",
        cart,
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "Product not found in cart",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.decreaseProductQuantity = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = res.locals.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        status: "failed",
        message: "Cart not found",
      });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex > -1) {
      if (cart.products[productIndex].quantity > 1) {
        cart.products[productIndex].quantity -= 1;
        await cart.save();
        res.status(200).json({
          status: "success",
          message: "Product quantity decreased successfully",
          cart,
        });
      } else {
        res.status(400).json({
          status: "failed",
          message: "Quantity cannot be less than 1",
        });
      }
    } else {
      res.status(404).json({
        status: "failed",
        message: "Product not found in cart",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};
