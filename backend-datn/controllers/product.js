import { ObjectId, Types } from "mongoose";
import Product from "../models/product";
import Order from "../models/orders";
import User from "../models/user";
import Post from "../models/post";
export const createProduct = async (req, res) => {
  try {
    const products = await new Product(req.body).save();
    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: "Không thêm được sản phẩm",
    });
  }
};
export const total_quantity_statisticar = async (req, res) => {
  try {
    const products = await Product.find({}).count();
    const orders = await Order.find({}).count();
    const users = await User.find({}).count();
    const posts = await Post.find({}).count();
    res.json({ products, orders, users, posts });
  } catch (error) {
    res.status(400).json({
      message: "Không tìm đc dữ liệu",
    });
  }
};

export const thongke = async (req, res) => {
  try {
    const body = req.body;

    const skip = body.limit * (body.page - 1);

    const all = await Product.aggregate([
      // {
      //   $match: {
      //     createdAt: {
      //       $gte: new Date(req.body.gt),
      //       $lte: new Date(req.body.lt),
      //     },
      //   },
      // },
      {
        $addFields: {
          quantity: {
            $sum: "$type.quantity",
          },
        },
      },
      {
        $addFields: {
          total_import_price: { $multiply: ["$listed_price", "$quantity"] },
          stock: { $subtract: ["$quantity", "$sold"] },
        },
      },
      {
        $addFields: {
          turnover: {
            $subtract: ["$total_export_price", "$total_import_price"],
          },
        },
      },
    ]);

    const thongkeorder = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(req.body.gt),
            $lte: new Date(req.body.lt),
          },
        },
      },
      {
        $addFields: {
          quantity: {
            $sum: "$type.quantity",
          },
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: "$product._id",
          sold: { $sum: "$product.quantity" },
          tiendaban: { $sum: "$productmonney" },
          productmonney: { $first: "$productmonney" },
        },
      },
      {
        $addFields: {
          total_export_price: "$tiendaban",
        },
      },
      { $sort: { sold: -1 } },
    ]).limit(5);

    // orders.map((order) => {
    //   totalOrder.choxacnhan += order.status(1);
    //   totalOrder.cholayhang += order.status(2);
    //   totalOrder.danggiaohang += order.status(3);
    //   totalOrder.dagiahang += order.status(4);
    //   totalOrder.trahang += order.status(5);
    // });

    const total = {
      quantity: 0,
      sold: 0,
      total_import_price: 0,
      total_export_price: 0,
    };
    for (let i = 0; i < thongkeorder.length; i++) {
      const product = await Product.aggregate([
        {
          $match: {
            _id: Types.ObjectId(thongkeorder[i]._id),
          },
        },
        {
          $addFields: {
            quantity: {
              $sum: "$type.quantity",
            },
          },
        },
        {
          $addFields: {
            total_import_price: { $multiply: ["$listed_price", "$quantity"] },
            total_export_price: thongkeorder[i].tiendaban,
            stock: { $subtract: ["$quantity", "$sold"] },
          },
        },
        {
          $addFields: {
            turnover: {
              $subtract: ["$total_export_price", "$total_import_price"],
            },
          },
        },
      ]);

      thongkeorder[i].product = product[0];
    }
    thongkeorder.forEach(async (order) => {
      // const product = all.find((el) => {
      //   return el._id.toString() === order._id;
      // });
      // order.product = product;
      if (!order.product) return;
      total.total_export_price += +order.total_export_price;
      total.quantity += +order.product.quantity;

      total.sold += +order.sold;
      total.total_import_price += +order.product.total_import_price;
    });
    all.forEach((product) => {});
    total.doanhthu = total.total_export_price - total.total_import_price;
    const list = thongkeorder.slice(0, 3);
    res.json({ list, total });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Không hiển thị sản phẩm",
    });
  }
};

export const search = async (req, res) => {
  try {
    const conditions = { name: { $regex: req.body.name, $options: "i" } };
    console.log(conditions);
    const products = await Product.find(conditions);
    res.json(products);
  } catch (error) {
    res.status(400).json({
      error: "Không timf được sản phẩm",
    });
  }
};

export const filter_product = async (req, res) => {
  try {
    const body = req.body;
    const skip = body.limit * (body.page - 1);
    const count = await Product.find({
      name: {
        $regex: req.body.name,
        $options: "i",
      },
      price: {
        $gt: req.body.prices.gt,
        $lt: req.body.prices.lt,
      },
      "type.$.size": {
        $regex: req.body.size,
        $options: "i",
      },
    }).count();
    const products = await Product.find({
      name: {
        $regex: req.body.name,
        $options: "i",
      },
      price: {
        $gt: req.body.prices.gt,
        $lt: req.body.prices.lt,
      },
      type: {
        $elemMatch: {
          size: {
            $regex: req.body.size,
            $options: "i",
          },
        },
      },
    })
      .skip(skip)
      .limit(body.limit);
    res.json({ products, count });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Không timf được sản phẩm",
    });
  }
};

export const listProduct = async (req, res) => {
  try {
    const body = req.body;
    const count = await Product.find({}).count();
    const skip = body.limit * (body.page - 1);
    const products = await Product.find({})
      .skip(skip)
      .limit(body.limit)
      .populate("categoryId")
      .sort({ createdAt: -1 });
    res.json({ products, count });
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị sản phẩm",
    });
  }
};
export const listProductadmin = async (req, res) => {
  try {
    const body = req.body;
    const count = await await Product.find({
      status: "ACTIVE",
    }).count();
    const skip = body.limit * (body.page - 1);
    const products = await Product.find({
      status: "ACTIVE",
    })
      .skip(skip)
      .limit(body.limit)
      .populate("categoryId")
      .sort({ createdAt: -1 });
    res.json({ products, count });
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị sản phẩm",
    });
  }
};
export const readProduct = async (req, res) => {
  try {
    const Products = await Product.findOne({ _id: req.params.id }).exec();
    res.json(Products);
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị sản phẩm",
    });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const Products = await Product.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    res.json(Products);
  } catch (error) {
    res.status(400).json({
      message: "Không xoá được",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const Products = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(Products);
  } catch (error) {
    res.status(400).json({
      message: "Không edit được",
    });
  }
};

export const updateQuantityProduct = async (req, res) => {
  try {
    const { _id, color, size, quantity } = req.body;

    const product = await Product.findById(_id).exec();

    const newType = product.type.map((type) => {
      if (type.color === color && type.size === size) {
        if (quantity > type.quantity) {
          throw {
            code: 503,
            message:
              "Sản phẩm " +
              product.name +
              ", size: " +
              size +
              ", màu: " +
              color +
              " chỉ còn " +
              type.quantity +
              " sản phẩm.",
            color,
          };
        }
        return {
          ...type,
          quantity: type.quantity - quantity,
        };
      }
      return type;
    });
    product.sold += quantity;
    product.type = newType;
    const resp = await Product.findByIdAndUpdate(_id, product, {
      returnDocument: "after",
    }).exec();

    res.json(resp);
  } catch (error) {
    res.json(error);
  }
};

export const updateQuantityProduct2 = async (req, res) => {
  try {
    const { _id, color, size, quantity } = req.body;

    const product = await Product.findById(_id).exec();

    const newType = product.type.map((type) => {
      if (type.color === color && type.size === size) {
        return {
          ...type,
          quantity: type.quantity + quantity,
        };
      }
      return type;
    });
    product.sold = product.sold - quantity;
    product.type = newType;
    const resp = await Product.findByIdAndUpdate(_id, product, {
      returnDocument: "after",
    }).exec();

    res.json(resp);
  } catch (error) {
    res.json(error);
  }
};

export const updateType = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.idp }).exec();
    const newType = product.type.map((item) => {
      if (JSON.stringify(item._id) === JSON.stringify(req.params.idt)) {
        if (req.body.quantity <= 0) {
          throw "Quantity lớn hơn 0";
        }
        return {
          ...item,
          color: req.body.color,
          size: req.body.size,
          quantity: req.body.quantity,
        };
      }
      return item;
    });
    product.type = newType;
    const update = await Product.findByIdAndUpdate(
      { _id: req.params.idp },
      product,
      {
        returnDocument: "after",
      }
    ).exec();
    res.json(update);
  } catch (error) {
    res.json(error);
  }
};

export const countNumberProduct = async (req, res) => {
  try {
    const { _id, color, size, quantity } = req.body;

    const product = await Product.findById(_id).exec();

    const newType = product.type.map((type) => {
      if (type.color === color && type.size === size) {
        if (quantity > type.quantity) {
          throw {
            code: 503,
            message:
              "Sản phẩm " +
              product.name +
              ", size: " +
              size +
              ", màu: " +
              color +
              " chỉ còn " +
              type.quantity +
              " sản phẩm.",
            color,
          };
        }
      }
      return type;
    });
    res.json({
      code: 200,
      message: "Success",
    });
  } catch (error) {
    res.json(error);
  }
};
