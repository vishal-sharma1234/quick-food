import React, { useEffect, useState } from "react";
import "./myorder.scss";

const Myorder = () => {
  const [odata, setOdata] = useState([]);

  let totalAmount = 0;

  const orders = async () => {
    const response = await fetch("http://localhost:5000/api/myordersfetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: localStorage.getItem("ue"),
      }),
    });
    let data = await response.json();
    console.log("My Orders ===== >>>>>>>   ", data.orderData);
    setOdata(data.orderData);
  };

  useEffect(() => {
    orders();
  }, []);
  return (
    <div className="myorders">
        <h5>
        <code>My Orders</code>
        </h5>
      {odata.length > 0?odata.map((e) => {
            totalAmount += e.subTotalPrice;
            let dt = String(e.date);
            return (
              <div className="big_Container">
                {e.orderConfirm.map((e2) => {
                  return (
                    <div className="order_Container">
                      <img src={e2.imgSrc} alt={e2.productName} />
                      <div>
                        <p> {e2.productName}</p>
                        <p> Quantity :- {e2.productQty}</p>
                        <p> Plate Size :- {e2.plateSize}</p>
                        <p> Price :- Rs. {e2.totalPrice}/-</p>
                        <p> Order Date :- {dt.slice(0 , 10)}</p>
                      </div>
                    </div>
                  );
                })}
                
            
              </div>
            );
          }):<h5> Order Not Available 😥!</h5>}

      <div className="bottom_div">
        <hr className="partition_line" />
          <h5>Total Amount :  <code> Rs.</code>{totalAmount}/-</h5>
      </div>
    </div>
  );
};

export default Myorder;
