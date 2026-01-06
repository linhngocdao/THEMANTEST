import mongoose, { Schema, ObjectId } from "mongoose";
const ColorSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    colorCode: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Color", ColorSchema);
