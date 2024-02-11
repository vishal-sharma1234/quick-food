import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./cartItem.scss";
import { AiFillDelete } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
const CartItem = () => {
  let gst = 0.0;
  let subTotal = 0;
  let delivery_charge = 0;
  let priceTotal = 0;

  const { cartItem } = useSelector((state) => state.cart);
  const [cart_items, setCart_items] = useState([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/api/cartData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ue: localStorage.getItem("ue") }),
    });
    const data = await response.json();
    setCart_items(data.dt);
  };

  const placeOrder = async (cart_items) => {
    if (cart_items.length > 0) {
      console.log("  first length ==>  ", cart_items.length);

      const response = await fetch("http://localhost:5000/api/placeorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_item: cart_items,
          user: localStorage.getItem("ue"),
          subTotalPrice: subTotal,
        }),
      });

      let data = await response.json();
      console.log(`This is data order wala  ==>>>>  `, data);

      // console.log(cart_items);

      const response2 = await fetch(
        "http://localhost:5000/api/alldeleteproduct",
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: localStorage.getItem("ue") }),
        }
      );

      let data2 = await response2.json();

      console.log(" All data deleted ====>         ", data2);

      fetchData();
      console.log("  <br> second  length ==>  ", cart_items.length);
    }else{
      alert("Your cart is Empty! , Please add any item in cart")
    }
  };

  

  const decrement = async (e) => {
    if (e.productQty > 1) {
      e.productQty -= 1;
      let tempPrs = (e.totalPrice / (e.productQty + 1)) * e.productQty;

      const response = await fetch(`http://localhost:5000/api/updateqty`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: e.productId,
          productQty: e.productQty,
          totalPrice: tempPrs,
        }),
      });
      const dt = await response.json();
      fetchData();
    }
  };

  const increment = async (e) => {
    if (e.productQty < 5) {
      e.productQty += 1;
      let tempPrs = (e.totalPrice / (e.productQty - 1)) * e.productQty;

      const response = await fetch(`http://localhost:5000/api/updateqty`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: e.productId,
          productQty: e.productQty,
          totalPrice: tempPrs,
        }),
      });
      const dt = await response.json();
      fetchData();
    }
  };

  const deleteProduct = async (id) => {
    toast.success("jkhjghfgffg")

    fetchData();
    const response = await fetch(`http://localhost:5000/api/deleteproduct`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
        user: localStorage.getItem("ue"),
      }),
    });
    const result = await response.json();

    console.log(result);
    fetchData();
  };

  useEffect(() => {
    fetchData();
    console.log("this is useEffect hook for cart data");
  }, []);

  return (
    <div>
      {
        /* // {   cartItem.map((e) => {
      //   return (
      //     <>
      //       <div>{e.productName}</div>
      //       <div>{e.productId}</div>
      //       <div>{e.user}</div>
      //       <div>{e.qty}</div>
      //       <hr />

      //     </>
      //   );
      // })} */

        cart_items.length > 0 ? (
          cart_items.map((e) => {
            priceTotal += e.totalPrice;
            return (
              <div className="big">
                <div className="s-big">
                  <div className="_1">
                    <img src={e.imgSrc} alt={e.productName} />
                    <p>{e.productName}</p>
                  </div>
                  <div className="_2">
                    <div className="qty">
                      <button className="dec" onClick={() => decrement(e)}>
                        -
                      </button>
                      <p>{e.productQty}</p>
                      <button className="inc" onClick={() => increment(e)}>
                        +
                      </button>
                    </div>

                    <p>{e.plateSize}</p>
                  </div>
                  <div className="price">
                    <p>{e.totalPrice}/-</p>
                  </div>
                </div>
                <p>
                  <AiFillDelete onClick={() => deleteProduct(e.productId)} />
                  <Toaster/>
                </p>
              </div>
            );
          })
        ) : (
          <h2>You'r Cart is Empty! 😕</h2>
        )
      }

      <div className="bottom">
        <hr className="cart_bottom_line" />
        <div className="calculation_container">
          <p>
            <h4>Delivery-charge | </h4>{" "}
            <code>
              Rs.
              <b>
                {priceTotal >= 300 ? delivery_charge : (delivery_charge = 25)}/-
              </b>
            </code>{" "}
          </p>
          <p>
            <h4>GST 18% | </h4>{" "}
            <code>
              Rs.
              <b>
                {priceTotal > 0 ? (gst = Math.floor(priceTotal * 0.18)) : gst}/-
              </b>
            </code>{" "}
          </p>
          <p>
            <h4>Price Rs. | </h4>{" "}
            <code>
              Rs.<b>{priceTotal}/-</b>
            </code>{" "}
          </p>
          <hr />
          <p>
            <h4>SubTotal Rs. | </h4>{" "}
            <code>
              Rs.
              <b>
                {(subTotal = priceTotal + Math.floor(gst) + delivery_charge)}/-
              </b>
            </code>{" "}
          </p>
        </div>
        <button className="placeorder" onClick={() => placeOrder(cart_items)}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartItem;
