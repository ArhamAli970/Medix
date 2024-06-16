// const express=require("express");
const mongoose= require("mongoose");

const MedSchema= new mongoose.Schema({ 
    name:{
        type:String,
        required:true
    },
    img1:{ 
        type:String,
        required:true,
    },
    img2:{ 
        type:String,
        required:true
    },
    price:{ 
      type:Number,
      required:true,
      min:0,
    },
    description:[{
        type:String,
        required:true
    }],
    use:[{
        type:String
}],
    sideEff:[{
        type:String,
}],
    safetyAd:[{
        type:String,
    }]
   
})

module.exports= mongoose.model("Medix",MedSchema);