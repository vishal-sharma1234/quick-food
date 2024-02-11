import React, { useState, useEffect } from "react";
import Navebar from "../component/Navebar";
import Footer from "../component/Footer";
import Card from "../component/Card";
import Crousual from "../component/Crousual";

const Home = () => {
  const [search , setSearch] = useState("")
  const [food_items, setFood_items] = useState([]);
  const [foodCategory, setFood_category] = useState([]);

  const loadData = async () => {
    const response = await fetch("http://localhost:5000/api/displaydata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log(data[0], data[1]);
    console.log(data);

    setFood_items(data[0]);
    setFood_category(data[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navebar />
      </div>
      {/* <div>
        <Crousual />
      </div> */}
      <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{
           objectPosition:"center",
    
          }}
        >
        <div className="carousel-inner" id="carousel"   >

        

            <div className="carousel-caption  " style={{zIndex : "2"}}   >
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={e=>{
                    setSearch(e.target.value)
                  }}
                />
                {/* <button className="btn btn-outline-success" type="submit">
                  Search
                </button> */}
              </div>
            </div>

            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900×700/?sea"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900×700/?fruit"
                  className="d-block w-100"
                  alt="..."
                />
            </div>
            <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900×700/?burger"
                  className="d-block w-100"
                  alt="..."
                />
            </div>
        </div>
        <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        {foodCategory !== [] ? (
          foodCategory.map((e, i) => {
            return (
              <div className="row m-1" >
                <div key={e._id} className="fs-3 m-3">
                  {e.CategoryName}
                </div>
                <hr />
                {food_items !== [] ? (
                  food_items
                    .filter((ele) => (ele.CategoryName === e.CategoryName) && (ele.name.toLowerCase().includes(search.toLowerCase())))
                    .map((fltritm) => {
                      return (
                        
                          <div key={fltritm._id} className="col-12 col-md-6 col-lg-3" >
                            <Card foodItem = {fltritm}
                            
                              finalPrice = {100}
                              options = {fltritm.options[0]}
                            
                            />
                          </div>
                        
                      );
                    })
                ) : (
                  <div>end to end</div>
                )}
              </div>
            );
          })
        ) : (
          <div> -------- </div>
        )}
        {/* <Card /> */}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
