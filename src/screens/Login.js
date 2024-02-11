import React, { useState } from "react";

import { Link , useNavigate} from "react-router-dom";

const Login = () => {
  let user = "";
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      } ),
    });
    const json = await response.json();
    if(!json.success){ alert("User not found and If you created your account in this website then please chack your email and passwrod")}
    else{ 
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
      // console.log(json.user.)
      localStorage.setItem("user",json.user.email);
      user = localStorage.getItem("user");
      localStorage.setItem("ue",user);
      // console.log(localStorage.getItem("user"));
      navigate("/");
    
    }
    console.log(json);
  };

  const onChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  

  return (
    <>
   
      <div className="container">
        <form onSubmit={handleSubmit} autoComplete="off" >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
            autoComplete="off"
              type="email"
              className="form-control"
              name="email"
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={onChange}
              id="exampleInputPassword1"

            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/createuser" className="btn btn-success m-2">
            I hav'nt any account on this website!
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
