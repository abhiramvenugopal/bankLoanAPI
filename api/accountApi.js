const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();


const accountModel=require('../model/account')
const counterModel=require('../model/counter')
const loanModel=require('../model/loan')

/*
API for creating a bank accnount.
*/
router.post('/create',async function(req,res){
    try{
        let count
        await counterModel.updateOne({id:"counter"},{$inc:{accountNumberCount:1}})
        counterModel.findOne({}).then(
            async (response)=>{
                if(! response){
                    await counterModel.create({id:"counter",accountNumberCount:1,loanIdCount:1})
                    count=1
                }
                else{
                    count=response.accountNumberCount
                }
                const data={...req.body,accountNumber:("BA"+count)}     // All bank account number starts with BA
                let account=await accountModel.create(data)
                res.status(200).json({status:"success",account})
            },
            (err)=>{
                res.status(500).json({
                    status:"failed",
                    message:err
                })
            }
        )    
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message:err
        })
    }  
    
})

/*
API for getting overview of the complete account.
it will retun list of all loan and their basic details
*/
router.get('/overview',async function(req,res){
    try{
        accountModel.findOne({accountNumber:req.query.accountNumber})
        .then((response)=>{
            loanModel.find({account:response._id},{_id:0,loanId:1,loanAmount:1,totalAmount:1,monthlyEMI:1,totalIntrest:1,totalAmountPayed:1})
            .then((response)=>{
                res.status(200).json({status:"success",response:{accountNumber:req.query.accountNumber,loanList:[...response]}})
            })
        },
        (error)=>{
            res.status(400).json({
                status:"failed",
                message:"Invalid Account Number"
            })
        }
        )
           
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message:err
        })
    }
    
    
})



module.exports=router