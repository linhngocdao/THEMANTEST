import Discount from "../models/discount";
import Order from "../models/orders";
import User from "../models/user";
import moment from "moment/moment";
moment.suppressDeprecationWarnings = true;

export const getVouchers = async (req, res) => {
  try {
    const voucher = await Discount.find().sort({ createdAt: -1 }).exec();
    res.json(voucher);
  } catch (error) {
    res.status(400).json({ message: "Lỗi không xác định" });
  }
};
export const getVoucher = async (req, res) => {
  try {
    const voucher = await Discount.findById({ _id: req.params.id }).exec();
    res.json(voucher);
  } catch (error) {
    res.status(400).json({ message: "Lỗi không xác định" });
  }
};

export const EditVoucher = async (req, res) => {
  try {
    const existCode = await Discount.findOne({ code: req.body.code }).exec();
    const voucherOld = await Discount.findOne({ _id: req.params.id }).exec();
    if (existCode) {
      if (existCode.code !== voucherOld.code) {
        return res.json({
          code: 500,
          message: "Đã tồn tại mã này rồi",
        });
      }
    }
    if (req.body.amount > 0 || req.body.percent > 0) {
      const voucher = await Discount.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { returnDocument: "after" }
      ).exec();
      return res.json({
        ...voucher,
        code: 200,
      });
    } else {
      return res.json({
        code: 500,
        message: "Số tiền hoặc phần trăm phải lớn hơn 0 ",
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Lỗi không xác định" });
  }
};

export const addDiscount = async (req, res) => {
  try {
    const { code } = req.body;
    const existCode = await Discount.findOne({ code }).exec();
    if (existCode) {
      return res.json({
        result: 500,
        message: "Mã đã tồn tại!",
      });
    }
    const response = await Discount(req.body).save();
    res.json({
      result: 200,
      response,
    });
  } catch (error) {
    res.status(400).json({ message: "Không thể thêm" });
  }
};

export const checkVoucher = async (req, res) => {
  try {
    let raw = {};
    if (req.body.code) {
      raw = {
        code: req.body.code,
      };
    } else {
      raw = {
        _id: req.body._id,
      };
    }
    const findVoucher = await Discount.findOne({ ...raw }).exec();
    const findUser = await User.findOne({ _id: req.body.iduser }).exec();
    const findOrder = await Order.find({
      voucher: findVoucher._id,
      userID: findUser._id,
    }).exec();
    const timecreateat = moment(findUser.createdAt).unix(); // thời gian tạo tài khoản
    const timecreate = moment().unix() - timecreateat; // tính số ngày tạo tài khoản
    const startday = moment(findVoucher.startday).unix(); // thời gian bắt đầu voucher
    const endtime = moment(findVoucher.endtime).unix(); // thời gian kết thúc  voucher
    if(!req.body.view) {

      if(findVoucher.numberoftimesused >= findVoucher.numberofuses) {
          return res.json({
              code: 495,
              message: "Voucher đã hết số lần sử dụng"
          })
      }
      if(moment().unix() > endtime) {
          return res.json({
              code: 496,
              message: "Voucher này chỉ áp dụng đến 00 giờ " + findVoucher.endtime
          })
      }
      if(startday > moment().unix()) { 
          return res.json({
              code: 498,
              message: "Voucher này áp dụng từ " + findVoucher.startday
          })
      }
      if(parseInt(timecreate/86400) < findVoucher.timeuser) {
          return res.json({
              code: 499,
              message: "Tài khoản phải lập trên " + findVoucher.timeuser + " ngày thì mới được sử dụng mã này"
          })
      }
      if(findOrder.length >= findVoucher.limiteduse) {
          return res.json({
              code: 500,
              message: "Mỗi user chỉ được sử dụng " + findVoucher.limiteduse + " lần."
          }) 
      }
  }

    if (req.body.update == true) {
      findVoucher.numberoftimesused++;
      await Discount.findByIdAndUpdate({ _id: findVoucher._id }, findVoucher, {
        returnDocument: "after",
      }).exec();
    }
    res.json(findVoucher);
  } catch (error) {
    res.json({ code: 404, message: "Mã voucher không tồn tại" });
  }
};

export const removeDiscount = async (req, res) => {
  try {
    const response = await Discount.findByIdAndDelete({
      _id: req.params.id,
    }).exec();
    if (response == null) {
      return res.json({
        result: 500,
        message: "Mã giảm giá không tồn tại hoặc đã bị xoá",
      });
    }
    res.json({
      result: 200,
      response,
    });
  } catch (error) {
    res.status(400).json({ message: "Không thể xoá" });
  }
};
