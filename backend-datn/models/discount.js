import mongoose, { Schema, ObjectId } from "mongoose";
const DiscountSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    code: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      default: 0
    },
    percent: {
      type: Number,
      default:0
    },
    numberofuses: {
        type: Number,
        require:true
    },
    numberoftimesused: {
        type: Number,
        default: 0
    },
    startday: {
        type: String,
        require: true
    },
    limiteduse: {
     type:Number,
     default: 1
    },
    timeuser: {
      type: Number,
      default: 0
    },
    endtime: {
        type:String,
        require: true
    }
  },
  { timestamps: true }
);
export default mongoose.model("Discount", DiscountSchema);
