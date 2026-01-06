import mongoose, { Schema, ObjectId } from "mongoose";
const CatePostSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("CategoryPost", CatePostSchema);
