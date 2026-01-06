import { isValidObjectId } from "mongoose";
import passwordResetToken from "../models/passwordResetToken";

export const isValidPassResetToken = async (req, res, next) => {
  const { token, userId } = req.body;

  if (!isValidObjectId(userId))
    return res.status(403).json({ message: "Yêu cầu không hợp lệ!" });

  const resetToken = await passwordResetToken.findOne({ owner: userId });
  if (!resetToken)
    return res
      .status(403)
      .json({ message: "Truy cập không được phép, yêu cầu không hợp lệ!" });

  const matched = await resetToken.compareToken(token);
  if (!matched)
    return res
      .status(403)
      .json({ message: "Truy cập không được phép, yêu cầu không hợp lệ!" });

  req.resetToken = resetToken;
  next();
};
