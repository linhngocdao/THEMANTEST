import mongoose, { Schema, ObjectId } from "mongoose";
const CateProductSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);
export default mongoose.model("CategoryProduct", CateProductSchema);
