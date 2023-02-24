const express= require("express");
const app = express();
const cors= require("cors")
const mongoose= require("mongoose");
const productsRoute= require('./routes/api/v1/products.route.js');


//middleware
app.use(express.json());
app.use(cors())


//routes
app.use('/api/v1/products',productsRoute);


//root route
app.get('/', (req,res)=>{
    res.send("Server is running");
})

exports.app=app;


