import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./singup.scss";

const SignUo = () => {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    golocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.golocation,
      }),
    });

    const json = await response.json();
    if (json.success) {
      alert(" Your account is created successfully !");
    } else {
      alert(" Please enter the valid details ! ");
    }
    console.log(json);
  };

  const onChange = (e) => {
    e.preventDefault();
    setcredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="parant_container">
        <div className=" bigdiv container">
          <div className="imgdiv">
          <form onSubmit={handleSubmit} id="form_" autoComplete="off" >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                User name
              </label>
              <input
                type="text"
                className="form-control"
                onChange={onChange}
                id="name"
                name="name"
                placeholder="Enter the username......"
                />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                placeholder="Enter the Email......"
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
              <label htmlFor="exampleInputLocation" className="form-label">
                location
              </label>
              <input
                placeholder="Type your City location......"
                type="text"
                className="form-control"
                name="golocation"
                onChange={onChange}
                id="exampleInputLocation"
                />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                placeholder="Set your password......"
                className="form-control"
                name="password"
                onChange={onChange}
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to="/login" className="btn btn-danger m-2">
              I have already account on this website!
            </Link>
          </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUo;
