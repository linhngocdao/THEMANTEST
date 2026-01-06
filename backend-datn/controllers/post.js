import Posts from "../models/post";

export const createPosts = async (req, res) => {
  try {
    const Post = await new Posts(req.body).save();
    res.json(Post);
  } catch (error) {
    res.status(400).json({
      message: "Không thêm được bài viết",
    });
  }
};

export const listPosts = async (req, res) => {
  try {
    const body = req.body;
    const skip = body.limit * (body.page - 1);
    const count = await Posts.find({}).count();
    const Post = await Posts.find({})
      .skip(skip)
      .limit(body.limit)
      .populate("categoryId");
    res.json({ Post, count });
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị bài viết",
    });
  }
};

export const readPosts = async (req, res) => {
  try {
    const Post = await Posts.findOne({ _id: req.params.id }).exec();
    res.json(Post);
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị bài viết",
    });
  }
};
export const filter_post = async (req, res) => {
  try {
    const count = await Posts.find({
      title: {
        $regex: req.body.title,
        $options: "i",
      },
    }).count();
    const Post = await Posts.find({
      title: {
        $regex: req.body.title,
        $options: "i",
      },
    });
    res.json({ Post, count });
  } catch (error) {
    res.status(400).json({
      error: "Không timf được sản phẩm",
    });
  }
};

export const removePosts = async (req, res) => {
  try {
    const Post = await Posts.findOneAndDelete({ _id: req.params.id }).exec();
    res.json(Post);
  } catch (error) {
    res.status(400).json({
      message: "Không xoá được",
    });
  }
};

export const updatePosts = async (req, res) => {
  try {
    const Post = await Posts.findOneAndUpdate(
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
