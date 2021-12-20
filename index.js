const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors")
const bodyParser = require('body-parser')
const dotenv = require('dotenv');

const accountApi=require('./api/accountApi')
const loanApi=require('./api/loanApi')


dotenv.config();
mongoose.connect(process.env.DB)
const app=express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.use("/api/v1/account",accountApi); // api for account related information
app.use("/api/v1/loan",loanApi); // api for loan specific information


app.listen(process.env.PORT,()=>{
    console.log("server started at port : " +process.env.PORT) 
})
