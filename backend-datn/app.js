require("dotenv").config();
import express from "express";
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
import mongoose from "mongoose";
import cors from "cors";
import routerHome from "./routes/home";
import routerUser from "./routes/user";
import routerPost from "./routes/post";
import routerCatpost from "./routes/catePost";
import routerCateproduct from "./routes/cateProduct";
import routerProduct from "./routes/product";
import routerSize from "./routes/size";
import routerColor from "./routes/color";
import routerSlider from "./routes/slider";
import routerOrders from "./routes/orders";
import routerCarts from "./routes/carts";
import routerComments from "./routes/comment";
import routerContact from "./routes/contact";
import routerVNPAY from "./routes/vnpay";
import routerDiscount from "./routes/discount";
const url =
  "mongodb+srv://datn_433:tg7aERk5yF9Jes9V@atlascluster.nyvzdzm.mongodb.net/?retryWrites=true&w=majority";
async function connect() {
  try {
    await mongoose.connect(url);
    console.log("connect succsess");
  } catch (error) {
    console.log(error);
  }
}
connect();

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(express.json());
app.use(routerHome);
app.use(routerUser);
app.use(routerPost);
app.use(routerCatpost);
app.use(routerCateproduct);
app.use(routerProduct);
app.use(routerSlider);
app.use(routerSize);
app.use(routerColor);
app.use(routerOrders);
app.use(routerCarts);
app.use(routerComments);
app.use(routerContact);
app.use(routerVNPAY)
app.use(routerDiscount)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Đang chạy cổng", PORT);
});
