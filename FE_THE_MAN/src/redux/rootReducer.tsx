import { combineReducers } from "@reduxjs/toolkit";

import postReducer from "./slices/postSlice";
import cateReducer from "./slices/catePostSlice";
import cateproReducer from "./slices/cateProductSlice";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import sliderReducer from "./slices/Slider";
import userReducer from "./slices/userSlice";
import provinceReducer from "./slices/provinceSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import contactReducer from "./slices/contactSlice";
import statisticalReducer from "./slices/statisticalSlice";
import voucherReducer from "./slices/voucherSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  catePro: cateproReducer,
  statistical: statisticalReducer,
  user: userReducer,
  catepost: cateReducer,
  product: productReducer,
  slider: sliderReducer,
  carts: cartReducer,
  province: provinceReducer,
  orders: orderReducer,
  contact: contactReducer,
  voucher: voucherReducer,
});

export default rootReducer;
