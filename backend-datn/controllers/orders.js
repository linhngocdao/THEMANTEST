import Order from "../models/orders";
import Discount from "../models/discount";

export const addNewOrder = async (req, res) => {
  try {
    const cart = await Order(req.body).save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export const editOrder = async (req, res) => {
  try {
    const currentOrder = await Order.findById({ _id: req.params.id }).exec();
    const cart = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { returnDocument: "after" }
    ).exec();

    // Update voucher count when order status changes from 0 to 1 (confirmed by admin)
    if (currentOrder && currentOrder.status === 0 && req.body.status === 1) {
      if (currentOrder.voucher) {
        await Discount.findByIdAndUpdate(
          currentOrder.voucher,
          { $inc: { numberoftimesused: 1 } }
        ).exec();
      }
    }

    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const countOrder = async (req, res) => {
  try {
    const order = await Order.find({ status: req.params.status }).count();
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const readOrder = async (req, res) => {
  try {
    const cart = await Order.findById({ _id: req.params.id }).exec();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export const searchOrder = async (req, res) => {
  try {
    const { tm_codeorder } = req.body;
    const order = await Order.findOne({ tm_codeorder }).exec();
    res.json(order);
  } catch (error) {}
};
export const listOrder = async (_req, res) => {
  try {
    const cart = await Order.find()
      .sort({
        createdAt: "desc",
      })
      .exec();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export const removeOrder = async (req, res) => {
  try {
    const cart = await Order.findByIdAndRemove({ _id: req.params.id }).exec();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
