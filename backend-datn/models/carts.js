import mongoose, {ObjectId} from "mongoose";

const cartSchema = new mongoose.Schema({
    products:  {
        type: [],
        require: true
    }, 
    userID: {
        type: ObjectId,
        ref: "User"
    },
    tm_codeorder: {
        type: String,
        require: true
    },
    voucher: {
        type: ObjectId,
        ref: "Discount"
    },
    timeadd_v: {
        type: Number,
    }
})


export default mongoose.model("Carts", cartSchema)