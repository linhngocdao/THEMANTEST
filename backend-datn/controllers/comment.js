import Comment from "../models/comment";
import Product from "../models/product";
import Order from "../models/orders";

export const list = async (req, res) => {
  try {
    const comment = await Comment.find();
    res.json(comment);
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị được ",
    });
  }
};
export const listComment = async (req, res) => {
  try {
    const body = req.body;
    const skip = body.limit * (body.page - 1);
    const count = await Comment.find({}).count();
    const Comments = await Comment.find({}).skip(skip).limit(body.limit);

    res.json({ Comments, count });
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị ",
    });
  }
};
export const read = async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    res.json(comment);
  } catch (error) {
    res.status(400).json({
      message: "khong list duoc danh sach",
    });
  }
};
export const filter_comment = async (req, res) => {
  try {
    const body = req.body;
    const skip = body.limit * (body.page - 1);
    const count = await Comment.find({
      content: {
        $regex: req.body.content,
        $options: "i",
      },
    }).count();
    const Comments = await Comment.find({
      content: {
        $regex: req.body.content,
        $options: "i",
      },
    })
      .skip(skip)
      .limit(body.limit);
    res.json({ Comments, count });
  } catch (error) {
    res.status(400).json({
      error: "Không tìm được Bình luận",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    res.json(comment);
  } catch (error) {
    res.status(400).json({
      message: "không xóa đưọc ",
    });
  }
};
export const create = async (req, res) => {
  try {
    const order = await Order.findOne({ userID: req.profile._id.toString() });
    console.log(order);
    if (!order) {
      return res.status(400).json({
        message: "Khong co quyen",
      });
    }
    const comment = await new Comment(req.body).save();

    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "KHông thêm được",
    });
  }
};
export const update = async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(comment);
  } catch (error) {
    res.status(400).json({
      message: "không cập nhật được ",
    });
  }
};

export const getByProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // const product = await Product.findOne({ _id }).exec();
    const comments = await Comment.find({ productId: id }).sort("-createdAt");
    // .exec();
    console.log(comments);

    res.json(comments);
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};
