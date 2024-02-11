const express = require("express");
const app  =  express()
const port = 5000;

const cors = require("cors");
const mongoDB = require("./db")
mongoDB();
app.use(cors())
app.use(express.json());
app.use("/api",require("./Routes/CreateUser"))
app.use("/api",require("./Routes/dataDisplay"))
app.use("/api",require("./Routes/cart"))
// app.use("/api",require("./Routes/cartdata"))

app.get("/",(req,res)=>{
    res.send("hello world .... ")
})


     app.listen(port,()=>{ 
            console.log("Yes i am connected " , port);
        })


// start();