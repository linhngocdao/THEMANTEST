import CateProducts from "../models/cateProduct";
import Product from "../models/product";
export const createCate = async (req, res) => {
  try {
    const Cateproduct = await new CateProducts(req.body).save();
    res.json(Cateproduct);
  } catch (error) {
    res.status(400).json({
      message: "Không thêm được sản phẩm",
    });
  }
};

export const listCate = async (req, res) => {
  try {
    const Cateproduct = await CateProducts.find();
    res.json(Cateproduct);
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị sản phẩm",
    });
  }
};
export const listCates = async (req, res) => {
  try {
    const Cateproduct = await CateProducts.find({
      status: "ACTIVE",
    });
    res.json(Cateproduct);
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị sản phẩm",
    });
  }
};

export const readCate = async (req, res) => {
  try {
    const Cateproduct = await CateProducts.findOne({
      _id: req.params.id,
    }).exec();
    const Products = await Product.find({ categoryId: Cateproduct._id }).exec();
    res.json({
      Cateproduct,
      Products,
    });
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị sản phẩm",
    });
  }
};

export const removeCate = async (req, res) => {
  try {
    const Cateproduct = await CateProducts.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    res.json(Cateproduct);
  } catch (error) {
    res.status(400).json({
      message: "Không xoá được",
    });
  }
};

export const updateCate = async (req, res) => {
  try {
    const Cateproduct = await CateProducts.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(Cateproduct);
  } catch (error) {
    res.status(400).json({
      message: "Không edit được",
    });
  }
};
