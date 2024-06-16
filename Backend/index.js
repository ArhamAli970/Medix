const express= require('express');
const app= express();
const bodyParser = require('body-parser'); // Import body-parser
const mongoose=require('mongoose');
const cors=require('cors');
const Medix=require("./models/medicine.js");
const jwt = require('jsonwebtoken');
const Razorpay=require('razorpay');
require("dotenv").config();
// const session=require("express-session");
app.use(express.json());

const nodemailer = require('nodemailer');


// const passport=require("passport")
// const LocalStrategy=require("passport-local");
const bcrypt = require('bcryptjs');

const User=require('./models/user.js');
const Cart=require('./models/cart.js');
const Address=require('./models/Address.js');
const Pay=require("./models/Payment.js");
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
// const Order=require('./models/Order.js');

// const Razorpay=require('razorpay')


app.use(cors({
  origin: 'http://localhost:5173',credentials:true}));
app.use(bodyParser.json('body-parser')); 
app.use(express.urlencoded({extended:true}));




main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/medweb');
}


const secretKey = 'kjhdfuisehfuierl337dfjgdkq82df378u2dfdjhdf';






app.post('/order',async(req,res)=>{

  try{
    console.log("hi");
  const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.SECRET_KEY,
});

const options= req.body;

console.log(options);

const order=await razorpay.orders.create(options); 

console.log(order);

res.json({order:order});

  }catch(e){
    console.log(e);
    console.log(e.message)
  }

})

app.get('/getKey',(req,res)=>{
  let key=process.env.KEY_ID;
  console.log(key)
  res.json({key:process.env.KEY_ID});
})


app.post('/paymentVerification',async(req,res)=>{

  // console.log(req.body);


  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    user_id,
    product,
    status,
    amount,
    currency,
    address,
    mobile,
    name
} = req.body;

  

const instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.SECRET_KEY })

// console.log(validatePaymentVerification());
  
  let isValid=validatePaymentVerification({"order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, process.env.SECRET_KEY);

  if(isValid){

    const newPayment = new Pay({
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      user_id,
      product,
      status,
      amount,
      currency,
      address,
      mobile,
      name
  });
// console.log(newPayment);
  await newPayment.save();


  // let order_id=razorpay_order_id;
  let user=await User.findOne({_id:user_id});
  
  let mail=user.email;

  console.log(razorpay_order_id,mail);


  const subject = 'Order Accepted';
  const text = `Your order ${razorpay_order_id} has been accepted. Thank you for shopping with medix!`;

  const mail_Options={
    from:process.env.EMAIL_USER,
    to:mail,
    subject:subject,
    text:text,
  }



  // mail accept 

  const transporter =nodemailer.createTransport({
    service:'Gmail',
    auth:{
      user:process.env.EMAIL_USER,
      pass:process.env.EMAIL_PASS
    }
  })


  transporter.sendMail(mail_Options, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });




  res.json({mess:"okk"})
   
  }

})


app.get('/getAddress',async(req,res)=>{
let{id}=req.query;
console.log(id);
let add=await Address.findById(id);
// console.log(add);
res.json({finAdd:add});
})







app.get("/",async(req,res)=>{
  try{
    // console.log(req.user,"haa mai hu");
    // console.log(req.query);
let{search}=req.query;

search=search.toLowerCase();
let d=await Medix.findOne({name:search})
// console.log(d);
res.json({med:d})
  }
  catch(err){
    console.log(err.message);
  }
})


app.get('/getBar/:med',async(req,res)=>{
  let{med}=req.params;
  // console.log(med);
  if(med=="#"){return res.json({ans:[]})};
  let ans=await Medix.find({name:{$regex:`^${med}`,$options:'i'}});
  res.json({ans});
})

app.get('/getNum',async(req,res)=>{
    let data= await User.find({});
    res.json({num:data.length});
})

app.post('/getUser',async(req,res)=>{
  let {token}=req.body;
  console.log(token);

  if(token==null){
    return res.json({details:"nf"});

  }



  const decoded = jwt.verify(token, secretKey);
  // Extract the username from the decoded token

  const { username } = decoded;

  
  let details=await User.findOne({username:username});
  // console.log(details);


  res.json({details:details})


})

app.post('/signin',async(req,res)=>{  
  try{
    let {formData}=req.body;
    // console.log(formData);
    let{email,username,password}=formData;

    let user= await User.findOne({username:username});

    if(user){
     return res.json({mess:"already"});
    }


    let encyPass=await bcrypt.hash(password,15);


    const newUser= new User(
      {email:email,
        username:username,
        password:encyPass
      });

    
      


      await newUser.save();
  
    
    let newUsrCart=new Cart({
        email:email,
        product:[]
    })
    await newUsrCart.save();
    // req.flash("success","Weclome new user");
    res.json({mess:"okk"})

    
    }
    catch(e){ 

        res.json({mess:e.message});
    }
})


app.get('/listOrder',async(req,res)=>{
  
  let {user_id}=req.query;

  let order=await Pay.find({user_id:user_id}).populate('product.prod');

  console.log(order);
  res.json({order:order});

})


app.post('/login', async function(req, res) {
  
  // console.log(req.body);
  let {formData}=req.body;

  let {username,password}=formData;

  
  let chkUser= await User.findOne({username:username})

  console.log(chkUser);

  if(!chkUser){
    return res.json({mess:"nope User exists"});
  }

  if(await bcrypt.compare(password,chkUser.password)){
    //  const token=jwt.sign({},secretKey);
    const userObject = chkUser.toObject();
     const token = jwt.sign(userObject, secretKey); // Include user object in payload


     if(token){
      return res.json({data:token});
     }else{
      return res.json({mess:"error"})
     }


  }
  
  return res.json({mess:"pass not match"});



  })
 

  app.get("/getCart/:name",async(req,res)=>{
let{name}=req.params;
let cartData=await Cart.findOne({email:name}).populate('product.prod');

res.json({data:cartData});
  })



  app.post("/cart/:mail/:id",async(req,res)=>{
    

    let {mail}=req.params;
    let {id}=req.params;
    
    let usr=await Cart.findOne({email:mail});
    let {product}=usr;
    
    let Med=await Medix.findById(id);

    let chk=false;
    for(let prd of product){
      
        if(prd.prod.valueOf()===id){
            chk=true;break;
        }
    }
   
    if(!chk){
        // console.log("jhj")
        let ans={prod:Med , qty:1};
        await Cart.findOneAndUpdate({email:mail},{$set:{product:[...product,ans]}});
    }

    // let carts=await Cart.find({name:req.user.username});
    

    res.json({result:"data add"})

})



app.get('/getRandomMedi',async(req,res)=>{

  let dataRandom=await Medix.find({});

  let medi=[];

  for(let i=0;i<4;i++){
       let len=dataRandom.length;
       let idx=Math.floor(Math.random()*len);
       medi.push(dataRandom[idx]);
       dataRandom.splice(idx,1);
  }

  // console.log(medi);

  res.json({medi:medi});


})


app.get('/getDataClk/:id',async(req,res)=>{
  let {id}=req.params;
  let med=await Medix.findOne({_id:id});
  // console.log(med)
  res.json({med});

})



app.get('/getOrder',async(req,res)=>{
  let{mail}=req.query;

  console.log(mail);

  let Order=await Cart.findOne({email:mail}).populate('product.prod');
  console.log(Order);

  res.json({order:Order});

})




app.post('/addcart/:username',async(req,res)=>{
  let {username}=req.params;
let {product}=req.body;
console.log(product,username)
let data=await Cart.findOneAndUpdate({email:username},{$set:{product:product}},{new:true}).populate('product.prod');


res.json({value:data.product});
})



app.post('/saveAdd',async(req,res)=>{

  let {add,login}=req.body;
  let data= new Address(add);
  data.user=login
  // console.log(data);
  await data.save();
  res.json({data:"ok"});


})


app.get('/getUserAdd/:id',async(req,res)=>{

  let {id}=req.params;

  let add=await Address.find({user:id})
  // console.log(add);

  res.json({add:add})


})


  
  
  



app.use((err,req,res,next)=>{
  console.log(err.message)
})


app.listen(8080,()=>{
    console.log("app listing");
})