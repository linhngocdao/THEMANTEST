import Sliders from "../models/slider";

export const createSliders = async (req, res) => {
  try {
    const Slider = await new Sliders(req.body).save();
    res.json(Slider);
  } catch (error) {
    res.status(400).json({
      message: "Không thêm được",
    });
  }
};

export const listSliders = async (req, res) => {
  try {
    const body = req.body;
    const skip = body.limit * (body.page - 1);
    const count = await Sliders.find({}).count();
    const Slider = await Sliders.find({}).skip(skip).limit(body.limit);
    res.json({ Slider, count });
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị ",
    });
  }
};

export const readSliders = async (req, res) => {
  try {
    const Slider = await Sliders.findOne({ _id: req.params.id }).exec();
    res.json(Slider);
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị ",
    });
  }
};

export const removeSliders = async (req, res) => {
  try {
    const Slider = await Sliders.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    res.json(Slider);
  } catch (error) {
    res.status(400).json({
      message: "Không xoá được",
    });
  }
};

export const updateSliders = async (req, res) => {
  try {
    const Slider = await Sliders.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(Slider);
  } catch (error) {
    res.status(400).json({
      message: "Không edit được",
    });
  }
};
