import mongoose,  {ObjectId} from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    product: {
      type: [],
      require: true,
    },
    infomation: {
      type: {},
      require: true,
    },
    userID: {
      type: ObjectId,
      ref: "User"
    },
    fee: {
      type: Number,
      require: true
    },
    weight: {
      type: Number,
      require: true
    },
    length: {
      type: Number,
      require: true
    },
    width: {
      type: Number,
      require: true
    },
    height: {
      type: Number,
      require: true
    },
    productmonney: {
      type: Number,
      require: true
    },
    order_code: {
      type: String
    },
    tm_codeorder: {
      type: String,
      require: true
    },
    totalprice: {
      type: Number,
      require: true,
    },
    payment_methods: {
      type: Number,
      require: true
    },
    payment_status: {
      type: Number,
      default: 0
    },
    voucher: {
      type: String
    },
    status: {
      type: Number,
      default: 0,
    },
    linkpay: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", ordersSchema);
