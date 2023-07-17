const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./router/auth");
const dotenv = require("dotenv");
const productRoute = require("./router/Product");
const cartRoute = require("./router/Cart");
const userRoute = require("./router/user");
const orderRoute = require("./router/order");
const stripeRoute = require("./router/strip");
const cors = require("cors");
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://naim:234@cluster0.gecowfn.mongodb.net/Shop?retryWrites=true&w=majority"
    );
    console.log("mongoDb Connected !");
  } catch (error) {
    console.log("Ther is error !");
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongoDb disconnected !");
});
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/card", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/checkout", stripeRoute);
app.listen(2000, () => {
  connect();
  console.log("app is runing in port 2000 !");
});
