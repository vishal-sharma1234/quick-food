const express = require("express");
const router = express.Router();
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");

router.post("/orderdata", async (req, res) => {
  const data = await Cart.findOne({
    productId: req.body.productId,
    plateSize: req.body.plateSize,
    user: req.body.user,
  });

  console.log(data);

  if (!data) {
    const cartd = await Cart.create({
      user: req.body.user,
      productName: req.body.productName,
      productId: req.body.productId,
      productQty: req.body.productQty,
      plateSize: req.body.plateSize,
      totalPrice: req.body.totalPrice,
      imgSrc: req.body.imgSrc,
    });

    res.status(202).json({
      success: true,
      cartd,
    });
  } else {
    res.status(202).json({
      success: true,
      msg: "inserted",
    });
  }
});

// update cart qty

router.put("/updateqty", async (req, res) => {
  // const cartd = await Cart.findByIdAndUpdate(req.params.id,req.body)
  let cartd = await Cart.findOne({ productId: req.body.productId });
  cartd = await cartd.updateOne({
    productQty: req.body.productQty,
    totalPrice: req.body.totalPrice,
  });

  // console.log(cartd);
  res.status(202).json({
    success: true,
    cartd,
  });
});

// delete product

router.delete("/deleteproduct", async (req, res) => {
  let cartd = await Cart.findOne({
    productId: req.body.productId,
    user: req.body.user,
  });

  cartd = cartd.deleteOne({
    productId: req.body.productId,
    user: req.body.user,
  });

  // console.log(cartd);
  res.status(202).json({
    success: true,
    cartd,
  });
});

// Confirm Order

router.post("/placeorder", async (req, res) => {
  const data = await Order.create({
    orderConfirm: req.body.cart_item,
    user : req.body.user,
    subTotalPrice : req.body.subTotalPrice,
  });
  res.status(202).json({
    success: true,
    data,
  });
});

// delete all products

router.delete("/alldeleteproduct", async (req, res) => {
  let del = await Cart.deleteMany({ user: req.body.user });
  res.status(202).json({
    success: true,
    del,
    msg: "deleted successfully",
  });
});


// get my orders

router.post("/myordersfetch",async(req,res)=>{
  const orderData = await Order.find({user : req.body.user});
  res.status(202).json({
    success : true,
    orderData,
    msg:"data finded successfully",
  })
})

module.exports = router;
