const mongoose= require("mongoose");
require("dotenv").config();
const colors= require("colors");

const app = require("./app");

mongoose.connect(process.env.DATABASE_LOCAL).then(()=>{
    console.log("Database connection successful".red.bold)
})

const port= process.env.PORT || 8080;

app.app.listen(port, ()=>{
    console.log(`Running on port ${port}`.yellow.bold);
})