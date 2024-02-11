import Home from "./screens/Home";
import Login from "./screens/Login.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

 import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
//  import "../node_modules/bootstrap/dist/css";
 import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUo from "./screens/SignUp";
import CartItem from "./component/CartItem";
import Myorder from "./component/Myorder.jsx";

 

function App() {
  return (
    // <div>hello</div>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element  = {<Home></Home>} />
          <Route exact path="/myorders" element  = {<Myorder/>} />
          <Route exact path="/login" element  = {<Login></Login>} />
          <Route exact path="/createuser" element  = {<SignUo></SignUo>} />
          <Route exact path="/cart" element  = {<CartItem/>} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
