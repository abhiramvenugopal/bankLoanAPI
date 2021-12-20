const mongoose=require("mongoose")
const Schema=mongoose.Schema

const loanSchema= new Schema({
    loanId:{type:String,required:true},
    account:{type:Schema.Types.ObjectId,ref:"accounts"},
    loanAmount:{type:Number,required:true},
    loanPeriod:{type:Number,required:true},
    rateOfIntrest:{type:Number,required:true},
    totalAmount:{type:Number,required:true},
    totalIntrest:{type:Number,required:true},
    monthlyEMI:{type:Number,required:true},
    numberOfEmiLeft:{type:Number,required:true},
    totalAmountLeft:{type:Number,required:true},
    totalAmountPayed:{type:Number,required:true,default:0},
    transactions:[
        {
            amount: {type:Number, required:true},
		    date: {type:Date,default:new Date()},
            totalAmountLeft:{type:Number,required:true},
            numberOfEmiLeft:{type:Number,required:true},
        }
    ]
})

const loanModel=mongoose.model("loans",loanSchema)

module.exports=loanModel
