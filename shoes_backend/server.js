const express = require("express");
const mongoose = require("mongoose");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const bodyParser = require("body-parser");
const userRouter = require("./routes/signUpRouter");
const paymentRouter = require("./routes/paymentRoutes");
const adminRouter = require("./routes/adminRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const collectionRouter = require("./routes/collectionRoutes");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

const DB = process.env.MONGODB_URL;

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use("/api/cart", cartRoutes);
app.use("/api/shoes/collections", collectionRouter);
app.use("/api/order", orderRoutes);
app.use("/api/signup", userRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/admin-panel", adminRouter);

mongoose
  .connect(DB)
  .then(() => console.log("Connected to database!!!"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
