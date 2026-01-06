import User from "../models/user";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import passwordResetToken from "../models/passwordResetToken";
import { generateRandomByte } from "../utils/helper";
const sendVerifyEmail = async (name, email, userID) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `The Man Shop ${process.env.USER}`,
      to: email,
      subject: "Xác thực tài khoản The Man Shop",
      html: `<p> Xin chào ${name} vui lòng nhấp vào <a href="http://localhost:5173/users/verify/${userID}"> Xác thực </a> để kích hoạt tài khoản ! </p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email not sent !");
        console.log(error);
      } else {
        console.log("Email has been sent:- ", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });
    await User.updateOne({ _id: user._id }, { $set: { verified: true } });
    console.log("Email verified successfully !");
  } catch (error) {
    console.log("Email not verified", error);
  }
};
export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    let exitsUser = await User.findOne({ email }).exec();
    if (exitsUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const user = await User({ fullname, email, password }).save();
    res.json({
      status: 200,
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    });

    if (user) {
      sendVerifyEmail(fullname, email, user._id);
    }
  } catch (error) {
    res.status(400).json({ message: "Lỗi" });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email không tồn tại" });
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User không tồn tại" });

  const alreadyHasToken = await passwordResetToken.findOne({ owner: user._id });
  if (alreadyHasToken)
    return res.status(400).json({
      message: "Chỉ sau một giờ, bạn có thể yêu cầu một mã thông báo khác!",
    });

  const token = await generateRandomByte();
  const newPasswordResetToken = await passwordResetToken({
    owner: user._id,
    token,
  });
  await newPasswordResetToken.save();
  try {
    const resetPasswordUrl = `${process.env.BASE_URL}user/reset-password?token=${token}&id=${user._id}`;

    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.SECURE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: `The Man Shop ${process.env.USER}`,
      to: email,
      subject: "Đặt lại mật khẩu",
      html: `<p>Bấm vào đây để đặt lại mật khẩu</p>
             <a href='${resetPasswordUrl}'>Đổi mật khẩu</a>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email not sent !");
        console.log(error);
      } else {
        console.log("Email has been sent:- ", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }

  res.json({ message: "Link sent to your email!" });
};

export const sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

export const resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;
  const user = await User.findById(userId);

  const matched = await user.comparePassword(newPassword);
  if (matched)
    return res
      .status(400)
      .json({ message: "Mật khẩu mới phải khác mật khẩu cũ!" });

  user.password = newPassword;
  await user.save();
  await passwordResetToken.findByIdAndDelete(req.resetToken._id);
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.SECURE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: `The Man Shop ${process.env.USER}`,
      to: user.email,
      subject: "Đặt lại mật khẩu thành công",
      html: `<h1>Đặt lại mật khẩu thành công</h1>
             <p>Từ bây giờ bạn cần sử dụng mật khẩu mới</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email not sent !");
        console.log(error);
      } else {
        console.log("Email has been sent:- ", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }

  res.json({
    message: "Password reset successfully, now you can new password!",
  });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại !" });
    }
    const matched = await user.comparePassword(password);
    if (!matched) return res.status(400).json({ message: "Sai mật khẩu !" });

    if (user.verified === false) {
      return res.status(400).json({
        message: "Vui lòng kiểm tra email xác thực tài khoản !",
        verified: false,
      });
    }
    const token = jwt.sign({ email, name: "Truong" }, "Theman", {
      expiresIn: "1d",
    });
    res.json({
      token,
      users: {
        status: 200,
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        img: user.img
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Lỗi" });
  }
};

export const listUser = async (req, res) => {
  try {
    const body = req.body;
    const count = await User.find({}).count();
    const skip = body.limit * (body.page - 1);
    const users = await User.find(
      {},
      // {
      //   fullname: 1,
      //   email: 1,
      //   id_: 1,
      //   status: 1,
      //   role: 1,
      //   createdAt: 1,
      //   updatedAt: 1,
      // }
    )
      .skip(skip)
      .limit(body.limit);

    res.json({
      users,
      count,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Không hiển thị ",
    });
  }
};

export const updateUsers = async (req, res) => {
  console.log(req);
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: req.body.status,
        fullname: req.body.fullname,
        img: req.body.img,
        phone: req.body.phone,
      },
      { new: true }
    ).exec();
    res.json({
      status: user.status,
      id: user._id,
      phone: user.phone,
      img: user.img,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(400).json({
      message: "Không edit được",
    });
  }
};

export const readUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).exec();
    res.json({
      status: user.status,
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      img: user.img,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị người dùng ",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.profile._id },
      { fullname: req.body.fullname, phone: req.body.phone, img: req.body.img },
      { new: true }
    ).exec();
    res.json({
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      img: user.img,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(400).json({
      message: "Không edit được",
    });
  }
};

export const filter_user = async (req, res) => {
  try {
    const count = await User.find({}).count();
    const users = await User.find({
      fullname: {
        $regex: req.body.fullname,
        $options: "i",
      },
      email: {
        $regex: req.body.email,
        $options: "i",
      },
    });
    res.json({ users, count });
  } catch (error) {
    res.status(400).json({
      error: "Không timf được nguoi dung",
    });
  }
};
