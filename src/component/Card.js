import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
// import

const Card = (props) => {
  const priceref = useRef();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  useEffect(() => {
    setSize(priceref.current.value);
  }, []);

  const dispatch = useDispatch();

  let price = qty * props.options[size];

  const handleCart = async (options) => {
    dispatch({ type: "addToCart", payload: options });

    const response = await fetch("http://localhost:5000/api/orderdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: options.productName,
        user: options.user,
        productId: options.productId,
        productQty: qty,
        plateSize: size,
        totalPrice: price,
        imgSrc: options.imgSrc,
      }),
    });

    let data = await response.json();
    // console.log(data.msg);
  };

  let lftritm = props.foodItem;
  let op = props.options;
  let pobj = Object.keys(op);
  let prcs = Object.values(op);

  return (
    <div>
      <div
        className="card mt-5 "
        style={{ width: "18rem", maxHeight: "360px" }}
      >
        <img
          className="card-img-top p-2 rounded  "
          style={{
            height: "120px",
            objectFit: "fill",
            backgroundPosition: "center",
          }}
          src={lftritm.img}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100 ">
            <select
              className="m-2 h-100  rounded  bg-success"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            {console.log("this is prcs", lftritm)}

            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceref}
              onChange={(e) => setSize(e.target.value)}
            >
              {pobj.map((e) => {
                return (
                  <option key={e} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>

            <div className="d-inline"> ${price}/-</div>
          </div>
          <hr />

          <button
            className="btn btn-success p-1"
            onClick={() =>
              handleCart({
                user: localStorage.getItem("ue"),
                qty: qty,
                productName: props.foodItem.name,
                productId: props.foodItem._id,
                imgSrc: props.foodItem.img,
              })
            }
          >
            {" "}
            add to cart
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Card;
