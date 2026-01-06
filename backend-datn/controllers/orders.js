import Order from "../models/orders";

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
    const cart = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { returnDocument: "after" }
    ).exec();
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
export const listOrder = async (req, res) => {
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
