import Size from "../models/size";
export const createSize = async (req, res) => {
  try {
    const Sizes = await new Size(req.body).save();
    res.json(Sizes);
  } catch (error) {
    res.status(400).json({
      message: "Không thêm được kích cỡ",
    });
  }
};

export const listSize = async (req, res) => {
  try {
    const Sizes = await Size.find();
    res.json(Sizes);
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị kích cỡ",
    });
  }
};

export const readSize = async (req, res) => {
  try {
    const Sizes = await Size.findOne({ _id: req.params.id }).exec();
    res.json(Sizes);
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị kích cỡ",
    });
  }
};

export const removeSize = async (req, res) => {
  try {
    const Sizes = await Size.findOneAndDelete({ _id: req.params.id }).exec();
    res.json(Sizes);
  } catch (error) {
    res.status(400).json({
      message: "Không xoá được",
    });
  }
};

export const updateSize = async (req, res) => {
  try {
    const Sizes = await Size.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(Sizes);
  } catch (error) {
    res.status(400).json({
      message: "Không edit được",
    });
  }
};
