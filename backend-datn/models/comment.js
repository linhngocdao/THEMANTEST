import mongoose, { Schema, ObjectId } from "mongoose";
const commentSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    productId: {
      type: ObjectId,
      ref: "Product",
    },
    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: {
      _id: 1,
      fullname: 1,
      img: 1,
      email: 1,
    },
  });
  next();
});
commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
    select: {
      _id: 1,
      name: 1,
    },
  });
  next();
});

commentSchema.virtual("user", {
  ref: "User",
  foreignField: "_id",
  localField: "userId",
  justOne: true,
});
commentSchema.virtual("product", {
  ref: "Product",
  foreignField: "_id",
  localField: "productId",
  justOne: true,
});

export default mongoose.model("Comment", commentSchema);
