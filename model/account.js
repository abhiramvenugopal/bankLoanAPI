const mongoose=require("mongoose")
const Schema=mongoose.Schema

const accountSchema= new Schema({
    accountNumber:{type:String, required:true,unique:true},
    name : {type:String, required:true},
    email:{type:String, required:true,unique:true},
    phone :{type :String, required:true,unique:true},
    address: {
                streetAddress :{type:String, required:true},
                state :{type:String, required:true},
                district :{type:String, required:true},
                pincode :{type:Number, required:true},
            }
})

const accountModel=mongoose.model("accounts",accountSchema)

module.exports=accountModel
