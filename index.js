require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { notFoundMiddleware } = require("./middleware/not-found");
const { errorHandlingMiddleware } = require("./middleware/error-handler");

// router importing
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const reviewsRoute = require("./routes/reviews");

// middleware

app.use(express.json());
app.use(cors());

// routes

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/payments", stripeRoute);
app.use("/api/reviews", reviewsRoute);

// error middlewares
app.use(notFoundMiddleware);
app.use(errorHandlingMiddleware);

// listening server and connencting database

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster-alpha.b2ra9.mongodb.net/e-commerce?retryWrites=true&w=majority"
    );
    app.listen(port, () => console.log(`server is running on Port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
