const crypto = require("crypto");
const axios = require("axios");
const Cart = require("./../models/cartModel");
const Order = require("./../models/orderModel");

const PROD_URL = "https://api.phonepe.com/apis/hermes/pg/v1/";
const UAT_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/";

const generateHash = (base64Payload, endpoint, saltKey, saltIndex) => {
  const hashString = base64Payload + endpoint + saltKey;
  const hashedValue = crypto
    .createHash("sha256")
    .update(hashString)
    .digest("hex");
  return `${hashedValue}###${saltIndex}`;
};

const sendRequest = async (url, method, data, headers) => {
  try {
    const response = await axios({
      url,
      method,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Payment Call Function
exports.paymentCall = async (req, res) => {
  try {
    const { user } = req;
    const mode = process.env.PHONEPE_MODE || "UAT";
    const merchantId = process.env.MERCHANT_ID;
    const saltKey = process.env.SALT_KEY;
    const saltIndex = parseInt(process.env.SALT_INDEX);

    // Retrieve user's cart details
    const cart = await Cart.findOne({ user: user._id }).populate(
      "products.product"
    );

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "Your cart is empty.",
      });
    }

    // Calculate total amount
    const amount =
      cart.products.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ) * 100; // Convert to paise

    const REDIRECT_URL = process.env.REDIRECT_URL;
    const CALLBACK_URL = process.env.CALLBACK_URL;

    const payload = {
      merchantId,
      merchantTransactionId: `TXN-${Date.now()}`,
      merchantUserId: user._id.toString(),
      amount,
      param1: "he000000",
      //   redirectUrl: process.env.REDIRECT_URL,
      redirectUrl: `${REDIRECT_URL}?userId=${encodeURIComponent(req.user._id)}`,
      redirectMode: "POST",
      callbackUrl: `${CALLBACK_URL}?userId=${encodeURIComponent(req.user._id)}`,
      mobileNumber: user.phoneNumber,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payloadStr = JSON.stringify(payload);
    const base64Payload = Buffer.from(payloadStr).toString("base64");
    const endpoint = "/pg/v1/pay";
    const result = generateHash(base64Payload, endpoint, saltKey, saltIndex);

    const url = mode === "UAT" ? `${UAT_URL}pay` : `${PROD_URL}pay`;

    const response = await sendRequest(
      url,
      "POST",
      { request: base64Payload },
      {
        "Content-Type": "application/json",
        accept: "application/json",
        "X-VERIFY": result,
      }
    );
    if (response.success === true) {
      res.status(200).json({
        responseCode: 200,
        url: response.data.instrumentResponse.redirectInfo.url,
        msg: response.message,
        status: response.code,
        res: response,
      });
    } else {
      res.status(400).json({
        responseCode: 400,
        error: response.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.paymentStatus = async (req, res) => {
  try {
    const { merchantTransactionId } = req.payData;
    const mode = process.env.PHONEPE_MODE || "UAT";
    const merchantId = process.env.MERCHANT_ID;
    const saltKey = process.env.SALT_KEY;
    const saltIndex = parseInt(process.env.SALT_INDEX);

    const endpoint = `/pg/v1/status/${merchantId}/${merchantTransactionId}`;
    const result = generateHash("", endpoint, saltKey, saltIndex);

    const url =
      mode === "UAT"
        ? `${UAT_URL}status/${merchantId}/${merchantTransactionId}`
        : `${PROD_URL}status/${merchantId}/${merchantTransactionId}`;

    const response = await sendRequest(url, "GET", null, {
      "Content-Type": "application/json",
      "X-MERCHANT-ID": merchantId,
      "X-VERIFY": result,
      accept: "application/json",
    });

    if (response.success === true) {
      const cart = await Cart.findOne({ user: req.query.userId }).populate(
        "products.product"
      );

      if (!cart || cart.products.length === 0) {
        return res.status(400).json({
          responseCode: 400,
          error: "Cart is empty.",
        });
      }

      const totalAmount = cart.products.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      const newOrder = await Order.create({
        user: req.query.userId,
        items: cart.products.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        totalAmount,
        paymentId: merchantTransactionId,
        status: "In-Progress",
      });

      await Cart.deleteOne({ user: req.query.userId });

      res.redirect(`${process.env.FRONTEND_URL}/order-info`);
    } else {
      res.status(400).json({
        responseCode: 400,
        error: response.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.paymentCallback = async (req, res, next) => {
  try {
    req.payData = {};
    req.payData.merchantTransactionId = req.body.transactionId;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error processing payment callback: " + error.message,
    });
  }
};

exports.paymentCallbackServer = async (req, res, next) => {
  try {
    req.payData = {};
    req.payData.merchantTransactionId = req.body.transactionId;
    next();
  } catch (error) {
    res.status(500).send("Error processing server callback: " + error.message);
  }
};
