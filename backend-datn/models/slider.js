import mongoose, { Schema, ObjectId } from "mongoose";
const SlidersSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Slider", SlidersSchema);
