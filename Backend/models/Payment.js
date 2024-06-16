const mongoose =require("mongoose");



 const paySchema=new mongoose.Schema({
    razorpay_payment_id:{
        type:String,
        required:true
    },
    razorpay_order_id:{
        type:String,
        required:true
    },
    razorpay_signature:{
        type:String,
        required:true

    }
    ,user_id:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },

    product:[{

        prod:{
            type: mongoose.Schema.Types.ObjectId, ref: 'Medix' ,
        },
       qty:{type:Number,required:true}


    }]
    ,
    status:{
        type:String,
        required:true   
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    name:{
        type:String
        ,required:true
    }
    ,
    date:{
        type:Date,
        default:Date.now
    }


 })


 module.exports=mongoose.model("Pay",paySchema);