const mongoose=require("mongoose")
const Schema=mongoose.Schema

const counter= new Schema([{
    id:{type:String,unique:true,required:true,default:"counter"},
    accountNumberCount:{type:Number,default:1},
    loanIdCount:{type:Number,default:1}    
}])

const counterModel=mongoose.model("counter",counter)

module.exports=counterModel
