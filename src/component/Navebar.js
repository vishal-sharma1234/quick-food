import React from "react";

import { Link,  useNavigate } from "react-router-dom";


const Navebar = () => {



    const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate("login")
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light  bg-success rounded">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">
                  Home
                </Link>
              </li>

              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-9"
                    aria-current="page"
                    to="/myorders"
                  >
                    {" "}
                    My Order{" "}
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div>
                <Link className="btn bg-white text-success mx-1 " to="/login">
                  Login
                </Link>

                <Link
                  className=" btn bg-white text-success mx-1 "
                  to="/createuser"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/cart" >
                <div className=" btn bg-white text-success  mx-2 " >MyCart</div>
                </Link>
                
                <div className=" btn bg-white text-danger mx-2" onClick={handleLogout} >Logout</div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navebar;
