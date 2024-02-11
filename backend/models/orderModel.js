const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    user : {
        type : String,
        required : true
    },
    orderConfirm : {
        type : Array,
        required : true,
    },
    subTotalPrice : {
        type : Number,
        required : true,
    },
    date : {
        type :Date,
        default : Date.now
    }
})

module.exports =  mongoose.model("PlaceOrder",orderSchema);