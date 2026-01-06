import mongoose, {ObjectId} from "mongoose";

const vnpaySchema = new mongoose.Schema({
    vnp_Amount: {
        type: String,
        require: true
    },
    vnp_BankCode: {
        type: String,
        require: true
    },
    vnp_BankTranNo: {
        type: String,
        require: true
    },
    vnp_CardType: {
        type: String,
        require: true
    },
    vnp_OrderInfo: {
        type: String,
        require: true
    },
    vnp_PayDate: {
        type: String,
        require: true
    },
    vnp_ResponseCode: {
        type: String,
        require: true
    },
    vnp_TmnCode: {
        type: String,
        require: true
    },
    vnp_TransactionNo: {
        type: String,
        require: true
    },
    vnp_TransactionStatus: {
        type: String,
        require: true
    },
    vnp_TxnRef: {
        type: String,
        require: true
    },
    vnp_SecureHash: {
        type: String,
        require: true
    }
}, {timestamps: true})


export default mongoose.model("VnPay", vnpaySchema)