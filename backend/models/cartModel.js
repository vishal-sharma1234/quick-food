const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    user : {
        type : String,
        required : true,
    },
    
    productName : {
        type : String,
        required : true,
    },
    productId : {
        type:String,
        required : true,
    },
    productQty : {
        type : Number,
        required : true
    },
    totalPrice : {
        type : Number,
        required : true
    },
    plateSize : {
        type : String,
        required : true
    },
    date : {
        type :Date,
        default : Date.now
    }
    ,imgSrc  : {
        type : String,
        required : true,
    },
})

module.exports =  mongoose.model("Cart",cartSchema);