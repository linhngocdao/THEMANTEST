import mongoose from "mongoose";
// import { createHmac } from "crypto";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
    img: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// userSchema.methods = {
//   authenticate(password) {
//     try {
//       return this.password == this.encrytPassword(password);
//     } catch (error) {
//       console.log(error);
//     }
//   },
//   encrytPassword(password) {
//     if (!password) return;
//     try {
//       return createHmac("sha256", "123456").update(password).digest("hex");
//     } catch (error) {
//       console.log(error);
//     }
//   },
// };
// userSchema.pre("save", function (next) {
//   try {
//     this.password = this.encrytPassword(this.password);
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// });

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});
userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};
export default mongoose.model("User", userSchema);
