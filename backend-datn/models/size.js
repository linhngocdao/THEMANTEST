import mongoose, { Schema, ObjectId } from "mongoose";
const SizeSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Size", SizeSchema);
