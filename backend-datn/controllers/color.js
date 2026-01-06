import Color from "../models/color";
export const createColor = async (req, res) => {
  try {
    const Colors = await new Color(req.body).save();
    res.json(Colors);
  } catch (error) {
    res.status(400).json({
      message: "Không thêm được màu",
    });
  }
};

export const listColor = async (req, res) => {
  try {
    const Colors = await Color.find();
    res.json(Colors);
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị màu",
    });
  }
};

export const readColor = async (req, res) => {
  try {
    const Colors = await Color.findOne({ _id: req.params.id }).exec();
    res.json(Colors);
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị màu",
    });
  }
};

export const removeColor = async (req, res) => {
  try {
    const Colors = await Color.findOneAndDelete({ _id: req.params.id }).exec();
    res.json(Colors);
  } catch (error) {
    res.status(400).json({
      message: "Không xoá được",
    });
  }
};

export const updateColor = async (req, res) => {
  try {
    const Colors = await Color.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(Colors);
  } catch (error) {
    res.status(400).json({
      message: "Không edit được",
    });
  }
};
