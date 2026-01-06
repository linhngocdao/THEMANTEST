import Catepost from "../models/catePost";
import Posts from "../models/post";
export const createCate = async (req, res) => {
  try {
    const Post = await new Catepost(req.body).save();
    res.json(Post);
  } catch (error) {
    res.status(400).json({
      message: "Không thêm được bài viết",
    });
  }
};

export const listCate = async (req, res) => {
  try {
    const Post = await Catepost.find();
    res.json(Post);
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị bài viết",
    });
  }
};

export const readCate = async (req, res) => {
  try {
    const Post = await Catepost.findOne({ _id: req.params.id }).exec();
    const news = await Posts.find({ categoryId: Post._id }).exec();
    res.json({
      Post,
      news,
    });
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị bài viết",
    });
  }
};

export const removeCate = async (req, res) => {
  try {
    const Post = await Catepost.findOneAndDelete({ _id: req.params.id }).exec();
    res.json(Post);
  } catch (error) {
    res.status(400).json({
      message: "Không xoá được",
    });
  }
};

export const updateCate = async (req, res) => {
  try {
    const Post = await Catepost.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(Post);
  } catch (error) {
    res.status(400).json({
      message: "Không edit được",
    });
  }
};
