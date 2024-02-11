const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKeyJwt = "Thisismyproject";
const Cart = require("../models/cartModel");

let tf = false;

router.post(
  "/createuser",
  [
    body("email", "Please enter the valid email").isEmail(),
    body("password", "Please chack password length").isLength({
      min: 5,
      max: 10,
    }),
    body("name", "please chack the name length").isLength({ min: 5 }),
  ],
  async (req, res) => {
    console.log(req.body);

    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(404).json({
        success: false,
        error: error.array(),
      });
    } else {
      let salt = await bcrypt.genSalt(10);
      let ScPass = await bcrypt.hash(req.body.password, salt);
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: ScPass,
        location: req.body.location,
      });

      res.status(202).json({
        success: true,
        user,
      });
    }
  }
);

// -------------------------login user

router.post(
  "/loginuser",
  [
    body("email", "Please enter the valid email").isEmail(),
    body("password", "Please chack password length").isLength({
      min: 5,
      max: 10,
    }),
  ],
  async (req, res, next) => {
    let { email, password } = req.body;

    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(404).json({
        success: false,
        error: error.array(),
      });
    } else {
      const user = await User.findOne({ email });

      if (user) {
        let comPass = await bcrypt.compare(password, user.password);

        if (!comPass) {
          res.status(404).json({
            success: false,
            massage:
              "User not found and If you created your account in this website then please chack your email and passwrod",
            comPass,
          });
        } else if (comPass) {
          const cd = await Cart.find({ user: user.email });

          global.userEmail = user.email;
          let em = global.userEmail;

          // tf = true;
          global.dtitm = cd;

          let data = {
            id: user._id,
          };

          let authToken = jwt.sign(data, secretKeyJwt);

          res.status(202).json({
            success: true,
            user,
            // cd,
            authToken,
            em,
          });
        }
      } else {
        res.status(404).json({
          success: false,
          massage:
            "User not found and If you created your account in this website then please chack your email and passwrod",
        });
      }
    }
  }
);

router.post("/cartData", async (req, res) => {
  let dt = await Cart.find({ user: req.body.ue });
  if (dt) {
    // console.log(dt.length , dt);
    if (dt.length < 1) {
      // console.log(dt.length , dt);
      res.status(202).json({
        success: true,
        dt,
        msg: "you cart item is null",
      });
    } else {
      res.status(202).json({
        success: true,
        dt,
        msg: "find",
      });
    }
  } else {
    res.status(202).json({
      success: false,
      msg: "not found",
    });
  }
});

module.exports = router;
