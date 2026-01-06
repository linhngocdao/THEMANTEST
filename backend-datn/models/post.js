import mongoose, { Schema, ObjectId } from "mongoose";
const PostsSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    descShort: {
      type: String,
    },
    desc: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    categoryId: {
      type: ObjectId,
      ref: "CategoryPost",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Post", PostsSchema);
