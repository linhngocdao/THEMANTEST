import Carts from "../models/carts";

export const addCart = async (req,res) => {
          try {
            const {tm_codeorder} = req.body
            const exitsCart = await Carts.findOne({tm_codeorder})
            if(exitsCart) {
              return res.json({code: 409, message: "Đã tồn tại mã đơn hàng"})
            }
            const carts = await Carts(req.body).save()
            res.json({
              code: 200,
              carts
            })
          } catch (error) {
            res.status(400).json(error)
          }
}
export const getCart = async (req,res) => {
        try {
            const cart = await Carts.findOne({userID: req.params.id}).exec()
            res.json(cart)
        } catch (error) {
            res.status(400).json(error)
        }
}
export const updateCart = async (req,res) => {
  try {
    const cart = await Carts.findByIdAndUpdate({_id: req.params.id}, req.body, {
        returnDocument: "after"
    }).exec()
    res.json(cart)
  } catch (error) {
      res.status(400).json(error)
  }
}
export const removeCart = async (req,res) => {
  try {
      const cart = await Carts.findByIdAndRemove({_id: req.params.id}).exec()
      res.json(cart)
  } catch (error) {
      res.status(400).json(error)

  }
}