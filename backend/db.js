const mongoose = require("mongoose");

//  mongodb+srv://vishalsharma807864:vishal0011@cluster0.lncvhxb.mongodb.net/?retryWrites=true&w=majority

const mongoURI =
  "mongodb+srv://vishalsharma807864:vishal0011@cluster0.lncvhxb.mongodb.net/gofoodmern?retryWrites=true&w=majority";
const mongoDB = async () => {
  const db = await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  });
  const food_items_data = db.connection.db.collection("food_items");
  const data = await food_items_data.find({}).toArray();
  const foodCat_data = db.connection.db.collection("foodCategory");
  const catData = await foodCat_data.find({}).toArray();

  const cartItemData = db.connection.db.collection("carts");
  const cartData = await cartItemData.find({}).toArray();

  global.cartItems = cartData;
  global.food_items = data;
  global.foodCategory = catData;
};

module.exports = mongoDB;
