const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();


const accountModel=require('../model/account')
const loanModel=require('../model/loan')
const counterModel=require('../model/counter')



/*
API for creating request for new loan. it will create new loan and send the details back 
*/
router.post('/lend',async function(req,res){
    try{
        accountModel.findOne({accountNumber:req.body.accountNumber})
        .then(async (response)=>{
            var count
            try { // count is used to craete a number series for loan ID 
                await counterModel.updateOne({id:"counter"},{$inc:{loanIdCount:1}})
                counterReponse=await counterModel.findOne({})
                count=counterReponse.loanIdCount
            } catch (err) {
                await counterModel.create({id:"counter",accountNumberCount:1,loanIdCount:1})
                count=1 
            }
            console.log(response)
            let intrest=req.body.loanAmount*(req.body.loanPeriod/12)*(req.body.rateOfIntrest/100) //simple intrest formula
            let totalAmount=intrest+req.body.loanAmount
            let monthlyEMI=Math.ceil(totalAmount/req.body.loanPeriod)
            let loanObject={
                loanId:"LN"+count,          //all loanId starts with LN
                account:response._id,
                loanAmount:req.body.loanAmount,
                loanPeriod:req.body.loanPeriod,
                rateOfIntrest:req.body.rateOfIntrest,
                totalAmount,
                totalIntrest:intrest,
                monthlyEMI,
                numberOfEmiLeft:req.body.loanPeriod,
                totalAmountLeft:totalAmount
            }
            try {
                await loanModel.create({...loanObject})
                res.status(200).json({
                    status:"success",
                    response:{
                        loanId:"LN"+count,
                        totalAmount,
                        monthlyEMI
                    }
                })
                
            } catch (err) {
                res.status(500).json({
                    status:"failed",
                    message:err
                })
            }
            
        },
        (err)=>{
            res.status(500).json({
                status:"failed",
                message:"Invalid Accoount Number"
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
API for inititing a transaction for specific loan.  
*/
router.patch('/payment',async function(req,res){
    try {
        loanModel.findOne({loanId:req.body.loanId})
        .then(async (response)=>{
            if(req.body.amount<response.monthlyEMI){            // checking for the amount payed is less than monthly EMI amount or not
                res.status(400).json({
                    status:"failed",
                    message:"Your minimum Monthly EMI amount is "+response.monthlyEMI
                })
            }
            let totalAmountLeft=response.totalAmountLeft-req.body.amount
            let numberOfEmiLeft=Math.ceil(totalAmountLeft/response.monthlyEMI)
            let transactionObject={
                amount:req.body.amount,
                date:new Date(),
                totalAmountLeft:totalAmountLeft,
                numberOfEmiLeft
            }
            updatedLoanObject={
                totalAmountLeft,
                numberOfEmiLeft,
                totalAmountPayed:response.totalAmount-totalAmountLeft,
                transactions:[
                    ...response.transactions,
                    transactionObject
                ]
            }
            try {
                let val=await loanModel.updateOne({loanId:req.body.loanId},updatedLoanObject)
                res.status(200).json({
                    status:"success",
                    response:{
                        loanId:req.body.loanId,
                        totalAmountLeft,
                        numberOfEmiLeft
                    }
                })
            } catch (err) {
                res.status(500).json({
                    status:"failed",
                    message:err
                })
            }
            
        },
        (error)=>{
            res.status(400).json({
                status:"failed",
                message:"Invalid Loan ID"
            })
        }
        )
        
    } catch (err) {
        res.status(500).json({
            status:"failed",
            message:err
        })
    }
})

/*
API for getting complete transaction history of a specific loan.
*/
router.get('/ledger',async function(req,res){
    try {
        console.log(req.query.loanId)
        loanModel.findOne({loanId:req.query.loanId})
        .then((response)=>{
            res.status(200).json({
                status:"success",
                response:{
                    loanId:response.loanId,
                    totalAmountLeft:response.totalAmountLeft,
                    monthlyEMI:response.monthlyEMI,
                    numberOfEmiLeft:response.numberOfEmiLeft,
                    transactions:response.transactions
                }
            })
        },
        (error)=>{
            res.status(400).json({
                status:"failed",
                message:"Invalid Loan ID"
            })
        }
        )
        
    } catch (err) {
        res.status(500).json({
            status:"failed",
            message:err
        })
    }
})


module.exports=router